import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header/Header";
import { caseStudies } from "../../components/case-studies/data";
import styles from "./page.module.css";
import FooterSection from "@/components/layout/Footer/FooterSection";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Explore the stories behind selected Graphic Wolves projects.",
};

export default function CaseStudiesPage() {
  return (
    <main className={styles.page}>
      <Header />
      <section className={styles.listing} aria-labelledby="case-studies-title">
        <p className={styles.eyebrow}>Selected projects</p>
        <h1 className={styles.heading} id="case-studies-title">
          Case studies
        </h1>
        <div className={styles.grid}>
          {caseStudies.map((study) => (
            <Link className={styles.card} href={`/case-studies/${study.slug}`} key={study.slug}>
              <img
                className={styles.image}
                src={study.heroMedia.type === "image" ? study.heroMedia.src : study.heroMedia.poster}
                alt=""
              />
              <div className={styles.cardCopy}>
                <p className={styles.category}>{study.category}</p>
                <h2 className={styles.cardTitle}>{study.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
