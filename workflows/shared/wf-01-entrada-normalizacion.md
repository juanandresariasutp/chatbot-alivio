# WF-01 - Entrada y normalización

## Objetivo

Recibir mensajes de prueba o de canales reales y convertirlos a un formato común.

## Entrada

Webhook HTTP con payload de prueba, WhatsApp o Instagram.

## Salida

```json
{
  "event_id": "evt_test_001",
  "channel": "test",
  "external_user_id": "user_001",
  "customer_name": "Usuario de prueba",
  "message_type": "text",
  "message_text": "quiero una cita",
  "timestamp": "2026-07-16T09:00:00-05:00",
  "raw": {}
}
```

## Pasos

1. Recibir evento.
2. Validar si es mensaje entrante.
3. Identificar canal.
4. Extraer identificador del usuario.
5. Extraer texto.
6. Crear payload normalizado.
7. Enviar a clasificación.

## Reglas

- Ignorar eventos de estado o entrega.
- No responder mensajes duplicados.
- Si el mensaje no es texto, responder con salida segura o escalar.
