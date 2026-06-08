"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight } from "lucide-react";

export default function GenericPage({ title, label, desc }: { title: string, label: string, desc: string }) {
  return (
    <main className="min-h-screen bg-[#FFFDF7] flex flex-col">
      <Navbar />
      <div className="bg-[#0D1B2A] pt-32 pb-20 text-center">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <p className="section-label text-[#F5E6C0] mb-4">{label}</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">{title}</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{desc}</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center py-20 text-center px-4">
        <div>
          <div className="w-20 h-20 rounded-full bg-[#F5E6C0] text-[#B8860B] flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#0D1B2A] mb-4">Module Coming Soon</h2>
          <p className="text-[#888] max-w-md mx-auto mb-8">We are currently integrating advanced data sets for this feature. It will be available in the next release cycle.</p>
          <a href="/" className="btn-navy">Return Home <ArrowRight size={16} /></a>
        </div>
      </div>
      <Footer />
    </main>
  );
}
