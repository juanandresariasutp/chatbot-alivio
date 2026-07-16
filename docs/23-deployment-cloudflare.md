# Deployment en Cloudflare Workers

> Estado: Worker desplegado en Cloudflare con D1 creado y esquema aplicado.

## Objetivo

Publicar el backend del chatbot en una URL HTTPS usando una opción con capa gratuita para el MVP.

## Tecnología recomendada

- Cloudflare Workers para recibir webhooks.
- Cloudflare D1 para persistencia durable.

## Motivo

Cloudflare Workers ofrece una capa gratuita suficiente para validar un MVP pequeño y entrega una URL pública HTTPS. D1 permite guardar conversaciones sin contratar una base externa durante la fase inicial.

## Archivos preparados

| Archivo | Uso |
| --- | --- |
| `src/worker.js` | Handler compatible con estilo Fetch API |
| `src/worker-entry.mjs` | Entrada ES Module requerida para bindings D1 |
| `src/d1-schema.sql` | Esquema inicial para Cloudflare D1 |
| `tests/run-worker-tests.js` | Pruebas locales del handler Worker |
| `wrangler.example.toml` | Plantilla de configuración de Cloudflare |

## URL pública

```text
https://chatbot.alivio-360boy.workers.dev
```

Endpoints verificados:

| Ruta | Resultado |
| --- | --- |
| `GET /health` | `200` |
| `GET /webhook/whatsapp` con token correcto | devuelve `hub.challenge` |
| `GET /webhook/instagram` con token incorrecto | `403` |

## Persistencia D1

El Worker usa `env.DB` cuando el binding D1 está disponible. En pruebas locales se mantiene un mock o memoria para no depender de Cloudflare.

Tablas usadas:

- `conversations`
- `messages`
- `processed_events`
- `handoffs`
- `errors`

Verificación remota realizada:

```text
conversations: 1
messages: 2
processed_events: 1
```

## Variables necesarias

| Variable | Uso |
| --- | --- |
| `WEBHOOK_VERIFY_TOKEN` | Verificación de webhooks Meta |
| `WHATSAPP_ACCESS_TOKEN` | Envío real por WhatsApp |
| `WHATSAPP_PHONE_NUMBER_ID` | Número de WhatsApp Cloud API |
| `INSTAGRAM_ACCESS_TOKEN` | Envío real por Instagram |
| `INSTAGRAM_ACCOUNT_ID` | Cuenta de Instagram |

## Costos y límites

El MVP debe mantenerse dentro de la capa gratuita mientras el volumen sea bajo.

Puede generar costos si:

- se exceden los límites gratuitos;
- se activa un plan pago de Cloudflare;
- se agregan dominios, servicios o almacenamiento adicional;
- se usan mensajes pagos de WhatsApp Business Platform;
- se integra IA de pago;
- se agregan notificaciones por servicios externos.

## Pasos futuros de despliegue

1. Configurar URL pública en Meta.
2. Probar webhooks con usuarios autorizados.
3. Configurar tokens reales de WhatsApp e Instagram como secretos.
4. Activar envío real solo después de aprobar pruebas.

Ver detalle en [Configuración de Wrangler](24-configuracion-wrangler.md).

## Regla de seguridad

Los tokens reales deben configurarse como secretos en Cloudflare, nunca en Git.
