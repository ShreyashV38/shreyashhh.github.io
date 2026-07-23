import { useEffect, useRef } from "react";
import { techStack } from "@/data/skills";

const developerJSON = `{
  <span class="code-key">"name"</span>: <span class="code-value">"Shreyash Vaigankar"</span>,
  <span class="code-key">"handle"</span>: <span class="code-value">"ShreyashV38"</span>,
  <span class="code-key">"role"</span>: <span class="code-value">"Computer Science Student"</span>,
  <span class="code-key">"location"</span>: <span class="code-value">"Goa, India"</span>,
  <span class="code-key">"interests"</span>: [
    <span class="code-value">"Full Stack Web"</span>,
    <span class="code-value">"Systems Programming"</span>,
    <span class="code-value">"IoT & Hardware"</span>,
    <span class="code-value">"Computer Vision"</span>
  ],
  <span class="code-key">"learning"</span>: {
    <span class="code-string">"languages"</span>: [<span class="code-value">"C", "C++", "TypeScript", "Python", "Java"</span>],
    <span class="code-string">"frontend"</span>: [<span class="code-value">"React", "React Native", "Next.js", "Vite"</span>],
    <span class="code-string">"backend"</span>: [<span class="code-value">"Node.js", "Express", "REST", "GraphQL"</span>],
    <span class="code-string">"database"</span>: [<span class="code-value">"PostgreSQL", "MongoDB", "MySQL", "Redis"</span>]
  },
  <span class="code-comment">// MCA 2nd Year — learning & building projects</span>
  <span class="code-key">"status"</span>: <span class="code-value">"open_to_learn"</span>,
  <span class="code-key">"education"</span>: <span class="code-value">"MCA @ Goa Business School"</span>
}`;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll(".reveal");
            els.forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("visible");
                (el as HTMLElement).style.transition =
                  "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)";
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="reveal mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#00E5FF]" />
            <span className="font-terminal text-[10px] tracking-[4px] text-[#00E5FF] uppercase">
              About_System
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-[#F0F0F0]">SYSTEM </span>
            <span className="text-[#00E5FF] neon-text-cyan">PROFILE</span>
          </h2>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Bio + Tags + Info */}
          <div className="space-y-8">
            <div className="reveal">
              <p className="font-body text-[15px] text-[#8A9BA8] leading-relaxed mb-4">
                I'm a Computer Science student from Goa, currently in my
                MCA 2nd year. I love exploring different areas of tech —
                from building web apps with React and Node.js to writing
                low-level C code and playing with IoT hardware.
              </p>
              <p className="font-body text-[15px] text-[#8A9BA8] leading-relaxed">
                I've worked on projects ranging from a Devanagari OCR
                system to an IoT-based waste management platform built
                during hackathons. I'm always eager to learn new
                technologies, take on challenges, and grow as a developer.
              </p>
            </div>

            {/* Tech stack tags */}
            <div className="reveal flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 border border-[#00E5FF]/20 text-[#00E5FF] font-terminal text-[10px] tracking-[2px] uppercase bg-[#00E5FF]/5 hover:bg-[#00E5FF]/10 hover:border-[#00E5FF]/40 transition-all duration-200 cursor-hover"
                  style={{ clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Info cards */}
            <div className="reveal grid grid-cols-2 gap-3">
              {[
                { label: "Location", value: "Goa, India" },
                { label: "Status", value: "Available" },
                { label: "Timezone", value: "IST +5:30" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="glass-panel p-4 border border-[#00E5FF]/10 hover:border-[#00E5FF]/30 transition-all duration-200 cursor-hover"
                >
                  <div className="font-terminal text-[9px] tracking-[4px] text-[#8A9BA8]/40 uppercase mb-1">
                    {card.label}
                  </div>
                  <div className="font-terminal text-sm text-[#F0F0F0]">
                    {card.value}
                  </div>
                </div>
              ))}
              <a
                href="/certificates/Shreyash_Resume__.pdf"
                download="Shreyash_Vaigankar_Resume.pdf"
                className="glass-panel p-4 border border-[#F5D800]/20 hover:border-[#F5D800]/40 hover:bg-[#F5D800]/5 transition-all duration-200 cursor-hover group"
              >
                <div className="font-terminal text-[9px] tracking-[4px] text-[#8A9BA8]/40 uppercase mb-1">
                  Resume
                </div>
                <div className="font-terminal text-sm text-[#F5D800] flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform duration-200">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download ↗
                </div>
              </a>
            </div>
          </div>

          {/* Right: Code block */}
          <div className="reveal">
            <div className="border border-[#00E5FF]/15 bg-[#050A10]/80 backdrop-blur-md overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[#00E5FF]/10 bg-[#0A0F18]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                <span className="font-terminal text-[10px] text-[#8A9BA8]/40 ml-3">
                  developer.json
                </span>
              </div>
              {/* Code body */}
              <div className="p-6 font-terminal text-[12px] leading-[1.9] text-[#8A9BA8]">
                <div
                  dangerouslySetInnerHTML={{ __html: developerJSON }}
                  className="whitespace-pre-wrap"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
