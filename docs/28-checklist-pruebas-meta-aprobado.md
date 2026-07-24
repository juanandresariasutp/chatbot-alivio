# Checklist de pruebas cuando Meta apruebe la empresa

> Estado: guia operativa para el primer dia de pruebas reales.
>
> No ejecutar en produccion sin aprobacion del cliente.

## Objetivo

Validar que WhatsApp Cloud API, Meta Developers, Cloudflare Worker y D1 trabajan
juntos antes de activar respuestas automaticas para pacientes reales.

## Antes de empezar

- [ ] La verificacion de empresa en Meta aparece como aprobada o verificada.
- [ ] La cuenta de WhatsApp ya no aparece como restringida.
- [ ] El cliente confirma que se puede hacer una prueba controlada.
- [ ] Hay un numero de prueba autorizado para escribir al WhatsApp del negocio.
- [ ] `SEND_WHATSAPP_REPLIES` sigue en `false`.
- [ ] `ADMIN_API_TOKEN` esta disponible solo para revision tecnica.

## Datos que deben estar confirmados

| Dato | Donde se obtiene | Estado |
| --- | --- | --- |
| WhatsApp Business Account ID | Meta Developers / WhatsApp | Pendiente |
| Phone Number ID | Meta Developers / WhatsApp | Pendiente |
| Access token | Meta Developers / System user | Pendiente |
| Callback URL | Cloudflare Worker | `https://chatbot.alivio-360boy.workers.dev/webhook/whatsapp` |
| Verify token | Cloudflare secret | Configurado, no versionar |

## Paso 1: verificar webhook en Meta

En Meta Developers, producto WhatsApp:

- [ ] Abrir configuracion de webhooks.
- [ ] Pegar Callback URL:

```text
https://chatbot.alivio-360boy.workers.dev/webhook/whatsapp
```

- [ ] Pegar el mismo `WEBHOOK_VERIFY_TOKEN` configurado en Cloudflare.
- [ ] Confirmar que Meta acepta la verificacion.
- [ ] Suscribir el campo `messages`.

Resultado esperado:

```text
Meta muestra el webhook como verificado y suscrito a messages.
```

## Paso 2: probar recepcion sin respuesta real

Mantener:

```toml
SEND_WHATSAPP_REPLIES = "false"
```

Enviar desde el numero autorizado:

```text
Hola
```

Resultado esperado:

- [ ] El webhook responde `200`.
- [ ] El Worker registra conversacion en D1.
- [ ] El endpoint admin muestra la conversacion.
- [ ] La respuesta aparece como `sent: false`.
- [ ] No llega respuesta automatica al paciente todavia.

Consultar endpoint admin:

```bash
curl -H "Authorization: Bearer ADMIN_API_TOKEN" \
  https://chatbot.alivio-360boy.workers.dev/admin/conversations
```

## Paso 3: probar intenciones principales

Enviar mensajes desde el numero autorizado y revisar que el bot clasifique bien.

| ID | Mensaje | Intencion esperada |
| --- | --- | --- |
| QA-001 | `Hola` | bienvenida o informacion general |
| QA-002 | `Quiero una cita` | agendamiento |
| QA-003 | `Cuanto cuesta` | precios |
| QA-004 | `Donde estan ubicados` | ubicacion |
| QA-005 | `Me duele la espalda` | dolor espalda/cuello |
| QA-006 | `Reciben Nequi` | metodos de pago |
| QA-007 | `Quiero hablar con una persona` | handoff humano |

Resultado esperado:

- [ ] Cada conversacion queda guardada.
- [ ] La respuesta sugerida coincide con el catalogo aprobado.
- [ ] Las solicitudes de cita quedan marcadas para seguimiento.
- [ ] El handoff humano se identifica correctamente.

## Paso 4: configurar secretos de WhatsApp

Solo si los pasos anteriores funcionan:

```bash
npx wrangler secret put WHATSAPP_ACCESS_TOKEN
npx wrangler secret put WHATSAPP_PHONE_NUMBER_ID
```

No pegar estos valores en documentos, chats ni commits.

## Paso 5: activar respuesta real en ventana controlada

Actualizar `wrangler.toml` local:

```toml
SEND_WHATSAPP_REPLIES = "true"
SEND_INSTAGRAM_REPLIES = "false"
```

Desplegar:

```bash
npx wrangler deploy
```

Enviar:

```text
Quiero una cita
```

Resultado esperado:

- [ ] El paciente recibe respuesta automatica.
- [ ] D1 registra mensaje entrante y saliente.
- [ ] El endpoint admin muestra `sent: true` en la respuesta del webhook o no registra error.
- [ ] El asesor puede continuar el proceso manualmente.

## Paso 6: plan de reversa

Si aparece cualquier error o respuesta incorrecta:

1. Cambiar `SEND_WHATSAPP_REPLIES` a `false`.
2. Ejecutar `npx wrangler deploy`.
3. Revisar `/admin/conversations`.
4. Revisar errores en D1.
5. Corregir token, Phone Number ID, permisos o respuesta del catalogo.
6. Repetir prueba solo con numero autorizado.

## Criterio de cierre

La prueba se considera exitosa cuando:

- [ ] Meta acepta el webhook.
- [ ] WhatsApp envia eventos reales al Worker.
- [ ] D1 registra conversaciones.
- [ ] El bot responde automaticamente con `SEND_WHATSAPP_REPLIES=true`.
- [ ] El cliente aprueba la respuesta recibida.
- [ ] Hay procedimiento claro para apagar el envio si algo falla.
