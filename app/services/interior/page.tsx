import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Sofa, PaintBucket, Lamp, Box, ArrowRight } from 'lucide-react';

export default function InteriorDesignPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden min-h-[500px] flex items-center shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" 
              alt="Luxury Interior Design" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 to-transparent" />
            
            <div className="relative z-10 p-10 md:p-16 max-w-2xl">
              <span className="text-[#B8860B] text-sm font-bold tracking-widest uppercase mb-4 block">Bespoke Turnkey Interiors</span>
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Crafting <span className="text-[#B8860B]">Masterpieces</span><br /> You Call Home.
              </h1>
              <p className="text-white/70 text-lg mb-10 leading-relaxed">
                From concept to handover. Our award-winning designers create personalized, ultra-luxury living spaces that reflect your personality.
              </p>
              <button className="btn-gold">View Portfolio <ArrowRight size={18} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-3">The Process</span>
            <h2 className="font-serif text-4xl font-bold text-[#0D1B2A]">How We Transform Spaces</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Box, title: "3D Visualization", desc: "Hyper-realistic renders before execution begins." },
              { icon: Sofa, title: "Custom Furniture", desc: "Handcrafted, bespoke modular woodwork." },
              { icon: Lamp, title: "Smart Lighting", desc: "Automated mood lighting and ambient control." },
              { icon: PaintBucket, title: "Turnkey Execution", desc: "Zero hassle. We handle civil, electrical, and decor." },
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
