import { useState, useEffect, useCallback, useMemo, memo } from "react";
import GlowCard from "./GlowCard";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useDeviceDetection } from "../hooks/useDeviceDetection";
import { SOCIAL_LINKS } from "../constants";
import { getIndianDateTime } from "../utils/helpers";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

const ContactSection = memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const { isTouchDevice } = useDeviceDetection();

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  // Use the helper function with live updates - no need for separate state
  const { indianTime, indianDate } = getIndianDateTime();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setFormStatus("submitting");

      try {
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        };

        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
        );

        setFormStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => setFormStatus(null), 5000);
      } catch (error) {
        console.error(
          "Failed to send email:",
          error.text || error.message || error,
        );
        setFormStatus("error");

        setTimeout(() => setFormStatus(null), 5000);
      }
    },
    [formData],
  );

  const handleKeyDown = useCallback(
    (e) => {
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
    },
    [formData, handleSubmit],
  );

  const socialLinksWithIcons = useMemo(
    () =>
      SOCIAL_LINKS.map((link) => ({
        ...link,
        icon:
          link.name === "GitHub" ? (
            <FaGithub size={24} />
          ) : link.name === "LinkedIn" ? (
            <FaLinkedin size={24} />
          ) : (
            <FaEnvelope size={24} />
          ),
      })),
    [],
  );

  return (
    <div
      id="contact"
      className="w-full min-h-screen flex items-center justify-center bg-[#000000]
      py-16 relative"
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-halfomania text-white text-center">
          Get In Touch
        </h2>
        <p className="text-center mt-2 text-white font-mono">
          Feel free to reach out for collaborations, opportunities, or just a
          friendly chat!
        </p>
        <div className="h-15">
          {formStatus === "error" && (
            <p className="text-[#FF5C00] font-mono text-center">
              Failed to send message. Please try again later.
            </p>
          )}
          {formStatus === "success" && (
            <p className="mt-3 text-[#FF5C00] font-mono text-center">
              Message sent successfully! I'll get back to you soon.
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto h-full">
          <div className="md:w-2/3">
            <GlowCard
              className="bg-[#1a1a1a]/80 border-[#FF5C00] border-2 backdrop-blur-md rounded-xl p-6 h-full relative"
              customSize={true}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-exo text-white mb-6">
                  Send a Message
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white mb-1 font-mono"
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
                        className="w-full px-4 py-2 bg-[#0a0a0a]/80 border border-[#FF5C00]/30 text-white focus:ring-[#FF5C00] rounded-[9px] focus:outline-none focus:ring-2"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white mb-1 font-mono"
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
                        className="w-full px-4 py-2 bg-[#0a0a0a]/80 border border-[#FF5C00]/30 text-white focus:ring-[#FF5C00] rounded-[9px] focus:outline-none focus:ring-2"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-white mb-1 font-mono"
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
                      className="w-full px-4 py-2 bg-[#0a0a0a]/80 border border-[#FF5C00]/30 text-white focus:ring-[#FF5C00] rounded-[9px] focus:outline-none focus:ring-2"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-white mb-1 font-mono"
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
                      className="w-full px-4 py-2 bg-[#0a0a0a]/80 border border-[#FF5C00]/30 text-white focus:ring-[#FF5C00] rounded-[9px] focus:outline-none focus:ring-2 resize-none"
                    />
                  </div>
                  <p className="text-xs text-center mt-2 text-white font-mono">
                    You can also Press <span className="font-bold">Enter</span>{" "}
                    to send, <span className="font-bold">use Shift+Enter</span>{" "}
                    for new line
                  </p>
                  <div>
                    <button
                      type="submit"
                      disabled={formStatus === "submitting"}
                      className={`w-full py-3 px-6 bg-[#FF5C00] ${
                        !isTouchDevice
                          ? "hover:bg-[#FF8533]"
                          : "active:bg-[#FF8533]"
                      } text-white rounded-[9px] transition-colors disabled:opacity-70`}
                    >
                      {formStatus === "submitting"
                        ? "Sending..."
                        : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </GlowCard>
          </div>

          <div className="md:w-1/3 space-y-6">
            <GlowCard
              className="bg-[#1a1a1a]/80 border-[#FF5C00]/30 backdrop-blur-md rounded-xl p-8 relative"
              customSize={true}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-exo text-white mb-6">Connect</h3>

                <div className="flex flex-col gap-4">
                  {socialLinksWithIcons.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 text-white ${
                        !isTouchDevice
                          ? "hover:text-[#FF5C00] hover:bg-[#FF5C00]/10"
                          : "active:text-[#FF5C00] active:bg-[#FF5C00]/10"
                      } transition-colors p-2 rounded-md`}
                    >
                      <span className="text-[#FF5C00]">{link.icon}</span>
                      <span className="font-mono">{link.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </GlowCard>

            <GlowCard
              className="bg-[#1a1a1a]/80 border-[#FF5C00]/30 backdrop-blur-md rounded-xl p-8 relative mt-6"
              customSize={true}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-exo text-white mb-[25px]">
                  Location
                </h3>
                <p className="font-mono text-white">
                  Gwalior, Madhya Pradesh
                  <br />
                  India
                </p>
                <div className="mt-4 font-mono text-white border-[#FF5C00] pt-3 border-t-2">
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
});

ContactSection.displayName = "ContactSection";

export default ContactSection;
