// Shared static data used across the marketplace.

export const REGIONS = [
  "Greater Accra",
  "Ashanti",
  "Bono / Brong-Ahafo",
  "Northern",
  "Volta",
  "Eastern",
  "Western",
  "Upper East",
  "Upper West",
  "Central",
  "Savannah",
  "North East",
  "Oti",
  "Ahafo",
  "Western North",
];

export const DELIVERY_FEES = { accra: 30, ashanti: 50, other: 70 };

export function deliveryFeeFor(region: string): number {
  if (region === "Greater Accra") return DELIVERY_FEES.accra;
  if (region === "Ashanti") return DELIVERY_FEES.ashanti;
  return DELIVERY_FEES.other;
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

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "I used to lose 40% of my tomatoes every season. Agro Bridge connected me to a buyer in Accra within two days.",
    name: "Ama Kofi",
    role: "Tomato farmer · Kumasi, Ashanti",
  },
  {
    quote:
      "I used to drive to three villages every week for maize. Now I see who has stock and agree on price in one call.",
    name: "Kwame Asante",
    role: "Grain trader · Accra",
  },
  {
    quote:
      "An agent registered me, and three days later I got a call that my yams had a buyer. I did not have to do anything.",
    name: "Kofi Mensah",
    role: "Yam farmer · Tamale, Northern",
  },
];

export interface HowStep {
  num: string;
  title: string;
  desc: string;
}

export const HOW_STEPS: HowStep[] = [
  {
    num: "01",
    title: "FBO partners with Agro Bridge",
    desc: "An FBO leader registers their group — often 15 to 50 farmers — in a single session.",
  },
  {
    num: "02",
    title: "Produce is listed",
    desc: "Crops go live with photos, prices, and quantities so buyers can order immediately.",
  },
  {
    num: "03",
    title: "Buyer pays into escrow",
    desc: "Payment via Paystack or MoMo is held securely until delivery is confirmed.",
  },
  {
    num: "04",
    title: "Delivery and payout",
    desc: "Produce is picked up and delivered. The farmer is paid when the buyer confirms receipt.",
  },
];

export interface Feature {
  title: string;
  desc: string;
}

export const FEATURES: Feature[] = [
  { title: "Escrow protection", desc: "Buyers pay before produce leaves the farm. Farmers are paid after delivery is confirmed." },
  { title: "No smartphone required", desc: "We manage listings for farmers who only need to be reachable by phone." },
  { title: "FBO group aggregation", desc: "Combine produce across members into reliable volume listings buyers can trust." },
  { title: "Preorder future harvests", desc: "Schools, restaurants, and traders lock supply and price months ahead." },
  { title: "Coordinated delivery", desc: "Pickup from farms nationwide with delivery into Accra, Kumasi, and beyond." },
  { title: "SMS and WhatsApp alerts", desc: "Instant notifications when a match is confirmed — no app download required." },
];

// ── Ghana harvest calendar ──
export type SeasonStatus = "peak" | "harvest" | "plant" | "off";

export interface CropCalendar {
  name: string;
  /** Lucide-style icon key (replaces former emoji) */
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
  peak: { label: "Peak harvest", className: "bg-green text-white" },
  harvest: { label: "Harvest available", className: "bg-green-pale text-green" },
  plant: { label: "Planting season", className: "bg-gold-pale text-gold-deep" },
  off: { label: "Off season", className: "bg-black/5 text-faint" },
};
