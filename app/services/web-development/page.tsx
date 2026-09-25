// app/services/web-development/page.tsx

import Header from "@/components/layout/Header/Header";
import WebDevelopmentHero from "@/components/services/web-development/WebDevelopmentHero/WebDevelopmentHero";
import TrustedCompaniesSection from "@/components/services/web-development/TrustedCompaniesSection/TrustedCompaniesSection";
import OurProcessSection from "@/components/services/web-development/OurProcessSection/OurProcessSection";
import DevelopersLoveSection from "@/components/services/web-development/DevelopersLoveSection/DevelopersLoveSection";
import SmartIntegrationsSection from "@/components/services/web-development/SmartIntegrationsSection/SmartIntegrationsSection";
export default function WebDevelopmentPage() {
  return (
    <main>
      <Header />

      <WebDevelopmentHero />
      <TrustedCompaniesSection />
      <DevelopersLoveSection />
      <OurProcessSection />
      <SmartIntegrationsSection />
    </main>
  );
}