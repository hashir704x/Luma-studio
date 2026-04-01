import HomeHeroSection from "@/components/home-hero-section";
import GalleryShowcaseSection from "@/components/gallery-showcase-section";
import HowItWorksSection from "@/components/how-it-works-section";
import Testimonials from "@/components/testimonails";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-5">
      <HomeHeroSection />
      <GalleryShowcaseSection />
      <HowItWorksSection />
      <Testimonials />
      <Footer />
    </div>
  );
}
