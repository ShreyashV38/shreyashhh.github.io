import { useEffect } from "react";
import Certificates from "@/sections/Certificates";
import Footer from "@/sections/Footer";

export default function CertificatesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative z-10 pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="text-[#F0F0F0]">ALL </span>
          <span className="text-[#F5D800]" style={{ textShadow: "0 0 10px rgba(245,216,0,0.4)" }}>
            CERTIFICATES
          </span>
        </h1>
        <p className="font-body text-[#8A9BA8] max-w-2xl mb-8">
          A comprehensive list of my earned credentials and completed courses.
        </p>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#F5D800]/30 to-transparent" />

      <Certificates preview={false} />

      <Footer />
    </main>
  );
}
