import Header from "@/components/layout/Header/Header";
import BrandingHero from "@/components/services/Branding/BrandingHero/BrandingHero";
import BrandStatementSection from "@/components/services/Branding/BrandStatementSection/BrandStatementSection";
import ToolsTechnologiesSection from "@/components/services/Branding/ToolsTechnologiesSection/ToolsTechnologiesSection";
import BrandingFeaturedWork from "@/components/services/Branding/BrandingFeaturedWork/BrandingFeaturedWork";
export default function BrandingPage() {
  return (
    <main>
      <Header />
      <BrandingHero />
      <BrandStatementSection />
      <ToolsTechnologiesSection />
      <BrandingFeaturedWork />
    </main>
  );
}