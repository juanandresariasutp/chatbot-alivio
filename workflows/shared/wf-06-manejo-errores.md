# WF-06 - Manejo de errores

## Objetivo

Registrar fallos sin exponer secretos ni datos innecesarios y responder de forma segura cuando corresponda.

## Errores esperados

- Payload inválido.
- Mensaje sin texto.
- Evento duplicado.
- Error al enviar respuesta.
- Error al guardar conversación.
- Token expirado o permisos insuficientes.
- Canal no soportado.

## Respuesta segura

En este momento no puedo procesar tu solicitud automáticamente.

Si deseas, puedo compartir tu mensaje con un asesor para que te ayude.

## Registro mínimo

```json
{
  "event_id": "evt_test_001",
  "channel": "test",
  "error_type": "invalid_payload",
  "safe_message": "Falta message_text",
  "created_at": "2026-07-16T09:00:00-05:00"
}
```

## Reglas

- No registrar tokens.
- No registrar contraseñas.
- No registrar datos clínicos innecesarios.
- No generar respuestas infinitas.
