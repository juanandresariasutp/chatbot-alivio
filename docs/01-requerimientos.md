# Requerimientos iniciales del chatbot Alivio

> Estado del documento: Borrador para levantamiento y aprobación del cliente  
> Última actualización: 2026-07-14

## 1. Objetivo

Definir la información, las reglas y las dependencias necesarias para construir el MVP de un chatbot que atienda consultas frecuentes del negocio y transfiera la conversación a un asesor cuando sea necesario.

## 2. Participantes y responsables

| Rol | Nombre | Contacto | Responsabilidad | Estado |
| --- | --- | --- | --- | --- |
| Responsable del proyecto | Pendiente | Pendiente | Coordinar el desarrollo y los entregables | Pendiente |
| Responsable del cliente | Pendiente | Pendiente | Aprobar información, alcance y accesos | Pendiente |
| Asesor de atención humana | Pendiente | Pendiente | Recibir conversaciones escaladas | Pendiente |
| Administrador de Meta | Pendiente | Pendiente | Gestionar Meta Business y WhatsApp | Pendiente |
| Propietario de n8n | Pendiente | Pendiente | Pagar y administrar la automatización | Pendiente |

## 3. Canales del MVP

| Canal | Incluido | Cuenta o identificador | Observaciones |
| --- | --- | --- | --- |
| WhatsApp | Por definir | Pendiente | Canal principal propuesto |
| Instagram | Por definir | Pendiente | Debe ser una cuenta profesional |
| Facebook Messenger | Por definir | Pendiente | Requiere una página de Facebook |

## 4. Capacidades esperadas

- Dar la bienvenida y explicar brevemente qué puede hacer el bot.
- Responder preguntas frecuentes con información aprobada por el cliente.
- Informar servicios, precios, horarios, ubicaciones, métodos de pago y promociones vigentes.
- Detectar solicitudes que requieren atención humana.
- Transferir o notificar la conversación a un asesor con el contexto disponible.
- Mostrar el mensaje fuera de horario cuando corresponda.
- Evitar afirmar información no registrada o no aprobada.

## 5. Reglas de atención

### Tono de comunicación

- Personalidad de marca: Pendiente.
- Tratamiento al usuario (tú/usted): Pendiente.
- Nivel de formalidad: Pendiente.
- Uso de emojis: Pendiente.
- Palabras o temas que se deben evitar: Pendiente.
- Idiomas requeridos: Pendiente.

### Intervención de un asesor

La conversación debe escalarse cuando ocurra al menos una condición aprobada por el cliente:

- El usuario pide hablar con una persona.
- El bot no puede responder con certeza o falla repetidamente.
- Hay una queja, reclamo, devolución o situación sensible.
- La solicitud requiere confirmar disponibilidad, agendar, cobrar o consultar datos privados.
- Se detecta una urgencia definida por el negocio.
- Otro caso: Pendiente.

Horario de atención humana: Pendiente.  
Canal o mecanismo de notificación al asesor: Pendiente.  
Tiempo de respuesta esperado: Pendiente.

## 6. Mensajes que debe aprobar el cliente

### Bienvenida

Pendiente.

### Fuera de horario

Pendiente.

### Transferencia a un asesor

Pendiente.

### Información no disponible

Pendiente.

## 7. Datos y privacidad

| Decisión | Definición |
| --- | --- |
| Datos que recopilará el bot | Pendiente |
| Finalidad de los datos | Pendiente |
| Lugar de almacenamiento | Pendiente |
| Tiempo de conservación | Pendiente |
| Personas con acceso | Pendiente |
| Política o aviso de privacidad | Pendiente |
| Procedimiento de eliminación | Pendiente |

No se deben solicitar ni almacenar datos sensibles hasta que el cliente apruebe su finalidad, almacenamiento y controles de acceso.

## 8. Dependencias y decisiones técnicas

| Tema | Decisión | Responsable | Fecha límite |
| --- | --- | --- | --- |
| Propietario y pagador de n8n | Pendiente | Pendiente | Pendiente |
| Modalidad de n8n (Cloud/autohospedado) | Pendiente | Pendiente | Pendiente |
| Almacenamiento de datos | Pendiente | Pendiente | Pendiente |
| Proveedor/modelo de IA | Pendiente | Pendiente | Pendiente |
| Integración oficial de WhatsApp | Pendiente | Pendiente | Pendiente |

## 9. Requisitos no funcionales iniciales

- Mantener credenciales y secretos fuera del repositorio.
- Registrar errores sin exponer datos personales innecesarios.
- Permitir actualizar FAQ, servicios, precios y horarios sin rediseñar todo el flujo.
- Contar con una forma de probar respuestas antes de publicar cambios.
- Definir métricas del MVP: volumen, resolución automática, transferencias y errores.

## 10. Aprobaciones

| Aprobación | Nombre | Fecha | Evidencia o comentario |
| --- | --- | --- | --- |
| Información del negocio | Pendiente | Pendiente | Pendiente |
| Reglas de escalamiento | Pendiente | Pendiente | Pendiente |
| Tratamiento de datos | Pendiente | Pendiente | Pendiente |
| Alcance del MVP | Pendiente | Pendiente | Pendiente |

## 11. Criterios de aceptación del Día 1

- [ ] El cliente aprobó el alcance.
- [ ] Se identificó el número de WhatsApp.
- [ ] Se verificó la cuenta profesional de Instagram.
- [ ] Se verificó Meta Business.
- [ ] Se definió quién será propietario de n8n.
- [ ] Se recibió la información básica del negocio.
- [ ] Se definió un responsable del cliente.

