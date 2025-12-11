"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes"; // <--- Step 6A: Import goes here
import { StarBackground } from "@/components/StarBackground"; // <--- Gets StarBackground.tsx

export default function Home() {
  const { theme, setTheme } = useTheme(); // <--- Step 6B: Hook goes here
  const [mounted, setMounted] = useState(false);

// --- FORM STATE ---
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  // --- PASTE YOUR N8N WEBHOOK URL HERE ---
  const WEBHOOK_URL = "https://n8n.coepi.co/webhook/contact";

  // Fix for hydration mismatch (ensures button renders only after client loads)
  useEffect(() => {
    setMounted(true);
  }, []);

  // --- ANIMATION STATE ---
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

// --- FORM HANDLER ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "First Name": formData.firstName, // Matches Sheet Header
            "Last Name": formData.lastName,   // Matches Sheet Header
            "Contact Email": formData.email,  // Matches Sheet Header
            "Message": formData.message,      // Matches Sheet Header
            "Company Name": "Unknown",        // Default since we don't ask yet
            "submittedAt": new Date().toISOString()
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", message: "" }); // Reset form
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
        {/* HERO SECTION */}
        <section className="relative w-full py-20 md:py-32 lg:py-48 overflow-hidden">
          {/* 1. ADD the Star Background here */}
          <div className="absolute inset-0 z-0">
             <StarBackground />
          </div>
                    
          <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center">
            
          {/* BADGE */}
          <div className="mb-8 inline-flex items-center rounded-full border border-blue-200 dark:border-blue-500/30 bg-blue-50 dark:bg-blue-500/10 px-3 py-1 text-sm text-blue-600 dark:text-blue-300 backdrop-blur-sm transition-colors duration-300">
              {/* Double Sparkle Icon (Left Side Only) */}
              <span className="text-blue-500 dark:text-blue-400 mr-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.83838 2.3787C10.2222 1.54728 11.3967 1.54728 11.7806 2.3787L13.1166 5.27503C13.2625 5.59124 13.5135 5.84234 13.8297 5.98818L16.726 7.32422C17.5574 7.7081 17.5574 8.88258 16.726 9.26646L13.8297 10.6025C13.5135 10.7483 13.2625 10.9994 13.1166 11.3156L11.7806 14.212C11.3967 15.0434 10.2222 15.0434 9.83838 14.212L8.50233 11.3156C8.35649 10.9994 8.1054 10.7483 7.78918 10.6025L4.89285 9.26646C4.06143 8.88258 4.06143 7.7081 4.89285 7.32422L7.78918 5.98818C8.1054 5.84234 8.35649 5.59124 8.50233 5.27503L9.83838 2.3787Z" />
                  <path d="M18.8232 15.6515C19.0152 15.2358 19.6023 15.2358 19.7943 15.6515L20.1611 16.4462C20.234 16.6043 20.3596 16.7299 20.5177 16.8028L21.3124 17.1696C21.7281 17.3615 21.7281 17.9487 21.3124 18.1406L20.5177 18.5073C20.3596 18.5803 20.234 18.7058 20.1611 18.864L19.7943 19.6586C19.6023 20.0744 19.0152 20.0744 18.8232 19.6586L18.4565 18.864C18.3835 18.7058 18.258 18.5803 18.0999 18.5073L17.3052 18.1406C16.8895 17.9487 16.8895 17.3615 17.3052 17.1696L18.0999 16.8028C18.258 16.7299 18.3835 16.6043 18.4565 16.4462L18.8232 15.6515Z" />
                </svg>
              </span>
              
              {/* BRAND NAME: Restored to Blue */}
              <span className="font-bold mr-2 text-blue-600 dark:text-blue-400">coepi</span> 
              <span className="opacity-60 italic mr-2 text-sm text-gray-600 dark:text-gray-400">Latin</span>
              <span className="font-semibold text-blue-600 dark:text-blue-300">&apos;to begin&apos;</span>
          </div>
          
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl text-gray-900 dark:text-white transition-colors duration-300">
              Begin... <br />
              {/* UPDATED: Increased min-h for mobile to stop layout jump */}
              <span className={`min-h-[3.6em] md:min-h-[2.4em] flex items-start justify-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 dark:from-blue-400 dark:via-emerald-400 dark:to-blue-400 bg-300% animate-slow-glow transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
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

{/* LOGO STRIP - INTEGRATIONS WITH ICONS */}
        <section className="w-full py-12 border-y border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/[0.02] transition-colors duration-300">
          <div className="container px-4 md:px-6 mx-auto">
            <p className="text-center text-sm text-gray-500 mb-8 uppercase tracking-widest">
              Seamlessly Integrating With
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 md:gap-x-20 md:gap-y-8 grayscale opacity-70 dark:opacity-60">
               
               {/* Integration Item Container */}
               
               {/* 1. OpenAI (The Magic Sparkle) */}
               <div className="flex flex-col items-center justify-center space-y-2">
                 <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.83838 2.3787C10.2222 1.54728 11.3967 1.54728 11.7806 2.3787L13.1166 5.27503C13.2625 5.59124 13.5135 5.84234 13.8297 5.98818L16.726 7.32422C17.5574 7.7081 17.5574 8.88258 16.726 9.26646L13.8297 10.6025C13.5135 10.7483 13.2625 10.9994 13.1166 11.3156L11.7806 14.212C11.3967 15.0434 10.2222 15.0434 9.83838 14.212L8.50233 11.3156C8.35649 10.9994 8.1054 10.7483 7.78918 10.6025L4.89285 9.26646C4.06143 8.88258 4.06143 7.7081 4.89285 7.32422L7.78918 5.98818C8.1054 5.84234 8.35649 5.59124 8.50233 5.27503L9.83838 2.3787Z" />
                 </svg>
                 <span className="text-sm font-bold text-gray-800 dark:text-white mt-1">OpenAI</span>
               </div>
               
               {/* 2. WhatsApp (The Chat Bubble) */}
               <div className="flex flex-col items-center justify-center space-y-2">
                 <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11.172 16h5.828a2 2 0 002-2V8m-11 0a2 2 0 11-4 0 2 2 0 014 0zM17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11.172 16h5.828a2 2 0 002-2V8m-11 0a2 2 0 11-4 0 2 2 0 014 0z" />
                 </svg>
                 <span className="text-sm font-bold text-gray-800 dark:text-white mt-1">WhatsApp</span>
               </div>
               
               {/* 3. Google Workspace (The G) */}
               <div className="flex flex-col items-center justify-center space-y-2">
                 <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1 14l-4-4 4-4V6h2v4l4 4-4 4v-2h-2v2z" />
                 </svg>
                 <span className="text-sm font-bold text-gray-800 dark:text-white mt-1">Google Workspace</span>
               </div>
               
               {/* 4. Stripe (The Credit Card / Money) */}
               <div className="flex flex-col items-center justify-center space-y-2">
                 <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                 </svg>
                 <span className="text-sm font-bold text-gray-800 dark:text-white mt-1">Stripe</span>
               </div>
               
               {/* 5. Outlook (The Envelope / Email) */}
               <div className="flex flex-col items-center justify-center space-y-2">
                 <svg className="w-8 h-8 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
                 <span className="text-sm font-bold text-gray-800 dark:text-white mt-1">Outlook</span>
               </div>

               {/* 6. The Catch-All */}
               <span className="text-lg font-medium italic text-gray-500 dark:text-gray-400">...and more</span>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="w-full py-20 md:py-32 bg-white dark:bg-slate-950 transition-colors duration-300">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-500/10 px-3 py-1 text-sm text-blue-700 dark:text-blue-400">
                Our Ecosystem
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900 dark:text-white transition-colors duration-300">
                Intelligent Agents
              </h2>
              <p className="max-w-[900px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed">
                A comprehensive suite of automations designed to handle every stage of your business lifecycle.
              </p>
            </div>
            
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Receptionist */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:border-blue-500 transition-colors shadow-sm dark:shadow-none">
                <div className="mb-4 inline-block rounded-lg bg-blue-50 dark:bg-blue-500/20 p-3 text-blue-600 dark:text-blue-400">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">24/7 Receptionist</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Never miss a lead again. Our AI answers calls instantly, day or night, qualifies the caller, and books them directly onto your calendar.
                </p>
              </div>

              {/* Card 2: Lead Response */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:border-emerald-500 transition-colors shadow-sm dark:shadow-none">
                <div className="mb-4 inline-block rounded-lg bg-emerald-50 dark:bg-emerald-500/20 p-3 text-emerald-600 dark:text-emerald-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Instant Lead Response</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  If you miss a call, our system automatically texts the client back within seconds to start a conversation and secure the job.
                </p>
              </div>

              {/* Card 3: Reputation */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:border-purple-500 transition-colors shadow-sm dark:shadow-none">
                <div className="mb-4 inline-block rounded-lg bg-purple-50 dark:bg-purple-500/20 p-3 text-purple-600 dark:text-purple-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Reputation Growth</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Automatically request 5-star reviews from happy clients via SMS immediately after a job is completed.
                </p>
              </div>

              {/* Card 4: Onboarding */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:border-pink-500 transition-colors shadow-sm dark:shadow-none">
                <div className="mb-4 inline-block rounded-lg bg-pink-50 dark:bg-pink-500/20 p-3 text-pink-600 dark:text-pink-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Automated Contracts</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Zero-friction starts. Automatically generate contracts and provision folders/assets the moment a client says "Yes."
                </p>
              </div>

              {/* Card 5: Database Reactivation */}
              <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:border-orange-500 transition-colors shadow-sm dark:shadow-none">
                <div className="mb-4 inline-block rounded-lg bg-orange-50 dark:bg-orange-500/20 p-3 text-orange-600 dark:text-orange-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Database Reactivation</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  We turn your "dead leads" into cash. Our bots re-engage your past list via text to book new appointments automatically.
                </p>
              </div>

               {/* Card 6: Strategy */}
               <div className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 p-8 hover:border-cyan-500 transition-colors shadow-sm dark:shadow-none">
                <div className="mb-4 inline-block rounded-lg bg-cyan-50 dark:bg-cyan-500/20 p-3 text-cyan-600 dark:text-cyan-400">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Strategic Consulting</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  We don&apos;t just build bots; we re-engineer your entire operational workflow for maximum efficiency.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* CONTACT FORM - CONNECTED TO WEBHOOK */}
        <section id="contact" className="w-full py-20 bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-white/10 transition-colors duration-300">
          <div className="container px-4 md:px-6 mx-auto max-w-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Start Your Automation Journey</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tell us about your business needs. We&apos;ll review your requirements and reach out to schedule a strategy session.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-white/5 p-8 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" placeholder="Jane" className="w-full h-10 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-black/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" placeholder="Smith" className="w-full h-10 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-black/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="jane@company.com" className="w-full h-10 rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-black/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">How can we help?</label>
                <textarea 
                  required 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange}
                  className="min-h-[100px] w-full rounded-md border border-gray-300 dark:border-white/10 bg-white dark:bg-black/50 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  placeholder="Tell us about your current challenges..."
                />
              </div>

              {/* Status Messages */}
              {status === "success" && (
                <div className="p-3 bg-green-500/20 border border-green-500/50 rounded text-green-700 dark:text-green-300 text-sm text-center">
                  Message sent successfully! We'll be in touch shortly.
                </div>
              )}
              {status === "error" && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded text-red-700 dark:text-red-300 text-sm text-center">
                  Something went wrong. Please email us directly.
                </div>
              )}

              <button 
                disabled={status === "loading" || status === "success"}
                className="w-full h-10 rounded-md bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Sending..." : status === "success" ? "Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 text-center text-xs text-gray-600">
        <p>© 2025 Coepi. All rights reserved.</p>
      </footer>
    </div>
  ); // Ends the return statement
} // Ends the Home function