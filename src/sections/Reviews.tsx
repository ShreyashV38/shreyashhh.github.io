import { useEffect, useRef, useState } from "react";
import { trpc } from "@/providers/trpc";

function generateSessionToken() {
  const existing = localStorage.getItem("portfolio_session");
  if (existing) return existing;
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  localStorage.setItem("portfolio_session", token);
  return token;
}

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);
  const sessionToken = useRef(generateSessionToken());

  const utils = trpc.useUtils();
  const reviewsQuery = trpc.review.list.useQuery();
  const createReview = trpc.review.create.useMutation({
    onSuccess: () => {
      utils.review.list.invalidate();
      setName("");
      setRole("");
      setComment("");
      setRating(5);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    },
  });

  const likeMutation = trpc.review.like.useMutation({
    onSuccess: () => { utils.review.list.invalidate(); },
  });

  const checkLikeQueries = trpc.useQueries((t) =>
    (reviewsQuery.data ?? []).map((review) =>
      t.review.checkLike(
        { reviewId: review.id, sessionToken: sessionToken.current },
        { staleTime: Infinity }
      )
    )
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    createReview.mutate({ name, role: role || undefined, comment, rating });
  };

  const handleLike = (reviewId: number) => {
    likeMutation.mutate({ reviewId, sessionToken: sessionToken.current });
  };

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

  const reviews = reviewsQuery.data ?? [];
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  return (
    <section ref={sectionRef} id="reviews" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Section header */}
        <div className="reveal mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-[#F5D800]" />
            <span className="font-terminal text-[10px] tracking-[4px] text-[#F5D800] uppercase">
              Feedback_Log
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-4">
            <span className="text-[#F0F0F0]">CLIENT </span>
            <span className="text-[#F5D800]" style={{ textShadow: "0 0 10px rgba(245,216,0,0.3)" }}>
              REVIEWS
            </span>
          </h2>
          <div className="flex items-center gap-3 font-terminal text-sm">
            <span className="text-[#F5D800]">★ {averageRating}</span>
            <span className="text-[#8A9BA8]/40">({reviews.length} entries)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="reveal">
            <div className="glass-panel border border-[#8A9BA8]/10 p-6">
              <h3 className="font-terminal text-[10px] tracking-[3px] text-[#00E5FF] uppercase mb-6">
                ◈ Submit_Review
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-terminal text-[9px] tracking-[3px] text-[#8A9BA8]/40 uppercase mb-2">Name *</label>
                    <input
                      type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Your name"
                      className="w-full bg-[#050A10] border border-[#8A9BA8]/15 text-[#F0F0F0] font-terminal text-sm px-4 py-3 outline-none focus:border-[#00E5FF]/50 focus:shadow-[0_0_10px_rgba(0,229,255,0.1)] transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block font-terminal text-[9px] tracking-[3px] text-[#8A9BA8]/40 uppercase mb-2">Role</label>
                    <input
                      type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Frontend Dev"
                      className="w-full bg-[#050A10] border border-[#8A9BA8]/15 text-[#F0F0F0] font-terminal text-sm px-4 py-3 outline-none focus:border-[#00E5FF]/50 focus:shadow-[0_0_10px_rgba(0,229,255,0.1)] transition-all duration-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-terminal text-[9px] tracking-[3px] text-[#8A9BA8]/40 uppercase mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" onClick={() => setRating(star)}
                        className={`text-lg transition-all duration-200 cursor-hover ${
                          star <= rating ? "text-[#F5D800] drop-shadow-[0_0_6px_rgba(245,216,0,0.5)]" : "text-[#8A9BA8]/20"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-terminal text-[9px] tracking-[3px] text-[#8A9BA8]/40 uppercase mb-2">Comment *</label>
                  <textarea
                    value={comment} onChange={(e) => setComment(e.target.value)} required rows={4} placeholder="Your feedback..."
                    className="w-full bg-[#050A10] border border-[#8A9BA8]/15 text-[#F0F0F0] font-terminal text-sm px-4 py-3 outline-none focus:border-[#00E5FF]/50 focus:shadow-[0_0_10px_rgba(0,229,255,0.1)] transition-all duration-200 resize-y"
                  />
                </div>

                <button
                  type="submit" disabled={createReview.isPending || submitted}
                  className={`w-full py-3 font-terminal text-[10px] tracking-[3px] uppercase transition-all duration-300 cursor-hover ${
                    submitted
                      ? "bg-[#00FF22]/10 border border-[#00FF22]/30 text-[#00FF22]"
                      : "bg-gradient-to-r from-[#00E5FF] to-[#7B00AA] text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                  }`}
                  style={{ clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)" }}
                >
                  {submitted ? "◈ Review Logged" : createReview.isPending ? "◈ Transmitting..." : "◈ Submit Review"}
                </button>
              </form>
            </div>
          </div>

          {/* Reviews list */}
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {reviews.length === 0 ? (
              <div className="reveal glass-panel border border-[#8A9BA8]/10 p-8 text-center">
                <p className="font-terminal text-sm text-[#8A9BA8]/40">No feedback entries. Be the first to submit a review.</p>
              </div>
            ) : (
              reviews.map((review, index) => {
                const likeData = checkLikeQueries[index]?.data;
                const isLiked = likeData?.liked ?? false;

                return (
                  <div key={review.id}
                    className="reveal glass-panel border border-[#8A9BA8]/10 hover:border-[#00E5FF]/20 transition-all duration-200 p-5 cursor-hover"
                    style={{ transitionDelay: `${index * 60}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-body text-sm font-semibold text-[#F0F0F0]">{review.name}</div>
                        {review.role && <div className="font-terminal text-[10px] text-[#8A9BA8]/40">{review.role}</div>}
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`text-[10px] ${i < review.rating ? "text-[#F5D800]" : "text-[#8A9BA8]/15"}`}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="font-body text-[13px] text-[#8A9BA8] leading-relaxed mb-3">{review.comment}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-[#8A9BA8]/10">
                      <button onClick={() => handleLike(review.id)}
                        className={`flex items-center gap-2 font-terminal text-[10px] tracking-[1px] transition-all duration-200 cursor-hover ${
                          isLiked ? "text-[#00E5FF]" : "text-[#8A9BA8]/30 hover:text-[#00E5FF]"
                        }`}
                      >
                        {isLiked ? "▣" : "▢"} {review.likes}
                      </button>
                      <span className="font-terminal text-[10px] text-[#8A9BA8]/20">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
