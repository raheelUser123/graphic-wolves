import Image from "next/image";
import Link from "next/link";
import type { CaseStudy, CaseStudyMedia } from "@/components/case-studies/data";
import styles from "./CaseStudyDetail.module.css";

function StudyMedia({
  media,
  className,
}: {
  media: CaseStudyMedia;
  className: string;
}) {
  if (media.type === "image") {
    return (
      <div className={`${styles.mediaFrame} ${className}`}>
        <Image
          className={styles.mediaContent}
          src={media.src}
          alt={media.alt}
          width={1440}
          height={810}
          sizes="(max-width: 700px) calc(100vw - 40px), 1232px"
        />
      </div>
    );
  }

  return (
    <div className={`${styles.mediaFrame} ${className}`}>
      <video
        className={styles.mediaContent}
        controls
        playsInline
        preload="metadata"
        poster={media.poster}
        aria-label={media.alt}
      >
        <source src={media.src} />
      </video>
    </div>
  );
}

export default function CaseStudyDetail({
  study,
  nextStudy,
}: {
  study: CaseStudy;
  nextStudy?: CaseStudy;
}) {
  return (
    <article className={styles.page}>
      <div className={styles.content}>
        <header className={styles.intro}>
          <p className={styles.category}>{study.category}</p>
          <h1 className={styles.title}>{study.title}</h1>
          <p className={styles.caption}>{study.caption}</p>

          <div className={styles.services}>
            <h2 className={styles.servicesTitle}>Services</h2>
            <ul className={styles.tags}>
              {study.services.map((service) => (
                <li className={styles.tag} key={service}>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </header>

        <StudyMedia media={study.heroMedia} className={styles.heroImage} />

        {study.sections.map((section) => {
          const sideMedia = section.media?.find((media) => media.layout === "side");
          const wideMedia = section.media?.filter((media) => media.layout !== "side") ?? [];
          const isStacked = section.titleLayout === "stacked";
          const sectionParagraphs = (
            <div className={styles.sectionParagraphs}>
              {section.paragraphs.map((paragraph) => (
                <p className={styles.sectionCaption} key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          );

          return (
            <section className={styles.contentSection} key={section.title}>
              <div className={styles.sectionHeading}>
                <h2 className={styles.sectionTitle}>{section.title}</h2>
                {isStacked && sectionParagraphs}
              </div>
              <div
                className={`${styles.sectionBody} ${sideMedia ? styles.sectionBodyWithMedia : ""} ${isStacked ? styles.sectionBodyStacked : ""}`}
              >
                {!isStacked && sectionParagraphs}
                {sideMedia && <StudyMedia media={sideMedia} className={styles.sideMedia} />}
              </div>
              {wideMedia.length > 0 && (
                <div className={styles.mediaList}>
                  {wideMedia.map((media, index) => (
                    <StudyMedia
                      className={styles.wideMedia}
                      key={`${section.title}-${media.src}-${index}`}
                      media={media}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}

        {nextStudy && (
          <section className={styles.nextProject} aria-label="Next case study">
            <div className={styles.nextProjectCopy}>
              <p className={styles.nextProjectLabel}>Next Project</p>
              <h2 className={styles.nextProjectTitle}>{nextStudy.title}</h2>
            </div>
            <Link className={styles.nextProjectLink} href={`/our-work/${nextStudy.slug}`}>
              <StudyMedia
                className={styles.nextProjectMedia}
                media={
                  nextStudy.heroMedia.type === "image"
                    ? nextStudy.heroMedia
                    : {
                        type: "image",
                        src: nextStudy.heroMedia.poster,
                        alt: nextStudy.heroMedia.alt,
                      }
                }
              />
            </Link>
          </section>
        )}
      </div>
    </article>
   
  );
}
