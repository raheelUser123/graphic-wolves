"use client";

import styles from "./SmartIntegrationsSection.module.css";

const integrations = [
  {
    name: "Webflow",
    domain: "Webflow.com",
    icon: "/images/main-services-page/integrations/webflow.svg",
    description:
      "We design high-performance Webflow sites that are easy to manage and ready to grow.",
    href: "https://webflow.com",
    position: "webflow",
  },
  {
    name: "Wix",
    domain: "Wix.com",
    icon: "/images/main-services-page/integrations/wix.svg",
    description:
      "Flexible Wix websites with polished visuals, strong performance, and easy content management.",
    href: "https://www.wix.com",
    position: "wix",
  },
  {
    name: "Squarespace",
    domain: "Squarespace.com",
    icon: "/images/main-services-page/integrations/squarespace.svg",
    description:
      "Distinctive Squarespace sites with responsive layouts and simple content management.",
    href: "https://www.squarespace.com",
    position: "squarespace",
  },
  {
    name: "Framer",
    domain: "Framer.com",
    icon: "/images/main-services-page/integrations/framer.svg",
    description:
      "High-fidelity Framer sites with expressive motion and a smooth path to launch.",
    href: "https://www.framer.com",
    position: "framer",
  },
];

export default function SmartIntegrationsSection() {
  return (
    <section className={styles.section} aria-labelledby="integrations-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="integrations-title" className={styles.heading}>
            Smart Integrations.
          </h2>

          <p className={styles.caption}>
            Our integrations are designed to work seamlessly with the tools your
            team already uses, reducing friction and amplifying productivity
            across your workflow.
          </p>

          <div className={styles.includeBlock}>
            <h3 className={styles.includeHeading}>Include</h3>
            <ul className={styles.includeList}>
              <li>Role-based access &amp; custom permissions</li>
              <li>Real-time team &amp; device sync</li>
              <li>Secure sharing, no extra logins</li>
              <li>Centralized admin controls</li>
            </ul>
            <a className={styles.seeMore} href="#integration-cards">
              See more...
            </a>
          </div>
        </div>

        <div className={styles.cardStage} id="integration-cards">
          {integrations.map((integration) => (
            <article
              key={integration.name}
              className={styles.card}
              data-position={integration.position}
            >
              <div className={styles.cardBrand}>
                <img
                  className={styles.cardIcon}
                  src={integration.icon}
                  alt=""
                  aria-hidden="true"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
                <span className={styles.cardDomain}>{integration.domain}</span>
              </div>

              <h3 className={styles.cardHeading}>{integration.name}</h3>
              <p className={styles.cardCaption}>{integration.description}</p>
              <a
                className={styles.cardButton}
                href={integration.href}
                target="_blank"
                rel="noreferrer"
              >
                Read More...
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
