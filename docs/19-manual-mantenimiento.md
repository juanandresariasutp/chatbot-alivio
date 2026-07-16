# Manual de mantenimiento

> Estado: guía operativa inicial para el MVP.

## Objetivo

Explicar cómo revisar, probar y mantener el chatbot de ALIVIO 360 durante la fase MVP.

## Requisitos locales

- Node.js 18 o superior.
- Acceso al repositorio.
- Archivo `.env` local creado a partir de `.env.example`.
- Credenciales reales guardadas fuera de Git.

## Ejecutar pruebas

```bash
npm test
```

El proyecto no requiere dependencias externas por ahora. Usa módulos nativos de Node.js.

## Ejecutar servidor local

```bash
npm start
```

Rutas principales:

| Ruta | Uso |
| --- | --- |
| `GET /health` | Verificar que el servidor está activo |
| `GET /conversations` | Revisar conversaciones en memoria |
| `POST /webhook/test-message` | Probar mensajes simulados |
| `GET /webhook/whatsapp` | Verificación de webhook WhatsApp |
| `POST /webhook/whatsapp` | Recepción de eventos WhatsApp |
| `GET /webhook/instagram` | Verificación de webhook Instagram |
| `POST /webhook/instagram` | Recepción de eventos Instagram |

## Actualizar respuestas

Las respuestas están en:

- `docs/08-catalogo-respuestas.md`
- `src/responses.js`

Proceso recomendado:

1. Editar primero el documento.
2. Obtener aprobación del cliente si cambia información comercial o clínica.
3. Actualizar `src/responses.js`.
4. Ejecutar `npm test`.
5. Hacer commit.

## Activar envío real

Por defecto el envío real está desactivado.

Para WhatsApp:

```env
SEND_WHATSAPP_REPLIES=true
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_PHONE_NUMBER_ID=
```

Para Instagram:

```env
SEND_INSTAGRAM_REPLIES=true
INSTAGRAM_ACCESS_TOKEN=
INSTAGRAM_ACCOUNT_ID=
```

Antes de activar:

- [ ] Confirmar que `npm test` pasa.
- [ ] Confirmar que la URL pública HTTPS funciona.
- [ ] Confirmar que los tokens no están en Git.
- [ ] Confirmar que el cliente aprobó textos y alcance.
- [ ] Probar con usuarios autorizados.

## Pausar el bot

En el MVP local, una conversación en estado `HUMAN_ACTIVE` no recibe respuesta automática.

Pendiente para producción:

- definir una herramienta para marcar conversaciones como `HUMAN_ACTIVE`;
- definir quién puede pausar o reactivar el bot;
- registrar cada cambio de estado.
