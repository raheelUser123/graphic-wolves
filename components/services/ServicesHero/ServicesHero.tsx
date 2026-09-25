"use client";

import styles from "./ServicesHero.module.css";

const serviceImages = [
  { src: "/images/main-services-page/ServicesHero/1.webp", alt: "Brand identity project", rotate: -5 },
  { src: "/images/main-services-page/ServicesHero/2.webp", alt: "E-commerce creative project", rotate: 4 },
  { src: "/images/main-services-page/ServicesHero/3.webp", alt: "Mobile and digital experience", rotate: -4 },
  { src: "/images/main-services-page/ServicesHero/4.webp", alt: "Web development project", rotate: 3 },
  { src: "/images/main-services-page/ServicesHero/5.webp", alt: "Digital product branding", rotate: -5 },
  { src: "/images/main-services-page/ServicesHero/3.webp", alt: "Campaign design project", rotate: 4 },
];

export default function ServicesHero() {
  const loop = [...serviceImages, ...serviceImages];

  return (
    <section className={styles.servicesHero} aria-labelledby="services-page-heading">
      <div className={styles.breadcrumb}>
        <a href="/" className={styles.breadcrumbMuted}>
          Home
        </a>
        <span className={styles.breadcrumbDivider} aria-hidden="true" />
        <span className={styles.breadcrumbActive}>Our Services</span>
      </div>

      <div className={styles.marqueeViewport} aria-label="Selected Graphic Wolves work">
        <div className={styles.marqueeTrack}>
          {loop.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className={styles.imageCard}
              style={{ "--card-rotation": `${image.rotate}deg` } as React.CSSProperties}
              aria-hidden={index >= serviceImages.length}
            >
              <img src={image.src} alt={index < serviceImages.length ? image.alt : ""} draggable={false} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.headingWrap}>
        <h1 id="services-page-heading" className={styles.heading}>
          A Full-Service Creative
          <br />
          &amp; Digital Agency
        </h1>
      </div>
    </section>
  );
}
