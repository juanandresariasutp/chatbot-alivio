# WF-03 - Respuestas del negocio

## Objetivo

Seleccionar la respuesta aprobada según `response_id`.

## Fuentes

- `docs/08-catalogo-respuestas.md`
- `docs/04-preguntas-frecuentes.md`
- `docs/03-informacion-negocio.md`

## Pasos

1. Recibir intención clasificada.
2. Buscar respuesta aprobada.
3. Construir mensaje.
4. Agregar opción de ayuda adicional cuando aplique.
5. Enviar al canal de origen o al webhook de prueba.

## Regla de seguridad

Si no existe una respuesta aprobada, usar `RESP-014 - Información no disponible`.
