"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Building2, TrendingUp, HelpCircle, Info, Landmark } from "lucide-react";

export default function RentVsBuyPage() {
  const [monthlyRent, setMonthlyRent] = useState(25000);
  const [rentIncrease, setRentIncrease] = useState(7);
  const [propertyPrice, setPropertyPrice] = useState(6500000);
  const [downPaymentPerc, setDownPaymentPerc] = useState(20);
  const [loanRate, setLoanRate] = useState(8.5);
  const [appreciation, setAppreciation] = useState(6.5);
  const [years, setYears] = useState(10);

  // Computations
  const downPayment = useMemo(() => propertyPrice * (downPaymentPerc / 100), [propertyPrice, downPaymentPerc]);
  const loanAmount = useMemo(() => propertyPrice - downPayment, [propertyPrice, downPayment]);
  
  // EMI Formula: P * r * (1+r)^n / ((1+r)^n - 1)
  const emi = useMemo(() => {
    const r = (loanRate / 100) / 12;
    const n = years * 12;
    if (r === 0) return loanAmount / n;
    return (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [loanAmount, loanRate, years]);

  // Cumulative Rent with annual escalation
  const totalRent = useMemo(() => {
    let sum = 0;
    let current = monthlyRent;
    for (let i = 0; i < years; i++) {
      sum += current * 12;
      current *= (1 + rentIncrease / 100);
    }
    return Math.round(sum);
  }, [monthlyRent, rentIncrease, years]);

  // Buying Cost Breakdown
  const totalEMIPaid = useMemo(() => emi * years * 12, [emi, years]);
  const interestCost = useMemo(() => totalEMIPaid - loanAmount, [totalEMIPaid, loanAmount]);
  const futurePropertyValue = useMemo(() => propertyPrice * Math.pow(1 + appreciation / 100, years), [propertyPrice, appreciation, years]);
  
  // Opportunity cost of Down Payment invested elsewhere at e.g. 9% return
  const opportunityCost = useMemo(() => {
    const altReturn = 0.09;
    return Math.round(downPayment * (Math.pow(1 + altReturn, years) - 1));
  }, [downPayment, years]);

  // Net cost of buying: Down Payment + EMIs + Opportunity Cost - Future Value
  const netBuyCost = useMemo(() => {
    return Math.round(downPayment + totalEMIPaid + opportunityCost - futurePropertyValue);
  }, [downPayment, totalEMIPaid, opportunityCost, futurePropertyValue]);

  const verdict = useMemo(() => {
    return totalRent < netBuyCost ? "Renting" : "Buying";
  }, [totalRent, netBuyCost]);

  const savingsAmount = useMemo(() => Math.abs(totalRent - netBuyCost), [totalRent, netBuyCost]);

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
            <span className="text-[11px] font-bold font-ui uppercase tracking-[0.2em] text-[#B8860B]">Advisory Simulator</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">Rent vs Buy Analysis</h1>
          <p className="text-base text-white/40 max-w-xl">A complete financial comparison accounting for rental escalations, asset appreciation, and investment opportunity costs.</p>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-20">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Sliders Input Panel */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#F7F3E8] shadow-[0_12px_40px_rgba(13,27,42,0.06)] p-8">
            <h2 className="font-serif text-xl font-bold text-[#0D1B2A] mb-8 flex items-center gap-2">
              <Landmark size={20} className="text-[#B8860B]" />
              Simulation Inputs
            </h2>

            <div className="space-y-6">
              {[
                { label: "Current Monthly Rent", value: monthlyRent, set: setMonthlyRent, min: 10000, max: 150000, step: 2000, fmt: `₹${monthlyRent.toLocaleString()}` },
                { label: "Annual Rent Escalation", value: rentIncrease, set: setRentIncrease, min: 3, max: 15, step: 0.5, fmt: `${rentIncrease}%` },
                { label: "Target Property Price", value: propertyPrice, set: setPropertyPrice, min: 2000000, max: 30000000, step: 200000, fmt: `₹${(propertyPrice / 100000).toFixed(1)}L` },
                { label: "Down Payment Share", value: downPaymentPerc, set: setDownPaymentPerc, min: 10, max: 40, step: 5, fmt: `${downPaymentPerc}% (₹${(downPayment/100000).toFixed(1)}L)` },
                { label: "Mortgage Interest Rate", value: loanRate, set: setLoanRate, min: 7, max: 12, step: 0.1, fmt: `${loanRate}%` },
                { label: "Expected Annual Appreciation", value: appreciation, set: setAppreciation, min: 3, max: 15, step: 0.5, fmt: `${appreciation}%` },
                { label: "Simulated Holding Period", value: years, set: setYears, min: 3, max: 25, step: 1, fmt: `${years} Years` },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-bold text-[#0D1B2A] font-ui uppercase tracking-wider">{s.label}</label>
                    <span className="text-xs font-bold text-[#B8860B] font-ui">{s.fmt}</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={e => s.set(+e.target.value)} className="w-full accent-[#B8860B] h-2 bg-[#F7F3E8] rounded-lg cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* Results Analysis */}
          <div className="lg:col-span-3 space-y-6">
            {/* Side by Side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Rent Column */}
              <div className="bg-white rounded-2xl border border-[#F7F3E8] p-6 flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"><Building2 size={20} className="text-blue-600" /></div>
                    <div>
                      <p className="text-[10px] font-bold font-ui uppercase tracking-widest text-[#888]">Strategy 1</p>
                      <h3 className="font-serif text-base font-bold text-[#0D1B2A]">Renting Assets</h3>
                    </div>
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#1C3A5E]">₹{totalRent.toLocaleString()}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#F7F3E8] text-xs text-[#888]">
                  Cumulative rent paid over {years} years with {rentIncrease}% annual increase.
                </div>
              </div>

              {/* Buy Column */}
              <div className="bg-white rounded-2xl border border-[#F7F3E8] p-6 flex flex-col justify-between hover:shadow-md transition-all">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F5E6C0]/50 flex items-center justify-center"><Home size={20} className="text-[#B8860B]" /></div>
                    <div>
                      <p className="text-[10px] font-bold font-ui uppercase tracking-widest text-[#888]">Strategy 2</p>
                      <h3 className="font-serif text-base font-bold text-[#0D1B2A]">Buying Asset (Net)</h3>
                    </div>
                  </div>
                  <p className="font-serif text-3xl font-bold text-[#B8860B]">₹{Math.max(0, netBuyCost).toLocaleString()}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#F7F3E8] text-xs text-[#888]">
                  {netBuyCost < 0 
                    ? "Net profit generated after appreciation, principal, and capital costs."
                    : "Net cost of purchase accounting for property price inflation."
                  }
                </div>
              </div>
            </div>

            {/* Premium Recommendation Box */}
            <div className={`rounded-3xl p-8 border-2 ${
              verdict === "Buying" 
                ? "bg-gradient-to-br from-[#F5E6C0]/20 to-white border-[#B8860B]/30" 
                : "bg-gradient-to-br from-blue-50/20 to-white border-blue-200"
            }`}>
              <span className="text-[10px] font-bold font-ui uppercase tracking-[0.2em] text-[#888] block mb-2">DreamHome Verdict</span>
              <h3 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-3 flex items-center gap-2">
                {verdict === "Buying" ? "🏠 Buying is highly favorable" : "🏢 Renting yields better returns"}
              </h3>
              <p className="text-sm text-[#555] leading-relaxed mb-4">
                By choosing to {verdict.toLowerCase()}, you would save approximately <span className="font-bold text-[#B8860B]">₹{savingsAmount.toLocaleString()}</span> over the course of {years} years.
              </p>
              <div className="flex items-start gap-2 text-xs text-[#888] bg-white/50 rounded-xl p-3 border border-[#F7F3E8]">
                <Info size={14} className="text-[#B8860B] shrink-0 mt-0.5" />
                <p>Calculations include down payment opportunity cost at a benchmark 9% alternative stock index yield, principal amortization, and property appreciation.</p>
              </div>
            </div>

            {/* Buying Deep Breakdown */}
            <div className="bg-white rounded-2xl border border-[#F7F3E8] p-6">
              <h3 className="font-serif text-lg font-bold text-[#0D1B2A] mb-4">Detailed Financial Parameters</h3>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { label: "Monthly EMI", value: `₹${Math.round(emi).toLocaleString()}`, desc: "Based on 8.5% interest" },
                  { label: "Total EMI Payments", value: `₹${Math.round(totalEMIPaid).toLocaleString()}`, desc: "Cumulative principal & interest" },
                  { label: "Future Valuation", value: `₹${Math.round(futurePropertyValue).toLocaleString()}`, desc: `Estimated at +${appreciation}% appreciation` },
                  { label: "Opportunity cost", value: `₹${opportunityCost.toLocaleString()}`, desc: "Alternative Down Payment yield at 9%" },
                ].map(item => (
                  <div key={item.label} className="py-2.5 border-b border-[#F7F3E8]/60 last:border-0 sm:last:border-b">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-xs font-semibold text-[#555]">{item.label}</span>
                      <span className="text-sm font-bold text-[#0D1B2A]">{item.value}</span>
                    </div>
                    <p className="text-[10px] text-[#888]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
