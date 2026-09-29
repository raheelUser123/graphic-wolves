import type { ContactFormData } from "./ContactForm";
import styles from "./StepThree.module.css";

interface StepThreeProps {
  data: ContactFormData;
  errors: Record<string, string>;
  loading: boolean;
  serverError: string;
  updateField: (
    field: keyof ContactFormData,
    value: string | string[]
  ) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const servicesList = [
  "Branding",
  "E-Commerce",
  "Website Development",
];

export default function StepThree({
  data,
  errors,
  loading,
  serverError,
  updateField,
  onBack,
  onSubmit,
}: StepThreeProps) {
  const toggleService = (service: string) => {
    const exists = data.services.includes(service);

    if (exists) {
      updateField(
        "services",
        data.services.filter((item) => item !== service)
      );
    } else {
      updateField("services", [...data.services, service]);
    }
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.stepHeader}>
        <h2 className={styles.sectionTitle}>Project Details</h2>
      </div>

      <div className={styles.formGroupList}>
        {/* Services */}
        <div className={styles.fieldBlock}>
          <label className={styles.label}>
            What are you looking for? <span className={styles.requiredStar}>*</span>
          </label>
          <div className={styles.servicesStack}>
            {servicesList.map((service) => {
              const selected = data.services.includes(service);
              return (
                <label
                  key={service}
                  className={`${styles.optionCard} ${
                    selected ? styles.optionCardSelected : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggleService(service)}
                    className={styles.checkboxInput}
                  />
                  <span className={styles.optionLabel}>{service}</span>
                </label>
              );
            })}
          </div>
          {errors.services && (
            <p className={styles.errorText}>{errors.services}</p>
          )}
        </div>

        {/* Company Description */}
        <div className={styles.fieldBlock}>
          <label className={styles.label} htmlFor="companyDescription">
            What does the company do? <span className={styles.requiredStar}>*</span>
          </label>
          <textarea
            id="companyDescription"
            rows={4}
            value={data.companyDescription}
            onChange={(e) =>
              updateField("companyDescription", e.target.value)
            }
            placeholder="In a sentence or two: what does the company do and who is it for?"
            className={`${styles.textarea} ${
              errors.companyDescription ? styles.inputError : ""
            }`}
          />
          {errors.companyDescription && (
            <p className={styles.errorText}>{errors.companyDescription}</p>
          )}
        </div>

        {/* Project Details */}
        <div className={styles.fieldBlock}>
          <label className={styles.label} htmlFor="projectDetails">
            What&apos;s the Project? <span className={styles.requiredStar}>*</span>
          </label>
          <textarea
            id="projectDetails"
            rows={5}
            value={data.projectDetails}
            onChange={(e) => updateField("projectDetails", e.target.value)}
            placeholder="What are you trying to build, change or fix?"
            className={`${styles.textarea} ${
              errors.projectDetails ? styles.inputError : ""
            }`}
          />
          {errors.projectDetails && (
            <p className={styles.errorText}>{errors.projectDetails}</p>
          )}
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className={styles.serverErrorBox} role="alert">
            {serverError}
          </div>
        )}

        {/* Actions Row */}
        <div className={styles.actionsRow}>
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className={styles.backButton}
          >
            Back
          </button>

          <button
            type="button"
            onClick={onSubmit}
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "Submitting..." : "Submit Project Inquiry"}
          </button>
        </div>
      </div>
    </div>
  );
}
