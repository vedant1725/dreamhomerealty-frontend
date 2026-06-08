import { MapPin, Maximize2, BedDouble, Bath, ArrowRight } from "lucide-react";
import Image from "next/image";

const properties = [
  {
    id: 1,
    title: "The Belvedere Estate",
    location: "Koregaon Park, Pune",
    price: "₹8.5 Cr",
    beds: 5,
    baths: 6,
    area: "6,500 sqft",
    type: "Villa",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Oceania Penthouse",
    location: "Worli Sea Face, Mumbai",
    price: "₹15.2 Cr",
    beds: 4,
    baths: 4,
    area: "4,200 sqft",
    type: "Penthouse",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Aura Luxury Residences",
    location: "Banjara Hills, Hyderabad",
    price: "₹6.8 Cr",
    beds: 3,
    baths: 3,
    area: "3,800 sqft",
    type: "Apartment",
    image: "https://images.unsplash.com/photo-1600607687931-ceeb56d302cd?auto=format&fit=crop&q=80&w=800"
  }
];

export default function FeaturedProperties() {
  return (
    <section className="section-padding bg-[var(--ivory-dark)]">
      <div className="container-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="section-label mb-4">Exclusive Collection</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[var(--navy)]">
              Curated Premium Properties
            </h2>
          </div>
          <button className="btn-outline shrink-0">
            View All Properties <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <div key={property.id} className="card-premium group overflow-hidden bg-white">
              <div className="relative h-72 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="badge-gold bg-black/40 backdrop-blur-md border-none text-white">Featured</span>
                  <span className="badge-navy bg-white/90 backdrop-blur-md border-none">{property.type}</span>
                </div>
                
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                  <button className="bg-white/20 hover:bg-[var(--gold)] text-white backdrop-blur-md p-3 rounded-full transition-colors">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-[var(--navy)] mb-2 group-hover:text-[var(--gold)] transition-colors">
                      {property.title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-sm text-[var(--gray)]">
                      <MapPin size={14} className="text-[var(--gold)]" />
                      {property.location}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-y border-[var(--ivory-dark)] mb-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 text-[var(--gray-light)] text-xs font-ui uppercase tracking-wider">
                      <BedDouble size={14} /> Beds
                    </div>
                    <span className="font-bold text-[var(--navy)]">{property.beds}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-[var(--ivory-dark)] pl-4">
                    <div className="flex items-center gap-1.5 text-[var(--gray-light)] text-xs font-ui uppercase tracking-wider">
                      <Bath size={14} /> Baths
                    </div>
                    <span className="font-bold text-[var(--navy)]">{property.baths}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-[var(--ivory-dark)] pl-4">
                    <div className="flex items-center gap-1.5 text-[var(--gray-light)] text-xs font-ui uppercase tracking-wider">
                      <Maximize2 size={14} /> Area
                    </div>
                    <span className="font-bold text-[var(--navy)]">{property.area}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-[var(--gray-light)] text-sm">Asking Price</p>
                  <p className="font-serif text-2xl font-bold text-[var(--gold)]">{property.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}