import { useEffect, useRef, useState } from "react";
import { timelineData } from "@/data/timeline";

const typeConfig = {
  education: { icon: "◈", color: "#00E5FF", label: "EDUCATION" },
  work: { icon: "▣", color: "#00FF22", label: "WORK" },
  project: { icon: "◇", color: "#7B00AA", label: "PROJECT" },
};

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const [lineActive, setLineActive] = useState(false);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLineActive(true);
            const header = entry.target.querySelector(".reveal");
            if (header) {
              (header as HTMLElement).classList.add("visible");
              (header as HTMLElement).style.transition =
                "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)";
            }
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) sectionObserver.observe(sectionRef.current);

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.index);
            setActiveIndices((prev) => new Set(prev).add(index));
            (entry.target as HTMLElement)
              .querySelector(".timeline-card")
              ?.classList.add("visible");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    );

    const cards = sectionRef.current?.querySelectorAll(".timeline-entry");
    cards?.forEach((card) => cardObserver.observe(card));

    return () => {
      sectionObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="timeline" className="relative py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="reveal mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#00E5FF]" />
            <span className="font-terminal text-[10px] tracking-[4px] text-[#00E5FF] uppercase">
              System_Log
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-[#F0F0F0]">MISSION </span>
            <span className="text-[#00E5FF] neon-text-cyan">TIMELINE</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) / Left line (mobile) */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-[0.5px] top-0 bottom-0 w-[1px]">
            <div
              className={`w-full h-full timeline-line ${lineActive ? "active" : ""}`}
              style={{
                background: "linear-gradient(180deg, #00E5FF, #7B00AA, #00E5FF)",
                boxShadow: lineActive ? "0 0 8px rgba(0, 229, 255, 0.3)" : "none",
              }}
            />
          </div>

          {/* Entries */}
          <div className="space-y-12 md:space-y-16">
            {timelineData.map((entry, index) => {
              const config = typeConfig[entry.type];
              const isActive = activeIndices.has(index);
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  data-index={index}
                  className="timeline-entry relative"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-6 z-10 timeline-dot ${
                      isActive ? "active" : ""
                    }`}
                    style={{
                      transitionDelay: `${index * 80}ms`,
                      borderColor: isActive ? config.color : undefined,
                      background: isActive ? config.color : undefined,
                      boxShadow: isActive ? `0 0 12px ${config.color}80, 0 0 24px ${config.color}40` : undefined,
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-[calc(50%-40px)] ${
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div
                      className="timeline-card"
                      style={{ transitionDelay: `${index * 100 + 100}ms` }}
                    >
                      <div className="glass-panel border border-[#8A9BA8]/10 hover:border-[#00E5FF]/30 transition-all duration-300 p-6 cursor-hover group">
                        {/* Year + type badge */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-terminal text-sm font-bold text-[#00E5FF] neon-text-cyan">
                            {entry.year}
                          </span>
                          <span
                            className="font-terminal text-[9px] tracking-[2px] px-3 py-1 border uppercase"
                            style={{
                              borderColor: `${config.color}30`,
                              color: config.color,
                              background: `${config.color}08`,
                              clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
                            }}
                          >
                            {config.icon} {config.label}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-body text-base font-semibold text-[#F0F0F0] mb-1 group-hover:text-[#00E5FF] transition-colors duration-200">
                          {entry.title}
                        </h3>

                        {/* Organization */}
                        <p className="font-terminal text-[11px] text-[#8A9BA8]/50 tracking-[1px] mb-3">
                          {entry.organization}
                        </p>

                        {/* Description */}
                        <p className="font-body text-[13px] text-[#8A9BA8] leading-relaxed mb-4">
                          {entry.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 font-terminal text-[9px] tracking-[1px] border border-[#8A9BA8]/15 text-[#8A9BA8]/60 bg-[#8A9BA8]/5"
                              style={{ clipPath: "polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%)" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
