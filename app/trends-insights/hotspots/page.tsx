"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Flame, MapPin, Star, ArrowUpRight, Search, Award } from "lucide-react";

const HOTSPOTS = [
  { area: "Hinjewadi Phase 3", city: "Pune", roi: 18.5, growth: "+22%", rating: 4.8, type: "Tech Hub", demand: "Very High", price: "₹6,200/sqft", catalyst: "Metro Line 3 & IT SEZ Expansion" },
  { area: "Dwarka Expressway", city: "Delhi NCR", roi: 21.3, growth: "+28%", rating: 4.9, type: "Infrastructure Corridor", demand: "Very High", price: "₹8,500/sqft", catalyst: "Expressway Completion & Aerocity Hub" },
  { area: "Panvel", city: "Mumbai", roi: 19.7, growth: "+25%", rating: 4.8, type: "Infrastructure Corridor", demand: "Very High", price: "₹7,500/sqft", catalyst: "Navi Mumbai Airport & Trans Harbour Link" },
  { area: "Gachibowli", city: "Hyderabad", roi: 16.8, growth: "+19%", rating: 4.7, type: "Tech Hub", demand: "High", price: "₹9,200/sqft", catalyst: "Financial District Expansion & Metro connectivity" },
  { area: "Whitefield", city: "Bangalore", roi: 15.2, growth: "+17%", rating: 4.6, type: "Tech Hub", demand: "High", price: "₹8,800/sqft", catalyst: "Metro Phase 2 Connect & Outer Ring Road flyovers" },
  { area: "Baner-Balewadi", city: "Pune", roi: 14.1, growth: "+15%", rating: 4.5, type: "Residential Hub", demand: "High", price: "₹12,000/sqft", catalyst: "Smart City Development & High Street retail" },
  { area: "Electronic City", city: "Bangalore", roi: 13.5, growth: "+14%", rating: 4.4, type: "Tech Hub", demand: "Medium", price: "₹6,500/sqft", catalyst: "Namma Metro Yellow Line commissioning" },
  { area: "OMR IT Corridor", city: "Chennai", roi: 12.8, growth: "+12%", rating: 4.3, type: "Tech Hub", demand: "Medium", price: "₹7,800/sqft", catalyst: "Elevated Expressway & IT SEZ Phase II" },
  { area: "New Town", city: "Kolkata", roi: 11.2, growth: "+10%", rating: 4.2, type: "Residential Hub", demand: "Medium", price: "₹5,800/sqft", catalyst: "Silicon Valley Hub & Metro connectivity" },
  { area: "Sanand", city: "Ahmedabad", roi: 15.6, growth: "+18%", rating: 4.5, type: "Industrial Corridor", demand: "High", price: "₹4,200/sqft", catalyst: "Industrial manufacturing plants & GIDC hubs" }
];

const CITIES = ["All", "Pune", "Mumbai", "Bangalore", "Delhi NCR", "Hyderabad", "Chennai", "Kolkata", "Ahmedabad"];
const TYPES = ["All", "Tech Hub", "Infrastructure Corridor", "Residential Hub", "Industrial Corridor"];

export default function HotspotsPage() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHotspots = useMemo(() => {
    return HOTSPOTS.filter(h => {
      const matchCity = selectedCity === "All" || h.city === selectedCity;
      const matchType = selectedType === "All" || h.type === selectedType;
      const matchSearch = h.area.toLowerCase().includes(searchQuery.toLowerCase()) || h.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchType && matchSearch;
    });
  }, [selectedCity, selectedType, searchQuery]);

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {/* ── HERO BANNER ── */}
      <section className="relative bg-gradient-to-br from-[#08111D] via-[#0D1B2A] to-[#1C3A5E] pt-36 pb-16 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-orange-500/5 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#B8860B] font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Trends & Insights
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#B8860B]" />
            <span className="text-[11px] font-bold font-ui uppercase tracking-[0.2em] text-[#B8860B]">Asset Grading Desk</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">Investment Hotspots</h1>
          <p className="text-base text-white/40 max-w-xl">AI-ranked micro-markets with the highest capital appreciation yield, structural demand drivers, and infrastructure growth catalysts.</p>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-20">
        {/* Filters Controls Box */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] shadow-[0_12px_40px_rgba(13,27,42,0.06)] p-6 mb-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="font-serif text-lg font-bold text-[#0D1B2A] flex items-center gap-2">
              <Flame size={18} className="text-orange-500 fill-orange-500" />
              Filter Micro-markets
            </h2>
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search area or city..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-[#F7F3E8] bg-[#FFFDF7] text-sm text-[#0D1B2A] placeholder-[#888] focus:border-[#B8860B]/40 focus:outline-none transition-all font-semibold"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
            </div>
          </div>

          {/* City Selection */}
          <div>
            <span className="text-[9px] font-bold font-ui uppercase tracking-wider text-[#888] block mb-2">Select Region</span>
            <div className="flex flex-wrap gap-1.5">
              {CITIES.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCity(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-ui tracking-wide uppercase transition-all ${
                    selectedCity === c
                      ? "bg-[#0D1B2A] text-[#B8860B]"
                      : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70 hover:bg-[#F5E6C0]/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Type Selection */}
          <div>
            <span className="text-[9px] font-bold font-ui uppercase tracking-wider text-[#888] block mb-2">Select Catalyst Model</span>
            <div className="flex flex-wrap gap-1.5">
              {TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-ui tracking-wide uppercase transition-all ${
                    selectedType === t
                      ? "bg-[#B8860B] text-white"
                      : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70 hover:bg-[#F5E6C0]/40"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Visual Display */}
        {selectedCity === "All" && selectedType === "All" && searchQuery === "" && (
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {HOTSPOTS.slice(0, 3).map((h, i) => (
              <div key={h.area} className="relative bg-white rounded-3xl border border-[#F7F3E8] p-8 hover:shadow-lg transition-all duration-500 overflow-hidden group">
                <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-[#F5E6C0]/30 to-transparent rounded-bl-full -mr-14 -mt-14 group-hover:scale-[2] transition-transform duration-500" />
                <div className="absolute top-6 right-6">
                  <span className="w-8 h-8 rounded-full bg-[#0D1B2A] text-[#B8860B] text-xs font-bold flex items-center justify-center shadow-lg border border-[#B8860B]/20">#{i + 1}</span>
                </div>
                <span className="text-[9px] font-bold font-ui uppercase tracking-widest text-[#B8860B]">{h.type}</span>
                <h3 className="font-serif text-xl font-bold text-[#0D1B2A] mt-2 mb-1">{h.area}</h3>
                <p className="text-xs text-[#888] flex items-center gap-1 mb-6"><MapPin size={12} /> {h.city}</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "ROI Potential", value: `${h.roi}%`, color: "text-emerald-600" },
                    { label: "Growth YoY", value: h.growth, color: "text-[#B8860B]" },
                    { label: "Avg Sqft Rate", value: h.price, color: "text-[#0D1B2A]" },
                    { label: "Market Demand", value: h.demand, color: "text-[#0D1B2A]" },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-[9px] font-bold font-ui uppercase tracking-widest text-[#888] mb-0.5">{s.label}</p>
                      <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-[#F7F3E8]">
                  <p className="text-[10px] text-[#888] font-bold font-ui uppercase tracking-wider mb-1">Growth Catalyst</p>
                  <p className="text-xs text-[#0D1B2A] font-semibold">{h.catalyst}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Complete Directory List */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-serif text-xl font-bold text-[#0D1B2A]">Hotspot Rankings Directory</h2>
            <span className="text-xs text-[#888] font-semibold">{filteredHotspots.length} markets found</span>
          </div>

          {filteredHotspots.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#F7F3E8] pb-4">
                    {["Rank", "Micro-market", "City", "Growth Segment", "Sqft Rate", "Appreciation Potential", "Demand Index", "Growth Catalyst"].map(h => (
                      <th key={h} className="py-4 px-4 text-[10px] font-bold font-ui uppercase tracking-wider text-[#888]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredHotspots.map((h, i) => (
                    <tr key={h.area} className="border-b border-[#F7F3E8]/60 hover:bg-[#F5E6C0]/10 transition-colors">
                      <td className="py-4 px-4">
                        <span className="w-7 h-7 rounded-full bg-[#0D1B2A] text-[#B8860B] text-xs font-bold inline-flex items-center justify-center">
                          {HOTSPOTS.findIndex(item => item.area === h.area) + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-bold text-[#0D1B2A] text-sm">{h.area}</td>
                      <td className="py-4 px-4 text-[#555] text-sm">{h.city}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded bg-[#F7F3E8] text-[9px] font-bold text-[#0D1B2A] uppercase tracking-wider">{h.type}</span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#0D1B2A] text-sm">{h.price}</td>
                      <td className="py-4 px-4 font-bold text-emerald-600 text-sm">{h.roi}% <span className="text-[#888] text-[10px] font-normal">ROI</span></td>
                      <td className="py-4 px-4">
                        <span className={`px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider ${
                          h.demand === "Very High" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                          h.demand === "High" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                          "bg-[#F7F3E8] text-[#0D1B2A]"
                        }`}>{h.demand}</span>
                      </td>
                      <td className="py-4 px-4 text-xs text-[#555] font-medium max-w-xs truncate" title={h.catalyst}>{h.catalyst}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-12 text-center">
              <Award size={48} className="mx-auto text-[#888]/40 mb-4" />
              <p className="text-sm font-bold text-[#0D1B2A]">No micro-markets found matching selected criteria.</p>
              <button onClick={() => { setSelectedCity("All"); setSelectedType("All"); setSearchQuery(""); }} className="mt-4 text-xs font-bold text-[#B8860B] uppercase tracking-wider">Reset Filters</button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
