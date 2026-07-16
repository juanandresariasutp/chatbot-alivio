# Catálogo de respuestas del chatbot

> Estado: borrador funcional para automatización.
>
> Uso esperado: convertir estas respuestas en nodos, condiciones, intents o plantillas dentro de la herramienta elegida.

## Convenciones

- **ID:** identificador estable para usar en workflows o código.
- **Intención:** necesidad principal del usuario.
- **Respuesta:** texto base que enviará el bot.
- **Escala:** indica si debe pasar a asesor.
- **Datos a capturar:** información mínima si requiere seguimiento.

## Respuestas base

| ID | Intención | Escala | Datos a capturar |
| --- | --- | --- | --- |
| RESP-001 | Bienvenida | No | Ninguno |
| RESP-002 | Servicios | No | Ninguno |
| RESP-003 | Tarifas | Opcional | Motivo de consulta si quiere cita |
| RESP-004 | Terapia Integral 360 | Opcional | Motivo de consulta si quiere cita |
| RESP-005 | Horarios | Opcional | Día y hora de preferencia si quiere cita |
| RESP-006 | Ubicación | No | Ninguno |
| RESP-007 | Métodos de pago | No | Ninguno |
| RESP-008 | Agendamiento | Sí | Nombre, motivo, día, hora |
| RESP-009 | Dolor o lesión | Opcional | Molestia, tiempo de evolución, exámenes |
| RESP-010 | Qué llevar | No | Ninguno |
| RESP-011 | Hablar con asesor | Sí | Nombre y motivo |
| RESP-012 | Fuera de horario | Sí | Nombre, motivo, horario preferido |
| RESP-013 | Pregunta no reconocida | Opcional | Ninguno |
| RESP-014 | Información no disponible | Sí | Consulta del usuario |
| RESP-015 | Límite clínico | Sí | Motivo de consulta |
| RESP-016 | Urgencia o alarma | Sí | No profundizar por bot |

## RESP-001 - Bienvenida

¡Hola! 😊 Gracias por comunicarte con ALIVIO 360.

Nos especializamos en el tratamiento del dolor y la recuperación funcional mediante un enfoque integral y personalizado.

Puedo ayudarte con servicios, tarifas, citas, horarios, ubicación, métodos de pago o comunicarte con un asesor.

¿Sobre qué te gustaría recibir información?

## RESP-002 - Servicios

En ALIVIO 360 nos enfocamos en aliviar el dolor y recuperar el movimiento mediante un tratamiento personalizado.

Nuestros servicios son:

- Fisioterapia.
- Quiropraxia.
- Terapia manual.
- Ozonoterapia.
- Masaje descontracturante y descargas musculares.
- Ejercicio terapéutico y rehabilitación.

Si me cuentas qué molestia presentas, podemos orientarte y ayudarte a solicitar una valoración.

## RESP-003 - Tarifas

La Terapia Integral 360 tiene un valor de **$100.000 COP**.

Las terapias enfocadas en una zona específica tienen un valor entre **$50.000 y $80.000 COP**, según la valoración y el tratamiento requerido.

Para saber cuál aplica en tu caso, lo más adecuado es realizar una valoración profesional.

## RESP-004 - Terapia Integral 360

La Terapia Integral 360 incluye:

- Valoración fisioterapéutica.
- Diagnóstico funcional.
- Tratamiento personalizado durante la misma sesión.
- Recomendaciones y plan de manejo para continuar la recuperación.

Su valor es de **$100.000 COP**.

## RESP-005 - Horarios

Atendemos únicamente con cita previa.

- Lunes, miércoles y viernes: 8:00 a. m. a 12:00 p. m. y 2:00 p. m. a 5:00 p. m.
- Martes y jueves: 8:00 a. m. a 12:00 p. m. y jornada extendida en la tarde, con última cita a las 6:45 p. m.
- Sábados: con cita previa y disponibilidad por confirmar.

## RESP-006 - Ubicación

Estamos ubicados en la **Calle 5 #35-39, Duitama, Boyacá**.

Podemos enviarte la ubicación por WhatsApp cuando la solicites.

## RESP-007 - Métodos de pago

Aceptamos:

- Transferencia Bancolombia.
- Nequi.
- Daviplata.
- Efectivo.

## RESP-008 - Agendamiento

Claro, para ayudarte a solicitar una cita, por favor indícanos:

1. Nombre.
2. Motivo de consulta.
3. Día de preferencia.
4. Hora de preferencia.

Un asesor revisará la disponibilidad y te confirmará la cita. La cita no queda agendada hasta recibir confirmación.

## RESP-009 - Dolor o lesión

Podemos orientarte de forma general si presentas dolor de espalda, cuello, rodilla, hombro, tobillo, codo, muñeca, ciática, hernias discales, contracturas, tendinitis, esguinces o lesiones deportivas.

Para ayudarte mejor, cuéntanos qué molestia tienes, desde cuándo la presentas y si cuentas con exámenes o diagnóstico previo.

El tratamiento adecuado debe definirse mediante una valoración profesional.

## RESP-010 - Qué llevar a consulta

Te recomendamos llevar:

- Ropa cómoda.
- Una toalla grande.
- Exámenes o imágenes diagnósticas, si los tienes.
- Fórmula médica, si aplica.

## RESP-011 - Hablar con asesor

Claro. Te voy a comunicar con un asesor para que pueda revisar tu caso con más detalle.

Si quieres, déjanos tu nombre y el motivo de consulta para darle contexto.

## RESP-012 - Fuera de horario

Gracias por escribirnos. En este momento estamos fuera del horario de atención humana.

Puedes dejarnos tu nombre, motivo de consulta y horario de preferencia. Un asesor te responderá cuando retomemos la atención.

## RESP-013 - Pregunta no reconocida

Disculpa, no logré identificar tu solicitud.

Puedes escribir una de estas opciones:

1. Servicios.
2. Tarifas.
3. Cita.
4. Horarios.
5. Ubicación.
6. Asesor.

Si prefieres, también puedes contarnos tu molestia y te ayudaremos a orientarte.

## RESP-014 - Información no disponible

No tengo información suficiente para responderte con seguridad.

Si deseas, puedo compartir tu consulta con un asesor de ALIVIO 360 para que te oriente mejor.

## RESP-015 - Límite clínico

Para definir un tratamiento específico es necesaria una valoración profesional.

Puedo explicarte nuestros servicios y ayudarte a solicitar una cita, pero no puedo diagnosticar ni indicar un tratamiento individual por este medio.

## RESP-016 - Urgencia o alarma

Este canal no atiende emergencias.

Si presentas síntomas intensos, pérdida de fuerza, pérdida de sensibilidad, dificultad para caminar, dolor muy fuerte o una situación que consideres urgente, busca atención médica inmediata o acude a un servicio de urgencias.

También podemos compartir tu solicitud con un asesor para seguimiento cuando esté disponible.

## Variables sugeridas

Estas variables ayudan a convertir las respuestas en automatización:

| Variable | Descripción |
| --- | --- |
| `customer_name` | Nombre del usuario |
| `channel` | WhatsApp o Instagram |
| `external_user_id` | Identificador del usuario en el canal |
| `intent` | Intención detectada |
| `last_message` | Último mensaje recibido |
| `appointment_reason` | Motivo de consulta |
| `preferred_day` | Día de preferencia |
| `preferred_time` | Hora de preferencia |
| `requires_human` | Indica si debe escalarse |
| `conversation_status` | Estado de la conversación |

## Estados sugeridos

| Estado | Uso |
| --- | --- |
| `BOT_ACTIVE` | El bot puede responder normalmente |
| `WAITING_CUSTOMER` | El bot espera un dato del usuario |
| `WAITING_ADVISOR` | Solicitud enviada a asesor |
| `HUMAN_ACTIVE` | Asesor humano atiende la conversación |
| `RESOLVED` | Conversación finalizada |
| `ERROR` | Ocurrió un error técnico |
