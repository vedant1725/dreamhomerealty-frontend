"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Calculator, TrendingUp, Info } from "lucide-react";

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);

  // EMI Formula: P x R x (1+R)^N / [(1+R)^N-1]
  // P = Principal loan amount
  // R = rate of interest calculated per month (8.5/12/100)
  // N = tenure in months (20 * 12)
  const r = (interestRate / 12) / 100;
  const n = tenure * 12;
  const emi = loanAmount * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
  const totalAmount = emi * n;
  const totalInterest = totalAmount - loanAmount;

  return (
    <main className="min-h-screen bg-[#FFFDF7] flex flex-col">
      <Navbar />
      
      <div className="bg-[#0D1B2A] pt-32 pb-16">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label text-[#F5E6C0] mb-4">Financial Tools</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Home Loan EMI Calculator
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Plan your home purchase by calculating your monthly Equated Monthly Installment (EMI) accurately.
          </p>
        </div>
      </div>

      <section className="section-padding flex-1">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            
            {/* Calculator Controls */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_2px_20px_rgba(13,27,42,0.07)] border border-[#F7F3E8]">
              <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[#F7F3E8]">
                <div className="w-12 h-12 rounded-xl bg-[#0D1B2A] flex items-center justify-center text-white"><Calculator /></div>
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#0D1B2A]">Calculate EMI</h2>
                  <p className="text-sm text-[#888]">Adjust the sliders to see your monthly breakdown</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-[#0D1B2A]">Loan Amount</label>
                    <div className="bg-[#F5E6C0] text-[#B8860B] font-bold px-4 py-1.5 rounded-lg">₹ {loanAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <input type="range" min="100000" max="100000000" step="100000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} className="w-full accent-[#B8860B]" />
                  <div className="flex justify-between text-xs text-[#888] mt-2"><span>₹1 Lakh</span><span>₹10 Cr</span></div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-[#0D1B2A]">Interest Rate (p.a.)</label>
                    <div className="bg-[#F5E6C0] text-[#B8860B] font-bold px-4 py-1.5 rounded-lg">{interestRate.toFixed(1)} %</div>
                  </div>
                  <input type="range" min="5" max="15" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full accent-[#B8860B]" />
                  <div className="flex justify-between text-xs text-[#888] mt-2"><span>5%</span><span>15%</span></div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="font-bold text-[#0D1B2A]">Loan Tenure</label>
                    <div className="bg-[#F5E6C0] text-[#B8860B] font-bold px-4 py-1.5 rounded-lg">{tenure} Years</div>
                  </div>
                  <input type="range" min="1" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full accent-[#B8860B]" />
                  <div className="flex justify-between text-xs text-[#888] mt-2"><span>1 Year</span><span>30 Years</span></div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              <div className="bg-[#0D1B2A] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/20 rounded-full blur-2xl"></div>
                <p className="text-white/60 font-ui uppercase tracking-wider text-xs mb-2">Monthly Home EMI</p>
                <h3 className="font-serif text-5xl font-bold text-[#B8860B] mb-8">₹{Math.round(emi).toLocaleString('en-IN')}</h3>
                
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Principal Amount</span>
                    <span className="font-bold">₹{loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">Total Interest Payable</span>
                    <span className="font-bold text-red-400">₹{Math.round(totalInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="font-bold text-white">Total Payment</span>
                    <span className="font-bold text-emerald-400">₹{Math.round(totalAmount).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#F7F3E8] flex gap-3 text-sm text-[#555]">
                <Info size={20} className="text-[#B8860B] shrink-0" />
                <p>These calculations are indicative. Actual interest rates and EMIs are subject to the bank's approval and processing fees.</p>
              </div>

              <button className="btn-gold w-full py-4 rounded-xl text-base">Explore Home Loans</button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
