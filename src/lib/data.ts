// Shared static data used across the marketplace.

export const REGIONS = ["Eastern"];

export const DELIVERY_FEES = { eastern: 50 };

export function deliveryFeeFor(region: string): number {
  if (region === "Eastern") return DELIVERY_FEES.eastern;
  return DELIVERY_FEES.eastern;
}

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/harvest-calendar", label: "Crop Calendar" },
  { href: "/order-status", label: "Track Order" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

// TODO: real quotes once first deliveries complete.
export const TESTIMONIALS: Testimonial[] = [];

export interface HowStep {
  num: string;
  title: string;
  desc: string;
}

export const HOW_STEPS: HowStep[] = [
  {
    num: "01",
    title: "List expected supply",
    desc: "The FBO records grade, quantity, location, and harvest date before the crop is picked.",
  },
  {
    num: "02",
    title: "Match a buyer",
    desc: "Hotels, shops, and processors pre-order from a verified group.",
  },
  {
    num: "03",
    title: "Hold the payment",
    desc: "Bank or Mobile Money keeps the funds until delivery is confirmed.",
  },
  {
    num: "04",
    title: "Deliver and record",
    desc: "Goods move, the farmer is paid, and the trade is stored as farm-to-buyer history.",
  },
];

export interface Feature {
  title: string;
  desc: string;
}

export const FEATURES: Feature[] = [
  { title: "Escrow protection", desc: "Buyers pay before produce leaves the farm. Farmers are paid after delivery is confirmed." },
  { title: "No smartphone required", desc: "We manage listings for farmers who only need to be reachable by phone." },
  { title: "FBO group aggregation", desc: "Combine produce across members into lots buyers can verify and purchase." },
  { title: "Preorder future harvests", desc: "Hotels, shops, and processors lock grade, date, and price before harvest." },
  { title: "Eastern Region pilot", desc: "First trades with 2–3 FBOs and 5–10 verified buyers in the Eastern Region. Animal protein uses the same flow." },
  { title: "SMS and WhatsApp", desc: "Farmers without smartphones get order updates by SMS, WhatsApp, or phone." },
];

// ── Ghana harvest calendar ──
export type SeasonStatus = "peak" | "harvest" | "plant" | "off";

export interface CropCalendar {
  name: string;
  icon: import("./icons.map").IconName;
  months: SeasonStatus[]; // 12 entries, Jan..Dec
}

export const CROP_CALENDAR: CropCalendar[] = [
  { name: "Tomato", icon: "apple", months: ["harvest","peak","peak","harvest","off","off","off","off","harvest","peak","peak","harvest"] },
  { name: "Maize", icon: "wheat", months: ["off","off","plant","plant","harvest","peak","peak","harvest","plant","peak","peak","harvest"] },
  { name: "Yam", icon: "leaf", months: ["harvest","harvest","off","off","plant","plant","off","off","harvest","peak","peak","peak"] },
  { name: "Cassava", icon: "leaf", months: ["harvest","harvest","harvest","harvest","harvest","harvest","harvest","harvest","harvest","harvest","harvest","harvest"] },
  { name: "Plantain", icon: "leaf", months: ["harvest","harvest","peak","peak","harvest","harvest","harvest","peak","peak","harvest","harvest","harvest"] },
  { name: "Mango", icon: "apple", months: ["off","off","harvest","peak","peak","harvest","off","off","off","off","harvest","harvest"] },
  { name: "Rice", icon: "wheat", months: ["off","off","off","plant","plant","harvest","peak","peak","harvest","harvest","off","off"] },
  { name: "Pepper", icon: "flame", months: ["peak","harvest","harvest","off","off","plant","plant","harvest","peak","peak","harvest","harvest"] },
  { name: "Onion", icon: "sprout", months: ["peak","peak","harvest","off","off","off","plant","plant","harvest","harvest","peak","peak"] },
  { name: "Groundnut", icon: "sprout", months: ["off","off","plant","plant","off","harvest","peak","peak","harvest","harvest","off","off"] },
  { name: "Poultry / Eggs", icon: "egg", months: ["harvest","harvest","harvest","harvest","harvest","harvest","harvest","harvest","harvest","harvest","harvest","harvest"] },
];

export const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const SEASON_META: Record<SeasonStatus, { label: string; className: string }> = {
  peak: { label: "Peak harvest", className: "bg-brand text-white" },
  harvest: { label: "Harvest available", className: "bg-brand-pale text-brand" },
  plant: { label: "Planting season", className: "bg-accent-pale text-accent-deep" },
  off: { label: "Off season", className: "bg-black/5 text-faint" },
};
