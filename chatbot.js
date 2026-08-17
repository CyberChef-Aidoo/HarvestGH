/**
 * HarvestGH AI Chatbot Widget
 * Add to any page: <script src="chatbot.js"></script>
 * Get your Anthropic API key at: console.anthropic.com
 */
(function () {
  'use strict';

  // ══════════════════════════════════════════
  // CONFIG — fill in your details
  // ══════════════════════════════════════════
  const CFG = {
    anthropicKey:  'YOUR_ANTHROPIC_API_KEY_HERE', // console.anthropic.com
    waNumber:      '233544823484',
    supportPhone:  '0544823484',
    green:         '#1a6b3c',
    gold:          '#e8a020',
    botName:       'HarvestGH Assistant',
    botAvatar:     '🌾',
  };

  // ══════════════════════════════════════════
  // KNOWLEDGE BASE — HarvestGH FAQ
  // ══════════════════════════════════════════
  const FAQS = [
    { keys:['order','buy','purchase','how to get','i want to buy'],
      ans:'To order: go to our Shop page, pick your crop, click "Order Now", enter your quantity and delivery details, then pay via Paystack or MoMo. Your money is held in escrow until you receive your produce. You\'ll get an SMS with your order reference (e.g. HGH-2026-XXXX). 🛒' },
    { keys:['delivery','shipping','how long','when will i','get it'],
      ans:'📦 Delivery fees: Greater Accra GH₵30 · Ashanti GH₵50 · All other regions GH₵70.\n\nDelivery usually takes 24–48 hours after we confirm your order. Track anytime on our Track Order page using your reference number.' },
    { keys:['payment','pay','momo','paystack','mobile money','card','bank'],
      ans:'💰 We accept Paystack (card & mobile money) and MTN MoMo. Your payment goes into secure escrow — nobody touches it until you confirm delivery. If something goes wrong, you get a full refund.' },
    { keys:['refund','cancel','wrong','problem','complaint','issue','return','bad'],
      ans:'We are sorry to hear that. Contact us within 24 hours of delivery:\n📞 Call: 0544823484\n💬 WhatsApp: tap the button below\n\nWe will investigate and arrange a refund or replacement within 48 hours.' },
    { keys:['track','order status','where is my','my order','reference','hgh-'],
      ans:'To track your order:\n1. Go to our Track Order page\n2. Enter your order reference (e.g. HGH-2026-4721) or phone number\n3. See your full order status and delivery timeline 📍\n\nYour reference was sent to you by SMS when you ordered.' },
    { keys:['preorder','pre-order','future','next season','reserve','coming soon'],
      ans:'Yes! You can preorder produce before it\'s harvested — perfect for restaurants, schools, and bulk buyers who want to lock in price and supply early. Look for the 📅 Preorder badge on our Shop page.' },
    { keys:['price','cost','how much','rate','ghc','cedi','cheap','expensive'],
      ans:'Prices vary by crop and season. Here are some current examples:\n🍅 Tomatoes — GH₵120/crate\n🌽 Maize — GH₵85/bag\n🍠 Yam — GH₵220/bag\n🍌 Plantain — GH₵55/bunch\n\nVisit our Shop page for live prices. All prices are set by HarvestGH with FBOs.' },
    { keys:['crop','what do you have','available','sell','tomato','maize','yam','cassava','mango','rice','plantain','pepper','onion','groundnut'],
      ans:'We currently stock: 🍅 Tomatoes · 🌽 Maize · 🍠 Yam · 🥬 Cassava · 🥭 Mango · 🌾 Rice · 🥜 Groundnut · 🍌 Plantain · 🌶️ Pepper · 🧅 Onion\n\nAll sourced from verified FBO farmers across Ghana. Visit our Shop page to see what\'s available today!' },
    { keys:['farmer','supplier','fbo','sell my','list my crop','register farm','become a supplier','supply'],
      ans:'To sell your produce on HarvestGH:\n1. Visit our "Become a Supplier" page\n2. Fill in your farm / FBO details\n3. Ibrahim will call you within 48 hours\n\nRegistration is FREE. We list your crops and call you when a buyer is found. 🤝' },
    { keys:['buyer','register','create account','sign up','join','new account'],
      ans:'To join as a buyer:\n1. Visit our Register as Buyer page\n2. Fill in your details (takes 2 minutes)\n3. Browse and order immediately\n\nRegistration is completely FREE. There is no subscription fee.' },
    { keys:['agent','commission','earn','fbo leader','1%','referral','make money'],
      ans:'FBO leaders can become HarvestGH Agents and earn 1% commission on every deal their members complete through the platform. 💰\n\nTo become an agent, WhatsApp Ibrahim directly: 0544823484' },
    { keys:['safe','secure','trust','scam','fake','legit','real'],
      ans:'HarvestGH is a legitimate Ghanaian platform. Here\'s how we protect you:\n🔒 Escrow payment — money held until delivery confirmed\n✅ Verified FBO suppliers only\n📱 SMS tracking every step\n🤝 Dispute resolution within 48 hours\n\nFounded by Ibrahim Mohammed Lotsu, ATU Accra.' },
    { keys:['contact','phone','call','whatsapp','reach','email','talk'],
      ans:'You can reach HarvestGH:\n📞 Phone: 0544823484\n💬 WhatsApp: 0544823484\n🕐 Hours: Mon–Fri 7am–8pm · Sat 8am–6pm\n📍 Based in Accra, Ghana\n\nOr tap the WhatsApp button below for the fastest response!' },
    { keys:['hours','open','when','support','available','respond'],
      ans:'⏰ HarvestGH Support Hours:\n• Monday–Friday: 7:00 AM – 8:00 PM\n• Saturday: 8:00 AM – 6:00 PM\n• Sunday: Messages answered Monday AM\n\nWe typically respond within 1 hour on WhatsApp during support hours.' },
    { keys:['hello','hi','hey','morning','afternoon','evening','good day','greet','howdy','what\'s up'],
      ans:'Hello! Welcome to HarvestGH 🌾\n\nI can help you with:\n• Ordering fresh produce\n• Becoming a supplier or FBO agent\n• Tracking your order\n• Prices and availability\n• Delivery info\n\nWhat would you like to know? 😊' },
    { keys:['who are you','what is harvestgh','tell me about','what do you do','about'],
      ans:'HarvestGH is Ghana\'s agricultural marketplace 🇬🇭\n\nWe connect FBO farmers across all 16 regions of Ghana directly to bulk buyers — traders, restaurants, schools, supermarkets, and individuals.\n\nFounded by Ibrahim Mohammed Lotsu, an accounting student at ATU Accra. Our goal: end post-harvest food waste in Ghana. 🌾' },
    { keys:['thank','thanks','ok great','perfect','nice','awesome','wonderful','good'],
      ans:'You\'re welcome! 😊 Is there anything else I can help you with? You can also reach us anytime on WhatsApp at 0544823484.' },
  ];

  const QUICK_REPLIES = [
    { label:'🛒 How to Order',  msg:'How do I place an order?' },
    { label:'🚚 Delivery Info', msg:'How does delivery work and what are the fees?' },
    { label:'🌾 Our Crops',    msg:'What crops do you have available?' },
    { label:'💰 Payments',     msg:'How do I pay for my order?' },
    { label:'📦 Track Order',  msg:'How do I track my order?' },
    { label:'🤝 Become Supplier', msg:'How do I register as a supplier?' },
  ];

  // ══════════════════════════════════════════
  // INJECT CSS
  // ══════════════════════════════════════════
  const css = `
  #hg-chat-btn{position:fixed;bottom:24px;left:24px;z-index:8888;width:54px;height:54px;background:${CFG.green};border-radius:50%;border:none;cursor:pointer;box-shadow:0 4px 18px rgba(26,107,60,.42);display:flex;align-items:center;justify-content:center;transition:all .25s;font-size:1.4rem}
  #hg-chat-btn:hover{transform:scale(1.1);box-shadow:0 6px 26px rgba(26,107,60,.55)}
  #hg-chat-btn .hg-badge{position:absolute;top:-4px;right:-4px;background:${CFG.gold};color:#0f1f14;width:19px;height:19px;border-radius:50%;font-size:.65rem;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid #fff}
  #hg-chat-panel{position:fixed;bottom:90px;left:24px;z-index:8887;width:340px;max-height:520px;background:#fff;border-radius:18px;box-shadow:0 12px 48px rgba(0,0,0,.18);display:none;flex-direction:column;overflow:hidden;font-family:'DM Sans',sans-serif;border:1px solid rgba(26,107,60,.15)}
  #hg-chat-panel.open{display:flex}
  .hg-panel-head{background:${CFG.green};padding:14px 16px;display:flex;align-items:center;gap:11px;flex-shrink:0}
  .hg-head-avatar{width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,.18);display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0}
  .hg-head-info{flex:1}
  .hg-head-name{font-weight:700;font-size:.9rem;color:#fff}
  .hg-head-status{font-size:.72rem;color:rgba(255,255,255,.72);display:flex;align-items:center;gap:5px;margin-top:2px}
  .hg-online-dot{width:6px;height:6px;background:#4ade80;border-radius:50%;animation:hgpulse 2s infinite}
  @keyframes hgpulse{0%,100%{opacity:1}50%{opacity:.4}}
  .hg-panel-close{background:rgba(255,255,255,.18);border:none;color:#fff;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center}
  .hg-messages{flex:1;overflow-y:auto;padding:14px 13px;display:flex;flex-direction:column;gap:9px;scroll-behavior:smooth;background:#f8fbf9}
  .hg-msg{max-width:82%;padding:9px 12px;border-radius:12px;font-size:.84rem;line-height:1.55;word-break:break-word;white-space:pre-line}
  .hg-msg-bot{background:#fff;color:#0f1f14;border:1px solid rgba(26,107,60,.12);border-bottom-left-radius:3px;align-self:flex-start;box-shadow:0 1px 4px rgba(0,0,0,.06)}
  .hg-msg-user{background:${CFG.green};color:#fff;border-bottom-right-radius:3px;align-self:flex-end}
  .hg-msg-time{font-size:.64rem;color:rgba(255,255,255,.6);margin-top:3px;text-align:right}
  .hg-msg-bot .hg-msg-time{color:#aaa;text-align:left}
  .hg-typing{display:none;align-items:center;gap:4px;padding:8px 12px;background:#fff;border:1px solid rgba(26,107,60,.12);border-radius:12px;border-bottom-left-radius:3px;align-self:flex-start;box-shadow:0 1px 4px rgba(0,0,0,.06)}
  .hg-typing.show{display:flex}
  .hg-tdot{width:7px;height:7px;background:#aac8b5;border-radius:50%;animation:hgbounce .9s infinite}
  .hg-tdot:nth-child(2){animation-delay:.15s}
  .hg-tdot:nth-child(3){animation-delay:.3s}
  @keyframes hgbounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
  .hg-quick-wrap{padding:8px 10px;display:flex;gap:6px;flex-wrap:wrap;border-top:1px solid rgba(26,107,60,.08);background:#fff;flex-shrink:0}
  .hg-qr{background:#e8f5ee;color:${CFG.green};border:1px solid rgba(26,107,60,.18);border-radius:100px;padding:5px 11px;font-size:.74rem;font-weight:600;cursor:pointer;white-space:nowrap;transition:all .2s}
  .hg-qr:hover{background:${CFG.green};color:#fff}
  .hg-input-row{padding:10px 11px;display:flex;gap:8px;align-items:flex-end;border-top:1px solid rgba(26,107,60,.1);background:#fff;flex-shrink:0}
  #hg-input{flex:1;padding:9px 13px;border:1.5px solid rgba(26,107,60,.2);border-radius:22px;font-size:.85rem;font-family:inherit;outline:none;resize:none;max-height:80px;transition:border-color .2s;line-height:1.45}
  #hg-input:focus{border-color:${CFG.green}}
  #hg-input::placeholder{color:#aab4ac}
  #hg-send{background:${CFG.green};border:none;color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1rem;transition:background .2s;flex-shrink:0}
  #hg-send:hover{background:#2d9b5a}
  #hg-send:disabled{background:#9ab9a6;cursor:not-allowed}
  .hg-wa-bar{background:#f0f9f2;border-top:1px solid rgba(26,107,60,.1);padding:8px 12px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0}
  .hg-wa-text{font-size:.73rem;color:#6b7c6e}
  .hg-wa-btn{background:#25d366;color:#fff;border:none;border-radius:9px;padding:6px 12px;font-size:.74rem;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:5px}
  @media(max-width:400px){#hg-chat-panel{width:calc(100vw - 20px);left:10px;bottom:80px}}
  `;
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ══════════════════════════════════════════
  // INJECT HTML
  // ══════════════════════════════════════════
  const now = () => new Date().toLocaleTimeString('en-GH',{hour:'2-digit',minute:'2-digit'});

  const wrap = document.createElement('div');
  wrap.innerHTML = `
    <!-- CHAT BUTTON -->
    <button id="hg-chat-btn" onclick="hgToggle()" title="Chat with HarvestGH Assistant">
      <span id="hg-btn-icon">💬</span>
      <span class="hg-badge" id="hg-badge">1</span>
    </button>

    <!-- CHAT PANEL -->
    <div id="hg-chat-panel">
      <div class="hg-panel-head">
        <div class="hg-head-avatar">${CFG.botAvatar}</div>
        <div class="hg-head-info">
          <div class="hg-head-name">${CFG.botName}</div>
          <div class="hg-head-status"><span class="hg-online-dot"></span> Online — responds instantly</div>
        </div>
        <button class="hg-panel-close" onclick="hgToggle()">✕</button>
      </div>

      <div class="hg-messages" id="hg-msgs">
        <div class="hg-msg hg-msg-bot">
          👋 Hello! I'm the HarvestGH Assistant.<br><br>I can answer questions about ordering produce, delivery, payments, prices, becoming a supplier, and more.<br><br>How can I help you today?
          <div class="hg-msg-time">${now()}</div>
        </div>
        <div class="hg-typing" id="hg-typing"><div class="hg-tdot"></div><div class="hg-tdot"></div><div class="hg-tdot"></div></div>
      </div>

      <div class="hg-quick-wrap" id="hg-qr-wrap">
        ${QUICK_REPLIES.map(q=>`<button class="hg-qr" onclick="hgSend('${q.msg}')">${q.label}</button>`).join('')}
      </div>

      <div class="hg-input-row">
        <textarea id="hg-input" placeholder="Ask me anything about HarvestGH…" rows="1"
          onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();hgSend()}"
          oninput="this.style.height='auto';this.style.height=Math.min(this.scrollHeight,80)+'px'"></textarea>
        <button id="hg-send" onclick="hgSend()" title="Send">➤</button>
      </div>

      <div class="hg-wa-bar">
        <span class="hg-wa-text">Need a human? Talk to Ibrahim directly</span>
        <button class="hg-wa-btn" onclick="window.open('https://wa.me/${CFG.waNumber}?text=Hi HarvestGH, I need help.','_blank')">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp Us
        </button>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  // ══════════════════════════════════════════
  // LOGIC
  // ══════════════════════════════════════════
  let isOpen = false, history = [];

  window.hgToggle = function () {
    isOpen = !isOpen;
    const panel  = document.getElementById('hg-chat-panel');
    const badge  = document.getElementById('hg-badge');
    const btnIco = document.getElementById('hg-btn-icon');
    panel.classList.toggle('open', isOpen);
    if (badge) badge.style.display = 'none';
    btnIco.textContent = isOpen ? '✕' : '💬';
    if (isOpen) {
      document.getElementById('hg-input').focus();
      scrollToBottom();
    }
  };

  window.hgSend = function (text) {
    const input = document.getElementById('hg-input');
    const msg   = (text || input.value).trim();
    if (!msg) return;
    input.value = '';
    input.style.height = 'auto';

    // Hide quick replies after first message
    document.getElementById('hg-qr-wrap').style.display = 'none';

    // Add user message
    addMsg(msg, 'user');
    history.push({ role:'user', content: msg });
    scrollToBottom();

    // Show typing
    const typing = document.getElementById('hg-typing');
    typing.classList.add('show');
    scrollToBottom();

    // Check FAQ first (instant)
    const faqAnswer = findFAQ(msg);
    if (faqAnswer) {
      setTimeout(() => {
        typing.classList.remove('show');
        addMsg(faqAnswer, 'bot');
        history.push({ role:'assistant', content: faqAnswer });
        scrollToBottom();
      }, 700);
    } else {
      // Try AI for complex questions
      askAI(msg, typing);
    }
  };

  function findFAQ(msg) {
    const lower = msg.toLowerCase();
    for (const faq of FAQS) {
      if (faq.keys.some(k => lower.includes(k))) return faq.ans;
    }
    return null;
  }

  async function askAI(msg, typingEl) {
    // If no API key configured, use fallback
    if (!CFG.anthropicKey || CFG.anthropicKey === 'YOUR_ANTHROPIC_API_KEY_HERE') {
      setTimeout(() => {
        typingEl.classList.remove('show');
        addMsg(`I'm not sure about that specific question. For the best answer, please:\n\n📞 Call Ibrahim: ${CFG.supportPhone}\n💬 WhatsApp: tap the button below\n\n We respond within 1 hour on business days! 😊`, 'bot');
        scrollToBottom();
      }, 800);
      return;
    }

    try {
      const systemPrompt = `You are HarvestGH Assistant — a friendly, helpful customer support chatbot for HarvestGH, Ghana's agricultural marketplace.

KEY FACTS about HarvestGH:
- Connects FBO (Farmer Based Organization) farmers to bulk buyers across all 16 regions of Ghana
- Founder: Ibrahim Mohammed Lotsu (accounting student, ATU Accra)
- Phone/WhatsApp: 0544823484
- Website: harvestgh.netlify.app
- Delivery fees: Greater Accra GH₵30 · Ashanti GH₵50 · Other regions GH₵70
- Payment: Paystack (card/MoMo) — escrow held until delivery confirmed
- Platform fee: 1–2% per completed transaction
- Free to register as farmer/buyer/FBO supplier
- Crops: Tomatoes, Maize, Yam, Cassava, Mango, Rice, Groundnut, Plantain, Pepper, Onion
- Order reference format: HGH-YYYY-XXXX
- FBO agents earn 1% commission on members' deals
- Support hours: Mon–Fri 7am–8pm, Sat 8am–6pm

RULES:
- Keep replies SHORT (3–5 sentences max)
- Be warm, friendly, and speak like a Ghanaian business
- Use emojis sparingly (1–2 max)
- If you don't know something specific, direct to WhatsApp: 0544823484
- For complaints/refunds, always direct to WhatsApp immediately
- Never make up prices or availability — say "check our Shop page for current prices"`;

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CFG.anthropicKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: systemPrompt,
          messages: history.slice(-6), // last 3 exchanges for context
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'I\'m not sure about that. Please WhatsApp us at 0544823484 for help!';
      typingEl.classList.remove('show');
      addMsg(reply, 'bot');
      history.push({ role:'assistant', content: reply });
      scrollToBottom();
    } catch (e) {
      typingEl.classList.remove('show');
      addMsg(`For that question, please WhatsApp Ibrahim directly at ${CFG.supportPhone} — we respond within 1 hour! 💬`, 'bot');
      scrollToBottom();
    }
  }

  function addMsg(text, type) {
    const msgs = document.getElementById('hg-msgs');
    const typing = document.getElementById('hg-typing');
    const div  = document.createElement('div');
    div.className = `hg-msg hg-msg-${type === 'user' ? 'user' : 'bot'}`;
    div.innerHTML = escHtml(text).replace(/\n/g,'<br>') + `<div class="hg-msg-time">${now()}</div>`;
    msgs.insertBefore(div, typing);
  }

  function scrollToBottom() {
    const msgs = document.getElementById('hg-msgs');
    if (msgs) setTimeout(() => msgs.scrollTop = msgs.scrollHeight, 50);
  }

  function escHtml(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

})();
