"use client";
import React, { useState } from "react";
import { X, Phone, Home, ShieldCheck, Clock, User, Mail, MessageSquare, Lock, ArrowRight, Star, Sparkles, CheckCircle2 } from "lucide-react";

interface NexusRealModalProps {
  isOpen: boolean;
  isClosing: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export default function NexusRealModal({ isOpen, isClosing, onClose, onSubmitSuccess }: NexusRealModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    interest: "",
    message: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    if (!formData.interest) newErrors.interest = "Please select an option";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    // Simulate API submission
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onSubmitSuccess();
        setSuccess(false);
        setFormData({
          fullName: "",
          email: "",
          countryCode: "+91",
          phone: "",
          interest: "",
          message: ""
        });
      }, 1500);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
      {/* Container holding the card (pointer-events-auto so clicks work on the modal) */}
      <div 
        className="w-full max-w-[1000px] bg-white rounded-[24px] border border-[#F0EDE6] shadow-[0_24px_80px_rgba(13,27,42,0.18)] overflow-hidden flex flex-col pointer-events-auto"
        style={{
          animation: isClosing
            ? "nexusExit 300ms cubic-bezier(0.16, 1, 0.3, 1) forwards"
            : "nexusEntrance 400ms cubic-bezier(0.16, 1, 0.3, 1) forwards, nexusModalFloat 6s ease-in-out infinite 400ms"
        }}
      >
        {/* Style block for animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes nexusEntrance {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(16px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          @keyframes nexusExit {
            from {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
            to {
              opacity: 0;
              transform: scale(0.95) translateY(12px);
            }
          }
          @keyframes nexusModalFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
        `}} />

        {/* ── TOP SECTION (BENEFITS & FORM) ── */}
        <div className="flex flex-col md:flex-row flex-1">
          
          {/* Left Column (Benefits + Image split) */}
          <div className="md:w-[62%] bg-[#FAF9F6] flex flex-col sm:flex-row border-r border-[#F0EDE6]/60 relative">
            
            {/* Left text/benefits part */}
            <div className="sm:w-[54%] p-8 pr-4 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold font-ui uppercase tracking-wider text-[#B38F43] bg-[#B38F43]/10 px-2.5 py-1 rounded-md w-fit block mb-3">
                  We are here to help you
                </span>
                <h2 className="font-serif text-3xl font-bold text-[#0D1B2A] leading-tight mb-2">
                  Let's Find Your<br />
                  <span className="text-[#B38F43]">Perfect Property</span>
                </h2>
                <div className="w-8 h-[2px] bg-[#B38F43] my-4" />
                <p className="text-xs text-[#555] leading-relaxed mb-6">
                  Connect with our property experts and get personalized assistance for all your real estate needs.
                </p>
              </div>

              {/* Benefit List */}
              <div className="space-y-4">
                {[
                  { icon: Phone, title: "Expert Consultation", sub: "Get advice from our property specialists" },
                  { icon: Home, title: "Best Property Options", sub: "Handpicked properties as per your requirement" },
                  { icon: ShieldCheck, title: "100% Secure Process", sub: "Verified properties and secure transactions" },
                  { icon: Clock, title: "Save Time & Effort", sub: "We find the best, you make the choice" },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#F0EDE6] shadow-[0_2px_8px_rgba(13,27,42,0.04)] flex items-center justify-center text-[#B38F43] shrink-0">
                      <item.icon size={13} />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0D1B2A] leading-tight">{item.title}</h4>
                      <p className="text-[10px] text-[#888] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right image part - flush to top, right, and bottom of this left section */}
            <div className="sm:w-[46%] relative min-h-[350px] sm:min-h-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800" 
                alt="Luxury Modern Villa" 
                className="w-full h-full object-cover absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Overlapping happy clients badge */}
              <div className="absolute bottom-4 left-3 right-3 bg-[#0D1B2A]/90 backdrop-blur-md text-white p-3 rounded-xl border border-white/10 shadow-lg flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0D1B2A] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=64&h=64" alt="user" />
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0D1B2A] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=64&h=64" alt="user" />
                    <img className="inline-block h-6 w-6 rounded-full ring-2 ring-[#0D1B2A] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=64&h=64" alt="user" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-white truncate leading-none">25,000+ Happy Clients</p>
                    <p className="text-[8px] text-white/50 truncate mt-0.5">Trusted by thousands of buyers</p>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-1.5 mt-0.5">
                  <span className="text-[8px] text-white/60">across India</span>
                  <div className="flex items-center gap-0.5">
                    {Array(5).fill(0).map((_, i) => (
                      <Star key={i} size={9} className="text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Form section) */}
          <div className="md:w-[38%] p-8 bg-white relative flex flex-col justify-between">
            {/* Close Button top-right */}
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#FAF9F6] border border-[#F0EDE6] hover:bg-[#F0EDE6]/50 flex items-center justify-center text-[#555] transition-all cursor-pointer shadow-sm z-20"
            >
              <X size={14} />
            </button>

            {success ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 py-10 animate-fade-in-up">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0D1B2A]">Consultation Scheduled</h3>
                <p className="text-xs text-[#888] max-w-[200px]">Our property advisor will get in touch with you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#0D1B2A] mb-1">Get in Touch</h3>
                  <p className="text-xs text-[#888] mb-5">Fill in your details and our expert will connect with you shortly.</p>

                  <div className="space-y-3">
                    {/* Full Name */}
                    <div className="relative">
                      <input 
                        type="text" 
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`w-full pl-9 pr-3 py-2.5 text-xs border bg-[#FFFDF7] rounded-xl focus:border-[#B38F43] focus:outline-none ${
                          errors.fullName ? "border-red-400 focus:border-red-400" : "border-[#F0EDE6]"
                        }`}
                      />
                      <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
                    </div>

                    {/* Email */}
                    <div className="relative">
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full pl-9 pr-3 py-2.5 text-xs border bg-[#FFFDF7] rounded-xl focus:border-[#B38F43] focus:outline-none ${
                          errors.email ? "border-red-400 focus:border-red-400" : "border-[#F0EDE6]"
                        }`}
                      />
                      <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
                    </div>

                    {/* Country Code + Phone */}
                    <div className="flex gap-2">
                      <div className="relative w-[75px] shrink-0">
                        <select 
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                          className="w-full px-2.5 py-2.5 text-xs border border-[#F0EDE6] bg-[#FFFDF7] rounded-xl focus:border-[#B38F43] focus:outline-none text-[#555] appearance-none"
                        >
                          <option value="+91">+91</option>
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+971">+971</option>
                        </select>
                        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-[#888]">▼</div>
                      </div>
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-3 py-2.5 text-xs border bg-[#FFFDF7] rounded-xl focus:border-[#B38F43] focus:outline-none ${
                            errors.phone ? "border-red-400 focus:border-red-400" : "border-[#F0EDE6]"
                          }`}
                        />
                      </div>
                    </div>

                    {/* Interested In Dropdown */}
                    <div className="relative">
                      <select 
                        name="interest"
                        value={formData.interest}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2.5 text-xs border bg-[#FFFDF7] rounded-xl focus:border-[#B38F43] focus:outline-none text-[#555] appearance-none ${
                          errors.interest ? "border-red-400 focus:border-red-400" : "border-[#F0EDE6]"
                        }`}
                      >
                        <option value="">I'm Interested In</option>
                        <option value="Buy Property">Buy Property</option>
                        <option value="Sell Property">Sell Property</option>
                        <option value="Investment">Investment</option>
                        <option value="Auction">Auction</option>
                        <option value="3D Tour">3D Tour</option>
                        <option value="Commercial Property">Commercial Property</option>
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[8px] text-[#888]">▼</div>
                    </div>

                    {/* Message (Optional) */}
                    <div className="relative">
                      <textarea 
                        name="message"
                        placeholder="Message (Optional)"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 text-xs border border-[#F0EDE6] bg-[#FFFDF7] rounded-xl focus:border-[#B38F43] focus:outline-none h-14 resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-5">
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#B38F43] hover:bg-[#967431] text-white text-[11px] font-bold font-ui uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-65"
                  >
                    {submitting ? "Scheduling..." : "Schedule Free Consultation"}
                    <ArrowRight size={13} />
                  </button>

                  <div className="flex gap-2">
                    <button 
                      type="button"
                      onClick={() => alert("Callback request registered!")}
                      className="flex-1 py-2 border border-[#B38F43] hover:bg-[#B38F43]/5 text-[#B38F43] text-[9px] font-bold font-ui uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Phone size={10} /> Request Callback
                    </button>
                    <button 
                      type="button"
                      onClick={() => alert("Starting chat session...")}
                      className="flex-1 py-2 border border-[#B38F43] hover:bg-[#B38F43]/5 text-[#B38F43] text-[9px] font-bold font-ui uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <MessageSquare size={10} /> Chat With Expert
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* ── BOTTOM TRUST SECTION (FULL WIDTH) ── */}
        <div className="bg-[#FFFDF7] border-t border-[#F0EDE6] px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
          {[
            { icon: Sparkles, title: "Zero Borkerage", sub: "No hidden charges" },
            { icon: ShieldCheck, title: "RERA Verified", sub: "100% Verified Properties" },
            { icon: Home, title: "AI-Powered Match", sub: "Smart Recommendations" },
            { icon: Lock, title: "100% Secure", sub: "Secure Transactions" },
          ].map((badge, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <badge.icon size={16} className="text-[#B38F43] shrink-0" />
              <div>
                <span className="text-[10px] font-bold text-[#0D1B2A] block leading-none">{badge.title}</span>
                <span className="text-[9px] text-[#888] mt-1 block leading-none">{badge.sub}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
