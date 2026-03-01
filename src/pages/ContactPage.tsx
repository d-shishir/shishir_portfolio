import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { SharedHeader } from "../components/SharedHeader";
import "../hero.css";

export function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const SERVICE_ID = "service_fs68l0d";
  const TEMPLATE_ID = "template_n57zvwa";
  const PUBLIC_KEY = "kZkwDh1C7ux74HXy-";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.target as HTMLFormElement;
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);
      setSubmitSuccess(true);
      form.reset();
      setFormData({ name: "", email: "", message: "" });
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Background */}
      <div className="contact-bg" />

      <SharedHeader />

      {/* Main Content */}
      <main className="contact-main">
        <div className="contact-layout">
          {/* Left: Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            <h1 className="contact-title">
              <span className="contact-title-line">Let's</span>
              <span className="contact-title-line italic">Connect</span>
            </h1>
            <p className="contact-tagline">
              Have a project in mind, a question, or just want to say hello?
              I'd love to hear from you.
            </p>

            <div className="contact-links">
              <a
                href="mailto:dshishir13@gmail.com"
                className="contact-social-link"
                id="contact-email"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,12 2,6"/>
                </svg>
                <span>dshishir13@gmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/dshishir13"
                target="_blank"
                rel="noreferrer"
                className="contact-social-link"
                id="contact-linkedin"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path fillRule="evenodd" d="M22.23 0H1.77C.794 0 0 .793 0 1.77v20.46c0 .977.794 1.77 1.77 1.77h20.46c.977 0 1.77-.793 1.77-1.77V1.77C24 .793 23.206 0 22.23 0zm-6.963 20.52h-3.515v-5.503c0-1.312-.022-2.998-1.828-2.998-1.828 0-2.108 1.426-2.108 2.894v5.607h-3.516V9.497h3.375v1.633h.048c.467-.885 1.597-1.67 3.29-1.67 3.515 0 4.16 2.314 4.16 5.338v5.722zm-9.207 0h-3.515v-11.02h3.515v11.02zm-1.757-12.68c-1.13 0-1.828-.821-1.828-1.847 0-1.013.688-1.847 1.828-1.847 1.14 0 1.828.834 1.828 1.847 0 1.026-.688 1.847-1.828 1.847z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href="https://github.com/d-shishir"
                target="_blank"
                rel="noreferrer"
                className="contact-social-link"
                id="contact-github"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path fillRule="evenodd" d="M12 .297c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.112.82-.259.82-.577 0-.286-.01-1.042-.015-2.048-3.338.726-4.04-1.607-4.04-1.607-.546-1.388-1.334-1.758-1.334-1.758-1.09-.746.083-.73.083-.73 1.207.085 1.841 1.238 1.841 1.238 1.07 1.834 2.809 1.304 3.495.998.106-.773.418-1.303.763-1.604-2.664-.303-5.467-1.332-5.467-5.921 0-1.306.467-2.376 1.235-3.216-.124-.303-.535-1.527.116-3.175 0 0 1.008-.322 3.301 1.235a11.485 11.485 0 0 1 3.003-.404c1.02.004 2.04.139 3.003.404 2.293-1.557 3.301-1.235 3.301-1.235.651 1.648.24 2.872.116 3.175.768.84 1.235 1.91 1.235 3.216 0 4.601-2.805 5.617-5.471 5.921.432.373.817 1.103.817 2.224 0 1.605-.014 2.899-.014 3.286 0 .318.219.689.825.577C20.563 22.1 24 17.6 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://x.com/shishirai_"
                target="_blank"
                rel="noreferrer"
                className="contact-social-link"
                id="contact-twitter"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                <span>X / Twitter</span>
              </a>
            </div>

            {/* Decorative element */}
            <div className="contact-deco">
              <div className="contact-deco-line" />
              <span className="contact-deco-text">or send a message</span>
              <div className="contact-deco-line" />
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {submitSuccess ? (
              <motion.div
                className="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="success-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
                <h3>Message sent!</h3>
                <p>Thanks for reaching out. I'll get back to you soon.</p>
                <button
                  className="contact-submit-btn"
                  onClick={() => setSubmitSuccess(false)}
                  style={{ marginTop: "1.5rem" }}
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <div className={`form-field ${focusedField === "name" ? "form-field--focused" : ""} ${formData.name ? "form-field--filled" : ""}`}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div className={`form-field ${focusedField === "email" ? "form-field--focused" : ""} ${formData.email ? "form-field--filled" : ""}`}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className={`form-field form-field--textarea ${focusedField === "message" ? "form-field--focused" : ""} ${formData.message ? "form-field--filled" : ""}`}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={isSubmitting}
                  id="contact-submit"
                >
                  {isSubmitting ? (
                    <>
                      <span className="btn-spinner" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 19-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
