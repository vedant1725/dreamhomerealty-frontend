"use client";

import React, { useState, useRef } from "react";
import { Bot, ShieldCheck, Award, Users, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Bot,
  ShieldCheck,
  Award,
  Users,
};

interface AdvantageCardProps {
  iconName: "Bot" | "ShieldCheck" | "Award" | "Users";
  title: string;
  desc: string;
  glowColor: string;
  highlightColor?: string;
}

export default function AdvantageCard({
  iconName,
  title,
  desc,
  glowColor,
  highlightColor = "#B8860B",
}: AdvantageCardProps) {
  const Icon = iconMap[iconName] || Bot;
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setCoords({ x, y });

    // Calculate tilt angles (max 12 degrees)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 12;
    const rotateY = ((x - centerX) / centerX) * -12; // Inverted for natural tilt feel
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-full select-none"
      style={{
        perspective: "1000px",
      }}
    >
      {/* 1. Dynamic Glowing background glow (Halo behind the card) */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-75 blur-3xl transition-opacity duration-500 pointer-events-none z-0"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 70%)`,
          opacity: isHovered ? 0.45 : 0,
        }}
      />

      {/* 2. Outer Border Glowing wrapper */}
      <div
        className="h-full rounded-2xl p-[1.5px] transition-all duration-500 ease-out relative overflow-hidden group"
        style={{
          background: isHovered
            ? `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, ${highlightColor} 0%, rgba(255,255,255,0.06) 65%, rgba(255,255,255,0.02) 100%)`
            : "rgba(255, 255, 255, 0.08)",
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.025, 1.025, 1.025)`
            : "rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
          transformStyle: "preserve-3d",
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 25px 2px ${highlightColor}20`
            : "0 4px 20px -2px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* 3. Main Card Content Body */}
        <div 
          className="relative overflow-hidden rounded-[14px] p-8 bg-[#0D1B2A]/90 backdrop-blur-xl h-full flex flex-col z-10"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Noise overlay for premium metallic/grain feel */}
          <div className="absolute inset-0 bg-noise opacity-[0.02] pointer-events-none mix-blend-overlay"></div>

          {/* Interactive spotlight reflection inside the card */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.07) 0%, transparent 80%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />

          {/* Glare/Sheen sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] pointer-events-none"></div>

          {/* 3D Watermark Background Icon with opposing parallax */}
          <div
            className="absolute -bottom-10 -right-10 text-white/[0.02] pointer-events-none transition-all duration-700 ease-out transform"
            style={{
              transform: isHovered
                ? `translate3d(${tilt.y * -3}px, ${tilt.x * 3}px, 15px) scale(1.35) rotate(${12 + tilt.y * -0.5}deg)`
                : "scale(1) rotate(0deg)",
              color: isHovered ? `${highlightColor}10` : "rgba(255,255,255,0.02)",
            }}
          >
            <Icon size={140} strokeWidth={0.3} />
          </div>

          {/* Floating particle effect dots in background (Only visible on hover) */}
          {isHovered && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <span className="absolute w-1.5 h-1.5 bg-[#B8860B]/30 rounded-full animate-float-slow bottom-4 left-6" />
              <span className="absolute w-1 h-1 bg-white/20 rounded-full animate-float-fast bottom-12 right-16" />
              <span className="absolute w-2 h-2 bg-[#B8860B]/10 rounded-full animate-float-medium top-8 right-12" />
            </div>
          )}

          {/* Icon Container with Parallax and Rotate */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 shadow-sm relative z-20"
            style={{
              transform: isHovered
                ? `translate3d(${tilt.y * -1.5}px, ${tilt.x * 1.5}px, 35px) rotate3d(0, 1, 0, ${tilt.y * -1.5}deg) scale(1.1)`
                : "none",
              background: isHovered ? highlightColor : "rgba(184, 134, 11, 0.12)",
              color: isHovered ? "#000000" : "#B8860B",
              boxShadow: isHovered
                ? `0 10px 25px -5px ${highlightColor}50, inset 0 2px 4px rgba(255,255,255,0.3)`
                : "none",
            }}
          >
            <Icon size={26} strokeWidth={1.5} className={isHovered ? "animate-pulse" : ""} />
          </div>

          {/* Title */}
          <h3
            className="font-serif font-bold text-white text-xl mb-3 transition-colors duration-300 relative z-20"
            style={{
              transform: isHovered
                ? `translate3d(${tilt.y * -0.8}px, ${tilt.x * 0.8}px, 25px)`
                : "none",
              color: isHovered ? highlightColor : "#FFFFFF",
            }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-white/60 text-sm leading-relaxed relative z-20 flex-1"
            style={{
              transform: isHovered
                ? `translate3d(${tilt.y * -0.4}px, ${tilt.x * 0.4}px, 15px)`
                : "none",
              color: isHovered ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.6)",
            }}
          >
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}
