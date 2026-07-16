# Webhook de prueba local

> Estado: herramienta local para validar la lógica central antes de conectar WhatsApp o Instagram.

## Objetivo

Probar el flujo de entrada, normalización, clasificación y respuesta usando payloads simulados.

## Ejecutar servidor

```bash
node src/mock-webhook-server.js
```

También se puede usar:

```bash
npm start
```

Por defecto inicia en:

```text
http://localhost:3000
```

## Rutas disponibles

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/health` | Verificar que el servidor está activo |
| POST | `/webhook/test-message` | Enviar mensaje simulado al bot |

## Payload de ejemplo

```json
{
  "event_id": "evt_test_agendamiento_001",
  "channel": "test",
  "external_user_id": "user_test_001",
  "customer_name": "Usuario de prueba",
  "message_type": "text",
  "message_text": "Hola, quiero una cita para dolor de espalda",
  "timestamp": "2026-07-16T09:00:00-05:00",
  "raw": {}
}
```

## Respuesta esperada

```json
{
  "classification": {
    "intent": "agendamiento",
    "requires_human": true,
    "response_id": "RESP-008",
    "next_status": "WAITING_CUSTOMER"
  },
  "reply": {
    "channel": "test",
    "external_user_id": "user_test_001",
    "text": "Claro, para ayudarte a solicitar una cita..."
  }
}
```

## Prueba con PowerShell

```powershell
$payload = Get-Content .\workflows\test-payloads\message-agendamiento.json -Raw
Invoke-RestMethod -Uri http://localhost:3000/webhook/test-message -Method Post -ContentType "application/json" -Body $payload
```

## Criterios de aceptación

- [ ] El servidor responde `GET /health`.
- [ ] El servidor procesa payloads de prueba.
- [ ] La respuesta incluye `normalized`.
- [ ] La respuesta incluye `classification`.
- [ ] La respuesta incluye `reply.text`.
- [ ] Los mensajes de cita quedan con `requires_human: true`.

## Prueba automatizada

```bash
npm run test:webhook
```
