// ─── Property Types ───────────────────────────────────────────────────────────
export interface Property {
  id: number;
  title: string;
  price: number;
  priceDisplay: string;
  monthlyRent?: number;
  deposit?: number;
  location: string;
  city: string;
  locality: string;
  state: string;
  beds: number;
  baths: number;
  area: number;
  areaUnit: string;
  type: "Villa" | "Apartment" | "Penthouse" | "Plot" | "Commercial" | "Studio";
  status: "Ready to Move" | "Under Construction" | "New Launch";
  furnishing?: "Fully Furnished" | "Semi Furnished" | "Unfurnished";
  parking?: number;
  verified: boolean;
  rera?: string;
  image: string;
  images: string[];
  tags: string[];
  agentName: string;
  agentAvatar: string;
  agentPhone: string;
  possession?: string;
  builder?: string;
  postedAt: string;
  isFeatured?: boolean;
  isPremium?: boolean;
  amenities: string[];
  facing?: string;
  floor?: string;
  totalFloors?: number;
  age?: string;
  description?: string;
  lat?: number;
  lng?: number;
}

export interface City {
  name: string;
  state: string;
  count: number;
  image: string;
}

export interface Agent {
  id: number;
  name: string;
  avatar: string;
  company: string;
  rating: number;
  reviews: number;
  properties: number;
  phone: string;
  verified: boolean;
  specialization: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  type: string;
}

export interface Project {
  id: number;
  name: string;
  builder: string;
  location: string;
  city: string;
  startingPrice: number;
  priceDisplay: string;
  status: "Under Construction" | "Ready to Move" | "New Launch";
  completion: number;
  completionDate: string;
  rera: string;
  image: string;
  types: string;
  units: number;
  acres: number;
  amenitiesCount: number;
}
