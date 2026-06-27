import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

const statusColors: Record<string, { border: string; text: string; bg: string }> = {
  PRODUCTION: { border: "#00FF22", text: "#00FF22", bg: "rgba(0,255,34,0.05)" },
  LIVE: { border: "#00E5FF", text: "#00E5FF", bg: "rgba(0,229,255,0.05)" },
  BETA: { border: "#F5D800", text: "#F5D800", bg: "rgba(245,216,0,0.05)" },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = statusColors[project.status] || statusColors.PRODUCTION;

  return (
    <div
      className="reveal glass-panel border border-[#8A9BA8]/10 hover:border-[#00E5FF]/30 transition-all duration-300 overflow-hidden cursor-hover group"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="p-6">
        {/* Top bar */}
        <div className="flex justify-between items-start mb-4">
          <span className="font-terminal text-[9px] tracking-[3px] text-[#8A9BA8]/40 uppercase">
            {project.category}
          </span>
          <span
            className="font-terminal text-[9px] tracking-[2px] px-3 py-1 border uppercase"
            style={{
              borderColor: `${status.border}30`,
              color: status.text,
              background: status.bg,
              clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
            }}
          >
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-bold text-[#F0F0F0] mb-3 group-hover:text-[#00E5FF] transition-colors duration-200">
          {project.shortTitle}
        </h3>

        {/* Description */}
        <p className="font-body text-[13px] text-[#8A9BA8] leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span className="text-[#00E5FF] text-[8px] mt-1.5">▸</span>
              <span className="font-body text-[12px] text-[#8A9BA8]/70">
                {h}
              </span>
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 font-terminal text-[9px] tracking-[1px] border border-[#00E5FF]/15 text-[#00E5FF]/60 bg-[#00E5FF]/5"
              style={{ clipPath: "polygon(3px 0%, 100% 0%, calc(100% - 3px) 100%, 0% 100%)" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t border-[#8A9BA8]/10">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 bg-gradient-to-r from-[#00E5FF] to-[#7B00AA] text-black font-terminal text-[10px] tracking-[2px] uppercase hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all duration-300 cursor-hover"
            style={{ clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" }}
          >
            ◈ Code
          </a>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 border border-[#00FF22]/30 text-[#00FF22] font-terminal text-[10px] tracking-[2px] uppercase hover:bg-[#00FF22]/10 hover:shadow-[0_0_20px_rgba(0,255,34,0.3)] transition-all duration-300 cursor-hover"
              style={{ clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" }}
            >
              ▸ Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects({ preview = false }: { preview?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  
  const displayedProjects = preview ? projects.slice(0, 4) : projects;

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
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="reveal mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#00FF22]" />
            <span className="font-terminal text-[10px] tracking-[4px] text-[#00FF22] uppercase">
              Project_Archive
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-[#F0F0F0]">PROJECT </span>
            <span className="text-[#00FF22]" style={{ textShadow: "0 0 10px rgba(0,255,34,0.4)" }}>
              ARCHIVE
            </span>
          </h2>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {displayedProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {preview && (
          <div className="reveal flex justify-center mt-12">
            <Link
              to="/projects"
              className="px-8 py-3 border border-[#00FF22]/40 text-[#00FF22] font-terminal text-[12px] tracking-[3px] uppercase hover:bg-[#00FF22]/10 hover:shadow-[0_0_20px_rgba(0,255,34,0.3)] transition-all duration-300 cursor-hover group flex items-center gap-3"
              style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
            >
              View All Projects
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
