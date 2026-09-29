import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactForm from "@/components/contact/ContactForm/ContactForm";
import StatsSection from "@/components/home/StatsSection/StatsSection";
import ReviewsSection from "@/components/home/ReviewsSection/ReviewsSection";
import ProudClientsSection from "@/components/home/ProudClientsSection/ProudClientsSection";
import FooterSection from "@/components/layout/Footer/FooterSection";

export const metadata: Metadata = {
  title: "Contact | Graphic Wolves",
  description:
    "Get in touch with Graphic Wolves. Let’s talk about your next branding, design, development, or e-commerce project.",
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <ContactHero />
      <ContactForm />
      <StatsSection />
      <ReviewsSection />
      <ProudClientsSection />
      <FooterSection />
    </main>
  );
}
