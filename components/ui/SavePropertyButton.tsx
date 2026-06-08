"use client";

import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";

export default function SavePropertyButton({ propertyId }: { propertyId: number }) {
  const { isSaved, toggleSaved } = useWishlist();
  const saved = isSaved(propertyId);

  return (
    <button
      onClick={() => toggleSaved(propertyId)}
      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all ${
        saved
          ? "bg-red-500 border-red-500 text-white shadow-md shadow-red-500/20"
          : "border-[#F7F3E8] text-[#888] hover:text-red-500 hover:border-red-200 hover:bg-red-50"
      }`}
      title={saved ? "Remove from wishlist" : "Save to wishlist"}
    >
      <Heart size={18} fill={saved ? "currentColor" : "none"} />
    </button>
  );
}
