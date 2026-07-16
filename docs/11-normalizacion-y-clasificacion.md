# Normalización y clasificación

> Estado: reglas iniciales para implementar en n8n, Node-RED o backend propio.

## Entrada mínima

El bot debe recibir como mínimo:

| Campo | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `event_id` | string | Sí | Identificador único del evento |
| `channel` | string | Sí | `whatsapp`, `instagram` o `test` |
| `external_user_id` | string | Sí | Identificador del usuario en el canal |
| `customer_name` | string | No | Nombre reportado por el canal |
| `message_type` | string | Sí | `text`, `image`, `audio`, `unknown` |
| `message_text` | string | No | Texto del mensaje |
| `timestamp` | string | Sí | Fecha y hora del evento |
| `raw` | object | Sí | Evento original para depuración controlada |

## Reglas de validación

- Si `message_type` no es `text`, responder que por ahora el bot solo procesa texto y ofrecer asesor.
- Si `message_text` está vacío, usar fallback.
- Si falta `external_user_id`, registrar error y no enviar respuesta automática.
- Si el evento es un estado de entrega y no un mensaje entrante, ignorarlo.
- Si el `event_id` ya fue procesado, no responder de nuevo.

## Limpieza de texto

Antes de clasificar:

1. Convertir a minúsculas.
2. Quitar espacios repetidos.
3. Quitar signos que no afecten el sentido.
4. Mantener palabras clave clínicas y comerciales.

Ejemplo:

```text
"Hola, quiero una cita!!!"
→ "hola quiero una cita"
```

## Clasificación por palabras clave

| Intención | Palabras o frases sugeridas |
| --- | --- |
| `saludo` | hola, buenos días, buenas tardes, información |
| `servicios` | servicios, ofrecen, fisioterapia, quiropraxia, masaje, ozonoterapia, terapia manual, rehabilitación |
| `tarifas` | cuesta, precio, vale, valor, tarifa, cuánto |
| `terapia_integral` | terapia integral, integral 360, incluye la terapia |
| `horarios` | horario, atienden, abierto, hoy, sábado, domingos |
| `ubicacion` | ubicación, dirección, dónde están, llegar, mapa |
| `pagos` | pago, pagar, nequi, daviplata, bancolombia, efectivo, transferencia, tarjeta |
| `agendamiento` | cita, agendar, reservar, disponibilidad, turno |
| `dolor_lesion` | dolor, espalda, cuello, rodilla, hombro, tobillo, codo, muñeca, ciática, contractura, tendinitis, esguince, lesión |
| `limite_clinico` | qué tratamiento necesito, qué tengo, diagnosticar, diagnóstico, interpretar examen |
| `urgencia` | urgencia, no puedo caminar, pérdida de fuerza, pérdida de sensibilidad, dolor muy fuerte, emergencia |
| `que_llevar` | llevar, ropa, toalla, exámenes, fórmula |
| `asesor` | asesor, persona, humano, hablar con alguien, atiéndame |

## Prioridad de clasificación

Cuando un mensaje coincida con varias intenciones, usar este orden:

1. `urgencia`
2. `asesor`
3. `agendamiento`
4. `limite_clinico`
5. `tarifas`
6. `horarios`
7. `ubicacion`
8. `pagos`
9. `dolor_lesion`
10. `servicios`
11. `que_llevar`
12. `saludo`
13. `fallback`

## Resultado esperado de clasificación

```json
{
  "intent": "agendamiento",
  "confidence": "rule_match",
  "requires_human": true,
  "response_id": "RESP-008",
  "next_status": "WAITING_CUSTOMER"
}
```

## Estados de conversación

| Estado | Cuándo usarlo |
| --- | --- |
| `BOT_ACTIVE` | El bot responde normalmente |
| `WAITING_CUSTOMER` | Falta un dato del usuario |
| `WAITING_ADVISOR` | La solicitud ya debe ser revisada por asesor |
| `HUMAN_ACTIVE` | El asesor tomó la conversación |
| `RESOLVED` | Conversación cerrada |
| `ERROR` | Hubo error técnico |

## Datos mínimos para cita

| Campo | Pregunta sugerida |
| --- | --- |
| `customer_name` | ¿Cuál es tu nombre? |
| `appointment_reason` | ¿Cuál es el motivo de consulta? |
| `preferred_day` | ¿Qué día prefieres? |
| `preferred_time` | ¿Qué horario prefieres? |

Cuando los cuatro datos estén completos, pasar a `WAITING_ADVISOR`.
