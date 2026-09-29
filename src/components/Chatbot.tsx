"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/lib/config";
import Icon from "@/components/Icon";

interface Msg {
  role: "user" | "bot";
  text: string;
  time: string;
}

const FAQS: { keys: string[]; ans: string }[] = [
  { keys: ["order", "buy", "purchase", "how to get", "i want to buy"], ans: "To order: open the Shop board, choose a lot or a pre-order, and pay into escrow by bank or Mobile Money. Funds stay held until you confirm delivery. The pilot is in the Eastern Region." },
  { keys: ["delivery", "shipping", "how long", "when will i", "get it"], ans: "Pilot deliveries are in the Eastern Region. We collect from the farm after the match and deliver to the address you give. You get an SMS or WhatsApp update when goods are on the way." },
  { keys: ["payment", "pay", "momo", "paystack", "mobile money", "card", "bank"], ans: "Payment is held in escrow by bank or Mobile Money until you confirm delivery. Agrobridge charges a 2% buyer fee only when the trade clears. Call or WhatsApp 054 411 4198 if you need help paying." },
  { keys: ["refund", "cancel", "wrong", "problem", "complaint", "issue", "return", "bad"], ans: "If there is an issue with your delivery, contact an Agrobridge agent within 24 hours on 054 411 4198 or via WhatsApp. We investigate and resolve the issue before releasing funds." },
  { keys: ["track", "order status", "where is my", "my order", "reference", "agb-"], ans: "Open Track Order and enter your reference together with the phone number used at checkout, for example AGB-2026-1002 and 0244333444. The page shows whether the lot is confirmed, collected, on the way, or delivered." },
  { keys: ["preorder", "pre-order", "future", "next season", "reserve", "coming soon", "before harvest"], ans: "FBOs list expected supply before harvest. Buyers pre-order grade, quantity, location, and date. Payment is held until delivery." },
  { keys: ["price", "cost", "how much", "rate", "ghc", "cedi", "cheap", "expensive"], ans: "Prices are set per bag, crate, bunch, or bird at farm-gate plus transport. Examples: Tomatoes GH₵380/crate, Maize GH₵420/100kg bag, Plantain GH₵65/bunch. Visit the Shop page for current listings." },
  { keys: ["crop", "what do you have", "available", "sell", "tomato", "maize", "yam", "cassava", "mango", "rice", "plantain", "pepper", "onion", "groundnut", "beef", "goat", "chicken", "meat", "coconut", "pineapple", "orange", "pawpaw", "banana", "watermelon", "fruit"], ans: "Listings are from the Eastern Region. In stock lots include tomatoes, maize, mango, plantain, yam, eggs, and meat. Preorders include coconut, scotch bonnet pepper, pineapple, orange, pawpaw, banana, and watermelon. Check the Shop page." },
  { keys: ["farmer", "supplier", "fbo", "sell my", "list my crop", "register farm", "become a supplier", "supply"], ans: "FBO leaders can register the group on the Register your FBO page. Joining is free. Farmers without smartphones use SMS, WhatsApp, or a phone call. Call 054 411 4198." },
  { keys: ["buyer", "register", "create account", "sign up", "join", "new account"], ans: "Buyers join free on the Register as Buyer page, or order from the Shop board. A 2% fee applies only when the trade clears. The pilot is in the Eastern Region." },
  { keys: ["agent", "commission", "earn", "fbo leader", "referral", "make money", "fee", "2%"], ans: "Joining is free. Agrobridge keeps 2% of a cleared trade (GHS 500 on a GHS 25,000 order)." },
  { keys: ["safe", "secure", "trust", "scam", "fake", "legit", "real"], ans: "Payment stays in escrow until delivery is confirmed. Groups are verified before they list. Each cleared trade keeps a farm-to-buyer record and a transaction ID." },
  { keys: ["contact", "phone", "call", "whatsapp", "reach", "email", "talk"], ans: "Call or WhatsApp 054 411 4198. The pilot is in the Eastern Region." },
  { keys: ["hours", "open", "when", "support", "available", "respond"], ans: "Contact us on 054 411 4198. Operating hours: Monday–Saturday 7:30 AM–6:00 PM GMT." },
  { keys: ["hello", "hi", "hey", "morning", "afternoon", "evening", "good day", "greet"], ans: "Hello. I am the Agrobridge assistant. Ask me about pre-orders, the Eastern Region pilot, escrow, fees, or registering an FBO. To speak with a person, call 054 411 4198." },
  { keys: ["who are you", "what is agro", "agro bridge", "agrobridge", "tell me about", "what do you do", "about"], ans: "Agrobridge connects farmer-based organisations to verified bulk buyers and matches the harvest before it is picked. Joining is free. A 2% buyer fee applies only when a trade clears. The pilot is in the Eastern Region." },
  { keys: ["thank", "thanks", "ok great", "perfect", "nice", "awesome", "wonderful", "good"], ans: "You are welcome. You can also reach us directly on 054 411 4198." },
];

const QUICK_REPLIES = [
  { label: "How to Order", msg: "How do I place an order?" },
  { label: "Eastern Region pilot", msg: "Where is the Agrobridge pilot?" },
  { label: "What is Listed", msg: "What crops do you have available?" },
  { label: "Escrow Payment", msg: "How does escrow payment work?" },
  { label: "Track Order", msg: "How do I track my order?" },
  { label: "Register FBO", msg: "How does an FBO register?" },
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
        "Hello. I am the Agrobridge assistant.\n\nI can answer questions about pre-orders, the Eastern Region pilot, escrow, and FBO registration.\n\nFor a person, call or WhatsApp 054 411 4198.",
      time: now(),
    },
  ]);
  const historyRef = useRef<{ role: string; content: string }[]>([]);
  const msgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages, typing, open]);

  const push = (m: Msg) => setMessages((prev) => [...prev, m]);

  async function askAI() {
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: historyRef.current.slice(-6) }),
      });
      const data = await res.json();
      if (!res.ok) {
        setTyping(false);
        push({
          role: "bot",
          text: "For detailed inquiries, call or WhatsApp an Agrobridge agent on 054 411 4198.",
          time: now(),
        });
        return;
      }
      const reply =
        data?.text ||
        "I am not sure about that. Please call or WhatsApp us on 054 411 4198 for assistance.";
      setTyping(false);
      push({ role: "bot", text: reply, time: now() });
      historyRef.current.push({ role: "assistant", content: reply });
    } catch {
      setTyping(false);
      push({
        role: "bot",
        text: "For that question, please call or WhatsApp an Agrobridge agent on 054 411 4198.",
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
      askAI();
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setOpen((o) => !o);
          setShowBadge(false);
        }}
        title="Chat with Agrobridge Assistant"
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-[8888] flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-ink shadow-[0_4px_18px_rgba(43,68,25,0.42)] transition-transform hover:scale-110"
      >
        {open ? <Icon name="x" size="lg" /> : <Icon name="message-circle" size="lg" />}
        {showBadge && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-accent-500 text-[0.65rem] font-extrabold text-ink">
            1
          </span>
        )}
      </button>

      {open && (
        <div className="fixed bottom-[90px] right-6 z-[8887] flex max-h-[520px] w-[min(340px,calc(100vw-20px))] flex-col overflow-hidden rounded-[18px] border border-brand-100 bg-white shadow-[0_12px_48px_rgba(26,31,20,0.18)]">
          <div className="flex flex-shrink-0 items-center gap-3 bg-accent-500 px-4 py-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Agrobridge_logo.png"
              alt=""
              className="h-8 w-auto max-w-[120px] object-contain object-left"
              decoding="async"
            />
            <div className="flex-1">
              <div className="text-[0.9rem] font-bold text-ink">Agrobridge Assistant</div>
              <div className="mt-0.5 flex items-center gap-1.5 text-[0.72rem] text-ink/70">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-700" /> Online
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/10 text-ink"
              aria-label="Close chat"
            >
              <Icon name="x" size="md" />
            </button>
          </div>

          <div
            ref={msgsRef}
            className="flex flex-1 flex-col gap-2 overflow-y-auto bg-surface px-3 py-3.5"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={[
                  "max-w-[82%] whitespace-pre-line rounded-xl px-3 py-2 text-[0.84rem] leading-snug",
                  m.role === "user"
                    ? "self-end rounded-br-sm bg-accent-500 text-ink"
                    : "self-start rounded-bl-sm border border-brand-100 bg-white text-ink shadow-sm",
                ].join(" ")}
              >
                {m.text}
                <div
                  className={[
                    "mt-1 text-[0.64rem]",
                    m.role === "user" ? "text-right text-white/60" : "text-ink-faint",
                  ].join(" ")}
                >
                  {m.time}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-1 self-start rounded-xl rounded-bl-sm border border-brand-100 bg-white px-3 py-2 shadow-sm">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent-500/40"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          {showQuick && (
            <div className="flex flex-shrink-0 flex-wrap gap-1.5 border-t border-brand-100 bg-white px-2.5 py-2">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q.label}
                  onClick={() => send(q.msg)}
                  className="whitespace-nowrap rounded-full border border-brand-100 bg-brand-100 px-2.5 py-1 text-[0.74rem] font-semibold text-brand-700 transition hover:bg-accent-500 hover:text-ink"
                >
                  {q.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-shrink-0 items-end gap-2 border-t border-brand-100 bg-white px-2.5 py-2.5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask a question about Agrobridge…"
              rows={1}
              className="max-h-20 flex-1 resize-none rounded-[22px] border-[1.5px] border-brand-300 px-3.5 py-2 text-[0.85rem] outline-none focus:border-brand-500"
            />
            <button
              onClick={() => send()}
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent-500 text-ink transition hover:bg-brand-700"
              aria-label="Send message"
            >
              <Icon name="send" size="md" />
            </button>
          </div>

          <div className="flex flex-shrink-0 items-center justify-between border-t border-brand-100 bg-brand-100 px-3 py-2">
            <span className="text-[0.73rem] text-ink-muted">Need a human?</span>
            <a
              href={whatsappLink("Hi Agrobridge, I would like to speak with an agent.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-[9px] bg-brand-600 px-3 py-1.5 text-[0.74rem] font-bold text-white transition hover:opacity-90"
            >
              WhatsApp 054 411 4198
            </a>
          </div>
        </div>
      )}
    </>
  );
}
