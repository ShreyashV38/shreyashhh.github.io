export default function Footer() {
  return (
    <footer className="border-t border-[#8A9BA8]/10 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-xs font-bold text-[#00E5FF] tracking-[3px] neon-text-cyan">
          ◈ NEO.DEV
        </span>
        <p className="font-terminal text-[10px] text-[#8A9BA8]/30 tracking-[2px]">
          &copy; {new Date().getFullYear()} SHREYASH VAIGANKAR • REACT • TYPESCRIPT • tRPC
        </p>
        <div className="flex items-center gap-4">
          {[
            { label: "GH", url: "https://github.com/ShreyashV38" },
            { label: "LI", url: "https://linkedin.com/in/shreyash-v-10a632263" },
            { label: "X", url: "https://x.com/@vaigankar7680" },
          ].map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer"
              className="font-terminal text-[10px] text-[#8A9BA8]/30 hover:text-[#00E5FF] transition-colors duration-200 cursor-hover"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
