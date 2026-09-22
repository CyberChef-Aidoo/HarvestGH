/**
 * How-it-works process band.
 * Note: fixed-position widgets (chatbot left, WhatsApp right) are outside this section —
 * keep them at a high z-index with bottom offset so they do not cover step card content.
 */

const STEPS = [
  {
    num: "01",
    title: "FBO partners with Agro Bridge",
    desc: "An FBO leader registers their group — often 15 to 50 farmers — in a single session.",
    icon: IconPeople,
  },
  {
    num: "02",
    title: "Produce is listed",
    desc: "Crops go live with photos, prices, and quantities so buyers can order immediately.",
    icon: IconCrate,
  },
  {
    num: "03",
    title: "Buyer pays into escrow",
    desc: "Payment via Paystack or MoMo is held securely until delivery is confirmed.",
    icon: IconEscrow,
  },
  {
    num: "04",
    title: "Delivery and payout",
    desc: "Produce is picked up and delivered. The farmer is paid when the buyer confirms receipt.",
    icon: IconTruck,
  },
] as const;

function IconPeople() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18.5" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4.5 20.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M13.5 20.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCrate() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="4" y="8" width="16" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 12h16M10 8v14M14 8v14" stroke="currentColor" strokeWidth="1.5" />
      <rect x="15" y="4" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 7.5h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconEscrow() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect x="5" y="10" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 10V8a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16" r="1.25" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 17.25v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="16" y="5" width="8" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M18 8h4M18 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconTruck() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <path
        d="M3 16V9.5A1.5 1.5 0 0 1 4.5 8H14v11H7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 11h4.2l3.3 3.5V19H14V11Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="19.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18.5" cy="19.5" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="23" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M23 6.5v1.75l1.25.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works__container">
        <p className="how-it-works__eyebrow">How it works</p>
        <h2 className="how-it-works__title">Four steps from farm to buyer</h2>

        <ol className="how-it-works__steps">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <li key={step.num} className="how-it-works__step">
                {i < STEPS.length - 1 ? (
                  <span className="how-it-works__chevron" aria-hidden="true">
                    ›
                  </span>
                ) : null}
                <div className="how-it-works__icon" aria-hidden="true">
                  <Icon />
                </div>
                <span className="how-it-works__badge" aria-hidden="true">
                  {step.num}
                </span>
                <h3 className="how-it-works__step-title">{step.title}</h3>
                <p className="how-it-works__step-body">{step.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
