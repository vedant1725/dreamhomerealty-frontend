"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Train, Car, Plane, Bus, MapPin, Search } from "lucide-react";

interface ConnectivityProfile {
  name: string;
  city: string;
  metro: string;
  highway: string;
  airport: string;
  railway: string;
  busStops: number;
  score: number;
  commuteTimeCbd: string; // Peak-hour commute to city center
}

const AREAS: ConnectivityProfile[] = [
  { name: "Dwarka Sector 21", city: "Delhi NCR", metro: "0.5 km", highway: "4 km", airport: "12 km", railway: "3 km", busStops: 20, score: 96, commuteTimeCbd: "25 mins" },
  { name: "Powai Hiranandani", city: "Mumbai", metro: "4 km", highway: "2 km", airport: "8 km", railway: "6 km", busStops: 15, score: 94, commuteTimeCbd: "35 mins" },
  { name: "Hinjewadi Phase 1", city: "Pune", metro: "2 km", highway: "5 km", airport: "28 km", railway: "12 km", busStops: 8, score: 92, commuteTimeCbd: "45 mins" },
  { name: "Gachibowli", city: "Hyderabad", metro: "3 km", highway: "4 km", airport: "22 km", railway: "15 km", busStops: 10, score: 90, commuteTimeCbd: "20 mins" },
  { name: "Baner", city: "Pune", metro: "1.5 km", highway: "6 km", airport: "22 km", railway: "10 km", busStops: 9, score: 89, commuteTimeCbd: "30 mins" },
  { name: "Whitefield corridor", city: "Bangalore", metro: "1 km", highway: "3 km", airport: "35 km", railway: "8 km", busStops: 12, score: 88, commuteTimeCbd: "55 mins" },
  { name: "OMR IT Corridor", city: "Chennai", metro: "5 km", highway: "3 km", airport: "18 km", railway: "8 km", busStops: 14, score: 86, commuteTimeCbd: "40 mins" },
  { name: "Electronic City Phase 1", city: "Bangalore", metro: "6 km", highway: "2 km", airport: "42 km", railway: "18 km", busStops: 11, score: 82, commuteTimeCbd: "50 mins" },
];

const CITIES = ["All", "Delhi NCR", "Mumbai", "Pune", "Hyderabad", "Bangalore", "Chennai"];

export default function ConnectivityPage() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAreas = useMemo(() => {
    return AREAS.filter(a => {
      const matchCity = selectedCity === "All" || a.city === selectedCity;
      const matchSearch = a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchSearch;
    }).sort((a, b) => b.score - a.score);
  }, [selectedCity, searchQuery]);

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {/* ── HERO BANNER ── */}
      <section className="relative bg-gradient-to-br from-[#08111D] via-[#0D1B2A] to-[#1C3A5E] pt-36 pb-16 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#B8860B] font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Trends & Insights
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#B8860B]" />
            <span className="text-[11px] font-bold font-ui uppercase tracking-[0.2em] text-[#B8860B]">Infrastructure Mapping Desk</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">Connectivity Score</h1>
          <p className="text-base text-white/40 max-w-xl">Mapping regional micro-markets by transit proximity. We evaluate average distance to metro lines, highway junctions, airports, and peak hour travel bounds.</p>
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
              placeholder="Search connectivity..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-[#F7F3E8] bg-[#FFFDF7] text-sm text-[#0D1B2A] placeholder-[#888] focus:border-[#B8860B]/40 focus:outline-none transition-all font-semibold"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
          </div>
        </div>

        {/* Top 4 Spotlight Cards */}
        {selectedCity === "All" && searchQuery === "" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {AREAS.slice(0, 4).map((area, i) => (
              <div key={area.name} className="bg-white rounded-3xl border border-[#F7F3E8] p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-5 right-5">
                  <span className="w-8 h-8 rounded-full bg-[#0D1B2A] text-[#B8860B] text-xs font-bold inline-flex items-center justify-center border border-[#B8860B]/20">#{i + 1}</span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold text-white shadow-md ${
                      area.score >= 92 ? "bg-emerald-500" : "bg-[#B8860B]"
                    }`}>
                      <span className="font-serif text-lg leading-none">{area.score}</span>
                      <span className="text-[8px] uppercase tracking-wider opacity-90 mt-0.5">PTS</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0D1B2A] text-sm leading-tight max-w-[100px]">{area.name}</h3>
                      <p className="text-xs text-[#888] mt-0.5">{area.city}</p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { icon: Train, label: "Metro Rail", value: area.metro },
                      { icon: Car, label: "Expressway", value: area.highway },
                      { icon: Plane, label: "Airport Proximity", value: area.airport },
                      { icon: Bus, label: "Bus Stops", value: `${area.busStops} hubs` },
                    ].map(t => (
                      <div key={t.label} className="flex items-center justify-between text-xs py-1.5 border-b border-[#F7F3E8] last:border-0">
                        <span className="text-[#888] flex items-center gap-2 font-medium">
                          <t.icon size={14} className="text-[#B8860B]" />
                          {t.label}
                        </span>
                        <span className="font-bold text-[#0D1B2A]">{t.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[#F7F3E8] flex justify-between items-center text-xs font-bold">
                  <span className="text-[#888] font-ui uppercase tracking-wider">CBD Commute Time:</span>
                  <span className="text-[#B8860B]">{area.commuteTimeCbd}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Complete Rankings Directory Table */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] mb-6">Connectivity Rankings Directory</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F7F3E8] pb-4">
                  {["Rank", "Area Name", "City", "Metro Dist", "Highway Dist", "Airport Dist", "Railway Dist", "Bus Stops", "CBD Commute", "Score"].map(h => (
                    <th key={h} className="py-4 px-3 text-[10px] font-bold font-ui uppercase tracking-wider text-[#888]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredAreas.map((area, i) => (
                  <tr key={area.name} className="border-b border-[#F7F3E8]/60 hover:bg-[#F5E6C0]/10 transition-colors">
                    <td className="py-4 px-3">
                      <span className="w-7 h-7 rounded-full bg-[#0D1B2A] text-[#B8860B] text-xs font-bold inline-flex items-center justify-center">
                        {AREAS.findIndex(item => item.name === area.name) + 1}
                      </span>
                    </td>
                    <td className="py-4 px-3 font-bold text-[#0D1B2A] text-sm">{area.name}</td>
                    <td className="py-4 px-3 text-[#555] text-sm">{area.city}</td>
                    <td className="py-4 px-3 text-[#555] text-sm">{area.metro}</td>
                    <td className="py-4 px-3 text-[#555] text-sm">{area.highway}</td>
                    <td className="py-4 px-3 text-[#555] text-sm">{area.airport}</td>
                    <td className="py-4 px-3 text-[#555] text-sm">{area.railway}</td>
                    <td className="py-4 px-3 font-bold text-[#0D1B2A] text-sm">{area.busStops}</td>
                    <td className="py-4 px-3 font-semibold text-[#0D1B2A] text-sm">{area.commuteTimeCbd}</td>
                    <td className="py-4 px-3">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-bold text-white shadow-sm ${
                        area.score >= 92 ? "bg-emerald-500" : "bg-[#B8860B]"
                      }`}>{area.score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
