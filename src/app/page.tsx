"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const phrases = [
    "closing deals while you sleep",
    "turning conversations into customers",
    "scaling without hiring",
    "responding in seconds, not hours",
    "automating what holds you back",
    "growing on autopilot",
  ];
  
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true); // Controls the fade state

  useEffect(() => {
    const fadeDuration = 500; // 0.5 seconds to fade out
    const displayDuration = 4000; // Show text for 4 seconds

    const interval = setInterval(() => {
      // 1. Fade out
      setFade(false);

      // 2. Wait for fade out to finish, then swap text and fade back in
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setFade(true);
      }, fadeDuration);

    }, displayDuration);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-white selection:bg-blue-500 selection:text-white">
      
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#020617]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link className="flex items-center justify-center gap-2" href="#">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight">coepi.co</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="#services">
              Services
            </Link>
            <Link className="text-sm font-medium text-gray-400 hover:text-white transition-colors" href="#contact">
              Contact
            </Link>
          </nav>
          <Link
            className="hidden md:inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-gray-200"
            href="#contact"
          >
            Get Started
          </Link>
        </div>
      </header>

      <main className="flex-1 pt-16">
        <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
          
          <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
            
            <div className="mb-8 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-300 backdrop-blur-sm">
              <span className="font-bold text-white mr-2">coepi</span> 
              <span className="text-gray-400 italic mr-2">/ko-eh-pee/</span> 
              <span className="text-gray-400">Latin</span>
              <span className="ml-2 text-blue-200 font-semibold">&apos;to begin&apos;</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
              Begin... <br />
              {/* UPDATED LOGIC:
                  - 'transition-opacity duration-500' handles the smooth fade.
                  - We toggle 'opacity-100' vs 'opacity-0' based on the state.
              */}
              <span className={`min-h-[2.4em] flex items-start justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 bg-300% animate-slow-glow transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                {phrases[index]}
              </span>
            </h1>

            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl mb-10">
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
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/20 bg-white/5 px-8 text-sm font-medium text-white transition-all hover:bg-white/10"
                href="#services"
              >
                Explore Solutions
              </Link>
            </div>
          </div>
        </section>

        {/* Keeping the rest of the sections the same... */}
        <section className="w-full py-12 border-y border-white/5 bg-white/[0.02]">
          <div className="container px-4 md:px-6 mx-auto">
            <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-widest">Powering workflows with</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 grayscale opacity-50 hover:opacity-100 transition-opacity duration-500">
               <span className="text-xl font-bold text-white">OpenAI</span>
               <span className="text-xl font-bold text-white">n8n</span>
               <span className="text-xl font-bold text-white">Zapier</span>
               <span className="text-xl font-bold text-white">Anthropic</span>
               <span className="text-xl font-bold text-white">Vercel</span>
            </div>
          </div>
        </section>

        <section id="services" className="w-full py-20 md:py-32 bg-[#020617]">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                Our Capabilities
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Intelligent Agents
              </h2>
              <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed">
                A comprehensive suite of automations designed to handle every stage of your business lifecycle.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 hover:border-blue-500/50 transition-colors">
                <div className="mb-4 inline-block rounded-lg bg-blue-500/20 p-3 text-blue-400">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Voice Agents</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Natural, human-like voice AI that handles inbound/outbound calls, schedules appointments, and qualifies leads 24/7.
                </p>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 hover:border-emerald-500/50 transition-colors">
                <div className="mb-4 inline-block rounded-lg bg-emerald-500/20 p-3 text-emerald-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Sales Pipeline</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Triggers intelligent follow-ups, manages scheduling, and re-engages dead leads automatically.
                </p>
              </div>

              <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 hover:border-purple-500/50 transition-colors">
                <div className="mb-4 inline-block rounded-lg bg-purple-500/20 p-3 text-purple-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Content Systems</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Generate blogs, social posts, and marketing assets at scale while maintaining your exact brand voice.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="w-full py-20 bg-[#020617] border-t border-white/10">
          <div className="container px-4 md:px-6 mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-4">Start Your Automation Journey</h2>
              <p className="text-gray-400">
                Tell us about your business needs. We&apos;ll review your requirements and reach out to schedule a strategy session.
              </p>
            </div>
            
            <form className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">First Name</label>
                  <input type="text" placeholder="Jane" className="w-full h-10 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Last Name</label>
                  <input type="text" placeholder="Smith" className="w-full h-10 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <input type="email" placeholder="jane@company.com" className="w-full h-10 rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">How can we help?</label>
                <textarea 
                  className="min-h-[100px] w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Tell us about your current challenges..."
                />
              </div>

              <button className="w-full h-10 rounded-md bg-white text-black font-medium hover:bg-gray-200 transition-colors">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-black border-t border-white/10 text-center text-xs text-gray-600">
        <p>© 2025 Coepi. All rights reserved.</p>
      </footer>
    </div>
  );
}