# Guía de entrega del MVP

> Estado: checklist para cierre del Día 7.

## Entregables

- [ ] Repositorio actualizado.
- [ ] Documentación del flujo conversacional.
- [ ] Catálogo de respuestas.
- [ ] Webhook local probado.
- [ ] Integración simulada de WhatsApp.
- [ ] Integración simulada de Instagram.
- [ ] Persistencia local y handoff simulado.
- [ ] Pruebas automatizadas pasando.
- [ ] Variables documentadas en `.env.example`.
- [ ] Checklist de Meta/WhatsApp.
- [ ] Guía de mantenimiento.
- [ ] Backlog de mejoras.

## Validaciones técnicas

Ejecutar:

```bash
npm test
git status
```

Resultado esperado:

- todas las pruebas pasan;
- no hay cambios sin commit;
- no hay secretos en el repositorio.

## Validaciones con el cliente

- [ ] El cliente aprobó servicios.
- [ ] El cliente aprobó tarifas.
- [ ] El cliente aprobó horarios.
- [ ] El cliente aprobó ubicación.
- [ ] El cliente aprobó métodos de pago.
- [ ] El cliente aprobó mensaje de bienvenida.
- [ ] El cliente aprobó mensaje fuera de horario.
- [ ] El cliente aprobó reglas de transferencia a asesor.
- [ ] El cliente confirmó responsable de atención humana.
- [ ] El cliente confirmó tratamiento de datos personales.

## Pruebas de aceptación

| ID | Escenario | Estado |
| --- | --- | --- |
| ACEPT-001 | Saludo inicial | Pendiente |
| ACEPT-002 | Consulta de servicios | Pendiente |
| ACEPT-003 | Consulta de tarifas | Pendiente |
| ACEPT-004 | Consulta de horarios | Pendiente |
| ACEPT-005 | Consulta de ubicación | Pendiente |
| ACEPT-006 | Solicitud de cita | Pendiente |
| ACEPT-007 | Solicitud de asesor | Pendiente |
| ACEPT-008 | Pregunta no reconocida | Pendiente |
| ACEPT-009 | WhatsApp simulado | Pendiente |
| ACEPT-010 | Instagram simulado | Pendiente |
| ACEPT-011 | Handoff a asesor | Pendiente |
| ACEPT-012 | Bot pausado por humano | Pendiente |
