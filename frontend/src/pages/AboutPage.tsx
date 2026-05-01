import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { apiFetch } from "../lib/api";
import { FaLinkedin, FaTwitter, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Users, X } from "lucide-react";

interface TeamMember {
  id: string;
  fullName: string;
  roleTitle: string;
  bio: string;
  imageUrl: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  whatsappUrl?: string | null;
  emailAddress?: string | null;
}

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

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedMember]);

  useEffect(() => {
    async function getTeam() {
      try {
        const data = await apiFetch("/public/team");
        setTeamMembers(data);
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    }
    getTeam();
  }, []);

  return (
    <div className="relative overflow-hidden ae-brand-page min-h-screen font-outfit">
      <div
        className="w-full relative overflow-hidden"
        style={{
          backgroundImage: `url('${bgPath}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Soft overlay for depth */}
        <div className="absolute inset-0 bg-white/80 pointer-events-none fixed" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-40 pb-24">
          
          {/* Header Section */}
          <FadeInWhenVisible>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h1 className="text-[var(--ae-plum-deep)] text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight drop-shadow-sm mb-6 italic">
                About AE
              </h1>
              <p className="text-[var(--ae-plum-deep)]/80 text-lg md:text-xl leading-relaxed">
                Empowering the next generation of algorithmic thinkers and builders.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            <FadeInWhenVisible delay={0.1}>
              <div className="bg-white border border-[var(--ae-border)] rounded-2xl p-8 lg:p-12 h-full shadow-sm">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-[var(--ae-blue)] to-[var(--ae-plum)] flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--ae-plum-deep)] mb-4 italic">Our Mission</h2>
                <p className="text-[var(--ae-plum-deep)]/80 leading-relaxed text-lg">
                  To provide the right mentorship, training, and collaborative environment that helps aspiring AI enthusiasts move from curiosity to contribution.
                </p>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.2}>
              <div className="bg-white border border-[var(--ae-border)] rounded-2xl p-8 lg:p-12 h-full shadow-sm">
                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-[#FF28B5] to-[var(--ae-blue)] flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--ae-plum-deep)] mb-4 italic">Our Vision</h2>
                <p className="text-[var(--ae-plum-deep)]/80 leading-relaxed text-lg">
                  To raise a global generation of AI experts and innovators who will transform industries, lead meaningful research, and build products that make the world smarter, safer, and more connected.
                </p>
              </div>
            </FadeInWhenVisible>
          </div>

          {/* Team Section */}
          <FadeInWhenVisible delay={0.3}>
            <div className="text-center mb-16 px-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--ae-blue)]/10 border border-[var(--ae-blue)]/30 mb-4">
                <Users className="w-4 h-4 text-purple-700" />
                <span className="text-xs font-bold text-purple-700 uppercase tracking-widest">Our Team</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[var(--ae-plum-deep)] mb-6 italic tracking-tight">
                Meet the <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Innovators</span>
              </h2>
              <p className="text-[var(--ae-plum-deep)]/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                The passionate individuals working tirelessly behind the scenes to democratize technology education worldwide.
              </p>
            </div>
          </FadeInWhenVisible>
  
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
               <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4 shadow-sm"></div>
               <p className="text-purple-700/70 font-medium animate-pulse">Loading core team...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center text-gray-500 py-32 bg-white border border-[var(--ae-border)] rounded-3xl shadow-sm mx-4">
               <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
               <p className="italic text-lg font-light tracking-wide">No team members listed yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
              {teamMembers.map((member, idx) => (
                <FadeInWhenVisible delay={0.4 + idx * 0.1} key={member.id}>
                  <div 
                    onClick={() => setSelectedMember(member)}
                    className="group relative bg-white border border-[var(--ae-border)] rounded-[2rem] overflow-hidden hover:bg-gray-50 transition-all duration-500 shadow-sm hover:shadow-xl cursor-pointer"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square md:aspect-[4/5] overflow-hidden border-b border-[var(--ae-border)]">
                      {member.imageUrl ? (
                        <img 
                          src={member.imageUrl} 
                          alt={member.fullName} 
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-purple-100 via-blue-100 to-white flex items-center justify-center">
                           <span className="text-5xl font-black text-gray-300 select-none">{member.fullName.charAt(0)}</span>
                        </div>
                      )}
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/90 via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 translate-y-4 group-hover:translate-y-0 transition-transform z-10">
                          <span className="px-5 py-2.5 bg-white shadow-sm rounded-full text-[var(--ae-plum-deep)] text-sm font-semibold tracking-wide border border-[var(--ae-border)] hover:bg-gray-50 transition-colors">
                            View Profile
                          </span>
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-6 md:p-8 relative text-center">
                      <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 font-outfit">
                        {member.roleTitle}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--ae-plum-deep)] leading-none italic flex justify-center items-center gap-2">
                        {member.fullName}
                      </h3>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          )}

        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white border border-[var(--ae-border)] rounded-[2rem] shadow-2xl flex flex-col md:flex-row z-10"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-400 hover:text-black transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-2/5 aspect-square md:aspect-auto md:h-full bg-black relative shrink-0">
                {selectedMember.imageUrl ? (
                  <img 
                    src={selectedMember.imageUrl} 
                    alt={selectedMember.fullName} 
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-purple-100 via-blue-100 to-white flex items-center justify-center">
                     <span className="text-8xl font-black text-gray-200 select-none">{selectedMember.fullName.charAt(0)}</span>
                  </div>
                )}
                <div className="absolute inset-0 border-r border-white/5 pointer-events-none hidden md:block" />
              </div>

              {/* Modal Content */}
              <div className="w-full md:w-3/5 p-8 md:p-10 lg:p-12 flex flex-col overflow-y-auto">
                <p className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em] mb-2 font-outfit">
                  {selectedMember.roleTitle}
                </p>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--ae-plum-deep)] leading-none italic mb-8 flex items-center gap-3">
                  {selectedMember.fullName}
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shadow-sm" />
                </h3>
                
                <div className="prose max-w-none mb-10 overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                  <p className="text-[var(--ae-plum-deep)]/80 text-base md:text-lg leading-relaxed font-light whitespace-pre-wrap">
                    {selectedMember.bio}
                  </p>
                </div>

                <div className="mt-auto pt-6 border-t border-[var(--ae-border)] flex items-center gap-4">
                  <span className="text-xs text-gray-400 uppercase font-medium tracking-widest mr-2">Connect</span>
                  {selectedMember.linkedinUrl && (
                    <a 
                      href={selectedMember.linkedinUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-3.5 bg-gray-100 border border-[var(--ae-border)] rounded-xl hover:bg-[#0077b5] hover:border-[#0077b5] hover:scale-105 hover:text-white transition-all shadow-sm flex items-center justify-center text-gray-500"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  )}
                  {selectedMember.twitterUrl && (
                    <a 
                      href={selectedMember.twitterUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-3.5 bg-gray-100 border border-[var(--ae-border)] rounded-xl hover:bg-black hover:border-black hover:scale-105 hover:text-white transition-all shadow-sm flex items-center justify-center text-gray-500"
                    >
                      <FaTwitter className="w-5 h-5" />
                    </a>
                  )}
                  {selectedMember.whatsappUrl && (
                    <a 
                      href={selectedMember.whatsappUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-3.5 bg-gray-100 border border-[var(--ae-border)] rounded-xl hover:bg-[#25D366] hover:border-[#25D366] hover:scale-105 hover:text-white transition-all shadow-sm flex items-center justify-center text-gray-500"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                    </a>
                  )}
                  {selectedMember.emailAddress && (
                    <a 
                      href={selectedMember.emailAddress.startsWith('mailto:') ? selectedMember.emailAddress : `mailto:${selectedMember.emailAddress}`} 
                      className="p-3.5 bg-gray-100 border border-[var(--ae-border)] rounded-xl hover:bg-rose-500 hover:border-rose-500 hover:scale-105 hover:text-white transition-all shadow-sm flex items-center justify-center text-gray-500"
                    >
                      <FaEnvelope className="w-5 h-5" />
                    </a>
                  )}
                  {!selectedMember.linkedinUrl && !selectedMember.twitterUrl && !selectedMember.whatsappUrl && !selectedMember.emailAddress && (
                    <span className="text-gray-400 text-sm italic">No active links</span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
