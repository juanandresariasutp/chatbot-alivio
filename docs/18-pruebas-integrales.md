# Pruebas integrales

> Estado: pruebas locales automatizadas para validar el flujo completo antes de conectar producción.

## Objetivo

Validar que la lógica central funciona de punta a punta:

- entrada simulada;
- normalización;
- clasificación;
- respuesta;
- persistencia;
- handoff;
- control de duplicados;
- silencio del bot durante atención humana.

## Comandos

```bash
npm test
```

Prueba específica:

```bash
npm run test:store
```

## Casos cubiertos

| ID | Escenario | Resultado esperado |
| --- | --- | --- |
| E2E-001 | Usuario pide cita | Clasifica `agendamiento`, responde y genera handoff |
| E2E-002 | Evento duplicado | Ignora sin responder de nuevo |
| E2E-003 | Estado `HUMAN_ACTIVE` | El bot no responde |
| E2E-004 | WhatsApp texto | Normaliza y responde |
| E2E-005 | WhatsApp status | Ignora evento |
| E2E-006 | Instagram texto | Normaliza y responde |
| E2E-007 | Instagram echo | Ignora evento |

## Criterios de aceptación

- [ ] `npm test` pasa completo.
- [ ] No hay tokens reales en el repositorio.
- [ ] El bot evita respuestas duplicadas.
- [ ] El bot no responde si un asesor está activo.
- [ ] Las conversaciones quedan disponibles en `GET /conversations` durante pruebas locales.
