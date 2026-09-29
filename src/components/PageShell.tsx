import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

/** Standard inner-page header band with the brand gradient. */
export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header
      className="px-5 pb-12 pt-[calc(68px+40px)] text-white sm:px-6"
      style={{
        background: "linear-gradient(120deg, #2B4419, #436A27)",
      }}
    >
      <div className="mx-auto max-w-content text-left">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-red-600">{eyebrow}</p>
        )}
        <h1 className="mb-2.5 max-w-[20ch] font-display text-[clamp(1.9rem,4vw,2.7rem)] font-extrabold leading-[1.12] tracking-tight text-white text-balance">
          {title}
        </h1>
        {subtitle && (
          <p className="max-w-[36rem] text-base leading-relaxed text-white/70 text-pretty">{subtitle}</p>
        )}
      </div>
    </header>
  );
}

/** Convenience wrapper: solid navbar + content + footer. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
