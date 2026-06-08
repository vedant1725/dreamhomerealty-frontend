"use client";
import { useState } from "react";
import { Heart, MapPin, BedDouble, Bath, Maximize2, BadgeCheck, ArrowRight } from "lucide-react";
import { Property } from "@/lib/types";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";

interface PropertyCardProps {
  property: Property;
  compact?: boolean;
}

export default function PropertyCard({ property, compact = false }: PropertyCardProps) {
  const { isSaved, toggleSaved } = useWishlist();
  const saved = isSaved(property.id);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(13,27,42,0.08)] hover:shadow-[0_8px_40px_rgba(13,27,42,0.14)] transition-all duration-400 cursor-pointer border border-[#F7F3E8]">
      {/* Image */}
      <div className={`relative overflow-hidden ${compact ? "h-48" : "h-60"} bg-[#F7F3E8]`}>
        {!imgLoaded && (
          <div className="absolute inset-0 skeleton"></div>
        )}
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {property.isPremium && (
            <span className="badge-gold text-white bg-[#B8860B]/90 backdrop-blur-sm border-none shadow-sm">Premium</span>
          )}
          {property.isFeatured && !property.isPremium && (
            <span className="bg-[#0D1B2A]/80 text-white text-[10px] font-bold font-ui uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">Featured</span>
          )}
          <span className="bg-white/90 text-[#0D1B2A] text-[10px] font-bold font-ui uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">{property.type}</span>
        </div>

        {/* Save button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSaved(property.id); }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm border transition-all duration-200 shadow-sm ${
            saved
              ? "bg-red-500 border-red-500 text-white"
              : "bg-white/80 border-white/50 text-[#555] hover:bg-white hover:text-red-500"
          }`}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>

        {/* View on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link href={`/listing/${property.id}`} className="flex items-center gap-1.5 bg-white text-[#0D1B2A] text-xs font-bold py-2 px-4 rounded-full shadow-lg hover:bg-[#B8860B] hover:text-white transition-colors">
            View <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <Link href={`/listing/${property.id}`} className="block p-5">
        {/* Price */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="font-serif text-2xl font-bold text-[#0D1B2A] leading-none">
              {property.monthlyRent ? `₹${property.monthlyRent.toLocaleString("en-IN")}/mo` : property.priceDisplay}
            </p>
            {property.monthlyRent && property.deposit && (
              <p className="text-xs text-[#888] mt-1">Deposit: ₹{property.deposit.toLocaleString("en-IN")}</p>
            )}
          </div>
          {property.verified && (
            <div className="flex items-center gap-1 text-[10px] font-bold font-ui text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full shrink-0 mt-0.5">
              <BadgeCheck size={12} /> RERA
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-[#0D1B2A] text-base leading-snug mb-2 line-clamp-2 group-hover:text-[#B8860B] transition-colors">
          {property.title}
        </h3>

        {/* Location */}
        <p className="flex items-center gap-1.5 text-xs text-[#888] mb-4 truncate">
          <MapPin size={12} className="text-[#B8860B] shrink-0" />
          {property.location}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 pt-3 border-t border-[#F7F3E8] text-xs text-[#555]">
          <span className="flex items-center gap-1.5 font-medium">
            <BedDouble size={14} className="text-[#B8860B]" /> {property.beds} Beds
          </span>
          <span className="text-[#F7F3E8]">|</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Bath size={14} className="text-[#B8860B]" /> {property.baths} Baths
          </span>
          <span className="text-[#F7F3E8]">|</span>
          <span className="flex items-center gap-1.5 font-medium">
            <Maximize2 size={14} className="text-[#B8860B]" /> {property.area.toLocaleString()} {property.areaUnit}
          </span>
        </div>

        {/* Agent */}
        <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-[#F7F3E8]">
          <img src={property.agentAvatar} alt={property.agentName} className="w-7 h-7 rounded-full border border-[#F7F3E8]" />
          <p className="text-xs text-[#888]">
            <span className="font-semibold text-[#0D1B2A]">{property.agentName}</span>
            <span className="mx-1">·</span>
            {property.postedAt}
          </p>
        </div>
      </Link>
    </div>
  );
}
