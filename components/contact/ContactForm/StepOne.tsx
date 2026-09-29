import styles from "./StepOne.module.css";

interface StepOneProps {
  onNext: () => void;
}

export default function StepOne({ onNext }: StepOneProps) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Start Project</h2>

      <p className={styles.description}>
        Tell us about your project. We work with a handful of partners at a time,
        so we read every submission and reply within 48 hours. About 2 minutes.
      </p>

      <div className={styles.actionRow}>
        <button type="button" onClick={onNext} className={styles.nextButton}>
          <span>Next</span>
          <svg
            className={styles.arrowIcon}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}