import { useEffect, useRef, useState } from "react";
import { trpc } from "@/providers/trpc";

function generateSessionToken() {
  const existing = localStorage.getItem("portfolio_session");
  if (existing) return existing;
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  localStorage.setItem("portfolio_session", token);
  return token;
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const sessionToken = useRef(generateSessionToken());

  const utils = trpc.useUtils();
  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setName(""); setEmail(""); setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    },
  });

  const portfolioLikeQuery = trpc.portfolioLike.status.useQuery({ sessionToken: sessionToken.current });
  const portfolioLikeMutation = trpc.portfolioLike.toggle.useMutation({
    onSuccess: () => { utils.portfolioLike.status.invalidate(); },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    contactMutation.mutate({ name, email, message });
  };

  const handlePortfolioLike = () => {
    portfolioLikeMutation.mutate({ sessionToken: sessionToken.current });
  };

  const totalLikes = portfolioLikeQuery.data?.totalLikes ?? 0;
  const isLiked = portfolioLikeQuery.data?.liked ?? false;

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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 md:py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="reveal text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#00E5FF]" />
            <span className="font-terminal text-[10px] tracking-[4px] text-[#00E5FF] uppercase">
              Contact_Link
            </span>
            <div className="w-8 h-[1px] bg-[#00E5FF]" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-[#F0F0F0]">ESTABLISH </span>
            <span className="text-[#00E5FF] neon-text-cyan">CONNECTION</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="reveal space-y-5">
            <div>
              <label className="block font-terminal text-[9px] tracking-[3px] text-[#8A9BA8]/40 uppercase mb-2">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name"
                className="w-full bg-[#050A10] border border-[#8A9BA8]/15 text-[#F0F0F0] font-terminal text-sm px-4 py-3.5 outline-none focus:border-[#00E5FF]/50 focus:shadow-[0_0_10px_rgba(0,229,255,0.1)] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block font-terminal text-[9px] tracking-[3px] text-[#8A9BA8]/40 uppercase mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com"
                className="w-full bg-[#050A10] border border-[#8A9BA8]/15 text-[#F0F0F0] font-terminal text-sm px-4 py-3.5 outline-none focus:border-[#00E5FF]/50 focus:shadow-[0_0_10px_rgba(0,229,255,0.1)] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block font-terminal text-[9px] tracking-[3px] text-[#8A9BA8]/40 uppercase mb-2">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="Your message..."
                className="w-full bg-[#050A10] border border-[#8A9BA8]/15 text-[#F0F0F0] font-terminal text-sm px-4 py-3.5 outline-none focus:border-[#00E5FF]/50 focus:shadow-[0_0_10px_rgba(0,229,255,0.1)] transition-all duration-200 resize-y"
              />
            </div>
            <button type="submit" disabled={contactMutation.isPending || submitted}
              className={`w-full py-3.5 font-terminal text-[10px] tracking-[3px] uppercase transition-all duration-300 cursor-hover ${
                submitted
                  ? "bg-[#00FF22]/10 border border-[#00FF22]/30 text-[#00FF22]"
                  : "bg-gradient-to-r from-[#00E5FF] to-[#7B00AA] text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              }`}
              style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
            >
              {submitted ? "◈ Message Sent" : contactMutation.isPending ? "◈ Transmitting..." : "◈ Send Message"}
            </button>
          </form>

          {/* Right info */}
          <div className="reveal space-y-5">
            {/* Direct contact */}
            <div className="glass-panel border border-[#8A9BA8]/10 p-5">
              <h3 className="font-terminal text-[10px] tracking-[3px] text-[#00E5FF] uppercase mb-4">◈ Direct_Link</h3>
              <div className="space-y-3 font-terminal text-sm">
                <div className="text-[#8A9BA8]">
                  <span className="text-[#00E5FF]">mail:</span> shreyash.vaigankar@gmail.com
                </div>
                <div className="text-[#8A9BA8]">
                  <span className="text-[#00E5FF]">loc:</span> Goa, India
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="glass-panel border border-[#8A9BA8]/10 p-5">
              <h3 className="font-terminal text-[10px] tracking-[3px] text-[#00E5FF] uppercase mb-4">◈ Nodes</h3>
              <div className="flex gap-3">
                {[
                  { label: "GH", url: "https://github.com/ShreyashV38" },
                  { label: "LI", url: "https://linkedin.com/in/shreyash-v-10a632263" },
                  { label: "X", url: "https://x.com/@vaigankar7680" },
                  { label: "IG", url: "https://instagram.com/_shrey4sh_18_" },
                ].map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-[#8A9BA8]/20 flex items-center justify-center font-terminal text-[10px] text-[#8A9BA8]/60 hover:border-[#00E5FF] hover:text-[#00E5FF] hover:shadow-[0_0_10px_rgba(0,229,255,0.3)] transition-all duration-200 cursor-hover"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="glass-panel border border-[#8A9BA8]/10 p-5 font-terminal text-[12px] space-y-2">
              <div><span className="text-[#00FF22]">response:</span> <span className="text-[#8A9BA8]">&lt; 24h</span></div>
              <div><span className="text-[#F5D800]">status:</span> <span className="text-[#8A9BA8]">accepting_contracts</span></div>
              <div><span className="text-[#00E5FF]">tz:</span> <span className="text-[#8A9BA8]">IST +5:30</span></div>
            </div>

            {/* Portfolio Like */}
            <button onClick={handlePortfolioLike} disabled={portfolioLikeMutation.isPending}
              className={`w-full py-3.5 font-terminal text-[10px] tracking-[3px] uppercase transition-all duration-300 cursor-hover border ${
                isLiked
                  ? "border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)]"
                  : "border-[#8A9BA8]/15 text-[#8A9BA8]/40 hover:border-[#00E5FF]/30 hover:text-[#00E5FF]"
              }`}
            >
              {isLiked ? "◈ Liked" : "◈ Like Portfolio"} — {totalLikes} {totalLikes === 1 ? "node" : "nodes"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
