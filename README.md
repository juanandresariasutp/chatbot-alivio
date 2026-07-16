# Chatbot Alivio

Proyecto para diseñar e implementar un chatbot de atención al cliente, inicialmente orientado a WhatsApp y automatizado con n8n. El alcance definitivo depende de la aprobación del cliente y de la verificación de sus cuentas de Meta.

## Estado

**Fase actual:** Día 7 — documentación, entrega y backlog.

No se han configurado credenciales ni integraciones. Los campos marcados como `Pendiente` deben completarse y aprobarse con el cliente antes de desarrollar o publicar el bot.

## Documentación

1. [Requerimientos iniciales](docs/01-requerimientos.md)
2. [Inventario de cuentas y accesos](docs/02-inventario-cuentas-accesos.md)
3. [Información del negocio](docs/03-informacion-negocio.md)
4. [Preguntas frecuentes](docs/04-preguntas-frecuentes.md)
5. [Alcance del MVP](docs/05-alcance-mvp.md)
6. [Pendientes para cerrar el Día 1](docs/06-pendientes-dia-1.md)
7. [Flujo conversacional](docs/07-flujo-conversacional.md)
8. [Catálogo de respuestas](docs/08-catalogo-respuestas.md)
9. [Pruebas conversacionales](docs/09-pruebas-conversacionales.md)
10. [Arquitectura técnica del Día 3](docs/10-arquitectura-dia-3.md)
11. [Normalización y clasificación](docs/11-normalizacion-y-clasificacion.md)
12. [Webhook de prueba local](docs/12-webhook-prueba-local.md)
13. [Integración con WhatsApp](docs/13-integracion-whatsapp.md)
14. [Checklist Meta y WhatsApp](docs/14-checklist-meta-whatsapp.md)
15. [Evidencias de pruebas WhatsApp](docs/15-evidencias-whatsapp.md)
16. [Integración con Instagram](docs/16-integracion-instagram.md)
17. [Persistencia y handoff](docs/17-persistencia-y-handoff.md)
18. [Pruebas integrales](docs/18-pruebas-integrales.md)
19. [Manual de mantenimiento](docs/19-manual-mantenimiento.md)
20. [Guía de entrega del MVP](docs/20-guia-entrega-mvp.md)
21. [Backlog de mejoras](docs/21-backlog-mejoras.md)

## Cómo completar el Día 1

1. Reunirse con el responsable del cliente.
2. Completar la información del negocio y recopilar sus fuentes.
3. Redactar las FAQ y obtener aprobación de sus respuestas.
4. Revisar las cuentas usando el inventario, sin guardar secretos en Git.
5. Acordar reglas de atención humana, datos, n8n y canal inicial.
6. Revisar y firmar el alcance del MVP.
7. Marcar los criterios de aceptación en los documentos.

## Estructura

```text
.
├── docs/       # Requerimientos, inventarios, FAQ y alcance
├── src/        # Código o componentes propios del chatbot
├── tests/      # Pruebas automatizadas y casos verificables
└── workflows/  # Exportaciones versionables de flujos de n8n
```

## Seguridad

- No subir contraseñas, tokens, claves de API, secretos de Meta ni datos personales.
- Usar variables de entorno y un gestor de secretos para credenciales.
- Anonimizar cualquier evidencia de prueba antes de versionarla.
- Revisar los flujos exportados de n8n antes de hacer commit.

## Pruebas locales

Ejecutar las pruebas de reglas y webhook simulado:

```bash
npm test
```

Levantar el webhook local de prueba:

```bash
npm start
```

## Siguiente hito

Una vez aprobada la entrega del MVP, el siguiente paso es resolver accesos de Meta, hosting, almacenamiento durable y notificaciones reales al asesor.
