# Configuración Meta para producción

> Estado: guía operativa para conectar Meta con el Worker ya desplegado.
>
> No guardar tokens, secretos ni códigos de verificación en Git.

## URL base del backend

```text
https://chatbot.alivio-360boy.workers.dev
```

## WhatsApp

Callback URL:

```text
https://chatbot.alivio-360boy.workers.dev/webhook/whatsapp
```

Verify token:

```text
Usar el mismo WEBHOOK_VERIFY_TOKEN configurado como secreto en Cloudflare.
```

Evento/campo a suscribir:

```text
messages
```

Antes de activar respuestas reales:

- [ ] Confirmar `WHATSAPP_PHONE_NUMBER_ID`.
- [ ] Confirmar `WHATSAPP_BUSINESS_ACCOUNT_ID`.
- [ ] Configurar `WHATSAPP_ACCESS_TOKEN` como secreto en Cloudflare.
- [ ] Configurar `WHATSAPP_PHONE_NUMBER_ID` como secreto o variable segura.
- [ ] Mantener `SEND_WHATSAPP_REPLIES=false` durante pruebas de recepción.
- [ ] Cambiar a `SEND_WHATSAPP_REPLIES=true` solo después de pruebas aprobadas.

## Instagram

Callback URL:

```text
https://chatbot.alivio-360boy.workers.dev/webhook/instagram
```

Verify token:

```text
Usar el mismo WEBHOOK_VERIFY_TOKEN configurado como secreto en Cloudflare.
```

Antes de activar respuestas reales:

- [ ] Confirmar que Instagram es profesional.
- [ ] Confirmar vínculo con la página de Facebook correcta.
- [ ] Confirmar permisos de mensajería.
- [ ] Confirmar `INSTAGRAM_ACCOUNT_ID`.
- [ ] Configurar `INSTAGRAM_ACCESS_TOKEN` como secreto en Cloudflare.
- [ ] Mantener `SEND_INSTAGRAM_REPLIES=false` durante pruebas de recepción.
- [ ] Cambiar a `SEND_INSTAGRAM_REPLIES=true` solo después de pruebas aprobadas.

## Comandos útiles de Cloudflare

Configurar secretos:

```bash
npx wrangler secret put WHATSAPP_ACCESS_TOKEN
npx wrangler secret put WHATSAPP_PHONE_NUMBER_ID
npx wrangler secret put INSTAGRAM_ACCESS_TOKEN
npx wrangler secret put INSTAGRAM_ACCOUNT_ID
```

Actualizar variables no secretas en `wrangler.toml` local y redesplegar:

```bash
npx wrangler deploy
```

## Pruebas mínimas después de conectar Meta

| ID | Canal | Prueba | Resultado esperado |
| --- | --- | --- | --- |
| META-001 | WhatsApp | Verificar webhook | Meta acepta el callback |
| META-002 | WhatsApp | Enviar "Hola" desde usuario autorizado | Worker recibe y registra conversación |
| META-003 | WhatsApp | Recibir evento de estado | Worker ignora evento |
| META-004 | Instagram | Verificar webhook | Meta acepta el callback |
| META-005 | Instagram | Enviar DM desde usuario autorizado | Worker recibe y registra conversación |
| META-006 | Instagram | Recibir evento `is_echo` | Worker ignora evento |

## Criterio para activar envío real

No activar envío real hasta que:

- [ ] recepción funcione en ambos canales requeridos;
- [ ] D1 registre conversaciones;
- [ ] eventos duplicados o de estado no generen respuestas;
- [ ] cliente apruebe mensajes;
- [ ] exista responsable humano para handoff;
- [ ] el cliente autorice explícitamente salida a producción.
