import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import OurWorkHero from "@/components/our-work/OurWorkHero/OurWorkHero";
import OurWorkProjectsSection from "@/components/our-work/OurWorkProjectsSection/OurWorkProjectsSection";
import FeaturedWorkSection from "@/components/our-work/FeaturedWorkSection/FeaturedWorkSection";
import ServicesSection from "@/components/home/ServicesSection/ServicesSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import ProudClientsSection from "@/components/home/ProudClientsSection/ProudClientsSection";
import AboutFaqSection from "@/components/about/AboutFaqSection/AboutFaqSection";
import FooterSection from "@/components/layout/Footer/FooterSection";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Explore selected Graphic Wolves branding, design, and digital projects.",
};

export default function OurWorkPage() {
  return (
    <main>
      <Header variant="light" />
      <OurWorkHero />
      <OurWorkProjectsSection />
      <FeaturedWorkSection />
      <ServicesSection />
      <ReviewsSection />
      <ProudClientsSection />
      <AboutFaqSection />
      <FooterSection />
    </main>
  );
}