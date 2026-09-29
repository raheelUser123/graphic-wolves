import styles from "./ContactFormSection.module.css";

const contactDetails = [
  {
    label: "Email us",
    value: "hello@graphicwolves.com",
  },
  {
    label: "Call us",
    value: "+92 300 0000000",
  },
  {
    label: "Location",
    value: "Lahore, Pakistan",
  },
];

export default function ContactFormSection() {
  return (
    <section className={styles.section} aria-labelledby="contact-form-title">
      <div className={styles.content}>
        <div className={styles.details}>
          {contactDetails.map((detail) => (
            <div className={styles.detailItem} key={detail.label}>
              <h2 className={styles.detailLabel}>{detail.label}</h2>
              <p className={styles.detailValue}>{detail.value}</p>
            </div>
          ))}
        </div>

        <div className={styles.formCard}>
          <h2 id="contact-form-title" className={styles.formTitle}>
            Send us a message
          </h2>

          {/*
            ============================================
            FORM FIELDS WILL GO HERE
            Add inputs (name, email, subject, message)
            inside <form> below once ready.
            ============================================
          */}
          <form className={styles.form} action="#" method="POST">
            <p className={styles.formPlaceholder}>
              Form fields coming soon.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
