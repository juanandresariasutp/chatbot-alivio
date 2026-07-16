# Estado actual del MVP

> Fecha de corte: 2026-07-16.
>
> Estado: MVP técnico local documentado y probado con payloads simulados.

## Resumen

El proyecto cuenta con una base funcional para el chatbot de ALIVIO 360. La lógica principal está implementada en Node.js sin dependencias externas, con pruebas automatizadas y documentación por fases.

El MVP todavía no está conectado a producción en Meta porque faltan accesos finales, URL pública HTTPS, tokens seguros y validación con el cliente.

## Capacidades listas

- Flujo conversacional documentado.
- Catálogo de respuestas aprobado para revisión.
- Clasificación inicial por reglas y palabras clave.
- Webhook local de prueba.
- Normalización de mensajes simulados de WhatsApp.
- Normalización de mensajes simulados de Instagram.
- Cliente preparado para envío por WhatsApp Cloud API.
- Cliente preparado para envío por Instagram Messaging API.
- Persistencia local en memoria.
- Estados de conversación.
- Handoff simulado a asesor.
- Prevención de eventos duplicados.
- Bloqueo de respuesta automática cuando la conversación está en `HUMAN_ACTIVE`.
- Documentación de mantenimiento, entrega y backlog.

## Pruebas automatizadas

Ejecutar:

```bash
npm test
```

La suite cubre:

- reglas conversacionales;
- persistencia y handoff;
- webhook local;
- normalización de WhatsApp;
- webhook simulado de WhatsApp;
- normalización de Instagram;
- webhook simulado de Instagram.

## Endpoints locales

| Método | Ruta | Estado |
| --- | --- | --- |
| GET | `/health` | Implementado |
| GET | `/conversations` | Implementado |
| POST | `/webhook/test-message` | Implementado |
| GET | `/webhook/whatsapp` | Implementado |
| POST | `/webhook/whatsapp` | Implementado |
| GET | `/webhook/instagram` | Implementado |
| POST | `/webhook/instagram` | Implementado |

## Pendientes externos

- [ ] Confirmar accesos formales a Meta Business.
- [ ] Confirmar cuenta profesional de Instagram.
- [ ] Confirmar página de Facebook vinculada.
- [ ] Confirmar número de WhatsApp.
- [ ] Confirmar si el número usa WhatsApp Business App o proveedor externo.
- [ ] Obtener `WHATSAPP_PHONE_NUMBER_ID`.
- [ ] Obtener `WHATSAPP_BUSINESS_ACCOUNT_ID`.
- [ ] Obtener `INSTAGRAM_ACCOUNT_ID`.
- [ ] Crear tokens seguros desde el negocio del cliente.
- [x] Definir hosting y URL pública HTTPS.
- [x] Crear Worker en Cloudflare.
- [x] Crear base D1.
- [x] Aplicar esquema inicial D1.
- [x] Desplegar Worker desde el repositorio.
- [x] Verificar `/health` público.
- [x] Configurar `WEBHOOK_VERIFY_TOKEN` como secreto.
- [ ] Configurar webhooks reales en Meta.
- [ ] Probar con usuarios autorizados.

## Pendientes del cliente

- [ ] Aprobar textos del bot.
- [ ] Confirmar horario de sábados, domingos y festivos.
- [ ] Confirmar responsable humano.
- [ ] Confirmar tiempo objetivo de respuesta.
- [ ] Aprobar tratamiento de datos personales.
- [ ] Confirmar políticas de cancelación, cambios y reembolsos.
- [ ] Confirmar enlace oficial de Google Maps.

## Recomendación de siguiente fase

La siguiente fase debería enfocarse en:

1. Elegir hosting.
2. Publicar una URL HTTPS.
3. Configurar webhooks reales en Meta.
4. Probar recepción de mensajes reales.
5. Activar envío real solo después de validar con usuarios autorizados.
6. Reemplazar la persistencia en memoria por almacenamiento durable.
