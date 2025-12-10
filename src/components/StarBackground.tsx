"use client";

import { useState, useEffect } from "react";

export const StarBackground = () => {
  const [particles, setParticles] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    // Generate fewer, but more "deliberate" particles (30 instead of 50)
    const newParticles = Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 2 + 1; // 1px to 3px
      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          // Randomize the animation duration so they don't all move at once
          animationDuration: `${Math.random() * 10 + 10}s`, // Slow! 10-20 seconds
          animationDelay: `${Math.random() * 5}s`,
          opacity: Math.random() * 0.5 + 0.3, // Varying brightness
        },
      };
    });
    setParticles(newParticles);
  }, []);

return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      
      {/* LAYER 1: THE ATMOSPHERE (Nebula / Aurora)
         - Light Mode Fix: Changed bg-blue-300/40 -> bg-blue-500/30 (Darker, more visible)
         - Light Mode Fix: Changed bg-purple-300/40 -> bg-purple-500/30
      */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] animate-[pulse-slow_8s_infinite_ease-in-out] bg-blue-500/30 dark:bg-blue-600/20" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] animate-[pulse-slow_10s_infinite_ease-in-out_reverse] bg-purple-500/30 dark:bg-purple-600/20" />

{/* LAYER 2: THE PARTICLES (Stars / Dust)
         - Light Mode Fix: Changed to 'bg-blue-600/50'. 
           Now they look like purposeful blue data points, not dust.
         - Dark Mode: Stays 'dark:bg-white' (Stars).
      */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-[float-up_linear_infinite] bg-blue-600/50 dark:bg-white"
          style={p.style}
        />
      ))}
      
      {/* LAYER 3: THE VIGNETTE
         - Light Mode Fix: Reduced white opacity (white/80 -> white/40) so the colors show through
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/40 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/80" />
    </div>
  );
};