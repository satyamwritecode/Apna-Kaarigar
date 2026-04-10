"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { backendAPI } from "@/lib/api"; // The file we created earlier!

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // This actually talks to your Node.js server!
      const response = await backendAPI.post("/auth/login", {
        email,
        password,
      });

      // Save the secure token to the browser
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      
      alert("Login Successful! Routing to dashboard...");
      router.push("/dashboard"); // Now this correctly routes to the hub!// Redirects to home (or dashboard)
      
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to login. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Welcome Back</h1>
        
        {error && <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border rounded-xl mb-4 focus:outline-blue-500" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border rounded-xl mb-6 focus:outline-blue-500" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Log In"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-slate-600">
          Don't have an account? <Link href="/signup" className="text-blue-600 font-bold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}