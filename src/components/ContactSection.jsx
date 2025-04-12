import React, { useState, useEffect } from "react";
import SpotlightCard from "../assets/Components/SpotlightCard/SpotlightCard";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time to Indian Standard Time
  const indianTime = currentTime.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const indianDate = currentTime.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Email sent successfully
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset the success message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    } catch (error) {
      console.error(
        "Failed to send email:",
        error.text || error.message || error
      );
      setFormStatus("error");

      // Reset the error message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <FaGithub size={24} />,
      url: "https://github.com/aniketchawardol",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={24} />,
      url: "https://linkedin.com/in/aniketchawardol",
    },
    {
      name: "Email",
      icon: <FaEnvelope size={24} />,
      url: "mailto:aniketchawardol@example.com",
    },
  ];

  return (
    <div
      id="contact"
      className="w-full min-h-screen flex items-center justify-center bg-gradient-to-t from-[#8672b8] via-[#a28cd1] to-[#cbb4f0] py-16 relative"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-halfomania text-slate-700 text-center">
          Get In Touch
        </h2>
        <p className="text-center text-slate-600  font-mono">
          Feel free to reach out for collaborations, opportunities, or just a
          friendly chat!
        </p>
        <div className="h-15">
          {formStatus === "error" && (
            <p className="text-red-600 font-mono text-center">
              Failed to send message. Please try again later.
            </p>
          )}
          {formStatus === "success" && (
            <p className="mt-3 text-green-600 font-mono text-center">
              Message sent successfully! I'll get back to you soon.
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto h-full">
          {/* Contact Form */}
          <div className="md:w-2/3">
            <SpotlightCard
              className="bg-white/20 border border-white/20 shadow-lg rounded-xl p-8 backdrop-blur-md h-full relative"
              spotlightColor="#9b7dcf"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-exo text-slate-700 mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 mb-1 font-mono"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 mb-1 font-mono"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-700 mb-1 font-mono"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 mb-1 font-mono"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 bg-white/50 border border-white/30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className="w-full py-3 px-6 bg-[#7263b3] text-white rounded-md hover:bg-[#5e4b9c] transition-colors disabled:opacity-70"
                    >
                      {formStatus === "submitting"
                        ? "Sending..."
                        : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </SpotlightCard>
          </div>

          {/* Contact Info */}
          <div className="md:w-1/3 space-y-6">
            <SpotlightCard
              className="bg-white/20 border border-white/20 shadow-lg rounded-xl p-8 backdrop-blur-md relative"
              spotlightColor="#9b7dcf"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-exo text-slate-700 mb-6">
                  Connect
                </h3>

                <div className="space-y-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-700 hover:text-purple-600 transition-colors p-2 hover:bg-white/30 rounded-md"
                    >
                      <span className="text-[#7263b3]">{link.icon}</span>
                      <span className="font-mono">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard
              className="bg-white/20 border border-white/20 shadow-lg rounded-xl p-8 backdrop-blur-md relative"
              spotlightColor="#9b7dcf"
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-exo text-slate-700 mb-4">
                  Location
                </h3>
                <p className="font-mono text-slate-600">
                  Yavatmal, Maharashtra
                  <br />
                  India
                </p>
                <div className="mt-4 font-mono text-slate-600 border-t border-slate-200 pt-3">
                  <p className="text-sm">Local Time:</p>
                  <p className="text-md font-medium">{indianTime}</p>
                  <p className="text-md">{indianDate}</p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
