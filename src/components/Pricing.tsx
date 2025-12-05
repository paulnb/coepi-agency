"use client";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Starter",
    price: "$997",
    desc: "Perfect for local businesses ready to automate.",
    features: ["AI Voice Receptionist (1 Line)", "Basic CRM Integration", "Missed Call Text Back", "Email Support"],
    cta: "Start Now",
    popular: false,
  },
  {
    name: "Professional",
    price: "$2,497",
    desc: "For growing teams needing robust workflows.",
    features: ["Everything in Starter", "3 AI Voice Lines", "Custom n8n Workflows", "Appointment Scheduling", "Priority Slack Support"],
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    desc: "Full-scale automation infrastructure.",
    features: ["Unlimited Voice Lines", "Dedicated Database (Supabase)", "Custom Dashboard", "White-glove Onboarding", "24/7 Strategy Calls"],
    cta: "Contact Us",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {tiers.map((tier) => (
        <div 
          key={tier.name} 
          className={`relative p-8 rounded-2xl border ${tier.popular ? 'border-marian-DEFAULT bg-slate-900/40 shadow-xl shadow-marian-glow/20' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/20'} flex flex-col`}
        >
          {tier.popular && (
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-marian-DEFAULT to-joseph-DEFAULT text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Most Popular
            </span>
          )}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{tier.name}</h3>
          <div className="mt-4 mb-6">
            <span className="text-4xl font-bold text-slate-900 dark:text-white">{tier.price}</span>
            {tier.price !== "Custom" && <span className="text-slate-500 ml-2">/month</span>}
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{tier.desc}</p>
          
          <ul className="space-y-3 mb-8 flex-1">
            {tier.features.map((feat) => (
              <li key={feat} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <Check className="w-5 h-5 text-joseph-DEFAULT shrink-0" />
                {feat}
              </li>
            ))}
          </ul>
          
          <button className={`w-full py-3 rounded-lg font-medium transition-all ${
            tier.popular 
              ? 'bg-marian-DEFAULT hover:bg-marian-400 text-white' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}>
            {tier.cta}
          </button>
        </div>
      ))}
    </div>
  );
}