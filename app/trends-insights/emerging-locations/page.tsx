"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Rocket, MapPin, ArrowUpRight, TrendingUp, Clock, AlertTriangle, Search } from "lucide-react";

interface LocationProfile {
  name: string;
  city: string;
  currentPriceVal: number; // raw value in numeric /sqft
  yearlyGrowthRate: number; // % annual growth
  catalyst: string;
  risk: "Low" | "Medium" | "High";
  status: "Mega Growth" | "High Growth" | "Steady Growth";
  drivers: string[];
}

const LOCATIONS: LocationProfile[] = [
  { name: "Hinjewadi Phase 3", city: "Pune", currentPriceVal: 6200, yearlyGrowthRate: 15.5, catalyst: "IT Expansion & Metro Connectivity", risk: "Low", status: "High Growth", drivers: ["Rajiv Gandhi IT Park Phase 4", "Pune Metro Line 3", "Ring Road Junction"] },
  { name: "Panvel micro-hub", city: "Mumbai", currentPriceVal: 7500, yearlyGrowthRate: 16.0, catalyst: "Navi Mumbai Airport & Trans Harbour Link", risk: "Low", status: "Mega Growth", drivers: ["NMIA Airport 2026", "Atal Setu Bridge Link", "CIDCO Mass Housing Layout"] },
  { name: "Devanahalli corridor", city: "Bangalore", currentPriceVal: 5800, yearlyGrowthRate: 13.8, catalyst: "Airport Proximity & IT Parks", risk: "Medium", status: "High Growth", drivers: ["KIA Terminal 2", "Aerospace SEZ", "KIADB IT Park Layout"] },
  { name: "Kompally", city: "Hyderabad", currentPriceVal: 4500, yearlyGrowthRate: 16.2, catalyst: "Pharma City & ORR Extension", risk: "Low", status: "Mega Growth", drivers: ["Hyderabad Pharma City Link", "ORR Phase 2 Expansion", "IT Corridor extensions"] },
  { name: "Talegaon Industrial", city: "Pune", currentPriceVal: 3800, yearlyGrowthRate: 12.0, catalyst: "Industrial Corridor & NH-4", risk: "Medium", status: "Steady Growth", drivers: ["MIDC Expansion Plan", "NH-4 road widening", "EV Manufacturing Park"] },
  { name: "Greater Noida West", city: "Delhi NCR", currentPriceVal: 4200, yearlyGrowthRate: 16.5, catalyst: "Jewar Airport & Metro Extension", risk: "Medium", status: "Mega Growth", drivers: ["Jewar Airport Phase 1", "Aqua Metro Extension", "YEDA film city plans"] },
];

const CITIES = ["All", "Pune", "Mumbai", "Bangalore", "Hyderabad", "Delhi NCR"];

export default function EmergingLocationsPage() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [forecastYears, setForecastYears] = useState(3); // default 3 year forecast slider

  const filteredLocations = useMemo(() => {
    return LOCATIONS.filter(l => {
      const matchCity = selectedCity === "All" || l.city === selectedCity;
      const matchSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) || l.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchSearch;
    });
  }, [selectedCity, searchQuery]);

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {/* ── HERO BANNER ── */}
      <section className="relative bg-gradient-to-br from-[#08111D] via-[#0D1B2A] to-[#1C3A5E] pt-36 pb-16 overflow-hidden">
        <div className="absolute top-20 left-20 w-80 h-80 rounded-full bg-purple-500/5 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#B8860B] font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Trends & Insights
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#B8860B]" />
            <span className="text-[11px] font-bold font-ui uppercase tracking-[0.2em] text-[#B8860B]">Market Alpha Desk</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">Emerging Locations</h1>
          <p className="text-base text-white/40 max-w-xl">Speculative micro-market forecasting. Adjust the timeline slider to see dynamic AI-predicted pricing shifts based on infrastructure growth curves.</p>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-20 space-y-6">
        {/* Controls Console */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] shadow-[0_12px_40px_rgba(13,27,42,0.06)] p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
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
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search location..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-[#F7F3E8] bg-[#FFFDF7] text-sm text-[#0D1B2A] placeholder-[#888] focus:border-[#B8860B]/40 focus:outline-none transition-all font-semibold"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
            </div>
          </div>

          {/* Forecast Time Slider */}
          <div className="pt-4 border-t border-[#F7F3E8] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold font-ui uppercase tracking-wider text-[#888] block">AI Projection Horizon</span>
              <p className="text-xs text-[#0D1B2A] font-semibold mt-0.5">Projecting capital returns over the next years</p>
            </div>
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <input 
                type="range" 
                min={1} 
                max={10} 
                step={1}
                value={forecastYears} 
                onChange={e => setForecastYears(+e.target.value)} 
                className="w-full accent-[#B8860B] h-2 bg-[#F7F3E8] rounded-lg cursor-pointer"
              />
              <span className="px-4 py-2 bg-[#0D1B2A] text-[#B8860B] text-sm font-bold font-ui rounded-xl shrink-0">
                {forecastYears} Year{forecastYears > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Locations Directory List */}
        <div className="space-y-6">
          {filteredLocations.map((loc) => {
            // Calculate compound growth for forecast years
            const totalGrowthPercent = Math.round((Math.pow(1 + loc.yearlyGrowthRate / 100, forecastYears) - 1) * 100);
            const predictedPrice = Math.round(loc.currentPriceVal * Math.pow(1 + loc.yearlyGrowthRate / 100, forecastYears));
            
            const riskBadge = 
              loc.risk === "Low" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
              loc.risk === "Medium" ? "bg-amber-50 text-amber-600 border-amber-100" :
              "bg-red-50 text-red-500 border-red-100";

            return (
              <div key={loc.name} className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Left segment - Catalyst detail */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold font-ui uppercase tracking-wider ${
                        loc.status === "Mega Growth" ? "bg-emerald-600 text-white" :
                        loc.status === "High Growth" ? "bg-[#B8860B] text-white" : "bg-[#0D1B2A] text-white"
                      }`}>{loc.status}</span>
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold font-ui uppercase tracking-wider border ${riskBadge}`}>
                        {loc.risk} Risk Profile
                      </span>
                    </div>

                    <h3 className="font-serif text-xl md:text-2xl font-bold text-[#0D1B2A] mb-1">{loc.name}</h3>
                    <p className="text-xs text-[#888] flex items-center gap-1 mb-4"><MapPin size={12} className="text-[#B8860B]" /> {loc.city}</p>

                    <p className="text-[9px] font-bold font-ui uppercase tracking-widest text-[#888] mb-1.5">Primary Growth Catalyst</p>
                    <p className="text-xs text-[#0D1B2A] font-semibold mb-4 leading-relaxed">{loc.catalyst}</p>

                    <p className="text-[9px] font-bold font-ui uppercase tracking-widest text-[#888] mb-1.5">Micro-Market Drivers</p>
                    <div className="flex flex-wrap gap-1.5">
                      {loc.drivers.map(d => (
                        <span key={d} className="px-3 py-1.5 rounded-lg bg-[#F5E6C0]/15 border border-[#B8860B]/15 text-[11px] font-bold text-[#0D1B2A]">{d}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right segment - Pricing projections */}
                  <div className="grid grid-cols-2 gap-4 lg:w-80 shrink-0">
                    <div className="bg-[#FFFDF7] border border-[#F7F3E8] rounded-2xl p-4 text-center">
                      <span className="text-[9px] font-bold text-[#888] uppercase tracking-wider block mb-1">Current Base</span>
                      <p className="font-serif font-bold text-[#0D1B2A] text-sm">₹{loc.currentPriceVal.toLocaleString()}/sqft</p>
                    </div>
                    <div className="bg-[#FFFDF7] border border-[#F7F3E8] rounded-2xl p-4 text-center">
                      <span className="text-[9px] font-bold text-[#888] uppercase tracking-wider block mb-1">{forecastYears}Y AI Target</span>
                      <p className="font-serif font-bold text-emerald-600 text-sm">₹{predictedPrice.toLocaleString()}/sqft</p>
                    </div>
                    <div className="bg-[#FFFDF7] border border-[#F7F3E8] rounded-2xl p-4 text-center">
                      <span className="text-[9px] font-bold text-[#888] uppercase tracking-wider block mb-1">Total Appreciation</span>
                      <p className="font-bold text-[#B8860B] flex items-center justify-center gap-0.5 text-sm">
                        <ArrowUpRight size={14} />
                        +{totalGrowthPercent}%
                      </p>
                    </div>
                    <div className="bg-[#FFFDF7] border border-[#F7F3E8] rounded-2xl p-4 text-center">
                      <span className="text-[9px] font-bold text-[#888] uppercase tracking-wider block mb-1">Compound Rate</span>
                      <p className="font-bold text-[#0D1B2A] flex items-center justify-center gap-0.5 text-sm">
                        <Clock size={12} className="text-[#B8860B]" />
                        +{loc.yearlyGrowthRate}%/yr
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress bar visualizing projected growth percentage */}
                <div className="mt-6 pt-5 border-t border-[#F7F3E8]">
                  <div className="flex justify-between items-center text-xs font-bold font-ui mb-2">
                    <span className="text-[#888] uppercase tracking-wider">Projected Capital Appreciation Yield</span>
                    <span className="text-emerald-600">+{totalGrowthPercent}% Cumulative Yield</span>
                  </div>
                  <div className="h-2 bg-[#F7F3E8] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4A017] transition-all duration-700" 
                      style={{ width: `${Math.min(totalGrowthPercent, 100)}%` }} 
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
