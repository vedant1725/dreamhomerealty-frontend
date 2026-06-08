"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Star, TrendingUp, Shield, MapPin, Search, Bot } from "lucide-react";

interface PropertyScoreCard {
  name: string;
  city: string;
  score: number;
  appreciation: number;
  rental: number;
  safety: number;
  connectivity: number;
  builder: string;
  builderReputation: number; // /100
  liquidity: number; // /100
  risk: "Low" | "Low-Medium" | "Medium";
  grade: "AAA" | "AA+" | "AA" | "A+";
}

const PROPERTIES: PropertyScoreCard[] = [
  { name: "Godrej Platinum, Hinjewadi", city: "Pune", score: 94, appreciation: 18, rental: 4.2, safety: 92, connectivity: 88, builder: "A+", builderReputation: 95, liquidity: 90, risk: "Low", grade: "AAA" },
  { name: "Prestige Lakeside, Whitefield", city: "Bangalore", score: 91, appreciation: 15, rental: 3.8, safety: 90, connectivity: 85, builder: "A+", builderReputation: 92, liquidity: 88, risk: "Low", grade: "AA+" },
  { name: "DLF Camellias, Gurgaon", city: "Delhi NCR", score: 96, appreciation: 12, rental: 2.5, safety: 95, connectivity: 92, builder: "A+", builderReputation: 98, liquidity: 94, risk: "Low", grade: "AAA" },
  { name: "Lodha World Towers, Worli", city: "Mumbai", score: 93, appreciation: 8, rental: 2.8, safety: 94, connectivity: 96, builder: "A+", builderReputation: 94, liquidity: 91, risk: "Low", grade: "AAA" },
  { name: "My Home Bhooja, HITEC City", city: "Hyderabad", score: 92, appreciation: 20, rental: 4.5, safety: 88, connectivity: 90, builder: "A", builderReputation: 89, liquidity: 92, risk: "Low-Medium", grade: "AA" },
  { name: "Casagrand First City, OMR", city: "Chennai", score: 87, appreciation: 10, rental: 3.5, safety: 85, connectivity: 82, builder: "A", builderReputation: 86, liquidity: 80, risk: "Low-Medium", grade: "A+" },
];

const CITIES = ["All", "Pune", "Bangalore", "Delhi NCR", "Mumbai", "Hyderabad", "Chennai"];

function ScoreRing({ score, label }: { score: number; label: string }) {
  const size = 110;
  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const color = score >= 92 ? "#10B981" : score >= 88 ? "#B8860B" : "#F59E0B";

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F7F3E8" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1000" />
      </svg>
      <div className="absolute top-[32%] left-0 right-0 text-center">
        <span className="font-serif text-2xl font-bold block leading-none" style={{ color }}>{score}</span>
        <span className="text-[7px] font-bold font-ui uppercase tracking-wider text-[#888]">{label}</span>
      </div>
    </div>
  );
}

export default function AIScorePage() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProperties = useMemo(() => {
    return PROPERTIES.filter(p => {
      const matchCity = selectedCity === "All" || p.city === selectedCity;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.city.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCity && matchSearch;
    });
  }, [selectedCity, searchQuery]);

  return (
    <main className="min-h-screen bg-[#FFFDF7] pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-[#B8860B] font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Trends & Insights
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center shadow-lg border border-[#B8860B]/20">
            <Bot size={26} className="text-[#B8860B]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0D1B2A]">AI Investment Score</h1>
            <p className="text-[#888] text-sm mt-0.5">Algorithmic risk-adjusted grading indexing builder, liquidity, and yield metrics</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] p-6 shadow-sm mb-10 mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-wrap gap-1.5">
            {CITIES.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCity(c)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-ui tracking-wide uppercase transition-all ${
                  selectedCity === c ? "bg-[#0D1B2A] text-[#B8860B] shadow-md" : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70 hover:bg-[#F5E6C0]/40"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search properties..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full md:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-[#F7F3E8] bg-[#FFFDF7] text-sm text-[#0D1B2A] placeholder-[#888] focus:border-[#B8860B]/40 focus:outline-none transition-all font-semibold"
            />
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
          </div>
        </div>

        {/* Properties Dossier Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(prop => (
            <div key={prop.name} className="bg-white rounded-3xl border border-[#F7F3E8] p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <span className="text-[9px] font-bold font-ui uppercase tracking-widest text-[#B8860B] block mb-1">Grade {prop.grade} Asset</span>
                    <h3 className="font-serif text-lg font-bold text-[#0D1B2A] leading-tight group-hover:text-[#B8860B] transition-colors">{prop.name}</h3>
                    <p className="text-xs text-[#888] flex items-center gap-1 mt-1"><MapPin size={12} className="text-[#B8860B]" /> {prop.city}</p>
                  </div>
                  <ScoreRing score={prop.score} label="AI Score" />
                </div>

                <div className="space-y-3 pt-4 border-t border-[#F7F3E8]">
                  {[
                    { label: "Appreciation projection", value: `${prop.appreciation}%/yr`, icon: TrendingUp, color: "text-emerald-600" },
                    { label: "Estimated Rental Yield", value: `${prop.rental}%`, icon: Star, color: "text-[#B8860B]" },
                    { label: "Builder Track Record", value: `${prop.builderReputation}/100`, icon: Shield, color: "text-blue-500" },
                    { label: "Asset Liquidity index", value: `${prop.liquidity}/100`, icon: MapPin, color: "text-purple-500" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-[#F7F3E8]/50 last:border-0 text-xs">
                      <span className="text-[#555] flex items-center gap-2 font-medium"><item.icon size={14} className={item.color} />{item.label}</span>
                      <span className={`font-bold ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F7F3E8] flex justify-between items-center text-xs">
                <span className="font-bold text-[#888] font-ui uppercase tracking-wider">Risk Profile:</span>
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider ${
                  prop.risk === "Low" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                }`}>{prop.risk} Risk</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
