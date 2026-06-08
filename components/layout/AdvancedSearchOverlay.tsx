"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, MapPin, ChevronDown, Check, Sparkles, SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { CITIES } from "@/lib/data";

interface AdvancedSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const PROP_TYPES = ["Apartment", "Villa", "Penthouse", "Plot", "Commercial", "Studio"] as const;
const BEDS_OPTIONS = ["Any", "1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"] as const;

const BUY_BUDGETS = [
  "Any Budget",
  "Under ₹50 L",
  "₹50L – ₹1 Cr",
  "₹1Cr – ₹3 Cr",
  "₹3Cr – ₹10 Cr",
  "₹10 Cr+"
] as const;

const RENT_BUDGETS = [
  "Any Budget",
  "Under ₹20k",
  "₹20k – ₹50k",
  "₹50k – ₹1 L",
  "₹1 L+"
] as const;

const AMENITIES = [
  "Private Pool",
  "Smart Home",
  "Gym",
  "Spa",
  "Lake View",
  "Sea View",
  "Golf Course",
  "24/7 Security",
  "Power Backup",
  "Club House"
];

export default function AdvancedSearchOverlay({ isOpen, onClose }: AdvancedSearchOverlayProps) {
  const router = useRouter();
  const [tab, setTab] = useState<"Buy" | "Rent">("Buy");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState<string>("Any");
  const [priceRange, setPriceRange] = useState<string>("Any Budget");
  const [propType, setPropType] = useState<string>("Any Type");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [propTypeOpen, setPropTypeOpen] = useState(false);
  const [budgetOpen, setBudgetOpen] = useState(false);

  const propRef = useRef<HTMLDivElement>(null);
  const budgetRef = useRef<HTMLDivElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (propRef.current && !propRef.current.contains(event.target as Node)) {
        setPropTypeOpen(false);
      }
      if (budgetRef.current && !budgetRef.current.contains(event.target as Node)) {
        setBudgetOpen(false);
      }
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update budget default when tab changes
  useEffect(() => {
    setPriceRange("Any Budget");
  }, [tab]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Suggestions based on CITIES data
  const filteredCities = CITIES.filter(city => 
    city.name.toLowerCase().includes(location.toLowerCase())
  );

  const handleSearch = () => {
    const route = tab === "Buy" ? "/buy" : "/rent";
    const params = new URLSearchParams();
    
    if (location) params.set("q", location);
    if (beds !== "Any") params.set("beds", beds.replace(" BHK", "").replace("+", ""));
    if (propType !== "Any Type") params.set("type", propType);
    if (priceRange !== "Any Budget") params.set("budget", priceRange);
    if (selectedAmenities.length > 0) {
      params.set("amenities", selectedAmenities.join(","));
    }

    router.push(`${route}?${params.toString()}`);
    onClose();
  };

  const toggleAmenity = (name: string) => {
    setSelectedAmenities(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  if (!isOpen) return null;

  const budgetOptions = tab === "Buy" ? BUY_BUDGETS : RENT_BUDGETS;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/40 flex flex-col justify-center items-center p-4 sm:p-6 transition-all duration-300 font-ui animate-fade-in cursor-pointer"
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#B8860B] hover:text-white transition-all transform hover:rotate-90 cursor-pointer shadow-lg border border-white/10"
      >
        <X size={22} />
      </button>

      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-white rounded-[2.5rem] border border-[#F7F3E8] shadow-[0_30px_90px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col p-6 sm:p-8 animate-scale-up cursor-default"
      >
        
        {/* Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E6C0]/50 border border-[#B8860B]/20 mb-3">
            <SlidersHorizontal size={14} className="text-[#B8860B]" />
            <span className="text-[#B8860B] text-xs font-bold uppercase tracking-wider">Advanced Property Search</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#0D1B2A]">
            Specify Your Dream Home
          </h2>
          <p className="text-xs text-[#888] mt-1">Refine your preferences to match with 2,500+ luxury listings</p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-[#F7F3E8] p-1 border border-[#F7F3E8] rounded-full">
            {(["Buy", "Rent"] as const).map((t) => {
              const isActive = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#0D1B2A] text-white shadow-md"
                      : "text-[#0D1B2A]/70 hover:text-[#0D1B2A] hover:bg-black/5"
                  }`}
                >
                  {t === "Buy" ? "Buy Property" : "Rent Property"}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          
          {/* Location with suggestion dropdown */}
          <div ref={suggestionRef} className="relative flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider pl-1">Location</label>
            <div className="flex items-center gap-3 px-4 py-3.5 border border-[#F7F3E8] bg-[#FFFDF7] rounded-2xl group focus-within:border-[#B8860B] transition-all">
              <MapPin size={18} className="text-[#B8860B] shrink-0" />
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder="City, locality, landmark..."
                className="w-full text-sm text-[#0D1B2A] outline-none bg-transparent font-semibold placeholder:text-[#aaa]"
              />
              {location && (
                <button onClick={() => setLocation("")} className="text-[#888] hover:text-[#0D1B2A]">
                  <X size={14} />
                </button>
              )}
            </div>

            {showSuggestions && location.length > 0 && filteredCities.length > 0 && (
              <div className="absolute top-[100%] left-0 right-0 mt-2 bg-white border border-[#E8E4DC] shadow-xl rounded-2xl py-2 z-50 animate-fade-in-up">
                {filteredCities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => {
                      setLocation(city.name);
                      setShowSuggestions(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-xs font-bold text-[#0D1B2A] hover:bg-[#B8860B]/10 hover:text-[#B8860B] transition-all"
                  >
                    <MapPin size={12} className="text-[#B8860B]" />
                    <span>{city.name}, {city.state}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bedrooms Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider pl-1">Bedrooms (BHK)</label>
            <div className="flex gap-2 h-full items-center">
              {BEDS_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => setBeds(opt)}
                  className={`flex-1 py-3.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                    beds === opt
                      ? "bg-[#0D1B2A] text-white border-[#0D1B2A] shadow-sm"
                      : "bg-[#FFFDF7] text-[#555] border-[#F7F3E8] hover:border-[#B8860B] hover:text-[#B8860B]"
                  }`}
                >
                  {opt.replace(" BHK", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type Dropdown */}
          <div ref={propRef} className="relative flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider pl-1">Property Type</label>
            <div
              onClick={() => { setPropTypeOpen(!propTypeOpen); setBudgetOpen(false); }}
              className="flex items-center justify-between px-4 py-3.5 border border-[#F7F3E8] bg-[#FFFDF7] rounded-2xl cursor-pointer hover:border-[#B8860B] transition-all"
            >
              <span className="text-sm font-bold text-[#0D1B2A]">{propType}</span>
              <ChevronDown size={16} className={`text-[#B8860B] transition-transform duration-300 ${propTypeOpen ? "rotate-180" : ""}`} />
            </div>

            {propTypeOpen && (
              <div className="absolute top-[100%] left-0 right-0 mt-2 bg-white border border-[#E8E4DC] shadow-xl rounded-2xl py-2 z-50 animate-fade-in-up">
                <div
                  onClick={() => { setPropType("Any Type"); setPropTypeOpen(false); }}
                  className={`flex items-center justify-between px-5 py-2.5 text-xs font-bold transition-all hover:bg-[#B8860B]/10 hover:text-[#B8860B] cursor-pointer ${
                    propType === "Any Type" ? "text-[#B8860B] bg-[#B8860B]/5" : "text-[#0D1B2A]"
                  }`}
                >
                  <span>Any Type</span>
                  {propType === "Any Type" && <Check size={12} className="text-[#B8860B]" />}
                </div>
                {PROP_TYPES.map((type) => (
                  <div
                    key={type}
                    onClick={() => {
                      setPropType(type);
                      setPropTypeOpen(false);
                    }}
                    className={`flex items-center justify-between px-5 py-2.5 text-xs font-bold transition-all hover:bg-[#B8860B]/10 hover:text-[#B8860B] cursor-pointer ${
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

          {/* Budget Dropdown */}
          <div ref={budgetRef} className="relative flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider pl-1">Max Budget</label>
            <div
              onClick={() => { setBudgetOpen(!budgetOpen); setPropTypeOpen(false); }}
              className="flex items-center justify-between px-4 py-3.5 border border-[#F7F3E8] bg-[#FFFDF7] rounded-2xl cursor-pointer hover:border-[#B8860B] transition-all"
            >
              <span className="text-sm font-bold text-[#0D1B2A]">{priceRange}</span>
              <ChevronDown size={16} className={`text-[#B8860B] transition-transform duration-300 ${budgetOpen ? "rotate-180" : ""}`} />
            </div>

            {budgetOpen && (
              <div className="absolute top-[100%] left-0 right-0 mt-2 bg-white border border-[#E8E4DC] shadow-xl rounded-2xl py-2 z-50 animate-fade-in-up">
                {budgetOptions.map((b) => (
                  <div
                    key={b}
                    onClick={() => {
                      setPriceRange(b);
                      setBudgetOpen(false);
                    }}
                    className={`flex items-center justify-between px-5 py-2.5 text-xs font-bold transition-all hover:bg-[#B8860B]/10 hover:text-[#B8860B] cursor-pointer ${
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

        </div>

        {/* Amenities Checklist */}
        <div className="flex flex-col gap-2 mb-8">
          <label className="text-[10px] font-bold text-[#888] uppercase tracking-wider pl-1">Amenities</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {AMENITIES.map(amenity => {
              const isSelected = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-3 py-2.5 rounded-xl text-[10px] font-bold border transition-all cursor-pointer text-center truncate ${
                    isSelected
                      ? "bg-[#B8860B]/15 text-[#B8860B] border-[#B8860B]/40 shadow-sm"
                      : "bg-[#FFFDF7] text-[#555] border-[#F7F3E8] hover:border-[#B8860B]/30 hover:bg-[#B8860B]/5"
                  }`}
                >
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        {/* Search CTA */}
        <button
          onClick={handleSearch}
          className="group/btn relative w-full overflow-hidden flex items-center justify-center gap-2 bg-[#B8860B] hover:bg-[#9A7209] text-white py-4.5 rounded-2xl font-bold transition-all duration-300 text-sm whitespace-nowrap cursor-pointer shadow-lg shadow-[#B8860B]/20 hover:shadow-xl hover:shadow-[#B8860B]/30 transform hover:scale-[1.01] active:scale-[0.99] mt-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out"></div>
          <Search size={18} className="transition-transform duration-300 group-hover/btn:scale-110" />
          <span>FIND PROPERTIES</span>
        </button>

      </div>
    </div>
  );
}
