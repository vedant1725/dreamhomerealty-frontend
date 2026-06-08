"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, IndianRupee, Sparkles, AlertTriangle } from "lucide-react";

export default function ROICalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState(6000000);
  const [holdingYears, setHoldingYears] = useState(5);
  const [appreciationRate, setAppreciationRate] = useState(7);
  const [rentalIncome, setRentalIncome] = useState(22000);
  const [rentEscalation, setRentEscalation] = useState(5);
  const [expenses, setExpenses] = useState(150000); // cumulative initial expenses like registration, repairs

  // Computations
  const finalValue = useMemo(() => {
    return purchasePrice * Math.pow(1 + appreciationRate / 100, holdingYears);
  }, [purchasePrice, appreciationRate, holdingYears]);

  // Year-by-Year Cash Flow & Yield details
  const cashFlows = useMemo(() => {
    const flows = [];
    let currentRent = rentalIncome;
    let cumulativeRent = 0;

    for (let year = 1; year <= holdingYears; year++) {
      const annualRent = currentRent * 12;
      cumulativeRent += annualRent;
      
      const estimatedValue = purchasePrice * Math.pow(1 + appreciationRate / 100, year);
      const yearAppreciation = estimatedValue - purchasePrice;

      flows.push({
        year,
        rentalIncomeYear: annualRent,
        cumulativeRent,
        propertyValuation: estimatedValue,
        appreciationGained: yearAppreciation,
        netCashFlow: annualRent, // simplified
      });

      // Escalate rent for next year
      currentRent *= (1 + rentEscalation / 100);
    }
    return flows;
  }, [purchasePrice, holdingYears, appreciationRate, rentalIncome, rentEscalation]);

  const totalRentReceived = useMemo(() => {
    return cashFlows.reduce((acc, f) => acc + f.rentalIncomeYear, 0);
  }, [cashFlows]);

  const capitalGain = useMemo(() => finalValue - purchasePrice, [finalValue, purchasePrice]);

  const totalReturn = useMemo(() => {
    return capitalGain + totalRentReceived - expenses;
  }, [capitalGain, totalRentReceived, expenses]);

  const totalRoi = useMemo(() => {
    return (totalReturn / purchasePrice) * 100;
  }, [totalReturn, purchasePrice]);

  const annualizedRoi = useMemo(() => {
    if (totalReturn + purchasePrice <= 0) return 0;
    return (Math.pow(1 + totalReturn / purchasePrice, 1 / holdingYears) - 1) * 100;
  }, [totalReturn, purchasePrice, holdingYears]);

  return (
    <main className="min-h-screen bg-[#FFFDF7] pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-[#B8860B] font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Trends & Insights
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center shadow-lg border border-[#B8860B]/20">
            <TrendingUp size={26} className="text-[#B8860B]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0D1B2A]">ROI Yield Calculator</h1>
            <p className="text-[#888] text-sm mt-0.5">Estimate total capital returns and annualized yields on property investments</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mt-10">
          {/* Inputs Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#0D1B2A] mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-[#B8860B]" />
                Investment Parameters
              </h2>

              <div className="space-y-6">
                {[
                  { label: "Purchase Valuation", value: purchasePrice, set: setPurchasePrice, min: 2000000, max: 80000000, step: 200000, fmt: `₹${(purchasePrice/100000).toFixed(1)}L` },
                  { label: "Holding Duration", value: holdingYears, set: setHoldingYears, min: 2, max: 20, step: 1, fmt: `${holdingYears} Years` },
                  { label: "Expected Annual Appreciation", value: appreciationRate, set: setAppreciationRate, min: 2, max: 15, step: 0.5, fmt: `${appreciationRate}%` },
                  { label: "Base Monthly Rental Income", value: rentalIncome, set: setRentalIncome, min: 5000, max: 200000, step: 1000, fmt: `₹${rentalIncome.toLocaleString()}` },
                  { label: "Annual Rent escalation", value: rentEscalation, set: setRentEscalation, min: 3, max: 12, step: 0.5, fmt: `${rentEscalation}%` },
                  { label: "Upfront holding Expenses", value: expenses, set: setExpenses, min: 20000, max: 2000000, step: 20000, fmt: `₹${(expenses/100000).toFixed(2)}L` },
                ].map(s => (
                  <div key={s.label}>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui">{s.label}</label>
                      <span className="text-xs font-bold text-[#B8860B] font-ui">{s.fmt}</span>
                    </div>
                    <input type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={e => s.set(+e.target.value)} className="w-full accent-[#B8860B] h-2 bg-[#F7F3E8] rounded-lg cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-gradient-to-br from-[#0D1B2A] via-[#0D1B2A] to-[#1C3A5E] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/10 rounded-bl-full" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-ui uppercase tracking-widest text-[#B8860B] mb-1.5 font-bold">Annualized ROI (IRR)</p>
                  <p className="font-serif text-3xl md:text-4xl font-bold text-white">{annualizedRoi.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-xs font-ui uppercase tracking-widest text-[#B8860B] mb-1.5 font-bold">Total Yield Gain</p>
                  <p className="font-serif text-3xl md:text-4xl font-bold text-white">{totalRoi.toFixed(1)}%</p>
                </div>
              </div>
            </div>

            {/* Split returns info */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-[#F7F3E8] p-5 shadow-sm">
                <span className="text-[9px] font-bold font-ui uppercase tracking-wider text-[#888] block mb-1">Expected Asset Valuation (Y{holdingYears})</span>
                <p className="font-serif text-xl font-bold text-emerald-600">₹{Math.round(finalValue).toLocaleString()}</p>
                <p className="text-[10px] text-[#888] mt-0.5">Capital Gain: +₹{Math.round(capitalGain).toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-2xl border border-[#F7F3E8] p-5 shadow-sm">
                <span className="text-[9px] font-bold font-ui uppercase tracking-wider text-[#888] block mb-1">Total Rental income</span>
                <p className="font-serif text-xl font-bold text-[#B8860B]">₹{Math.round(totalRentReceived).toLocaleString()}</p>
                <p className="text-[10px] text-[#888] mt-0.5">Cumulative over {holdingYears}Y</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-6 shadow-sm flex justify-between items-center text-xs">
              <div>
                <span className="font-bold text-[#0D1B2A] font-ui uppercase tracking-wider block">Net Capital Return</span>
                <p className="text-[#888] mt-0.5">After deducting ₹{expenses.toLocaleString()} upfront costs</p>
              </div>
              <span className="font-serif text-2xl font-bold text-emerald-600">₹{Math.round(totalReturn).toLocaleString()}</span>
            </div>

            <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800">
              <AlertTriangle size={16} className="text-[#B8860B] shrink-0 mt-0.5" />
              <p>Real estate yields fluctuate based on occupancy ratios, local maintenance adjustments, and property tax assessments. Projections are estimated parameters.</p>
            </div>
          </div>
        </div>

        {/* Yearly Cash Flow projection */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 mt-10 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#B8860B]" />
            Annual Cash Flow Projections
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#F7F3E8] pb-4">
                  {["Year", "Annual Rent Yield", "Cumulative Rent", "Property Valuation", "Capital Appreciation"].map(h => (
                    <th key={h} className="py-3 px-4 text-[10px] font-bold font-ui uppercase tracking-wider text-[#888]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cashFlows.map(row => (
                  <tr key={row.year} className="border-b border-[#F7F3E8]/60 hover:bg-[#F5E6C0]/10 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0D1B2A]">Year {row.year}</td>
                    <td className="py-3.5 px-4 text-[#0D1B2A] font-semibold">₹{Math.round(row.rentalIncomeYear).toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-[#B8860B] font-bold">₹{Math.round(row.cumulativeRent).toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-[#555] font-semibold">₹{Math.round(row.propertyValuation).toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold">₹{Math.round(row.appreciationGained).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
