"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Search } from "lucide-react";

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] flex flex-col">
      <Navbar />
      <div className="bg-[#0D1B2A] pt-32 pb-20 text-center">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <p className="section-label text-[#F5E6C0] mb-4">Join Our Team</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">Build the Future of Real Estate</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">We are always looking for driven, passionate individuals to join our growing luxury real estate team across India.</p>
          <div className="max-w-md mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]" />
            <input type="text" placeholder="Search open positions..." className="w-full bg-white/10 border border-white/20 rounded-full pl-12 pr-4 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-[#B8860B]" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#F5E6C0] rounded-full flex items-center justify-center mx-auto mb-6 text-[#B8860B] font-serif text-2xl font-bold">DH</div>
          <h2 className="font-serif text-3xl font-bold text-[#0D1B2A] mb-3">No open positions currently</h2>
          <p className="text-[#888] max-w-md">Please check back later or send your resume to careers@dreamhome.in to be considered for future roles.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
