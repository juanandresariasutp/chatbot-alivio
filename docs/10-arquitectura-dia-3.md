# Arquitectura técnica del Día 3

> Estado: propuesta técnica inicial, pendiente de implementación en la herramienta elegida.
>
> Objetivo del Día 3: construir la lógica central del chatbot sin depender todavía de WhatsApp o Instagram en producción.

## Decisión recomendada

Separar la lógica del chatbot de las integraciones de canal.

Esto permite probar el flujo con datos simulados y conectar después WhatsApp e Instagram sin reescribir la conversación.

## Arquitectura general

```text
WhatsApp webhook ─┐
                  ├─ Entrada y normalización ─ Clasificación ─ Respuesta del negocio ─ Envío al canal
Instagram webhook ┘                         │                  │
                                             │                  ├─ Registro de conversación
Webhook de prueba ──────────────────────────┘                  ├─ Transferencia a asesor
                                                                └─ Manejo de errores
```

## Componentes

| Componente | Responsabilidad |
| --- | --- |
| Entrada | Recibir eventos desde webhooks reales o simulados |
| Normalización | Convertir mensajes de distintos canales a un formato común |
| Clasificación | Identificar intención inicial del usuario |
| Catálogo de respuestas | Seleccionar la respuesta aprobada para cada intención |
| Captura de datos | Solicitar nombre, motivo, día y hora cuando aplique |
| Handoff humano | Marcar y notificar conversaciones que requieren asesor |
| Persistencia | Guardar eventos mínimos, estados y errores |
| Envío | Responder usando el canal de origen |

## Workflows sugeridos

| ID | Nombre | Propósito |
| --- | --- | --- |
| WF-01 | Entrada y normalización | Recibir mensaje, validar estructura y crear payload común |
| WF-02 | Clasificación de mensaje | Detectar intención por palabras clave o reglas |
| WF-03 | Respuestas del negocio | Resolver respuesta desde catálogo aprobado |
| WF-04 | Captura de cita | Pedir y validar datos mínimos |
| WF-05 | Transferencia a asesor | Marcar conversación y notificar responsable |
| WF-06 | Manejo de errores | Registrar errores y responder de forma segura |

## Formato normalizado

Todo canal debe convertirse a este formato antes de clasificar:

```json
{
  "event_id": "evt_test_001",
  "channel": "whatsapp",
  "external_user_id": "573001112233",
  "customer_name": "Usuario de prueba",
  "message_type": "text",
  "message_text": "quiero una cita",
  "timestamp": "2026-07-16T09:00:00-05:00",
  "raw": {}
}
```

## Intenciones iniciales

| Intención | Respuesta asociada | Requiere asesor |
| --- | --- | --- |
| `saludo` | RESP-001 | No |
| `servicios` | RESP-002 | No |
| `tarifas` | RESP-003 | Opcional |
| `terapia_integral` | RESP-004 | Opcional |
| `horarios` | RESP-005 | No |
| `ubicacion` | RESP-006 | No |
| `pagos` | RESP-007 | No |
| `agendamiento` | RESP-008 | Sí |
| `dolor_lesion` | RESP-009 | Opcional |
| `que_llevar` | RESP-010 | No |
| `asesor` | RESP-011 | Sí |
| `fallback` | RESP-013 | Opcional |
| `limite_clinico` | RESP-015 | Sí |
| `urgencia` | RESP-016 | Sí |

## Orden de ejecución recomendado

1. Crear webhook de prueba.
2. Recibir payload simulado.
3. Normalizar mensaje.
4. Clasificar intención.
5. Seleccionar respuesta.
6. Definir si requiere asesor.
7. Registrar evento.
8. Devolver respuesta de prueba.

## Criterios de aceptación del Día 3

- [ ] Existe una estructura de workflows documentada.
- [ ] Existe formato normalizado de entrada.
- [ ] Existe clasificación inicial por intención.
- [ ] Existe respuesta por defecto para fallback.
- [ ] Existe regla para detectar transferencia a asesor.
- [ ] Existe archivo `.env.example` sin secretos reales.
- [ ] Las credenciales reales no se guardan en Git.
- [ ] Se pueden probar mensajes con datos simulados.
