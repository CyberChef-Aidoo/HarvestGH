"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Icon from "./Icon";

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "note"; text: string }
  | { type: "table"; head: string[]; rows: string[][] };

export interface LegalSection {
  id: string;
  title: string;
  blocks: Block[];
}

interface LegalDocProps {
  title: string;
  subtitle: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="mb-3 leading-relaxed text-muted">{block.text}</p>;
    case "h3":
      return <h3 className="mb-2 mt-5 font-display text-[1.05rem] font-bold text-ink">{block.text}</h3>;
    case "ul":
      return (
        <ul className="mb-3 flex list-disc flex-col gap-2 pl-5 leading-relaxed text-muted marker:text-green">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-3 flex list-decimal flex-col gap-2 pl-5 leading-relaxed text-muted marker:font-bold marker:text-green">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ol>
      );
    case "note":
      return (
        <div className="my-4 rounded-xl border border-gold/40 bg-gold-pale px-5 py-3.5 text-[0.9rem] font-medium leading-relaxed text-gold-deep">
          {block.text}
        </div>
      );
    case "table":
      return (
        <div className="my-4 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.86rem]">
            <thead>
              <tr>
                {block.head.map((h) => (
                  <th key={h} className="border-b border-line bg-green-pale px-3.5 py-2.5 font-bold text-green">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i} className="border-b border-line">
                  {r.map((c, j) => (
                    <td key={j} className="px-3.5 py-2.5 text-muted">
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function LegalDoc({ title, subtitle, updated, intro, sections }: LegalDocProps) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sections]);

  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen">
        <header
          className="px-[5%] pb-12 pt-[calc(68px+40px)] text-white"
          style={{ background: "linear-gradient(120deg, rgba(12,26,17,0.92), rgba(15,31,20,0.88)), url('/images/market.jpg') center/cover" }}
        >
          <div className="mx-auto max-w-content">
            <h1 className="mb-2.5 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold tracking-tight text-white">
              {title}
            </h1>
            <p className="text-white/70">{subtitle}</p>
          </div>
        </header>

        <div className="mx-auto grid max-w-content gap-10 px-6 py-12 lg:grid-cols-[240px_1fr]">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Link href="/" className="mb-4 inline-flex items-center gap-2 text-[0.82rem] font-semibold text-green">
                <Icon name="arrow-left" size="sm" />
                Back to home
              </Link>
              <div className="mb-3 text-[0.72rem] font-bold uppercase tracking-[0.1em] text-muted">
                On this page
              </div>
              <ul className="flex flex-col gap-1 border-l border-line">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={[
                        "-ml-px block border-l-2 py-1 pl-3 text-[0.83rem] transition-colors",
                        active === s.id
                          ? "border-green font-semibold text-green"
                          : "border-transparent text-muted hover:text-ink",
                      ].join(" ")}
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* DOCUMENT */}
          <article className="min-w-0">
            <div className="mb-6 inline-flex items-center gap-2 rounded-lg bg-green-pale px-4 py-2 text-[0.82rem] font-medium text-green">
              Last updated: {updated}
            </div>
            <div className="mb-6 rounded-xl border border-line bg-white px-5 py-4 text-[0.95rem] leading-relaxed text-ink">
              {intro}
            </div>
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 border-t border-line py-7 first:border-t-0">
                <h2 className="mb-3.5 font-display text-[1.4rem] font-bold text-ink">{s.title}</h2>
                {s.blocks.map((b, i) => (
                  <BlockView key={i} block={b} />
                ))}
              </section>
            ))}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
