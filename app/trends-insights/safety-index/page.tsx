"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Heart, Wind, Trees, Moon, Hospital, Search, Eye, MapPin } from "lucide-react";

interface AreaSafetyProfile {
  name: string;
  city: string;
  overall: number;
  crime: number;
  healthcare: number;
  airQuality: number;
  greenCover: number;
  nightSafety: number;
  water: number;
}

const AREAS: AreaSafetyProfile[] = [
  { name: "Koregaon Park", city: "Pune", overall: 94, crime: 92, healthcare: 96, airQuality: 88, greenCover: 90, nightSafety: 95, water: 91 },
  { name: "Jubilee Hills", city: "Hyderabad", overall: 93, crime: 94, healthcare: 95, airQuality: 85, greenCover: 92, nightSafety: 93, water: 88 },
  { name: "Powai Hiranandani", city: "Mumbai", overall: 91, crime: 90, healthcare: 93, airQuality: 78, greenCover: 82, nightSafety: 92, water: 85 },
  { name: "Indiranagar", city: "Bangalore", overall: 90, crime: 88, healthcare: 92, airQuality: 80, greenCover: 83, nightSafety: 91, water: 82 },
  { name: "Whitefield corridor", city: "Bangalore", overall: 88, crime: 86, healthcare: 90, airQuality: 82, greenCover: 85, nightSafety: 88, water: 78 },
  { name: "Baner hub", city: "Pune", overall: 87, crime: 85, healthcare: 88, airQuality: 86, greenCover: 84, nightSafety: 87, water: 90 },
  { name: "Anna Nagar", city: "Chennai", overall: 86, crime: 84, healthcare: 89, airQuality: 76, greenCover: 79, nightSafety: 86, water: 80 },
  { name: "Salt Lake Sector 3", city: "Kolkata", overall: 85, crime: 83, healthcare: 87, airQuality: 74, greenCover: 80, nightSafety: 84, water: 76 },
];

const METRICS = [
  { key: "crime", label: "Low Crime Index", icon: Shield, color: "text-emerald-500", rawColor: "#10B981" },
  { key: "healthcare", label: "Healthcare Density", icon: Hospital, color: "text-blue-500", rawColor: "#3B82F6" },
  { key: "airQuality", label: "Air Quality (AQI)", icon: Wind, color: "text-cyan-500", rawColor: "#06B6D4" },
  { key: "greenCover", label: "Green Canopy", icon: Trees, color: "text-green-500", rawColor: "#10B981" },
  { key: "nightSafety", label: "Night Patrols", icon: Moon, color: "text-purple-500", rawColor: "#8B5CF6" },
  { key: "water", label: "Utility Stability", icon: Heart, color: "text-[#B8860B]", rawColor: "#B8860B" },
];

const CITIES = ["All", "Pune", "Hyderabad", "Mumbai", "Bangalore", "Chennai", "Kolkata"];

export default function SafetyIndexPage() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAreas = useMemo(() => {
    return AREAS.filter(a => {
      const matchCity = selectedCity === "All" || a.city === selectedCity;
      const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchSearch;
    });
  }, [selectedCity, searchQuery]);

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {/* ── HERO BANNER ── */}
      <section className="relative bg-gradient-to-br from-[#08111D] via-[#0D1B2A] to-[#1C3A5E] pt-36 pb-16 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-emerald-500/5 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#B8860B] font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Trends & Insights
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#B8860B]" />
            <span className="text-[11px] font-bold font-ui uppercase tracking-[0.2em] text-[#B8860B]">Urban Livability Index</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">Safety & Livability Index</h1>
          <p className="text-base text-white/40 max-w-xl">Comprehensive neighborhood scoring factoring in air quality statistics, local crime metrics, healthcare coverage, and utility uptime.</p>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-20">
        {/* Controls Container */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] shadow-[0_12px_40px_rgba(13,27,42,0.06)] p-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-1.5">
            {CITIES.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-ui tracking-wide uppercase transition-all ${
                  selectedCity === c
                    ? "bg-[#0D1B2A] text-[#B8860B] shadow-md"
                    : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70 hover:bg-[#F5E6C0]/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search safety score..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-[#F7F3E8] bg-[#FFFDF7] text-sm text-[#0D1B2A] placeholder-[#888] focus:border-[#B8860B]/40 focus:outline-none transition-all font-semibold"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
          </div>
        </div>

        {/* Directory Listings */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredAreas.map(area => {
            const grade = area.overall >= 90 ? "A+" : area.overall >= 85 ? "A" : "B+";
            const gradeBg = area.overall >= 90 ? "bg-emerald-500" : area.overall >= 85 ? "bg-[#B8860B]" : "bg-amber-500";
            return (
              <div key={area.name} className="bg-white rounded-3xl border border-[#F7F3E8] overflow-hidden hover:shadow-md transition-all duration-300">
                {/* Profile Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#F7F3E8] bg-gradient-to-r from-[#FFFDF7] to-white">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0D1B2A] leading-tight">{area.name}</h3>
                    <p className="text-xs text-[#888] flex items-center gap-1 mt-1"><MapPin size={12} className="text-[#B8860B]" /> {area.city}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold text-white shadow-md ${gradeBg}`}>
                      <span className="font-serif text-lg leading-none">{area.overall}</span>
                      <span className="text-[8px] uppercase tracking-wider opacity-90 mt-0.5">{grade}</span>
                    </div>
                  </div>
                </div>

                {/* Score Progress Bars */}
                <div className="p-6 space-y-4.5">
                  {METRICS.map(m => {
                    const score = (area as any)[m.key];
                    const barColor = score >= 90 ? "#10B981" : score >= 80 ? "#B8860B" : score >= 70 ? "#F59E0B" : "#EF4444";
                    return (
                      <div key={m.key} className="flex items-center gap-3">
                        <m.icon size={16} className={`${m.color} shrink-0`} />
                        <span className="text-xs text-[#555] w-28 shrink-0 font-bold font-ui uppercase tracking-wider">{m.label}</span>
                        <div className="flex-1 h-2 bg-[#F7F3E8] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${score}%`, backgroundColor: barColor }} />
                        </div>
                        <span className="text-xs font-bold w-8 text-right" style={{ color: barColor }}>{score}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
