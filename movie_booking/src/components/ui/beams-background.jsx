
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
export default function BeamsBackground({
  children,
  className = "",
}) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let beams = [];
    let width = 0;
    let height = 0;

    const createBeam = () => ({
      x: Math.random() * width,
      y: height + Math.random() * height,
      width: 30 + Math.random() * 70,
      length: height * 1.5,
      speed: 0.5 + Math.random(),
      angle: -35 + Math.random() * 10,
      hue: 185 + Math.random() * 75,
      opacity: 0.08 + Math.random() * 0.12,
    });

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      beams = Array.from({ length: 24 }, createBeam);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.filter = "blur(24px)";

      beams.forEach((beam) => {
        beam.y -= beam.speed;

        if (beam.y + beam.length < -100) {
          Object.assign(beam, createBeam());
          beam.y = height + 100;
        }

        ctx.save();
        ctx.translate(beam.x, beam.y);
        ctx.rotate((beam.angle * Math.PI) / 180);

        const gradient = ctx.createLinearGradient(
          0, 0, 0, beam.length
        );

        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(
          0.4,
          `hsla(${beam.hue}, 90%, 65%, ${beam.opacity})`
        );
        gradient.addColorStop(
          0.7,
          `hsla(${beam.hue}, 90%, 65%, ${beam.opacity})`
        );
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
        ctx.restore();
      });

      ctx.restore();
      animationRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`relative isolate min-h-[85vh] overflow-hidden bg-[#050816] ${className}`}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-blue-950/30 via-transparent to-black/60"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
