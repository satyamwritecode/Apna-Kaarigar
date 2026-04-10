"use client";

import { useEffect, useState } from "react";
import { backendAPI } from "@/lib/api";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, Filter } from "lucide-react";

export default function Marketplace() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await backendAPI.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <main className="min-h-screen bg-[#0f172a] text-white pt-24 px-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black mb-2">Service Marketplace</h1>
            <p className="text-slate-400">Browse verified job listings in your area.</p>
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm hover:bg-white/10 transition">
            <Filter size={18} /> Filter Results
          </button>
        </header>

        {loading ? (
          <div className="text-center py-20 text-slate-500">Scanning the digital ledger for open jobs...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job: any) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                key={job.id} 
                className="bg-white/5 border border-white/10 p-6 rounded-[24px] hover:border-blue-500/50 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:text-blue-400 transition">{job.title}</h3>
                  <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full uppercase">
                    {job.jobType}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2">{job.description}</p>
                
                <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
                  <div className="flex items-center gap-1"><MapPin size={16} /> Greater Noida</div>
                  <div className="flex items-center gap-1"><Clock size={16} /> Posted Today</div>
                  <div className="flex items-center gap-1 text-white font-bold"><Briefcase size={16} /> ₹{job.budget}</div>
                </div>

                <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-blue-500 hover:text-white transition-all">
                  Submit Proposal
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}