import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import OurWorkHero from "@/components/our-work/OurWorkHero/OurWorkHero";
import OurWorkProjectsSection from "@/components/our-work/OurWorkProjectsSection/OurWorkProjectsSection";

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
    </main>
  );
}