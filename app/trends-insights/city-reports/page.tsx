"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, BarChart3, TrendingUp, Landmark, MapPin, ArrowUpRight, Compass, ShieldCheck } from "lucide-react";

interface InfrastructureProject {
  name: string;
  cost: string;
  stage: "Planning" | "Under Construction" | "Testing" | "Operational";
  progress: number;
  impact: string;
}

interface CityDossier {
  name: string;
  population: string;
  newLaunches: number;
  absorption: number;
  inventory: number; // in months
  priceGrowth: number;
  rentalYield: string;
  avgPrice: string;
  topAreas: string[];
  infrastructure: InfrastructureProject[];
  developerLaunches: "High" | "Moderate" | "Controlled";
  marketPhase: "Expansion" | "Peak" | "Correction" | "Recovery";
}

const CITIES_DATA: CityDossier[] = [
  {
    name: "Mumbai",
    population: "2.1 Cr",
    newLaunches: 1420,
    absorption: 78,
    inventory: 12,
    priceGrowth: 8.2,
    rentalYield: "3.2%",
    avgPrice: "₹28,500/sqft",
    topAreas: ["Worli", "Andheri West", "Panvel", "Thane Micro-market"],
    developerLaunches: "High",
    marketPhase: "Peak",
    infrastructure: [
      { name: "Metro Line 3 (Aqua Line)", cost: "₹32,000 Cr", stage: "Testing", progress: 95, impact: "Direct connectivity to SEEPZ & Colaba" },
      { name: "Coastal Road Project", cost: "₹12,700 Cr", stage: "Operational", progress: 100, impact: "Reduces South-to-West travel times by 70%" },
      { name: "Navi Mumbai International Airport", cost: "₹17,800 Cr", stage: "Under Construction", progress: 78, impact: "Massive price escalation catalyst in Panvel & Ulwe" }
    ]
  },
  {
    name: "Pune",
    population: "78 L",
    newLaunches: 980,
    absorption: 85,
    inventory: 8,
    priceGrowth: 12.5,
    rentalYield: "4.1%",
    avgPrice: "₹12,800/sqft",
    topAreas: ["Hinjewadi Phase 3", "Baner High Street", "Wakad", "Kharadi IT corridor"],
    developerLaunches: "High",
    marketPhase: "Expansion",
    infrastructure: [
      { name: "Pune Metro Line 3", cost: "₹11,400 Cr", stage: "Under Construction", progress: 70, impact: "Links Hinjewadi IT Hub to Civil Court junction" },
      { name: "Pune Ring Road", cost: "₹6,800 Cr", stage: "Planning", progress: 25, impact: "Will divert heavy traffic & unlock peripheral lands" },
      { name: "Kharadi-Hadapsar Link flyover", cost: "₹1,200 Cr", stage: "Operational", progress: 100, impact: "Eases daily IT corridor commute bottlenecks" }
    ]
  },
  {
    name: "Bangalore",
    population: "1.3 Cr",
    newLaunches: 1180,
    absorption: 72,
    inventory: 14,
    priceGrowth: 6.8,
    rentalYield: "3.8%",
    avgPrice: "₹14,200/sqft",
    topAreas: ["Whitefield", "Sarjapur Road", "Devanahalli corridor", "Electronic City"],
    developerLaunches: "Moderate",
    marketPhase: "Expansion",
    infrastructure: [
      { name: "Namma Metro Phase 2 Extension", cost: "₹30,600 Cr", stage: "Under Construction", progress: 88, impact: "Expanding East-West lines directly to Whitefield & ORR" },
      { name: "Peripheral Ring Road (PRR)", cost: "₹15,200 Cr", stage: "Planning", progress: 15, impact: "Will connect north & east suburbs seamlessly" },
      { name: "Kempegowda Airport Terminal 2", cost: "₹5,800 Cr", stage: "Operational", progress: 100, impact: "Strengthened Bangalore as a major logistics hub" }
    ]
  },
  {
    name: "Delhi NCR",
    population: "3.2 Cr",
    newLaunches: 1850,
    absorption: 65,
    inventory: 18,
    priceGrowth: 4.1,
    rentalYield: "2.9%",
    avgPrice: "₹18,900/sqft",
    topAreas: ["Dwarka Expressway", "Noida Sector 150", "Gurugram Phase 5", "Greater Noida West"],
    developerLaunches: "Controlled",
    marketPhase: "Recovery",
    infrastructure: [
      { name: "Dwarka Expressway completion", cost: "₹9,000 Cr", stage: "Operational", progress: 100, impact: "Massive residential corridor unlocking between Delhi-Gurugram" },
      { name: "Delhi-Meerut RRTS (Namo Bharat)", cost: "₹30,274 Cr", stage: "Operational", progress: 100, impact: "High-speed transit system linking NCR cities" },
      { name: "Noida International Airport (Jewar)", cost: "₹29,560 Cr", stage: "Under Construction", progress: 82, impact: "Triggers logistics and housing surge in Yamuna Expressway" }
    ]
  },
  {
    name: "Hyderabad",
    population: "1.1 Cr",
    newLaunches: 890,
    absorption: 82,
    inventory: 9,
    priceGrowth: 15.3,
    rentalYield: "4.5%",
    avgPrice: "₹11,500/sqft",
    topAreas: ["Gachibowli Financial", "Kondapur", "Kokapet Neopolis", "Kompally"],
    developerLaunches: "High",
    marketPhase: "Expansion",
    infrastructure: [
      { name: "Kokapet Neopolis Infrastructure layout", cost: "₹4,500 Cr", stage: "Operational", progress: 100, impact: "Created premium high-rise CBD layouts" },
      { name: "Hyderabad Pharma City Phase 1", cost: "₹64,000 Cr", stage: "Planning", progress: 30, impact: "Unlocks housing demand in southern micro-markets" },
      { name: "Regional Ring Road (RRR)", cost: "₹14,300 Cr", stage: "Under Construction", progress: 40, impact: "Bypasses transit goods traffic outer ring" }
    ]
  },
  {
    name: "Chennai",
    population: "1.1 Cr",
    newLaunches: 720,
    absorption: 70,
    inventory: 15,
    priceGrowth: 3.7,
    rentalYield: "3.5%",
    avgPrice: "₹10,200/sqft",
    topAreas: ["OMR IT Corridor", "Tambaram hub", "Porur", "Sholinganallur"],
    developerLaunches: "Controlled",
    marketPhase: "Recovery",
    infrastructure: [
      { name: "Chennai Metro Phase 2 corridors", cost: "₹61,843 Cr", stage: "Under Construction", progress: 65, impact: "Direct connectivity expansions across prime IT corridors" },
      { name: "Port-Maduravoyal Elevated Expressway", cost: "₹5,855 Cr", stage: "Planning", progress: 10, impact: "Double-decker corridor to ease heavy seaport traffic" },
      { name: "Velachery-St. Thomas Mount MRTS Link", cost: "₹3,770 Cr", stage: "Testing", progress: 98, impact: "Unlocks micro-commuters transit routes" }
    ]
  }
];

export default function CityReportsPage() {
  const [selected, setSelected] = useState("Pune");
  const city = useMemo(() => CITIES_DATA.find(c => c.name === selected) || CITIES_DATA[0], [selected]);

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {/* ── HERO BANNER ── */}
      <section className="relative bg-gradient-to-br from-[#08111D] via-[#0D1B2A] to-[#1C3A5E] pt-36 pb-16 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#B8860B]/8 blur-[100px]" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-[#1C3A5E]/30 blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#B8860B] font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Trends & Insights
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#B8860B]" />
            <span className="text-[11px] font-bold font-ui uppercase tracking-[0.2em] text-[#B8860B]">Urban Development Intelligence</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">City Growth Reports</h1>
          <p className="text-base text-white/40 max-w-xl">Deep macro analysis of regional pricing, inventory cycles, developer launch pipelines, and transport corridors.</p>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-20">
        {/* City Selector */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] shadow-[0_12px_40px_rgba(13,27,42,0.06)] p-3 flex flex-wrap gap-2 mb-10">
          {CITIES_DATA.map(c => (
            <button key={c.name} onClick={() => setSelected(c.name)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold font-ui tracking-wider uppercase transition-all duration-300 ${
                selected === c.name 
                  ? "bg-[#0D1B2A] text-[#B8860B] shadow-lg shadow-[#0d1b2a]/20" 
                  : "text-[#0D1B2A]/70 hover:bg-[#F5E6C0]/40"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Selected City Profile Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {[
            { label: "Population Base", value: city.population },
            { label: "New Launches (Q)", value: city.newLaunches.toLocaleString() },
            { label: "Avg Price Rate", value: city.avgPrice },
            { label: "Rental Yield Index", value: city.rentalYield },
            { label: "Annual Appreciation", value: `+${city.priceGrowth}%`, accent: true },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#F7F3E8] p-5 shadow-sm">
              <p className="text-[9px] font-bold font-ui uppercase tracking-wider text-[#888] mb-1.5">{s.label}</p>
              <p className={`font-serif text-xl md:text-2xl font-bold ${s.accent ? "text-emerald-600" : "text-[#0D1B2A]"}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Market Health Dossier */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A] mb-6 flex items-center gap-2">
                <BarChart3 size={20} className="text-[#B8860B]" />
                Market Health Index
              </h2>
              
              <div className="space-y-6">
                {/* Absorption Rate */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-[#0D1B2A] font-ui uppercase tracking-wider">Absorption Rate</span>
                    <span className="text-xs font-bold text-emerald-600">{city.absorption}%</span>
                  </div>
                  <div className="h-2 bg-[#F7F3E8] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${city.absorption}%` }} />
                  </div>
                  <p className="text-[10px] text-[#888] mt-1">Percentage of supply absorbed in the current cycle.</p>
                </div>

                {/* Inventory Overhang */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs font-bold text-[#0D1B2A] font-ui uppercase tracking-wider">Inventory Overhang</span>
                    <span className="text-xs font-bold text-[#B8860B]">{city.inventory} Months</span>
                  </div>
                  <div className="h-2 bg-[#F7F3E8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#B8860B] rounded-full transition-all duration-700" style={{ width: `${(city.inventory / 24) * 100}%` }} />
                  </div>
                  <p className="text-[10px] text-[#888] mt-1">Months required to clear active builder inventory.</p>
                </div>

                {/* Developer launches */}
                <div className="py-3 px-4 rounded-xl bg-[#FFFDF7] border border-[#F7F3E8] flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0D1B2A] font-ui uppercase tracking-wider">Developer Launches</span>
                  <span className="font-bold text-[#B8860B]">{city.developerLaunches}</span>
                </div>

                {/* Market Phase */}
                <div className="py-3 px-4 rounded-xl bg-[#FFFDF7] border border-[#F7F3E8] flex justify-between items-center text-xs">
                  <span className="font-bold text-[#0D1B2A] font-ui uppercase tracking-wider">Market Cycle Phase</span>
                  <span className="font-bold text-emerald-600 flex items-center gap-1">
                    <ShieldCheck size={14} />
                    {city.marketPhase}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F7F3E8]">
              <span className="text-[9px] font-bold font-ui uppercase tracking-widest text-[#888] block mb-3">Top-yield micro-markets</span>
              <div className="flex flex-wrap gap-1.5">
                {city.topAreas.map(area => (
                  <span key={area} className="px-3 py-1.5 rounded-lg bg-[#F5E6C0]/20 border border-[#B8860B]/15 text-xs font-bold text-[#0D1B2A]">{area}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Infrastructure Pipeline */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
            <h2 className="font-serif text-xl font-bold text-[#0D1B2A] mb-6 flex items-center gap-2">
              <Landmark size={20} className="text-[#B8860B]" />
              Infrastructure Pipeline
            </h2>

            <div className="space-y-6">
              {city.infrastructure.map((proj, idx) => {
                const badgeColor = 
                  proj.stage === "Operational" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  proj.stage === "Testing" ? "bg-blue-50 text-blue-600 border-blue-100" :
                  proj.stage === "Under Construction" ? "bg-amber-50 text-amber-600 border-amber-100" :
                  "bg-slate-50 text-slate-600 border-slate-100";
                
                return (
                  <div key={idx} className="p-5 rounded-2xl bg-gradient-to-br from-[#FFFDF7] to-white border border-[#F7F3E8] hover:border-[#B8860B]/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-serif text-sm font-bold text-[#0D1B2A]">{proj.name}</h3>
                        <p className="text-[10px] font-bold text-[#B8860B] mt-0.5">{proj.cost}</p>
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider border ${badgeColor}`}>
                        {proj.stage}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-[9px] text-[#888] font-bold mb-1">
                        <span>Project Progress</span>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-[#F7F3E8] rounded-full overflow-hidden">
                        <div className="h-full bg-[#0D1B2A] rounded-full" style={{ width: `${proj.progress}%` }} />
                      </div>
                    </div>

                    <p className="text-xs text-[#555] font-medium leading-relaxed bg-[#F7F3E8]/30 rounded-xl p-3 border border-[#F7F3E8]/50">
                      <span className="font-bold text-[#0D1B2A]">Impact:</span> {proj.impact}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
