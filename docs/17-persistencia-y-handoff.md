# Persistencia y handoff

> Estado: implementación local en memoria para validar reglas del Día 6. No reemplaza una base de datos de producción.

## Objetivo

Registrar conversaciones, controlar estados y preparar transferencias a asesor sin depender todavía de una base de datos externa.

## Componentes implementados

| Archivo | Responsabilidad |
| --- | --- |
| `src/conversation-store.js` | Guarda conversaciones y eventos procesados en memoria |
| `src/handoff.js` | Decide estados y arma resumen para asesor |
| `src/message-handler.js` | Orquesta clasificación, respuesta, persistencia y handoff |

## Estados

| Estado | Uso |
| --- | --- |
| `BOT_ACTIVE` | El bot puede responder normalmente |
| `WAITING_CUSTOMER` | El bot espera datos del usuario |
| `WAITING_ADVISOR` | La solicitud debe revisarla un asesor |
| `HUMAN_ACTIVE` | Un asesor está atendiendo; el bot no debe responder |
| `RESOLVED` | Conversación finalizada |
| `ERROR` | Hubo un error técnico |

## Reglas implementadas

- Si el evento ya fue procesado, se ignora como `duplicate_event`.
- Si la conversación está en `HUMAN_ACTIVE`, el bot ignora nuevos mensajes automáticos.
- Si la intención requiere asesor, se genera un resumen de handoff.
- Si la intención es `agendamiento`, el estado pasa a `WAITING_CUSTOMER`.
- Las respuestas salientes quedan registradas en la conversación.

## Endpoint de revisión local

El servidor local expone:

```text
GET /conversations
```

Esto permite inspeccionar conversaciones en memoria durante pruebas locales.

## Esquema sugerido de conversación

```json
{
  "conversation_id": "whatsapp:573001112233",
  "channel": "whatsapp",
  "external_user_id": "573001112233",
  "customer_name": "Usuario",
  "status": "WAITING_CUSTOMER",
  "requires_human": true,
  "intent": "agendamiento",
  "appointment": {
    "customer_name": "Usuario",
    "appointment_reason": null,
    "preferred_day": null,
    "preferred_time": null
  },
  "messages": [],
  "errors": [],
  "created_at": "2026-07-16T09:00:00-05:00",
  "updated_at": "2026-07-16T09:00:00-05:00"
}
```

## Pendientes para producción

- [ ] Elegir base de datos o herramienta de almacenamiento.
- [ ] Definir retención de datos.
- [ ] Definir responsable de acceso a conversaciones.
- [ ] Agregar política de tratamiento de datos.
- [ ] Implementar persistencia durable.
- [ ] Implementar notificación real al asesor.
- [ ] Definir forma de marcar `HUMAN_ACTIVE` y `RESOLVED`.
