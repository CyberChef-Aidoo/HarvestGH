/**
 * Emoji → Lucide-style icon mapping for Agro Bridge.
 * One library only (Lucide outline, stroke 1.5). Decorative emoji with no meaning are removed, not mapped.
 */

export type IconName =
  | "check"
  | "check-circle"
  | "alert-triangle"
  | "arrow-left"
  | "arrow-right"
  | "search"
  | "menu"
  | "x"
  | "message-circle"
  | "send"
  | "wheat"
  | "sprout"
  | "leaf"
  | "egg"
  | "flame"
  | "bird"
  | "apple"
  | "package";

/**
 * Semantic map (comment = original emoji / usage).
 * Used as documentation; runtime uses IconName directly in components.
 */
export const ICON_MAP = {
  /* ✓ list / form success */ check: "check",
  /* ✓ completed step */ "check-circle": "check-circle",
  /* ⚠️ empty / error state */ "alert-triangle": "alert-triangle",
  /* ← back link */ "arrow-left": "arrow-left",
  /* ➤ send */ send: "send",
  /* → chevron / next */ "arrow-right": "arrow-right",
  /* 🔍 empty search */ search: "search",
  /* ☰ mobile nav */ menu: "menu",
  /* ✕ close */ x: "x",
  /* 💬 chat fab */ "message-circle": "message-circle",
  /* 🌾 brand / rice */ wheat: "wheat",
  /* 🌱 / general crop */ sprout: "sprout",
  /* leafy crops */ leaf: "leaf",
  /* 🥚 poultry */ egg: "egg",
  /* 🌶️ pepper */ flame: "flame",
  /* live birds */ bird: "bird",
  /* fruit crops */ apple: "apple",
  /* 📦 produce listed */ package: "package",
} as const satisfies Record<string, IconName>;

/** Crop calendar: former emoji → icon */
export const CROP_ICON_MAP: Record<string, IconName> = {
  Tomato: "apple", // 🍅 — closest fruit glyph in Lucide set
  Maize: "wheat", // 🌽
  Yam: "leaf", // 🍠
  Cassava: "leaf", // 🥬
  Plantain: "leaf", // 🍌 — leaf as produce stand-in (no banana in core set)
  Mango: "apple", // 🥭
  Rice: "wheat", // 🌾
  Pepper: "flame", // 🌶️
  Onion: "sprout", // 🧅
  Groundnut: "sprout", // 🥜
  "Poultry / Eggs": "egg", // 🥚
};
