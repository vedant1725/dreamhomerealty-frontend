"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Brain, MapPin, Shield, Train, GraduationCap, Trees, ShoppingBag, Heart, CheckCircle2, AlertTriangle, MessageSquare } from "lucide-react";

interface ScoreDetail {
  safety: number;
  education: number;
  healthcare: number;
  greenCover: number;
  shopping: number;
  transport: number;
}

interface AreaAnalysis {
  name: string;
  city: string;
  overall: number;
  livability: number;
  investment: number;
  infrastructure: number;
  growth: string;
  pros: string[];
  cons: string[];
  scores: ScoreDetail;
  sentimentOptimism: number; // in %
  sentimentVelocity: "High" | "Moderate" | "Stabilizing";
  listingsCount: number;
  aiVerdict: string;
}

const AREAS_DATA: Record<string, AreaAnalysis> = {
  "Baner, Pune": {
    name: "Baner, Pune",
    city: "Pune",
    overall: 91, livability: 88, investment: 94, infrastructure: 86, growth: "+14%",
    pros: ["Excellent connectivity to Hinjewadi Phase 1 & 2 IT parks", "High density of premium restaurants, microbreweries & high-street retail", "Upcoming Metro Line 3 junctions close by", "Planned Smart City telecom & layout expansions"],
    cons: ["Saturated traffic lanes during peak IT commute hours", "Water supply dependency on municipal tankers in newer sectors"],
    scores: { safety: 87, education: 90, healthcare: 85, greenCover: 78, shopping: 92, transport: 84 },
    sentimentOptimism: 88,
    sentimentVelocity: "High",
    listingsCount: 420,
    aiVerdict: "Baner stands as a premium choice for IT professionals seeking high rental yield potential (+14% YoY) paired with high-street lifestyle options. The upcoming Metro integration will act as a major capital multiplier in the next 18 months."
  },
  "Whitefield, Bangalore": {
    name: "Whitefield, Bangalore",
    city: "Bangalore",
    overall: 88, livability: 85, investment: 90, infrastructure: 82, growth: "+11%",
    pros: ["Largest tech corridor cluster in eastern Bangalore", "Top-tier international baccalaureate curriculum schools cluster", "Namma Metro Purple Line directly operational", "High concentration of corporate office parks"],
    cons: ["Heavy peak hour traffic along Hope Farm junction", "Intermittent municipal water supply in peripheral micro-sectors"],
    scores: { safety: 84, education: 88, healthcare: 86, greenCover: 72, shopping: 90, transport: 80 },
    sentimentOptimism: 82,
    sentimentVelocity: "Moderate",
    listingsCount: 680,
    aiVerdict: "Whitefield remains the cornerstone of Bangalore's real estate absorption. While traffic remains a constraint, the fully operational Purple Line Metro has significantly enhanced livability ratings for families."
  },
  "Gachibowli, Hyderabad": {
    name: "Gachibowli, Hyderabad",
    city: "Hyderabad",
    overall: 92, livability: 90, investment: 95, infrastructure: 88, growth: "+18%",
    pros: ["Immediate proximity to Financial District corporate towers", "Wide 6-lane planned grid roads & flyovers network", "Elite international academies and sports complexes", "Premium villa layout corridors"],
    cons: ["Higher baseline cost of premium apartments", "Peripheral micro-sectors lack pedestrian sidewalks"],
    scores: { safety: 90, education: 92, healthcare: 88, greenCover: 80, shopping: 86, transport: 88 },
    sentimentOptimism: 94,
    sentimentVelocity: "High",
    listingsCount: 380,
    aiVerdict: "With Hyderabad's Financial District expanding aggressively, Gachibowli is the highest-ranked investment hotspot (+18% growth index). Excellent infrastructure layout makes it a prime premium destination."
  },
  "Powai, Mumbai": {
    name: "Powai, Mumbai",
    city: "Mumbai",
    overall: 93, livability: 92, investment: 88, infrastructure: 90, growth: "+7%",
    pros: ["Scenic lakeside residential complexes (Hiranandani Gardens)", "Elite IIT Bombay and associated tech ecosystems", "Vibrant social fabric with shopping galleries", "Centrally located with JVLR highway access"],
    cons: ["Extremely high baseline pricing structures", "Metro line under construction causing current traffic bottlenecks"],
    scores: { safety: 92, education: 95, healthcare: 90, greenCover: 88, shopping: 85, transport: 78 },
    sentimentOptimism: 85,
    sentimentVelocity: "Stabilizing",
    listingsCount: 310,
    aiVerdict: "Powai represents high-end luxury residential living. With a near-perfect livability index (92), capital growth is steady, backed by robust resale liquidity and builder reputations."
  },
};

const AREA_NAMES = Object.keys(AREAS_DATA);

function ScoreBar({ score, label, icon: Icon }: { score: number; label: string; icon: any }) {
  const color = score >= 90 ? "#10B981" : score >= 80 ? "#B8860B" : "#F59E0B";
  return (
    <div className="flex items-center gap-4 py-2 border-b border-[#F7F3E8] last:border-0">
      <Icon size={16} style={{ color }} className="shrink-0" />
      <span className="text-xs font-bold text-[#0D1B2A] font-ui uppercase tracking-wider w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-[#F7F3E8] rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-bold w-8 text-right font-ui" style={{ color }}>{score}</span>
    </div>
  );
}

export default function AIAreaPage() {
  const [selected, setSelected] = useState(AREA_NAMES[0]);
  const data = useMemo(() => AREAS_DATA[selected] || AREAS_DATA[AREA_NAMES[0]], [selected]);

  return (
    <main className="min-h-screen bg-[#FFFDF7] pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-[#B8860B] font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Trends & Insights
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center shadow-lg border border-[#B8860B]/20">
            <Brain size={26} className="text-[#B8860B]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0D1B2A]">AI Area Analysis</h1>
            <p className="text-[#888] text-sm mt-0.5">Deep neighborhood advisory report containing livability indexes and sentiment insights</p>
          </div>
        </div>

        {/* Selection Pills */}
        <div className="flex flex-wrap gap-2 mb-10 mt-8">
          {AREA_NAMES.map(a => (
            <button 
              key={a} 
              onClick={() => setSelected(a)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold font-ui tracking-wider uppercase transition-all duration-300 ${
                selected === a 
                  ? "bg-[#0D1B2A] text-[#B8860B] shadow-md" 
                  : "bg-white border border-[#F7F3E8] text-[#0D1B2A]/70 hover:border-[#B8860B]/30"
              }`}
            >
              {a}
            </button>
          ))}
        </div>

        {/* Overall Index scores block */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: "Overall Rating", value: data.overall },
            { label: "Livability Index", value: data.livability },
            { label: "Investment Grade", value: data.investment },
            { label: "Infrastructure State", value: data.infrastructure },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#F7F3E8] p-6 shadow-sm text-center">
              <span className="text-[9px] font-bold font-ui uppercase tracking-wider text-[#888] block mb-2">{s.label}</span>
              <p className={`font-serif text-3xl font-bold ${s.value >= 90 ? "text-emerald-600" : "text-[#B8860B]"}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Detailed parameter scores */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#0D1B2A] mb-6">Livability Parameter Scores</h2>
              <div className="space-y-4">
                <ScoreBar score={data.scores.safety} label="Safety & Crime" icon={Shield} />
                <ScoreBar score={data.scores.education} label="Education" icon={GraduationCap} />
                <ScoreBar score={data.scores.healthcare} label="Healthcare" icon={Heart} />
                <ScoreBar score={data.scores.greenCover} label="Green Canopy" icon={Trees} />
                <ScoreBar score={data.scores.shopping} label="Shopping Hubs" icon={ShoppingBag} />
                <ScoreBar score={data.scores.transport} label="Public Transit" icon={Train} />
              </div>
            </div>

            {/* AI Verdict Summary box */}
            <div className="bg-[#0D1B2A] border border-white/5 rounded-3xl p-8 text-white relative overflow-hidden shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/10 rounded-bl-full" />
              <span className="text-[9px] font-bold font-ui uppercase tracking-widest text-[#B8860B] block mb-2">Executive AI Analysis</span>
              <h3 className="font-serif text-lg font-bold mb-3">Location Investment Thesis</h3>
              <p className="text-xs text-white/70 leading-relaxed font-medium bg-white/5 border border-white/10 rounded-2xl p-4">{data.aiVerdict}</p>
            </div>
          </div>

          {/* Pros & Cons, and sentiment insights */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pros & Cons */}
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-6 shadow-sm space-y-5">
              <div>
                <h3 className="font-serif text-sm font-bold text-emerald-600 mb-3 flex items-center gap-1.5">
                  <CheckCircle2 size={16} /> Key Advantages
                </h3>
                <ul className="space-y-2">
                  {data.pros.map((p, idx) => (
                    <li key={idx} className="text-xs text-[#555] font-medium leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#F7F3E8]">
                <h3 className="font-serif text-sm font-bold text-red-500 mb-3 flex items-center gap-1.5">
                  <AlertTriangle size={16} /> Key Constraints
                </h3>
                <ul className="space-y-2">
                  {data.cons.map((c, idx) => (
                    <li key={idx} className="text-xs text-[#555] font-medium leading-relaxed flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sentiment Indexes */}
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-6 shadow-sm space-y-4 text-xs font-semibold text-[#555]">
              <h3 className="font-serif text-sm font-bold text-[#0D1B2A] flex items-center gap-1.5 mb-2">
                <MessageSquare size={16} className="text-[#B8860B]" />
                Area Market Sentiment
              </h3>
              
              <div className="flex justify-between items-center py-2.5 border-b border-[#F7F3E8]/80">
                <span>Consumer Optimism score:</span>
                <span className="text-emerald-600 font-bold">{data.sentimentOptimism}% Optimistic</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-[#F7F3E8]/80">
                <span>Listing Velocity:</span>
                <span className="text-[#B8860B] font-bold">{data.sentimentVelocity} Momentum</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span>Active verified listings:</span>
                <span className="text-[#0D1B2A] font-bold">{data.listingsCount} Properties</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
