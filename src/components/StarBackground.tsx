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
      
      {/* LAYER 1: THE ATMOSPHERE (Nebula / Aurora)
         - Light Mode Fix: Changed to 'bg-blue-600/40' and 'bg-purple-600/40'. 
           Much richer, deeper color blobs.
      */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] animate-[pulse-slow_8s_infinite_ease-in-out] bg-blue-600/40 dark:bg-blue-600/20" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] animate-[pulse-slow_10s_infinite_ease-in-out_reverse] bg-purple-600/40 dark:bg-purple-600/20" />

      {/* LAYER 2: THE PARTICLES (Stars / Data)
         - Light Mode Fix: Changed to 'bg-blue-900/60'.
           This makes them Dark Navy Blue. High contrast = "Data Point", not "Dust".
      */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-[float-up_linear_infinite] bg-blue-900/60 dark:bg-white"
          style={p.style}
        />
      ))}
      
      {/* LAYER 3: THE VIGNETTE 
         - Kept at 40% white opacity so it doesn't wash out the new darker colors.
      */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/40 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/80" />
    </div>
  );
};