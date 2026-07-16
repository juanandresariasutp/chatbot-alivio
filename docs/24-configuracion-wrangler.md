# Configuración de Wrangler

> Estado: plantilla preparada. No desplegar hasta tener cuenta de Cloudflare del cliente.

## Estado actual

- Worker creado en Cloudflare.
- Base D1 `chatbot-alivio` creada.
- `wrangler.toml` local creado a partir de `wrangler.example.toml`.
- `wrangler.toml` está ignorado por Git.
- Esquema `src/d1-schema.sql` aplicado correctamente en D1 remoto.
- Worker desplegado correctamente desde el repositorio.
- `WEBHOOK_VERIFY_TOKEN` configurado como secreto de Cloudflare.

URL actual del Worker:

```text
https://chatbot.alivio-360boy.workers.dev
```

Validación realizada:

```text
GET /health -> 200
GET /webhook/whatsapp con token correcto -> challenge
GET /webhook/instagram con token incorrecto -> 403
```

## Objetivo

Preparar la configuración necesaria para desplegar el Worker sin guardar datos específicos de la cuenta en Git.

## Archivo de plantilla

El repositorio incluye:

```text
wrangler.example.toml
```

Cuando la cuenta de Cloudflare esté lista, copiarlo localmente:

```bash
copy wrangler.example.toml wrangler.toml
```

En PowerShell también sirve:

```powershell
Copy-Item wrangler.example.toml wrangler.toml
```

## Archivo local no versionado

`wrangler.toml` debe quedar fuera de Git si contiene IDs reales de la cuenta.

Debe contener:

- nombre del Worker;
- binding de D1;
- `database_id` real;
- variables no secretas.

## Secretos

No escribir tokens reales en `wrangler.toml`.

Usar secretos de Cloudflare:

```bash
npx wrangler secret put WEBHOOK_VERIFY_TOKEN
npx wrangler secret put WHATSAPP_ACCESS_TOKEN
npx wrangler secret put WHATSAPP_PHONE_NUMBER_ID
npx wrangler secret put INSTAGRAM_ACCESS_TOKEN
npx wrangler secret put INSTAGRAM_ACCOUNT_ID
```

## D1

Cuando exista la cuenta de Cloudflare:

```bash
npx wrangler d1 create chatbot-alivio
```

Luego copiar el `database_id` al `wrangler.toml` local.

Para aplicar el esquema:

```bash
npx wrangler d1 execute chatbot-alivio --file=src/d1-schema.sql
```

Para aplicarlo en la base remota:

```bash
npx wrangler d1 execute chatbot-alivio --remote --file=src/d1-schema.sql --yes
```

Para verificar tablas:

```bash
npx wrangler d1 execute chatbot-alivio --remote --command="SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;" --json
```

## Desarrollo local futuro

Cuando Wrangler esté instalado y configurado:

```bash
npx wrangler dev
```

## Deploy futuro

Solo después de validar cuenta, secretos y permisos:

```bash
npx wrangler deploy
```

## Nota sobre costos

Antes de activar producción, confirmar con el cliente:

- quién administra Cloudflare;
- qué plan se usará;
- qué límites gratuitos aplican;
- quién aprueba cualquier cambio que pueda generar cobros.
