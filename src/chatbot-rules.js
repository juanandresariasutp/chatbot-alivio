const RESPONSE_BY_INTENT = {
  saludo: "RESP-001",
  servicios: "RESP-002",
  tarifas: "RESP-003",
  terapia_integral: "RESP-004",
  horarios: "RESP-005",
  ubicacion: "RESP-006",
  pagos: "RESP-007",
  agendamiento: "RESP-008",
  dolor_lesion: "RESP-009",
  que_llevar: "RESP-010",
  asesor: "RESP-011",
  fallback: "RESP-013",
  limite_clinico: "RESP-015",
  urgencia: "RESP-016"
};

const HUMAN_INTENTS = new Set([
  "agendamiento",
  "asesor",
  "limite_clinico",
  "urgencia"
]);

const INTENT_RULES = [
  {
    intent: "urgencia",
    keywords: [
      "urgencia",
      "emergencia",
      "no puedo caminar",
      "perdida de fuerza",
      "perdida de sensibilidad",
      "dolor muy fuerte"
    ]
  },
  {
    intent: "asesor",
    keywords: ["asesor", "persona", "humano", "hablar con alguien", "atiendame"]
  },
  {
    intent: "agendamiento",
    keywords: ["cita", "agendar", "reservar", "disponibilidad", "turno"]
  },
  {
    intent: "limite_clinico",
    keywords: [
      "que tratamiento necesito",
      "que tengo",
      "diagnosticar",
      "diagnostico",
      "interpretar examen"
    ]
  },
  {
    intent: "tarifas",
    keywords: ["cuesta", "precio", "vale", "valor", "tarifa", "cuanto"]
  },
  {
    intent: "horarios",
    keywords: ["horario", "atienden", "abierto", "hoy", "sabado", "domingo"]
  },
  {
    intent: "ubicacion",
    keywords: ["ubicacion", "direccion", "donde estan", "llegar", "mapa"]
  },
  {
    intent: "pagos",
    keywords: [
      "pago",
      "pagar",
      "nequi",
      "daviplata",
      "bancolombia",
      "efectivo",
      "transferencia",
      "tarjeta"
    ]
  },
  {
    intent: "dolor_lesion",
    keywords: [
      "dolor",
      "espalda",
      "cuello",
      "rodilla",
      "hombro",
      "tobillo",
      "codo",
      "muneca",
      "ciatica",
      "contractura",
      "tendinitis",
      "esguince",
      "lesion",
      "hernia"
    ]
  },
  {
    intent: "servicios",
    keywords: [
      "servicios",
      "ofrecen",
      "fisioterapia",
      "quiropraxia",
      "masaje",
      "ozonoterapia",
      "terapia manual",
      "rehabilitacion"
    ]
  },
  {
    intent: "que_llevar",
    keywords: ["llevar", "ropa", "toalla", "examenes", "formula"]
  },
  {
    intent: "saludo",
    keywords: ["hola", "buenos dias", "buenas tardes", "informacion"]
  }
];

function cleanText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizePayload(payload) {
  return {
    event_id: payload.event_id || null,
    channel: payload.channel || "test",
    external_user_id: payload.external_user_id || null,
    customer_name: payload.customer_name || null,
    message_type: payload.message_type || "unknown",
    message_text: payload.message_text || "",
    timestamp: payload.timestamp || new Date().toISOString(),
    raw: payload.raw || payload
  };
}

function classifyMessage(messageText) {
  const text = cleanText(messageText);

  for (const rule of INTENT_RULES) {
    if (rule.keywords.some((keyword) => text.includes(cleanText(keyword)))) {
      return rule.intent;
    }
  }

  return "fallback";
}

function buildClassification(intent) {
  const requiresHuman = HUMAN_INTENTS.has(intent);

  return {
    intent,
    confidence: intent === "fallback" ? "fallback" : "rule_match",
    requires_human: requiresHuman,
    response_id: RESPONSE_BY_INTENT[intent] || RESPONSE_BY_INTENT.fallback,
    next_status: requiresHuman ? "WAITING_CUSTOMER" : "BOT_ACTIVE"
  };
}

function processPayload(payload) {
  const normalized = normalizePayload(payload);

  if (!normalized.external_user_id) {
    return {
      normalized,
      classification: {
        intent: "error",
        confidence: "validation_error",
        requires_human: false,
        response_id: null,
        next_status: "ERROR"
      },
      errors: ["Missing external_user_id"]
    };
  }

  if (normalized.message_type !== "text") {
    return {
      normalized,
      classification: {
        intent: "unsupported_message_type",
        confidence: "validation_rule",
        requires_human: true,
        response_id: "RESP-014",
        next_status: "WAITING_ADVISOR"
      },
      errors: []
    };
  }

  const intent = classifyMessage(normalized.message_text);

  return {
    normalized,
    classification: buildClassification(intent),
    errors: []
  };
}

module.exports = {
  cleanText,
  normalizePayload,
  classifyMessage,
  processPayload
};
