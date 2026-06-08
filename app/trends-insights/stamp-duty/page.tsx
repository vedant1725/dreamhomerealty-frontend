"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Landmark, Sparkles } from "lucide-react";

interface StateFeeStructure {
  name: string;
  stampDutyMale: number;
  stampDutyFemale: number;
  stampDutyJoint: number;
  registrationFee: number; // in %
  cessPercent: number; // in %
}

const STATES: StateFeeStructure[] = [
  { name: "Maharashtra", stampDutyMale: 6, stampDutyFemale: 5, stampDutyJoint: 6, registrationFee: 1, cessPercent: 1 },
  { name: "Karnataka", stampDutyMale: 5, stampDutyFemale: 5, stampDutyJoint: 5, registrationFee: 1, cessPercent: 2 },
  { name: "Tamil Nadu", stampDutyMale: 7, stampDutyFemale: 7, stampDutyJoint: 7, registrationFee: 4, cessPercent: 0 },
  { name: "Telangana", stampDutyMale: 4, stampDutyFemale: 4, stampDutyJoint: 4, registrationFee: 0.5, cessPercent: 1.5 },
  { name: "Delhi", stampDutyMale: 6, stampDutyFemale: 4, stampDutyJoint: 5, registrationFee: 1, cessPercent: 0 },
  { name: "Uttar Pradesh", stampDutyMale: 7, stampDutyFemale: 6, stampDutyJoint: 6.5, registrationFee: 1, cessPercent: 0 },
  { name: "Gujarat", stampDutyMale: 4.9, stampDutyFemale: 4.9, stampDutyJoint: 4.9, registrationFee: 1, cessPercent: 0 },
  { name: "Rajasthan", stampDutyMale: 6, stampDutyFemale: 5, stampDutyJoint: 5.5, registrationFee: 1, cessPercent: 2 },
  { name: "West Bengal", stampDutyMale: 6, stampDutyFemale: 6, stampDutyJoint: 6, registrationFee: 1, cessPercent: 0 },
  { name: "Kerala", stampDutyMale: 8, stampDutyFemale: 8, stampDutyJoint: 8, registrationFee: 2, cessPercent: 0 },
];

export default function StampDutyPage() {
  const [propertyValue, setPropertyValue] = useState(6000000);
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [gender, setGender] = useState<"male" | "female" | "joint">("male");
  const [areaType, setAreaType] = useState<"urban" | "rural">("urban");

  const state = useMemo(() => STATES.find(s => s.name === selectedState) || STATES[0], [selectedState]);

  const effectiveStampPercent = useMemo(() => {
    let base = state.stampDutyMale;
    if (gender === "female") base = state.stampDutyFemale;
    else if (gender === "joint") base = state.stampDutyJoint;

    // Apply rural concession (typically 1% less in some states)
    if (areaType === "rural" && (selectedState === "Maharashtra" || selectedState === "Delhi")) {
      base = Math.max(2, base - 1);
    }
    return base;
  }, [state, gender, areaType, selectedState]);

  const stampAmount = useMemo(() => propertyValue * (effectiveStampPercent / 100), [propertyValue, effectiveStampPercent]);
  
  // Registration fee capped at ₹30,000 in MH, otherwise flat % in other states
  const regAmount = useMemo(() => {
    const rawFee = propertyValue * (state.registrationFee / 100);
    if (selectedState === "Maharashtra") {
      return Math.min(30000, rawFee);
    }
    return rawFee;
  }, [propertyValue, state, selectedState]);

  const cessAmount = useMemo(() => propertyValue * (state.cessPercent / 100), [propertyValue, state]);
  
  const totalCharges = useMemo(() => stampAmount + regAmount + cessAmount, [stampAmount, regAmount, cessAmount]);

  return (
    <main className="min-h-screen bg-[#FFFDF7] pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-[#B8860B] font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Trends & Insights
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center shadow-lg border border-[#B8860B]/20">
            <Landmark size={26} className="text-[#B8860B]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0D1B2A]">Stamp Duty Calculator</h1>
            <p className="text-[#888] text-sm mt-0.5">Calculate state-specific registration taxes, cess charges, and buyer concessions</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mt-10">
          {/* Inputs Panel */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#0D1B2A] flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-[#B8860B]" />
              Calculator Settings
            </h2>

            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui">Estimated Property Value</label>
                <span className="text-sm font-bold text-[#B8860B] font-ui">₹{(propertyValue / 100000).toFixed(1)} Lakhs (₹{propertyValue.toLocaleString()})</span>
              </div>
              <input 
                type="range" 
                min={1000000} 
                max={50000000} 
                step={500000} 
                value={propertyValue} 
                onChange={e => setPropertyValue(+e.target.value)} 
                className="w-full accent-[#B8860B] h-2 bg-[#F7F3E8] rounded-lg cursor-pointer"
              />
            </div>

            {/* State Grid selection */}
            <div>
              <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui block mb-3">Select Jurisdiction State</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {STATES.map(s => (
                  <button 
                    key={s.name} 
                    onClick={() => setSelectedState(s.name)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold font-ui transition-all ${
                      selectedState === s.name 
                        ? "bg-[#0D1B2A] text-[#B8860B] shadow-sm" 
                        : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70 hover:bg-[#F5E6C0]/40"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Gender concessions */}
            <div>
              <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui block mb-3">Buyer Ownership Profile</label>
              <div className="flex gap-2">
                {(["male", "female", "joint"] as const).map(g => (
                  <button 
                    key={g} 
                    onClick={() => setGender(g)}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider font-ui transition-all ${
                      gender === g 
                        ? "bg-[#B8860B] text-white shadow-sm" 
                        : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70"
                    }`}
                  >
                    {g === "joint" ? "Joint (Male + Female)" : g}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Type (Urban/Rural) */}
            <div>
              <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui block mb-3">Locality Classification</label>
              <div className="flex gap-2">
                {(["urban", "rural"] as const).map(a => (
                  <button 
                    key={a} 
                    onClick={() => setAreaType(a)}
                    className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider font-ui transition-all ${
                      areaType === a 
                        ? "bg-[#0D1B2A] text-[#B8860B] shadow-sm" 
                        : "bg-[#F7F3E8]/50 text-[#0D1B2A]/70"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Receipt Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-md relative overflow-hidden flex flex-col justify-between h-full">
              {/* Decorative side sweep */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B8860B] to-[#D4A017]" />
              
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0D1B2A] mb-1">Fee Receipt Estimate</h3>
                <p className="text-[10px] text-[#888] font-bold font-ui uppercase tracking-wider mb-6">{selectedState} Jurisdiction</p>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2.5 border-b border-[#F7F3E8] text-xs">
                    <span className="font-semibold text-[#555]">Property Value:</span>
                    <span className="font-bold text-[#0D1B2A]">₹{propertyValue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-[#F7F3E8] text-xs">
                    <div>
                      <span className="font-semibold text-[#555] block">Stamp Duty Tax:</span>
                      <span className="text-[10px] text-[#888]">Rate: {effectiveStampPercent}%</span>
                    </div>
                    <span className="font-bold text-[#0D1B2A]">₹{Math.round(stampAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2.5 border-b border-[#F7F3E8] text-xs">
                    <div>
                      <span className="font-semibold text-[#555] block">Registration Fee:</span>
                      <span className="text-[10px] text-[#888]">
                        {selectedState === "Maharashtra" ? "Capped at ₹30,000" : `Rate: ${state.registrationFee}%`}
                      </span>
                    </div>
                    <span className="font-bold text-[#0D1B2A]">₹{Math.round(regAmount).toLocaleString()}</span>
                  </div>
                  {cessAmount > 0 && (
                    <div className="flex justify-between items-center py-2.5 border-b border-[#F7F3E8] text-xs">
                      <div>
                        <span className="font-semibold text-[#555] block">Municipal Cess/Surcharges:</span>
                        <span className="text-[10px] text-[#888]">Rate: {state.cessPercent}%</span>
                      </div>
                      <span className="font-bold text-[#0D1B2A]">₹{Math.round(cessAmount).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-dashed border-[#F7F3E8]">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-[#0D1B2A] text-sm uppercase font-ui tracking-wider">Estimated Total</span>
                  <span className="font-serif text-2xl font-bold text-[#B8860B]">₹{Math.round(totalCharges).toLocaleString()}</span>
                </div>
                {selectedState === "Maharashtra" && gender === "female" && (
                  <p className="text-[10px] text-emerald-600 font-semibold text-center bg-emerald-50 rounded-lg p-2.5">
                    🎉 Female buyer concession of -1.0% stamp duty applied!
                  </p>
                )}
                {selectedState === "Delhi" && gender === "female" && (
                  <p className="text-[10px] text-emerald-600 font-semibold text-center bg-emerald-50 rounded-lg p-2.5">
                    🎉 Female buyer concession of -2.0% stamp duty applied!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
