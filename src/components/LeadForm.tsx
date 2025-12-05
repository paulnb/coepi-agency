"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle, Send } from "lucide-react";

// You'll need to set up Cloudflare Turnstile or ReCaptcha
// For V1, we will simulate the captcha validation or use a simple honey-pot

export default function LeadForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (data: any) => {
    setStatus("loading");
    
    try {
      // Send to your n8n Webhook URL
      const response = await fetch("YOUR_N8N_WEBHOOK_URL", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...data,
            source: "coepi_website_v1"
        }),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-slate-800/50 p-8 rounded-2xl border border-joseph-dark/50 text-center">
        <div className="mx-auto w-16 h-16 bg-joseph-dark/20 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-joseph-DEFAULT" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Request Received!</h3>
        <p className="text-slate-300">
          We've sent an email to <strong>{(document.getElementById('email') as HTMLInputElement)?.value}</strong> with my personal WhatsApp number.
        </p>
        <p className="text-sm text-slate-400 mt-4">Check your spam folder if you don't see it within 2 minutes.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-slate-300">First Name</label>
          <input 
            {...register("firstName", { required: true })} 
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-marian-DEFAULT outline-none dark:text-white transition-all"
            placeholder="Jane"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-slate-300">Last Name</label>
          <input 
            {...register("lastName", { required: true })} 
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-marian-DEFAULT outline-none dark:text-white transition-all"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-slate-300">Work Email</label>
        <input 
          id="email"
          type="email"
          {...register("email", { required: true })} 
          className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-marian-DEFAULT outline-none dark:text-white transition-all"
          placeholder="jane@company.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-slate-300">How can we help?</label>
        <select 
            {...register("interest")}
            className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-marian-DEFAULT outline-none dark:text-white transition-all"
        >
            <option value="voice_ai">Voice AI / Receptionist</option>
            <option value="lead_capture">Lead Capture Automation</option>
            <option value="workflows">Custom Workflows</option>
            <option value="other">Other</option>
        </select>
      </div>

      {/* Cloudflare Turnstile Widget would go here */}
      
      <button 
        type="submit" 
        disabled={status === "loading"}
        className="w-full bg-gradient-to-r from-marian-dark to-marian-DEFAULT hover:to-marian-400 text-white font-bold py-4 rounded-lg shadow-lg shadow-marian-glow transition-all flex items-center justify-center gap-2"
      >
        {status === "loading" ? <Loader2 className="animate-spin" /> : <>Get Demo Access <Send size={18} /></>}
      </button>
      
      <p className="text-xs text-center text-slate-500 dark:text-slate-400 mt-4">
        We respect your inbox. No spam, just automation.
      </p>
    </form>
  );
}