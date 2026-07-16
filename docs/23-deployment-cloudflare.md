# Deployment en Cloudflare Workers

> Estado: preparación técnica. No se ha desplegado todavía.

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
| `src/d1-schema.sql` | Esquema inicial para Cloudflare D1 |
| `tests/run-worker-tests.js` | Pruebas locales del handler Worker |
| `wrangler.example.toml` | Plantilla de configuración de Cloudflare |

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

1. Crear cuenta de Cloudflare o usar una cuenta del cliente.
2. Instalar Wrangler.
3. Crear proyecto Worker.
4. Crear base D1.
5. Ejecutar `src/d1-schema.sql`.
6. Configurar variables secretas.
7. Desplegar Worker.
8. Configurar URL pública en Meta.
9. Probar webhooks con usuarios autorizados.

Ver detalle en [Configuración de Wrangler](24-configuracion-wrangler.md).

## Regla de seguridad

Los tokens reales deben configurarse como secretos en Cloudflare, nunca en Git.
