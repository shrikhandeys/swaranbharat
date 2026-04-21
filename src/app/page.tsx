import HeroSlider from "@/components/home/HeroSlider";
import AnnouncementMarquee from "@/components/home/AnnouncementMarquee";
import Stats from "@/components/home/Stats";
import AboutPreview from "@/components/home/AboutPreview";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import CertificationsStrip from "@/components/home/CertificationsStrip";
import WorldMap from "@/components/home/WorldMap";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <AnnouncementMarquee />
      <Stats />
      <AboutPreview />
      <ProductsShowcase />
      <CertificationsStrip />
      <WorldMap />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
