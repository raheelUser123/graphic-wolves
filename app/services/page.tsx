import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import ServicesHero from "@/components/services/ServicesHero/ServicesHero";
import AgencyIntroSection from "@/components/services/AgencyIntroSection/AgencyIntroSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import FooterSection from "@/components/layout/Footer/FooterSection";
import ServicesAccordion from "@/components/services/ServicesAccordion/ServicesAccordion";
import ProjectsIntroSection from "@/components/services/ProjectsIntroSection/ProjectsIntroSection";
import CreativeTeamSection from "@/components/services/CreativeTeamSection/CreativeTeamSection";
import FeatureWorkSection from "@/components/home/FeaturedWorkSection/FeaturedWorkSection";
export const metadata: Metadata = {
  title: "Our Services",
  description: "Explore Graphic Wolves creative, development and e-commerce services.",
};

export default function ServicesPage() {
  return (
    <main>
      <Header />
      <ServicesHero />
      <AgencyIntroSection />
      <ServicesAccordion />
      <ProjectsIntroSection />
      <CreativeTeamSection />
      <FeatureWorkSection />
      <ReviewsSection />
      <FooterSection />
    </main>
  );
}
