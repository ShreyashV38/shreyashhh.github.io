import { useEffect, useRef } from "react";
import { skills } from "@/data/skills";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const barsAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".reveal");
            items.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("visible");
                (el as HTMLElement).style.transition =
                  "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)";
              }, i * 80);
            });

            if (!barsAnimated.current) {
              barsAnimated.current = true;
              setTimeout(() => {
                entry.target.querySelectorAll(".skill-bar-fill").forEach((fill) => {
                  const target = (fill as HTMLElement).dataset.target;
                  if (target) {
                    (fill as HTMLElement).style.width = `${target}%`;
                  }
                });
              }, 500);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const neonColors = [
    { bar: "#00E5FF", shadow: "rgba(0, 229, 255, 0.4)", tag: "border-[#00E5FF]/20 text-[#00E5FF] bg-[#00E5FF]/5" },
    { bar: "#7B00AA", shadow: "rgba(123, 0, 170, 0.4)", tag: "border-[#7B00AA]/20 text-[#E8CCFF] bg-[#7B00AA]/5" },
    { bar: "#00FF22", shadow: "rgba(0, 255, 34, 0.4)", tag: "border-[#00FF22]/20 text-[#00FF22] bg-[#00FF22]/5" },
    { bar: "#F5D800", shadow: "rgba(245, 216, 0, 0.4)", tag: "border-[#F5D800]/20 text-[#F5D800] bg-[#F5D800]/5" },
  ];

  return (
    <section ref={sectionRef} id="skills" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="reveal mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#7B00AA]" />
            <span className="font-terminal text-[10px] tracking-[4px] text-[#7B00AA] uppercase">
              Skill_Matrix
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-[#F0F0F0]">SKILL </span>
            <span className="text-[#7B00AA] neon-text-purple">MODULES</span>
          </h2>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => {
            const color = neonColors[index % neonColors.length];
            return (
              <div
                key={skill.category}
                className="reveal glass-panel p-6 border border-[#8A9BA8]/10 hover:border-[#00E5FF]/30 transition-all duration-300 cursor-hover group"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <span className="font-terminal text-[9px] tracking-[3px] text-[#8A9BA8]/40 uppercase">
                    {skill.category.replace(/_/g, " ")}
                  </span>
                  <span
                    className="font-terminal text-sm font-bold"
                    style={{ color: color.bar }}
                  >
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-[2px] bg-[#8A9BA8]/10 mb-5 overflow-hidden">
                  <div
                    className="skill-bar-fill h-full transition-all duration-[1.5s] ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      width: "0%",
                      background: color.bar,
                      boxShadow: `0 0 10px ${color.shadow}`,
                    }}
                    data-target={skill.percentage}
                  />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className={`px-2 py-1 font-terminal text-[9px] tracking-[1px] border ${color.tag} transition-all duration-200`}
                      style={{ clipPath: "polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
