"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { backendAPI } from "@/lib/api"; // Uses the Axios setup we made earlier

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "CUSTOMER", // Default role
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Sends the data to your Node.js backend to create the ID in MongoDB
      const response = await backendAPI.post("/auth/register", formData);
      
      // Save the login token
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      
      alert("Account Created Successfully! Welcome to Apna Karigar.");
      router.push("/dashboard"); // Send them to the connection hub
      
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Join Apna Karigar</h1>
        <p className="text-slate-500 mb-6">Create your ID to start connecting.</p>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name (e.g., Aman Singh)" 
            className="w-full p-3 border rounded-xl focus:outline-blue-500" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-3 border rounded-xl focus:outline-blue-500" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input 
            type="password" 
            placeholder="Create Password" 
            className="w-full p-3 border rounded-xl focus:outline-blue-500" 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          
          {/* This is how the database knows who is who! */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">I want to join as a:</label>
            <select 
              className="w-full p-3 border rounded-xl focus:outline-blue-500 bg-white"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="CUSTOMER">Customer (I need to hire someone)</option>
              <option value="WORKER">Worker (I want to find small jobs)</option>
              <option value="CONTRACTOR">Contractor (I manage large projects)</option>
            </select>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition disabled:opacity-50 mt-4"
          >
            {loading ? "Creating ID..." : "Create Account"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-slate-600">
          Already have an account? <Link href="/login" className="text-blue-600 font-bold hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}