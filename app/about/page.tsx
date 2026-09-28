import type { Metadata } from "next";
import Header from "@/components/layout/Header/Header";
import AboutHero from "@/components/about/AboutHero/AboutHero";
import HorizontalWords from "@/components/home/HorizontalWords/HorizontalWords";
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
    </main>
  );
}
