"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROJECTS } from "@/lib/data";
import { MapPin, BadgeCheck, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";

const CITIES = ["All Cities", "Mumbai", "Bangalore", "Gurugram", "Hyderabad", "Pune"];
const STATUSES = ["All", "Ready to Move", "Under Construction", "New Launch"];

export default function ProjectsPage() {
  const [city, setCity] = useState("All Cities");
  const [status, setStatus] = useState("All");

  const filtered = PROJECTS.filter(p => {
    if (city !== "All Cities" && p.city !== city) return false;
    if (status !== "All" && p.status !== status) return false;
    return true;
  });

  return (
    <main className="bg-[#FFFDF7] flex flex-col min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0D1B2A] pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B8860B]/8 rounded-full blur-3xl translate-x-1/3 -translate-y-1/2"></div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <span className="section-label text-[#F5E6C0] mb-4">RERA Verified Developments</span>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mt-3 mb-4">New Premium Projects</h1>
          <p className="text-white/60 text-lg max-w-2xl">Discover India's most prestigious new residential and commercial developments from top builders.</p>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-[#F7F3E8] shadow-sm sticky top-[72px] z-30">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-sm font-bold text-[#888]">
            <Filter size={16} className="text-[#B8860B]" /> Filter:
          </div>
          <div className="flex gap-2 flex-wrap">
            {CITIES.map(c => (
              <button key={c} onClick={() => setCity(c)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${city === c ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "bg-white text-[#555] border-[#F7F3E8] hover:border-[#B8860B]"}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="w-px h-6 bg-[#F7F3E8] hidden sm:block"></div>
          <div className="flex gap-2 flex-wrap">
            {STATUSES.map(s => (
              <button key={s} onClick={() => setStatus(s)} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${status === s ? "bg-[#B8860B] text-white border-[#B8860B]" : "bg-white text-[#555] border-[#F7F3E8] hover:border-[#B8860B]"}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="section-padding flex-1">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <p className="text-[#888] mb-8"><span className="font-bold text-[#0D1B2A] text-xl">{filtered.length}</span> projects found</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length > 0 ? filtered.map(proj => (
              <div key={proj.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(13,27,42,0.08)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.14)] transition-all duration-300 hover:-translate-y-1 border border-[#F7F3E8] group">
                <div className="relative h-56 overflow-hidden">
                  <img src={proj.image} alt={proj.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent"></div>
                  <span className={`absolute top-3 left-3 text-[10px] font-bold font-ui uppercase tracking-wider px-3 py-1.5 rounded-full ${proj.status === "Ready to Move" ? "bg-emerald-500 text-white" : proj.status === "Under Construction" ? "bg-[#B8860B] text-white" : "bg-[#0D1B2A] text-white"}`}>
                    {proj.status}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-serif font-bold text-white text-xl">{proj.name}</h3>
                    <p className="text-white/75 text-xs flex items-center gap-1 mt-1"><MapPin size={11} className="text-[#B8860B]" />{proj.location}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs text-[#888] font-ui">Starting Price</p>
                      <p className="font-serif font-bold text-[#B8860B] text-2xl">{proj.priceDisplay}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#888] font-ui">Builder</p>
                      <p className="font-bold text-[#0D1B2A] text-sm">{proj.builder}</p>
                    </div>
                  </div>
                  {proj.status === "Under Construction" && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-[#888]">Construction Progress</span>
                        <span className="font-bold text-[#0D1B2A]">{proj.completion}%</span>
                      </div>
                      <div className="h-2 bg-[#F7F3E8] rounded-full overflow-hidden">
                        <div className="h-full bg-[#B8860B] rounded-full transition-all" style={{ width: `${proj.completion}%` }}></div>
                      </div>
                      <p className="text-xs text-[#888] mt-1">Completion: {proj.completionDate}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-y border-[#F7F3E8]">
                    <div className="text-center">
                      <p className="font-bold text-[#0D1B2A] text-sm">{proj.units}</p>
                      <p className="text-[10px] text-[#888]">Units</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-[#0D1B2A] text-sm">{proj.acres} Acres</p>
                      <p className="text-[10px] text-[#888]">Land Area</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-[#0D1B2A] text-sm">{proj.amenitiesCount}+</p>
                      <p className="text-[10px] text-[#888]">Amenities</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-emerald-600 font-bold"><BadgeCheck size={13} /> RERA Verified</span>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-[#0D1B2A] hover:text-[#B8860B] transition-colors">
                      View Details <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20">
                <p className="font-serif text-2xl font-bold text-[#0D1B2A] mb-2">No projects found</p>
                <p className="text-[#888] text-sm">Try changing your filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}