"use client";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF7] flex flex-col">
      <Navbar />
      
      <div className="bg-[#0D1B2A] pt-32 pb-20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 text-center">
          <p className="section-label text-[#F5E6C0] mb-4">Get in Touch</p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-6">
            We're Here to Help
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Whether you're looking to buy, sell, or invest, our expert advisors are ready to assist you at every step of your journey.
          </p>
        </div>
      </div>

      <section className="section-padding flex-1 -mt-10 relative z-10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-[0_8px_40px_rgba(13,27,42,0.12)] border border-[#F7F3E8]">
              <h2 className="font-serif text-3xl font-bold text-[#0D1B2A] mb-6">Send us a Message</h2>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold font-ui text-[#0D1B2A]">First Name</label>
                    <input type="text" className="input-premium" placeholder="John" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold font-ui text-[#0D1B2A]">Last Name</label>
                    <input type="text" className="input-premium" placeholder="Doe" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold font-ui text-[#0D1B2A]">Email Address</label>
                    <input type="email" className="input-premium" placeholder="you@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold font-ui text-[#0D1B2A]">Phone Number</label>
                    <input type="tel" className="input-premium" placeholder="+91 98765 43210" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold font-ui text-[#0D1B2A]">I am interested in</label>
                  <select className="input-premium">
                    <option>Buying a Property</option>
                    <option>Selling a Property</option>
                    <option>Renting a Property</option>
                    <option>NRI Investment</option>
                    <option>Other Enquiry</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-bold font-ui text-[#0D1B2A]">Message</label>
                  <textarea rows={4} className="input-premium resize-none" placeholder="Tell us how we can help you..."></textarea>
                </div>
                <button type="submit" className="btn-gold w-full py-4 text-base rounded-xl">
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-[#0D1B2A] rounded-2xl p-8 text-white shadow-lg">
                <h3 className="font-serif text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#B8860B]/20 flex items-center justify-center text-[#B8860B] shrink-0"><Phone size={18} /></div>
                    <div>
                      <p className="text-white/60 text-xs font-ui uppercase tracking-wider mb-1">Toll Free</p>
                      <p className="font-bold">1800-200-3456</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#B8860B]/20 flex items-center justify-center text-[#B8860B] shrink-0"><Mail size={18} /></div>
                    <div>
                      <p className="text-white/60 text-xs font-ui uppercase tracking-wider mb-1">Email Support</p>
                      <p className="font-bold">hello@dreamhome.in</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#B8860B]/20 flex items-center justify-center text-[#B8860B] shrink-0"><MapPin size={18} /></div>
                    <div>
                      <p className="text-white/60 text-xs font-ui uppercase tracking-wider mb-1">Head Office</p>
                      <p className="font-bold text-sm leading-relaxed">Level 43, DreamHome Tower,<br />SG Highway, Ahmedabad 380054</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(13,27,42,0.07)] border border-[#F7F3E8] h-[300px]">
                <div className="w-full h-full bg-[#F5E6C0] flex items-center justify-center">
                  <p className="text-[#B8860B] font-bold flex items-center gap-2"><MapPin /> Interactive Map</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
