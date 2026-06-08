"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Shield, GraduationCap, Trees, MapPin, Hospital, ShoppingBag, Search } from "lucide-react";

interface AreaProfile {
  name: string;
  city: string;
  score: number;
  schools: number;
  hospitals: number;
  parks: number;
  shopping: number;
  safety: string;
  rent: string;
  buy: string;
  highlights: string[];
  connectivity: number;
  noiseLevel: "Low" | "Moderate" | "Vibrant";
  pedestrianFriendly: boolean;
}

const AREAS: AreaProfile[] = [
  { 
    name: "Koregaon Park", city: "Pune", score: 9.4, schools: 12, hospitals: 8, parks: 15, shopping: 6, safety: "A+", 
    rent: "₹35K–60K/mo", buy: "₹15K–22K/sqft", highlights: ["International schools within 2km", "Premium multi-specialty healthcare", "Scenic river-side jogging tracks"],
    connectivity: 92, noiseLevel: "Low", pedestrianFriendly: true
  },
  { 
    name: "Jubilee Hills", city: "Hyderabad", score: 9.3, schools: 16, hospitals: 9, parks: 14, shopping: 8, safety: "A+", 
    rent: "₹30K–55K/mo", buy: "₹12K–18K/sqft", highlights: ["Top-rated international academies", "Highly patrolled secure neighbourhood", "KBR National Park proximity"],
    connectivity: 88, noiseLevel: "Low", pedestrianFriendly: true
  },
  { 
    name: "Indiranagar", city: "Bangalore", score: 9.2, schools: 11, hospitals: 5, parks: 9, shopping: 10, safety: "A", 
    rent: "₹30K–55K/mo", buy: "₹14K–20K/sqft", highlights: ["Immediate metro access", "Top high-street cafes & outlets", "Proximity to central business district"],
    connectivity: 96, noiseLevel: "Vibrant", pedestrianFriendly: true
  },
  { 
    name: "Powai Hiranandani", city: "Mumbai", score: 9.0, schools: 14, hospitals: 6, parks: 8, shopping: 5, safety: "A+", 
    rent: "₹40K–80K/mo", buy: "₹20K–30K/sqft", highlights: ["Premium Hiranandani school cluster", "Hiranandani Hospital proximity", "Walk-to-work IT corporate layout"],
    connectivity: 82, noiseLevel: "Moderate", pedestrianFriendly: true
  },
  { 
    name: "Baner Balewadi", city: "Pune", score: 8.8, schools: 10, hospitals: 7, parks: 11, shopping: 7, safety: "A", 
    rent: "₹20K–35K/mo", buy: "₹10K–14K/sqft", highlights: ["Tech professional family demographic", "Balewadi High Street shopping corridor", "Quick NH4 expressway link"],
    connectivity: 86, noiseLevel: "Moderate", pedestrianFriendly: true
  },
  { 
    name: "Anna Nagar", city: "Chennai", score: 8.7, schools: 13, hospitals: 8, parks: 10, shopping: 9, safety: "A", 
    rent: "₹18K–35K/mo", buy: "₹9K–13K/sqft", highlights: ["Double metro interchange transit links", "Tower Park recreational playground", "Prestigious legacy schools"],
    connectivity: 90, noiseLevel: "Low", pedestrianFriendly: true
  },
  { 
    name: "Salt Lake Sector 3", city: "Kolkata", score: 8.6, schools: 9, hospitals: 6, parks: 12, shopping: 8, safety: "A", 
    rent: "₹15K–28K/mo", buy: "₹6K–9K/sqft", highlights: ["Quiet wide tree-lined sectors", "Technopolis IT hub proximity", "Sub-divisional hospital access"],
    connectivity: 84, noiseLevel: "Low", pedestrianFriendly: true
  }
];

const CITIES = ["All", "Pune", "Hyderabad", "Bangalore", "Mumbai", "Chennai", "Kolkata"];

export default function FamilyAreasPage() {
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
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-pink-500/5 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#B8860B] font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Trends & Insights
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#B8860B]" />
            <span className="text-[11px] font-bold font-ui uppercase tracking-[0.2em] text-[#B8860B]">Livability Analytics Desk</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">Best Family Areas</h1>
          <p className="text-base text-white/40 max-w-xl">Family-focused micro-market indexing. We rank neighborhoods based on schools density, child safety indices, noise metrics, and green space ratios.</p>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-20">
        {/* Controls Panel */}
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
              placeholder="Search family area..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-[#F7F3E8] bg-[#FFFDF7] text-sm text-[#0D1B2A] placeholder-[#888] focus:border-[#B8860B]/40 focus:outline-none transition-all font-semibold"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAreas.map((area) => (
            <div key={area.name} className="bg-white rounded-3xl border border-[#F7F3E8] overflow-hidden hover:shadow-[0_12px_40px_rgba(13,27,42,0.1)] transition-all duration-500 group flex flex-col justify-between">
              {/* Header card banner */}
              <div>
                <div className="bg-gradient-to-br from-[#0D1B2A] via-[#0D1B2A] to-[#1C3A5E] p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#B8860B]/10 -mr-16 -mt-16" />
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white leading-tight">{area.name}</h3>
                      <p className="text-xs text-white/50 flex items-center gap-1 mt-1"><MapPin size={12} /> {area.city}</p>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                      <div className="text-center">
                        <p className="font-serif text-lg font-bold text-[#B8860B]">{area.score}</p>
                        <p className="text-[8px] font-bold text-white/40 uppercase tracking-wider">Index</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score breakdown metrics list */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: GraduationCap, label: "Schools", value: `${area.schools} clusters`, color: "text-blue-500" },
                      { icon: Hospital, label: "Hospitals", value: `${area.hospitals} major`, color: "text-red-400" },
                      { icon: Trees, label: "Parks & Green", value: `${area.parks} facilities`, color: "text-emerald-500" },
                      { icon: Shield, label: "Safety Rating", value: `Class ${area.safety}`, color: "text-[#B8860B]" },
                    ].map(s => (
                      <div key={s.label} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#FFFDF7] border border-[#F7F3E8]">
                        <s.icon size={16} className={s.color} />
                        <div>
                          <p className="text-[9px] font-bold text-[#888] uppercase tracking-wider">{s.label}</p>
                          <p className="font-bold text-[#0D1B2A] text-xs mt-0.5">{s.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Proximity Logs */}
                  <div className="mb-6">
                    <p className="text-[9px] font-bold font-ui uppercase tracking-widest text-[#888] mb-2.5">Neighborhood Highlights</p>
                    <div className="space-y-2">
                      {area.highlights.map(h => (
                        <p key={h} className="text-xs text-[#555] flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B8860B] mt-1.5 shrink-0" />
                          {h}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Additional parameters */}
                  <div className="py-3 px-4 rounded-xl bg-[#FFFDF7] border border-[#F7F3E8] space-y-2 text-xs font-semibold">
                    <div className="flex justify-between items-center text-[#555]">
                      <span>Transit Proximity score:</span>
                      <span className="text-[#0D1B2A]">{area.connectivity}/100</span>
                    </div>
                    <div className="flex justify-between items-center text-[#555]">
                      <span>Noise level signature:</span>
                      <span className="text-[#0D1B2A]">{area.noiseLevel}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing breakdown */}
              <div className="p-6 pt-0 border-t border-[#F7F3E8]/80 mt-4">
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <span className="text-[9px] font-bold text-[#888] uppercase tracking-wider block">Average Rent</span>
                    <p className="font-bold text-[#0D1B2A] text-sm mt-0.5">{area.rent}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-[#888] uppercase tracking-wider block">Average Buy Rate</span>
                    <p className="font-bold text-[#B8860B] text-sm mt-0.5">{area.buy}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
