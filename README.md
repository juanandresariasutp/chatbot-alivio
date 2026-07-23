# Chatbot Alivio

Proyecto para disenar e implementar un chatbot de atencion al cliente para
ALIVIO 360, orientado inicialmente a WhatsApp e Instagram con backend en
Cloudflare Workers.

## Estado

**Fase actual:** preparacion de produccion mientras Meta revisa la empresa.

El Worker ya recibe webhooks, clasifica mensajes, guarda conversaciones en D1 y
tiene envio real preparado detras de variables de activacion. Las respuestas
reales deben permanecer apagadas hasta que Meta apruebe la empresa y el cliente
autorice salida a produccion.

## Documentacion

1. [Requerimientos iniciales](docs/01-requerimientos.md)
2. [Inventario de cuentas y accesos](docs/02-inventario-cuentas-accesos.md)
3. [Informacion del negocio](docs/03-informacion-negocio.md)
4. [Preguntas frecuentes](docs/04-preguntas-frecuentes.md)
5. [Alcance del MVP](docs/05-alcance-mvp.md)
6. [Pendientes para cerrar el Dia 1](docs/06-pendientes-dia-1.md)
7. [Flujo conversacional](docs/07-flujo-conversacional.md)
8. [Catalogo de respuestas](docs/08-catalogo-respuestas.md)
9. [Pruebas conversacionales](docs/09-pruebas-conversacionales.md)
10. [Arquitectura tecnica del Dia 3](docs/10-arquitectura-dia-3.md)
11. [Normalizacion y clasificacion](docs/11-normalizacion-y-clasificacion.md)
12. [Webhook de prueba local](docs/12-webhook-prueba-local.md)
13. [Integracion con WhatsApp](docs/13-integracion-whatsapp.md)
14. [Checklist Meta y WhatsApp](docs/14-checklist-meta-whatsapp.md)
15. [Evidencias de pruebas WhatsApp](docs/15-evidencias-whatsapp.md)
16. [Integracion con Instagram](docs/16-integracion-instagram.md)
17. [Persistencia y handoff](docs/17-persistencia-y-handoff.md)
18. [Pruebas integrales](docs/18-pruebas-integrales.md)
19. [Manual de mantenimiento](docs/19-manual-mantenimiento.md)
20. [Guia de entrega del MVP](docs/20-guia-entrega-mvp.md)
21. [Backlog de mejoras](docs/21-backlog-mejoras.md)
22. [Estado actual del MVP](docs/22-estado-actual-mvp.md)
23. [Deployment en Cloudflare Workers](docs/23-deployment-cloudflare.md)
24. [Configuracion de Wrangler](docs/24-configuracion-wrangler.md)
25. [Evidencias Cloudflare](docs/25-evidencias-cloudflare.md)
26. [Configuracion Meta para produccion](docs/26-configuracion-meta-produccion.md)
27. [Activacion controlada de respuestas reales](docs/27-activacion-envio-real.md)

## Estructura

```text
.
|-- docs/       # Requerimientos, guias y evidencias
|-- src/        # Codigo del chatbot y Worker
|-- tests/      # Pruebas automatizadas
|-- website/    # Pagina publica de ALIVIO 360
`-- workflows/  # Payloads y flujos versionables
```

## Seguridad

- No subir contrasenas, tokens, claves de API, secretos de Meta ni datos personales.
- Usar variables de entorno y Cloudflare secrets para credenciales.
- Mantener `SEND_WHATSAPP_REPLIES=false` hasta autorizacion de produccion.
- Anonimizar cualquier evidencia de prueba antes de versionarla.
- Revisar flujos y archivos exportados antes de hacer commit.

## Pruebas locales

Ejecutar toda la suite:

```bash
npm test
```

Levantar el webhook local de prueba:

```bash
npm start
```

## Siguiente hito

Una vez Meta apruebe la empresa, el siguiente paso es verificar webhooks de
produccion, configurar secretos finales y activar `SEND_WHATSAPP_REPLIES=true`
solo despues de una prueba controlada.
