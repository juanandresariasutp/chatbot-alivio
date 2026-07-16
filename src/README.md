# Código fuente

Esta carpeta contiene componentes propios del chatbot que no pertenecen directamente a un flujo de n8n.

## Archivos actuales

- `chatbot-rules.js`: lógica mínima para limpiar mensajes, normalizar payloads y clasificar intención por reglas.
- `responses.js`: catálogo ejecutable de respuestas aprobables.
- `mock-webhook-server.js`: servidor local para probar el flujo con payloads simulados.
- `whatsapp-normalizer.js`: convierte eventos de WhatsApp Cloud API al formato común del bot.
- `whatsapp-client.js`: prepara y envía respuestas de texto por WhatsApp Cloud API cuando existan credenciales.

## Uso

La lógica sirve como referencia para implementar los nodos de n8n, Node-RED o un backend propio.

## Webhook de prueba

```bash
node src/mock-webhook-server.js
```

Luego enviar un `POST` a:

```text
http://localhost:3000/webhook/test-message
```

