const properties = [
  {
    title: "Luxury Villa",
    location: "Bopal, Ahmedabad",
    price: "₹2.4 Cr",
  },
  {
    title: "Skyline Apartment",
    location: "SG Highway",
    price: "₹98 L",
  },
  {
    title: "Modern Penthouse",
    location: "Prahlad Nagar",
    price: "₹3.1 Cr",
  },
];

export default function FeaturedProperties() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#B8860B]">
            Featured Collection
          </p>

          <h2 className="mt-3 font-serif text-5xl font-bold text-[#0D1B2A]">
            Premium Properties
          </h2>
        </div>

        <button className="rounded-full border border-[#0D1B2A]/20 px-6 py-3 text-sm font-semibold text-[#0D1B2A]">
          View All
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-xl transition hover:-translate-y-2"
          >
            <div className="h-72 bg-gradient-to-br from-[#0D1B2A] via-[#1C3A5E] to-[#B8860B]" />

            <div className="p-6">
              <p className="text-sm text-[#B8860B]">Verified Property</p>

              <h3 className="mt-2 font-serif text-2xl font-bold text-[#0D1B2A]">
                {property.title}
              </h3>

              <p className="mt-2 text-[#555555]">
                {property.location}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <p className="text-2xl font-bold text-[#0D1B2A]">
                  {property.price}
                </p>

                <button className="rounded-full bg-[#0D1B2A] px-5 py-3 text-sm font-semibold text-white">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}