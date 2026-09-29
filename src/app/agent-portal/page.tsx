import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHeader } from "@/components/PageShell";

export const metadata = {
  title: "FBO Agent Portal",
};

export default function AgentPortalPage() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="min-h-screen">
        <PageHeader
          title="FBO agent portal"
          subtitle="Agent login and commission dashboard will live here. For now, contact agro Bridge to manage your FBO group."
        />
        <div className="mx-auto max-w-lg px-5 py-14 text-center sm:px-6">
          <div className="rounded-2xl border border-brand-100 bg-white p-8 shadow-soft">
            <h2 className="mb-2 text-[1.35rem] font-extrabold">Manage your FBO partnership</h2>
            <p className="mb-6 text-[0.95rem] leading-relaxed text-ink-muted">
              Contact the Agro Bridge team to manage listings, check commissions, and get support
              for your farmer group.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/register/farmer" className="btn btn-primary">
                Register as supplier
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
