import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Use a photo background instead of the flat gradient. */
  photo?: boolean;
}

/** Standard inner-page header band with the green/gold gradient. */
export function PageHeader({ eyebrow, title, subtitle, photo = true }: PageHeaderProps) {
  return (
    <header
      className="px-5 pb-12 pt-[calc(68px+40px)] text-white sm:px-6"
      style={{
        background: photo
          ? "linear-gradient(120deg, rgba(12,26,17,0.88), rgba(26,107,60,0.72)), url('/images/market.jpg') center/cover"
          : "linear-gradient(120deg, #0f2418, #1a6b3c)",
      }}
    >
      <div className="mx-auto max-w-content text-left">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-gold">{eyebrow}</p>
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
