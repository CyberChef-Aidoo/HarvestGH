"use client";

import { useEffect, useRef, useState } from "react";
import { config, whatsappLink } from "@/lib/config";
import Icon from "@/components/Icon";

interface Msg {
  role: "user" | "bot";
  text: string;
  time: string;
}

const FAQS: { keys: string[]; ans: string }[] = [
  { keys: ["order", "buy", "purchase", "how to get", "i want to buy"], ans: 'To order: go to our Shop page, pick your crop, click "Order Now", enter your quantity and delivery details, then pay via Paystack or MoMo. Your money is held in escrow until you receive your produce. You will get an SMS with your order reference (e.g. HGH-2026-XXXX).' },
  { keys: ["delivery", "shipping", "how long", "when will i", "get it"], ans: "Delivery fees: Greater Accra GH₵30 · Ashanti GH₵50 · All other regions GH₵70.\n\nDelivery usually takes 24–48 hours after we confirm your order. Track anytime on our Track Order page using your reference number." },
  { keys: ["payment", "pay", "momo", "paystack", "mobile money", "card", "bank"], ans: "We accept Paystack (card & mobile money) and MTN MoMo. Your payment goes into secure escrow — nobody touches it until you confirm delivery. If something goes wrong, you get a full refund." },
  { keys: ["refund", "cancel", "wrong", "problem", "complaint", "issue", "return", "bad"], ans: "We are sorry to hear that. Contact us within 24 hours of delivery:\nCall: 0544823484\nWhatsApp: tap the button below\n\nWe will investigate and arrange a refund or replacement within 48 hours." },
  { keys: ["track", "order status", "where is my", "my order", "reference", "hgh-"], ans: "To track your order:\n1. Go to our Track Order page\n2. Enter your order reference (e.g. HGH-2026-4721) or phone number\n3. See your full order status and delivery timeline\n\nYour reference was sent to you by SMS when you ordered." },
  { keys: ["preorder", "pre-order", "future", "next season", "reserve", "coming soon"], ans: "Yes! You can preorder produce before it is harvested — perfect for restaurants, schools, and bulk buyers who want to lock in price and supply early. Look for the Preorder badge on our Shop page." },
  { keys: ["price", "cost", "how much", "rate", "ghc", "cedi", "cheap", "expensive"], ans: "Prices vary by crop and season. Examples:\nTomatoes — GH₵120/crate\nMaize — GH₵85/bag\nYam — GH₵220/bag\nPlantain — GH₵55/bunch\n\nVisit our Shop page for live prices." },
  { keys: ["crop", "what do you have", "available", "sell", "tomato", "maize", "yam", "cassava", "mango", "rice", "plantain", "pepper", "onion", "groundnut"], ans: "We currently stock: Tomatoes · Maize · Yam · Cassava · Mango · Rice · Groundnut · Plantain · Pepper · Onion\n\nAll sourced from verified FBO farmers across Ghana. Visit our Shop page to see what is available today!" },
  { keys: ["farmer", "supplier", "fbo", "sell my", "list my crop", "register farm", "become a supplier", "supply"], ans: 'To sell your produce on agro Bridge:\n1. Visit our "Become a Supplier" page\n2. Fill in your farm / FBO details\n3. Ibrahim will call you within 48 hours\n\nRegistration is FREE.' },
  { keys: ["buyer", "register", "create account", "sign up", "join", "new account"], ans: "To join as a buyer:\n1. Visit our Register as Buyer page\n2. Fill in your details (takes 2 minutes)\n3. Browse and order immediately\n\nRegistration is completely FREE." },
  { keys: ["agent", "commission", "earn", "fbo leader", "1%", "referral", "make money"], ans: "FBO leaders can become agro Bridge Agents and earn 1% commission on every deal their members complete through the platform.\n\nTo become an agent, WhatsApp Ibrahim directly: 0544823484" },
  { keys: ["safe", "secure", "trust", "scam", "fake", "legit", "real"], ans: "agro Bridge is a legitimate Ghanaian platform:\nEscrow payment — money held until delivery confirmed\nVerified FBO suppliers only\nSMS tracking every step\nDispute resolution within 48 hours\n\nFounded by Ibrahim Mohammed Lotsu, ATU Accra." },
  { keys: ["contact", "phone", "call", "whatsapp", "reach", "email", "talk"], ans: "You can reach agro Bridge:\nPhone: 0544823484\nWhatsApp: 0544823484\nHours: Mon–Fri 7am–8pm · Sat 8am–6pm\nBased in Accra, Ghana" },
  { keys: ["hours", "open", "when", "support", "available", "respond"], ans: "agro Bridge Support Hours:\nMonday–Friday: 7:00 AM – 8:00 PM\nSaturday: 8:00 AM – 6:00 PM\nSunday: Messages answered Monday AM" },
  { keys: ["hello", "hi", "hey", "morning", "afternoon", "evening", "good day", "greet"], ans: "Hello! Welcome to agro Bridge.\n\nI can help you with ordering produce, becoming a supplier or FBO agent, tracking your order, prices, and delivery info. What would you like to know?" },
  { keys: ["who are you", "what is harvestgh", "what is agro", "agro bridge", "tell me about", "what do you do", "about"], ans: "agro Bridge is Ghana's agricultural marketplace. We connect FBO farmers across all 16 regions directly to bulk buyers — traders, restaurants, schools, supermarkets, and individuals. Founded by Ibrahim Mohammed Lotsu, ATU Accra." },
  { keys: ["thank", "thanks", "ok great", "perfect", "nice", "awesome", "wonderful", "good"], ans: "You are welcome! Is there anything else I can help you with? You can also reach us anytime on WhatsApp at 0544823484." },
];

const QUICK_REPLIES = [
  { label: "How to Order", msg: "How do I place an order?" },
  { label: "Delivery Info", msg: "How does delivery work and what are the fees?" },
  { label: "Our Crops", msg: "What crops do you have available?" },
  { label: "Payments", msg: "How do I pay for my order?" },
  { label: "Track Order", msg: "How do I track my order?" },
  { label: "Become Supplier", msg: "How do I register as a supplier?" },
];

const now = () =>
  new Date().toLocaleTimeString("en-GH", { hour: "2-digit", minute: "2-digit" });

function findFAQ(msg: string): string | null {
  const lower = msg.toLowerCase();
  for (const faq of FAQS) if (faq.keys.some((k) => lower.includes(k))) return faq.ans;
  return null;
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true);
  const [showQuick, setShowQuick] = useState(true);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text:
        "Hello! I am the agro Bridge Assistant.\n\nI can answer questions about ordering produce, delivery, payments, prices, becoming a supplier, and more.\n\nHow can I help you today?",
      time: now(),
    },
  ]);
  const historyRef = useRef<{ role: string; content: string }[]>([]);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, typing, open]);

  const push = (m: Msg) => setMessages((prev) => [...prev, m]);

  async function askAI(msg: string) {
    if (!config.anthropicKey) {
      setTimeout(() => {
        setTyping(false);
        push({
          role: "bot",
          text: `I am not sure about that specific question. For the best answer, please call Ibrahim: ${config.supportPhone}, or tap WhatsApp below. We respond within 1 hour on business days!`,
          time: now(),
        });
      }, 800);
      return;
    }
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config.anthropicKey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system:
            "You are agro Bridge Assistant, a friendly support chatbot for agro Bridge, Ghana's agricultural marketplace. Keep replies short (3-5 sentences). Phone/WhatsApp 0544823484. Delivery: Greater Accra GH₵30, Ashanti GH₵50, other GH₵70. Payment via Paystack escrow. Never invent prices — direct to the Shop page.",
          messages: historyRef.current.slice(-6),
        }),
      });
      const data = await res.json();
      const reply =
        data?.content?.[0]?.text ||
        "I am not sure about that. Please WhatsApp us at 0544823484 for help!";
      setTyping(false);
      push({ role: "bot", text: reply, time: now() });
      historyRef.current.push({ role: "assistant", content: reply });
    } catch {
      setTyping(false);
      push({
        role: "bot",
        text: `For that question, please WhatsApp Ibrahim directly at ${config.supportPhone} — we respond within 1 hour!`,
        time: now(),
      });
    }
  }

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setShowQuick(false);
    push({ role: "user", text: msg, time: now() });
    historyRef.current.push({ role: "user", content: msg });
    setTyping(true);

    const faq = findFAQ(msg);
    if (faq) {
      setTimeout(() => {
        setTyping(false);
        push({ role: "bot", text: faq, time: now() });
        historyRef.current.push({ role: "assistant", content: faq });
      }, 650);
    } else {
      askAI(msg);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen((o) => !o);
          setShowBadge(false);
        }}
        title="Chat with Agro Bridge Assistant"
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 left-6 z-[8888] flex h-14 w-14 items-center justify-center rounded-full bg-green text-white shadow-[0_4px_18px_rgba(26,107,60,0.42)] transition-transform hover:scale-110"
      >
        {open ? <Icon name="x" size="lg" /> : <Icon name="message-circle" size="lg" />}
        {showBadge && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gold text-[0.65rem] font-extrabold text-dark">
            1
          </span>
        )}
      </button>

      {open && (
        <div className="fixed bottom-[90px] left-6 z-[8887] flex max-h-[520px] w-[min(340px,calc(100vw-20px))] flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_12px_48px_rgba(0,0,0,0.18)]">
          <div className="flex flex-shrink-0 items-center gap-3 bg-green px-4 py-3.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-[var(--ab-gold,#D9A825)]">
              <Icon name="wheat" size="md" />
            </div>
            <div className="flex-1">
              <div className="text-[0.9rem] font-bold text-white">agro Bridge Assistant</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[0.72rem] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> Online — responds instantly
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white"
              aria-label="Close chat"
            >
              <Icon name="x" size="md" />
            </button>
          </div>

          <div
            ref={msgsRef}
            className="flex flex-1 flex-col gap-2 overflow-y-auto bg-[#f8fbf9] px-3 py-3.5"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={[
                  "max-w-[82%] whitespace-pre-line rounded-xl px-3 py-2 text-[0.84rem] leading-snug",
                  m.role === "user"
                    ? "self-end rounded-br-sm bg-green text-white"
                    : "self-start rounded-bl-sm border border-line bg-white text-ink shadow-sm",
                ].join(" ")}
              >
                {m.text}
                <div
                  className={[
                    "mt-1 text-[0.64rem]",
                    m.role === "user" ? "text-right text-white/60" : "text-[#aaa]",
                  ].join(" ")}
                >
                  {m.time}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-1 self-start rounded-xl rounded-bl-sm border border-line bg-white px-3 py-2 shadow-sm">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#aac8b5]"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          {showQuick && (
            <div className="flex flex-shrink-0 flex-wrap gap-1.5 border-t border-line bg-white px-2.5 py-2">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q.label}
                  onClick={() => send(q.msg)}
                  className="whitespace-nowrap rounded-full border border-line bg-green-pale px-2.5 py-1 text-[0.74rem] font-semibold text-green transition hover:bg-green hover:text-white"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-shrink-0 items-end gap-2 border-t border-line bg-white px-2.5 py-2.5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask me anything about agro Bridge…"
              rows={1}
              className="max-h-20 flex-1 resize-none rounded-[22px] border-[1.5px] border-line-strong px-3.5 py-2 text-[0.85rem] outline-none focus:border-green"
            />
            <button
              onClick={() => send()}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green text-white transition hover:bg-green-mid"
              aria-label="Send message"
            >
              <Icon name="send" size="md" />
            </button>
          </div>

          <div className="flex flex-shrink-0 items-center justify-between border-t border-line bg-[#f0f9f2] px-3 py-2">
            <span className="text-[0.73rem] text-muted">Need a human?</span>
            <a
              href={whatsappLink("Hi agro Bridge, I need help.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-[9px] bg-[#25d366] px-3 py-1.5 text-[0.74rem] font-bold text-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </>
  );
}
