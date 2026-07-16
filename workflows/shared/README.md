# Workflows compartidos

Esta carpeta documenta la lógica común del chatbot, independiente del canal.

Los flujos de WhatsApp e Instagram deben convertir sus eventos al formato normalizado y luego reutilizar esta lógica.

## Workflows

| Archivo | Propósito |
| --- | --- |
| `wf-01-entrada-normalizacion.md` | Recibir y normalizar mensajes |
| `wf-02-clasificacion.md` | Clasificar intención |
| `wf-03-respuestas-negocio.md` | Seleccionar respuesta |
| `wf-04-captura-cita.md` | Capturar datos para cita |
| `wf-05-transferencia-asesor.md` | Escalar a asesor |
| `wf-06-manejo-errores.md` | Registrar errores y responder seguro |
