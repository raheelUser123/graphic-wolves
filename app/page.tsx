import Hero from "@/components/Hero";
import HorizontalWords from "@/components/HorizontalWords";
import FutureSection from "@/components/FutureSection";
import StatsSection from "@/components/StatsSection";
import ExpertiseSection from "@/components/ExpertiseSection";
export default function HomePage() {
  return (
    <main>
      <Hero />
      <HorizontalWords />
      <FutureSection />
      <StatsSection />
      <ExpertiseSection />
    </main>
  );
}