"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Calculator, IndianRupee, Sparkles, TrendingUp, Info } from "lucide-react";

export default function EMICalculatorPage() {
  const [principal, setPrincipal] = useState(6000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  // Prepayment Simulator states
  const [simulatePrepay, setSimulatePrepay] = useState(false);
  const [prepayAmount, setPrepayAmount] = useState(50000); // annual prepayment

  // Computations
  const r = useMemo(() => (rate / 12) / 100, [rate]);
  const n = useMemo(() => tenure * 12, [tenure]);

  const emi = useMemo(() => {
    if (r === 0) return principal / n;
    return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [principal, r, n]);

  const totalPayment = useMemo(() => emi * n, [emi, n]);
  const totalInterest = useMemo(() => totalPayment - principal, [totalPayment, principal]);

  // Year-by-Year Amortization Schedule (Standard)
  const amortizationSchedule = useMemo(() => {
    let balance = principal;
    const schedule = [];
    const monthlyRate = (rate / 100) / 12;

    for (let year = 1; year <= tenure; year++) {
      let principalPaidYearly = 0;
      let interestPaidYearly = 0;

      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        const principalPaid = emi - interest;
        interestPaidYearly += interest;
        principalPaidYearly += principalPaid;
        balance -= principalPaid;
        if (balance < 0) balance = 0;
      }

      schedule.push({
        year,
        openingBalance: balance + principalPaidYearly,
        principalPaid: principalPaidYearly,
        interestPaid: interestPaidYearly,
        closingBalance: balance,
      });
    }
    return schedule;
  }, [principal, rate, tenure, emi]);

  // Simulated prepayments: how many months saved and interest saved
  const prepayResults = useMemo(() => {
    if (!simulatePrepay || prepayAmount <= 0) return null;

    let balance = principal;
    const monthlyRate = (rate / 100) / 12;
    let totalInterestPaidPrepay = 0;
    let monthsElapsed = 0;
    const maxMonths = 360; // 30 year limit

    while (balance > 0 && monthsElapsed < maxMonths) {
      monthsElapsed++;
      const interest = balance * monthlyRate;
      let principalPaid = emi - interest;
      
      balance -= principalPaid;

      // Apply annual prepayment every 12 months
      if (monthsElapsed % 12 === 0 && balance > 0) {
        balance -= prepayAmount;
      }

      totalInterestPaidPrepay += interest;

      if (balance <= 0) {
        balance = 0;
        break;
      }
    }

    const tenureSavedMonths = Math.max(0, n - monthsElapsed);
    const tenureSavedYears = parseFloat((tenureSavedMonths / 12).toFixed(1));
    const interestSaved = Math.max(0, totalInterest - totalInterestPaidPrepay);

    return {
      monthsElapsed,
      yearsElapsed: parseFloat((monthsElapsed / 12).toFixed(1)),
      tenureSavedYears,
      interestSaved,
    };
  }, [simulatePrepay, prepayAmount, principal, rate, emi, n, totalInterest]);

  return (
    <main className="min-h-screen bg-[#FFFDF7] pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-[#B8860B] font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Trends & Insights
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center shadow-lg border border-[#B8860B]/20">
            <Calculator size={26} className="text-[#B8860B]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0D1B2A]">EMI Calculator</h1>
            <p className="text-[#888] text-sm mt-0.5">Professional mortgage planner with year-by-year amortization schedules</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mt-10">
          {/* Left Inputs column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
              <h2 className="font-serif text-lg font-bold text-[#0D1B2A] mb-6 flex items-center gap-2">
                <Sparkles size={18} className="text-[#B8860B]" />
                Loan Parameters
              </h2>
              
              <div className="space-y-6">
                {[
                  { label: "Loan Principal Amount", value: principal, set: setPrincipal, min: 1000000, max: 80000000, step: 200000, fmt: `₹${(principal/100000).toFixed(1)} Lakhs` },
                  { label: "Rate of Interest (p.a.)", value: rate, set: setRate, min: 6.5, max: 13, step: 0.1, fmt: `${rate}%` },
                  { label: "Tenure Period", value: tenure, set: setTenure, min: 3, max: 30, step: 1, fmt: `${tenure} Years` },
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

            {/* Prepayment Simulation Panel */}
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-serif text-lg font-bold text-[#0D1B2A]">Prepayment Simulator</h2>
                <input 
                  type="checkbox" 
                  checked={simulatePrepay} 
                  onChange={e => setSimulatePrepay(e.target.checked)}
                  className="w-4 h-4 accent-[#B8860B]"
                />
              </div>

              {simulatePrepay ? (
                <div className="space-y-4">
                  <p className="text-xs text-[#888]">Simulate paying extra lump-sum amounts annually to reduce your tenure and save interest charges.</p>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-[10px] font-bold text-[#0D1B2A] uppercase tracking-wider font-ui">Annual Prepayment Amount</label>
                      <span className="text-xs font-bold text-[#B8860B] font-ui">₹{prepayAmount.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min={10000} 
                      max={500000} 
                      step={10000} 
                      value={prepayAmount} 
                      onChange={e => setPrepayAmount(+e.target.value)} 
                      className="w-full accent-[#B8860B] h-1.5 bg-[#F7F3E8] rounded-lg cursor-pointer"
                    />
                  </div>

                  {prepayResults && (
                    <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2 text-xs">
                      <div className="flex justify-between items-center text-emerald-800">
                        <span className="font-semibold">Interest Savings:</span>
                        <span className="font-bold">₹{Math.round(prepayResults.interestSaved).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-emerald-800">
                        <span className="font-semibold">Tenure Reduced By:</span>
                        <span className="font-bold">{prepayResults.tenureSavedYears} Years</span>
                      </div>
                      <div className="flex justify-between items-center text-emerald-800">
                        <span className="font-semibold">New Duration:</span>
                        <span className="font-bold">{prepayResults.yearsElapsed} Years</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xs text-[#888]">Enable the checkbox to calculate interest savings with recurring prepayment models.</p>
              )}
            </div>
          </div>

          {/* Right Results column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Primary EMI Display Card */}
            <div className="bg-gradient-to-br from-[#0D1B2A] via-[#0D1B2A] to-[#1C3A5E] rounded-3xl p-8 text-white relative overflow-hidden shadow-lg border border-white/5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/10 rounded-bl-full" />
              <p className="text-xs font-ui uppercase tracking-widest text-[#B8860B] mb-2 font-bold">Calculated Monthly Installment (EMI)</p>
              <div className="flex items-baseline gap-1">
                <IndianRupee size={32} className="text-[#B8860B]" />
                <span className="font-serif text-4xl md:text-5xl font-bold">{Math.round(emi).toLocaleString()}</span>
                <span className="text-white/40 text-sm ml-2">/ month</span>
              </div>
            </div>

            {/* Split Breakdown */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-[#F7F3E8] p-5 shadow-sm">
                <p className="text-[10px] font-bold font-ui uppercase tracking-wider text-[#888] mb-1.5">Total Principal</p>
                <p className="font-serif text-xl font-bold text-[#0D1B2A]">₹{principal.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-2xl border border-[#F7F3E8] p-5 shadow-sm">
                <p className="text-[10px] font-bold font-ui uppercase tracking-wider text-[#888] mb-1.5">Total Interest Paid</p>
                <p className="font-serif text-xl font-bold text-red-500">₹{Math.round(totalInterest).toLocaleString()}</p>
              </div>
            </div>

            {/* Ratio visual Bar */}
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-6 shadow-sm">
              <div className="flex justify-between items-center text-xs font-bold mb-3 font-ui uppercase tracking-wider text-[#888]">
                <span>Principal share</span>
                <span>Interest share</span>
              </div>
              <div className="h-4 rounded-full overflow-hidden flex">
                <div className="bg-[#B8860B] h-full transition-all duration-700" style={{ width: `${(principal / totalPayment) * 100}%` }} />
                <div className="bg-red-400 h-full flex-1" />
              </div>
              <div className="flex justify-between text-xs mt-3 font-semibold">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#B8860B]" />Principal ({Math.round((principal / totalPayment) * 100)}%)</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" />Interest ({Math.round((totalInterest / totalPayment) * 100)}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amortization Table */}
        <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 mt-10 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-[#0D1B2A] mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#B8860B]" />
            Yearly Amortization Schedule
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#F7F3E8] pb-4">
                  {["Year", "Opening Balance", "Principal Paid", "Interest Paid", "Closing Balance"].map(h => (
                    <th key={h} className="py-3 px-4 text-[10px] font-bold font-ui uppercase tracking-wider text-[#888]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {amortizationSchedule.map(row => (
                  <tr key={row.year} className="border-b border-[#F7F3E8]/60 hover:bg-[#F5E6C0]/10 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0D1B2A]">Year {row.year}</td>
                    <td className="py-3.5 px-4 text-[#555] font-medium">₹{Math.round(row.openingBalance).toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold">₹{Math.round(row.principalPaid).toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-red-500 font-bold">₹{Math.round(row.interestPaid).toLocaleString()}</td>
                    <td className="py-3.5 px-4 text-[#0D1B2A] font-bold">₹{Math.round(row.closingBalance).toLocaleString()}</td>
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
