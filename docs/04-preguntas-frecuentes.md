# Preguntas frecuentes de ALIVIO 360

> Fuente: información entregada por el cliente el 2026-07-14.
>
> Estado: contenido organizado, pendiente de aprobación formal antes de publicación.

## FAQ aprobables para el bot

### FAQ-001 — ¿Qué servicios ofrecen?

En ALIVIO 360 nos enfocamos en aliviar el dolor y recuperar el movimiento mediante un tratamiento personalizado. Ofrecemos fisioterapia, quiropraxia, terapia manual, ozonoterapia, masaje descontracturante, descargas musculares, ejercicio terapéutico y rehabilitación.

**Requiere asesor:** No, salvo que el usuario solicite una recomendación clínica individual.

### FAQ-002 — ¿Cuánto cuesta la consulta?

La Terapia Integral 360 tiene un valor de **$100.000 COP** e incluye valoración fisioterapéutica, diagnóstico funcional y tratamiento personalizado en la misma sesión.

Las terapias enfocadas en una zona específica cuestan entre **$50.000 y $80.000 COP**, según la valoración y el tratamiento requerido.

**Requiere asesor:** Sí, para confirmar el valor aplicable y la disponibilidad.

**Pendiente:** confirmar vigencia de precios, duración de las sesiones e impuestos si aplican.

### FAQ-003 — ¿Qué incluye la Terapia Integral 360?

Incluye valoración fisioterapéutica, diagnóstico funcional, tratamiento personalizado durante la misma sesión, recomendaciones y un plan de manejo para continuar la recuperación.

**Requiere asesor:** No para informar; sí para recomendar o agendar.

### FAQ-004 — ¿Cuál es el horario de atención?

Atendemos únicamente con cita previa:

- Lunes, miércoles y viernes: 8:00 a. m.–12:00 p. m. y 2:00–5:00 p. m.
- Martes y jueves: 8:00 a. m.–12:00 p. m.; contamos con horario extendido en la tarde y la última cita es a las 6:45 p. m.
- Sábados: con cita previa; el horario debe confirmarse con un asesor.

**Zona horaria:** Colombia (`America/Bogota`).

**Pendiente:** confirmar domingos, festivos y hora exacta de inicio del bloque de la tarde extendida.

### FAQ-005 — ¿Atienden solo con cita?

Sí. Trabajamos únicamente con cita previa para garantizar el tiempo y la atención personalizada de cada paciente.

### FAQ-006 — ¿Cómo puedo agendar una cita?

Indícanos:

- Tu nombre.
- El motivo de consulta.
- El día y horario de preferencia.

Un asesor confirmará la disponibilidad. La cita no queda agendada hasta recibir esa confirmación.

**Requiere asesor:** Sí.

### FAQ-007 — ¿Qué métodos de pago reciben?

Aceptamos transferencias por Bancolombia, Nequi, Daviplata y efectivo.

**Pendiente:** confirmar si se aceptan tarjetas, anticipos y condiciones de pago. El bot no debe enviar datos bancarios hasta aprobar un flujo seguro.

### FAQ-008 — ¿Atienden lesiones deportivas?

Sí. Atendemos lesiones deportivas, sobrecargas musculares, tendinitis, esguinces, recuperación posterior al entrenamiento y procesos de retorno al deporte. El tratamiento se define después de una valoración profesional.

### FAQ-009 — ¿Atienden dolor de espalda, cuello u otras zonas?

Sí. Atendemos dolor lumbar y cervical, hernias discales, ciática, contracturas y dolor de hombro, rodilla, tobillo, codo, muñeca y otras alteraciones musculoesqueléticas. Una valoración profesional permite definir el manejo adecuado para cada caso.

### FAQ-010 — ¿Voy a mejorar en una sola sesión?

Algunas personas pueden sentir alivio desde la primera sesión; sin embargo, no es posible garantizar un resultado. El número de sesiones depende de la valoración profesional, el tiempo de evolución y la respuesta individual al tratamiento.

### FAQ-011 — ¿La valoración tiene costo?

La valoración está incluida en la Terapia Integral 360, cuyo valor es de **$100.000 COP**. No se cobra por separado dentro de esa modalidad.

### FAQ-012 — ¿Dónde están ubicados?

Estamos ubicados en la **Calle 5 #35-39, Duitama, Boyacá**. Podemos enviarte la ubicación por WhatsApp.

**Pendiente:** agregar y verificar el enlace exacto de Google Maps.

### FAQ-013 — ¿Qué debo llevar a la consulta?

Te recomendamos llevar ropa cómoda, una toalla grande, exámenes o imágenes diagnósticas si los tienes y fórmula médica si aplica.

### FAQ-014 — ¿Qué hace diferente a ALIVIO 360?

Nuestro enfoque busca no solo disminuir el dolor, sino identificar su causa y abordarla integralmente mediante fisioterapia, terapia manual, ejercicio terapéutico y otras herramientas seleccionadas según las necesidades de cada paciente.

### FAQ-015 — ¿Qué tratamiento necesito?

Para definir el tratamiento adecuado es necesaria una valoración profesional. El bot puede explicarte los servicios y ayudarte a solicitar una cita, pero no puede diagnosticar ni prescribir un tratamiento.

**Requiere asesor:** Sí.

## Intenciones y ejemplos que debe reconocer el bot

| Intención | Ejemplos | Acción esperada |
| --- | --- | --- |
| Saludo | Hola, buenos días, necesito información | Dar bienvenida y presentar opciones |
| Servicios | ¿Qué ofrecen?, necesito fisioterapia, quiero quiropraxia, necesito masaje | Mostrar servicios y ofrecer cita |
| Precios | ¿Cuánto cuesta?, ¿qué vale la terapia? | Informar rangos y aclarar que dependen de valoración |
| Horarios | ¿Qué horarios manejan?, ¿atienden hoy? | Responder según día y solicitar confirmación si aplica |
| Ubicación | ¿Dónde están?, envíame la ubicación | Dar dirección y, cuando exista, enlace de mapa |
| Métodos de pago | ¿Reciben Nequi?, ¿aceptan transferencia? | Informar métodos aprobados |
| Agendamiento | Quiero una cita, quiero agendar | Solicitar nombre, motivo, día y hora; transferir para confirmación |
| Dolor o lesión | Me duele la espalda, cuello o rodilla; tengo una hernia | Dar información general, evitar diagnóstico y ofrecer valoración |
| Lesión deportiva | ¿Atienden deportistas?, tengo una sobrecarga | Informar servicio y ofrecer valoración |
| Tratamiento recomendado | ¿Qué tratamiento necesito? | Explicar límite del bot y transferir a valoración profesional |
| Atención humana | Quiero hablar con una persona | Transferir con el contexto disponible |

## Casos que deben escalarse

| Caso | Acción del bot | Prioridad |
| --- | --- | --- |
| Solicitud de cita o confirmación de disponibilidad | Recopilar nombre, motivo, día y horario preferido; enviar al asesor | Normal |
| Usuario pide hablar con una persona | Confirmar la transferencia y entregar contexto | Normal |
| No existe una respuesta aprobada | No inventar; ofrecer transferencia | Normal |
| Solicitud de diagnóstico o tratamiento individual | Aclarar límites y ofrecer valoración profesional | Normal |
| Queja, reclamo o solicitud de devolución | Mostrar mensaje empático y transferir | Alta |
| Posible urgencia o síntomas de alarma | Indicar que el bot no atiende emergencias y recomendar buscar atención de urgencias | Alta |
| Datos sensibles o situación clínica compleja | Evitar profundizar por chat y transferir | Alta |

## Control de calidad pendiente

- [ ] El cliente aprobó todas las respuestas y el tono.
- [ ] Se confirmó la vigencia de los precios.
- [ ] Se confirmó el horario de sábados, domingos y festivos.
- [ ] Se agregó el enlace verificado de ubicación.
- [ ] Se definió el mensaje fuera de horario.
- [ ] Se probaron distintas formas de expresar cada intención.
- [ ] Se aprobó el protocolo para urgencias y datos personales.
