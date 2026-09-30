import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import FooterSection from "@/components/layout/Footer/FooterSection";
import LegalHero from "@/components/legal/LegalHero/LegalHero";
import LegalContent from "@/components/legal/LegalContent/LegalContent";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy | Graphic Wolves",
  description:
    "Find out how Graphic Wolves collects, uses, and protects your personal information.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.main}>
      <Header />
      <LegalHero title="Privacy Policy" lastUpdated="September 30, 2026" />
      <LegalContent
        sections={[
          {
            heading: "1. Information We Collect",
            paragraphs: [
              "We collect information you provide directly, such as your name, email address, and message when you contact us or submit a form on our website.",
              "We may also collect basic technical data automatically, such as your browser type and device information, to help us improve your experience.",
            ],
          },
          {
            heading: "2. How We Use Your Information",
            paragraphs: [
              "The information we collect is used to respond to your enquiries, provide our services, and improve our website and communications.",
              "We do not sell your personal information to third parties.",
            ],
          },
          {
            heading: "3. Cookies",
            paragraphs: [
              "Our website may use cookies to improve functionality and understand how visitors use our site. You can control or disable cookies through your browser settings.",
            ],
          },
          {
            heading: "4. Data Security",
            paragraphs: [
              "We take reasonable precautions to protect your personal information and keep it secure from unauthorised access or disclosure.",
            ],
          },
          {
            heading: "5. Your Rights",
            paragraphs: [
              "You have the right to request access to, correction of, or deletion of your personal information. To do so, please contact us at hello@graphicwolves.com.",
            ],
          },
          {
            heading: "6. Contact Us",
            paragraphs: [
              "If you have any questions about this privacy policy, please contact us at hello@graphicwolves.com.",
            ],
          },
        ]}
      />
      <FooterSection />
    </main>
  );
}