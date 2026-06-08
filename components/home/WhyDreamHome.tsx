import { Bot, ShieldCheck, Building2, BadgeCheck, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Matching",
    text: "Our proprietary algorithm analyzes over 50 data points to find the perfect property that aligns with your lifestyle and investment goals.",
    delay: "0s"
  },
  {
    icon: ShieldCheck,
    title: "Bank-Grade Verification",
    text: "Every listing undergoes a rigorous 100-point legal and structural verification process. 100% RERA compliant properties only.",
    delay: "0.1s"
  },
  {
    icon: Building2,
    title: "Exclusive Inventory",
    text: "Access off-market premium properties and pre-launch luxury projects before they are available to the general public.",
    delay: "0.2s"
  },
  {
    icon: BadgeCheck,
    title: "White-Glove Service",
    text: "Experience seamless end-to-end support with a dedicated relationship manager for negotiations, paperwork, and handover.",
    delay: "0.3s"
  },
];

export default function WhyDreamHome() {
  return (
    <section className="bg-navy-gradient text-white relative py-24 lg:py-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[var(--gold)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="container-xl relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          <div className="lg:col-span-5 max-w-2xl">
            <span className="section-label mb-4 text-[var(--gold-pale)]">The DreamHome Advantage</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Redefining luxury <br/>
              <span className="text-gold-gradient">real estate</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              We combine cutting-edge artificial intelligence with decades of market expertise to deliver a property buying experience that is transparent, efficient, and truly luxurious.
            </p>
            
            <button className="btn-gold">
              Learn About Our Process <ArrowRight size={18} />
            </button>
          </div>

          <div className="lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="glass-dark rounded-[2rem] p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--gold)]/10 rounded-bl-[100px] -z-10 transition-colors group-hover:bg-[var(--gold)]/20"></div>
                    
                    <div className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--gold)] to-[#8B6914] shadow-lg shadow-[var(--gold)]/20">
                      <Icon size={32} className="text-white" strokeWidth={1.5} />
                    </div>

                    <h3 className="font-serif text-2xl font-bold mb-4">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}