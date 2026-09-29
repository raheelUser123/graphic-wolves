import styles from "./StepFour.module.css";

export default function StepFour() {
  const calendlyUrl =
    process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/yourusername/30min";

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2 className={styles.title}>Schedule a Call</h2>
        <p className={styles.subtitle}>
          Your inquiry was submitted! Pick a time that works best for you.
        </p>
      </div>

      <div className={styles.iframeWrapper}>
        <iframe
          src={calendlyUrl}
          width="100%"
          height="700"
          frameBorder="0"
          title="Schedule a Call"
          className={styles.iframe}
        />
      </div>
    </div>
  );
}
