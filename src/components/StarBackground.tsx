"use client";

import { useState, useEffect } from "react";

export const StarBackground = () => {
  const [particles, setParticles] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${Math.random() * 10 + 10}s`,
          animationDelay: `${Math.random() * 5}s`,
          opacity: Math.random() * 0.5 + 0.3,
        },
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* LAYER 1: THE ATMOSPHERE (Nebula)
         - Size: Increased to 70vw (mobile) and 60vw (desktop) for better coverage.
         - Color: Bumped to Blue-600 and Emerald-500 at 40% opacity. 
         - Result: A clear Blue top-left and Emerald bottom-right that meets in the middle.
      */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] md:w-[60vw] md:h-[60vw] rounded-full blur-[80px] md:blur-[120px] animate-[pulse-slow_8s_infinite_ease-in-out] bg-blue-600/40 dark:bg-blue-600/20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] md:w-[60vw] md:h-[60vw] rounded-full blur-[80px] md:blur-[120px] animate-[pulse-slow_10s_infinite_ease-in-out_reverse] bg-emerald-500/40 dark:bg-emerald-600/20" />

      {/* LAYER 2: THE PARTICLES (Stars)
         - Light Mode: Hidden (bg-transparent)
         - Dark Mode: Visible (bg-white)
      */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-[float-up_linear_infinite] bg-transparent dark:bg-white"
          style={p.style}
        />
      ))}
      
      {/* LAYER 3: THE VIGNETTE 
         - Reduced overlay opacity (white/50) so the colors shine through better.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-white/50 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/80" />
    </div>
  );
};