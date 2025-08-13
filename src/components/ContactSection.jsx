import React, { useState, useEffect } from "react";
import GlowCard from "./GlowCard";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useTheme } from "../utils/ThemeProvider";
import { useDeviceDetection } from "../hooks/useDeviceDetection";

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
  const { theme } = useTheme();
  const { isTouchDevice } = useDeviceDetection();
  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => setFormStatus(null), 5000);
    } catch (error) {
      console.error(
        "Failed to send email:",
        error.text || error.message || error
      );
      setFormStatus("error");

      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  const handleKeyDown = (e) => {
    // Submit form when Enter is pressed without Shift key
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline insertion

      // Check if all required fields are filled
      if (
        formData.name &&
        formData.email &&
        formData.subject &&
        formData.message
      ) {
        handleSubmit(e);
      }
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
      url: "https://www.linkedin.com/in/aniket-chawardol/",
    },
    {
      name: "Email",
      icon: <FaEnvelope size={24} />,
      url: "mailto:aniketchawardol@gmail.com",
    },
  ];

  return (
    <div
      id="contact"
      className="w-full min-h-screen flex items-center justify-center dark:from-[#1e0438] dark:via-[#170732] dark:to-[#0f0a29]
           bg-gradient-to-b from-[#a28cd1] via-[#b6a6e3] to-[#cbb4f0]
      py-16 relative"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-halfomania text-slate-700 dark:text-slate-200 text-center">
          Get In Touch
        </h2>
        <p className="text-center mt-2 text-slate-600 dark:text-slate-300 font-mono">
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
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto h-full">
          <div className="md:w-2/3">
            <GlowCard
              className="bg-white/20 border-white/20 dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md shadow-lg rounded-xl p-6 h-full relative"
              isDarkMode={isDarkMode}
              customSize={true}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-exo text-slate-700 dark:text-slate-200 mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-mono"
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
                        className="w-full px-4 py-2 bg-white/50 border border-white/30 dark:bg-[#1e1b4b]/50 dark:border-[#4c1d95]/30 dark:text-slate-200 focus:ring-purple-400 dark:focus:ring-purple-500 rounded-xl focus:outline-none focus:ring-2"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-mono"
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
                        className="w-full px-4 py-2 bg-white/50 border border-white/30 dark:bg-[#1e1b4b]/50 dark:border-[#4c1d95]/30 dark:text-slate-200 focus:ring-purple-400 dark:focus:ring-purple-500 rounded-xl focus:outline-none focus:ring-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-mono"
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
                      className="w-full px-4 py-2 bg-white/50 border border-white/30 dark:bg-[#1e1b4b]/50 dark:border-[#4c1d95]/30 dark:text-slate-200 focus:ring-purple-400 dark:focus:ring-purple-500 rounded-xl focus:outline-none focus:ring-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 font-mono"
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
                      onKeyDown={handleKeyDown}
                      className="w-full px-4 py-2 bg-white/50 border border-white/30 dark:bg-[#1e1b4b]/50 dark:border-[#4c1d95]/30 dark:text-slate-200 focus:ring-purple-400 dark:focus:ring-purple-500 rounded-xl focus:outline-none focus:ring-2 resize-none"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className={`w-full py-3 px-6 bg-[#7263b3] ${
                        !isTouchDevice
                          ? "hover:bg-[#5e4b9c] dark:hover:bg-[#473677]"
                          : "active:bg-[#5e4b9c] dark:active:bg-[#473677]"
                      } dark:bg-[#5c4a99] text-white rounded-xl transition-colors disabled:opacity-70`}
                    >
                      {formStatus === "submitting"
                        ? "Sending..."
                        : "Send Message"}
                    </button>
                    <p className="text-xs text-center mt-2 text-slate-400 font-mono">
                      You can also Press{" "}
                      <span className="font-bold">Enter</span> to send,{" "}
                      <span className="font-bold">use Shift+Enter</span> for new
                      line
                    </p>
                  </div>
                </form>
              </div>
            </GlowCard>
          </div>

          <div className="md:w-1/3 space-y-6">
            <GlowCard
              className="bg-white/20 border-white/20 dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md shadow-lg rounded-xl p-8 relative"
              isDarkMode={isDarkMode}
              customSize={true}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-exo text-slate-700 dark:text-slate-200 mb-6">
                  Connect
                </h3>

                <div className="flex flex-col gap-4">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 dark:text-slate-300 text-slate-700 ${
                        !isTouchDevice
                          ? "hover:text-purple-600 hover:bg-white/30 dark:hover:bg-slate-700/30"
                          : "active:text-purple-600 active:bg-white/30 dark:active:bg-slate-700/30"
                      } transition-colors p-2 rounded-md`}
                    >
                      <span className="text-[#7263b3]">{link.icon}</span>
                      <span className="font-mono">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </GlowCard>

            <GlowCard
              className="bg-white/20 border-white/20 dark:bg-[#2e1065]/30 dark:border-[#4c1d95]/30 backdrop-blur-md shadow-lg rounded-xl p-8 relative mt-6"
              isDarkMode={isDarkMode}
              customSize={true}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-exo text-slate-700 dark:text-slate-200 mb-[25px]">
                  Location
                </h3>
                <p className="font-mono text-slate-600 dark:text-slate-300">
                  Gwalior, Madhya Pradesh
                  <br />
                  India
                </p>
                <div className="mt-4 font-mono text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700 pt-3">
                  <p className="text-sm">Local Time:</p>
                  <p className="text-md font-medium">{indianTime}</p>
                  <p className="text-md">{indianDate}</p>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
