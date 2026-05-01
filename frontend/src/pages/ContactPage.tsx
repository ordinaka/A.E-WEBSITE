import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MessageCircle, Mail, MapPin } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const bgPath = "/background.jpg";

const FadeInWhenVisible = ({
  children,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  };

  return (
    <div className="relative overflow-hidden ae-brand-page min-h-screen">
      <div
        className="w-full relative overflow-hidden min-h-screen"
        style={{
          backgroundImage: `url('${bgPath}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-[#F8FAFC]/90 pointer-events-none fixed" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-40 pb-24">
          
          <FadeInWhenVisible>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h1 className="text-[var(--ae-plum-deep)] text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight drop-shadow-sm mb-6">
                Get in Touch
              </h1>
              <p className="text-[var(--ae-plum-deep)]/80 text-lg md:text-xl leading-relaxed">
                Have questions about the cohort or need help with your account? We're here for you.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Information */}
            <div>
              <FadeInWhenVisible delay={0.1}>
                <h2 className="text-3xl font-semibold text-[var(--ae-plum-deep)] mb-8">Reach Out Directly</h2>
                
                <div className="space-y-8 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-[var(--ae-border)] shadow-sm">
                      <Mail className="text-[var(--ae-blue)]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-[var(--ae-plum-deep)] text-lg font-medium mb-1">Email Us</h4>
                      <p className="text-[var(--ae-plum-deep)]/60 mb-2">Our friendly team is here to help.</p>
                      <a href="mailto:hello@algorithmicexplorers.com" className="text-[var(--ae-blue)] hover:text-black transition-colors">hello@algorithmicexplorers.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 border border-[var(--ae-border)] shadow-sm">
                      <MapPin className="text-[var(--ae-blue)]" size={24} />
                    </div>
                    <div>
                      <h4 className="text-[var(--ae-plum-deep)] text-lg font-medium mb-1">Global HQ</h4>
                      <p className="text-[var(--ae-plum-deep)]/60 mb-2">Based in SF, operating globally.</p>
                      <p className="text-[var(--ae-blue)]">123 Innovation Drive, CA 94103</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <div className="bg-linear-to-br from-[#25D366]/20 to-transparent border border-[#25D366]/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 opacity-10 group-hover:scale-110 transition-transform duration-500">
                    <MessageCircle size={150} color="#25D366" />
                  </div>
                  <h3 className="text-2xl font-semibold text-[#000] mb-2 relative z-10">Join the WhatsApp Group</h3>
                  <p className="text-gray-700 mb-6 relative z-10 max-w-sm">Get real-time updates, daily algo challenges, and instant support from the community.</p>
                  <a 
                    href="https://forms.gle/sc9w11jVmH6tucEo8" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] text-black font-bold py-3 px-6 rounded-xl hover:bg-[#1EBE5A] transition-colors relative z-10"
                  >
                    <MessageCircle size={20} />
                    Join Community Now
                  </a>
                </div>

                {/* Socials */}
                <div className="mt-12">
                  <h4 className="text-gray-500 text-sm uppercase tracking-widest font-semibold mb-4">Follow our journey</h4>
                  <div className="flex gap-4">
                    <a href="https://x.com/AlgorithmicExp_?t=zL9moipPK_qgjFI7OrrIrQ&s=09" className="w-10 h-10 bg-white border border-[var(--ae-border)] shadow-sm rounded-full flex items-center justify-center text-gray-500 hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2] transition-colors">
                      <FaTwitter size={18} />
                    </a>
                    <a href="https://www.linkedin.com/company/algorithmic-explorers/" className="w-10 h-10 bg-white border border-[var(--ae-border)] shadow-sm rounded-full flex items-center justify-center text-gray-500 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors">
                      <FaLinkedin size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 bg-white border border-[var(--ae-border)] shadow-sm rounded-full flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition-colors">
                      <FaGithub size={18} />
                    </a>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>

            {/* Contact Form */}
            <div>
              <FadeInWhenVisible delay={0.3}>
                <div className="bg-white border border-[var(--ae-border)] rounded-3xl p-8 sm:p-10 shadow-lg">
                  <h3 className="text-2xl font-semibold text-[var(--ae-plum-deep)] mb-6">Send a Message</h3>
                  
                  {isSubmitted ? (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="text-green-600" size={28} />
                      </div>
                      <h4 className="text-xl text-[var(--ae-plum-deep)] font-semibold mb-2">Message Sent!</h4>
                      <p className="text-green-700/80">We'll get back to you within 24 hours.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2 pl-1">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white border border-[var(--ae-border)] shadow-sm rounded-xl px-5 py-4 text-[var(--ae-plum-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--ae-blue)]/20 focus:border-[var(--ae-blue)] transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2 pl-1">Email Address</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white border border-[var(--ae-border)] shadow-sm rounded-xl px-5 py-4 text-[var(--ae-plum-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--ae-blue)]/20 focus:border-[var(--ae-blue)] transition-all"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2 pl-1">How can we help?</label>
                        <textarea 
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full bg-white border border-[var(--ae-border)] shadow-sm rounded-xl px-5 py-4 text-[var(--ae-plum-deep)] focus:outline-none focus:ring-2 focus:ring-[var(--ae-blue)]/20 focus:border-[var(--ae-blue)] transition-all resize-none"
                          placeholder="Please describe your inquiry..."
                        />
                      </div>

                      <button 
                        type="submit"
                        className="w-full py-4 flex items-center justify-center gap-2 ae-brand-button shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
                      >
                        <Send size={18} />
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </FadeInWhenVisible>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
