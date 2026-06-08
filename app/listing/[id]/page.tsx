import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { PROPERTIES } from "@/lib/data";
import {
  MapPin, BedDouble, Bath, Maximize2, Share2, Heart, Phone, Calendar,
  BadgeCheck, Shield, CheckCircle2, ChevronLeft, ChevronRight, TrendingUp,
  Building, Car, Wind, Wifi, Home, ArrowRight
} from "lucide-react";
import Link from "next/link";
import SavePropertyButton from "@/components/ui/SavePropertyButton";
import ContactAgentForm from "@/components/ui/ContactAgentForm";

async function getProperty(id: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/properties/${id}`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success && data.property) {
      return data.property;
    }
  } catch (err) {
    console.error("Failed to fetch property details from backend:", err);
  }
  return PROPERTIES.find(p => p.id === Number(id)) ?? PROPERTIES[0];
}

async function getSimilarProperties(city: string, id: number) {
  try {
    const res = await fetch(`http://localhost:5000/api/properties?city=${city}&limit=5`, { next: { revalidate: 60 } });
    const data = await res.json();
    if (data.success && data.properties) {
      return data.properties.filter((p: any) => p.id !== id).slice(0, 3);
    }
  } catch (err) {
    console.error("Failed to fetch similar properties from backend:", err);
  }
  return PROPERTIES.filter(p => p.city === city && p.id !== id).slice(0, 3);
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await getProperty(id);
  const similarProps = await getSimilarProperties(property.city, property.id);

  return (
    <main className="bg-[#FFFDF7]">
      <Navbar />

      {/* Breadcrumb */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-24 pb-2">
        <nav className="flex items-center gap-2 text-xs text-[#888]">
          <Link href="/" className="hover:text-[#B8860B] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/buy" className="hover:text-[#B8860B] transition-colors">Buy</Link>
          <span>/</span>
          <Link href={`/buy?city=${property.city}`} className="hover:text-[#B8860B] transition-colors">{property.city}</Link>
          <span>/</span>
          <span className="text-[#0D1B2A] font-medium truncate max-w-[200px]">{property.locality}</span>
        </nav>
      </div>

      {/* ─── IMAGE GALLERY ─────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[420px] md:h-[520px]">
          <div className="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer overflow-hidden">
            <img src={property.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
          </div>
          {property.images.slice(1, 5).map((img, i) => (
            <div key={i} className="relative group cursor-pointer overflow-hidden hidden md:block">
              <img src={img} alt={`View ${i + 2}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              {i === 3 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold font-ui text-lg">+{(property.images.length - 4)} Photos</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── MAIN CONTENT ──────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8">

          {/* Left Column */}
          <div className="space-y-8">

            {/* Header */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(13,27,42,0.07)]">
              <div className="flex flex-wrap gap-2 mb-4">
                {property.verified && (
                  <span className="flex items-center gap-1 text-xs font-bold font-ui text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                    <BadgeCheck size={13} /> RERA Verified
                  </span>
                )}
                <span className="text-xs font-bold font-ui text-[#B8860B] bg-[#F5E6C0] border border-[#B8860B]/20 px-3 py-1.5 rounded-full">{property.type}</span>
                <span className="text-xs font-bold font-ui text-[#0D1B2A] bg-[#F7F3E8] border border-[#F7F3E8] px-3 py-1.5 rounded-full">{property.status}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#0D1B2A] leading-tight mb-2">{property.title}</h1>
                  <p className="flex items-center gap-2 text-[#888] text-sm">
                    <MapPin size={15} className="text-[#B8860B] shrink-0" />
                    {property.location}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <SavePropertyButton propertyId={property.id} />
                  <button className="w-10 h-10 rounded-xl border border-[#F7F3E8] flex items-center justify-center text-[#888] hover:text-[#B8860B] hover:border-[#B8860B]/30 hover:bg-[#F5E6C0]/50 transition-all">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 flex flex-wrap items-end gap-6 pt-6 border-t border-[#F7F3E8]">
                <div>
                  <p className="text-xs text-[#888] font-ui uppercase tracking-wider mb-1">Asking Price</p>
                  <p className="font-serif text-4xl font-bold text-[#0D1B2A]">{property.priceDisplay}</p>
                </div>
                <div className="text-sm text-[#888]">
                  <span>≈ </span>
                  <span className="font-semibold text-[#0D1B2A]">₹{Math.round(property.price / property.area).toLocaleString("en-IN")}/sqft</span>
                </div>
                {property.rera && (
                  <div className="text-sm text-[#888]">
                    RERA: <span className="font-mono text-[#0D1B2A] font-semibold">{property.rera}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Key Facts */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(13,27,42,0.07)]">
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A] mb-5">Key Details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: BedDouble, label: "Bedrooms", value: `${property.beds} BHK` },
                  { icon: Bath, label: "Bathrooms", value: `${property.baths} Bath` },
                  { icon: Maximize2, label: "Carpet Area", value: `${property.area.toLocaleString()} ${property.areaUnit}` },
                  { icon: Car, label: "Parking", value: `${property.parking ?? 1} Covered` },
                  { icon: Wind, label: "Furnishing", value: property.furnishing ?? "Unfurnished" },
                  { icon: Home, label: "Floor", value: property.floor ?? "Ground" },
                  { icon: Building, label: "Total Floors", value: `${property.totalFloors ?? 4} Floors` },
                  { icon: Shield, label: "Facing", value: property.facing ?? "East" },
                  { icon: TrendingUp, label: "Property Age", value: property.age ?? "New" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-3 p-3 bg-[#FFFDF7] rounded-xl border border-[#F7F3E8]">
                    <div className="w-9 h-9 rounded-lg bg-[#B8860B]/10 flex items-center justify-center text-[#B8860B] shrink-0">
                      <Icon size={17} />
                    </div>
                    <div>
                      <p className="text-xs text-[#888] font-ui uppercase tracking-wide mb-0.5">{label}</p>
                      <p className="font-semibold text-[#0D1B2A] text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(13,27,42,0.07)]">
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A] mb-4">About This Property</h2>
              <p className="text-[#555] leading-relaxed text-sm">
                {property.description ?? "A premium residential property located in one of India's most coveted neighborhoods. Features world-class construction, premium finishes, and thoughtful architecture designed for luxury living."}
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(13,27,42,0.07)]">
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A] mb-5">Premium Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 text-sm text-[#0D1B2A] font-medium">
                    <CheckCircle2 size={16} className="text-[#B8860B] shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>

            {/* EMI Calculator Placeholder */}
            <div className="bg-[#0D1B2A] rounded-2xl p-6 text-white">
              <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-[#B8860B]" /> EMI Calculator
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs font-ui text-white/60 uppercase tracking-wider mb-2 block">Loan Amount</label>
                  <input type="text" defaultValue="₹6,80,00,000" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B8860B]" />
                </div>
                <div>
                  <label className="text-xs font-ui text-white/60 uppercase tracking-wider mb-2 block">Interest Rate (%)</label>
                  <input type="number" defaultValue="8.5" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B8860B]" />
                </div>
                <div>
                  <label className="text-xs font-ui text-white/60 uppercase tracking-wider mb-2 block">Tenure (Years)</label>
                  <input type="number" defaultValue="20" className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#B8860B]" />
                </div>
              </div>
              <div className="bg-white/8 rounded-xl p-4 text-center">
                <p className="text-white/60 text-sm mb-1">Estimated Monthly EMI</p>
                <p className="font-serif text-3xl font-bold text-[#B8860B]">₹58,742</p>
                <p className="text-white/40 text-xs mt-1">*Indicative only. Subject to bank approval.</p>
              </div>
            </div>

            {/* Neighborhood Highlights */}
            <div className="bg-white rounded-2xl p-6 shadow-[0_2px_20px_rgba(13,27,42,0.07)]">
              <h2 className="font-serif text-xl font-bold text-[#0D1B2A] mb-5">Neighborhood Highlights</h2>
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-sm font-bold font-ui text-[#0D1B2A] mb-3 flex items-center gap-1.5"><Building size={16} className="text-[#B8860B]" /> Schools</h3>
                  <ul className="space-y-2 text-sm text-[#555]">
                    <li className="flex justify-between"><span>Delhi Public School</span><span className="font-bold">1.2 km</span></li>
                    <li className="flex justify-between"><span>International School</span><span className="font-bold">2.5 km</span></li>
                    <li className="flex justify-between"><span>EuroKids Pre-School</span><span className="font-bold">0.8 km</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold font-ui text-[#0D1B2A] mb-3 flex items-center gap-1.5"><Heart size={16} className="text-[#B8860B]" /> Hospitals</h3>
                  <ul className="space-y-2 text-sm text-[#555]">
                    <li className="flex justify-between"><span>Apollo Hospitals</span><span className="font-bold">3.0 km</span></li>
                    <li className="flex justify-between"><span>Fortis Healthcare</span><span className="font-bold">4.2 km</span></li>
                    <li className="flex justify-between"><span>City Care Clinic</span><span className="font-bold">1.5 km</span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold font-ui text-[#0D1B2A] mb-3 flex items-center gap-1.5"><Car size={16} className="text-[#B8860B]" /> Transport</h3>
                  <ul className="space-y-2 text-sm text-[#555]">
                    <li className="flex justify-between"><span>Metro Station</span><span className="font-bold">0.5 km</span></li>
                    <li className="flex justify-between"><span>Bus Stop</span><span className="font-bold">0.2 km</span></li>
                    <li className="flex justify-between"><span>International Airport</span><span className="font-bold">18 km</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Similar Properties */}
            {similarProps.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-5">Similar Properties in {property.city}</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {similarProps.slice(0, 2).map(p => (
                    <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(13,27,42,0.07)] border border-[#F7F3E8] group">
                      <div className="h-44 overflow-hidden">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <p className="font-serif font-bold text-[#0D1B2A] mb-1 line-clamp-1">{p.title}</p>
                        <p className="text-xs text-[#888] flex items-center gap-1 mb-3"><MapPin size={11} className="text-[#B8860B]" />{p.locality}</p>
                        <div className="flex justify-between items-center">
                          <p className="font-serif font-bold text-[#B8860B] text-lg">{p.priceDisplay}</p>
                          <Link href={`/listing/${p.id}`} className="text-xs font-bold text-[#0D1B2A] hover:text-[#B8860B] transition-colors">View →</Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ─── STICKY SIDEBAR ─────────────────────────── */}
          <div>
            <div className="sticky top-24 space-y-4">
              {/* Contact Card */}
              <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(13,27,42,0.12)] border border-[#F7F3E8] overflow-hidden">
                <div className="bg-[#0D1B2A] p-5">
                  <p className="text-white/60 text-xs font-ui uppercase tracking-wider mb-1">Asking Price</p>
                  <p className="font-serif font-bold text-white text-3xl">{property.priceDisplay}</p>
                </div>

                <div className="p-5 space-y-3">
                  <button className="btn-navy w-full py-4 rounded-xl text-sm shadow-md">
                    <Phone size={18} /> Contact Agent
                  </button>
                  <button className="btn-outline w-full py-4 rounded-xl text-sm border-[#F7F3E8]">
                    <Calendar size={18} /> Schedule Visit
                  </button>

                  {/* Contact Form */}
                  <div className="pt-4 border-t border-[#F7F3E8]">
                    <ContactAgentForm propertyId={property.id} />
                  </div>
                </div>
              </div>

              {/* Agent Card */}
              <div className="bg-white rounded-2xl p-5 shadow-[0_2px_20px_rgba(13,27,42,0.07)] border border-[#F7F3E8]">
                <div className="flex items-center gap-3 mb-4">
                  <img src={property.agentAvatar} alt={property.agentName} className="w-14 h-14 rounded-xl border-2 border-[#F7F3E8]" />
                  <div>
                    <p className="font-bold text-[#0D1B2A]">{property.agentName}</p>
                    <p className="text-xs text-[#888]">DreamHome Certified Agent</p>
                    <div className="flex items-center gap-1 mt-1">
                      <BadgeCheck size={13} className="text-emerald-500" />
                      <span className="text-xs text-emerald-600 font-semibold">Verified Agent</span>
                    </div>
                  </div>
                </div>
                <a href={`tel:${property.agentPhone}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[#F7F3E8] bg-[#F7F3E8] text-[#0D1B2A] text-sm font-bold hover:bg-[#F5E6C0] hover:border-[#B8860B]/30 transition-colors">
                  <Phone size={16} className="text-[#B8860B]" /> {property.agentPhone}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}