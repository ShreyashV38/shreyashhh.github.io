import { useEffect, useRef, useState } from "react";
import { trpc } from "@/providers/trpc";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState("");

  const reviewsQuery = trpc.review.list.useQuery();
  const reviews = reviewsQuery.data ?? [];
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll(".hero-reveal");
    els?.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(30px)";
      setTimeout(() => {
        htmlEl.style.transition =
          "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1), transform 800ms cubic-bezier(0.16, 1, 0.3, 1)";
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      }, 300 + i * 150);
    });
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-[100dvh] flex items-center"
    >
      {/* Ambient radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0, 229, 255, 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12 items-center min-h-[80vh]">
          {/* Left: Main content */}
          <div>
            {/* Status badge */}
            <div className="hero-reveal mb-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 border border-[#00FF22]/30 bg-[#00FF22]/5 cursor-hover"
                style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
              >
                <span className="w-2 h-2 rounded-full bg-[#00FF22] shadow-[0_0_8px_#00FF22] animate-pulse" />
                <span className="font-terminal text-[11px] tracking-[3px] text-[#00FF22] uppercase">
                  Systems Online • Available
                </span>
              </div>
            </div>

            {/* Monogram */}
            <div className="hero-reveal mb-6">
              <div className="w-16 h-16 border border-[#00E5FF]/40 flex items-center justify-center mb-6 neon-border-cyan">
                <span className="font-display text-2xl font-bold text-[#00E5FF] neon-text-cyan">
                  SV
                </span>
              </div>
            </div>

            {/* Name */}
            <h1 className="hero-reveal font-display text-[clamp(2.5rem,7vw,5.5rem)] font-bold tracking-tight leading-[1] mb-4">
              <span className="text-[#F0F0F0]">SHREYASH</span>
              <br />
              <span className="bg-gradient-to-r from-[#00E5FF] via-[#7B00AA] to-[#00E5FF] bg-clip-text text-transparent animate-neon-sweep">
                VAIGANKAR
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-reveal font-terminal text-sm md:text-base text-[#8A9BA8] tracking-[2px] mb-8">
              ASPIRING_DEVELOPER • MCA_STUDENT • CODE_ENTHUSIAST
            </p>

            {/* Description */}
            <p className="hero-reveal font-body text-[15px] md:text-base text-[#8A9BA8]/80 max-w-lg leading-relaxed mb-10">
              A Computer Science student from Goa exploring full-stack
              development — from building web apps with React and Node.js
              to tinkering with IoT sensors and learning how things work
              under the hood. Always building, always learning.
            </p>

            {/* CTA Buttons */}
            <div className="hero-reveal flex flex-wrap gap-4 mb-10">
              <button
                onClick={() => scrollTo("projects")}
                className="px-8 py-3 bg-gradient-to-r from-[#00E5FF] to-[#7B00AA] text-black font-display text-xs tracking-[3px] uppercase hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] transition-all duration-300 cursor-hover"
                style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="px-8 py-3 border border-[#00E5FF]/40 text-[#00E5FF] font-display text-xs tracking-[3px] uppercase hover:bg-[#00E5FF]/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300 cursor-hover"
                style={{ clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)" }}
              >
                Contact Me
              </button>
            </div>

            {/* Social links */}
            <div className="hero-reveal flex gap-3">
              {[
                { label: "GH", url: "https://github.com/ShreyashV38" },
                { label: "LI", url: "https://linkedin.com/in/shreyash-v-10a632263" },
                { label: "X", url: "https://x.com/@vaigankar7680" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-[#8A9BA8]/20 flex items-center justify-center font-terminal text-[10px] text-[#8A9BA8]/60 hover:border-[#00E5FF] hover:text-[#00E5FF] hover:shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all duration-200 cursor-hover"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Metadata panel */}
          <div className="hidden lg:block">
            <div className="glass-panel p-5 space-y-5 neon-border-cyan">
              {[
                { label: "Location", value: "Goa, India" },
                { label: "Status", value: "Systems Active", accent: true },
                { label: "Local Time", value: time },
                { label: "Rating", value: `★ ${averageRating} (${reviews.length} reviews)` },
                { label: "Focus", value: "Full Stack Web" },
                { label: "Year", value: "MCA 2nd Year" },
              ].map((item) => (
                <div key={item.label} className="hero-reveal">
                  <div className="font-terminal text-[9px] tracking-[4px] text-[#8A9BA8]/40 uppercase mb-1">
                    {item.label}
                  </div>
                  <div
                    className={`font-terminal text-sm ${item.accent
                        ? "text-[#00FF22] neon-text-cyan"
                        : "text-[#F0F0F0]"
                      }`}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-terminal text-[9px] tracking-[4px] text-[#8A9BA8]/40 uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[#00E5FF]/40 to-transparent" />
      </div>
    </section>
  );
}
