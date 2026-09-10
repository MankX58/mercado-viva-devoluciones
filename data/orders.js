export const steps = [
  "Buscar pedido",
  "Validar devolución",
  "Confirmar reembolso",
];

export const testOrders = {
  "MV-2026-004281": {
    id: "MV-2026-004281",
    date: "24 de agosto de 2026",
    product: "Chaqueta urbana",
    amount: "$129.900",
    status: "eligible",
    label: "Apto para devolución",
    detail: "Dentro del plazo y con condiciones válidas.",
  },
  "MV-2026-003917": {
    id: "MV-2026-003917",
    date: "2 de agosto de 2026",
    product: "Audífonos inalámbricos",
    amount: "$89.900",
    status: "expired",
    label: "Plazo vencido",
    detail: "La compra supera los 30 días permitidos.",
  },
  "MV-2026-004106": {
    id: "MV-2026-004106",
    date: "18 de agosto de 2026",
    product: "Licuadora compacta",
    amount: "$159.900",
    status: "review",
    label: "Revisión manual",
    detail: "El producto requiere una inspección del equipo de atención.",
  },
  "MV-2026-004322": {
    id: "MV-2026-004322",
    date: "27 de agosto de 2026",
    product: "Mochila de viaje",
    amount: "$74.900",
    status: "eligible",
    label: "Apto para devolución",
    detail: "Pedido válido y dentro del plazo.",
  },
};
