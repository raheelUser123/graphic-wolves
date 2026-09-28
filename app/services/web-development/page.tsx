// app/services/web-development/page.tsx

import Header from "@/components/layout/Header/Header";
import WebDevelopmentHero from "@/components/services/web-development/WebDevelopmentHero/WebDevelopmentHero";
import TrustedCompaniesSection from "@/components/services/web-development/TrustedCompaniesSection/TrustedCompaniesSection";
import OurProcessSection from "@/components/services/web-development/OurProcessSection/OurProcessSection";
import DevelopersLoveSection from "@/components/services/web-development/DevelopersLoveSection/DevelopersLoveSection";
import SmartIntegrationsSection from "@/components/services/web-development/SmartIntegrationsSection/SmartIntegrationsSection";
import FeaturedWorkSection from "@/components/services/web-development/FeaturedWorkSection/FeaturedWorkSection";
import FooterSection from "@/components/layout/Footer/FooterSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
export default function WebDevelopmentPage() {
  return (
    <main>
      <Header />

      <WebDevelopmentHero />
      <TrustedCompaniesSection />
      <DevelopersLoveSection />
      <OurProcessSection />
      <SmartIntegrationsSection />
      <FeaturedWorkSection />
      <ReviewsSection />
      <FooterSection />
    </main>
  );
}