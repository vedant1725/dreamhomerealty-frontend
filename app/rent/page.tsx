"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { RENTAL_PROPERTIES } from "@/lib/data";
import PropertyCard from "@/components/ui/PropertyCard";
import SearchBar from "@/components/ui/SearchBar";
import { SlidersHorizontal, LayoutGrid, Map as MapIcon, X, Filter } from "lucide-react";

const RENT_RANGES = ["Any", "Under ₹20k/mo", "₹20k–50k/mo", "₹50k–1L/mo", "₹1L+/mo"];
const FURNISHING_OPTS = ["Any", "Fully Furnished", "Semi Furnished", "Unfurnished"];
const BEDS_OPTIONS = ["Any", "1", "2", "3", "4+"];

function RentPageContent() {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedRent, setSelectedRent] = useState("Any");
  const [furnishing, setFurnishing] = useState("Any");
  const [selectedBeds, setSelectedBeds] = useState("Any");
  const [locationQuery, setLocationQuery] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [petFriendly, setPetFriendly] = useState(false);
  const [family, setFamily] = useState(false);
  const [sortBy, setSortBy] = useState("Relevance");

  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const bedsParam = searchParams.get("beds");
  const budgetParam = searchParams.get("budget");
  const amenitiesParam = searchParams.get("amenities");

  // Load rental properties from the backend API
  useEffect(() => {
    const loadRentals = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/properties?limit=100");
        const data = await res.json();
        if (data.success && data.properties) {
          const rentalItems = data.properties.filter((p: any) => p.monthlyRent && p.monthlyRent > 0);
          setRentals(rentalItems.length > 0 ? rentalItems : RENTAL_PROPERTIES);
        } else {
          setRentals(RENTAL_PROPERTIES);
        }
      } catch (err) {
        console.error("Backend offline, loading fallback rentals:", err);
        setRentals(RENTAL_PROPERTIES);
      } finally {
        setLoading(false);
      }
    };
    loadRentals();
  }, []);

  // React to URL changes from the Advanced Search
  useEffect(() => {
    if (q) setLocationQuery(q);
    if (bedsParam) {
      if (bedsParam === "4" || bedsParam === "5") {
        setSelectedBeds("4+");
      } else {
        setSelectedBeds(bedsParam);
      }
    }
    if (budgetParam) {
      if (budgetParam.includes("20k") || budgetParam.includes("Under")) {
        setSelectedRent("Under ₹20k/mo");
      } else if (budgetParam.includes("50k")) {
        setSelectedRent("₹20k–50k/mo");
      } else if (budgetParam.includes("1 L") || budgetParam.includes("1L")) {
        setSelectedRent("₹50k–1L/mo");
      } else if (budgetParam.includes("1 L+") || budgetParam.includes("1L+")) {
        setSelectedRent("₹1L+/mo");
      }
    }
    if (amenitiesParam) {
      setSelectedAmenities(amenitiesParam.split(","));
    }
  }, [q, bedsParam, budgetParam, amenitiesParam]);

  const filteredRentals = useMemo(() => {
    const baseList = [...rentals, ...rentals.map(p => ({ ...p, id: p.id + 200 }))];
    
    return baseList.filter(p => {
      // 1. Furnishing filter
      if (furnishing !== "Any" && p.furnishing !== furnishing) return false;
      
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
      
      // 4. Rent Budget filter
      if (selectedRent !== "Any") {
        const rent = p.monthlyRent || 0;
        if (selectedRent === "Under ₹20k/mo" && rent >= 20000) return false;
        if (selectedRent === "₹20k–50k/mo" && (rent < 20000 || rent > 50000)) return false;
        if (selectedRent === "₹50k–1L/mo" && (rent < 50000 || rent > 100000)) return false;
        if (selectedRent === "₹1L+/mo" && rent < 100000) return false;
      }

      // 5. Preferences
      if (petFriendly && !p.tags?.some(t => t.toLowerCase().includes("pet"))) return false;
      if (family && !p.tags?.some(t => t.toLowerCase().includes("family"))) return false;

      // 6. Amenities
      if (selectedAmenities.length > 0) {
        const matchesAmenities = selectedAmenities.every(amenity => 
          p.amenities.includes(amenity) || p.tags?.includes(amenity)
        );
        if (!matchesAmenities) return false;
      }

      return true;
    });
  }, [furnishing, selectedBeds, locationQuery, selectedRent, petFriendly, family, selectedAmenities]);

  const sortedRentals = useMemo(() => {
    let result = [...filteredRentals];
    if (sortBy === "Rent: Low to High") {
      result.sort((a, b) => (a.monthlyRent || 0) - (b.monthlyRent || 0));
    } else if (sortBy === "Rent: High to Low") {
      result.sort((a, b) => (b.monthlyRent || 0) - (a.monthlyRent || 0));
    }
    return result;
  }, [filteredRentals, sortBy]);

  const activeFiltersCount = [
    selectedRent !== "Any",
    furnishing !== "Any",
    selectedBeds !== "Any",
    locationQuery !== "",
    selectedAmenities.length > 0,
    petFriendly,
    family
  ].filter(Boolean).length;

  const handleResetFilters = () => {
    setSelectedRent("Any");
    setFurnishing("Any");
    setSelectedBeds("Any");
    setLocationQuery("");
    setSelectedAmenities([]);
    setPetFriendly(false);
    setFamily(false);
  };

  return (
    <main className="bg-[#FFFDF7] flex flex-col min-h-screen">
      <Navbar />
      <div className="sticky top-0 z-40 bg-white border-b border-[#F7F3E8] shadow-sm pt-[72px]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3">
          <SearchBar size="compact" defaultTab="rent" />
        </div>
      </div>
      <div className="bg-[#0D1B2A] py-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <span className="section-label text-[#F5E6C0] mb-3">Rental Homes</span>
          <h1 className="font-serif text-4xl font-bold text-white mt-3">Find Your Perfect Rental</h1>
          <p className="text-white/60 mt-2 text-sm">Explore premium furnished and unfurnished homes across India's top cities.</p>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 bg-white border border-[#F7F3E8] rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(13,27,42,0.07)]">
              <div className="px-5 py-4 border-b border-[#F7F3E8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#B8860B]" />
                  <h3 className="font-ui font-bold text-[#0D1B2A]">Rental Filters</h3>
                  {activeFiltersCount > 0 && (
                    <span className="bg-[#B8860B] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">{activeFiltersCount}</span>
                  )}
                </div>
                {activeFiltersCount > 0 && (
                  <button onClick={handleResetFilters} className="text-xs text-[#B8860B] font-bold hover:underline">
                    Reset All
                  </button>
                )}
              </div>
              <div className="p-5 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-[#0D1B2A] mb-3 font-ui">Monthly Rent</h4>
                  <div className="space-y-2">
                    {RENT_RANGES.map(r => (
                      <button
                        key={r}
                        onClick={() => setSelectedRent(r)}
                        className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${
                          selectedRent === r ? "bg-[#F5E6C0] text-[#B8860B] font-bold" : "text-[#555] hover:bg-[#F7F3E8]"
                        }`}
                      >
                        <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedRent === r ? "border-[#B8860B]" : "border-[#ddd]"}`}>
                          {selectedRent === r && <span className="w-2 h-2 rounded-full bg-[#B8860B]"></span>}
                        </span>
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0D1B2A] mb-3 font-ui">Furnishing</h4>
                  <div className="flex flex-wrap gap-2">
                    {FURNISHING_OPTS.map(opt => (
                      <button key={opt} onClick={() => setFurnishing(opt)} className={`px-3.5 py-2 rounded-lg text-xs font-bold border transition-all ${furnishing === opt ? "bg-[#0D1B2A] text-white border-[#0D1B2A]" : "bg-white text-[#555] border-[#F7F3E8] hover:border-[#B8860B]"}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0D1B2A] mb-3 font-ui">Bedrooms</h4>
                  <div className="flex gap-2">
                    {BEDS_OPTIONS.map(opt => (
                      <button
                        key={opt}
                        onClick={() => setSelectedBeds(opt)}
                        className={`flex-1 py-2.5 rounded-lg text-xs font-bold border transition-all ${
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
                <div>
                  <h4 className="text-sm font-bold text-[#0D1B2A] mb-3 font-ui">Preferences</h4>
                  {[
                    { label: "Pet Friendly", state: petFriendly, set: setPetFriendly },
                    { label: "Family Preferred", state: family, set: setFamily },
                  ].map(({ label, state, set }) => (
                    <label key={label} className="flex items-center gap-3 cursor-pointer mb-2 group">
                      <div onClick={() => set(!state)} className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all shrink-0 ${state ? "bg-[#0D1B2A] border-[#0D1B2A]" : "border-[#ddd] group-hover:border-[#B8860B]"}`}>
                        {state && <X size={12} className="text-white" />}
                      </div>
                      <span className="text-sm text-[#555] group-hover:text-[#0D1B2A] font-medium">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <p className="text-[#0D1B2A] font-semibold">
                <span className="font-bold text-xl">{sortedRentals.length}</span>
                <span className="text-[#888] ml-1.5 text-sm">rental homes found</span>
              </p>
              <div className="flex items-center gap-3">
                <div className="flex bg-white border border-[#F7F3E8] rounded-xl overflow-hidden shadow-sm">
                  <button onClick={() => setViewMode("grid")} className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold ${viewMode === "grid" ? "bg-[#0D1B2A] text-white" : "text-[#555] hover:bg-[#F7F3E8]"}`}>
                    <LayoutGrid size={16} /> Grid
                  </button>
                  <button onClick={() => setViewMode("map")} className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold ${viewMode === "map" ? "bg-[#0D1B2A] text-white" : "text-[#555] hover:bg-[#F7F3E8]"}`}>
                    <MapIcon size={16} /> Map
                  </button>
                </div>
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="bg-white border border-[#F7F3E8] rounded-xl px-4 py-2.5 text-sm font-semibold text-[#0D1B2A] focus:outline-none cursor-pointer shadow-sm">
                  {["Relevance","Rent: Low to High","Rent: High to Low","Newest"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
            
            {viewMode === "grid" ? (
              <>
                {loading ? (
                  <div className="col-span-full py-24 text-center font-serif text-lg font-bold text-[#0D1B2A]">
                    Loading rental listings from database...
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {sortedRentals.length > 0 ? (
                      sortedRentals.map(p => (
                        <PropertyCard key={p.id} property={p} />
                      ))
                    ) : (
                      <div className="col-span-full flex flex-col items-center justify-center py-24 text-center bg-white rounded-2xl border border-[#F7F3E8] shadow-sm">
                        <div className="w-20 h-20 rounded-full bg-[#F7F3E8] flex items-center justify-center mb-4">
                          <MapIcon size={36} className="text-[#B8860B]" />
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-2">No rentals found</h3>
                        <p className="text-[#888] mb-6">Try adjusting your filters or location search query.</p>
                        <button onClick={handleResetFilters} className="btn-gold">
                          Clear Filters
                        </button>
                      </div>
                    )}
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

export default function RentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center justify-center font-serif text-[#0D1B2A] text-lg font-bold">Loading rental listings...</div>}>
      <RentPageContent />
    </Suspense>
  );
}