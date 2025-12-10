"use client";

import { useState, useEffect } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    // Generate 50 random stars
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      style: {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`, // Random size between 1px and 4px
        height: `${Math.random() * 3 + 1}px`,
        animationDelay: `${Math.random() * 5}s`, // Random start time so they don't blink in unison
        animationDuration: `${Math.random() * 3 + 2}s`, // Random speed
      },
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full opacity-0 animate-[twinkle_infinite_ease-in-out]"
          style={star.style}
        />
      ))}
      
      {/* Optional: Add a subtle gradient overlay to make it look "Deep Space" */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 dark:to-black/80" />
    </div>
  );
};