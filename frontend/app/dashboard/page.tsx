"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, PlusCircle, Search } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>("");

  // Check if they are actually logged in when the page loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    
    if (!token) {
      router.push("/login"); // Kick them out if no ID is found
    } else {
      setRole(userRole);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.push("/");
  };

  if (!role) return <div className="p-10 text-center">Loading your workspace...</div>;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Dashboard Navbar */}
      <nav className="w-full bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="text-2xl font-black tracking-tighter">ApnaKarigar.</div>
        <div className="flex items-center gap-4">
          <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {role} PORTAL
          </span>
          <button onClick={handleLogout} className="flex items-center gap-2 text-slate-300 hover:text-white transition">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto p-8 mt-6">
        <h1 className="text-4xl font-bold mb-8">Welcome to your Workspace</h1>
        
        {/* Render different UI based on who logged in! */}
        {role === "CUSTOMER" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <PlusCircle className="text-blue-600" /> Post a New Job
            </h2>
            <p className="text-slate-600 mb-6">Describe your problem, and we'll broadcast it to verified workers in your area.</p>
            <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition">
              Create Job Listing
            </button>
          </div>
        )}

        {(role === "WORKER" || role === "CONTRACTOR") && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Search className="text-orange-500" /> Available Jobs Near You
            </h2>
            <p className="text-slate-600 mb-6">Browse open listings and submit your bids securely.</p>
            
            {/* Fake Job Listing for Demo Purposes */}
            <div className="border border-slate-100 rounded-xl p-6 bg-slate-50 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">Fix Leaking Kitchen Sink</h3>
                <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">₹800 Budget</span>
              </div>
              <p className="text-sm text-slate-500 mb-4">Customer needs an experienced plumber for a quick fix.</p>
              <button className="bg-slate-900 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-800 text-sm">
                Submit Bid
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}