import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutStorySection from "@/components/about/AboutStorySection/AboutStorySection";
import HorizontalWords from "@/components/home/HorizontalWords/HorizontalWords";
import StatsSection from "@/components/home/StatsSection/StatsSection";
import FeaturedWorkSection from "@/components/home/FeaturedWorkSection/FeaturedWorkSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import AboutFaqSection from "@/components/about/AboutFaqSection/AboutFaqSection";
import ProudClientsSection from "@/components/home/ProudClientsSection/ProudClientsSection";
import FooterSection from "@/components/layout/Footer/FooterSection";
export const metadata: Metadata = {
  title: "About Us | Graphic Wolves",
  description: "Meet Graphic Wolves, a creative and digital agency building lasting business value.",
};

export default function About() {
  return (
    <main>
      <Header variant="light" />
      <AboutHero />
      <HorizontalWords /> 
      <StatsSection />
      <AboutStorySection />
      <FeaturedWorkSection />
      <ReviewsSection />
      <AboutFaqSection />
      <ProudClientsSection />
      <FooterSection />
    </main>
  );
}
