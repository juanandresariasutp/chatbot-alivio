# Evidencias Cloudflare

> Fecha de prueba: 2026-07-16.
>
> Entorno: Cloudflare Workers público.

## URL probada

```text
https://chatbot.alivio-360boy.workers.dev
```

## Pruebas ejecutadas

| ID | Endpoint | Resultado |
| --- | --- | --- |
| CF-001 | `GET /health` | `200`, servicio activo |
| CF-002 | `GET /webhook/whatsapp` con verify token correcto | `200`, devuelve challenge |
| CF-003 | `GET /webhook/instagram` con verify token incorrecto | `403`, rechaza verificación |
| CF-004 | `POST /webhook/whatsapp` con payload simulado de texto | `200`, clasifica `agendamiento` |
| CF-005 | `POST /webhook/instagram` con payload simulado de texto | `200`, clasifica `servicios` |
| CF-006 | `POST /webhook/whatsapp` con evento de estado | `200`, ignora `status_event` |
| CF-007 | `POST /webhook/whatsapp` con D1 activo | `200`, registra conversación y mensajes |
| CF-008 | Consulta D1 remota | 1 conversación, 2 mensajes, 1 evento procesado |

## Notas

- Las pruebas se ejecutaron con payloads simulados del repositorio.
- El envío real hacia WhatsApp e Instagram sigue desactivado.
- Los tokens reales de Meta todavía no están configurados.
- La persistencia durable en D1 está conectada al Worker cuando existe el binding `env.DB`.
- El Worker desplegado ya registró datos de prueba en D1 remoto.

## Pendientes

- [x] Conectar el handler del Worker a D1 para persistencia durable real.
- [x] Verificar escrituras reales en D1 remoto.
- [ ] Configurar secretos reales de Meta.
- [ ] Configurar webhooks reales en Meta Developers.
- [ ] Probar con usuarios autorizados.
