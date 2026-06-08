"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PropertyCard from "@/components/ui/PropertyCard";
import SearchBar from "@/components/ui/SearchBar";
import { PROPERTIES } from "@/lib/data";
import {
  SlidersHorizontal, Map as MapIcon, LayoutGrid, ChevronDown,
  X, BadgeCheck, Filter, ChevronLeft, ChevronRight as ChevronRightIcon
} from "lucide-react";

const BEDS_OPTIONS = ["Any", "1", "2", "3", "4", "5+"];
const PRICE_OPTIONS = ["Any", "Under ₹1Cr", "₹1–3 Cr", "₹3–5 Cr", "₹5–10 Cr", "₹10Cr+"];
const PROP_TYPES = ["All", "Apartment", "Villa", "Penthouse", "Plot", "Commercial"];
const SORT_OPTIONS = ["Relevance", "Price: Low to High", "Price: High to Low", "Newest First", "Most Popular"];

function BuyPageContent() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedBeds, setSelectedBeds] = useState("Any");
  const [selectedPrice, setSelectedPrice] = useState("Any");
  const [selectedType, setSelectedType] = useState("All");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Relevance");
  const [rera, setRera] = useState(false);
  const [verified, setVerified] = useState(false);
  const [page, setPage] = useState(1);

  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const bedsParam = searchParams.get("beds");
  const typeParam = searchParams.get("type");
  const budgetParam = searchParams.get("budget");
  const amenitiesParam = searchParams.get("amenities");

  // Load properties from the backend API
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/properties?limit=100");
        const data = await res.json();
        if (data.success && data.properties) {
          setProperties(data.properties);
        } else {
          setProperties(PROPERTIES);
        }
      } catch (err) {
        console.error("Backend offline, loading fallback properties:", err);
        setProperties(PROPERTIES);
      } finally {
        setLoading(false);
      }
    };
    loadProperties();
  }, []);

  // React to URL changes from the Advanced Search
  useEffect(() => {
    if (q) setLocationQuery(q);
    if (bedsParam) {
      if (bedsParam === "5") {
        setSelectedBeds("5+");
      } else {
        setSelectedBeds(bedsParam);
      }
    }
    if (typeParam) {
      setSelectedType(typeParam === "Any Type" ? "All" : typeParam);
    }
    if (budgetParam) {
      if (budgetParam.includes("50 L") || budgetParam.includes("Under")) {
        setSelectedPrice("Under ₹1Cr");
      } else if (budgetParam.includes("1Cr") || budgetParam.includes("3 Cr")) {
        setSelectedPrice("₹1–3 Cr");
      } else if (budgetParam.includes("3Cr") || budgetParam.includes("5 Cr")) {
        setSelectedPrice("₹3–5 Cr");
      } else if (budgetParam.includes("10 Cr") || budgetParam.includes("10Cr+")) {
        setSelectedPrice("₹10Cr+");
      }
    }
    if (amenitiesParam) {
      setSelectedAmenities(amenitiesParam.split(","));
    }
  }, [q, bedsParam, typeParam, budgetParam, amenitiesParam]);

  const filteredProps = useMemo(() => {
    return properties.filter(p => {
      // 1. Property Type filter
      if (selectedType !== "All" && p.type !== selectedType) return false;
      
      // 2. Bedrooms filter
      if (selectedBeds !== "Any") {
        const bedsNum = Number(selectedBeds.replace("+", ""));
        if (selectedBeds.includes("+")) {
          if (p.beds < bedsNum) return false;
        } else {
          if (p.beds !== bedsNum) return false;
        }
      }
      
      // 3. Location/Query filter
      if (locationQuery) {
        const query = locationQuery.toLowerCase();
        const matchesLoc = p.location.toLowerCase().includes(query) ||
                           p.city.toLowerCase().includes(query) ||
                           p.locality.toLowerCase().includes(query);
        if (!matchesLoc) return false;
      }
      
      // 4. Budget filter
      if (selectedPrice !== "Any") {
        const price = p.price;
        if (selectedPrice === "Under ₹1Cr" && price >= 10000000) return false;
        if (selectedPrice === "₹1–3 Cr" && (price < 10000000 || price > 30000000)) return false;
        if (selectedPrice === "₹3–5 Cr" && (price < 30000000 || price > 50000000)) return false;
        if (selectedPrice === "₹5–10 Cr" && (price < 50000000 || price > 100000000)) return false;
        if (selectedPrice === "₹10Cr+" && price < 100000000) return false;
      }
      
      // 5. Amenities filter
      if (selectedAmenities.length > 0) {
        const matchesAmenities = selectedAmenities.every(amenity => 
          p.amenities.includes(amenity) || p.tags.includes(amenity)
        );
        if (!matchesAmenities) return false;
      }

      if (rera && !p.rera) return false;
      if (verified && !p.verified) return false;
      return true;
    });
  }, [selectedType, selectedBeds, selectedPrice, locationQuery, selectedAmenities, rera, verified]);

  const sortedAndFilteredProps = useMemo(() => {
    let result = [...filteredProps];
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [filteredProps, sortBy]);

  const activeFiltersCount = [
    selectedBeds !== "Any",
    selectedPrice !== "Any",
    selectedType !== "All",
    locationQuery !== "",
    selectedAmenities.length > 0,
    rera,
    verified
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setSelectedBeds("Any");
    setSelectedPrice("Any");
    setSelectedType("All");
    setLocationQuery("");
    setSelectedAmenities([]);
    setRera(false);
    setVerified(false);
  };

  return (
    <main className="bg-[#FFFDF7] flex flex-col min-h-screen">
      <Navbar />

      {/* Sticky Search Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-[#F7F3E8] shadow-sm pt-[72px]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3">
          <SearchBar size="compact" defaultTab="buy" />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        <div className="flex gap-8">

          {/* ─── FILTER SIDEBAR (Desktop) ───────────────────────────── */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 bg-white border border-[#F7F3E8] rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(13,27,42,0.07)]">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#F7F3E8]">
                <h3 className="font-ui font-bold text-[#0D1B2A] flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#B8860B]" /> Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-[#B8860B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{activeFiltersCount}</span>
                  )}
                </h3>
                {activeFiltersCount > 0 && (
                  <button onClick={handleResetFilters} className="text-xs text-[#B8860B] font-bold hover:underline">
                    Reset All
                  </button>
                )}
              </div>

              <div className="p-5 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                {/* Property Type */}
                <div>
                  <h4 className="text-sm font-bold text-[#0D1B2A] mb-3 font-ui">Property Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {PROP_TYPES.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type === "All" ? "All" : type)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition-all ${
                          (selectedType === type || (selectedType === "All" && type === "All"))
                            ? "bg-[#0D1B2A] text-white border-[#0D1B2A]"
                            : "bg-white text-[#555] border-[#F7F3E8] hover:border-[#B8860B] hover:text-[#B8860B]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div>
                  <h4 className="text-sm font-bold text-[#0D1B2A] mb-3 font-ui">Budget</h4>
                  <div className="space-y-2">
                    {PRICE_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedPrice(opt)}
                        className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                          selectedPrice === opt ? "bg-[#F5E6C0] text-[#B8860B] font-bold" : "text-[#555] hover:bg-[#F7F3E8]"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedPrice === opt ? "border-[#B8860B]" : "border-[#ddd]"}`}>
                          {selectedPrice === opt && <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>}
                        </span>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <h4 className="text-sm font-bold text-[#0D1B2A] mb-3 font-ui">Bedrooms (BHK)</h4>
                  <div className="flex gap-2">
                    {BEDS_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedBeds(opt)}
                        className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition-all ${
                          selectedBeds === opt
                            ? "bg-[#0D1B2A] text-white border-[#0D1B2A]"
                            : "bg-white text-[#555] border-[#F7F3E8] hover:border-[#B8860B]"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                  {[
                    { label: "RERA Verified Only", state: rera, set: setRera },
                    { label: "Verified Listings", state: verified, set: setVerified },
                  ].map(({ label, state, set }) => (
                    <label key={label} className="flex items-center gap-3 cursor-pointer group">
                      <div
                        onClick={() => set(!state)}
                        className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all shrink-0 ${state ? "bg-[#0D1B2A] border-[#0D1B2A]" : "border-[#ddd] group-hover:border-[#B8860B]"}`}
                      >
                        {state && <X size={12} className="text-white" />}
                      </div>
                      <span className="text-sm text-[#555] group-hover:text-[#0D1B2A] font-medium">{label}</span>
                    </label>
                  ))}
                </div>

                {/* Area Size */}
                <div>
                  <h4 className="text-sm font-bold text-[#0D1B2A] mb-3 font-ui">Area Size (sqft)</h4>
                  <div className="flex gap-3 items-center">
                    <input type="number" placeholder="Min" className="flex-1 border border-[#F7F3E8] rounded-lg px-3 py-2 text-sm text-[#0D1B2A] focus:outline-none focus:border-[#B8860B] bg-[#F7F3E8]" />
                    <span className="text-[#888] text-sm">–</span>
                    <input type="number" placeholder="Max" className="flex-1 border border-[#F7F3E8] rounded-lg px-3 py-2 text-sm text-[#0D1B2A] focus:outline-none focus:border-[#B8860B] bg-[#F7F3E8]" />
                  </div>
                </div>

                {/* Possession */}
                <div>
                  <h4 className="text-sm font-bold text-[#0D1B2A] mb-3 font-ui">Possession Status</h4>
                  <div className="space-y-2">
                    {["Any", "Ready to Move", "Under Construction", "New Launch"].map(opt => (
                      <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors border-[#ddd] group-hover:border-[#B8860B]`}>
                          <span className="w-2 h-2 rounded-full bg-transparent group-hover:bg-[#B8860B]/30"></span>
                        </div>
                        <span className="text-sm text-[#555] group-hover:text-[#0D1B2A]">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* ─── MAIN CONTENT ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-[#0D1B2A] font-semibold">
                <span className="font-bold text-xl">{sortedAndFilteredProps.length}</span>
                <span className="text-[#888] ml-1.5 text-sm">properties found</span>
              </p>

              <div className="flex items-center gap-3">
                {/* Mobile Filter */}
                <button
                  onClick={() => setFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-[#F7F3E8] rounded-xl text-sm font-semibold text-[#0D1B2A] shadow-sm"
                >
                  <Filter size={16} className="text-[#B8860B]" /> Filters
                  {activeFiltersCount > 0 && <span className="bg-[#B8860B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{activeFiltersCount}</span>}
                </button>

                {/* View Toggle */}
                <div className="flex bg-white border border-[#F7F3E8] rounded-xl overflow-hidden shadow-sm">
                  <button onClick={() => setViewMode("grid")} className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-colors ${viewMode === "grid" ? "bg-[#0D1B2A] text-white" : "text-[#555] hover:bg-[#F7F3E8]"}`}>
                    <LayoutGrid size={16} /> Grid
                  </button>
                  <button onClick={() => setViewMode("map")} className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold transition-colors ${viewMode === "map" ? "bg-[#0D1B2A] text-white" : "text-[#555] hover:bg-[#F7F3E8]"}`}>
                    <MapIcon size={16} /> Map
                  </button>
                </div>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-[#F7F3E8] rounded-xl pl-4 pr-10 py-2.5 text-sm font-semibold text-[#0D1B2A] focus:outline-none focus:border-[#B8860B] cursor-pointer shadow-sm"
                  >
                    {SORT_OPTIONS.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888] pointer-events-none" />
                </div>
              </div>
            </div>

            {viewMode === "grid" ? (
              <>
                {loading ? (
                  <div className="col-span-full py-24 text-center font-serif text-lg font-bold text-[#0D1B2A]">
                    Loading properties from database...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {sortedAndFilteredProps.length > 0 ? sortedAndFilteredProps.map(p => (
                      <PropertyCard key={p.id} property={p} />
                    )) : (
                      <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 rounded-full bg-[#F7F3E8] flex items-center justify-center mb-4">
                          <MapIcon size={36} className="text-[#B8860B]" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-2">No properties found</h3>
                        <p className="text-[#888] mb-6">Try adjusting your filters to see more results.</p>
                        <button onClick={handleResetFilters} className="btn-gold">
                          Clear Filters
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Pagination */}
                {sortedAndFilteredProps.length > 0 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button onClick={() => setPage(Math.max(1, page - 1))} className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F7F3E8] text-[#555] hover:bg-[#0D1B2A] hover:text-white hover:border-[#0D1B2A] transition-all disabled:opacity-40" disabled={page === 1}>
                      <ChevronLeft size={18} />
                    </button>
                    {[1, 2, 3, 4, 5].map(p => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all ${page === p ? "bg-[#0D1B2A] text-white shadow-md" : "border border-[#F7F3E8] text-[#555] hover:border-[#0D1B2A] hover:text-[#0D1B2A]"}`}
                      >
                        {p}
                      </button>
                    ))}
                    <button onClick={() => setPage(page + 1)} className="w-10 h-10 flex items-center justify-center rounded-full border border-[#F7F3E8] text-[#555] hover:bg-[#0D1B2A] hover:text-white hover:border-[#0D1B2A] transition-all">
                      <ChevronRightIcon size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              /* Map View */
              <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-[#F7F3E8] shadow-md bg-[#e8f4f8]">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1400"
                  alt="Map"
                  className="w-full h-full object-cover opacity-40 grayscale"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="bg-white rounded-2xl shadow-xl p-6 text-center max-w-xs">
                    <MapIcon size={40} className="text-[#B8860B] mx-auto mb-3" />
                    <h3 className="font-serif text-xl font-bold text-[#0D1B2A] mb-1">Interactive Map View</h3>
                    <p className="text-sm text-[#888]">Google Maps integration pending. Connect your API key to enable live property pins.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function BuyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center font-serif text-[#0D1B2A] text-lg font-bold">Loading premium listings...</div>}>
      <BuyPageContent />
    </Suspense>
  );
}