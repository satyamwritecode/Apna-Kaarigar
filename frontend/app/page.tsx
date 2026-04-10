"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShieldCheck, Wrench, HardHat, Zap, ArrowRight, Loader2, CheckCircle2, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiResult, setAiResult] = useState<{ price: string; justification: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAISearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    setIsSearching(true);
    setAiResult(null);

    try {
      // Connects to the Python FastAPI Microservice (Port 8000)
      const res = await fetch("http://localhost:8000/estimate-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: searchQuery, category: "General Services" }),
      });
      const data = await res.json();
      setAiResult({ price: data.price_range, justification: data.justification });
    } catch (error) {
      alert("AI Engine Offline. Please ensure your Python server is running on port 8000.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white selection:bg-blue-500/30">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      {/* --- PREMIUM NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-xl px-6 md:px-12 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Wrench size={20} className="text-white" />
          </div>
          <span className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            ApnaKarigar
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/marketplace" className="text-slate-400 hover:text-white transition">Marketplace</Link>
          <Link href="/how-it-works" className="text-slate-400 hover:text-white transition">How it Works</Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <Link href="/login" className="text-slate-400 hover:text-white transition">Log In</Link>
          <Link href="/signup" className="bg-white text-black px-5 py-2.5 rounded-full font-bold hover:bg-slate-200 transition active:scale-95">
            Join Platform
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0f172a] pt-24 px-8 flex flex-col gap-6 text-2xl font-bold"
          >
            <Link href="/marketplace" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</Link>
            <Link href="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>How it Works</Link>
            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Log In</Link>
            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-blue-500">Sign Up</Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-44 pb-32 px-6 flex flex-col items-center text-center max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8"
        >
          <Zap size={14} /> AI-Powered Verified Marketplace
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]"
        >
          Workmanship Meet <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            Artificial Intelligence.
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
        >
          Empowering India's skilled workforce through a trusted digital ecosystem[cite: 157, 180]. 
          Smart matching, secure escrow, and AI-validated fair rates[cite: 78, 79].
        </motion.p>

        {/* --- AI SEARCH ENGINE --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
          className="w-full max-w-3xl relative"
        >
          <form onSubmit={handleAISearch} className="group relative bg-white/5 backdrop-blur-2xl border border-white/10 p-2 rounded-[32px] flex items-center shadow-2xl focus-within:border-blue-500/50 transition-all duration-500">
            <div className="pl-6 text-slate-500 group-focus-within:text-blue-400 transition-colors">
              <Search size={22} />
            </div>
            <input 
              type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Describe your task... (e.g. Electrician for full house wiring)" 
              className="flex-grow bg-transparent px-4 py-5 text-lg outline-none text-white placeholder:text-slate-500"
              disabled={isSearching}
            />
            <button 
              type="submit" disabled={isSearching || !searchQuery}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-[24px] font-bold transition flex items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="animate-spin" size={20} /> : "Find Experts"}
            </button>
          </form>

          {/* AI Output Card */}
          <AnimatePresence>
            {aiResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 right-0 mt-6 bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[32px] text-left shadow-2xl z-20 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={100} /></div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 size={18} className="text-green-400" />
                  </div>
                  <h3 className="text-green-400 font-bold uppercase tracking-widest text-xs">AI Dynamic Rate Card</h3>
                </div>
                <div className="text-4xl font-black mb-3">{aiResult.price}</div>
                <p className="text-slate-300 text-lg leading-relaxed max-w-xl">{aiResult.justification}</p>
                <button className="mt-6 text-blue-400 font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  Proceed to Secure Booking <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="py-32 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          {[
            { icon: <ShieldCheck className="text-blue-500" />, title: "Verified Network", desc: "Identity checks and digital trust scores ensure safe and reliable hiring[cite: 77, 176]." },
            { icon: <Zap className="text-orange-500" />, title: "Secure Escrow", desc: "Milestone-based payments release only after customer approval[cite: 78, 101]." },
            { icon: <HardHat className="text-indigo-500" />, title: "Team Tools", desc: "Advanced dashboards for contractors to manage large-scale project labor[cite: 81, 112]." }
          ].map((f, i) => (
            <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
              <div className="mb-6 w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}