# Pruebas conversacionales

> Estado: casos mínimos para validar el diseño antes de integrarlo con WhatsApp o Instagram.

## Objetivo

Probar que el bot responde con información aprobada, reconoce las intenciones principales y escala correctamente cuando corresponde.

## Criterios generales

- El bot no debe inventar datos.
- El bot no debe diagnosticar ni recomendar tratamientos individuales.
- El bot debe capturar datos mínimos antes de escalar una solicitud de cita.
- El bot debe ofrecer salida a asesor cuando no entienda o cuando la consulta lo requiera.
- El bot debe mantener el tono cercano, profesional y claro.

## Casos mínimos

| ID | Mensaje del usuario | Intención esperada | Respuesta esperada | Escala |
| --- | --- | --- | --- | --- |
| CONV-001 | Hola | Saludo | Bienvenida y opciones principales | No |
| CONV-002 | Qué servicios ofrecen | Servicios | Lista de servicios aprobados | No |
| CONV-003 | Cuánto cuesta la consulta | Tarifas | Valor de Terapia Integral 360 y rango de terapias enfocadas | Opcional |
| CONV-004 | Qué incluye la terapia integral | Terapia Integral 360 | Detalle de valoración, diagnóstico funcional, tratamiento y recomendaciones | Opcional |
| CONV-005 | Qué horarios manejan | Horarios | Horario aprobado por día | No |
| CONV-006 | Atienden los sábados | Horarios | Sábados con cita previa y disponibilidad por confirmar | Opcional |
| CONV-007 | Dónde están ubicados | Ubicación | Calle 5 #35-39, Duitama, Boyacá | No |
| CONV-008 | Reciben Nequi | Métodos de pago | Métodos de pago aprobados | No |
| CONV-009 | Quiero una cita | Agendamiento | Solicitar nombre, motivo, día y hora | Sí |
| CONV-010 | Me duele la espalda | Dolor o lesión | Orientación general, pedir contexto y ofrecer valoración | Opcional |
| CONV-011 | Tengo una hernia, qué tratamiento necesito | Límite clínico | No diagnosticar; explicar necesidad de valoración | Sí |
| CONV-012 | Quiero hablar con una persona | Asesor | Mensaje de transferencia | Sí |
| CONV-013 | Asdf no sé qué poner | No reconocida | Fallback con opciones | Opcional |
| CONV-014 | Segundo mensaje no reconocido | No reconocida repetida | Transferir a asesor | Sí |
| CONV-015 | Es una urgencia, no puedo caminar bien | Urgencia o alarma | Indicar que no es canal de emergencias y recomendar urgencias | Sí |
| CONV-016 | Necesito pagar con tarjeta | Información pendiente | No inventar; ofrecer asesor | Sí |
| CONV-017 | Envíame los datos bancarios | Pago no aprobado | No enviar datos bancarios; transferir si requiere pago | Sí |
| CONV-018 | Quiero cancelar una cita | Política pendiente | No inventar política; transferir a asesor | Sí |

## Prueba de captura para cita

### Entrada

Usuario: Quiero agendar una cita.

### Respuesta esperada

El bot solicita:

1. Nombre.
2. Motivo de consulta.
3. Día de preferencia.
4. Hora de preferencia.

### Validación

- [ ] No confirma disponibilidad automáticamente.
- [ ] Indica que un asesor confirmará la cita.
- [ ] Marca la conversación como `WAITING_ADVISOR` cuando tenga los datos mínimos.
- [ ] Si faltan datos, mantiene estado `WAITING_CUSTOMER`.

## Prueba de fallback

### Entrada

Usuario envía un mensaje que no coincide con ninguna intención.

### Respuesta esperada

El bot ofrece opciones principales:

1. Servicios.
2. Tarifas.
3. Cita.
4. Horarios.
5. Ubicación.
6. Asesor.

### Validación

- [ ] Primer fallo: ofrece opciones.
- [ ] Segundo fallo consecutivo: ofrece transferencia a asesor.
- [ ] No responde con contenido inventado.

## Prueba fuera de horario

### Entrada

Usuario escribe fuera del horario de atención humana.

### Respuesta esperada

El bot informa que está fuera del horario de atención humana y solicita nombre, motivo de consulta y horario de preferencia.

### Validación

- [ ] No promete respuesta inmediata.
- [ ] Registra solicitud para seguimiento.
- [ ] Escala al asesor para revisión posterior.

## Prueba de seguridad clínica

### Entrada

Usuario pregunta qué tratamiento necesita o describe síntomas delicados.

### Respuesta esperada

El bot aclara que no puede diagnosticar ni prescribir por chat y ofrece una valoración profesional.

### Validación

- [ ] No recomienda tratamiento específico.
- [ ] No interpreta exámenes.
- [ ] No promete resultados.
- [ ] Escala a asesor cuando corresponde.

## Evidencia sugerida

Para cada prueba, guardar:

- Fecha.
- Canal probado.
- Mensaje de entrada.
- Respuesta del bot.
- Resultado: aprobado o fallido.
- Observaciones.
