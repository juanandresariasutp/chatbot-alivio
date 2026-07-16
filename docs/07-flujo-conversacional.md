# Flujo conversacional del chatbot

> Estado: propuesta inicial para Día 2, pendiente de revisión con el equipo y aprobación del cliente.
>
> Fuente base: información entregada por el cliente y FAQ documentadas en `04-preguntas-frecuentes.md`.

## Objetivo

Diseñar la conversación principal del chatbot de ALIVIO 360 antes de construir los workflows. El flujo debe resolver preguntas frecuentes, capturar solicitudes de cita y transferir a un asesor cuando la consulta requiera atención humana.

## Principios del flujo

- Responder solo con información aprobada.
- No diagnosticar, prescribir ni prometer resultados clínicos.
- No confirmar disponibilidad de citas de forma automática.
- Capturar únicamente los datos necesarios para orientar o escalar.
- Transferir a un asesor cuando el usuario lo pida o cuando la consulta supere el alcance del bot.
- Mantener un tono cercano, empático, profesional y claro.

## Mensaje de bienvenida

¡Hola! 😊 Gracias por comunicarte con ALIVIO 360.

Nos especializamos en el tratamiento del dolor y la recuperación funcional mediante un enfoque integral y personalizado.

Puedo ayudarte con:

1. Servicios.
2. Tarifas.
3. Agendar una cita.
4. Horarios.
5. Ubicación.
6. Métodos de pago.
7. Hablar con un asesor.

¿Sobre qué te gustaría recibir información?

## Menú principal

| Opción | Intención | Acción del bot |
| --- | --- | --- |
| Servicios | Conocer qué ofrece ALIVIO 360 | Mostrar servicios y ofrecer cita |
| Tarifas | Consultar precios | Informar valores aprobados y aclarar que dependen de valoración |
| Agendar cita | Solicitar atención | Capturar datos básicos y transferir a asesor |
| Horarios | Consultar disponibilidad general | Mostrar horario aprobado |
| Ubicación | Saber dónde están | Enviar dirección y ofrecer ubicación por WhatsApp |
| Métodos de pago | Consultar formas de pago | Informar métodos aprobados |
| Asesor | Hablar con una persona | Transferir conversación |

## Flujo principal

```text
Usuario escribe
  ↓
Bot saluda o identifica intención
  ↓
¿La intención está reconocida?
  ├─ Sí → Responder con información aprobada
  │       ↓
  │     ¿Necesita cita o asesor?
  │       ├─ Sí → Capturar datos mínimos y transferir
  │       └─ No → Ofrecer ayuda adicional
  ↓
  └─ No → Mostrar opciones o fallback
          ↓
        ¿Segundo intento fallido?
          ├─ Sí → Transferir a asesor
          └─ No → Esperar nueva respuesta
```

## Respuestas por categoría

### Servicios

En ALIVIO 360 nos enfocamos en aliviar el dolor y recuperar el movimiento mediante un tratamiento personalizado.

Nuestros servicios son:

- Fisioterapia.
- Quiropraxia.
- Terapia manual.
- Ozonoterapia.
- Masaje descontracturante y descargas musculares.
- Ejercicio terapéutico y rehabilitación.

Si me cuentas qué molestia presentas o desde cuándo la tienes, podemos orientarte y ayudarte a solicitar una valoración.

### Tarifas

La Terapia Integral 360 tiene un valor de **$100.000 COP**.

Incluye valoración fisioterapéutica, diagnóstico funcional, tratamiento personalizado durante la misma sesión, recomendaciones y plan de manejo.

Las terapias enfocadas en una zona específica tienen un valor entre **$50.000 y $80.000 COP**, según la valoración y el tratamiento requerido.

Para confirmar cuál aplica en tu caso, podemos ayudarte a solicitar una cita.

### Horarios

Atendemos únicamente con cita previa.

- Lunes, miércoles y viernes: 8:00 a. m. a 12:00 p. m. y 2:00 p. m. a 5:00 p. m.
- Martes y jueves: 8:00 a. m. a 12:00 p. m. y jornada extendida en la tarde, con última cita a las 6:45 p. m.
- Sábados: con cita previa y disponibilidad por confirmar.

### Ubicación

Estamos ubicados en la **Calle 5 #35-39, Duitama, Boyacá**.

Podemos enviarte la ubicación por WhatsApp cuando la solicites.

**Pendiente:** agregar enlace verificado de Google Maps.

### Métodos de pago

Aceptamos:

- Transferencia Bancolombia.
- Nequi.
- Daviplata.
- Efectivo.

El bot no debe enviar datos bancarios hasta que el cliente apruebe un flujo seguro para pagos.

### Agendamiento

Claro, para ayudarte a solicitar una cita, por favor indícanos:

1. Nombre.
2. Motivo de consulta.
3. Día de preferencia.
4. Hora de preferencia.

Un asesor revisará la disponibilidad y te confirmará la cita. La cita no queda agendada hasta recibir confirmación.

### Dolor o lesión

Podemos orientarte de forma general si presentas dolor de espalda, cuello, rodilla, hombro, tobillo, codo, muñeca, ciática, hernias discales, contracturas, tendinitis, esguinces o lesiones deportivas.

Para ayudarte mejor, cuéntanos:

1. Qué molestia tienes.
2. Desde cuándo la presentas.
3. Si tienes exámenes, imágenes diagnósticas o diagnóstico previo.

El tratamiento adecuado debe definirse mediante una valoración profesional.

### Qué llevar a consulta

Te recomendamos llevar:

- Ropa cómoda.
- Una toalla grande.
- Exámenes o imágenes diagnósticas, si los tienes.
- Fórmula médica, si aplica.

## Intenciones iniciales

| Intención | Ejemplos |
| --- | --- |
| Saludo | Hola, buenos días, necesito información |
| Servicios | Qué servicios ofrecen, necesito fisioterapia, quiero quiropraxia |
| Tarifas | Cuánto cuesta, qué vale la terapia, precio de la consulta |
| Cita | Quiero una cita, quiero agendar, tienen disponibilidad |
| Horarios | Qué horarios manejan, atienden hoy, abren los sábados |
| Ubicación | Dónde están, cuál es la dirección, envíame la ubicación |
| Pagos | Reciben Nequi, aceptan transferencia, puedo pagar en efectivo |
| Dolor espalda | Me duele la espalda, tengo dolor lumbar |
| Dolor cuello | Me duele el cuello, tengo dolor cervical |
| Hernia | Tengo una hernia, tratan hernias discales |
| Rodilla | Tengo dolor de rodilla |
| Lesión deportiva | Atienden deportistas, tengo una sobrecarga |
| Tratamiento | Qué tratamiento necesito |
| Asesor | Quiero hablar con una persona, pásame con un asesor |

## Transferencia a asesor

El bot debe transferir cuando:

- El usuario pide hablar con una persona.
- El usuario quiere agendar o confirmar disponibilidad.
- El usuario solicita diagnóstico, tratamiento específico o interpretación clínica.
- El usuario reporta una queja, reclamo o situación sensible.
- El bot no tiene una respuesta aprobada.
- El bot no entiende después de dos intentos.

Mensaje sugerido:

Te voy a comunicar con un asesor para que pueda revisar tu caso con más detalle. Si quieres, déjanos tu nombre y el motivo de consulta para darle contexto.

## Mensaje fuera de horario

Gracias por escribirnos. En este momento estamos fuera del horario de atención humana.

Puedes dejarnos tu nombre, motivo de consulta y horario de preferencia. Un asesor te responderá cuando retomemos la atención.

## Pregunta no reconocida

Disculpa, no logré identificar tu solicitud.

Puedes escribir una de estas opciones:

1. Servicios.
2. Tarifas.
3. Cita.
4. Horarios.
5. Ubicación.
6. Asesor.

Si prefieres, también puedes contarnos tu molestia y te ayudaremos a orientarte.

## Preguntas pendientes para aprobación

- Confirmar si el mensaje de bienvenida puede usar emoji.
- Confirmar horario exacto de la jornada extendida de martes y jueves.
- Confirmar horario de sábados, domingos y festivos.
- Confirmar enlace exacto de Google Maps.
- Confirmar nombre y contacto del asesor humano.
- Confirmar protocolo para urgencias o síntomas de alarma.
- Confirmar si el bot responderá primero en WhatsApp solamente o también en Instagram desde el MVP.

## Criterios de aceptación del Día 2

- [ ] Existe mensaje de bienvenida.
- [ ] Existe menú o clasificación inicial.
- [ ] Cada categoría principal tiene una respuesta.
- [ ] Se definió la captura de datos para citas.
- [ ] Se definió cuándo transferir a asesor.
- [ ] Se definió el mensaje fuera de horario.
- [ ] Se definió el fallback para preguntas no reconocidas.
- [ ] El cliente aprobó textos, tono y límites del bot.
