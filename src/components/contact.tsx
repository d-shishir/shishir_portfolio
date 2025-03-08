import React, { useState } from "react";
import { Button } from "./ui/button";
import emailjs from "emailjs-com";
import { AlertSuccess } from "./success_alert";

interface ContactFormProps {}

const Contact: React.FC<ContactFormProps> = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // @ts-ignore
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const SERVICE_ID = "service_fs68l0d";
  const TEMPLATE_ID = "template_n57zvwa";
  const PUBLIC_KEY = "kZkwDh1C7ux74HXy-";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Type assertion to specify the target as HTMLFormElement
    const form = e.target as HTMLFormElement;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY).then(
      (result: emailjs.EmailJSResponseStatus) => {
        console.log(result.text);
        setSubmitSuccess(true);
      },
      (error: emailjs.EmailJSResponseStatus) => {
        console.log(error.text);
        alert("Something went wrong!");
      }
    );

    form.reset(); // Reset the form after submission
  };

  return (
    <section id="contact" className="w-full py-16 bg-black">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 tracking-tight text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
            Contact Me
          </span>
          <br />
        </h1>
        <div className=" ">
          {/* Left Content - Contact Form */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            <form
              className="bg-transparent p-6 rounded-lg shadow-lg border-2 border-white/[0.15] backdrop-blur-[2px]"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="text-lg text-white font-semibold block mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-black border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="text-lg text-white font-semibold block mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-black border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="text-lg text-white font-semibold block mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-black border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Write your message"
                ></textarea>
              </div>

              <Button
                size="lg"
                className="gap-4 border-gray-600 text-gray-300 hover:border-white hover:text-white"
                variant="outline"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              {submitSuccess && !isSubmitting && (
                <div className="mt-4 text-green-500 text-center">
                  Message sent successfully!
                </div>
              )}
            </form>
            {submitSuccess && <AlertSuccess />}
          </div>

          {/* Right Content - Social Media Links */}
          <div className="flex flex-col gap-6 items-center mt-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-white text-center lg:text-left">
              Or Connect with Me on Social Media
            </h3>
            <div className="flex gap-6 justify-center lg:justify-start">
              {/* GitHub Icon */}
              <a
                href="https://github.com/d-shishir"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 .297c-6.627 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.112.82-.259.82-.577 0-.286-.01-1.042-.015-2.048-3.338.726-4.04-1.607-4.04-1.607-.546-1.388-1.334-1.758-1.334-1.758-1.09-.746.083-.73.083-.73 1.207.085 1.841 1.238 1.841 1.238 1.07 1.834 2.809 1.304 3.495.998.106-.773.418-1.303.763-1.604-2.664-.303-5.467-1.332-5.467-5.921 0-1.306.467-2.376 1.235-3.216-.124-.303-.535-1.527.116-3.175 0 0 1.008-.322 3.301 1.235a11.485 11.485 0 0 1 3.003-.404c1.02.004 2.04.139 3.003.404 2.293-1.557 3.301-1.235 3.301-1.235.651 1.648.24 2.872.116 3.175.768.84 1.235 1.91 1.235 3.216 0 4.601-2.805 5.617-5.471 5.921.432.373.817 1.103.817 2.224 0 1.605-.014 2.899-.014 3.286 0 .318.219.689.825.577C20.563 22.1 24 17.6 24 12c0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </a>

              {/* LinkedIn Icon */}
              <a
                href="https://www.linkedin.com/in/dshishir13"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M22.23 0H1.77C.794 0 0 .793 0 1.77v20.46c0 .977.794 1.77 1.77 1.77h20.46c.977 0 1.77-.793 1.77-1.77V1.77C24 .793 23.206 0 22.23 0zm-6.963 20.52h-3.515v-5.503c0-1.312-.022-2.998-1.828-2.998-1.828 0-2.108 1.426-2.108 2.894v5.607h-3.516V9.497h3.375v1.633h.048c.467-.885 1.597-1.67 3.29-1.67 3.515 0 4.16 2.314 4.16 5.338v5.722zm-9.207 0h-3.515v-11.02h3.515v11.02zm-1.757-12.68c-1.13 0-1.828-.821-1.828-1.847 0-1.013.688-1.847 1.828-1.847 1.14 0 1.828.834 1.828 1.847 0 1.026-.688 1.847-1.828 1.847z"
                  />
                </svg>
              </a>

              {/* Twitter Icon */}
              {/* <a
                href="https://www.x.com/reddevilccr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M23.644 4.832c-.883.391-1.83.654-2.828.775 1.017-.61 1.794-1.576 2.16-2.723-.951.56-2.002.966-3.127 1.184-.896-.957-2.169-1.548-3.593-1.548-2.718 0-4.927 2.208-4.927 4.926 0 .387.04.765.117 1.125-4.1-.205-7.74-2.169-10.17-5.144-.424.726-.666 1.57-.666 2.473 0 1.706.869 3.216 2.187 4.096-.805-.026-1.565-.247-2.228-.616v.062c0 2.38 1.693 4.373 3.946 4.826-.412.11-.848.171-1.289.171-.314 0-.621-.031-.921-.088.622 1.946 2.425 3.365 4.557 3.407-1.672 1.311-3.784 2.092-6.072 2.092-.393 0-.783-.023-1.17-.068 2.169 1.396 4.748 2.209 7.51 2.209 9.015 0 13.95-7.467 13.95-13.951 0-.213-.005-.426-.014-.638.956-.693 1.797-1.56 2.46-2.549z"
                  />
                </svg>
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
