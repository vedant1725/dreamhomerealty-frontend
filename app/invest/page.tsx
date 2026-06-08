import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { TrendingUp, PieChart, BarChart3, Shield, ArrowRight, MapPin, BadgeCheck, Calculator } from "lucide-react";

const INVESTMENTS = [
  {
    title: "Grade A Office Space — HITEC City",
    location: "Hyderabad, Telangana",
    minInvestment: "₹25 Lakh",
    expectedReturn: "8.2%",
    targetIRR: "14.5%",
    riskLevel: "Low",
    lockIn: "36 months",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=900",
    assetType: "Commercial",
    funded: 72,
  },
  {
    title: "Luxury Co-Living Development",
    location: "Koramangala, Bangalore",
    minInvestment: "₹10 Lakh",
    expectedReturn: "7.5%",
    targetIRR: "13.8%",
    riskLevel: "Medium",
    lockIn: "24 months",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=900",
    assetType: "Residential Yield",
    funded: 45,
  },
  {
    title: "Retail Promenade — Phoenix Mall",
    location: "Pune, Maharashtra",
    minInvestment: "₹50 Lakh",
    expectedReturn: "9.1%",
    targetIRR: "16.2%",
    riskLevel: "Low",
    lockIn: "48 months",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=900",
    assetType: "Retail Commercial",
    funded: 88,
  },
];

export default function InvestPage() {
  return (
    <main className="bg-[#FFFDF7]">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-[#0D1B2A] pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B8860B]/8 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-[#B8860B]/20 border border-[#B8860B]/40 rounded-full px-4 py-2 mb-6">
            <TrendingUp size={14} className="text-[#B8860B]" />
            <span className="text-white/90 text-xs font-bold font-ui uppercase tracking-widest">Fractional Real Estate Investment</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Build Wealth Through <br /><span className="text-[#B8860B]">Strategic Property Assets</span>
          </h1>
          <p className="text-white/65 text-lg max-w-2xl mx-auto mb-10">
            Access institutional-grade commercial and premium residential investment opportunities starting from ₹10 Lakh. Previously reserved for the ultra-wealthy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-gold py-4 px-10 text-base">View Opportunities</button>
            <button className="btn-outline border-white/25 text-white hover:bg-white hover:text-[#0D1B2A] py-4 px-10 text-base">Download Research Report</button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="relative z-20 max-w-screen-xl mx-auto px-4 sm:px-6 -mt-10 mb-16">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: TrendingUp, value: "8.5%", label: "Average Annual Yield", sub: "Across all assets" },
            { icon: PieChart, value: "₹2,500 Cr+", label: "Assets Under Management", sub: "Across 18 properties" },
            { icon: BarChart3, value: "42%", label: "5-Year Capital Appreciation", sub: "On completed assets" },
          ].map(({ icon: Icon, value, label, sub }) => (
            <div key={label} className="bg-white rounded-2xl p-7 shadow-[0_8px_40px_rgba(13,27,42,0.12)] flex items-start gap-5 border border-[#F7F3E8]">
              <div className="w-14 h-14 rounded-xl bg-[#B8860B]/10 flex items-center justify-center text-[#B8860B] shrink-0">
                <Icon size={26} />
              </div>
              <div>
                <p className="font-serif text-3xl font-bold text-[#0D1B2A]">{value}</p>
                <p className="font-bold text-[#0D1B2A] text-sm mt-0.5">{label}</p>
                <p className="text-xs text-[#888] mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <section className="section-padding bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="section-label mb-3">Live Opportunities</span>
              <h2 className="font-serif text-4xl font-bold text-[#0D1B2A]">Current Investment Assets</h2>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {INVESTMENTS.map((inv) => (
              <div key={inv.title} className="bg-[#FFFDF7] border border-[#F7F3E8] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative h-52 overflow-hidden">
                  <img src={inv.image} alt={inv.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="text-[10px] font-bold font-ui uppercase tracking-wider bg-white/90 text-[#0D1B2A] px-3 py-1.5 rounded-full">{inv.assetType}</span>
                    <span className={`text-[10px] font-bold font-ui uppercase tracking-wider px-3 py-1.5 rounded-full ${inv.riskLevel === "Low" ? "bg-emerald-500 text-white" : "bg-[#B8860B] text-white"}`}>{inv.riskLevel} Risk</span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-serif font-bold text-white text-lg leading-tight">{inv.title}</h3>
                    <p className="text-white/75 text-xs flex items-center gap-1 mt-1"><MapPin size={11} className="text-[#B8860B]" />{inv.location}</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-[#F7F3E8]">
                    <div>
                      <p className="text-[10px] text-[#888] font-ui uppercase tracking-wider mb-0.5">Rental Yield</p>
                      <p className="font-bold text-[#0D1B2A] text-lg">{inv.expectedReturn}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#888] font-ui uppercase tracking-wider mb-0.5">Target IRR</p>
                      <p className="font-bold text-[#0D1B2A] text-lg">{inv.targetIRR}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#888] font-ui uppercase tracking-wider mb-0.5">Lock-in</p>
                      <p className="font-bold text-[#0D1B2A] text-sm">{inv.lockIn}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#888]">Funding Progress</span>
                      <span className="font-bold text-[#0D1B2A]">{inv.funded}% funded</span>
                    </div>
                    <div className="h-2 bg-[#F7F3E8] rounded-full overflow-hidden">
                      <div className="h-full bg-[#B8860B] rounded-full" style={{ width: `${inv.funded}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-[#888]">Min. Investment</p>
                      <p className="font-bold text-[#B8860B] text-lg">{inv.minInvestment}</p>
                    </div>
                    <button className="btn-navy py-3 px-6 text-sm rounded-xl">Invest Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Calculator */}
      <section className="section-padding bg-[#0D1B2A] text-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label text-[#F5E6C0] mb-3">Returns Calculator</span>
              <h2 className="font-serif text-4xl font-bold text-white mt-3 mb-5">See Your Investment Grow</h2>
              <p className="text-white/60 leading-relaxed">Estimate your potential returns from DreamHome fractional property investments based on historical performance and projected yields.</p>
              <div className="mt-8 space-y-4">
                {["8.5% average annual yield across all assets", "Capital appreciation of 10-15% per annum", "Monthly rental income distribution", "Fully regulated, SEBI-compliant structure"].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-white/70">
                    <BadgeCheck size={18} className="text-[#B8860B] shrink-0" /> {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calculator size={24} className="text-[#B8860B]" />
                <h3 className="font-bold text-white text-lg">Investment Calculator</h3>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-ui text-white/60 uppercase tracking-wider mb-2 block">Investment Amount</label>
                  <input type="range" min="1000000" max="100000000" step="500000" defaultValue="5000000" className="w-full accent-[#B8860B]" />
                  <div className="flex justify-between text-xs text-white/40 mt-1"><span>₹10L</span><span>₹10Cr</span></div>
                  <p className="text-[#B8860B] font-bold font-serif text-2xl mt-2">₹50,00,000</p>
                </div>
                <div>
                  <label className="text-xs font-ui text-white/60 uppercase tracking-wider mb-2 block">Investment Period</label>
                  <div className="flex gap-2">
                    {["1Y","3Y","5Y","10Y"].map(y => (
                      <button key={y} className="flex-1 py-2.5 rounded-xl text-sm font-bold border border-white/10 text-white/60 hover:border-[#B8860B] hover:text-[#B8860B] transition-all">{y}</button>
                    ))}
                  </div>
                </div>
                <div className="bg-[#B8860B]/10 border border-[#B8860B]/20 rounded-xl p-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-white/50">Projected Value (5Y)</p>
                      <p className="font-serif font-bold text-[#B8860B] text-2xl">₹82.3L</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/50">Total Returns</p>
                      <p className="font-serif font-bold text-emerald-400 text-2xl">+₹32.3L</p>
                    </div>
                  </div>
                  <p className="text-xs text-white/30 mt-3">*Projected only. Past performance does not guarantee future results.</p>
                </div>
                <button className="btn-gold w-full py-4 rounded-xl">Start Investing</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}