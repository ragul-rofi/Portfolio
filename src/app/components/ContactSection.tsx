import { useState } from "react";
import { motion } from "motion/react";
import { Send, Linkedin, Github, Package, MapPin, Mail, User } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("sent");
      setTimeout(() => {
        setStatus("idle");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="min-h-screen py-24 px-8 md:px-16 lg:px-24 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-[#4682B4]">[04]</span>
            <div className="h-[1px] flex-1 bg-[#121212]/20" />
          </div>
          <h2 className="text-5xl md:text-6xl font-[900] tracking-tight text-[#121212]">
            THE FINAL<br />HANDSHAKE
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block font-mono text-xs text-[#121212]/60 mb-2 tracking-wider">
                  NAME
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121212]/30" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#121212] bg-[#F5F5F5] focus:bg-white focus:border-[#4682B4] outline-none transition-colors"
                    placeholder="Your Name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block font-mono text-xs text-[#121212]/60 mb-2 tracking-wider">
                  EMAIL
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#121212]/30" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-12 pr-4 py-4 border-2 border-[#121212] bg-[#F5F5F5] focus:bg-white focus:border-[#4682B4] outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block font-mono text-xs text-[#121212]/60 mb-2 tracking-wider">
                  SUBJECT
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-4 border-2 border-[#121212] bg-[#F5F5F5] focus:bg-white focus:border-[#4682B4] outline-none transition-colors"
                  placeholder="Project Inquiry / Collaboration"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block font-mono text-xs text-[#121212]/60 mb-2 tracking-wider">
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border-2 border-[#121212] bg-[#F5F5F5] focus:bg-white focus:border-[#4682B4] outline-none transition-colors resize-none"
                  placeholder="Tell me about your project or inquiry..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="group relative w-full px-8 py-4 bg-[#121212] text-[#F5F5F5] font-mono text-sm tracking-wider overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: status === "idle" ? 0.98 : 1 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {status === "idle" && (
                    <>
                      DIRECT_CONNECT
                      <Send className="w-4 h-4" />
                    </>
                  )}
                  {status === "sending" && "ESTABLISHING_CONNECTION..."}
                  {status === "sent" && "MESSAGE_TRANSMITTED ✓"}
                </span>
                {status === "idle" && (
                  <motion.div
                    className="absolute inset-0 bg-[#4682B4]"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Info Card */}
            <div className="border-2 border-[#121212] bg-[#F5F5F5] p-8">
              <div className="font-mono text-xs text-[#4682B4] mb-6 tracking-wider">CONTACT_INFO</div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#121212] mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-mono text-xs text-[#121212]/50 mb-1">LOCATION</div>
                    <div className="text-lg text-[#121212]">Based in Coimbatore, IN</div>
                    <div className="text-sm text-[#121212]/60">Available for Global Innovation</div>
                  </div>
                </div>

                <div className="h-[1px] bg-[#121212]/10" />

                <div>
                  <div className="font-mono text-xs text-[#121212]/50 mb-3">CONNECT</div>
                  <div className="space-y-3">
                    <a
                      href="https://linkedin.com/in/ragularumugam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[#121212] hover:text-[#4682B4] transition-colors group"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="text-sm">LinkedIn</span>
                      <span className="font-mono text-xs text-[#121212]/30 group-hover:text-[#4682B4] transition-colors">
                        →
                      </span>
                    </a>
                    <a
                      href="https://github.com/ragularumugam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[#121212] hover:text-[#4682B4] transition-colors group"
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm">GitHub</span>
                      <span className="font-mono text-xs text-[#121212]/30 group-hover:text-[#4682B4] transition-colors">
                        →
                      </span>
                    </a>
                    <a
                      href="https://pypi.org/user/ragularumugam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-[#121212] hover:text-[#4682B4] transition-colors group"
                    >
                      <Package className="w-5 h-5" />
                      <span className="text-sm">PyPI Profile</span>
                      <span className="font-mono text-xs text-[#121212]/30 group-hover:text-[#4682B4] transition-colors">
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Status */}
            <div className="border-2 border-[#4682B4] bg-white p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-[#4682B4] rounded-full animate-pulse" />
                <span className="font-mono text-sm text-[#121212]">CURRENT_STATUS</span>
              </div>
              <p className="text-sm text-[#121212]/70 leading-relaxed">
                Open to exciting opportunities in full-stack development, cloud architecture, and AI/ML projects.
                Available for freelance work, internships, and collaborative ventures.
              </p>
            </div>

            {/* Fun Fact */}
            <div className="border-l-2 border-[#4682B4] pl-6">
              <div className="font-mono text-xs text-[#121212]/50 mb-2">FUN_FACT</div>
              <p className="text-sm text-[#121212]/70 italic">
                "I believe in building systems that don't just work—they evolve. Let's create something remarkable
                together."
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 pt-12 border-t-2 border-[#121212]/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-mono text-sm text-[#121212]/50">
              © 2026 Ragul Arumugam. All rights reserved.
            </div>
            <div className="font-mono text-sm text-[#121212]/50">
              Built with React + Tailwind CSS + Motion
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
