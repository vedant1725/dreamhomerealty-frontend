"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] flex flex-col">
      <Navbar />
      <div className="bg-[#0D1B2A] pt-32 pb-20 text-center">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <p className="section-label text-[#F5E6C0] mb-4">Insights</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">Real Estate Blog</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">Expert analysis, market trends, and buying guides from our top advisors.</p>
        </div>
      </div>
      <div className="flex-1 max-w-screen-xl mx-auto px-4 sm:px-6 py-20 w-full">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Top 10 Emerging Micro-markets in Pune for 2026",
            "FEMA Guidelines for NRI Property Buyers Explained",
            "How to Calculate True Rental Yield on Commercial Assets"
          ].map((title, i) => (
            <div key={i} className="bg-white rounded-2xl border border-[#F7F3E8] shadow-sm overflow-hidden group cursor-pointer">
              <div className="h-48 bg-[#F5E6C0] relative overflow-hidden">
                <div className="absolute inset-0 bg-[#0D1B2A]/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-[#B8860B] font-ui uppercase tracking-wider mb-2 block">Market Trends</span>
                <h3 className="font-serif text-xl font-bold text-[#0D1B2A] mb-3 leading-tight">{title}</h3>
                <p className="text-[#888] text-sm mb-4 line-clamp-2">Understanding the intricacies of the Indian real estate market requires expert knowledge and deep analysis of current trends...</p>
                <button className="text-sm font-bold text-[#0D1B2A] group-hover:text-[#B8860B]">Read Post →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
