import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import FooterSection from "@/components/layout/Footer/FooterSection";
import LegalHero from "@/components/legal/LegalHero/LegalHero";
import LegalContent from "@/components/legal/LegalContent/LegalContent";
import styles from "./legal.module.css";

export const metadata: Metadata = {
  title: "Terms & Conditions | Graphic Wolves",
  description:
    "The terms and conditions that govern the use of the Graphic Wolves website and services.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditionsPage() {
  return (
    <main className={styles.main}>
      <Header />
      <LegalHero title="Terms & Conditions" lastUpdated="September 30, 2026" />
      <LegalContent
        sections={[
          {
            heading: "1. Acceptance of Terms",
            paragraphs: [
              "By accessing or using the Graphic Wolves website, you agree to be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our website.",
            ],
          },
          {
            heading: "2. Use of Website",
            paragraphs: [
              "You agree to use our website for lawful purposes only and to provide accurate and truthful information when requested.",
              "You may not use the content of this website without prior written permission from Graphic Wolves.",
            ],
          },
          {
            heading: "3. Intellectual Property",
            paragraphs: [
              "All content on this website, including text, graphics, logos, and designs, is the property of Graphic Wolves and is protected by intellectual property laws.",
            ],
          },
          {
            heading: "4. Services & Payments",
            paragraphs: [
              "Details of our services, pricing, and payment terms are agreed upon on a project-by-project basis. Any agreement is governed by the specific proposal and contract signed between the client and Graphic Wolves.",
            ],
          },
          {
            heading: "5. Limitation of Liability",
            paragraphs: [
              "While we strive to provide accurate and up-to-date information, we are not liable for any errors, omissions, or damages arising from the use of this website.",
            ],
          },
          {
            heading: "6. Changes to These Terms",
            paragraphs: [
              "We may update these terms and conditions from time to time. Any changes will be posted on this page with an updated revision date.",
            ],
          },
          {
            heading: "7. Contact Us",
            paragraphs: [
              "If you have any questions about these terms and conditions, please contact us at hello@graphicwolves.com.",
            ],
          },
        ]}
      />
      <FooterSection />
    </main>
  );
}