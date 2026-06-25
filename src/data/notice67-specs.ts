// USPS Notice 67 — Mailpiece Specification Constants
// Sources:
//   DMM 101.1.2 — Physical standards for letters and postcards
//   DMM 202     — Automation compatibility standards
//   DMM 202.4   — FIM placement
//   DMM 202.5   — Barcode clear zone
//   Publication 25 (Designing Letter and Reply Mail) — zone diagrams
//   Notice 67   — Automation Letters Template (physical plastic gauge)
//
// Rule: Do NOT change a value to "look right."
// If you cannot confirm an exact USPS-spec value, set approximate: true and explain.

// ─── Feature flag ─────────────────────────────────────────────────────────────
// Set to true once all four zone values have exact DMM/Pub 25 section citations:
//   1. OCR read area top boundary (currently from Notice 67 template measurement)
//   2. Barcode clear zone width/left boundary (currently from Pub 25 §2.4 diagram)
//   3. FIM horizontal extent (currently conservative 1.25″ — DMM 202.4.1 gives
//      placement point geometry, not a cleared width)
//   4. Return address area bounds (conventional zone, Pub 25 §1.1, no hard DMM boundary)
export const SHOW_NOTICE67_OVERLAY = false;

// ─── Physical size limits ────────────────────────────────────────────────────
// Source: DMM 101.1.2 (effective July 2023, stable through 2026 rate changes)

export const LETTER_SPEC = {
  height:       { min: 3.5,   max: 6.125  }, // inches — DMM 101.1.2
  length:       { min: 5.0,   max: 11.5   }, // inches — DMM 101.1.2
  thickness:    { min: 0.007, max: 0.25   }, // inches — DMM 101.1.2
  aspectRatio:  { min: 1.3,   max: 2.5    }, // L÷H   — DMM 101.1.2
  maxWeightOz:  3.5,                          // oz     — DMM 101.1.2
};

export const POSTCARD_SPEC = {
  height:       { min: 3.5,   max: 4.25   }, // inches — DMM 101.1.2
  length:       { min: 5.0,   max: 6.0    }, // inches — DMM 101.1.2
  thickness:    { min: 0.007, max: 0.016  }, // inches — DMM 101.1.2
};

// ─── Automation zone constants ────────────────────────────────────────────────
// All measurements in inches, referenced from the address side of the piece.
// Coordinate origin: BOTTOM-LEFT corner of the piece (as viewed from address side,
// held in reading orientation with the delivery address right-side-up).
//
// Confidence key:
//   confirmed   = directly cited in spec with no ambiguity
//   approximate = derived from Notice 67 template measurements or Pub 25 diagrams;
//                 exact DMM section varies by mail class / piece type.
//                 Render with warning label — never present as authoritative.

export const ZONES = {

  // ── OCR Read Area ────────────────────────────────────────────────────────
  // Delivery address MUST be placed entirely within this zone.
  // Source: Publication 25, Section 2 / DMM 202.3.2 / Notice 67 template.
  ocrReadArea: {
    fromBottomEdge:  0.625,  // confirmed — Publication 25 §2, DMM 202.3
    toBottomEdge:    2.75,   // approximate — measured from Notice 67 template;
                             // DMM 202.3 references "address area" but does not
                             // give a single universal upper bound for all sizes.
    fromLeftEdge:    0.5,    // confirmed — Publication 25 §2
    fromRightEdge:   0.5,    // confirmed — Publication 25 §2
    approximate:     true,   // top boundary is approximate
    approxNote:      'Upper boundary (2.75″ from bottom) is approximate. Sourced from Notice 67 physical template measurements. Verify against Publication 25 §2 for your specific mail class before relying on this for production artwork.',
  },

  // ── Barcode Clear Zone ───────────────────────────────────────────────────
  // This strip must be clear of all printing EXCEPT the Intelligent Mail Barcode (IMb).
  // The IMb is placed here by Cornerstone / the mail house — designers must keep it clear.
  // Source: DMM 202.5 / Publication 25, §2.4
  barcodeZone: {
    fromBottomEdge:  0.0,    // starts at bottom edge — confirmed
    toBottomEdge:    0.625,  // 5/8″ up — confirmed, DMM 202.5
    fromRightEdge:   0.5,    // right-edge boundary — confirmed, DMM 202.5.1
    extentFromRight: 4.75,   // approximate — Publication 25 diagram shows ~4.75″;
                             // exact left extent varies by piece length in some DMM editions.
    approximate:     true,
    approxNote:      'Zone width (4.75″ from right edge) is approximate. Sourced from Publication 25 §2.4 diagram. The bottom 5/8″ × 4.75″ right-side strip must be clear — confirm exact left boundary against current DMM 202.5 for your mail class.',
  },

  // ── FIM (Facing Identification Mark) location ────────────────────────────
  // FIM pattern is printed by the mail house. Designers must reserve this area.
  // Source: DMM 202.4.1
  fim: {
    fromTopEdge:     0.125,  // 1/8″ — confirmed, DMM 202.4.1
    height:          0.5,    // approximate — FIM bar field is nominally 1/2″ tall
    fromRightEdge:   0.5,    // confirmed start point — DMM 202.4.1
    width:           1.25,   // approximate — width of FIM reservation zone;
                             // DMM 202.4 specifies bar geometry, not a blanket
                             // reservation width. 1.25″ is a conservative clearance.
    approximate:     true,
    approxNote:      'FIM horizontal extent (1.25″ from right) is approximate. DMM 202.4.1 specifies the bar-pattern geometry and placement point, not a full cleared width. Allow at least 1.25″ from right edge in the top 5/8″ of the piece.',
  },

  // ── Return Address Area ───────────────────────────────────────────────────
  // Conventional upper-left placement. USPS does not specify a hard boundary
  // for return address position (unlike OCR read area and barcode zone).
  returnAddress: {
    fromTopEdge:     0.125,
    height:          1.25,
    fromLeftEdge:    0.125,
    width:           3.5,
    approximate:     true,
    approxNote:      'Return address area is a conventional placement zone, not a USPS-specified hard boundary. Upper-left quadrant is the USPS-accepted location (Publication 25 §1.1), but exact bounds are not mandated.',
  },

} as const;

// ─── Zone display colors (RGBA for canvas overlay) ───────────────────────────
export const ZONE_COLORS = {
  ocrReadArea:    'rgba(59, 130, 246, 0.18)',   // blue
  barcodeZone:    'rgba(251, 146, 60, 0.20)',   // orange
  fim:            'rgba(34, 197, 94, 0.18)',    // green
  returnAddress:  'rgba(148, 163, 184, 0.15)',  // grey
} as const;

export const ZONE_STROKE_COLORS = {
  ocrReadArea:    'rgba(37, 99, 235, 0.7)',
  barcodeZone:    'rgba(234, 88, 12, 0.7)',
  fim:            'rgba(22, 163, 74, 0.7)',
  returnAddress:  'rgba(100, 116, 139, 0.5)',
} as const;

// ─── Helpful display labels ───────────────────────────────────────────────────
export const ZONE_LABELS = {
  ocrReadArea:    'OCR Read Area',
  barcodeZone:    'Barcode Clear Zone',
  fim:            'FIM Location',
  returnAddress:  'Return Address Area',
} as const;
