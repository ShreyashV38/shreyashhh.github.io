import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";

const navItems = [
  { label: "HOME", target: "home" },
  { label: "ABOUT", target: "about" },
  { label: "SKILLS", target: "skills" },
  { label: "TIMELINE", target: "timeline" },
  { label: "PROJECTS", target: "projects" },
  { label: "CERTIFICATES", target: "certificates" },
  { label: "REVIEWS", target: "reviews" },
  { label: "CONTACT", target: "contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = navItems.map((item) => {
        const el = document.getElementById(item.target);
        if (!el) return { id: item.target, top: 0 };
        const rect = el.getBoundingClientRect();
        return { id: item.target, top: rect.top };
      });

      const current = sections.reduce((closest, section) => {
        if (section.top <= 150 && section.top > closest.top) return section;
        return closest;
      }, sections[0]);

      if (current) setActiveSection(current.id);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-400 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-[#00E5FF]/15"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 h-full flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="font-display text-xs font-bold text-[#00E5FF] tracking-[3px] cursor-hover"
        >
          <span className="inline-flex items-center gap-2">
            <span className="w-5 h-5 border border-[#00E5FF] flex items-center justify-center text-[8px]">
              ◈
            </span>
            NEO.DEV
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className={`relative px-4 py-2 font-terminal text-[10px] tracking-[3px] uppercase transition-colors duration-200 cursor-hover ${
                activeSection === item.target
                  ? "text-[#00E5FF]"
                  : "text-[#8A9BA8]/45 hover:text-[#00E5FF]"
              }`}
            >
              {item.label}
              {activeSection === item.target && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-[#00E5FF] shadow-[0_0_6px_#00E5FF]" />
              )}
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:block px-5 py-2 border border-[#00FF22] text-[#00FF22] font-terminal text-[10px] tracking-[3px] uppercase hover:bg-[#00FF22]/10 hover:shadow-[0_0_20px_rgba(0,255,34,0.4)] transition-all duration-300 cursor-hover"
          style={{
            clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)",
          }}
        >
          ◈ CONNECT
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-hover"
          aria-label="Toggle navigation"
        >
          <span
            className={`block w-5 h-[1.5px] bg-[#00E5FF] transition-transform duration-200 ${
              mobileOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[#00E5FF] transition-opacity duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[#00E5FF] transition-transform duration-200 ${
              mobileOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-[#00E5FF]/15 px-6 pb-4">
          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className={`block w-full text-left py-2.5 font-terminal text-[11px] tracking-[3px] uppercase transition-colors cursor-hover ${
                activeSection === item.target
                  ? "text-[#00E5FF]"
                  : "text-[#8A9BA8]/60"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
