# Workflows de Instagram

Esta carpeta documenta la integración de Instagram Messaging con la lógica común del chatbot.

## Flujo propuesto

```text
Meta Instagram webhook
  ↓
GET /webhook/instagram para verificación
POST /webhook/instagram para mensajes
  ↓
Normalizador Instagram
  ↓
Lógica compartida del chatbot
  ↓
Respuesta por Instagram Messaging API
```

## Variables necesarias

- `WEBHOOK_VERIFY_TOKEN`
- `INSTAGRAM_ACCESS_TOKEN`
- `INSTAGRAM_ACCOUNT_ID`
- `META_GRAPH_API_VERSION`

## Archivos relacionados

- `src/instagram-normalizer.js`
- `src/instagram-client.js`
- `workflows/test-payloads/instagram-message-text.json`
- `workflows/test-payloads/instagram-echo-event.json`
