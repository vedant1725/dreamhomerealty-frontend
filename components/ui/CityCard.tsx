"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CityCardProps {
  name: string;
  image: string;
  count: number;
}

export default function CityCard({ name, image, count }: CityCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });

    // Calculate percentage offset from center (-1 to 1)
    const pctX = (x / rect.width - 0.5) * 2;
    const pctY = (y / rect.height - 0.5) * 2;
    
    // Parallax movement - max 12px shift in opposite direction
    setParallax({ x: pctX * -12, y: pctY * -12 });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setParallax({ x: 0, y: 0 });
  };

  return (
    <Link
      ref={cardRef}
      href={`/buy?city=${name}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-md transition-all duration-500 ease-out select-none flex flex-col justify-end"
      style={{
        boxShadow: isHovered 
          ? "0 25px 45px -15px rgba(13, 27, 42, 0.45), 0 0 20px 0px rgba(184, 134, 11, 0.15)"
          : "0 4px 15px -3px rgba(13, 27, 42, 0.15)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0)"
      }}
    >
      {/* 1. Parallax Background Image */}
      <div 
        className="absolute inset-0 w-full h-full scale-[1.12] transition-transform duration-500 ease-out pointer-events-none"
        style={{
          transform: isHovered 
            ? `scale(1.16) translate3d(${parallax.x}px, ${parallax.y}px, 0)` 
            : "scale(1.12) translate3d(0, 0, 0)",
        }}
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover filter brightness-[0.82] group-hover:brightness-[0.92] transition-all duration-500" 
        />
      </div>

      {/* 2. Premium Dual-gradient Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A] via-[#0D1B2A]/25 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-500 z-10 pointer-events-none" />
      
      {/* 3. Interactive Liquid Spotlight Reflection */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.25) 0%, transparent 80%)`,
          }}
        />
      )}

      {/* 4. Active Reticle Blueprint Corner Frames */}
      <div className="absolute inset-2 border border-white/0 group-hover:border-white/10 rounded-[12px] pointer-events-none transition-all duration-500 z-20">
        {/* Top-left corner */}
        <span 
          className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[#B8860B] rounded-tl opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
          style={{ boxShadow: "0 0 8px rgba(184, 134, 11, 0.5)" }}
        />
        {/* Top-right corner */}
        <span 
          className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[#B8860B] rounded-tr opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
          style={{ boxShadow: "0 0 8px rgba(184, 134, 11, 0.5)" }}
        />
        {/* Bottom-left corner */}
        <span 
          className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#B8860B] rounded-bl opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
          style={{ boxShadow: "0 0 8px rgba(184, 134, 11, 0.5)" }}
        />
        {/* Bottom-right corner */}
        <span 
          className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#B8860B] rounded-br opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
          style={{ boxShadow: "0 0 8px rgba(184, 134, 11, 0.5)" }}
        />
      </div>

      {/* 5. Content panel */}
      <div className="relative z-30 p-5 w-full flex items-end justify-between transition-transform duration-500 translate-y-2 group-hover:translate-y-0 pointer-events-none">
        <div>
          {/* Accent Line Indicator */}
          <div className="w-6 h-[2px] bg-[#B8860B] mb-2.5 rounded-full transform scale-x-50 origin-left group-hover:scale-x-100 group-hover:bg-[#D4A017] transition-all duration-500" />
          
          <h3 className="font-serif font-bold text-white text-xl md:text-2xl leading-none transition-colors duration-300 group-hover:text-[#F5E6C0]">
            {name}
          </h3>
          
          <p className="text-white/60 text-xs mt-1.5 transition-colors duration-300 group-hover:text-white/80 font-medium">
            {count.toLocaleString()} properties
          </p>
        </div>

        {/* Dynamic floating Arrow Indicator */}
        <div 
          className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-[#B8860B] text-white flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:border-[#B8860B]/20 transition-all duration-500 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
          style={{
            boxShadow: isHovered ? "0 4px 12px rgba(184, 134, 11, 0.3)" : "none"
          }}
        >
          <ArrowUpRight size={16} className="transition-transform duration-300 transform group-hover:rotate-45" />
        </div>
      </div>
    </Link>
  );
}
