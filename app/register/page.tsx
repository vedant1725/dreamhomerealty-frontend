"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { ArrowRight, Lock, Mail, User, Phone, Briefcase, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
    const { register, error, loading, clearError } = useAuth();
    
    // Form States
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneCode, setPhoneCode] = useState("+91");
    const [phoneNum, setPhoneNum] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"user" | "agent">("user");
    const [agreed, setAgreed] = useState(false);
    
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState("");

    // Clear errors when form inputs change
    useEffect(() => {
        clearError();
        setLocalError("");
    }, [firstName, lastName, email, phoneNum, password, role]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError("");

        if (!firstName || !lastName || !email || !password || !phoneNum) {
            setLocalError("Please fill out all required fields.");
            return;
        }

        if (password.length < 8) {
            setLocalError("Password must be at least 8 characters long.");
            return;
        }

        if (!agreed) {
            setLocalError("You must agree to the Terms of Service and Privacy Policy.");
            return;
        }

        const fullPhone = `${phoneCode} ${phoneNum.trim()}`;
        const userData = {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
            phone: fullPhone,
            password,
            role
        };

        await register(userData);
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
                <div className="hidden lg:flex lg:w-[45%] relative items-end overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200"
                        alt="Luxury Architecture"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/95 via-[#0D1B2A]/60 to-[#0D1B2A]/10"></div>
                    <div className="relative z-10 p-12 pb-16">
                        <p className="section-label text-[#F5E6C0] mb-4">Join DreamHome</p>
                        <h2 className="font-serif text-4xl font-bold text-white leading-tight mb-6">
                            Your Journey to <br /> Luxury Begins Here
                        </h2>
                        <div className="space-y-4">
                            {["Priority access to new listings", "AI-powered property matching", "Dedicated relationship manager", "Exclusive NRI investment desk"].map((item) => (
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
                    <div className="w-full max-w-lg">
                        <div className="mb-10">
                            <p className="section-label mb-3">Create Account</p>
                            <h1 className="font-serif text-4xl font-bold text-[#0D1B2A]">Register Free</h1>
                            <p className="text-[#888] mt-2 text-sm">Join India's most exclusive real estate network.</p>
                        </div>

                        {/* Display Error Message */}
                        {(error || localError) && (
                            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-700 text-xs font-semibold leading-relaxed">
                                {localError || error}
                            </div>
                        )}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Role Toggle Selector */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-bold font-ui text-[#0D1B2A]">I want to register as a:</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setRole("user")}
                                        className={`py-3 rounded-xl border text-xs font-bold font-ui transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                            role === "user"
                                                ? "bg-[#0D1B2A] text-white border-[#0D1B2A] shadow-md"
                                                : "bg-white text-[#0D1B2A] border-[#E8E4DC] hover:bg-[#F7F3E8]"
                                        }`}
                                        disabled={loading}
                                    >
                                        <User size={14} /> Client / Buyer
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole("agent")}
                                        className={`py-3 rounded-xl border text-xs font-bold font-ui transition-all flex items-center justify-center gap-2 cursor-pointer ${
                                            role === "agent"
                                                ? "bg-[#0D1B2A] text-white border-[#0D1B2A] shadow-md"
                                                : "bg-white text-[#0D1B2A] border-[#E8E4DC] hover:bg-[#F7F3E8]"
                                        }`}
                                        disabled={loading}
                                    >
                                        <Briefcase size={14} /> Realty Agent
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold font-ui text-[#0D1B2A]">First Name</label>
                                    <div className="relative">
                                        <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
                                        <input 
                                            type="text" 
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="John" 
                                            className="w-full pl-11 pr-4 py-3.5 border border-[#E8E4DC] rounded-xl text-sm text-[#0D1B2A] placeholder:text-[#aaa] focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/10 bg-white transition-all" 
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold font-ui text-[#0D1B2A]">Last Name</label>
                                    <div className="relative">
                                        <User size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
                                        <input 
                                            type="text" 
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Doe" 
                                            className="w-full pl-11 pr-4 py-3.5 border border-[#E8E4DC] rounded-xl text-sm text-[#0D1B2A] placeholder:text-[#aaa] focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/10 bg-white transition-all" 
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            </div>

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
                                <label className="text-sm font-bold font-ui text-[#0D1B2A]">Phone Number</label>
                                <div className="flex gap-2">
                                    <select 
                                        value={phoneCode}
                                        onChange={(e) => setPhoneCode(e.target.value)}
                                        className="border border-[#E8E4DC] rounded-xl px-3 py-3.5 text-sm text-[#0D1B2A] focus:outline-none focus:border-[#B8860B] bg-white w-24"
                                        disabled={loading}
                                    >
                                        <option value="+91">🇮🇳 +91</option>
                                        <option value="+1">🇺🇸 +1</option>
                                        <option value="+971">🇦🇪 +971</option>
                                        <option value="+44">🇬🇧 +44</option>
                                    </select>
                                    <div className="relative flex-1">
                                        <Phone size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
                                        <input 
                                            type="tel" 
                                            value={phoneNum}
                                            onChange={(e) => setPhoneNum(e.target.value)}
                                            placeholder="98765 43210" 
                                            className="w-full pl-11 pr-4 py-3.5 border border-[#E8E4DC] rounded-xl text-sm text-[#0D1B2A] placeholder:text-[#aaa] focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/10 bg-white transition-all" 
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold font-ui text-[#0D1B2A]">Password</label>
                                <div className="relative">
                                    <Lock size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 8 characters" 
                                        className="w-full pl-11 pr-12 py-3.5 border border-[#E8E4DC] rounded-xl text-sm text-[#0D1B2A] placeholder:text-[#aaa] focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/10 bg-white transition-all" 
                                        disabled={loading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#888] hover:text-[#B8860B]"
                                    >
                                        {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 text-sm text-[#888] pt-2">
                                <input 
                                    type="checkbox" 
                                    checked={agreed}
                                    onChange={(e) => setAgreed(e.target.checked)}
                                    className="w-4 h-4 mt-0.5 accent-[#B8860B]" 
                                    disabled={loading}
                                />
                                <span>I agree to DreamHome's <Link href="#" className="text-[#B8860B] font-bold hover:underline">Terms of Service</Link> and <Link href="#" className="text-[#B8860B] font-bold hover:underline">Privacy Policy</Link></span>
                            </div>

                            <button 
                                type="submit" 
                                disabled={loading}
                                className="btn-gold w-full py-4 rounded-xl text-sm mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating Account..." : "Create Free Account"} {!loading && <ArrowRight size={18} />}
                            </button>

                            <div className="relative flex items-center gap-3">
                                <div className="flex-1 h-px bg-[#E8E4DC]"></div>
                                <span className="text-xs text-[#888] font-medium">or</span>
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
                                Register with Google
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-[#888]">
                            Already have an account?{" "}
                            <Link href="/login" className="text-[#B8860B] font-bold hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}