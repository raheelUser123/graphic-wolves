import type { ContactFormData } from "./ContactForm";
import styles from "./StepTwo.module.css";

interface StepTwoProps {
  data: ContactFormData;
  errors: Record<string, string>;
  updateField: (
    field: keyof ContactFormData,
    value: string | string[]
  ) => void;
  onBack: () => void;
  onNext: () => void;
}

const roles = [
  "Founder / CEO",
  "Marketing Lead",
  "Designer / Brand Lead",
  "Operations / Others",
];

export default function StepTwo({
  data,
  errors,
  updateField,
  onBack,
  onNext,
}: StepTwoProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.stepHeader}>
        <h2 className={styles.sectionTitle}>
          Contact &amp; Role Information
        </h2>
      </div>

      <div className={styles.formGroupList}>
        {/* Name */}
        <div className={styles.fieldBlock}>
          <label className={styles.label} htmlFor="yourName">
            Your Name <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="yourName"
            type="text"
            value={data.yourName}
            onChange={(e) => updateField("yourName", e.target.value)}
            placeholder="Your name"
            className={`${styles.input} ${errors.yourName ? styles.inputError : ""}`}
          />
          {errors.yourName && (
            <p className={styles.errorText}>{errors.yourName}</p>
          )}
        </div>

        {/* Company */}
        <div className={styles.fieldBlock}>
          <label className={styles.label} htmlFor="companyName">
            Company Name <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="companyName"
            type="text"
            value={data.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            placeholder="Company name"
            className={`${styles.input} ${errors.companyName ? styles.inputError : ""}`}
          />
          {errors.companyName && (
            <p className={styles.errorText}>{errors.companyName}</p>
          )}
        </div>

        {/* Phone */}
        <div className={styles.fieldBlock}>
          <label className={styles.label} htmlFor="phoneNo">
            Phone Number <span className={styles.requiredStar}>*</span>
          </label>
          <input
            id="phoneNo"
            type="tel"
            value={data.phoneNo}
            onChange={(e) => updateField("phoneNo", e.target.value)}
            placeholder="Phone number"
            className={`${styles.input} ${errors.phoneNo ? styles.inputError : ""}`}
          />
          {errors.phoneNo && (
            <p className={styles.errorText}>{errors.phoneNo}</p>
          )}
        </div>

        {/* Email */}
        <div className={styles.fieldBlock}>
          <label className={styles.label} htmlFor="email">
            Enter your email
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="you@example.com"
            className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          />
          {errors.email && (
            <p className={styles.errorText}>{errors.email}</p>
          )}
        </div>

        {/* Role */}
        <div className={styles.fieldBlock}>
          <label className={styles.label}>
            What is your role? <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.gridRoles}>
            {roles.map((role) => {
              const selected = data.role === role;
              return (
                <label
                  key={role}
                  className={`${styles.optionCard} ${
                    selected ? styles.optionCardSelected : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={selected}
                    onChange={(e) => updateField("role", e.target.value)}
                    className={styles.radioInput}
                  />
                  <span className={styles.optionLabel}>{role}</span>
                </label>
              );
            })}
          </div>
          {errors.role && (
            <p className={styles.errorText}>{errors.role}</p>
          )}
        </div>

        {/* Actions Row */}
        <div className={styles.actionsRow}>
          <button
            type="button"
            onClick={onBack}
            className={styles.backButton}
          >
            Back
          </button>

          <button
            type="button"
            onClick={onNext}
            className={styles.nextButton}
          >
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
    </div>
  );
}
