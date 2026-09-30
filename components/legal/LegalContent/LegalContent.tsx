import styles from "./LegalContent.module.css";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalContentProps {
  sections: LegalSection[];
}

export default function LegalContent({ sections }: LegalContentProps) {
  return (
    <div className={styles.wrap}>
      {sections.map((section) => (
        <section key={section.heading} className={styles.section}>
          <h2 className={styles.heading}>{section.heading}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}