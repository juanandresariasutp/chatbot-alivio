const RESPONSES = {
  "RESP-001": `¡Hola! 😊 Gracias por comunicarte con ALIVIO 360.

Nos especializamos en el tratamiento del dolor y la recuperación funcional mediante un enfoque integral y personalizado.

Puedo ayudarte con servicios, tarifas, citas, horarios, ubicación, métodos de pago o comunicarte con un asesor.

¿Sobre qué te gustaría recibir información?`,

  "RESP-002": `En ALIVIO 360 nos enfocamos en aliviar el dolor y recuperar el movimiento mediante un tratamiento personalizado.

Nuestros servicios son:

- Fisioterapia.
- Quiropraxia.
- Terapia manual.
- Ozonoterapia.
- Masaje descontracturante y descargas musculares.
- Ejercicio terapéutico y rehabilitación.

Si me cuentas qué molestia presentas, podemos orientarte y ayudarte a solicitar una valoración.`,

  "RESP-003": `La Terapia Integral 360 tiene un valor de $100.000 COP.

Las terapias enfocadas en una zona específica tienen un valor entre $50.000 y $80.000 COP, según la valoración y el tratamiento requerido.

Para saber cuál aplica en tu caso, lo más adecuado es realizar una valoración profesional.`,

  "RESP-004": `La Terapia Integral 360 incluye:

- Valoración fisioterapéutica.
- Diagnóstico funcional.
- Tratamiento personalizado durante la misma sesión.
- Recomendaciones y plan de manejo para continuar la recuperación.

Su valor es de $100.000 COP.`,

  "RESP-005": `Atendemos únicamente con cita previa.

- Lunes, miércoles y viernes: 8:00 a. m. a 12:00 p. m. y 2:00 p. m. a 5:00 p. m.
- Martes y jueves: 8:00 a. m. a 12:00 p. m. y jornada extendida en la tarde, con última cita a las 6:45 p. m.
- Sábados: con cita previa y disponibilidad por confirmar.`,

  "RESP-006": `Estamos ubicados en la Calle 5 #35-39, Duitama, Boyacá.

Podemos enviarte la ubicación por WhatsApp cuando la solicites.`,

  "RESP-007": `Aceptamos:

- Transferencia Bancolombia.
- Nequi.
- Daviplata.
- Efectivo.`,

  "RESP-008": `Claro, para ayudarte a solicitar una cita, por favor indícanos:

1. Nombre.
2. Motivo de consulta.
3. Día de preferencia.
4. Hora de preferencia.

Un asesor revisará la disponibilidad y te confirmará la cita. La cita no queda agendada hasta recibir confirmación.`,

  "RESP-009": `Podemos orientarte de forma general si presentas dolor de espalda, cuello, rodilla, hombro, tobillo, codo, muñeca, ciática, hernias discales, contracturas, tendinitis, esguinces o lesiones deportivas.

Para ayudarte mejor, cuéntanos qué molestia tienes, desde cuándo la presentas y si cuentas con exámenes o diagnóstico previo.

El tratamiento adecuado debe definirse mediante una valoración profesional.`,

  "RESP-010": `Te recomendamos llevar:

- Ropa cómoda.
- Una toalla grande.
- Exámenes o imágenes diagnósticas, si los tienes.
- Fórmula médica, si aplica.`,

  "RESP-011": `Claro. Te voy a comunicar con un asesor para que pueda revisar tu caso con más detalle.

Si quieres, déjanos tu nombre y el motivo de consulta para darle contexto.`,

  "RESP-012": `Gracias por escribirnos. En este momento estamos fuera del horario de atención humana.

Puedes dejarnos tu nombre, motivo de consulta y horario de preferencia. Un asesor te responderá cuando retomemos la atención.`,

  "RESP-013": `Disculpa, no logré identificar tu solicitud.

Puedes escribir una de estas opciones:

1. Servicios.
2. Tarifas.
3. Cita.
4. Horarios.
5. Ubicación.
6. Asesor.

Si prefieres, también puedes contarnos tu molestia y te ayudaremos a orientarte.`,

  "RESP-014": `No tengo información suficiente para responderte con seguridad.

Si deseas, puedo compartir tu consulta con un asesor de ALIVIO 360 para que te oriente mejor.`,

  "RESP-015": `Para definir un tratamiento específico es necesaria una valoración profesional.

Puedo explicarte nuestros servicios y ayudarte a solicitar una cita, pero no puedo diagnosticar ni indicar un tratamiento individual por este medio.`,

  "RESP-016": `Este canal no atiende emergencias.

Si presentas síntomas intensos, pérdida de fuerza, pérdida de sensibilidad, dificultad para caminar, dolor muy fuerte o una situación que consideres urgente, busca atención médica inmediata o acude a un servicio de urgencias.

También podemos compartir tu solicitud con un asesor para seguimiento cuando esté disponible.`
};

function getResponse(responseId) {
  return RESPONSES[responseId] || RESPONSES["RESP-014"];
}

module.exports = {
  RESPONSES,
  getResponse
};
