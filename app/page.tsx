import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/ui/SearchBar";
import PropertyCard from "@/components/ui/PropertyCard";
import AdvantageCard from "@/components/ui/AdvantageCard";
import CityCard from "@/components/ui/CityCard";
import { PROPERTIES, CITIES, TESTIMONIALS, PROJECTS } from "@/lib/data";
import {
  ArrowRight, ShieldCheck, Bot, Award, Users, Star,
  MapPin, Home, Building2, TrendingUp, ChevronRight, BadgeCheck,
  Landmark, Globe
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-[#FFFDF7]">
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Full Screen
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=2000"
            alt="Luxury Home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B2A]/92 via-[#0D1B2A]/70 to-[#0D1B2A]/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-30 max-w-screen-xl mx-auto px-4 sm:px-6 pt-28 pb-16">
          {/* Badge */}
          <div className="animate-fade-in-up delay-100 inline-flex items-center gap-2.5 bg-white/10 border border-[#B8860B]/40 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B8860B] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#B8860B]"></span>
            </span>
            <span className="text-white/90 text-xs font-bold font-ui uppercase tracking-widest">India's #1 Premium Property Platform</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-up delay-200 font-serif font-bold text-white leading-[1.08] mb-6 max-w-3xl">
            <span className="text-5xl sm:text-6xl lg:text-7xl block">Find Your</span>
            <span className="text-5xl sm:text-6xl lg:text-7xl block animate-text-shine">Dream Home.</span>
          </h1>
          <p className="animate-fade-in-up delay-300 text-white/75 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
            Discover 2,500+ verified luxury properties across India's prime locations with AI-powered matching and exclusive off-market listings.
          </p>

          {/* Search Bar */}
          <div className="animate-fade-in-up delay-400">
            <SearchBar size="hero" className="w-full" />
          </div>

          {/* Trending searches */}
          <div className="animate-fade-in-up delay-500 mt-6 flex flex-wrap items-center gap-3">
            <span className="text-white/50 text-sm font-ui">Trending:</span>
            {["Bandra West, Mumbai", "Koregaon Park, Pune", "Jubilee Hills, Hyderabad", "Golf Course Rd, Gurugram"].map((tag) => (
              <button key={tag} className="text-white/80 text-sm bg-white/10 hover:bg-white/20 border border-white/15 rounded-full px-3.5 py-1.5 transition-colors font-medium cursor-pointer">
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-3 md:grid-cols-6 gap-4 divide-x divide-white/10">
            {[
              { value: "2,500+", label: "Verified Listings" },
              { value: "₹0 Brokerage", label: "For Buyers" },
              { value: "10k+", label: "Happy Clients" },
              { value: "48 Cities", label: "Pan India" },
              { value: "500+", label: "Top Builders" },
              { value: "100%", label: "RERA Verified" },
            ].map(({ value, label }) => (
              <div key={label} className="text-center px-2">
                <p className="font-serif font-bold text-white text-xl md:text-2xl">{value}</p>
                <p className="text-white/50 text-xs font-ui uppercase tracking-wider mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          QUICK ACTIONS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white border-b border-[#F7F3E8] overflow-hidden">
        <div className="overflow-hidden flex whitespace-nowrap group">
          {/* First Block */}
          <div className="animate-marquee flex gap-6 items-stretch group-hover:[animation-play-state:paused] w-max pr-6">
            {[...Array(3)].map((_, loopIdx) => (
              [
                { icon: Home, title: "Buy a Home", desc: "Own your dream property", href: "/buy", color: "bg-[#0D1B2A]" },
                { icon: Building2, title: "Rent a Home", desc: "Find your next rental", href: "/rent", color: "bg-[#1C3A5E]" },
                { icon: TrendingUp, title: "Sell Your Home", desc: "Get the best price", href: "/sell", color: "bg-[#B8860B]" },
                { icon: Landmark, title: "Invest Smart", desc: "High-yield real estate", href: "/invest", color: "bg-[#2D5016]" },
              ].map(({ icon: Icon, title, desc, href, color }, idx) => (
                <Link
                  key={`q1-${loopIdx}-${idx}`}
                  href={href}
                  className={`group relative overflow-hidden rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-[280px] shrink-0 whitespace-normal ${color}`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <Icon size={32} className="text-white/90 mb-4 relative z-10" strokeWidth={1.5} />
                  <h3 className="font-serif font-bold text-white text-xl mb-1 relative z-10">{title}</h3>
                  <p className="text-white/70 text-sm font-medium relative z-10">{desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-white/60 text-xs font-bold font-ui uppercase tracking-wider relative z-10 group-hover:text-white transition-colors">
                    Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))
            ))}
          </div>
          {/* Second Block (Duplicate) */}
          <div className="animate-marquee flex gap-6 items-stretch group-hover:[animation-play-state:paused] w-max pr-6" aria-hidden="true">
            {[...Array(3)].map((_, loopIdx) => (
              [
                { icon: Home, title: "Buy a Home", desc: "Own your dream property", href: "/buy", color: "bg-[#0D1B2A]" },
                { icon: Building2, title: "Rent a Home", desc: "Find your next rental", href: "/rent", color: "bg-[#1C3A5E]" },
                { icon: TrendingUp, title: "Sell Your Home", desc: "Get the best price", href: "/sell", color: "bg-[#B8860B]" },
                { icon: Landmark, title: "Invest Smart", desc: "High-yield real estate", href: "/invest", color: "bg-[#2D5016]" },
              ].map(({ icon: Icon, title, desc, href, color }, idx) => (
                <Link
                  key={`q2-${loopIdx}-${idx}`}
                  href={href}
                  className={`group relative overflow-hidden rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-[280px] shrink-0 whitespace-normal ${color}`}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  <Icon size={32} className="text-white/90 mb-4 relative z-10" strokeWidth={1.5} />
                  <h3 className="font-serif font-bold text-white text-xl mb-1 relative z-10">{title}</h3>
                  <p className="text-white/70 text-sm font-medium relative z-10">{desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-white/60 text-xs font-bold font-ui uppercase tracking-wider relative z-10 group-hover:text-white transition-colors">
                    Explore <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          FEATURED PROPERTIES
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#FFFDF7]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-label mb-3">Exclusive Collection</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0D1B2A]">Featured Properties</h2>
            </div>
            <Link href="/buy" className="flex items-center gap-2 text-[#B8860B] font-bold font-ui text-sm hover:gap-3 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROPERTIES.filter(p => p.isFeatured).slice(0, 3).map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CITY EXPLORER
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white border-y border-[#F7F3E8]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label mb-3">Pan India Presence</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0D1B2A]">Explore by City</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CITIES.map((city) => (
              <CityCard
                key={city.name}
                name={city.name}
                image={city.image}
                count={city.count}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          NEW PROJECTS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F7F3E8]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="section-label mb-3">RERA Verified</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0D1B2A]">Premium New Projects</h2>
            </div>
            <Link href="/projects" className="flex items-center gap-2 text-[#B8860B] font-bold font-ui text-sm hover:gap-3 transition-all">
              All Projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((proj) => (
              <div key={proj.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(13,27,42,0.07)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.12)] transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-52 overflow-hidden">
                  <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <span className={`absolute top-3 left-3 text-[10px] font-bold font-ui uppercase tracking-wider px-3 py-1.5 rounded-full ${proj.status === "Ready to Move" ? "bg-emerald-500 text-white" :
                    proj.status === "Under Construction" ? "bg-[#B8860B] text-white" :
                      "bg-[#0D1B2A] text-white"
                    }`}>
                    {proj.status}
                  </span>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-serif font-bold text-xl">{proj.name}</p>
                    <p className="text-white/80 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin size={11} className="text-[#B8860B]" /> {proj.location}
                    </p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-[#888] font-ui">Starting Price</p>
                      <p className="font-serif font-bold text-[#B8860B] text-2xl">{proj.priceDisplay}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[#888] font-ui">Builder</p>
                      <p className="font-bold text-[#0D1B2A] text-sm">{proj.builder}</p>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  {proj.status === "Under Construction" && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#888]">Construction Progress</span>
                        <span className="font-bold text-[#0D1B2A]">{proj.completion}%</span>
                      </div>
                      <div className="h-1.5 bg-[#F7F3E8] rounded-full overflow-hidden">
                        <div className="h-full bg-[#B8860B] rounded-full" style={{ width: `${proj.completion}%` }}></div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-xs text-[#888] pt-3 border-t border-[#F7F3E8]">
                    <span className="flex items-center gap-1"><BadgeCheck size={12} className="text-emerald-500" /> RERA: {proj.rera.substring(0, 10)}...</span>
                    <span>{proj.types}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY DREAMHOME
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#0D1B2A] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B8860B]/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1C3A5E]/50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="section-label text-[#F5E6C0] mb-3">Why We Are Different</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white max-w-3xl mx-auto">
              The DreamHome Advantage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              { iconName: "Bot", title: "AI-Powered Search", desc: "Our algorithm matches you with properties based on 50+ lifestyle parameters.", glowColor: "rgba(184, 134, 11, 0.18)", highlightColor: "#B8860B" },
              { iconName: "ShieldCheck", title: "100% RERA Verified", desc: "Every listing is legally vetted. No fraud, no hidden surprises. Guaranteed.", glowColor: "rgba(5, 150, 105, 0.18)", highlightColor: "#059669" },
              { iconName: "Award", title: "Zero Brokerage", desc: "Direct builder and owner listings. No middlemen, no extra fees.", glowColor: "rgba(212, 160, 23, 0.18)", highlightColor: "#D4A017" },
              { iconName: "Users", title: "Concierge Service", desc: "Dedicated relationship manager for every premium client. Available 24/7.", glowColor: "rgba(28, 58, 94, 0.25)", highlightColor: "#3B82F6" },
            ] as const).map(({ iconName, title, desc, glowColor, highlightColor }) => (
              <AdvantageCard
                key={title}
                iconName={iconName}
                title={title}
                desc={desc}
                glowColor={glowColor}
                highlightColor={highlightColor}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 mb-12 text-center">
          <span className="section-label mb-3">Real Stories</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0D1B2A]">What Our Clients Say</h2>
        </div>

        {/* Marquee Wrapper for Testimonials */}
        <div className="overflow-hidden flex whitespace-nowrap py-4 group">
          {/* First Block */}
          <div className="animate-marquee flex gap-6 items-stretch group-hover:[animation-play-state:paused] w-max pr-6">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div key={`t1-${idx}`} className="w-[350px] shrink-0 whitespace-normal bg-[#FFFDF7] border border-[#F7F3E8] rounded-2xl p-7 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(null).map((_, i) => (
                    <Star key={i} size={16} className="text-[#B8860B]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#555] leading-relaxed text-sm mb-6 italic flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-[#F7F3E8] pt-5 mt-auto">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full border-2 border-[#B8860B]/20 object-cover" />
                  <div>
                    <p className="font-bold text-[#0D1B2A]">{t.name}</p>
                    <p className="text-xs text-[#888]">{t.type} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Second Block (Duplicate) */}
          <div className="animate-marquee flex gap-6 items-stretch group-hover:[animation-play-state:paused] w-max pr-6" aria-hidden="true">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div key={`t2-${idx}`} className="w-[350px] shrink-0 whitespace-normal bg-[#FFFDF7] border border-[#F7F3E8] rounded-2xl p-7 hover:shadow-lg transition-all duration-300 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array(5).fill(null).map((_, i) => (
                    <Star key={i} size={16} className="text-[#B8860B]" fill="currentColor" />
                  ))}
                </div>
                <p className="text-[#555] leading-relaxed text-sm mb-6 italic flex-1">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-[#F7F3E8] pt-5 mt-auto">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full border-2 border-[#B8860B]/20 object-cover" />
                  <div>
                    <p className="font-bold text-[#0D1B2A]">{t.name}</p>
                    <p className="text-xs text-[#888]">{t.type} · {t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          NRI CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-[#F7F3E8] border-b border-[#F7F3E8] relative overflow-hidden">
        {/* Subtle background glow orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#B8860B]/5 rounded-full blur-[100px] pointer-events-none animate-pulse duration-5000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1C3A5E]/10 rounded-full blur-[120px] pointer-events-none animate-pulse duration-7000"></div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text Content Column */}
            <div className="group flex flex-col justify-center">
              <div className="w-14 h-14 bg-[#B8860B]/10 rounded-2xl flex items-center justify-center text-[#B8860B] mb-6 transition-all duration-500 group-hover:bg-[#B8860B] group-hover:text-white group-hover:rotate-12 group-hover:scale-105 shadow-sm">
                <Globe size={28} strokeWidth={1.5} />
              </div>
              <span className="section-label text-[#B8860B] mb-3 transition-all duration-500 group-hover:translate-x-1">
                NRI Investment Desk
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0D1B2A] mb-5 leading-tight transition-colors duration-500 group-hover:text-[#B8860B]">
                Invest in Indian Real Estate from Anywhere in the World
              </h2>
              <p className="text-[#555] mb-8 leading-relaxed transition-all duration-500 group-hover:text-[#0D1B2A]">
                FEMA-compliant advisory, virtual site tours, legal assistance, and power of attorney support for NRIs looking to invest in premium Indian properties.
              </p>
              <Link href="/nri" className="btn-gold w-fit transition-all duration-500 group-hover:scale-105 group-hover:shadow-[0_8px_30px_rgba(184,134,11,0.4)]">
                Explore NRI Services
                <ArrowRight size={18} className="transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Image Column Wrapper */}
            <div className="relative group cursor-pointer">
              {/* Glowing Background Backdrop under the image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#B8860B] to-[#1C3A5E] rounded-3xl opacity-0 group-hover:opacity-90 blur-xl transition-all duration-700 scale-95 group-hover:scale-100"></div>

              {/* Main Card Container */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/40 transition-all duration-700 transform group-hover:-translate-y-2 group-hover:scale-[1.01] bg-white">
                <img
                  src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=900"
                  alt="NRI Investment"
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                />

                {/* Shiny sweep hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                <div className="absolute inset-0 bg-[#0D1B2A]/10 transition-opacity duration-500 group-hover:opacity-0"></div>

                {/* Floating FEMA Badge (Top-Right) */}
                <div className="absolute top-6 right-6 bg-[#0D1B2A]/90 text-[#F5E6C0] backdrop-blur-md border border-[#B8860B]/30 rounded-xl px-4 py-2.5 shadow-xl transition-all duration-500 hover:scale-105 transform animate-float [animation-delay:2s] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#B8860B]" />
                  <span className="text-[10px] font-bold font-ui uppercase tracking-wider">FEMA Compliant</span>
                </div>

                {/* Floating Appreciation Badge (Bottom-Left) */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md border border-[#B8860B]/20 rounded-2xl p-5 shadow-2xl transition-all duration-500 hover:scale-105 transform animate-float flex items-start gap-3.5 max-w-[280px]">
                  <div className="p-2.5 rounded-xl bg-[#B8860B]/10 text-[#B8860B]">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-[#B8860B] text-3xl leading-none">15%+</p>
                    <p className="text-[11px] text-[#555] font-semibold mt-1.5 leading-normal">Avg. Annual Appreciation on Premium Properties</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          AGENT CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white border-t border-[#F7F3E8] relative overflow-hidden">
        {/* Background decorative grid lines */}
        <div className="absolute inset-0 bg-grid opacity-[0.01] pointer-events-none"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#B8860B]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left side: Fonts & Content */}
            <div className="lg:col-span-7 text-left">
              <span className="section-label mb-4 text-[#B8860B]">Certified Advisors</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#0D1B2A] mb-6 leading-tight">
                Ready to Find Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B8860B] to-[#D4A017]">Dream Home?</span>
              </h2>
              <p className="text-[#555] text-lg leading-relaxed max-w-xl mb-8">
                Connect with a certified DreamHome advisor today and get personalized property recommendations tailored to your exact requirements.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link href="/buy" className="btn-gold py-4 px-10 text-base text-center shadow-lg shadow-[#B8860B]/20 hover:shadow-[#B8860B]/35 hover:-translate-y-0.5 transition-all cursor-pointer">
                  Browse Properties
                </Link>
                <Link href="/sell" className="btn-outline py-4 px-10 text-base text-center hover:bg-[#0D1B2A] hover:text-white hover:border-[#0D1B2A] hover:-translate-y-0.5 transition-all cursor-pointer">
                  List Your Property
                </Link>
              </div>
            </div>

            {/* Right side: Futuristic 3D Orbiting Map/Globe Animation */}
            <div className="lg:col-span-5 flex justify-center items-center relative min-h-[350px] md:min-h-[400px]">

              {/* Outer Glowing Halos */}
              <div className="absolute w-80 h-80 bg-[#B8860B]/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
              <div className="absolute w-64 h-64 bg-[#1C3A5E]/8 rounded-full blur-2xl animate-pulse delay-1000 pointer-events-none"></div>

              {/* The SVG Globe & Orbit System */}
              <div className="relative w-72 h-72 md:w-80 md:h-80 select-none pointer-events-none transform hover:scale-105 transition-transform duration-500" style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}>

                {/* 1. Rotational Core Grid Map (Global Nodes) */}
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-[spin_45s_linear_infinite]">
                  {/* Concentric rings represent latitudes */}
                  <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(13, 27, 42, 0.05)" strokeWidth="1" />
                  <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(184, 134, 11, 0.08)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(13, 27, 42, 0.05)" strokeWidth="1" />

                  {/* Axis lines */}
                  <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(13, 27, 42, 0.04)" strokeWidth="1" />
                  <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(13, 27, 42, 0.04)" strokeWidth="1" />
                  <line x1="43.5" y1="43.5" x2="156.5" y2="156.5" stroke="rgba(13, 27, 42, 0.03)" strokeWidth="0.5" />
                  <line x1="156.5" y1="43.5" x2="43.5" y2="156.5" stroke="rgba(13, 27, 42, 0.03)" strokeWidth="0.5" />

                  {/* Pulsing City Nodes */}
                  {/* Mumbai */}
                  <g className="animate-pulse">
                    <circle cx="60" cy="110" r="3" fill="#B8860B" />
                    <circle cx="60" cy="110" r="6" fill="none" stroke="#B8860B" strokeWidth="0.5" className="animate-ping origin-center" />
                  </g>
                  {/* Delhi */}
                  <g className="animate-pulse [animation-delay:0.5s]">
                    <circle cx="95" cy="65" r="3" fill="#1C3A5E" />
                    <circle cx="95" cy="65" r="6" fill="none" stroke="#1C3A5E" strokeWidth="0.5" className="animate-ping origin-center" />
                  </g>
                  {/* Bangalore */}
                  <g className="animate-pulse [animation-delay:1s]">
                    <circle cx="85" cy="135" r="3" fill="#B8860B" />
                    <circle cx="85" cy="135" r="6" fill="none" stroke="#B8860B" strokeWidth="0.5" className="animate-ping origin-center" />
                  </g>
                  {/* Kolkata */}
                  <g className="animate-pulse [animation-delay:1.5s]">
                    <circle cx="140" cy="100" r="2.5" fill="#1C3A5E" />
                  </g>

                  {/* Node Interconnection Lines representing search queries */}
                  <path d="M 60 110 Q 75 80 95 65" fill="none" stroke="rgba(184,134,11,0.2)" strokeWidth="0.75" strokeDasharray="2 2" />
                  <path d="M 85 135 Q 70 120 60 110" fill="none" stroke="rgba(184,134,11,0.2)" strokeWidth="0.75" />
                  <path d="M 85 135 Q 115 110 140 100" fill="none" stroke="rgba(28,58,94,0.15)" strokeWidth="0.75" strokeDasharray="3 2" />
                  <path d="M 95 65 Q 120 80 140 100" fill="none" stroke="rgba(28,58,94,0.15)" strokeWidth="0.75" />
                </svg>

                {/* 2. Vertically Tilted Orbital Rings (3D Illusion) */}
                <div className="absolute inset-0 w-full h-full rounded-full border border-[#B8860B]/15 animate-[spin_20s_linear_infinite]" style={{ transform: 'rotateX(65deg) rotateY(15deg)' }}>
                  {/* Satellite marker orbiting */}
                  <span className="absolute w-2.5 h-2.5 bg-[#B8860B] rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#B8860B]">
                    <span className="absolute inset-[-4px] rounded-full border border-[#B8860B] animate-ping"></span>
                  </span>
                </div>

                <div className="absolute inset-0 w-full h-full rounded-full border border-[#1C3A5E]/10 animate-[spin_15s_linear_infinite_reverse]" style={{ transform: 'rotateX(-60deg) rotateY(-25deg)' }}>
                  {/* Second Satellite marker */}
                  <span className="absolute w-2 h-2 bg-[#1C3A5E] rounded-full bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 shadow-[0_0_8px_#1C3A5E]">
                    <span className="absolute inset-[-4px] rounded-full border border-[#1C3A5E] animate-ping"></span>
                  </span>
                </div>

                {/* 3. Central India Outline Map Hologram (Vectorized abstract version) */}
                <svg viewBox="0 0 200 200" className="absolute inset-6 w-[88%] h-[88%] opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-[spin_60s_linear_infinite_reverse]">
                  {/* Abstract polygon contours representing the map points */}
                  <polygon points="95,45 105,55 100,68 115,70 125,85 130,100 120,115 108,125 95,145 92,155 88,145 84,135 86,125 76,115 72,105 78,95 72,85 80,75 88,65 92,55" fill="none" stroke="url(#mapGradient)" strokeWidth="1" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#B8860B" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#1C3A5E" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#B8860B" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Compass HUD decoration */}
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(184,134,11,0.05)" strokeWidth="1" strokeDasharray="5 15" />
                  <circle cx="100" cy="100" r="93" fill="none" stroke="rgba(13,27,42,0.03)" strokeWidth="0.5" />
                </svg>

                {/* 4. Live coordinate display HUD */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full border border-[#B8860B]/20 bg-white/40 backdrop-blur-md flex items-center justify-center text-[#B8860B] shadow-inner">
                    <Globe size={18} className="animate-spin [animation-duration:10s]" />
                  </div>
                  <span className="text-[8px] font-bold font-ui text-[#888] tracking-widest mt-2 uppercase">Core.HUD.Live</span>
                  <span className="text-[9px] font-mono text-[#B8860B] mt-0.5 tracking-tight">23.0225° N, 72.5714° E</span>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}