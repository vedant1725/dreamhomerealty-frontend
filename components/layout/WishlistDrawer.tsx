"use client";

import { useEffect, useState } from "react";
import { X, Heart, Trash2, ArrowRight, Sparkles, Building2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { PROPERTIES, RENTAL_PROPERTIES } from "@/lib/data";
import Link from "next/link";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  // Sync mounted state to handle transitions and prevent SSR issues
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const savedProperties = [...PROPERTIES, ...RENTAL_PROPERTIES].filter((p) =>
    wishlist.includes(p.id)
  );

  const handleInquiry = () => {
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      onClose();
    }, 3000);
  };

  if (!mounted && !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-ui">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#0D1B2A]/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
        <div
          className={`w-screen max-w-md bg-[#FFFDF7] shadow-2xl flex flex-col transition-transform duration-300 transform border-l border-[#F7F3E8] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#F7F3E8] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#B8860B]/10 flex items-center justify-center text-[#B8860B]">
                <Heart size={16} fill="currentColor" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-[#0D1B2A]">
                  Saved Properties
                </h2>
                <p className="text-xs text-[#888] font-medium mt-0.5">
                  {savedProperties.length} {savedProperties.length === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#0D1B2A]/60 hover:text-[#B8860B] hover:bg-[#F7F3E8]/50 transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {inquirySubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-[#F5E6C0]/20 to-transparent rounded-2xl border border-[#B8860B]/20 animate-fade-in-up">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-md border border-[#F5E6C0] flex items-center justify-center text-[#B8860B] mb-5 animate-bounce">
                  <Sparkles size={32} />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0D1B2A] mb-2">
                  Inquiry Sent!
                </h3>
                <p className="text-[#555] text-sm leading-relaxed max-w-xs">
                  Our Relationship Manager will reach out to you within 30 minutes to schedule viewings for your saved properties.
                </p>
              </div>
            ) : savedProperties.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#B8860B]/30 flex items-center justify-center mb-6">
                  <Heart size={30} className="text-[#B8860B]/40" />
                </div>
                <h3 className="font-serif text-xl font-bold text-[#0D1B2A] mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-[#888] text-sm max-w-xs mb-8">
                  Tap the heart icon on properties to save them here for quick access or to contact agents in bulk.
                </p>
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="btn-gold px-8 py-3 text-sm rounded-xl font-bold"
                >
                  Explore Properties
                </button>
              </div>
            ) : (
              savedProperties.map((property) => (
                <div
                  key={property.id}
                  className="group relative bg-white border border-[#F7F3E8] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex p-3 gap-3"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-[#F7F3E8] relative">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Property Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-1">
                        <p className="font-serif font-bold text-[#B8860B] text-sm sm:text-base leading-none">
                          {property.monthlyRent
                            ? `₹${property.monthlyRent.toLocaleString("en-IN")}/mo`
                            : property.priceDisplay}
                        </p>
                        <span className="text-[9px] font-bold text-[#0D1B2A] bg-[#F7F3E8] px-2 py-0.5 rounded-full shrink-0">
                          {property.type}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-[#0D1B2A] text-xs sm:text-sm line-clamp-1 mt-1 group-hover:text-[#B8860B] transition-colors">
                        {property.title}
                      </h4>
                      <p className="text-[10px] text-[#888] truncate mt-0.5">
                        {property.location}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between border-t border-[#F7F3E8] pt-2 mt-2">
                      <button
                        onClick={() => removeFromWishlist(property.id)}
                        className="flex items-center gap-1 text-[10px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider cursor-pointer"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                      <Link
                        href={`/listing/${property.id}`}
                        onClick={onClose}
                        className="flex items-center gap-0.5 text-[10px] font-bold text-[#0D1B2A] hover:text-[#B8860B] transition-colors uppercase tracking-wider"
                      >
                        Details <ArrowRight size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {savedProperties.length > 0 && !inquirySubmitted && (
            <div className="p-6 border-t border-[#F7F3E8] bg-white space-y-3 shrink-0">
              <button
                onClick={handleInquiry}
                className="w-full py-4 bg-[#0D1B2A] text-[#F5E6C0] rounded-xl font-bold text-sm tracking-wide shadow-lg hover:bg-[#1C3A5E] hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles size={16} /> Inquire About All ({savedProperties.length})
              </button>
              <button
                onClick={clearWishlist}
                className="w-full py-2.5 bg-transparent text-[#888] hover:text-[#0D1B2A] rounded-xl font-bold text-xs transition-colors cursor-pointer"
              >
                Clear All Properties
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
