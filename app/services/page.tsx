import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import ServicesHero from "@/components/services/ServicesHero/ServicesHero";
import AgencyIntroSection from "@/components/services/AgencyIntroSection/AgencyIntroSection";
import ReviewsSection from "@/components/ReviewsSection";
import FooterSection from "@/components/FooterSection";
import ServicesAccordion from "@/components/services/ServicesAccordion/ServicesAccordion";
import ProjectsIntroSection from "@/components/services/ProjectsIntroSection/ProjectsIntroSection";
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
      <ReviewsSection />
      <FooterSection />
    </main>
  );
}
