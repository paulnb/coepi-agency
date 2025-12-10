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
      
      {/* Layer 1: The Nebula (Atmosphere) - Gives it that "Upscale" Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-[pulse-slow_8s_infinite_ease-in-out]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px] animate-[pulse-slow_10s_infinite_ease-in-out_reverse]" />

      {/* Layer 2: The Drifting Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-white rounded-full animate-[float-up_linear_infinite]"
          style={p.style}
        />
      ))}
      
      {/* Layer 3: Vignette Overlay (Darkens the edges to focus the eye) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/80" />
    </div>
  );
};