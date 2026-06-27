import { useEffect } from "react";
import Projects from "@/sections/Projects";
import Footer from "@/sections/Footer";

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative z-10 pt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-10">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="text-[#F0F0F0]">ALL </span>
          <span className="text-[#00FF22]" style={{ textShadow: "0 0 10px rgba(0,255,34,0.4)" }}>
            PROJECTS
          </span>
        </h1>
        <p className="font-body text-[#8A9BA8] max-w-2xl mb-8">
          A complete archive of my projects, including open-source contributions, academic assignments, and personal explorations.
        </p>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00FF22]/30 to-transparent" />

      <Projects preview={false} />

      <Footer />
    </main>
  );
}
