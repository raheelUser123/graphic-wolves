"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

export interface ContactFormData {
  yourName: string;
  companyName: string;
  phoneNo: string;
  email: string;
  role: string;
  services: string[];
  companyDescription: string;
  projectDetails: string;
}

const initialFormData: ContactFormData = {
  yourName: "",
  companyName: "",
  phoneNo: "",
  email: "",
  role: "",
  services: [],
  companyDescription: "",
  projectDetails: "",
};

export default function ContactForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const updateField = (
    field: keyof ContactFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setServerError("");
  };

  const validateStepTwo = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.yourName.trim()) {
      newErrors.yourName = "Please enter your name.";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Please enter your company name.";
    }

    if (!formData.phoneNo.trim()) {
      newErrors.phoneNo = "Please enter your phone number.";
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.role) {
      newErrors.role = "Please select your role.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepThree = () => {
    const newErrors: Record<string, string> = {};

    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service.";
    }

    if (!formData.companyDescription.trim()) {
      newErrors.companyDescription = "Please tell us what your company does.";
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = "Please tell us about your project.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStepTwo = () => {
    setStep(2);
  };

  const goToStepThree = () => {
    if (validateStepTwo()) {
      setStep(3);
    }
  };

  const submitForm = async () => {
    if (!validateStepThree()) {
      return;
    }

    setLoading(true);
    setServerError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }

      setSubmitted(true);
      setStep(4);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Unable to submit the form."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.section} aria-label="Contact form section">
      <div className={styles.container}>
        <div className={styles.formCard}>
          {/* Progress Bar Header */}
          <div
            className={styles.progressBar}
            aria-label={`Step ${step} of 4`}
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`${styles.progressSegment} ${
                  i <= step ? styles.segmentActive : ""
                }`}
              />
            ))}
          </div>

          {/* Form Step Contents */}
          <div className={styles.formBody}>
            {step === 1 && <StepOne onNext={goToStepTwo} />}

            {step === 2 && (
              <StepTwo
                data={formData}
                errors={errors}
                updateField={updateField}
                onBack={() => setStep(1)}
                onNext={goToStepThree}
              />
            )}

            {step === 3 && (
              <StepThree
                data={formData}
                errors={errors}
                loading={loading}
                serverError={serverError}
                updateField={updateField}
                onBack={() => setStep(2)}
                onSubmit={submitForm}
              />
            )}

            {step === 4 && (submitted || true) && <StepFour />}
          </div>
        </div>
      </div>
    </section>
  );
}
