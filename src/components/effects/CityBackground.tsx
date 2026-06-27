import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CityBackground() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current) return;

    // Smooth scroll parallax for the background image
    // The image is taller than the viewport and moves up slowly as you scroll down
    const animation = gsap.to(bgRef.current, {
      y: "-25%", // Move the background up by 25% of its height
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      },
    });

    // Mouse parallax for extra depth
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const yOffset = (e.clientY / window.innerHeight - 0.5) * 15;
      gsap.to(bgRef.current, {
        x: -x,
        rotationY: x * 0.05,
        rotationX: -yOffset * 0.1,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      animation.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 overflow-hidden bg-[#050A10]"
      style={{ perspective: "1000px" }}
    >
      <div
        ref={bgRef}
        // Make it larger than the viewport so it has room to translate for parallax
        className="absolute -inset-[10%] w-[120%] h-[120%] bg-cover bg-center bg-no-repeat will-change-transform"
        style={{
          backgroundImage: "url('/cyberpunk_city_bg.png')",
          opacity: 0.35,
          transformOrigin: "center center",
        }}
      />
      {/* Dark gradient overlay to blend into the app's dark theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A10]/60 via-transparent to-[#050A10]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050A10] via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
