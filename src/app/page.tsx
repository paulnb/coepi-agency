"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes"; // <--- Step 6A: Import goes here

export default function Home() {
  const { theme, setTheme } = useTheme(); // <--- Step 6B: Hook goes here
  const [mounted, setMounted] = useState(false);

  // Fix for hydration mismatch (ensures button renders only after client loads)
  useEffect(() => {
    setMounted(true);
  }, []);

  const phrases = [
    "closing deals while you sleep",
    "turning conversations into customers",
    "scaling without hiring",
    "responding in seconds, not hours",
    "automating what holds you back",
    "growing on autopilot",
  ];
  
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeDuration = 1000; // 1 second fade
    const displayDuration = 4000; 

    const interval = setInterval(() => {
      setFade(false); // Start fading out

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setFade(true); // Fade back in
      }, fadeDuration);

    }, displayDuration);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    // Default to white background, switch to slate-950 in dark mode
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-white transition-colors duration-300 selection:bg-blue-500 selection:text-white">
      
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center gap-2" href="#">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">coepi.co</span>
          </Link>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-6">
              <Link className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" href="#services">
                Services
              </Link>
              <Link className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" href="#contact">
                Contact
              </Link>
            </nav>

            {/* THEME TOGGLE BUTTON */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === "dark" ? (
                  /* Sun Icon */
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  /* Moon Icon */
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            )}

            <Link
              className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-black dark:bg-white px-4 text-sm font-medium text-white dark:text-black transition-colors hover:bg-gray-800 dark:hover:bg-gray-200"
              href="#contact"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
          {/* Grid pattern changes opacity based on theme */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-20 pointer-events-none"></div>
          
          <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
            

            <div className="mb-8 inline-flex items-center rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-sm text-blue-600 dark:text-blue-300 backdrop-blur-sm transition-colors duration-300">
              <span className="font-bold mr-2">coepi</span>
              <span className="text-blue-400 dark:text-blue-400 mr-2">
                {/* Simple Sparkles Icon */}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
                </svg>
              </span>
              <span className="opacity-70 italic mr-2">Latin :</span>
              <span className="font-semibold">&apos;to begin&apos;</span>
            </div>
            

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl text-gray-900 dark:text-white transition-colors duration-300">
              Begin... <br />
              <span className={`min-h-[2.4em] flex items-start justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 dark:from-blue-400 dark:via-emerald-400 dark:to-blue-400 bg-300% animate-slow-glow transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {phrases[index]}
              </span>
            </h1>

            <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl mb-10 transition-colors duration-300">
              We engineer intelligent systems that scale your operations, reduce overhead, and drive revenue.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-blue-500 hover:scale-105"
                href="#contact"
              >
                Start Your Transformation
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 dark:border-white/20 bg-white dark:bg-white/5 px-8 text-sm font-medium text-gray-900 dark:text-white transition-all hover:bg-gray-50 dark:hover:bg-white/10"
                href="#services"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>

        {/* Logo Strip */}
        <section className="w-full py-12 border-y border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] transition-colors duration-300">
          <div className="container px-4 md:px-6 mx-auto">
            <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-widest">Powering workflows with</p>
            {/* Logos are darker in light mode, lighter in dark mode */}
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-60 dark:opacity-50 hover:opacity-100 transition-opacity duration-500">
               <span className="text-xl font-bold text-gray-800 dark:text-white">OpenAI</span>
               <span className="text-xl font-bold text-gray-800 dark:text-white">n8n</span>
               <span className="text-xl font-bold text-gray-800 dark:text-white">Zapier</span>
               <span className="text-xl font-bold text-gray-800 dark:text-white">Anthropic</span>
               <span className="text-xl font-bold text-gray-800 dark:text-white">Vercel</span>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-20 md:py-32 bg-white dark:bg-slate-950 transition-colors duration-300">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-500/10 px-3 py-1 text-sm text-blue-700 dark:text-blue-400">
                Our Capabilities
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white transition-colors duration-300">
                Intelligent Agents
              </h2>
              <p className="max-w-[900px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed">
                A comprehensive suite of automations designed to handle every stage of your business lifecycle.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Card 1 */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:border-blue-500 transition-colors shadow-sm dark:shadow-none">
                <div className="mb-4 inline-block rounded-lg bg-blue-50 dark:bg-blue-500/20 p-3 text-blue-600 dark:text-blue-400">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Voice Agents</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Natural, human-like voice AI that handles inbound/outbound calls, schedules appointments, and qualifies leads 24/7.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:border-emerald-500 transition-colors shadow-sm dark:shadow-none">
                <div className="mb-4 inline-block rounded-lg bg-emerald-50 dark:bg-emerald-500/20 p-3 text-emerald-600 dark:text-emerald-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sales Pipeline</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Triggers intelligent follow-ups, manages scheduling, and re-engages dead leads automatically.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:border-purple-500 transition-colors shadow-sm dark:shadow-none">
                <div className="mb-4 inline-block rounded-lg bg-purple-50 dark:bg-purple-500/20 p-3 text-purple-600 dark:text-purple-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Content Systems</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Generate blogs, social posts, and marketing assets at scale while maintaining your exact brand voice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="w-full py-20 bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
          <div className="container px-4 md:px-6 mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start Your Automation Journey</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your business needs. We&apos;ll review your requirements and reach out to schedule a strategy session.
              </p>
            </div>
            
            <form className="space-y-6 bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input type="text" placeholder="Jane" className="w-full h-10 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-black/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input type="text" placeholder="Smith" className="w-full h-10 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-black/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" placeholder="jane@company.com" className="w-full h-10 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-black/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">How can we help?</label>
                <textarea 
                  className="min-h-[100px] w-full rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-black/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Tell us about your current challenges..."
                />
              </div>

              <button className="w-full h-10 rounded-md bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 text-center text-xs text-gray-600">
        <p>© 2025 Coepi. All rights reserved.</p>
      </footer>
    </div>
  );
}