"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { ArrowRight, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login, error, loading, clearError } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState("");

    // Clear context errors when page mounts or email/password changes
    useEffect(() => {
        clearError();
        setLocalError("");
    }, [email, password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError("");

        if (!email || !password) {
            setLocalError("Please enter both your email address and password.");
            return;
        }

        if (password.length < 8) {
            setLocalError("Password must be at least 8 characters long.");
            return;
        }

        await login(email, password);
    };

    return (
        <main className="min-h-screen bg-[#FFFDF7] flex flex-col">
            <Link href="/" className="absolute top-4 left-6 z-50 group bg-transparent">
               <img 
                 src="/dream home logo.png" 
                 alt="DreamHome Realty Logo" 
                 className="max-h-[64px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                 style={{ imageRendering: '-webkit-optimize-contrast' }}
               />
            </Link>

            <div className="flex-1 flex">
                {/* Left Panel */}
                <div className="hidden lg:flex lg:w-[55%] relative items-end overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
                        alt="Luxury Interior"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/95 via-[#0D1B2A]/50 to-[#0D1B2A]/10"></div>

                    <div className="relative z-10 p-12 pb-16">
                        <div className="inline-flex items-center gap-2 bg-[#B8860B]/20 border border-[#B8860B]/40 rounded-full px-4 py-2 mb-6">
                            <span className="text-[#B8860B] text-xs font-bold font-ui uppercase tracking-widest">Members Only Access</span>
                        </div>
                        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                            Unlock Exclusive <br /> Off-Market Properties
                        </h2>
                        <div className="space-y-4">
                            {["Access 500+ verified off-market listings", "AI-powered property recommendations", "Priority alerts on price drops", "Dedicated relationship manager"].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#B8860B] flex items-center justify-center shrink-0 text-white text-xs">✓</div>
                                    <span className="text-white/90 text-sm font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex-1 flex items-center justify-center px-6 py-12 pt-28 lg:pt-12">
                    <div className="w-full max-w-md">
                        <div className="mb-10">
                            <p className="section-label mb-3">Welcome Back</p>
                            <h1 className="font-serif text-4xl font-bold text-[#0D1B2A]">Sign In</h1>
                            <p className="text-[#888] mt-2 text-sm">Access your saved properties and premium listings.</p>
                        </div>

                        {/* Display Error Message */}
                        {(error || localError) && (
                            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs font-semibold leading-relaxed">
                                {localError || error}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold font-ui text-[#0D1B2A]">Email Address</label>
                                <div className="relative">
                                    <Mail size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full pl-11 pr-4 py-3.5 border border-[#E8E4DC] rounded-xl text-sm text-[#0D1B2A] placeholder:text-[#aaa] focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/10 bg-white transition-all"
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <div className="flex justify-between">
                                    <label className="text-sm font-bold font-ui text-[#0D1B2A]">Password</label>
                                    <Link href="#" className="text-xs text-[#B8860B] font-bold hover:underline">Forgot password?</Link>
                                </div>
                                <div className="relative">
                                    <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3.5 border border-[#E8E4DC] rounded-xl text-sm text-[#0D1B2A] placeholder:text-[#aaa] focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/10 bg-white transition-all"
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#B8860B] focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn-navy w-full py-4 rounded-xl text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {loading ? "Signing In..." : "Sign In"} {!loading && <ArrowRight size={18} />}
                            </button>

                            <div className="relative flex items-center gap-3">
                                <div className="flex-1 h-px bg-[#E8E4DC]"></div>
                                <span className="text-xs text-[#888] font-medium">or continue with</span>
                                <div className="flex-1 h-px bg-[#E8E4DC]"></div>
                            </div>

                            <button 
                                type="button" 
                                className="w-full flex items-center justify-center gap-3 py-3.5 border border-[#E8E4DC] rounded-xl text-sm font-semibold text-[#0D1B2A] hover:bg-[#F7F3E8] transition-colors cursor-pointer"
                            >
                                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                        <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                                        <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                                        <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                                        <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                                    </g>
                                </svg>
                                Continue with Google
                            </button>

                            <button type="button" className="w-full flex items-center justify-center gap-3 py-3.5 border border-[#E8E4DC] rounded-xl text-sm font-semibold text-[#0D1B2A] hover:bg-[#F7F3E8] transition-colors cursor-pointer">
                                <span className="text-lg">📱</span> Continue with Phone OTP
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-[#888]">
                            Don't have an account?{" "}
                            <Link href="/register" className="text-[#B8860B] font-bold hover:underline">Create Account</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}