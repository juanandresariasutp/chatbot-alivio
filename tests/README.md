# Pruebas

Esta carpeta contiene pruebas automatizadas, datos ficticios y casos derivados de los criterios de aceptación.

No se deben usar conversaciones ni datos personales reales.

## Ejecutar pruebas locales

```bash
node tests/run-conversation-tests.js
```

## Ejecutar pruebas de persistencia y handoff

```bash
node tests/run-conversation-store-tests.js
node tests/run-d1-store-tests.js
```

## Ejecutar prueba HTTP del webhook local

```bash
node tests/run-mock-webhook-test.js
```

## Ejecutar pruebas de WhatsApp

```bash
node tests/run-whatsapp-tests.js
node tests/run-whatsapp-webhook-test.js
```

## Ejecutar pruebas de Instagram

```bash
node tests/run-instagram-tests.js
node tests/run-instagram-webhook-test.js
```

