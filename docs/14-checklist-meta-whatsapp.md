# Checklist Meta y WhatsApp

> Estado: guía operativa para configurar WhatsApp Cloud API cuando el cliente autorice los accesos.
>
> No registrar contraseñas, tokens, códigos de verificación ni datos personales en este documento.

## 1. Propiedad y accesos

- [ ] Confirmar que el portafolio comercial pertenece al cliente.
- [ ] Confirmar que el cliente conserva control total del negocio.
- [ ] Agregar al equipo técnico como persona autorizada o socio del negocio.
- [ ] Evitar el uso permanente del usuario y contraseña del cliente.
- [ ] Registrar quién autorizó el acceso, fecha y alcance.
- [ ] Activar o confirmar autenticación en dos pasos si Meta la solicita.

## 2. Activos requeridos

- [ ] Página de Facebook del negocio identificada.
- [ ] Instagram profesional vinculado, si aplica.
- [ ] WhatsApp Business Account identificada.
- [ ] Número de WhatsApp identificado.
- [ ] App de Meta for Developers creada o confirmada.
- [ ] App asociada al negocio correcto.

## 3. Datos técnicos que deben obtenerse

| Dato | Estado | Dónde se guarda |
| --- | --- | --- |
| `META_APP_ID` | Pendiente | `.env` local o gestor de secretos |
| `META_APP_SECRET` | Pendiente | Gestor de secretos |
| `WHATSAPP_PHONE_NUMBER_ID` | Pendiente | `.env` local o gestor de secretos |
| `WHATSAPP_BUSINESS_ACCOUNT_ID` | Pendiente | `.env` local o gestor de secretos |
| `WHATSAPP_ACCESS_TOKEN` | Pendiente | Gestor de secretos |
| `WEBHOOK_VERIFY_TOKEN` | Pendiente | `.env` local y configuración de Meta |
| URL pública HTTPS del webhook | Pendiente | Documentación interna |

## 4. Configuración del webhook

- [ ] Definir URL pública HTTPS.
- [ ] Confirmar que la URL responde `GET /health`.
- [ ] Configurar callback URL con ruta `/webhook/whatsapp`.
- [ ] Configurar el mismo `WEBHOOK_VERIFY_TOKEN` en Meta y en el entorno del servidor.
- [ ] Verificar el webhook desde el panel de Meta.
- [ ] Suscribir el campo/evento `messages`.
- [ ] Confirmar que eventos de estado no disparan respuestas.

## 5. Pruebas mínimas en WhatsApp

| ID | Prueba | Estado | Evidencia |
| --- | --- | --- | --- |
| WA-001 | Verificación del webhook | Pendiente | Pendiente |
| WA-002 | Mensaje "Hola" | Pendiente | Pendiente |
| WA-003 | Consulta de servicios | Pendiente | Pendiente |
| WA-004 | Consulta de tarifas | Pendiente | Pendiente |
| WA-005 | Solicitud de cita | Pendiente | Pendiente |
| WA-006 | Mensaje no reconocido | Pendiente | Pendiente |
| WA-007 | Evento de estado ignorado | Pendiente | Pendiente |
| WA-008 | Token incorrecto rechazado | Pendiente | Pendiente |
| WA-009 | Respuesta duplicada evitada | Pendiente | Pendiente |

## 6. Criterios antes de activar envío real

- [ ] `npm test` pasa completo.
- [ ] La URL pública HTTPS está disponible.
- [ ] El webhook fue verificado por Meta.
- [ ] Se probó recepción de mensajes.
- [ ] Se confirmó que los eventos de estado se ignoran.
- [ ] El token real no está en Git.
- [ ] El envío real solo se activa con `SEND_WHATSAPP_REPLIES=true`.
- [ ] El cliente sabe cómo pausar el bot o pedir intervención humana.

## 7. Evidencia recomendada

Para cada prueba guardar:

- Fecha.
- Responsable.
- Canal.
- Entrada enviada.
- Respuesta del bot.
- Resultado.
- Observaciones.
- Captura anonimizada si aplica.
