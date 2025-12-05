"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "getting more leads.",
  "answering every call.",
  "scaling without burnout.",
  "automating the mundane.",
  "reclaiming your time."
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-marian-dark/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-joseph-dark/10 blur-[100px] rounded-full" />

      <div className="z-10 text-center px-4 max-w-4xl mx-auto">
        <h2 className="text-marian font-medium tracking-wider uppercase mb-4 text-sm md:text-base">
          AI Automation Agency
        </h2>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          Coepi <span className="text-slate-400 font-light italic text-3xl align-top">/to begin/</span>
        </h1>
        
        <div className="text-4xl md:text-6xl font-bold text-slate-700 dark:text-slate-300 flex flex-col md:flex-row items-center justify-center gap-3">
          <span>Begin...</span>
          <div className="h-[1.2em] relative w-full md:w-auto overflow-hidden flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-clip-text text-transparent bg-gradient-to-r from-marian-DEFAULT to-joseph-DEFAULT block"
              >
                {phrases[index]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-8 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          We build the intelligent infrastructure that powers your business 24/7. 
          Capture leads, automate support, and streamline operations with next-gen AI.
        </p>

        <div className="mt-10 flex gap-4 justify-center">
          <a href="#demo" className="bg-marian-DEFAULT hover:bg-marian-600 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg shadow-marian-glow">
            Start Automation
          </a>
          <a href="#solutions" className="border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-full font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Explore Solutions
          </a>
        </div>
      </div>
    </section>
  );
}