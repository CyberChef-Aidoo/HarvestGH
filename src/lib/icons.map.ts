/**
 * Icon name catalog for Agrobridge (Lucide-style outline set).
 * Mapping notes use ASCII labels for former pictographs — no emoji in source.
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
 * Semantic map — comment = former pictograph meaning / usage site.
 */
export const ICON_MAP = {
  /* checkmark — list / form success */ check: "check",
  /* checkmark in circle — completed step */ "check-circle": "check-circle",
  /* warning triangle — empty / error state */ "alert-triangle": "alert-triangle",
  /* left arrow — back link */ "arrow-left": "arrow-left",
  /* send / paper-plane — chat compose */ send: "send",
  /* right arrow — next / CTA */ "arrow-right": "arrow-right",
  /* magnifier — empty search */ search: "search",
  /* hamburger — mobile nav */ menu: "menu",
  /* close X */ x: "x",
  /* chat bubble — chat fab */ "message-circle": "message-circle",
  /* grain / rice / brand accent */ wheat: "wheat",
  /* seedling / generic crop */ sprout: "sprout",
  /* leafy crops */ leaf: "leaf",
  /* poultry / eggs */ egg: "egg",
  /* pepper / heat */ flame: "flame",
  /* live birds */ bird: "bird",
  /* fruit crops */ apple: "apple",
  /* crate / listing */ package: "package",
} as const satisfies Record<string, IconName>;

/** Crop calendar: crop name -> icon (replaces former produce pictographs). */
export const CROP_ICONS: Record<string, IconName> = {
  Tomato: "apple",
  Maize: "wheat",
  Yam: "leaf",
  Cassava: "leaf",
  Plantain: "leaf",
  Mango: "apple",
  Rice: "wheat",
  Pepper: "flame",
  Onion: "sprout",
  Groundnut: "sprout",
  "Poultry / Eggs": "egg",
};
