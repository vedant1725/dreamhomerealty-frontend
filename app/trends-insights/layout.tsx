import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function TrendsInsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}
