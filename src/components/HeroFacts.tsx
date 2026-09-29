type Fact = { value: string; label: string };

const FACTS: Fact[] = [
  { value: "30%+", label: "fresh produce can spoil before a buyer is found" },
  { value: "2%", label: "buyer fee, only when a trade clears" },
  { value: "GHS 0", label: "to join, for farmers and buyers" },
  { value: "Eastern", label: "Region pilot: crops and protein" },
];

export default function HeroFacts({ updated }: { updated: string }) {
  return (
    <aside
      aria-label="Agrobridge at a glance"
      className="w-full max-w-[420px] shrink-0 rounded-[10px] border border-white/15 bg-brand-800/85 p-5 text-white backdrop-blur-[2px] md:w-[400px]"
    >
      <div className="mb-4 flex items-baseline justify-between border-b border-white/10 pb-3">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/70">At a glance</span>
        <span className="text-[0.72rem] text-white/45">Updated {updated}</span>
      </div>
      <dl className="m-0 grid grid-cols-2 gap-x-5 gap-y-4">
        {FACTS.map((f) => (
          <div key={f.label}>
            <dt className="sr-only">{f.label}</dt>
            <dd className="m-0">
              <span className="font-display text-[1.6rem] font-bold leading-none tracking-tight text-red-600 tabular-nums">
                {f.value}
              </span>
              <p className="m-0 mt-1 max-w-none text-[0.75rem] leading-snug text-white/70">{f.label}</p>
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
