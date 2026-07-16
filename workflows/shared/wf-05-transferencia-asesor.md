# WF-05 - Transferencia a asesor

## Objetivo

Marcar conversaciones que necesitan atención humana y preparar el contexto para el asesor.

## Motivos de transferencia

- Solicitud de cita.
- Usuario pide asesor.
- Pregunta clínica individual.
- Información no disponible.
- Queja o situación sensible.
- Posible urgencia.
- Segundo fallback consecutivo.

## Contexto mínimo

```json
{
  "channel": "whatsapp",
  "external_user_id": "573001112233",
  "customer_name": "Usuario",
  "intent": "agendamiento",
  "last_message": "quiero una cita",
  "appointment_reason": "dolor de espalda",
  "preferred_day": "martes",
  "preferred_time": "tarde"
}
```

## Pasos

1. Cambiar estado a `WAITING_ADVISOR`.
2. Preparar resumen.
3. Notificar al asesor por el canal definido.
4. Evitar que el bot siga respondiendo si el estado pasa a `HUMAN_ACTIVE`.
