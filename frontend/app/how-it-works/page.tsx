"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Cpu, Wallet, UserCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Cpu className="text-blue-500" />,
      title: "AI Analysis",
      desc: "Post your requirement. Our Gemini-powered AI Engine analyzes the task to provide a fair market rate, preventing overcharging[cite: 79, 168]."
    },
    {
      icon: <UserCheck className="text-orange-500" />,
      title: "Verified Matching",
      desc: "We broadcast your job only to verified workers or contractors with a high Trust Score in our digital ledger[cite: 77, 80]."
    },
    {
      icon: <Wallet className="text-indigo-500" />,
      title: "Escrow Protection",
      desc: "Your payment is locked in a secure milestone-based escrow. Funds are only released once you approve the digital completion certificate[cite: 78, 101]."
    }
  ];

  return (
    <main className="min-h-screen bg-[#0f172a] text-white pt-32 pb-20 px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-black mb-6">The New Standard for <br/><span className="text-blue-500">Service Reliability.</span></h1>
        <p className="text-slate-400 text-lg mb-16">Eliminating the 'Old Chaos' of unorganized hiring with a structured digital ecosystem[cite: 15, 84].</p>

        <div className="space-y-12 text-left">
          {steps.map((step, i) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              key={i} 
              className="flex gap-8 items-start bg-white/5 border border-white/10 p-8 rounded-[32px]"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0">
                {step.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 rounded-[40px] bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl shadow-blue-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to start?</h2>
          <p className="text-blue-100 mb-8">Join the thousands of users building trust in the service economy.</p>
          <div className="flex justify-center gap-4">
            <Link href="/signup" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition flex items-center gap-2">
              Create My ID <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}