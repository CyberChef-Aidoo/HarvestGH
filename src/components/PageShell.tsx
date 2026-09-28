import Navbar from "./Navbar";
import Footer from "./Footer";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Use a photo background instead of the flat gradient. */
  photo?: boolean;
}

/** Standard inner-page header band with the brand gradient. */
export function PageHeader({ eyebrow, title, subtitle, photo = true }: PageHeaderProps) {
  return (
    <header
      className="px-5 pb-12 pt-[calc(68px+40px)] text-white sm:px-6"
      style={{
        background: photo
          ? "linear-gradient(120deg, rgba(42,26,20,0.92), rgba(92,46,32,0.78)), url('/images/shop-header.jpg') center/cover"
          : "linear-gradient(120deg, #2A1A14, #5C2E20)",
      }}
    >
      <div className="mx-auto max-w-content text-left">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-accent">{eyebrow}</p>
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
