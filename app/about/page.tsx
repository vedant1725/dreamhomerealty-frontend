"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Trophy, Users, Building, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] flex flex-col">
      <Navbar />
      
      <section className="relative pt-32 pb-20 bg-[#0D1B2A] overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B8860B]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2"></div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <p className="section-label text-[#F5E6C0] mb-4">About DreamHome</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            Redefining Luxury <br />Real Estate in India
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Founded in 2010, DreamHome International Realty has grown to become India's most trusted luxury real estate advisory firm, helping thousands of families and investors find their perfect properties.
          </p>
        </div>
      </section>

      <section className="section-padding flex-1">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Trophy, value: "14+", label: "Years of Excellence" },
              { icon: Users, value: "25k+", label: "Happy Families" },
              { icon: Building, value: "₹10k Cr", label: "Property Sold" },
              { icon: ShieldCheck, value: "100%", label: "RERA Compliant" }
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(13,27,42,0.07)] border border-[#F7F3E8] text-center">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 flex items-center justify-center text-[#B8860B] mx-auto mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#0D1B2A] mb-1">{value}</h3>
                <p className="text-sm text-[#888] font-ui uppercase tracking-wider">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl font-bold text-[#0D1B2A] mb-6">Our Mission</h2>
              <p className="text-[#555] leading-relaxed mb-6">
                To bring absolute transparency, verified quality, and seamless technology to the Indian real estate market. We believe buying a home should be a joy, not a stressful ordeal.
              </p>
              <button className="btn-navy py-4 px-8">Join Our Team <ArrowRight size={16} /></button>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200" alt="Luxury Home" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
