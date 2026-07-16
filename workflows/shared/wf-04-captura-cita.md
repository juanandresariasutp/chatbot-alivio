# WF-04 - Captura de cita

## Objetivo

Capturar datos mínimos para que un asesor confirme disponibilidad.

## Datos requeridos

- Nombre.
- Motivo de consulta.
- Día de preferencia.
- Hora de preferencia.

## Pasos

1. Detectar intención `agendamiento`.
2. Solicitar datos faltantes.
3. Guardar datos parciales.
4. Cuando los datos estén completos, cambiar estado a `WAITING_ADVISOR`.
5. Enviar solicitud al flujo de transferencia.

## Regla

El bot no debe confirmar la cita automáticamente.
