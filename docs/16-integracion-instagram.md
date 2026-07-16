# Integración con Instagram

> Estado: preparación técnica del Día 5 con payloads simulados. No usar tokens reales en el repositorio.

## Objetivo

Preparar la conexión de Instagram Messaging con la lógica central del chatbot.

## Endpoints implementados

| Método | Ruta | Uso |
| --- | --- | --- |
| GET | `/webhook/instagram` | Verificación del webhook por Meta |
| POST | `/webhook/instagram` | Recepción de eventos de Instagram |

## Variables requeridas

| Variable | Uso |
| --- | --- |
| `WEBHOOK_VERIFY_TOKEN` | Token definido por el equipo para validar el webhook |
| `INSTAGRAM_ACCESS_TOKEN` | Token de acceso para enviar mensajes |
| `INSTAGRAM_ACCOUNT_ID` | ID de la cuenta de Instagram |
| `META_GRAPH_API_VERSION` | Versión de Graph API usada por el cliente |
| `SEND_INSTAGRAM_REPLIES` | Si está en `true`, el servidor intenta enviar respuesta real |

## Flujo de recepción

```text
Meta envía evento
  ↓
POST /webhook/instagram
  ↓
normalizeInstagramPayload()
  ↓
processPayload()
  ↓
getResponse()
  ↓
Responder en modo simulación o enviar por Instagram Messaging API
```

## Modo seguro por defecto

Por defecto `SEND_INSTAGRAM_REPLIES` no está activo.

Esto significa que el webhook procesa el mensaje y genera la respuesta, pero no intenta enviarla por Instagram. Para envío real se debe configurar:

```env
SEND_INSTAGRAM_REPLIES=true
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_ACCOUNT_ID=
```

## Eventos ignorados

El webhook debe ignorar eventos de eco (`is_echo`) para evitar responder a mensajes enviados por la propia cuenta.

## Pruebas

```bash
npm run test:instagram
npm run test:instagram-webhook
```

O todo junto:

```bash
npm test
```

## Pendientes antes de producción

- [ ] Confirmar que Instagram es cuenta profesional.
- [ ] Confirmar que Instagram está vinculado a la página de Facebook correcta.
- [ ] Confirmar que la cuenta está en el portafolio comercial correcto.
- [ ] Obtener `INSTAGRAM_ACCOUNT_ID`.
- [ ] Crear token seguro desde el negocio del cliente.
- [ ] Definir URL pública HTTPS del webhook.
- [ ] Configurar webhook en Meta for Developers.
- [ ] Suscribir eventos de mensajería necesarios.
- [ ] Probar con usuario autorizado.
- [ ] Verificar que eventos `is_echo` no generen respuestas duplicadas.
- [ ] Documentar evidencias de pruebas.
