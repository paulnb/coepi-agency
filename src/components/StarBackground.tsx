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
      
      {/* LAYER 1: THE ATMOSPHERE (Desktop Fix)
         - Mobile: w-[70vw] (Kept large, since you liked it)
         - Desktop: md:w-[40vw] (SHRUNK significantly so they don't touch in the middle)
         - Opacity: Reduced to 30% on desktop to fix the "washed out text" issue.
      */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[80px] md:blur-[120px] animate-[drift-1_18s_infinite_ease-in-out] bg-blue-600/20 md:bg-blue-600/30 dark:bg-blue-600/20" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[80px] md:blur-[120px] animate-[drift-2_23s_infinite_ease-in-out_reverse] bg-emerald-500/20 md:bg-emerald-500/30 dark:bg-emerald-600/20" />

      {/* LAYER 2: THE PARTICLES (Stars) */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-[float-up_linear_infinite] bg-transparent dark:bg-white"
          style={p.style}
        />
      ))}
      
      {/* LAYER 3: THE VIGNETTE 
         - Kept at 60% white to help text contrast.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/60 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/80" />
    </div>
  );
};