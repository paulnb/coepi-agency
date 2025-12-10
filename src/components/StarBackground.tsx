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
      
      {/* LAYER 1: THE ATMOSPHERE (Responsive Nebula)
         - Sizing: Changed to 50vw/50vh (50% of screen width/height). This fixes the desktop "faintness".
         - Colors: Swapped Purple for Cyan/Teal (matches your brand better).
         - Opacity: Increased slightly for visibility.
      */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[80px] md:blur-[120px] animate-[pulse-slow_8s_infinite_ease-in-out] bg-blue-400/30 dark:bg-blue-600/20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[80px] md:blur-[120px] animate-[pulse-slow_10s_infinite_ease-in-out_reverse] bg-cyan-400/30 dark:bg-emerald-600/20" />

      {/* LAYER 2: THE PARTICLES (Stars)
         - Light Mode Fix: 'bg-transparent'. The stars are now GONE in light mode.
         - Dark Mode: 'dark:bg-white'. The stars reappear when you switch to dark mode.
      */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-[float-up_linear_infinite] bg-transparent dark:bg-white"
          style={p.style}
        />
      ))}
      
      {/* LAYER 3: THE VIGNETTE 
         - Softens the edges.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/60 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/80" />
    </div>
  );
};