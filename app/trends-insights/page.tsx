"use client";
import Link from "next/link";
import { TrendingUp, MapPin, Calculator, Brain, ArrowRight, BarChart3, Sparkles, ChevronRight, Star } from "lucide-react";

const SECTIONS = [
  {
    title: "Market Trends",
    desc: "Real-time property market data, price analysis, and investment insights powered by advanced analytics.",
    icon: TrendingUp,
    items: [
      { title: "Property Price Trends", desc: "Track real-time price movements across major Indian cities with quarterly data", href: "/trends-insights/price-trends" },
      { title: "Rent vs Buy Analysis", desc: "Data-driven comparison with detailed cost projections to make the right choice", href: "/trends-insights/rent-vs-buy" },
      { title: "Investment Hotspots", desc: "AI-ranked areas with highest ROI potential and growth catalysts", href: "/trends-insights/hotspots" },
      { title: "City Growth Reports", desc: "Comprehensive city-wise growth analytics with infrastructure pipeline", href: "/trends-insights/city-reports" },
    ],
  },
  {
    title: "Area Insights",
    desc: "Deep-dive neighborhood analysis, safety scores, livability index, and connectivity ratings.",
    icon: MapPin,
    items: [
      { title: "Best Family Areas", desc: "Top-rated neighborhoods for families with schools, parks & safety data", href: "/trends-insights/family-areas" },
      { title: "Emerging Locations", desc: "Up-and-coming areas with massive growth potential and price predictions", href: "/trends-insights/emerging-locations" },
      { title: "Safety & Livability", desc: "Crime rates, healthcare access, air quality, and quality of life metrics", href: "/trends-insights/safety-index" },
      { title: "Connectivity Score", desc: "Metro, highway, airport proximity and public transport accessibility", href: "/trends-insights/connectivity" },
    ],
  },
  {
    title: "Smart Calculators",
    desc: "Professional-grade financial tools for informed property decisions and investment planning.",
    icon: Calculator,
    items: [
      { title: "EMI Calculator", desc: "Calculate monthly home loan installments with principal-interest breakdown", href: "/trends-insights/emi-calculator" },
      { title: "ROI Calculator", desc: "Estimate total return on property investment with appreciation & rental yield", href: "/trends-insights/roi-calculator" },
      { title: "Rent vs Buy Calculator", desc: "Compare total cost of renting vs buying with escalation modeling", href: "/trends-insights/rent-buy-calc" },
      { title: "Stamp Duty Calculator", desc: "State-wise registration charges with gender concession support", href: "/trends-insights/stamp-duty" },
    ],
  },
  {
    title: "AI-Powered Insights",
    desc: "Cutting-edge machine learning tools for intelligent, data-driven property decisions.",
    icon: Brain,
    items: [
      { title: "AI Price Predictor", desc: "ML-powered 1/3/5 year property price forecasting with growth models", href: "/trends-insights/ai-predictor" },
      { title: "AI Investment Score", desc: "AI-generated investment rating with appreciation & risk analysis", href: "/trends-insights/ai-score" },
      { title: "AI Area Analysis", desc: "Deep AI analysis of neighborhoods with pros, cons, and score breakdowns", href: "/trends-insights/ai-area" },
      { title: "AI Property Match", desc: "Find your perfect property through intelligent preference matching", href: "/trends-insights/ai-match" },
    ],
  },
];

const STATS = [
  { label: "Cities Analyzed", value: "28+" },
  { label: "Data Points", value: "5M+" },
  { label: "Properties Tracked", value: "1.2L+" },
  { label: "AI Accuracy", value: "94.7%" },
];

export default function TrendsInsightsHub() {
  return (
    <main className="min-h-screen bg-[#FFFDF7]">
      {/* ── HERO BANNER ── */}
      <section className="relative bg-gradient-to-br from-[#08111D] via-[#0D1B2A] to-[#1C3A5E] pt-36 pb-20 overflow-hidden">
        {/* Decorative Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#B8860B]/8 blur-[100px]" />
        <div className="absolute bottom-0 right-20 w-96 h-96 rounded-full bg-[#1C3A5E]/40 blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-48 h-48 rounded-full bg-[#B8860B]/5 blur-[80px]" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px flex-1 max-w-[40px] bg-[#B8860B]" />
            <span className="text-[11px] font-bold font-ui uppercase tracking-[0.2em] text-[#B8860B]">DreamHome Intelligence Hub</span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
            Trends & <span className="text-[#B8860B]">Insights</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mb-12">
            Your command center for real estate intelligence. Market data, AI tools, financial calculators, and area insights — everything you need to make confident property decisions.
          </p>

          {/* Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map(s => (
              <div key={s.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center">
                <p className="font-serif text-2xl md:text-3xl font-bold text-[#B8860B]">{s.value}</p>
                <p className="text-xs font-ui uppercase tracking-widest text-white/40 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-16">
          {SECTIONS.map((section, sIdx) => (
            <div key={section.title}>
              {/* Section Header */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D1B2A] to-[#1C3A5E] flex items-center justify-center shadow-lg">
                  <section.icon size={24} className="text-[#B8860B]" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0D1B2A]">{section.title}</h2>
                  <p className="text-sm text-[#888] mt-0.5">{section.desc}</p>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative bg-white rounded-2xl border border-[#F7F3E8] p-7 hover:border-[#B8860B]/30 hover:shadow-[0_12px_40px_rgba(13,27,42,0.12)] transition-all duration-500 flex flex-col overflow-hidden"
                  >
                    {/* Corner Decoration */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#F5E6C0]/30 to-transparent rounded-bl-full -mr-12 -mt-12 transition-transform duration-500 group-hover:scale-[2]" />

                    <h3 className="font-serif text-lg font-bold text-[#0D1B2A] mb-2 group-hover:text-[#B8860B] transition-colors relative z-10">{item.title}</h3>
                    <p className="text-[13px] text-[#888] leading-relaxed flex-1 relative z-10 mb-5">{item.desc}</p>

                    <div className="flex items-center gap-1.5 text-[11px] font-bold font-ui uppercase tracking-widest text-[#B8860B] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 relative z-10">
                      Explore <ArrowRight size={12} />
                    </div>
                  </Link>
                ))}
              </div>

              {sIdx < SECTIONS.length - 1 && <div className="mt-16 border-t border-[#F7F3E8]" />}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
