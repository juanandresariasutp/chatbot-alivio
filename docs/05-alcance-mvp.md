# Alcance del MVP del chatbot Alivio

> Estado: Propuesta pendiente de aprobación del cliente.

## 1. Objetivo del MVP

Validar que el chatbot puede atender consultas frecuentes con información aprobada, operar en el canal prioritario y transferir correctamente los casos que requieren intervención humana.

## 2. Usuario objetivo

Persona que contacta al negocio para consultar servicios, precios, horarios, ubicaciones, métodos de pago, promociones o solicitar atención de un asesor.

## 3. Alcance funcional propuesto

### Incluido

- Un canal inicial: WhatsApp, sujeto a la verificación de cuentas y aprobación del cliente.
- Mensaje de bienvenida y orientación sobre las capacidades del bot.
- Respuestas basadas en las FAQ y la información del negocio aprobadas.
- Consultas de servicios, precios, horarios, sedes, pagos y promociones.
- Detección de intención de hablar con un asesor.
- Escalamiento de casos sin respuesta, quejas y solicitudes definidas como sensibles.
- Mensaje fuera del horario de atención humana.
- Registro técnico básico de conversaciones, eventos y errores, conforme a la política de datos aprobada.
- Flujo de automatización administrado en n8n.
- Pruebas de los escenarios y criterios de aceptación de este documento.

### Fuera del alcance inicial

- Atención simultánea en Instagram y Facebook, salvo aprobación explícita.
- Pagos, cobros o almacenamiento de datos financieros.
- Agenda transaccional o confirmación automática de disponibilidad.
- Diagnósticos, recomendaciones profesionales o decisiones de alto riesgo.
- Entrenamiento de un modelo propio.
- Integraciones con CRM, ERP u otros sistemas no identificados.
- Campañas masivas, marketing saliente o plantillas promocionales.
- Panel administrativo personalizado.
- Soporte multilingüe, salvo que el cliente lo incluya expresamente.

Todo elemento fuera del alcance puede evaluarse para una fase posterior mediante una solicitud de cambio.

## 4. Flujo conversacional principal

1. El usuario envía un mensaje.
2. El bot muestra la bienvenida cuando corresponde.
3. El bot identifica la intención y consulta la fuente aprobada.
4. Si existe una respuesta confiable, responde y ofrece ayuda adicional.
5. Si se cumple una regla de escalamiento, informa al usuario y envía el contexto al asesor.
6. Fuera del horario humano, muestra el mensaje aprobado y registra la solicitud para seguimiento.
7. Si ocurre un error, evita inventar una respuesta y ofrece una salida segura.

## 5. Reglas y límites

- El bot solo debe responder con contenido aprobado o datos obtenidos de una integración autorizada.
- No debe prometer disponibilidad, precios personalizados ni resultados que no pueda confirmar.
- Debe informar claramente cuando transfiere la conversación.
- Debe minimizar la captura de datos personales.
- Debe respetar horarios, políticas y vigencias registrados por el cliente.
- La automatización no se publica hasta completar pruebas y aprobar el tratamiento de datos.

## 6. Criterios de aceptación del MVP

### Información y respuestas

- [ ] Responde correctamente las FAQ priorizadas y aprobadas.
- [ ] Informa servicios, precios, horarios y ubicaciones sin contradicciones.
- [ ] No inventa una respuesta cuando la información no existe.
- [ ] Las promociones vencidas no se presentan como vigentes.

### Atención humana

- [ ] Transfiere cuando el usuario pide hablar con un asesor.
- [ ] Transfiere los casos sensibles definidos por el cliente.
- [ ] Entrega al asesor el contexto mínimo acordado.
- [ ] Muestra el mensaje fuera de horario cuando corresponde.

### Técnica y seguridad

- [ ] El canal aprobado recibe y envía mensajes correctamente.
- [ ] Las credenciales no están almacenadas en el repositorio.
- [ ] Los errores quedan registrados sin exponer datos innecesarios.
- [ ] El flujo puede recuperarse de un error sin enviar mensajes duplicados.
- [ ] El almacenamiento y la retención de datos coinciden con lo aprobado.

### Aprobación

- [ ] El cliente ejecutó o presenció las pruebas clave.
- [ ] El cliente aprobó los mensajes y el tono.
- [ ] El responsable del cliente autorizó la salida a producción.

## 7. Escenarios mínimos de prueba

| ID | Escenario | Resultado esperado | Estado |
| --- | --- | --- | --- |
| MVP-01 | Saludo inicial | Responde con la bienvenida aprobada | Pendiente |
| MVP-02 | Consulta de un servicio | Responde con descripción y precio aprobados | Pendiente |
| MVP-03 | Consulta de horario | Devuelve el horario correcto | Pendiente |
| MVP-04 | Consulta de ubicación | Devuelve sede e indicaciones correctas | Pendiente |
| MVP-05 | Pregunta desconocida | No inventa y ofrece escalar | Pendiente |
| MVP-06 | Solicitud de asesor | Transfiere y conserva contexto | Pendiente |
| MVP-07 | Mensaje fuera de horario | Informa horario y seguimiento | Pendiente |
| MVP-08 | Error de integración | Responde de forma segura, sin duplicados | Pendiente |

## 8. Indicadores iniciales

| Indicador | Definición | Meta del MVP |
| --- | --- | --- |
| Respuestas correctas | Casos aprobados respondidos correctamente | Pendiente |
| Resolución automática | Conversaciones resueltas sin asesor | Pendiente |
| Transferencias exitosas | Escalamientos recibidos por el asesor | Pendiente |
| Tiempo de primera respuesta | Tiempo hasta el primer mensaje útil | Pendiente |
| Errores técnicos | Conversaciones afectadas por fallos | Pendiente |

## 9. Dependencias para iniciar

- Información del negocio y FAQ aprobadas.
- Número de WhatsApp identificado y viable para la integración.
- Meta Business, página y permisos verificados.
- Responsable del cliente definido.
- Propietario, pagador y modalidad de n8n definidos.
- Lugar y política de almacenamiento de datos aprobados.
- Accesos técnicos autorizados sin compartir secretos por canales inseguros.

## 10. Aprobación del alcance

| Rol | Nombre | Decisión | Fecha | Comentarios |
| --- | --- | --- | --- | --- |
| Responsable del cliente | Pendiente | Pendiente | Pendiente | Pendiente |
| Responsable del proyecto | Pendiente | Pendiente | Pendiente | Pendiente |

