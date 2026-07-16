# Integración con WhatsApp

> Estado: preparación técnica del Día 4 con payloads simulados. No usar tokens reales en el repositorio.

## Objetivo

Preparar la conexión de WhatsApp Cloud API con la lógica central del chatbot.

## Endpoints implementados

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/webhook/whatsapp` | Verificación del webhook por Meta |
| POST | `/webhook/whatsapp` | Recepción de eventos de WhatsApp |

## Variables requeridas

| Variable | Uso |
| --- | --- |
| `WEBHOOK_VERIFY_TOKEN` | Token definido por el equipo para validar el webhook |
| `WHATSAPP_ACCESS_TOKEN` | Token de acceso para enviar mensajes |
| `WHATSAPP_PHONE_NUMBER_ID` | ID del número desde el que se envían mensajes |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | ID de la cuenta de WhatsApp Business |
| `META_GRAPH_API_VERSION` | Versión de Graph API usada por el cliente |
| `SEND_WHATSAPP_REPLIES` | Si está en `true`, el servidor intenta enviar respuesta real |

## Flujo de recepción

```text
Meta envía evento
  ↓
POST /webhook/whatsapp
  ↓
normalizeWhatsAppPayload()
  ↓
processPayload()
  ↓
getResponse()
  ↓
Responder en modo simulación o enviar por Cloud API
```

## Modo seguro por defecto

Por defecto `SEND_WHATSAPP_REPLIES` no está activo.

Esto significa que el webhook procesa el mensaje y genera la respuesta, pero no intenta enviarla a WhatsApp. Para envío real se debe configurar:

```env
SEND_WHATSAPP_REPLIES=true
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
```

## Eventos ignorados

El webhook debe ignorar eventos de estado como:

- `sent`
- `delivered`
- `read`
- `failed`

Estos eventos no son mensajes del usuario y no deben disparar respuestas automáticas.

## Pruebas

```bash
npm run test:whatsapp
npm run test:whatsapp-webhook
```

O todo junto:

```bash
npm test
```

## Pendientes antes de producción

- [ ] Confirmar número de WhatsApp.
- [ ] Confirmar si el número está en uso con WhatsApp Business App o proveedor externo.
- [ ] Obtener `WHATSAPP_PHONE_NUMBER_ID`.
- [ ] Obtener `WHATSAPP_BUSINESS_ACCOUNT_ID`.
- [ ] Crear token seguro desde el negocio del cliente.
- [ ] Definir URL pública HTTPS del webhook.
- [ ] Configurar webhook en Meta for Developers.
- [ ] Suscribir evento `messages`.
- [ ] Probar con usuario autorizado.
- [ ] Verificar que no existan respuestas duplicadas.
- [ ] Documentar evidencias de pruebas.
