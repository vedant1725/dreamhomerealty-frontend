import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Compass, Lightbulb, Sun, Layout, ArrowRight } from 'lucide-react';

export default function VastuPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden min-h-[500px] flex items-center shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
              alt="Vastu Architecture" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 to-[#0D1B2A]/40" />
            
            <div className="relative z-10 p-10 md:p-16 max-w-2xl">
              <span className="text-[#B8860B] text-sm font-bold tracking-widest uppercase mb-4 block">Ancient Science, Modern Living</span>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Harmonize Your <br /><span className="text-[#B8860B]">Living Space.</span>
              </h1>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                Expert Vastu Shastra consultation to attract prosperity, health, and positive energy into your dream home—without needing structural demolition.
              </p>
              <button className="btn-gold">Book a Consultation <ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-3">Our Expertise</span>
            <h2 className="font-serif text-4xl font-bold text-[#0D1B2A]">Scientific Vastu Solutions</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Layout, title: "Floor Plan Analysis", desc: "Evaluating 16 zones and 32 entrances." },
              { icon: Compass, title: "Directional Audit", desc: "Magnetic compass mapping for energy flow." },
              { icon: Lightbulb, title: "Non-Destructive Remedies", desc: "Color, mirror, and crystal therapy fixes." },
              { icon: Sun, title: "Pooja Room Alignment", desc: "Sacred space optimization for spiritual peace." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="p-8 rounded-2xl border border-[#F7F3E8] bg-[#FFFDF7] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#0D1B2A] text-[#B8860B] flex items-center justify-center mb-6">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0D1B2A] mb-3">{title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
