import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return NextResponse.json({ error: "Assistant is not configured." }, { status: 503 });
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = (body.messages || [])
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-6);

  if (!messages.length) {
    return NextResponse.json({ error: "messages required." }, { status: 400 });
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        system:
          "You are AgroBridge Assistant, a support chatbot for AgroBridge, Ghana's agricultural marketplace. Keep replies short (3-5 sentences). Phone/WhatsApp 0544823484. Delivery details and total cost are confirmed with the buyer before checkout. Payment via secure escrow. Never invent prices — direct users to the Shop page.",
        messages,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "Upstream assistant error." },
        { status: 502 },
      );
    }

    const text = data?.content?.[0]?.text || "";
    return NextResponse.json({ text });
  } catch {
    return NextResponse.json({ error: "Assistant request failed." }, { status: 502 });
  }
}
