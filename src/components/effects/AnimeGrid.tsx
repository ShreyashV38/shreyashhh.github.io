import { useEffect, useRef, useState } from "react";
// @ts-ignore
import anime from "animejs";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimeGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState({ columns: 0, rows: 0 });

  // Initialize grid based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Create a grid of 50x50 squares
      const width = window.innerWidth;
      const height = window.innerHeight;
      const spacing = 60; // Distance between dots
      
      const columns = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);
      
      setGridSize({ columns, rows });
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (gridSize.columns === 0 || !gridRef.current) return;

    const elements = gridRef.current.querySelectorAll(".anime-dot");
    
    // Initial idle animation (breathing)
    const idleAnim = anime({
      targets: elements,
      scale: [
        { value: 0.2, easing: "easeInOutQuad", duration: 1000 },
        { value: 1, easing: "easeInOutQuad", duration: 1000 }
      ],
      opacity: [0.1, 0.4],
      delay: anime.stagger(200, { grid: [gridSize.columns, gridSize.rows], from: "center" }),
      loop: true,
      direction: "alternate",
    });

    // Scroll-triggered staggered wave effect (inspired by anime.js homepage)
    ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Pause idle
        idleAnim.pause();
        
        // Calculate a 'from' index based on scroll progress
        const totalDots = gridSize.columns * gridSize.rows;
        const activeIndex = Math.floor(self.progress * totalDots);

        // Fire a staggered wave
        anime({
          targets: elements,
          scale: [
            { value: 2.5, easing: "easeOutSine", duration: 250 },
            { value: 1, easing: "easeInOutQuad", duration: 400 }
          ],
          translateY: [
            { value: -15, easing: "easeOutSine", duration: 250 },
            { value: 0, easing: "easeInOutQuad", duration: 400 }
          ],
          opacity: [
            { value: 0.8, easing: "easeOutSine", duration: 250 },
            { value: 0.2, easing: "easeInOutQuad", duration: 400 }
          ],
          delay: anime.stagger(25, {
            grid: [gridSize.columns, gridSize.rows],
            from: activeIndex % totalDots,
          }),
          // Only play once per scroll event segment, interrupt previous
          begin: () => {
            // Cleanup previous running animations on these targets to prevent jank
            anime.remove(elements);
          }
        });
      },
    });

    return () => {
      idleAnim.pause();
      ScrollTrigger.getAll().forEach(t => t.kill());
      anime.remove(elements);
    };
  }, [gridSize]);

  // Generate the dots
  const dots = [];
  for (let i = 0; i < gridSize.columns * gridSize.rows; i++) {
    dots.push(
      <div
        key={i}
        className="anime-dot w-1.5 h-1.5 bg-[#00E5FF] rounded-full shadow-[0_0_8px_#00E5FF]"
        style={{ opacity: 0.2 }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden mix-blend-screen">
      {/* Container matched to exactly fit the calculated grid */}
      <div 
        ref={gridRef}
        className="w-full h-full flex flex-wrap content-start justify-start opacity-40"
        style={{
          paddingTop: "20px",
          paddingLeft: "20px",
          gap: "58.5px", // Matches the spacing calc (60 - 1.5 dot width)
        }}
      >
        {dots}
      </div>
    </div>
  );
}
