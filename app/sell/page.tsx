"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CheckCircle2, ChevronRight, Upload, Home, DollarSign, Image as ImageIcon, Star, User, Eye } from "lucide-react";

const STEPS = [
  { id: 1, label: "Property Basics", icon: Home },
  { id: 2, label: "Pricing", icon: DollarSign },
  { id: 3, label: "Photos", icon: ImageIcon },
  { id: 4, label: "Amenities", icon: Star },
  { id: 5, label: "Contact Details", icon: User },
  { id: 6, label: "Review & Submit", icon: Eye },
];

const AMENITY_LIST = [
  "Swimming Pool","Gym","Club House","Children Play Area","24/7 Security",
  "Power Backup","Visitor Parking","Garden","Lift","Intercom",
  "CCTV","Fire Safety","Rain Water Harvesting","Solar Panels","EV Charging",
];

export default function SellPage() {
  const [step, setStep] = useState(1);
  const [amenities, setAmenities] = useState<string[]>([]);

  const toggleAmenity = (a: string) => {
    setAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);
  };

  return (
    <main className="bg-[#FFFDF7] flex flex-col min-h-screen">
      <Navbar />

      <div className="bg-[#0D1B2A] pt-32 pb-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <span className="section-label text-[#F5E6C0] mb-3">Zero Brokerage</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mt-3">List Your Property</h1>
          <p className="text-white/60 mt-2">Reach 10 lakh+ serious buyers across India. Free listing, verified leads.</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-[#F7F3E8] sticky top-[72px] z-30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {STEPS.map((s, idx) => (
              <div key={s.id} className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setStep(s.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold font-ui transition-all ${
                    step === s.id ? "bg-[#0D1B2A] text-white shadow-sm" :
                    step > s.id ? "bg-emerald-50 text-emerald-700" : "text-[#888] hover:text-[#0D1B2A]"
                  }`}
                >
                  {step > s.id ? <CheckCircle2 size={14} /> : <s.icon size={14} />}
                  {s.label}
                </button>
                {idx < STEPS.length - 1 && <ChevronRight size={14} className="text-[#ddd] shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 flex-1">
        <div className="grid lg:grid-cols-[1fr_320px] gap-8">

          {/* Form Area */}
          <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(13,27,42,0.07)] border border-[#F7F3E8] p-8">

            {step === 1 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-6">Step 1: Property Basics</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Property Title</label>
                    <input type="text" placeholder="e.g. Modern 3BHK Apartment in Bandra West" className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/10 bg-[#FFFDF7]" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">City</label>
                    <select className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]">
                      <option>Select City</option>
                      {["Mumbai","Bangalore","Hyderabad","Pune","Gurugram","Delhi","Chennai","Kolkata"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Locality</label>
                    <input type="text" placeholder="e.g. Bandra West, Koramangala..." className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Property Type</label>
                    <select className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]">
                      {["Apartment","Villa","Penthouse","Plot","Commercial"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Listing Type</label>
                    <div className="flex gap-3">
                      {["Sell","Rent"].map(t => (
                        <button key={t} className="flex-1 py-3.5 rounded-xl text-sm font-bold border-2 border-[#F7F3E8] text-[#555] hover:border-[#B8860B] hover:text-[#B8860B] transition-all">{t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Bedrooms (BHK)</label>
                    <div className="flex gap-2">
                      {["1","2","3","4","5+"].map(b => (
                        <button key={b} className="flex-1 py-3.5 rounded-xl text-sm font-bold border border-[#F7F3E8] text-[#555] hover:border-[#B8860B] transition-all">{b}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Bathrooms</label>
                    <div className="flex gap-2">
                      {["1","2","3","4","5+"].map(b => (
                        <button key={b} className="flex-1 py-3.5 rounded-xl text-sm font-bold border border-[#F7F3E8] text-[#555] hover:border-[#B8860B] transition-all">{b}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Carpet Area (sqft)</label>
                    <input type="number" placeholder="e.g. 1500" className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Furnishing Status</label>
                    <select className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]">
                      {["Fully Furnished","Semi Furnished","Unfurnished"].map(f => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-6">Step 2: Pricing Details</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Expected Price / Monthly Rent</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#888]">₹</span>
                      <input type="text" placeholder="e.g. 85,00,000" className="w-full border border-[#E8E4DC] rounded-xl pl-9 pr-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Price Negotiable?</label>
                    <div className="flex gap-3">
                      {["Yes","No"].map(opt => (
                        <button key={opt} className="flex-1 py-3.5 rounded-xl text-sm font-bold border-2 border-[#F7F3E8] text-[#555] hover:border-[#B8860B] hover:text-[#B8860B] transition-all">{opt}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">All Inclusive?</label>
                    <div className="flex gap-3">
                      {["Yes","No"].map(opt => (
                        <button key={opt} className="flex-1 py-3.5 rounded-xl text-sm font-bold border-2 border-[#F7F3E8] text-[#555] hover:border-[#B8860B] hover:text-[#B8860B] transition-all">{opt}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-6">Step 3: Property Photos</h2>
                <p className="text-[#888] text-sm mb-6">High-quality photos get 10x more inquiries. Upload minimum 5 photos.</p>
                <div className="border-2 border-dashed border-[#E8E4DC] rounded-2xl p-12 text-center hover:border-[#B8860B] transition-colors cursor-pointer bg-[#FFFDF7]">
                  <Upload size={40} className="text-[#B8860B] mx-auto mb-4" />
                  <p className="font-bold text-[#0D1B2A] mb-1">Drag & drop photos here</p>
                  <p className="text-sm text-[#888] mb-4">or click to browse (JPG, PNG, max 10MB each)</p>
                  <button className="btn-outline py-3 px-8">Choose Photos</button>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="aspect-square rounded-xl bg-[#F7F3E8] skeleton"></div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-6">Step 4: Amenities</h2>
                <p className="text-[#888] text-sm mb-6">Select all amenities available in your property or society.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {AMENITY_LIST.map(a => (
                    <button
                      key={a}
                      onClick={() => toggleAmenity(a)}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all text-left ${amenities.includes(a) ? "border-[#0D1B2A] bg-[#0D1B2A] text-white" : "border-[#F7F3E8] text-[#555] hover:border-[#B8860B]"}`}
                    >
                      <CheckCircle2 size={15} className={amenities.includes(a) ? "text-[#B8860B]" : "text-[#ddd]"} />
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-6">Step 5: Your Contact Details</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Full Name</label><input type="text" placeholder="Your full name" className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]" /></div>
                  <div><label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Phone</label><input type="tel" placeholder="+91 98765 43210" className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]" /></div>
                  <div className="sm:col-span-2"><label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Email</label><input type="email" placeholder="you@example.com" className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]" /></div>
                  <div>
                    <label className="text-sm font-bold text-[#0D1B2A] mb-1.5 block font-ui">Owner Type</label>
                    <div className="flex gap-3">
                      {["Owner","Builder","Agent"].map(t => (
                        <button key={t} className="flex-1 py-3.5 rounded-xl text-sm font-bold border-2 border-[#F7F3E8] text-[#555] hover:border-[#B8860B] transition-all">{t}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={44} className="text-emerald-500" />
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#0D1B2A] mb-3">Ready to List!</h2>
                <p className="text-[#888] mb-8 max-w-md mx-auto">Review your listing details and submit. Your property will go live within 2 hours after verification.</p>
                <button className="btn-gold py-4 px-12 text-base rounded-2xl">Submit Listing Free</button>
                <p className="text-xs text-[#888] mt-4">No charges. No hidden fees. 100% free listing.</p>
              </div>
            )}

            {/* Navigation Buttons */}
            {step !== 6 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-[#F7F3E8]">
                <button
                  onClick={() => setStep(Math.max(1, step - 1))}
                  className="btn-outline py-3 px-8 disabled:opacity-40"
                  disabled={step === 1}
                >
                  ← Previous
                </button>
                <button onClick={() => setStep(Math.min(6, step + 1))} className="btn-navy py-3 px-8">
                  Next Step →
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Tips */}
          <div className="space-y-4">
            <div className="bg-[#0D1B2A] rounded-2xl p-6 text-white">
              <h3 className="font-serif font-bold text-xl mb-4">💡 Tips for This Step</h3>
              <div className="space-y-3 text-sm text-white/70">
                {step === 1 && ["Add a detailed, keyword-rich title", "Choose the most accurate property type", "Provide exact carpet area for better matching"].map(tip => <p key={tip} className="flex gap-2"><span className="text-[#B8860B] shrink-0">•</span>{tip}</p>)}
                {step === 2 && ["Research similar listings in your area", "Negotiable pricing gets 40% more inquiries", "All-inclusive pricing attracts tenant buyers"].map(tip => <p key={tip} className="flex gap-2"><span className="text-[#B8860B] shrink-0">•</span>{tip}</p>)}
                {step === 3 && ["Natural lighting photos perform best", "Include exterior, living room, kitchen & bathrooms", "Aerial/drone shots increase views by 70%"].map(tip => <p key={tip} className="flex gap-2"><span className="text-[#B8860B] shrink-0">•</span>{tip}</p>)}
                {step === 4 && ["More amenities = more inquiries", "Even basic amenities like lift matter to buyers", "Be accurate — misleading info leads to rejections"].map(tip => <p key={tip} className="flex gap-2"><span className="text-[#B8860B] shrink-0">•</span>{tip}</p>)}
                {step === 5 && ["Verified phone numbers get priority ranking", "Expect calls within 24 hours of listing", "DreamHome does NOT share your number publicly"].map(tip => <p key={tip} className="flex gap-2"><span className="text-[#B8860B] shrink-0">•</span>{tip}</p>)}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#F7F3E8] shadow-[0_2px_20px_rgba(13,27,42,0.07)]">
              <h3 className="font-bold text-[#0D1B2A] mb-3">Why List with DreamHome?</h3>
              <div className="space-y-2">
                {["Zero brokerage fee", "10 lakh+ active buyers", "RERA verification support", "Verified leads only", "Dedicated relationship manager"].map(b => (
                  <div key={b} className="flex items-center gap-2 text-sm text-[#555]">
                    <CheckCircle2 size={15} className="text-[#B8860B] shrink-0" /> {b}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}