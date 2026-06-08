"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu, X, Search, Heart, User, ChevronDown, MapPin, Plus, Bell,
  Home, Building, TrendingUp, Globe, Briefcase, Wrench, ArrowRight, Sparkles, Building2,
  Info, BookOpen, BarChart3, Calculator, Brain, Compass
} from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import WishlistDrawer from "./WishlistDrawer";
import AdvancedSearchOverlay from "./AdvancedSearchOverlay";

/* ═══════════════════════════════════════════════════════
   ABOUT US MEGA MENU DATA
   ═══════════════════════════════════════════════════════ */
const ABOUT_MENU_TABS = [
  { id: "about", label: "About DreamHome", icon: Info },
  { id: "trends", label: "Market Trends", icon: TrendingUp },
  { id: "articles", label: "Articles & News", icon: BookOpen },
];

const ABOUT_MENU_DATA: Record<string, any> = {
  about: {
    title: "About DreamHome",
    desc: "Redefining luxury real estate with AI-driven matching and expert advisory.",
    btn: "LEARN MORE ABOUT US",
    items: [
      { title: "Our Story", desc: "Our journey, vision, and core values", href: "/about" },
      { title: "Careers", desc: "Join our team of luxury property experts", href: "/careers" },
      { title: "Press & Media", desc: "DreamHome in the news and publications", href: "/press" },
      { title: "Contact Us", desc: "Get in touch with our global offices", href: "/contact" }
    ]
  },
  trends: {
    title: "Market Trends",
    desc: "Stay ahead with real-time property insights and city reports.",
    btn: "EXPLORE INSIGHTS",
    items: [
      { title: "Pune Micro-markets", desc: "Top emerging investment hubs", href: "/blog" },
      { title: "NRI Buying Trends", desc: "FEMA and investment updates", href: "/blog" },
      { title: "Rental Yield Reports", desc: "Maximize your commercial returns", href: "/blog" },
      { title: "Investment Desk", desc: "Strategic luxury assets advisory", href: "/invest" }
    ]
  },
  articles: {
    title: "Articles & Guides",
    desc: "Step-by-step guides for buying, selling, and renting properties.",
    btn: "READ ALL ARTICLES",
    items: [
      { title: "Home Buyer's Guide", desc: "Step-by-step path to homeownership", href: "/blog" },
      { title: "Legal & RERA Documentation", desc: "Title checks and regulations", href: "/legal-help" },
      { title: "Home Loan & EMI Guides", desc: "Finance optimization and calculators", href: "/tools/emi" },
      { title: "Interior Design Ideas", desc: "Premium home styling and furnishing", href: "/services/interior" }
    ]
  }
};

/* ═══════════════════════════════════════════════════════
   EXPLORE SERVICES MEGA MENU DATA
   ═══════════════════════════════════════════════════════ */
const MEGA_MENU_TABS = [
  { id: "buy", label: "Buy Property", icon: Home },
  { id: "rent", label: "Rent & Lease", icon: Building2 },
  { id: "commercial", label: "Commercial", icon: Briefcase },
  { id: "services", label: "Agent Services", icon: Wrench },
];

const MEGA_MENU_DATA: Record<string, any> = {
  buy: {
    title: "Buy Property",
    desc: "Explore premium residential homes from verified builders.",
    btn: "VIEW ALL PROPERTIES",
    items: [
      { title: "Luxury Apartments", desc: "Premium high-rise homes", href: "/buy" },
      { title: "Villas & Row Houses", desc: "Independent living", href: "/buy" },
      { title: "Penthouses", desc: "Sky-high luxury residences", href: "/buy" },
      { title: "Affordable Housing", desc: "Budget-friendly homes", href: "/buy" },
      { title: "Studio Apartments", desc: "For young professionals", href: "/buy" },
      { title: "Plots & Land", desc: "Build your dream home", href: "/buy" },
      { title: "Holiday Homes", desc: "Scenic retreats", href: "/buy" },
      { title: "Senior Living", desc: "Safe communities for elders", href: "/buy" }
    ]
  },
  rent: {
    title: "Rent & Lease",
    desc: "Find verified rental properties and lease agreements easily.",
    btn: "VIEW ALL RENTALS",
    items: [
      { title: "Furnished Apartments", desc: "Ready to move in", href: "/rent" },
      { title: "Family Homes", desc: "Spacious suburban houses", href: "/rent" },
      { title: "PG & Co-living", desc: "For students & professionals", href: "/rent" },
      { title: "Short Term Rentals", desc: "Flexible monthly leases", href: "/rent" },
      { title: "Luxury Villas", desc: "High-end rental properties", href: "/rent" },
      { title: "Corporate Leasing", desc: "Company guest houses", href: "/rent" },
      { title: "Retail Spaces", desc: "Shops and outlets", href: "/rent" },
      { title: "Office Spaces", desc: "Fully furnished workspaces", href: "/rent" }
    ]
  },
  commercial: {
    title: "Commercial Spaces",
    desc: "Discover high-yield retail shops, offices, and co-working spaces.",
    btn: "VIEW COMMERCIAL",
    items: [
      { title: "Office Spaces", desc: "Premium IT parks and offices", href: "/commercial" },
      { title: "Retail Shops", desc: "High-footfall commercial zones", href: "/commercial" },
      { title: "Co-working Spaces", desc: "Flexible workspaces", href: "/commercial" },
      { title: "Warehouses", desc: "Industrial and storage units", href: "/commercial" },
      { title: "Showrooms", desc: "Prime main-road facing units", href: "/commercial" },
      { title: "Restaurants & Cafes", desc: "Fully furnished F&B", href: "/commercial" },
      { title: "Hotels & Resorts", desc: "Hospitality investment assets", href: "/commercial" },
      { title: "Institutional Land", desc: "Schools and clinics", href: "/commercial" }
    ]
  },
  services: {
    title: "Agent & Value Services",
    desc: "Get expert assistance for everything from legal checks to home loans.",
    btn: "TALK TO AN AGENT",
    items: [
      { title: "Property Valuation", desc: "Get accurate market price", href: "/tools/valuation" },
      { title: "Home Loans", desc: "Fast approval at lowest rates", href: "/tools/emi" },
      { title: "Legal Assistance", desc: "Title checks & documentation", href: "/legal-help" },
      { title: "Property Management", desc: "Rent collection & maintenance", href: "/services/management" },
      { title: "Vastu Consultation", desc: "Expert Vastu compliance checks", href: "/services/vastu" },
      { title: "Interior Design", desc: "Turnkey home furnishing", href: "/services/interior" },
      { title: "Packers & Movers", desc: "Safe and insured relocations", href: "/services/relocation" },
      { title: "NRI Investment Desk", desc: "End-to-end overseas investing", href: "/nri" }
    ]
  }
};

/* ═══════════════════════════════════════════════════════
   TRENDS & INSIGHTS MEGA MENU DATA
   ═══════════════════════════════════════════════════════ */
const TRENDS_MENU_TABS = [
  { id: "market", label: "Market Trends", icon: TrendingUp },
  { id: "area", label: "Area Insights", icon: MapPin },
  { id: "calculators", label: "Smart Calculators", icon: Calculator },
  { id: "ai", label: "AI Insights", icon: Brain },
];

const TRENDS_MENU_DATA: Record<string, any> = {
  market: {
    title: "Market Trends",
    desc: "Real-time property market data, price analysis, and investment insights.",
    btn: "VIEW ALL TRENDS",
    items: [
      { title: "Property Price Trends", desc: "Track real-time price movements across cities", href: "/trends-insights/price-trends" },
      { title: "Rent vs Buy Analysis", desc: "Data-driven comparison to make the right choice", href: "/trends-insights/rent-vs-buy" },
      { title: "Investment Hotspots", desc: "Top areas with highest ROI potential", href: "/trends-insights/hotspots" },
      { title: "City Growth Reports", desc: "Comprehensive city-wise growth analytics", href: "/trends-insights/city-reports" }
    ]
  },
  area: {
    title: "Area Insights",
    desc: "Deep-dive neighborhood analysis, safety, and livability scores.",
    btn: "EXPLORE AREAS",
    items: [
      { title: "Best Family Areas", desc: "Top-rated neighborhoods for families", href: "/trends-insights/family-areas" },
      { title: "Emerging Locations", desc: "Up-and-coming areas with growth potential", href: "/trends-insights/emerging-locations" },
      { title: "Safety & Livability", desc: "Crime rates, healthcare, and quality of life", href: "/trends-insights/safety-index" },
      { title: "Connectivity Score", desc: "Transport, metro, and road connectivity ratings", href: "/trends-insights/connectivity" }
    ]
  },
  calculators: {
    title: "Smart Calculators",
    desc: "Professional financial tools for smart property decisions.",
    btn: "USE CALCULATORS",
    items: [
      { title: "EMI Calculator", desc: "Calculate monthly home loan installments", href: "/trends-insights/emi-calculator" },
      { title: "ROI Calculator", desc: "Estimate return on property investment", href: "/trends-insights/roi-calculator" },
      { title: "Rent vs Buy Calculator", desc: "Compare renting vs buying costs over time", href: "/trends-insights/rent-buy-calc" },
      { title: "Stamp Duty Calculator", desc: "Estimate registration and stamp duty charges", href: "/trends-insights/stamp-duty" }
    ]
  },
  ai: {
    title: "AI-Powered Insights",
    desc: "Cutting-edge AI tools for intelligent property decisions.",
    btn: "TRY AI TOOLS",
    items: [
      { title: "AI Price Predictor", desc: "ML-powered future property price predictions", href: "/trends-insights/ai-predictor" },
      { title: "AI Investment Score", desc: "AI-generated investment rating for any property", href: "/trends-insights/ai-score" },
      { title: "AI Area Analysis", desc: "Deep AI analysis of any neighborhood", href: "/trends-insights/ai-area" },
      { title: "AI Property Match", desc: "Find your perfect property with AI matching", href: "/trends-insights/ai-match" }
    ]
  }
};

/* ═══════════════════════════════════════════════════════
   SHARED MEGA MENU RENDERER
   ═══════════════════════════════════════════════════════ */
function MegaMenuPanel({
  tabs, data, activeTab, setActiveTab, onClose, footerText,
}: {
  tabs: typeof MEGA_MENU_TABS;
  data: Record<string, any>;
  activeTab: string;
  setActiveTab: (t: string) => void;
  onClose: () => void;
  footerText: string;
}) {
  return (
    <div className="absolute top-[100%] left-0 right-0 pt-4 z-50">
      <div className="bg-white rounded-[2rem] shadow-[0_40px_100px_rgba(13,27,42,0.15)] border border-[#F7F3E8] overflow-hidden flex flex-col animate-fade-in-up">

        {/* TOP TABS */}
        <div className="flex items-center gap-2 p-3 bg-[#F7F3E8]/40 border-b border-[#F7F3E8]">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onMouseEnter={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold font-ui transition-all ${isActive ? "bg-white text-[#B8860B] shadow-sm" : "text-[#0D1B2A]/70 hover:bg-white/50"
                  }`}
              >
                <tab.icon size={16} className={isActive ? "text-[#B8860B]" : "text-[#0D1B2A]/50"} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CONTENT AREA */}
        <div className="p-8">
          {/* Header Box */}
          <div className="flex items-center justify-between bg-gradient-to-r from-[#F5E6C0]/30 to-[#FFFDF7] border border-[#B8860B]/20 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-[#F7F3E8] flex items-center justify-center text-[#B8860B]">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-[#0D1B2A] flex items-center gap-2">
                  {data[activeTab].title}
                </h3>
                <p className="text-sm text-[#555] mt-1">{data[activeTab].desc}</p>
              </div>
            </div>
            <Link
              href={data[activeTab].items[0].href}
              onClick={onClose}
              className="px-6 py-3 bg-[#0D1B2A] text-[#B8860B] text-xs font-bold font-ui uppercase tracking-wider rounded-xl hover:bg-[#1C3A5E] transition-colors shadow-lg"
            >
              {data[activeTab].btn}
            </Link>
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-4 gap-4">
            {data[activeTab].items.map((item: any, idx: number) => (
              <Link
                key={idx}
                href={item.href}
                onClick={onClose}
                className="group p-5 border border-[#F7F3E8] bg-white rounded-xl hover:border-[#B8860B]/30 hover:shadow-md hover:bg-[#F5E6C0]/10 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#F5E6C0]/40 to-transparent rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
                <h4 className="text-sm font-bold text-[#0D1B2A] mb-1 group-hover:text-[#B8860B] transition-colors relative z-10">{item.title}</h4>
                <p className="text-xs text-[#888] mb-4 flex-1 relative z-10">{item.desc}</p>
                <div className="flex items-center text-[11px] font-bold text-[#B8860B] uppercase tracking-wider opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all relative z-10 mt-auto">
                  Explore <ArrowRight size={12} className="ml-1" />
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom Footer */}
          <div className="mt-8 pt-4 border-t border-[#F7F3E8] flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B8860B]"></div>
            <p className="text-xs text-[#888] font-medium">{footerText}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   NAVBAR COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();

  // Mega Menu States
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeMegaTab, setActiveMegaTab] = useState("buy");

  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState("about");

  const [trendsMenuOpen, setTrendsMenuOpen] = useState(false);
  const [activeTrendsTab, setActiveTrendsTab] = useState("market");

  const exploreRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const trendsRef = useRef<HTMLDivElement>(null);

  // Close all other menus helper
  const closeAllMenus = () => {
    setMegaMenuOpen(false);
    setAboutMenuOpen(false);
    setTrendsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutMenuOpen(false);
      }
      if (trendsRef.current && !trendsRef.current.contains(event.target as Node)) {
        setTrendsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const isHeroPage = pathname === "/";

  const textColor = isHeroPage && !scrolled ? "text-white" : "text-[#0D1B2A]";
  const logoAccent = isHeroPage && !scrolled ? "text-[#B8860B]" : "text-[#B8860B]";
  const borderColor = isHeroPage && !scrolled ? "border-white/10" : "border-[#0D1B2A]/10";
  const bgHover = isHeroPage && !scrolled ? "hover:bg-white/10" : "hover:bg-[#F5E6C0]/60";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col">
      {/* Top Strip Banner */}
      {showBanner && (
        <div className="bg-[#0D1B2A] py-1.5 overflow-hidden flex whitespace-nowrap group relative border-b border-[#B8860B]/30">
          <div className="animate-marquee flex gap-10 items-center w-max pr-10">
            {Array(4).fill([
              "PREMIUM LUXURY LISTINGS",
              "100% RERA VERIFIED",
              "ZERO BROKERAGE",
              "AI-POWERED MATCHING",
              "TOP BUILDERS"
            ]).flat().map((text, i) => (
              <div key={`m1-${i}`} className="flex items-center gap-10">
                <span className="font-serif font-bold text-[#F5E6C0] text-xs tracking-widest">{text}</span>
                <span className="text-[#B8860B] text-[10px]">✦</span>
              </div>
            ))}
          </div>
          <div className="animate-marquee flex gap-10 items-center w-max pr-10" aria-hidden="true">
            {Array(4).fill([
              "PREMIUM LUXURY LISTINGS",
              "100% RERA VERIFIED",
              "ZERO BROKERAGE",
              "AI-POWERED MATCHING",
              "TOP BUILDERS"
            ]).flat().map((text, i) => (
              <div key={`m2-${i}`} className="flex items-center gap-10">
                <span className="font-serif font-bold text-[#F5E6C0] text-xs tracking-widest">{text}</span>
                <span className="text-[#B8860B] text-[10px]">✦</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-[#B8860B] bg-[#0D1B2A] shadow-[-10px_0_10px_#0D1B2A] rounded-full p-1 transition-colors z-10 cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <header
        className={`w-full transition-all duration-500 ${scrolled || !isHeroPage
          ? "bg-[#FFFDF7]/95 backdrop-blur-xl border-b border-[#0D1B2A]/8 shadow-[0_2px_20px_rgba(13,27,42,0.08)] py-0"
          : "bg-transparent py-2"
          }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 group py-0 my-0">
            <img
              src="/dream home logo.png"
              alt="DreamHome Realty Logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 py-0 my-0"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-stretch gap-1 self-stretch">

            {/* ── EXPLORE SERVICES MEGA MENU ── */}
            <div ref={exploreRef} className="static flex items-center h-full" onMouseLeave={() => setMegaMenuOpen(false)}>
              <button
                onMouseEnter={() => {
                  setMegaMenuOpen(true);
                  setAboutMenuOpen(false);
                  setTrendsMenuOpen(false);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  const next = !megaMenuOpen;
                  closeAllMenus();
                  setMegaMenuOpen(next);
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold font-ui transition-all ${textColor} ${bgHover}`}
              >
                Explore Services
                <ChevronDown size={14} className={`transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {megaMenuOpen && (
                <MegaMenuPanel
                  tabs={MEGA_MENU_TABS}
                  data={MEGA_MENU_DATA}
                  activeTab={activeMegaTab}
                  setActiveTab={setActiveMegaTab}
                  onClose={() => setMegaMenuOpen(false)}
                  footerText="Click any service to explore detailed insights and listings"
                />
              )}
            </div>

            {/* ── ABOUT US MEGA MENU ── */}
            <div ref={aboutRef} className="static flex items-center h-full" onMouseLeave={() => setAboutMenuOpen(false)}>
              <button
                onMouseEnter={() => {
                  setAboutMenuOpen(true);
                  setMegaMenuOpen(false);
                  setTrendsMenuOpen(false);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  const next = !aboutMenuOpen;
                  closeAllMenus();
                  setAboutMenuOpen(next);
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold font-ui transition-all ${textColor} ${bgHover}`}
              >
                About Us
                <ChevronDown size={14} className={`transition-transform ${aboutMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {aboutMenuOpen && (
                <MegaMenuPanel
                  tabs={ABOUT_MENU_TABS}
                  data={ABOUT_MENU_DATA}
                  activeTab={activeAboutTab}
                  setActiveTab={setActiveAboutTab}
                  onClose={() => setAboutMenuOpen(false)}
                  footerText="Click any link to learn more about our company and updates"
                />
              )}
            </div>

            {/* ── TRENDS & INSIGHTS MEGA MENU ── */}
            <div ref={trendsRef} className="static flex items-center h-full" onMouseLeave={() => setTrendsMenuOpen(false)}>
              <button
                onMouseEnter={() => {
                  setTrendsMenuOpen(true);
                  setMegaMenuOpen(false);
                  setAboutMenuOpen(false);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  const next = !trendsMenuOpen;
                  closeAllMenus();
                  setTrendsMenuOpen(next);
                }}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold font-ui transition-all ${textColor} ${bgHover}`}
              >
                <BarChart3 size={16} />
                Trends & Insights
                <ChevronDown size={14} className={`transition-transform ${trendsMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {trendsMenuOpen && (
                <MegaMenuPanel
                  tabs={TRENDS_MENU_TABS}
                  data={TRENDS_MENU_DATA}
                  activeTab={activeTrendsTab}
                  setActiveTab={setActiveTrendsTab}
                  onClose={() => setTrendsMenuOpen(false)}
                  footerText="Explore market data, calculators, and AI insights to make smarter decisions"
                />
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2.5 rounded-full transition-all ${textColor} ${bgHover} border ${borderColor} cursor-pointer`}
              title="Advanced Search"
            >
              <Search size={18} strokeWidth={2} />
            </button>
            <button
              onClick={() => setWishlistOpen(true)}
              className={`relative p-2.5 rounded-full transition-all ${textColor} ${bgHover} border ${borderColor} cursor-pointer`}
              title="Your Wishlist"
            >
              <Heart size={18} strokeWidth={2} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B8860B] text-white text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold border border-[#FFFDF7] animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>
            {user ? (
              <div className="flex items-center gap-1">
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold font-ui transition-all ${textColor} ${bgHover}`}
                >
                  <User size={15} strokeWidth={2.5} className="text-[#B8860B]" />
                  Hi, {user.firstName}
                </Link>
                <button
                  onClick={logout}
                  className={`px-3 py-2 rounded-full text-xs font-bold font-ui transition-all text-rose-600 hover:bg-rose-50 cursor-pointer`}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold font-ui transition-all ${textColor} ${bgHover}`}
              >
                <User size={18} strokeWidth={2} />
                Sign In
              </Link>
            )}
            <Link
              href="/sell"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B8860B] text-white text-sm font-bold font-ui shadow-[0_4px_14px_rgba(184,134,11,0.35)] hover:bg-[#9A7209] hover:shadow-[0_6px_20px_rgba(184,134,11,0.45)] transition-all"
            >
              <Plus size={16} />
              List Property
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                scrolled || !isHeroPage ? "text-[#0D1B2A]" : "text-white"
              }`}
              title="Search"
            >
              <Search size={20} />
            </button>
            <button
              onClick={() => setWishlistOpen(true)}
              className={`relative p-2 rounded-xl transition-colors cursor-pointer ${
                scrolled || !isHeroPage ? "text-[#0D1B2A]" : "text-white"
              }`}
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-[#B8860B] text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold border border-[#FFFDF7] animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-all ${scrolled || !isHeroPage ? "bg-[#0D1B2A] text-[#B8860B]" : "bg-white/10 text-white"
              }`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="absolute inset-0 bg-[#0D1B2A]/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
        <div
          className={`absolute top-0 right-0 w-80 h-full bg-[#FFFDF7] shadow-2xl transition-transform duration-500 flex flex-col ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-[#F7F3E8]">
            <div className="flex items-center gap-3">
              <img
                src="/dream home logo.png"
                alt="DreamHome Realty Logo"
                className="h-10 w-auto object-contain"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
              />
            </div>
            <button onClick={() => setMenuOpen(false)} className="p-2 rounded-full hover:bg-[#F7F3E8]">
              <X size={20} className="text-[#555]" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {[
              { name: "New Projects", href: "/projects", icon: Building },
              { name: "Trends & Insights", href: "/trends-insights", icon: BarChart3 },
              { name: "NRI Desk", href: "/nri", icon: Globe },
              { name: "Invest", href: "/invest", icon: TrendingUp },
              { name: "About Us", href: "/about", icon: Info },
              { name: "Articles", href: "/blog", icon: BookOpen },
              { name: "Dashboard", href: "/dashboard", icon: User },
            ].map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all ${pathname === href
                  ? "bg-[#0D1B2A] text-white"
                  : "text-[#0D1B2A] hover:bg-[#F5E6C0]/60 hover:text-[#B8860B]"
                  }`}
              >
                <Icon size={18} className={pathname === href ? "text-[#B8860B]" : "text-[#B8860B]"} />
                {name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-[#F7F3E8] space-y-3">
            {user ? (
              <div className="space-y-2 w-full">
                <div className="flex items-center justify-between px-4 py-2 bg-[#F7F3E8] rounded-xl">
                  <span className="text-xs text-[#0D1B2A] font-bold">Logged in: {user.firstName}</span>
                  <span className="text-[10px] bg-[#B8860B]/10 text-[#B8860B] font-extrabold uppercase px-2 py-0.5 rounded-full">{user.role}</span>
                </div>
                <button 
                  onClick={() => { logout(); setMenuOpen(false); }} 
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs font-ui cursor-pointer hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border-2 border-[#0D1B2A]/20 text-[#0D1B2A] font-bold text-sm font-ui">
                <User size={18} /> Sign In
              </Link>
            )}
            <Link href="/sell" onClick={() => setMenuOpen(false)} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#B8860B] text-white font-bold text-sm font-ui shadow-lg">
              <Plus size={18} /> List Property Free
            </Link>
          </div>
        </div>
      </div>

      {/* Wishlist Sidebar Drawer */}
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />

      {/* Advanced Search Overlay */}
      <AdvancedSearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}