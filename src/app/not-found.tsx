import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar variant="solid" />
      <main className="flex min-h-[70vh] items-center justify-center px-6 py-24 text-center">
        <div className="max-w-md">
          <div className="font-display text-[clamp(6rem,20vw,10rem)] font-extrabold leading-none text-green-pale">
            404
          </div>
          <h1 className="mb-2.5 mt-2 font-display text-[1.9rem] font-extrabold">
            This field is empty
          </h1>
          <p className="mb-7 leading-relaxed text-muted">
            The page you are looking for could not be found. Let&apos;s get you back to fresh
            produce.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
            <Link href="/shop" className="btn btn-ghost">
              Browse produce
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
