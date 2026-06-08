"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Building2, Landmark, Sparkles } from "lucide-react";

export default function RentBuyCalcPage() {
  const [rent, setRent] = useState(25000);
  const [rentIncrease, setRentIncrease] = useState(6);
  const [propertyPrice, setPropertyPrice] = useState(6000000);
  const [downPaymentPerc, setDownPaymentPerc] = useState(20);
  const [loanRate, setLoanRate] = useState(8.5);
  const [appreciation, setAppreciation] = useState(7);
  const [years, setYears] = useState(15);

  // Computations
  const downPayment = useMemo(() => propertyPrice * (downPaymentPerc / 100), [propertyPrice, downPaymentPerc]);
  const loanAmt = useMemo(() => propertyPrice - downPayment, [propertyPrice, downPayment]);
  
  const emi = useMemo(() => {
    const r = (loanRate / 100) / 12;
    const n = years * 12;
    if (r === 0) return loanAmt / n;
    return (loanAmt * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  }, [loanAmt, loanRate, years]);

  // Year-by-Year Cumulative Cost curves
  const curvesData = useMemo(() => {
    const rentCurve = [];
    const buyCurve = [];
    
    let currentRent = rent;
    let rentSum = 0;
    
    const r = (loanRate / 100) / 12;
    const n = years * 12;
    const monthlyEmi = (loanAmt * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    for (let y = 1; y <= years; y++) {
      // Rent cumulative
      rentSum += currentRent * 12;
      rentCurve.push({ year: y, cost: rentSum });
      currentRent *= (1 + rentIncrease / 100);

      // Buy cumulative net cost: Down Payment + EMIs paid - appreciation gain
      const emisPaid = monthlyEmi * y * 12;
      const appreciatedVal = propertyPrice * Math.pow(1 + appreciation / 100, y);
      const buyNet = downPayment + emisPaid - (appreciatedVal - propertyPrice);
      buyCurve.push({ year: y, cost: buyNet });
    }

    return { rentCurve, buyCurve };
  }, [rent, rentIncrease, propertyPrice, downPaymentPerc, loanRate, appreciation, years, loanAmt, downPayment]);

  const totalRent = useMemo(() => {
    const len = curvesData.rentCurve.length;
    return len > 0 ? curvesData.rentCurve[len - 1].cost : 0;
  }, [curvesData]);

  const netBuyCost = useMemo(() => {
    const len = curvesData.buyCurve.length;
    return len > 0 ? curvesData.buyCurve[len - 1].cost : 0;
  }, [curvesData]);

  const savings = useMemo(() => totalRent - netBuyCost, [totalRent, netBuyCost]);

  // SVG Chart Projections
  const chartWidth = 500;
  const chartHeight = 240;
  const padding = 40;

  const maxVal = useMemo(() => {
    const rentMax = totalRent;
    const buyMax = Math.max(...curvesData.buyCurve.map(c => c.cost), 0);
    return Math.max(rentMax, buyMax, 1000000) * 1.1;
  }, [totalRent, curvesData]);

  const minVal = useMemo(() => {
    const buyMin = Math.min(...curvesData.buyCurve.map(c => c.cost), 0);
    return Math.min(0, buyMin) * 1.1;
  }, [curvesData]);

  const rentPoints = useMemo(() => {
    const deltaX = (chartWidth - padding * 2) / (years - 1);
    const rangeY = maxVal - minVal;
    return curvesData.rentCurve.map((pt) => {
      const x = padding + (pt.year - 1) * deltaX;
      const y = chartHeight - padding - ((pt.cost - minVal) / rangeY) * (chartHeight - padding * 2);
      return { x, y };
    });
  }, [curvesData, years, maxVal, minVal]);

  const buyPoints = useMemo(() => {
    const deltaX = (chartWidth - padding * 2) / (years - 1);
    const rangeY = maxVal - minVal;
    return curvesData.buyCurve.map((pt) => {
      const x = padding + (pt.year - 1) * deltaX;
      const y = chartHeight - padding - ((pt.cost - minVal) / rangeY) * (chartHeight - padding * 2);
      return { x, y };
    });
  }, [curvesData, years, maxVal, minVal]);

  const rentPath = useMemo(() => {
    return rentPoints.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, "");
  }, [rentPoints]);

  const buyPath = useMemo(() => {
    return buyPoints.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, "");
  }, [buyPoints]);

  return (
    <main className="min-h-screen bg-[#FFFDF7] pt-32 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <Link href="/trends-insights" className="inline-flex items-center gap-2 text-sm text-[#B8860B] font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={16} /> Back to Trends & Insights
        </Link>

        <div className="flex items-center gap-4 mb-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center shadow-lg border border-[#B8860B]/20">
            <Building2 size={26} className="text-[#B8860B]" />
          </div>
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#0D1B2A]">Rent vs Buy Calculator</h1>
            <p className="text-[#888] text-sm mt-0.5">Dual-trajectory curves mapping cumulative renting outflows vs net buy costs</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 mt-10">
          {/* Sliders panel */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm space-y-6">
            <h2 className="font-serif text-lg font-bold text-[#0D1B2A] flex items-center gap-2">
              <Sparkles size={18} className="text-[#B8860B]" />
              Comparative Settings
            </h2>

            <div className="space-y-5">
              {[
                { label: "Base Monthly Rent", value: rent, set: setRent, min: 10000, max: 150000, step: 2000, fmt: `₹${rent.toLocaleString()}` },
                { label: "Annual Rent escalation", value: rentIncrease, set: setRentIncrease, min: 3, max: 15, step: 0.5, fmt: `${rentIncrease}%` },
                { label: "Property Price", value: propertyPrice, set: setPropertyPrice, min: 2000000, max: 30000000, step: 200000, fmt: `₹${(propertyPrice/100000).toFixed(1)}L` },
                { label: "Down Payment share", value: downPaymentPerc, set: setDownPaymentPerc, min: 10, max: 50, step: 5, fmt: `${downPaymentPerc}% (₹${(downPayment/100000).toFixed(1)}L)` },
                { label: "Loan rate of interest", value: loanRate, set: setLoanRate, min: 7, max: 12, step: 0.1, fmt: `${loanRate}%` },
                { label: "Assumed Appreciation", value: appreciation, set: setAppreciation, min: 3, max: 15, step: 0.5, fmt: `${appreciation}%` },
                { label: "Timeline horizon", value: years, set: setYears, min: 3, max: 25, step: 1, fmt: `${years} Years` },
              ].map(s => (
                <div key={s.label}>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-[#0D1B2A] uppercase tracking-wider font-ui">{s.label}</label>
                    <span className="text-xs font-bold text-[#B8860B] font-ui">{s.fmt}</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} step={s.step} value={s.value} onChange={e => s.set(+e.target.value)} className="w-full accent-[#B8860B] h-1.5 bg-[#F7F3E8] rounded-lg cursor-pointer" />
                </div>
              ))}
            </div>
          </div>

          {/* Graphical Projections Panel */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-3xl border border-[#F7F3E8] p-8 shadow-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#0D1B2A]">Cumulative Cost Projections</h3>
                  <p className="text-xs text-[#888] mt-0.5">Comparing renting outflows vs net buying cost (down payment + EMIs - appreciation)</p>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold font-ui uppercase tracking-wider text-[#888]">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-500" /> Renting</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#B8860B]" /> Buying</span>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="w-full overflow-hidden">
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-auto">
                  {/* Axis line */}
                  <line x1={padding} y1={chartHeight - padding} x2={chartWidth - padding} y2={chartHeight - padding} stroke="#F7F3E8" strokeWidth={2} />
                  
                  {/* Rent curve path */}
                  <path d={rentPath} fill="none" stroke="#3B82F6" strokeWidth={3} strokeLinecap="round" className="transition-all duration-500" />
                  
                  {/* Buy curve path */}
                  <path d={buyPath} fill="none" stroke="#B8860B" strokeWidth={3} strokeLinecap="round" className="transition-all duration-500" />

                  {/* Start Point Dot */}
                  <circle cx={padding} cy={chartHeight - padding} r={4} fill="#0D1B2A" />

                  {/* Year labels */}
                  <text x={padding} y={chartHeight - 12} textAnchor="middle" className="text-[10px] font-bold fill-[#888]">Y1</text>
                  <text x={chartWidth / 2} y={chartHeight - 12} textAnchor="middle" className="text-[10px] font-bold fill-[#888]">Y{Math.round(years / 2)}</text>
                  <text x={chartWidth - padding} y={chartHeight - 12} textAnchor="middle" className="text-[10px] font-bold fill-[#888]">Y{years}</text>
                </svg>
              </div>
            </div>

            {/* Verdict Box */}
            <div className={`rounded-3xl p-8 border-2 ${
              savings > 0 ? "bg-gradient-to-br from-[#F5E6C0]/20 to-white border-[#B8860B]/30" : "bg-gradient-to-br from-blue-50/20 to-white border-blue-200"
            }`}>
              <span className="text-[10px] font-bold font-ui uppercase tracking-widest text-[#888] block mb-1">Recommendation</span>
              <p className="font-serif text-2xl font-bold text-[#0D1B2A] mb-2">{savings > 0 ? "🏠 Buying Wins!" : "🏢 Renting Wins!"}</p>
              <p className="text-sm text-[#555] leading-relaxed">
                Over the simulated horizon of {years} years, choosing to {savings > 0 ? "buy" : "rent"} saves you approximately <span className="font-bold text-[#B8860B]">₹{Math.abs(Math.round(savings)).toLocaleString()}</span> in net capital expenditures.
              </p>
            </div>

            {/* Breakdown card list */}
            <div className="bg-white rounded-2xl border border-[#F7F3E8] p-6 space-y-3">
              <h3 className="font-serif text-base font-bold text-[#0D1B2A] mb-2">Simulation Summary</h3>
              {[
                { label: "Total Rent Cost", value: `₹${Math.round(totalRent).toLocaleString()}`, desc: `Accumulated with +${rentIncrease}% escalation` },
                { label: "Net Buy Cost", value: `₹${Math.round(Math.abs(netBuyCost)).toLocaleString()}`, desc: netBuyCost < 0 ? "Net Gain generated" : "Net Outflow cost" },
                { label: "Monthly EMI", value: `₹${Math.round(emi).toLocaleString()}`, desc: `For a loan of ₹${(loanAmt/100000).toFixed(1)}L` },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2.5 border-b border-[#F7F3E8]/50 last:border-0">
                  <div>
                    <span className="text-xs font-bold text-[#0D1B2A]">{item.label}</span>
                    <p className="text-[10px] text-[#888] mt-0.5">{item.desc}</p>
                  </div>
                  <span className="text-sm font-bold text-[#0D1B2A]">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
