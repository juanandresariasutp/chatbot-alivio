# Flujos de n8n

Esta carpeta contendrá exportaciones revisadas y versionables de los flujos de n8n.

Mientras no exista una exportación real, se documentan los workflows en Markdown para acordar estructura, entradas, salidas y reglas.

Antes de guardar un flujo:

- Eliminar o sustituir credenciales y secretos.
- Confirmar que no contiene datos reales de clientes.
- Documentar su versión, propósito y dependencias.
- Probar la importación en un entorno seguro.

## Estructura inicial

```text
workflows/
├── shared/         # Lógica común del chatbot
├── whatsapp/       # Integración de WhatsApp
├── instagram/      # Integración de Instagram
├── test-payloads/  # Eventos simulados para pruebas
└── private/        # Archivos locales no versionados
```

