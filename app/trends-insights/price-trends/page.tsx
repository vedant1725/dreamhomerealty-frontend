"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { TrendingUp, ArrowLeft, ArrowUpRight, ArrowDownRight, Search, Landmark, Compass, Award } from "lucide-react";

const CITIES = [
  { name: "Mumbai", avg: "₹28,500", change: +8.2, volume: "14,200", supply: "High", demand: "Very High", sentiment: "Highly Bullish", quarters: [24100, 24800, 25600, 26800, 27500, 28500] },
  { name: "Pune", avg: "₹12,800", change: +12.5, volume: "9,800", supply: "Medium", demand: "Very High", sentiment: "Bullish", quarters: [9800, 10200, 10900, 11500, 12100, 12800] },
  { name: "Bangalore", avg: "₹14,200", change: +6.8, volume: "11,800", supply: "High", demand: "High", sentiment: "Stable Growth", quarters: [12200, 12600, 13100, 13400, 13900, 14200] },
  { name: "Delhi NCR", avg: "₹18,900", change: +4.1, volume: "18,500", supply: "Very High", demand: "Medium", sentiment: "Consolidating", quarters: [17800, 18000, 18200, 18400, 18700, 18900] },
  { name: "Hyderabad", avg: "₹11,500", change: +15.3, volume: "8,900", supply: "Medium", demand: "Very High", sentiment: "Highly Bullish", quarters: [8500, 9100, 9600, 10200, 10900, 11500] },
  { name: "Chennai", avg: "₹10,200", change: +3.7, volume: "7,200", supply: "Medium", demand: "Medium", sentiment: "Stable Growth", quarters: [9400, 9600, 9750, 9900, 10050, 10200] },
  { name: "Ahmedabad", avg: "₹7,800", change: -1.2, volume: "5,500", supply: "High", demand: "Low", sentiment: "Correction", quarters: [8100, 8020, 7950, 7900, 7850, 7800] },
  { name: "Kolkata", avg: "₹6,500", change: +2.1, volume: "4,800", supply: "Medium", demand: "Medium", sentiment: "Stable", quarters: [6100, 6180, 6250, 6320, 6410, 6500] },
];

const QUARTERS = ["Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025", "Q1 2026", "Q2 2026"];

export default function PriceTrendsPage() {
  const [selectedCity, setSelectedCity] = useState("Pune");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const city = useMemo(() => CITIES.find(c => c.name === selectedCity) || CITIES[0], [selectedCity]);
  
  const filteredCities = useMemo(() => {
    return CITIES.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [searchQuery]);

  // SVG Chart Computations
  const chartWidth = 600;
  const chartHeight = 240;
  const padding = 40;

  const minVal = useMemo(() => Math.min(...city.quarters) * 0.95, [city]);
  const maxVal = useMemo(() => Math.max(...city.quarters) * 1.05, [city]);

  const points = useMemo(() => {
    const deltaX = (chartWidth - padding * 2) / (city.quarters.length - 1);
    const rangeY = maxVal - minVal;
    return city.quarters.map((val, idx) => {
      const x = padding + idx * deltaX;
      const y = chartHeight - padding - ((val - minVal) / rangeY) * (chartHeight - padding * 2);
      return { x, y, val };
    });
  }, [city, minVal, maxVal]);

  const pathD = useMemo(() => {
    if (points.length === 0) return "";
    return points.reduce((acc, p, i) => {
      return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, "");
  }, [points]);

  const areaD = useMemo(() => {
    if (points.length === 0) return "";
    const first = points[0];
    const last = points[points.length - 1];
    return `${pathD} L ${last.x} ${chartHeight - padding} L ${first.x} ${chartHeight - padding} Z`;
  }, [points, pathD]);

  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {/* ── HERO BANNER ── */}
      <section className="relative bg-gradient-to-br from-[#08111D] via-[#0D1B2A] to-[#1C3A5E] pt-36 pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-[#B8860B]/8 blur-[100px]" />
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-[#1C3A5E]/30 blur-[80px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-[#B8860B] font-semibold mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Trends & Insights
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-[#B8860B]" />
            <span className="text-[11px] font-bold font-ui uppercase tracking-[0.2em] text-[#B8860B]">Market Analysis Studio</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-3">Property Price Trends</h1>
          <p className="text-base text-white/40 max-w-xl">Deep analytics on average rates per square foot, index changes, and demand indicators across top micro-markets.</p>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 -mt-10 relative z-20 pb-20">
        {/* City Selector Pill Bar */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] shadow-[0_12px_40px_rgba(13,27,42,0.06)] p-3 flex flex-wrap gap-2 mb-10">
          {CITIES.map(c => (
            <button key={c.name} onClick={() => setSelectedCity(c.name)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold font-ui tracking-wider uppercase transition-all duration-300 ${selectedCity === c.name
                ? "bg-[#0D1B2A] text-[#B8860B] shadow-lg shadow-[#0d1b2a]/20"
                : "text-[#0D1B2A]/70 hover:bg-[#F5E6C0]/40"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Selected City Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Avg Price/sqft", value: city.avg, sub: "current market price", icon: Landmark, color: "text-[#0D1B2A]" },
            { label: "YoY growth", value: `${city.change >= 0 ? "+" : ""}${city.change}%`, sub: "annualized escalation", icon: TrendingUp, color: city.change >= 0 ? "text-emerald-600" : "text-red-500", isGrowth: true },
            { label: "Quarterly Volume", value: city.volume, sub: "units registered", icon: Compass, color: "text-blue-500" },
            { label: "Market Sentiment", value: city.sentiment, sub: `Demand: ${city.demand}`, icon: Award, color: "text-purple-500" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#F7F3E8] p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold font-ui uppercase tracking-widest text-[#888]">{s.label}</span>
                  <s.icon size={16} className={`${s.color}`} />
                </div>
                <p className={`font-serif text-2xl md:text-3xl font-bold ${s.color}`}>
                  {s.isGrowth && city.change >= 0 && <ArrowUpRight size={20} className="inline -mt-1 mr-1" />}
                  {s.isGrowth && city.change < 0 && <ArrowDownRight size={20} className="inline -mt-1 mr-1" />}
                  {s.value}
                </p>
              </div>
              <p className="text-xs text-[#888] mt-2 font-medium">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-10">
          {/* Quarterly SVG Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0D1B2A]">Quarterly Price Index</h2>
                <p className="text-xs text-[#888] mt-1">{city.name} — pricing trajectory per square foot</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#888]"><span className="w-2.5 h-2.5 rounded bg-emerald-500" /> Current Trend</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-[#888]"><span className="w-2.5 h-2.5 rounded bg-[#0D1B2A]/10" /> Historical Bounds</span>
              </div>
            </div>

            {/* Custom Responsive SVG Chart */}
            <div className="relative w-full overflow-hidden">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                <defs>
                  <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B8860B" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#FFFDF7" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guide Lines */}
                {Array(4).fill(0).map((_, i) => {
                  const y = padding + (i * (chartHeight - padding * 2)) / 3;
                  return (
                    <line key={i} x1={padding} y1={y} x2={chartWidth - padding} y2={y} stroke="#F7F3E8" strokeWidth={1} strokeDasharray="4 4" />
                  );
                })}

                {/* Gradient Area Fill */}
                <path d={areaD} fill="url(#chartGlow)" className="transition-all duration-700" />

                {/* Main Trend Line */}
                <path d={pathD} fill="none" stroke="#B8860B" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-700" />

                {/* Interaction Hotspots & Interactive Points */}
                {points.map((p, idx) => (
                  <g key={idx} className="cursor-pointer" onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)}>
                    <circle cx={p.x} cy={p.y} r={hoveredIdx === idx ? 8 : 4} fill={hoveredIdx === idx ? "#0D1B2A" : "#B8860B"} stroke="#fff" strokeWidth={2} className="transition-all duration-300" />
                  </g>
                ))}

                {/* X-Axis labels */}
                {points.map((p, idx) => (
                  <text key={idx} x={p.x} y={chartHeight - 12} textAnchor="middle" className="text-[10px] font-bold fill-[#888] font-ui uppercase tracking-wider">
                    {QUARTERS[idx]}
                  </text>
                ))}
              </svg>

              {/* Dynamic Overlay Tooltip */}
              {hoveredIdx !== null && (
                <div className="absolute bg-[#0D1B2A] text-white rounded-xl px-4 py-2 text-xs font-bold shadow-xl flex flex-col gap-0.5 border border-[#B8860B]/30"
                  style={{
                    left: `${(points[hoveredIdx].x / chartWidth) * 100}%`,
                    top: `${(points[hoveredIdx].y / chartHeight) * 100 - 15}%`,
                    transform: "translate(-50%, -100%)",
                    pointerEvents: "none",
                  }}
                >
                  <span className="text-[#B8860B] uppercase text-[9px] tracking-wider">{QUARTERS[hoveredIdx]}</span>
                  <span>₹{points[hoveredIdx].val.toLocaleString()}/sqft</span>
                </div>
              )}
            </div>
          </div>

          {/* Mini Projections Column */}
          <div className="bg-[#0D1B2A] rounded-3xl border border-white/5 p-8 shadow-sm flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/10 rounded-bl-full" />
            <div>
              <span className="text-[9px] font-bold font-ui uppercase tracking-widest text-[#B8860B]">AI Projection Engine</span>
              <h3 className="font-serif text-2xl font-bold mt-2 mb-4 leading-tight">5-Year Growth Outlook</h3>
              <p className="text-sm text-white/60 leading-relaxed mb-6">Based on urban development pipelines, commercial growth markers, and inflation trends, {city.name} prices are predicted to scale as follows:</p>
            </div>
            <div className="space-y-4">
              {[
                { period: "1 Year", multiplier: 1.08, label: "Short term projection" },
                { period: "3 Years", multiplier: 1.25, label: "Medium term development" },
                { period: "5 Years", multiplier: 1.48, label: "Long term maturation" },
              ].map(p => {
                const basePrice = city.quarters[city.quarters.length - 1];
                const predictedVal = Math.round(basePrice * p.multiplier);
                const perc = Math.round((p.multiplier - 1) * 100);
                return (
                  <div key={p.period} className="flex justify-between items-center py-2.5 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-xs font-bold text-white">{p.period}</p>
                      <p className="text-[10px] text-white/40">{p.label}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-[#B8860B]">₹{predictedVal.toLocaleString()}/sqft</p>
                      <p className="text-[10px] font-bold text-emerald-500">+{perc}% growth</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* All Cities Overview Table */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A]">All Cities Overview</h2>
              <p className="text-xs text-[#888] mt-1">Cross-compare average price rates, demand ratios, and supply velocity</p>
            </div>
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search city..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-xl border border-[#F7F3E8] bg-[#FFFDF7] text-sm text-[#0D1B2A] placeholder-[#888] focus:border-[#B8860B]/40 focus:outline-none transition-all font-semibold"
              />
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888]" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-[#F7F3E8] pb-4">
                  {["City", "Avg Price/sqft", "YoY Escalation", "Supply Index", "Demand Index", "AI Market Rating"].map(h => (
                    <th key={h} className="py-4 px-4 text-[10px] font-bold font-ui uppercase tracking-wider text-[#888]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCities.map(c => {
                  const isSelected = c.name === selectedCity;
                  return (
                    <tr key={c.name} onClick={() => setSelectedCity(c.name)}
                      className={`border-b border-[#F7F3E8]/60 cursor-pointer transition-all duration-300 hover:bg-[#F5E6C0]/15 ${isSelected ? "bg-[#F5E6C0]/25" : ""}`}
                    >
                      <td className="py-4.5 px-4 font-bold text-[#0D1B2A] text-sm">{c.name}</td>
                      <td className="py-4.5 px-4 font-semibold text-[#555] text-sm">{c.avg}</td>
                      <td className={`py-4.5 px-4 font-bold text-sm ${c.change >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                        <span className="flex items-center gap-0.5">
                          {c.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          {Math.abs(c.change)}%
                        </span>
                      </td>
                      <td className="py-4.5 px-4">
                        <span className="px-3 py-1 rounded-full bg-[#F7F3E8] text-[10px] font-bold text-[#0D1B2A] uppercase tracking-wider">{c.supply}</span>
                      </td>
                      <td className="py-4.5 px-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          c.demand === "Very High" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                          c.demand === "High" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                          c.demand === "Medium" ? "bg-amber-50 text-amber-600 border border-amber-100" :
                          "bg-red-50 text-red-500 border border-red-100"
                        }`}>{c.demand}</span>
                      </td>
                      <td className="py-4.5 px-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${
                          c.change >= 10 ? "bg-emerald-600" :
                          c.change >= 5 ? "bg-[#B8860B]" :
                          c.change >= 0 ? "bg-slate-600" : "bg-red-500"
                        }`}>
                          {c.sentiment}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
