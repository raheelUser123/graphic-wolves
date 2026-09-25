import styles from "./OurProcessSection.module.css";

const processSteps = [
  {
    title: "Discovery & Strategy",
    description:
      "We run a structured kick-off with your marketing and leadership team before touching a single wireframe. We map your buyer's journey, your competitive positioning, and the one thing your site needs to do to move the business forward.",
  },
  {
    title: "Information Architecture",
    description:
      "We run a structured kick-off with your marketing and leadership team before touching a single wireframe. We map your buyer's journey.",
  },
  {
    title: "Wireframing",
    description:
      "We run a structured kick-off with your marketing and leadership team before touching a single wireframe. We map your buyer's journey, your competitive positioning.",
  },
  {
    title: "Copywriting",
    description:
      "We run a structured kick-off with your marketing and leadership team before touching a single wireframe.",
  },
];

export default function OurProcessSection() {
  return (
    <section className={styles.section} aria-labelledby="web-process-heading">
      <div className={styles.inner}>
        <h2 id="web-process-heading" className={styles.sectionHeading}>
          Our Process
        </h2>

        <ol className={styles.processList}>
          {processSteps.map((step, index) => (
            <li className={styles.processRow} key={step.title}>
              <span className={styles.stepNumber}>{index + 1} -</span>
              <h3 className={styles.stepHeading}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
