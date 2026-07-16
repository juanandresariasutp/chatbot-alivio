# Workflows de WhatsApp

Esta carpeta documenta la integración de WhatsApp Cloud API con la lógica común del chatbot.

## Flujo propuesto

```text
Meta WhatsApp webhook
  ↓
GET /webhook/whatsapp para verificación
POST /webhook/whatsapp para mensajes
  ↓
Normalizador WhatsApp
  ↓
Lógica compartida del chatbot
  ↓
Respuesta por WhatsApp Cloud API
```

## Variables necesarias

- `WEBHOOK_VERIFY_TOKEN`
- `WHATSAPP_ACCESS_TOKEN`
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_BUSINESS_ACCOUNT_ID`
- `META_GRAPH_API_VERSION`

## Archivos relacionados

- `src/whatsapp-normalizer.js`
- `src/whatsapp-client.js`
- `workflows/test-payloads/whatsapp-message-text.json`
- `workflows/test-payloads/whatsapp-status-event.json`
