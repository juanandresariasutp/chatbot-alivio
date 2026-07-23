# Activacion controlada de respuestas reales

> Estado: guia para activar respuestas automaticas cuando Meta apruebe la empresa.
>
> No guardar tokens, secretos ni credenciales en Git.

## Objetivo

El Worker ya puede recibir webhooks, clasificar mensajes, guardar conversaciones
en D1 y enviar respuestas reales a WhatsApp o Instagram. El envio real queda
apagado por defecto para evitar mensajes accidentales mientras la cuenta de Meta
esta en revision.

## Variables de control

| Variable | Tipo | Valor inicial | Uso |
| --- | --- | --- | --- |
| `SEND_WHATSAPP_REPLIES` | Variable | `false` | Enciende o apaga respuestas reales por WhatsApp. |
| `SEND_INSTAGRAM_REPLIES` | Variable | `false` | Enciende o apaga respuestas reales por Instagram. |
| `WHATSAPP_ACCESS_TOKEN` | Secreto | No aplica | Token de acceso de WhatsApp Cloud API. |
| `WHATSAPP_PHONE_NUMBER_ID` | Secreto | No aplica | ID del numero de WhatsApp que envia mensajes. |
| `INSTAGRAM_ACCESS_TOKEN` | Secreto | No aplica | Token de acceso para Instagram Messaging. |
| `META_GRAPH_API_VERSION` | Variable | `v20.0` | Version de Graph API usada por el bot. |
| `ADMIN_API_TOKEN` | Secreto | No aplica | Protege endpoints internos de revision. |

## Requisitos antes de activar WhatsApp

- [ ] La verificacion de empresa en Meta ya no esta en revision.
- [ ] La cuenta de WhatsApp ya no aparece como restringida.
- [ ] El webhook de WhatsApp esta verificado por Meta.
- [ ] El campo `messages` esta suscrito.
- [ ] El Worker recibe mensajes entrantes y D1 registra la conversacion.
- [ ] El cliente aprobo las respuestas automaticas.
- [ ] Hay una persona responsable para atender handoff humano.

## Configurar secretos en Cloudflare

Ejecutar desde el repositorio local:

```bash
npx wrangler secret put WHATSAPP_ACCESS_TOKEN
npx wrangler secret put WHATSAPP_PHONE_NUMBER_ID
```

Solo si se activa Instagram:

```bash
npx wrangler secret put INSTAGRAM_ACCESS_TOKEN
```

Opcional para revisar conversaciones por API:

```bash
npx wrangler secret put ADMIN_API_TOKEN
```

## Revisar conversaciones guardadas

Cuando `ADMIN_API_TOKEN` este configurado, se puede consultar:

```bash
curl -H "Authorization: Bearer ADMIN_API_TOKEN" \
  https://chatbot.alivio-360boy.workers.dev/admin/conversations
```

Este endpoint no debe compartirse con el cliente final ni publicarse en una web.
Sirve solo para validacion tecnica y soporte durante pruebas.

## Encender WhatsApp

Actualizar `wrangler.toml` local:

```toml
[vars]
SEND_WHATSAPP_REPLIES = "true"
SEND_INSTAGRAM_REPLIES = "false"
META_GRAPH_API_VERSION = "v20.0"
```

Luego desplegar:

```bash
npx wrangler deploy
```

## Prueba minima despues de activar

1. Enviar "Hola" desde un numero autorizado al WhatsApp de ALIVIO 360.
2. Confirmar que el paciente recibe respuesta automatica.
3. Revisar D1 y confirmar que hay mensaje entrante y saliente.
4. Probar "quiero una cita".
5. Probar "quiero hablar con una persona".
6. Si hay error, volver a `SEND_WHATSAPP_REPLIES = "false"` y redesplegar.

## Comportamiento esperado si Meta falla

Si la API de Meta rechaza el envio, el Worker no rompe el webhook. Devuelve
`sent: false`, guarda el error en D1 y marca la conversacion con estado `ERROR`.

Esto ayuda a diagnosticar problemas como:

- token vencido;
- `WHATSAPP_PHONE_NUMBER_ID` incorrecto;
- cuenta de WhatsApp restringida;
- permisos insuficientes;
- ventana de conversacion cerrada.
