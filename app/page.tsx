import Hero from "@/components/Hero";
import HorizontalWords from "@/components/HorizontalWords";
import FutureSection from "@/components/FutureSection";
import StatsSection from "@/components/StatsSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import ServicesSection from "@/components/ServicesSection";
import ReviewsSection from "@/components/ReviewsSection";
import FeaturedWorkSection from "@/components/FeaturedWorkSection";
import ProudClientsSection from "@/components/ProudClientsSection";
import FooterSection from "@/components/FooterSection";
export default function HomePage() {
  return (
    <main>
      <Hero />
      <HorizontalWords />
      <FutureSection />
      <StatsSection />
      <ExpertiseSection />
      <ServicesSection />
      <ReviewsSection />
      <FeaturedWorkSection />
      <ProudClientsSection />
      <FooterSection />
    </main>
  );
}