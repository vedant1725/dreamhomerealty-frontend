"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PressPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] flex flex-col">
      <Navbar />
      <div className="bg-[#0D1B2A] pt-32 pb-20 text-center">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <p className="section-label text-[#F5E6C0] mb-4">Newsroom</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">Press & Media</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Latest announcements, press releases, and media coverage for DreamHome Realty.</p>
        </div>
      </div>
      <div className="flex-1 max-w-screen-xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-[#F7F3E8] shadow-sm">
              <span className="text-xs font-bold text-[#B8860B] font-ui uppercase tracking-wider mb-3 block">Press Release</span>
              <h3 className="font-serif text-xl font-bold text-[#0D1B2A] mb-3">DreamHome Announces ₹500 Cr Fractional Investment Fund</h3>
              <p className="text-[#888] text-sm mb-4">DreamHome Realty has launched a new commercial real estate fund aimed at retail investors...</p>
              <button className="text-sm font-bold text-[#0D1B2A] hover:text-[#B8860B]">Read Full Article →</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
