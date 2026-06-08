import React from 'react';
import Link from 'next/link';
import { 
  Building2, Store, Warehouse, Building, Briefcase, 
  UtensilsCrossed, Hotel, ArrowRight, MapPin, 
  TrendingUp, ShieldCheck, CheckCircle2
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const CATEGORIES = [
  { icon: Briefcase, title: "Office Spaces", desc: "Premium IT parks and corporate offices", count: "245+ Listings" },
  { icon: Store, title: "Retail Shops", desc: "High-footfall commercial zones", count: "180+ Listings" },
  { icon: Building2, title: "Co-working Spaces", desc: "Flexible workspaces for startups", count: "50+ Listings" },
  { icon: Warehouse, title: "Warehouses", desc: "Industrial and storage units", count: "90+ Listings" },
  { icon: Building, title: "Showrooms", desc: "Prime main-road facing units", count: "120+ Listings" },
  { icon: UtensilsCrossed, title: "Restaurants & Cafes", desc: "Fully furnished F&B properties", count: "75+ Listings" },
  { icon: Hotel, title: "Hotels & Resorts", desc: "Hospitality investment assets", count: "30+ Listings" },
  { icon: Building2, title: "Institutional", desc: "Schools, hospitals and clinics", count: "40+ Listings" },
];

const FEATURED_PROPERTIES = [
  {
    id: 1,
    title: "Apex IT Park & Business Hub",
    location: "BKC, Mumbai",
    type: "Office Space",
    price: "₹45 Cr",
    yield: "8.5% ROI",
    area: "12,500 sq.ft.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 2,
    title: "HighStreet Retail Boulevard",
    location: "Indiranagar, Bangalore",
    type: "Retail Shop",
    price: "₹18 Cr",
    yield: "11% ROI",
    area: "3,200 sq.ft.",
    image: "https://images.unsplash.com/photo-1555529902-52611456a004?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 3,
    title: "Global Logistics Park",
    location: "Bhiwandi, Maharashtra",
    type: "Warehouse",
    price: "₹65 Cr",
    yield: "14% ROI",
    area: "50,000 sq.ft.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c159b3?auto=format&fit=crop&q=80&w=1200"
  }
];

export default function CommercialPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] pt-28">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative px-4 sm:px-6 mb-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden min-h-[500px] flex items-center shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" 
              alt="Premium Commercial Real Estate" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/90 via-[#0D1B2A]/70 to-transparent" />
            
            <div className="relative z-10 p-10 md:p-16 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B8860B]/20 border border-[#B8860B]/30 backdrop-blur-md mb-6">
                <TrendingUp size={16} className="text-[#B8860B]" />
                <span className="text-[#F5E6C0] text-sm font-bold tracking-widest uppercase">High-Yield Assets</span>
              </div>
              
              <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Invest in Premium <br />
                <span className="text-[#B8860B]">Commercial</span> Spaces.
              </h1>
              
              <p className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed max-w-xl">
                Discover high-footfall retail zones, Grade-A office parks, and industrial warehouses with guaranteed long-term rental yields.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <button className="btn-gold">
                  Explore Listings <ArrowRight size={18} />
                </button>
                <button className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold font-ui transition-all backdrop-blur-md">
                  Consult an Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CATEGORIES GRID
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-label mb-3">Asset Classes</span>
            <h2 className="font-serif text-4xl font-bold text-[#0D1B2A]">Explore by Category</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat, idx) => (
              <div key={idx} className="group p-6 rounded-2xl border border-[#F7F3E8] bg-[#FFFDF7] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="w-14 h-14 rounded-xl bg-[#0D1B2A]/5 text-[#0D1B2A] flex items-center justify-center mb-6 group-hover:bg-[#0D1B2A] group-hover:text-[#B8860B] transition-colors">
                  <cat.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0D1B2A] mb-2">{cat.title}</h3>
                <p className="text-sm text-[#555] mb-6 line-clamp-2">{cat.desc}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider">{cat.count}</span>
                  <div className="w-8 h-8 rounded-full bg-[#F7F3E8] flex items-center justify-center group-hover:bg-[#B8860B] group-hover:text-white transition-colors">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED LISTINGS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#0D1B2A]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-label text-[#F5E6C0] mb-3">Curated Portfolio</span>
              <h2 className="font-serif text-4xl font-bold text-white">Featured Commercial Assets</h2>
            </div>
            <button className="text-[#B8860B] font-bold font-ui text-sm flex items-center gap-2 hover:text-[#F5E6C0] transition-colors">
              View All Properties <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_PROPERTIES.map((prop) => (
              <div key={prop.id} className="bg-white rounded-2xl overflow-hidden group hover:shadow-2xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-md text-xs font-bold text-[#0D1B2A] uppercase tracking-wider">
                    {prop.type}
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-[#B8860B] rounded-md text-xs font-bold text-white uppercase tracking-wider">
                    {prop.yield}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-[#0D1B2A] mb-2 group-hover:text-[#B8860B] transition-colors">
                    {prop.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[#555] text-sm mb-6">
                    <MapPin size={14} className="text-[#B8860B]" />
                    {prop.location}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#F7F3E8]">
                    <div>
                      <p className="text-xs text-[#888] font-medium uppercase tracking-wider mb-1">Asking Price</p>
                      <p className="font-bold text-[#0D1B2A] text-lg">{prop.price}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#888] font-medium uppercase tracking-wider mb-1">Total Area</p>
                      <p className="font-bold text-[#0D1B2A] text-lg">{prop.area}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY INVEST
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#FFFDF7]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <span className="section-label mb-3">Why Commercial?</span>
                <h2 className="font-serif text-4xl font-bold text-[#0D1B2A] leading-tight">
                  Higher Yields. <br />Longer Leases.
                </h2>
              </div>
              
              <div className="space-y-6">
                {[
                  { title: "Average 8-12% Rental Yields", desc: "Significantly higher returns compared to residential properties (2-3%)." },
                  { title: "Long-Term Corporate Tenants", desc: "Standard lease agreements of 5 to 15 years ensure stable, uninterrupted income." },
                  { title: "Capital Appreciation", desc: "Prime commercial zones see massive asset value growth due to infrastructure development." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#B8860B]/10 flex items-center justify-center text-[#B8860B] mt-1">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0D1B2A] text-lg mb-1">{item.title}</h4>
                      <p className="text-[#555] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#0D1B2A] rounded-[2rem] translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1578509012678-005081fdfd2b?auto=format&fit=crop&q=80&w=1000" 
                alt="Investment Meeting" 
                className="relative z-10 w-full h-[500px] object-cover rounded-[2rem]"
              />
              <div className="absolute bottom-8 left-8 z-20 bg-white p-6 rounded-2xl shadow-xl max-w-[250px]">
                <ShieldCheck size={32} className="text-[#B8860B] mb-3" />
                <h4 className="font-bold text-[#0D1B2A] mb-1">100% Verified</h4>
                <p className="text-xs text-[#555]">All commercial assets undergo rigorous legal and title verification.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
