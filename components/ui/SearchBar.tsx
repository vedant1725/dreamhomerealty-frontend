"use client";
import { useState, useRef, useEffect } from "react";
import { Search, MapPin, ChevronDown, X, Check } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  defaultTab?: "buy" | "rent" | "sell";
  size?: "hero" | "compact";
  className?: string;
}

const TABS = ["Buy", "Rent", "Sell"] as const;

const PROP_TYPES = ["Any Type", "Apartment", "Villa", "Penthouse", "Plot"] as const;
const BEDS_OPTIONS = ["Any", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"] as const;
const BUDGET_OPTIONS = [
  "Any Budget",
  "Under ₹50 L",
  "₹50L – ₹1 Cr",
  "₹1Cr – ₹3 Cr",
  "₹3Cr – ₹10 Cr",
  "₹10 Cr+"
] as const;

export default function SearchBar({ defaultTab = "buy", size = "hero", className = "" }: SearchBarProps) {
  const [tab, setTab] = useState<typeof TABS[number]>(defaultTab === "buy" ? "Buy" : defaultTab === "rent" ? "Rent" : "Sell");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState<string>("Any");
  const [priceRange, setPriceRange] = useState<string>("Any Budget");
  const [propType, setPropType] = useState<string>("Any Type");
  
  // Dropdown States
  const [propTypeOpen, setPropTypeOpen] = useState(false);
  const [bedsOpen, setBedsOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);

  // Refs for outside click detection
  const propRef = useRef<HTMLDivElement>(null);
  const bedsRef = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Sync location and filters with query parameters on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      if (q) setLocation(q);

      const bedsParam = params.get("beds");
      if (bedsParam) {
        if (bedsParam === "5" || bedsParam === "5+") setBeds("5+ BHK");
        else setBeds(bedsParam + " BHK");
      }

      const typeParam = params.get("type");
      if (typeParam) setPropType(typeParam);

      const budgetParam = params.get("budget");
      if (budgetParam) setPriceRange(budgetParam);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (propRef.current && !propRef.current.contains(event.target as Node)) {
        setPropTypeOpen(false);
      }
      if (bedsRef.current && !bedsRef.current.contains(event.target as Node)) {
        setBedsOpen(false);
      }
      if (budgetRef.current && !budgetRef.current.contains(event.target as Node)) {
        setBudgetOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    const route = tab === "Buy" ? "/buy" : tab === "Rent" ? "/rent" : "/sell";
    const params = new URLSearchParams();
    if (location) params.set("q", location);
    if (beds !== "Any") params.set("beds", beds);
    if (propType !== "Any Type") params.set("type", propType);
    if (priceRange !== "Any Budget") params.set("budget", priceRange);
    router.push(`${route}?${params.toString()}`);
  };

  if (size === "compact") {
    return (
      <div className={`flex items-center bg-white rounded-full border border-[#F7F3E8] shadow-sm overflow-hidden ${className}`}>
        <div className="flex items-center gap-2 flex-1 px-4 py-2.5">
          <MapPin size={16} className="text-[#B8860B] shrink-0" />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, locality, or project..."
            className="flex-1 bg-transparent text-sm text-[#0D1B2A] placeholder:text-[#888] outline-none"
          />
          {location && (
            <button onClick={() => setLocation("")} className="text-[#888] hover:text-[#0D1B2A]">
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="bg-[#B8860B] text-white px-5 py-2.5 flex items-center gap-2 font-bold text-sm font-ui hover:bg-[#9A7209] transition-colors cursor-pointer"
        >
          <Search size={16} /> Search
        </button>
      </div>
    );
  }

  return (
    <div className={`${className} select-none`}>
      {/* iOS/Stripe Styled Tabs */}
      <div className="inline-flex bg-white/10 backdrop-blur-md p-1 border border-white/10 rounded-full mb-4">
        {TABS.map((t) => {
          const isActive = tab === t;
          return (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setPropTypeOpen(false);
                setBedsOpen(false);
                setBudgetOpen(false);
              }}
              className={`relative px-6 py-2.5 rounded-full text-xs font-bold font-ui uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-white text-[#0D1B2A] shadow-lg"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              }`}
            >
              {t} {t === "Buy" ? "a Home" : t === "Rent" ? "a Home" : "Your Home"}
            </button>
          );
        })}
      </div>

      {/* Advanced Glassmorphic Search Form Container */}
      <div className="bg-white rounded-2xl md:rounded-full shadow-[0_20px_50px_rgba(13,27,42,0.15)] border border-[#F7F3E8] p-2 md:p-1.5">
        <div className="flex flex-col md:flex-row md:items-center">
          
          {/* 1. Location Input */}
          <div className="flex-1 flex items-center gap-3 px-5 py-3.5 border-b md:border-b-0 md:border-r border-[#F7F3E8] group">
            <MapPin size={20} className="text-[#B8860B] shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <div className="flex-1">
              <p className="text-[9px] font-bold font-ui text-[#888] uppercase tracking-widest mb-0.5">Location</p>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, locality, landmark or project..."
                className="w-full text-sm text-[#0D1B2A] placeholder:text-[#aaa] outline-none bg-transparent font-medium"
              />
            </div>
            {location && (
              <button 
                onClick={() => setLocation("")} 
                className="text-[#888] hover:text-[#0D1B2A] p-1 rounded-full hover:bg-black/5"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* 2. Custom Property Type Dropdown */}
          <div ref={propRef} className={`relative flex-1 md:flex-none md:w-[170px] flex items-center gap-2 px-5 py-3.5 border-b md:border-b-0 md:border-r border-[#F7F3E8] cursor-pointer transition-all duration-300 ${propTypeOpen ? "z-40" : "z-10"}`} onClick={() => { setPropTypeOpen(!propTypeOpen); setBedsOpen(false); setBudgetOpen(false); }}>
            <div className="flex-1 font-bold">
              <p className="text-[9px] font-bold font-ui text-[#888] uppercase tracking-widest mb-0.5">Property Type</p>
              <div className="flex items-center justify-between text-sm text-[#0D1B2A] font-bold">
                <span className="truncate">{propType}</span>
                <ChevronDown size={14} className={`text-[#B8860B] transition-transform duration-300 ${propTypeOpen ? "rotate-180" : ""}`} />
              </div>
            </div>
            {propTypeOpen && (
              <div className="absolute top-full left-0 mt-3 bg-white border border-[#E8E4DC] shadow-[0_15px_40px_rgba(13,27,42,0.18)] rounded-2xl py-2 z-50 animate-fade-in-up w-full md:w-60">
                {PROP_TYPES.map((type) => (
                  <div
                    key={type}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPropType(type);
                      setPropTypeOpen(false);
                    }}
                    className={`flex items-center justify-between px-5 py-2.5 text-xs font-bold transition-all hover:bg-[#B8860B]/10 hover:text-[#B8860B] ${
                      propType === type ? "text-[#B8860B] bg-[#B8860B]/5" : "text-[#0D1B2A]"
                    }`}
                  >
                    <span>{type}</span>
                    {propType === type && <Check size={12} className="text-[#B8860B]" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 3. Custom Bedrooms Dropdown */}
          <div ref={bedsRef} className={`relative flex-1 md:flex-none md:w-[130px] flex items-center gap-2 px-5 py-3.5 border-b md:border-b-0 md:border-r border-[#F7F3E8] cursor-pointer transition-all duration-300 ${bedsOpen ? "z-40" : "z-10"}`} onClick={() => { setBedsOpen(!bedsOpen); setPropTypeOpen(false); setBudgetOpen(false); }}>
            <div className="flex-1 font-bold">
              <p className="text-[9px] font-bold font-ui text-[#888] uppercase tracking-widest mb-0.5">Bedrooms</p>
              <div className="flex items-center justify-between text-sm text-[#0D1B2A] font-bold">
                <span className="truncate">{beds}</span>
                <ChevronDown size={14} className={`text-[#B8860B] transition-transform duration-300 ${bedsOpen ? "rotate-180" : ""}`} />
              </div>
            </div>
            {bedsOpen && (
              <div className="absolute top-full left-0 mt-3 bg-white border border-[#E8E4DC] shadow-[0_15px_40px_rgba(13,27,42,0.18)] rounded-2xl py-2 z-50 animate-fade-in-up w-full md:w-60">
                {BEDS_OPTIONS.map((opt) => (
                  <div
                    key={opt}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBeds(opt);
                      setBedsOpen(false);
                    }}
                    className={`flex items-center justify-between px-5 py-2.5 text-xs font-bold transition-all hover:bg-[#B8860B]/10 hover:text-[#B8860B] ${
                      beds === opt ? "text-[#B8860B] bg-[#B8860B]/5" : "text-[#0D1B2A]"
                    }`}
                  >
                    <span>{opt}</span>
                    {beds === opt && <Check size={12} className="text-[#B8860B]" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. Custom Budget Dropdown */}
          <div ref={budgetRef} className={`relative flex-1 md:flex-none md:w-[170px] flex items-center gap-2 px-5 py-3.5 md:mr-2 cursor-pointer transition-all duration-300 ${budgetOpen ? "z-40" : "z-10"}`} onClick={() => { setBudgetOpen(!budgetOpen); setPropTypeOpen(false); setBedsOpen(false); }}>
            <div className="flex-1 font-bold">
              <p className="text-[9px] font-bold font-ui text-[#888] uppercase tracking-widest mb-0.5">Budget</p>
              <div className="flex items-center justify-between text-sm text-[#0D1B2A] font-bold">
                <span className="truncate">{priceRange}</span>
                <ChevronDown size={14} className={`text-[#B8860B] transition-transform duration-300 ${budgetOpen ? "rotate-180" : ""}`} />
              </div>
            </div>
            {budgetOpen && (
              <div className="absolute top-full left-0 md:left-auto md:right-0 mt-3 bg-white border border-[#E8E4DC] shadow-[0_15px_40px_rgba(13,27,42,0.18)] rounded-2xl py-2 z-50 animate-fade-in-up w-full md:w-60">
                {BUDGET_OPTIONS.map((b) => (
                  <div
                    key={b}
                    onClick={(e) => {
                      e.stopPropagation();
                      setPriceRange(b);
                      setBudgetOpen(false);
                    }}
                    className={`flex items-center justify-between px-5 py-2.5 text-xs font-bold transition-all hover:bg-[#B8860B]/10 hover:text-[#B8860B] ${
                      priceRange === b ? "text-[#B8860B] bg-[#B8860B]/5" : "text-[#0D1B2A]"
                    }`}
                  >
                    <span>{b}</span>
                    {priceRange === b && <Check size={12} className="text-[#B8860B]" />}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Animated Search Button */}
          <button
            onClick={handleSearch}
            className="group/btn relative m-1 overflow-hidden flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#9A7209] text-white px-8 py-4 rounded-xl md:rounded-full font-bold font-ui transition-all duration-300 text-sm whitespace-nowrap min-w-[145px] cursor-pointer shadow-[0_4px_15px_rgba(184,134,11,0.3)] hover:shadow-[0_8px_25px_rgba(184,134,11,0.5)] transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Sheen sweep animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out font-bold"></div>
            
            <Search size={18} className="transition-transform duration-300 group-hover/btn:scale-110" />
            <span>Search</span>
          </button>

        </div>
      </div>
    </div>
  );
}
