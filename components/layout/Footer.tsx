import Link from "next/link";
import { Globe, MessageCircle, Camera, Share2, ArrowRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#08111D] text-white relative border-t border-white/5 py-12 md:py-16 overflow-hidden">
            {/* Subtle top glow line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#B8860B]/30 to-transparent"></div>

            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
                
                {/* Unified grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 pb-10 border-b border-white/5">
                    
                    {/* Column 1: Brand Info */}
                    <div className="lg:col-span-1 flex flex-col items-start">
                        <Link href="/" className="block -mt-3 -mb-1.5 -ml-1">
                            <img 
                                src="/dream home logo.png" 
                                alt="DreamHome Realty Logo" 
                                className="w-[200px] h-auto object-contain brightness-90 hover:brightness-100 transition-all duration-300"
                                style={{ imageRendering: '-webkit-optimize-contrast' }}
                            />
                        </Link>
                        <p className="text-white/40 text-[11px] leading-relaxed max-w-[200px] mt-1">
                            India's premier real estate network. Delivering verified off-market luxury listings.
                        </p>
                        {/* Compact Socials */}
                        <div className="flex gap-2 mt-3.5">
                            {[Globe, MessageCircle, Camera, Share2].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-7 h-7 rounded-md flex items-center justify-center bg-white/[0.03] hover:bg-[#B8860B] text-white/40 hover:text-white border border-white/5 transition-all duration-300"
                                >
                                    <Icon size={12} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Explore */}
                    <div>
                        <h3 className="text-white/60 font-ui font-bold text-[10px] uppercase tracking-wider mb-4">Properties</h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: "Buy Properties", href: "/buy" },
                                { label: "Rent Properties", href: "/rent" },
                                { label: "New Projects", href: "/projects" },
                                { label: "Commercial Spaces", href: "/commercial" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-white/40 text-xs hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h3 className="text-white/60 font-ui font-bold text-[10px] uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: "About DreamHome", href: "/about" },
                                { label: "Careers", href: "/careers" },
                                { label: "Press & Media", href: "/press" },
                                { label: "Contact Us", href: "/contact" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-white/40 text-xs hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Resources */}
                    <div>
                        <h3 className="text-white/60 font-ui font-bold text-[10px] uppercase tracking-wider mb-4">Resources</h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: "NRI Investment Guide", href: "/nri" },
                                { label: "EMI Calculator", href: "/tools/emi" },
                                { label: "RERA Registration Check", href: "/tools/rera" },
                                { label: "Property Valuation", href: "/tools/valuation" },
                            ].map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-white/40 text-xs hover:text-white transition-colors duration-200">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 5: Newsletter */}
                    <div className="lg:col-span-1 space-y-3">
                        <h3 className="text-white/60 font-ui font-bold text-[10px] uppercase tracking-wider">Property Alerts</h3>
                        <p className="text-white/40 text-[11px] leading-relaxed max-w-[220px]">
                            Subscribe to receive exclusive off-market listings alerts.
                        </p>
                        <div className="flex bg-white/[0.03] border border-white/10 rounded-lg p-1 max-w-[240px]">
                            <input
                                type="email"
                                placeholder="Enter email"
                                className="w-full bg-transparent border-0 px-2.5 py-1 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-0"
                            />
                            <button className="bg-[#B8860B] hover:bg-[#9A7209] text-white p-1.5 rounded-md transition-colors shrink-0">
                                <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Legal */}
                <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-center md:text-left">
                        <span className="text-white/30 text-[10px]">
                            © {new Date().getFullYear()} DreamHome International Realty. RERA: A51800012345
                        </span>
                        <span className="hidden md:inline text-white/10">|</span>
                        <span className="text-white/30 text-[10px]">
                            Toll Free: 1800-200-3456 · Concierge: elite@dreamhome.in
                        </span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
                        {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((item) => (
                            <Link key={item} href="#" className="text-white/35 text-[10px] hover:text-white/70 transition-colors">
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}