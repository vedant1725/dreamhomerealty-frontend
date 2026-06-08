import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Globe, ShieldCheck, FileText, Landmark, BadgeCheck, ArrowRight, Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { PROPERTIES } from "@/lib/data";
import PropertyCard from "@/components/ui/PropertyCard";

const NRI_SERVICES = [
  { icon: Globe, title: "FEMA Compliance Advisory", desc: "Full guidance on Foreign Exchange Management Act regulations for property purchase, repatriation, and rental income." },
  { icon: FileText, title: "Power of Attorney", desc: "Legally draft and execute POA documents so your trusted representative can complete transactions on your behalf." },
  { icon: ShieldCheck, title: "Legal Due Diligence", desc: "Comprehensive title verification, encumbrance check, and document validation by our empanelled lawyers." },
  { icon: Landmark, title: "Home Loan Assistance", desc: "Special NRI home loan programs with India's top banks at preferential rates and simplified documentation." },
  { icon: BadgeCheck, title: "Virtual Site Tours", desc: "HD video walkthroughs and virtual reality tours of shortlisted properties from anywhere in the world." },
  { icon: MessageCircle, title: "Dedicated NRI Desk", desc: "A personal NRI relationship manager available across multiple time zones to assist at every step." },
];

const FEMA_CHECKLIST = [
  "Indian citizens living abroad (NRIs) can freely buy residential or commercial property",
  "No permission required from RBI for acquisition by purchase",
  "Agricultural land, plantation, farmhouses — not permitted without special RBI approval",
  "Rental income can be freely repatriated abroad (net of tax)",
  "Proceeds from sale can be repatriated up to the original purchase cost",
  "Home loans available in Indian rupees; repayable from NRE/NRO accounts",
];

export default function NRIPage() {
  const nriProps = PROPERTIES.filter(p => p.isPremium).slice(0, 3);

  return (
    <main className="bg-[#FFFDF7]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=85&w=2000" alt="World Skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/95 via-[#0D1B2A]/75 to-[#0D1B2A]/30"></div>
        </div>
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#B8860B]/20 border border-[#B8860B]/40 rounded-full px-4 py-2 mb-6">
              <Globe size={14} className="text-[#B8860B]" />
              <span className="text-white/90 text-xs font-bold font-ui uppercase tracking-widest">NRI Investment Desk</span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Invest in India from <span className="text-[#B8860B]">Anywhere</span> in the World
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              FEMA-compliant end-to-end real estate investment advisory for Non-Resident Indians. Virtual tours, legal support, international payments, power of attorney — all handled for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-gold py-4 px-8 text-base">Talk to NRI Advisor <ArrowRight size={18} /></button>
              <button className="btn-outline border-white/30 text-white hover:bg-white hover:text-[#0D1B2A] py-4 px-8 text-base">View NRI Properties</button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <div className="bg-[#B8860B]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4 divide-x divide-white/20">
          {[
            { value: "15%+", label: "Avg. Annual Appreciation" },
            { value: "₹0 Tax", label: "On DTAA Countries" },
            { value: "200+", label: "NRI Clients Served" },
            { value: "48 Hrs", label: "Virtual Tour Setup" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center px-4">
              <p className="font-serif font-bold text-white text-2xl md:text-3xl">{value}</p>
              <p className="text-white/75 text-xs font-ui uppercase tracking-wider mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <section className="section-padding bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label mb-3">Complete NRI Support</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0D1B2A]">Our NRI Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NRI_SERVICES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#FFFDF7] border border-[#F7F3E8] rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-[#0D1B2A] flex items-center justify-center text-[#B8860B] mb-5 group-hover:bg-[#B8860B] group-hover:text-white transition-all duration-300">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif font-bold text-[#0D1B2A] text-xl mb-3">{title}</h3>
                <p className="text-[#555] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEMA Checklist */}
      <section className="section-padding bg-[#F7F3E8]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label mb-3">Legal Framework</span>
              <h2 className="font-serif text-4xl font-bold text-[#0D1B2A] mt-3 mb-6">FEMA Compliance Checklist</h2>
              <p className="text-[#555] mb-8 leading-relaxed">Understanding the Foreign Exchange Management Act is critical for NRI property investment. Here's what you need to know:</p>
              <div className="space-y-4">
                {FEMA_CHECKLIST.map((item) => (
                  <div key={item} className="flex gap-3 items-start">
                    <CheckCircle2 size={20} className="text-[#B8860B] shrink-0 mt-0.5" />
                    <p className="text-sm text-[#555] leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_8px_40px_rgba(13,27,42,0.10)] border border-[#F7F3E8]">
              <h3 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-6">Speak to an NRI Advisor</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Your Full Name" className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]" />
                <div className="flex gap-2">
                  <select className="border border-[#E8E4DC] rounded-xl px-3 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7] w-28">
                    <option>🇺🇸 +1</option><option>🇦🇪 +971</option><option>🇬🇧 +44</option><option>🇸🇬 +65</option><option>🇮🇳 +91</option>
                  </select>
                  <input type="tel" placeholder="Phone Number" className="flex-1 border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]" />
                <select className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7]">
                  <option>Select Country of Residence</option>
                  {["USA","UAE","UK","Singapore","Canada","Australia","Germany","Qatar"].map(c => <option key={c}>{c}</option>)}
                </select>
                <textarea rows={3} placeholder="Tell us about your investment goals..." className="w-full border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-[#B8860B] bg-[#FFFDF7] resize-none"></textarea>
                <button className="btn-gold w-full py-4 rounded-xl">Request Free Consultation</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NRI Properties */}
      {nriProps.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="section-label mb-3">NRI Recommended</span>
                <h2 className="font-serif text-4xl font-bold text-[#0D1B2A]">Premium Investment Properties</h2>
              </div>
              <Link href="/buy" className="text-[#B8860B] font-bold text-sm hover:underline">View All →</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {nriProps.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}