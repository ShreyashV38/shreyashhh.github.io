import { useEffect, useRef } from "react";

/**
 * Cyberpunk circuit grid / data rain canvas background
 * Renders a subtle animated grid with flowing data particles
 */
export default function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    // Grid config
    const GRID_SIZE = 40;
    const NODE_RADIUS = 1.5;

    // Data particles flowing along grid lines
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const particles: Particle[] = [];
    const MAX_PARTICLES = 60;

    const colors = [
      "rgba(0, 229, 255, 0.7)",   // cyan
      "rgba(123, 0, 170, 0.6)",   // purple
      "rgba(0, 255, 34, 0.5)",    // green
      "rgba(0, 229, 255, 0.4)",   // cyan dim
    ];

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawnParticle = () => {
      if (particles.length >= MAX_PARTICLES) return;

      const horizontal = Math.random() > 0.5;
      const speed = 0.3 + Math.random() * 0.8;

      let x: number, y: number, vx: number, vy: number;

      if (horizontal) {
        x = 0;
        y = Math.floor(Math.random() * (h / GRID_SIZE)) * GRID_SIZE;
        vx = speed;
        vy = 0;
      } else {
        x = Math.floor(Math.random() * (w / GRID_SIZE)) * GRID_SIZE;
        y = 0;
        vx = 0;
        vy = speed;
      }

      particles.push({
        x, y, vx, vy,
        life: 0,
        maxLife: 200 + Math.random() * 300,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Draw grid
      ctx.strokeStyle = "rgba(0, 229, 255, 0.03)";
      ctx.lineWidth = 0.5;

      // Vertical lines
      for (let x = 0; x <= w; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= h; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw nodes at intersections (subtle)
      ctx.fillStyle = "rgba(0, 229, 255, 0.06)";
      for (let x = 0; x <= w; x += GRID_SIZE) {
        for (let y = 0; y <= h; y += GRID_SIZE) {
          ctx.beginPath();
          ctx.arc(x, y, NODE_RADIUS, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Spawn new particles
      if (Math.random() < 0.08) spawnParticle();

      // Update & draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Random direction change at grid intersections
        if (p.vx !== 0 && Math.abs(p.x % GRID_SIZE) < 1 && Math.random() < 0.1) {
          p.vy = p.vx > 0 ? (Math.random() > 0.5 ? 0.5 : -0.5) : (Math.random() > 0.5 ? 0.5 : -0.5);
          p.vx = 0;
        } else if (p.vy !== 0 && Math.abs(p.y % GRID_SIZE) < 1 && Math.random() < 0.1) {
          p.vx = p.vy > 0 ? (Math.random() > 0.5 ? 0.5 : -0.5) : (Math.random() > 0.5 ? 0.5 : -0.5);
          p.vy = 0;
        }

        // Remove dead particles
        if (p.life > p.maxLife || p.x > w + 10 || p.y > h + 10 || p.x < -10 || p.y < -10) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = Math.min(1, (1 - p.life / p.maxLife)) * 0.8;

        // Trail
        const trailLength = 15;
        const gradient = ctx.createLinearGradient(
          p.x - p.vx * trailLength, p.y - p.vy * trailLength,
          p.x, p.y
        );
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, p.color);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.moveTo(p.x - p.vx * trailLength, p.y - p.vy * trailLength);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();

        // Head glow
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
      }

      // Corner HUD decorations
      const hudColor = "rgba(0, 229, 255, 0.08)";
      ctx.strokeStyle = hudColor;
      ctx.lineWidth = 1;

      // Top-left corner bracket
      ctx.beginPath();
      ctx.moveTo(0, 30); ctx.lineTo(0, 0); ctx.lineTo(30, 0);
      ctx.stroke();

      // Top-right corner bracket
      ctx.beginPath();
      ctx.moveTo(w - 30, 0); ctx.lineTo(w, 0); ctx.lineTo(w, 30);
      ctx.stroke();

      // Bottom-left corner bracket
      ctx.beginPath();
      ctx.moveTo(0, h - 30); ctx.lineTo(0, h); ctx.lineTo(30, h);
      ctx.stroke();

      // Bottom-right corner bracket
      ctx.beginPath();
      ctx.moveTo(w - 30, h); ctx.lineTo(w, h); ctx.lineTo(w, h - 30);
      ctx.stroke();

      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
