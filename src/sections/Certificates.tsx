import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { certificates } from "@/data/certificates";
import type { Certificate } from "@/data/certificates";

function CertificateCard({ cert, index }: { cert: Certificate; index: number }) {
  return (
    <div
      className="reveal glass-panel border border-[#8A9BA8]/10 hover:border-[#F5D800]/30 transition-all duration-300 overflow-hidden cursor-hover group"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Certificate Image Preview */}
      {cert.image && (
        <div className="relative w-full h-56 overflow-hidden border-b border-[#F5D800]/10 bg-[#0A0F18]">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050A10]/80 via-transparent to-transparent" />
          {/* Hover overlay to view full image */}
          <a
            href={cert.image}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300"
          >
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-5 py-2 border border-[#F5D800]/60 text-[#F5D800] font-terminal text-[10px] tracking-[3px] uppercase bg-black/70 backdrop-blur-sm"
              style={{ clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" }}
            >
              ▸ View Full Certificate
            </span>
          </a>
        </div>
      )}
      <div className="p-6">
        {/* Top bar */}
        <div className="flex justify-between items-start mb-4">
          <span className="font-terminal text-[9px] tracking-[3px] text-[#8A9BA8]/40 uppercase">
            {cert.issuer}
          </span>
          <span
            className="font-terminal text-[9px] tracking-[2px] px-3 py-1 border uppercase text-[#F5D800] bg-[rgba(245,216,0,0.05)] border-[#F5D800]/30"
            style={{
              clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)",
            }}
          >
            {cert.date}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-base font-bold text-[#F0F0F0] mb-3 group-hover:text-[#F5D800] transition-colors duration-200">
          {cert.title}
        </h3>

        {/* Description */}
        <p className="font-body text-[13px] text-[#8A9BA8] leading-relaxed mb-4">
          {cert.description}
        </p>

        {/* Credential ID */}
        {cert.credentialId && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#8A9BA8]/10">
            <span className="font-terminal text-[9px] tracking-[1px] text-[#8A9BA8]/60 uppercase">
              Credential ID:
            </span>
            <span className="font-terminal text-[10px] tracking-[1px] text-[#F0F0F0]">
              {cert.credentialId}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Certificates({ preview = false }: { preview?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  
  const displayedCertificates = preview ? certificates.slice(0, 2) : certificates;

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
    <section ref={sectionRef} id="certificates" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="reveal mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#F5D800]" />
            <span className="font-terminal text-[10px] tracking-[4px] text-[#F5D800] uppercase">
              Certifications
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-[#F0F0F0]">CERTIFICATE </span>
            <span className="text-[#F5D800]" style={{ textShadow: "0 0 10px rgba(245,216,0,0.4)" }}>
              ARCHIVE
            </span>
          </h2>
        </div>

        {/* Certificates grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {displayedCertificates.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>

        {preview && (
          <div className="reveal flex justify-center mt-12">
            <Link
              to="/certificates"
              className="px-8 py-3 border border-[#F5D800]/40 text-[#F5D800] font-terminal text-[12px] tracking-[3px] uppercase hover:bg-[#F5D800]/10 hover:shadow-[0_0_20px_rgba(245,216,0,0.3)] transition-all duration-300 cursor-hover group flex items-center gap-3"
              style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
            >
              View All Certificates
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
