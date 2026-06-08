"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Brain, MapPin, IndianRupee, Bed, Bath, Car, Check, ChevronRight, MessageSquare, Phone } from "lucide-react";

interface MatchedProperty {
  name: string;
  city: string;
  price: string;
  sqft: string;
  beds: number;
  baths: number;
  parking: number;
  matchScore: number;
  matchedTraits: string[];
  imgEmoji: string;
  builderGrade: string;
}

const RESULTS: MatchedProperty[] = [
  { name: "Godrej Infinity, Keshav Nagar", city: "Pune", price: "₹95L", sqft: "1,250 sqft", beds: 3, baths: 2, parking: 1, matchScore: 96, matchedTraits: ["Close to Hinjewadi Tech corridor", "Premium club amenities", "Possession under 6 months"], imgEmoji: "🏢", builderGrade: "AAA" },
  { name: "Prestige Song of the South", city: "Bangalore", price: "₹1.1Cr", sqft: "1,400 sqft", beds: 3, baths: 2, parking: 1, matchScore: 93, matchedTraits: ["IB schools within 1.5km", "Quiet green courtyard", "Ready to move in"], imgEmoji: "🏙️", builderGrade: "AA+" },
  { name: "Lodha Palava Lakeshore", city: "Mumbai", price: "₹82L", sqft: "1,100 sqft", beds: 2, baths: 2, parking: 1, matchScore: 91, matchedTraits: ["Low-budget starter home options", "Active retail district walking distance", "Dedicated direct metro transit"], imgEmoji: "🏗️", builderGrade: "AAA" },
  { name: "My Home Abhra, HITEC City", city: "Hyderabad", price: "₹1.4Cr", sqft: "1,650 sqft", beds: 3, baths: 3, parking: 2, matchScore: 89, matchedTraits: ["Financial District direct proximity", "Ultra-luxury sports infrastructure", "High floor listings"], imgEmoji: "🏘️", builderGrade: "AAA" },
  { name: "DLF The Ultima, Gurgaon", city: "Delhi NCR", price: "₹1.8Cr", sqft: "2,100 sqft", beds: 4, baths: 3, parking: 2, matchScore: 87, matchedTraits: ["Spacious independent units", "Golf-course extension connectivity", "Vetted double security loops"], imgEmoji: "🏰", builderGrade: "AAA" },
];

export default function AIMatchPage() {
  const [step, setStep] = useState(1);
  const [budgetVal, setBudgetVal] = useState(80); // Lakhs
  const [beds, setBeds] = useState(3);
  const [city, setCity] = useState("Pune");
  const [lifestyle, setLifestyle] = useState("Green & Peaceful");
  const [possession, setPossession] = useState("Ready to Move");

  // Loading animation states
  const [analyzing, setAnalyzing] = useState(false);
  const [percentLog, setPercentLog] = useState(0);
  const [searchLogs, setSearchLogs] = useState<string[]>([]);
  const [matchedResults, setMatchedResults] = useState<MatchedProperty[]>([]);

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const startMatching = () => {
    setAnalyzing(true);
    setSearchLogs([]);
    setPercentLog(0);

    const logSteps = [
      "Querying 2,500+ active database profiles...",
      "Analyzing commute ranges to commercial centers...",
      "Calculating builder reputation history margins...",
      "Correlating safety ratings with school proximity vectors...",
      "Compiled 5 optimal matching property profiles."
    ];

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < logSteps.length) {
        setSearchLogs(prev => [...prev, logSteps[currentLogIndex]]);
        setPercentLog(prev => Math.min(100, prev + 20));
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setAnalyzing(false);
        setStep(4); // Show results page

        // Sort results slightly depending on inputs to simulate match logic
        const adjustedResults = RESULTS.map(r => {
          let scoreOffset = 0;
          if (r.city === city) scoreOffset += 3;
          if (r.beds === beds) scoreOffset += 2;
          return {
            ...r,
            matchScore: Math.min(99, r.matchScore + scoreOffset)
          };
        }).sort((a, b) => b.matchScore - a.matchScore);

        setMatchedResults(adjustedResults);
      }
    }, 500);
  };

  const resetForm = () => {
    setStep(1);
    setMatchedResults([]);
  };

  return (
    <main className="min-h-screen bg-[#FFFDF7] pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-[#B8860B] font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Trends & Insights
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center shadow-lg border border-[#B8860B]/20">
            <Sparkles size={26} className="text-[#B8860B]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0D1B2A]">AI Property Match</h1>
            <p className="text-[#888] text-sm mt-0.5">Wizard-driven property matchmaking engine correlating lifestyle parameters</p>
          </div>
        </div>

        {/* Wizard Form Layout */}
        <div className="max-w-3xl mx-auto mt-10">
          
          {/* Progress bar wizard */}
          {step <= 3 && !analyzing && (
            <div className="flex items-center justify-between mb-8 text-xs font-bold font-ui uppercase tracking-wider text-[#888]">
              <span className={step >= 1 ? "text-[#B8860B]" : ""}>1. Financials</span>
              <ChevronRight size={14} />
              <span className={step >= 2 ? "text-[#B8860B]" : ""}>2. Lifestyle</span>
              <ChevronRight size={14} />
              <span className={step >= 3 ? "text-[#B8860B]" : ""}>3. Transit</span>
            </div>
          )}

          {/* STEP 1: Financials */}
          {step === 1 && !analyzing && (
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm space-y-6 animate-fade-in-up">
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A]">Step 1: Sizing & Financials</h2>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui">Estimated Budget Cap</label>
                  <span className="text-xs font-bold text-[#B8860B] font-ui">₹{budgetVal} Lakhs</span>
                </div>
                <input 
                  type="range" 
                  min={30} 
                  max={400} 
                  step={5}
                  value={budgetVal} 
                  onChange={e => setBudgetVal(+e.target.value)} 
                  className="w-full accent-[#B8860B] h-2 bg-[#F7F3E8] rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui block mb-3">Bedrooms Count (BHK)</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map(b => (
                    <button 
                      key={b} 
                      onClick={() => setBeds(b)}
                      className={`flex-1 py-3.5 rounded-xl text-xs font-bold font-ui uppercase tracking-wider transition-all ${
                        beds === b ? "bg-[#B8860B] text-white shadow-sm" : "bg-[#F7F3E8]/50 text-[#0D1B2A]"
                      }`}
                    >
                      {b} BHK
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui block mb-3">Target City</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Pune", "Mumbai", "Bangalore", "Delhi NCR", "Hyderabad", "Chennai"].map(c => (
                    <button 
                      key={c} 
                      onClick={() => setCity(c)}
                      className={`py-3 rounded-xl text-xs font-bold font-ui transition-all ${
                        city === c ? "bg-[#0D1B2A] text-[#B8860B] shadow-sm" : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button onClick={handleNextStep} className="px-6 py-3 bg-[#0D1B2A] text-[#B8860B] text-xs font-bold font-ui uppercase tracking-widest rounded-xl hover:bg-[#1C3A5E] transition-all cursor-pointer">
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Lifestyle */}
          {step === 2 && !analyzing && (
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm space-y-6 animate-fade-in-up">
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A]">Step 2: Lifestyle & Demographics</h2>
              
              <div>
                <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui block mb-3">Primary Lifestyle Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  {["Green & Peaceful", "High-street retail proximity", "IT Corporate proximity", "Kid education hub access"].map(theme => (
                    <button 
                      key={theme} 
                      onClick={() => setLifestyle(theme)}
                      className={`p-4 rounded-2xl text-xs font-bold font-ui text-left transition-all border ${
                        lifestyle === theme 
                          ? "bg-[#B8860B] text-white border-[#B8860B] shadow-sm" 
                          : "bg-[#FFFDF7] border-[#F7F3E8] text-[#0D1B2A]/80 hover:border-[#B8860B]/30"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button onClick={handlePrevStep} className="px-6 py-3 border-2 border-[#0D1B2A]/10 text-[#0D1B2A] text-xs font-bold font-ui uppercase tracking-widest rounded-xl transition-all cursor-pointer">
                  Back
                </button>
                <button onClick={handleNextStep} className="px-6 py-3 bg-[#0D1B2A] text-[#B8860B] text-xs font-bold font-ui uppercase tracking-widest rounded-xl hover:bg-[#1C3A5E] transition-all cursor-pointer">
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Transit */}
          {step === 3 && !analyzing && (
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm space-y-6 animate-fade-in-up">
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A]">Step 3: Possession & Transit</h2>

              <div>
                <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui block mb-3">Possession Timeline</label>
                <div className="flex gap-2">
                  {["Ready to Move", "Under 6 Months", "1+ Year launch"].map(t => (
                    <button 
                      key={t} 
                      onClick={() => setPossession(t)}
                      className={`flex-1 py-3.5 rounded-xl text-xs font-bold font-ui uppercase tracking-wider transition-all ${
                        possession === t ? "bg-[#0D1B2A] text-[#B8860B] shadow-sm" : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button onClick={handlePrevStep} className="px-6 py-3 border-2 border-[#0D1B2A]/10 text-[#0D1B2A] text-xs font-bold font-ui uppercase tracking-widest rounded-xl transition-all cursor-pointer">
                  Back
                </button>
                <button onClick={startMatching} className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold font-ui uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer">
                  <Brain size={14} /> Run AI Matchmaker
                </button>
              </div>
            </div>
          )}

          {/* LOADING STATE LOGS */}
          {analyzing && (
            <div className="bg-[#08111D] border border-white/10 rounded-3xl p-8 text-white font-mono text-xs space-y-3 shadow-lg h-[260px] flex flex-col justify-end">
              <div className="flex items-center gap-2 text-purple-400 mb-2 border-b border-white/5 pb-2">
                <Brain size={16} className="animate-pulse" />
                <span>AI Matching Engine initialized</span>
              </div>
              {searchLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-1.5 text-white/80 animate-fade-in-up">
                  <Check size={12} className="text-emerald-500" />
                  <span>{log}</span>
                </div>
              ))}
              <div className="h-2 bg-white/5 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-gradient-to-r from-purple-500 to-[#B8860B] rounded-full transition-all duration-300" style={{ width: `${percentLog}%` }} />
              </div>
            </div>
          )}

          {/* STEP 4: RESULTS */}
          {step === 4 && matchedResults.length > 0 && !analyzing && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-serif text-2xl font-bold text-[#0D1B2A]">AI Matched Portfolios</h2>
                <button onClick={resetForm} className="text-xs font-bold text-[#B8860B] uppercase tracking-wider font-ui">Start Over</button>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {matchedResults.map(prop => (
                  <div key={prop.name} className="bg-white rounded-3xl border border-[#F7F3E8] overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Top banner */}
                      <div className="h-32 bg-gradient-to-br from-[#0D1B2A] to-[#1C3A5E] flex items-center justify-center relative">
                        <span className="text-5xl">{prop.imgEmoji}</span>
                        <div className="absolute top-4 right-4 px-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur text-[10px] font-bold text-purple-700 flex items-center gap-1 shadow-sm border border-purple-100">
                          <Sparkles size={11} />
                          {prop.matchScore}% Match
                        </div>
                        <div className="absolute bottom-3 left-4">
                          <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur text-[9px] font-bold text-[#B8860B] uppercase tracking-wider border border-[#B8860B]/30">Grade {prop.builderGrade} Builder</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="font-serif text-base font-bold text-[#0D1B2A] leading-tight mb-1 group-hover:text-[#B8860B] transition-colors">{prop.name}</h3>
                        <p className="text-xs text-[#888] flex items-center gap-1 mb-4"><MapPin size={12} className="text-[#B8860B]" /> {prop.city}</p>

                        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold text-[#555] bg-[#FFFDF7] p-2.5 rounded-xl border border-[#F7F3E8] mb-4">
                          <div className="flex items-center justify-center gap-1"><Bed size={13} /> {prop.beds}BHK</div>
                          <div className="flex items-center justify-center gap-1"><Bath size={13} /> {prop.baths}B</div>
                          <div className="flex items-center justify-center gap-1"><Car size={13} /> {prop.parking}P</div>
                          <div className="text-[10px] truncate">{prop.sqft}</div>
                        </div>

                        {/* Trait list checkmarks */}
                        <div className="space-y-1.5">
                          {prop.matchedTraits.map(t => (
                            <p key={t} className="text-[11px] text-[#555] leading-relaxed flex items-start gap-1.5">
                              <Check size={12} className="text-emerald-500 shrink-0 mt-0.5" />
                              {t}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom strip action buttons */}
                    <div className="p-6 pt-0 mt-4 border-t border-[#F7F3E8] flex justify-between items-center">
                      <span className="font-serif text-lg font-bold text-[#B8860B]">{prop.price}</span>
                      <div className="flex gap-1.5">
                        <button className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 border border-emerald-100 transition-all cursor-pointer">
                          <MessageSquare size={14} />
                        </button>
                        <button className="px-4 py-2 bg-[#0D1B2A] hover:bg-[#1C3A5E] text-[#B8860B] text-[10px] font-bold font-ui uppercase tracking-wider rounded-xl transition-all flex items-center gap-1 cursor-pointer">
                          <Phone size={11} /> Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
