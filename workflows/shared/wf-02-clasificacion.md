# WF-02 - Clasificación

## Objetivo

Detectar la intención inicial del mensaje usando reglas simples y palabras clave.

## Entrada

Payload normalizado desde WF-01.

## Salida

```json
{
  "intent": "agendamiento",
  "response_id": "RESP-008",
  "requires_human": true,
  "next_status": "WAITING_CUSTOMER"
}
```

## Pasos

1. Limpiar texto.
2. Comparar con palabras clave.
3. Aplicar prioridad de intención.
4. Asignar `response_id`.
5. Definir `requires_human`.
6. Definir siguiente estado.

## Fallback

Si no hay coincidencia, usar:

```json
{
  "intent": "fallback",
  "response_id": "RESP-013",
  "requires_human": false,
  "next_status": "BOT_ACTIVE"
}
```
