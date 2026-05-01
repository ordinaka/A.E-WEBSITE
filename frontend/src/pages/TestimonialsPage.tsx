import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { Star, MessageSquareQuote, Send, Loader2, AlertCircle, User } from "lucide-react";
import { apiFetch } from "../lib/api";

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

interface PublicTestimonial {
  id: string;
  name: string;
  title?: string | null;
  company?: string | null;
  content: string;
  rating?: number | null;
}

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const isPublicTestimonial = (v: unknown): v is PublicTestimonial =>
  isObject(v) &&
  typeof v.id === "string" &&
  typeof v.name === "string" &&
  typeof v.content === "string";

const isTestimonialsResponse = (v: unknown): v is PublicTestimonial[] =>
  Array.isArray(v) && v.every(isPublicTestimonial);

const getErrorMessage = (err: unknown, fallback: string): string => {
  if (isObject(err) && typeof err.message === "string") return err.message;
  return fallback;
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<PublicTestimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: "", role: "", content: "", rating: 5 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const loadTestimonials = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await apiFetch("/public/testimonials");
      if (!isTestimonialsResponse(response)) {
        throw new Error("Unexpected testimonials response shape.");
      }
      setTestimonials(response);
    } catch (err: unknown) {
      setFetchError(getErrorMessage(err, "Failed to load testimonials."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { void loadTestimonials(); }, [loadTestimonials]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!formData.name.trim() || !formData.content.trim()) {
      setSubmitError("Name and review are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiFetch("/public/testimonials", {
        method: "POST",
        body: JSON.stringify({
          name: formData.name.trim(),
          title: formData.role.trim() || undefined,
          content: formData.content.trim(),
          rating: formData.rating,
        }),
      });
      setIsSubmitted(true);
      setFormData({ name: "", role: "", content: "", rating: 5 });
      setTimeout(() => setIsSubmitted(false), 4000);
    } catch (err: unknown) {
      setSubmitError(getErrorMessage(err, "Failed to submit review. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden ae-brand-page min-h-screen">
      <div className="w-full relative overflow-hidden min-h-screen bg-slate-50">
        {/* Subtle decorative background Elements */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[var(--ae-blue)]/5 to-transparent pointer-events-none" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-40 pb-24">

          <FadeInWhenVisible>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h1 className="text-[var(--ae-plum-deep)] text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight drop-shadow-sm mb-6">
                Community Voices
              </h1>
              <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
                Read what thousands of engineers are saying about their journey with Algorithmic Explorers.
              </p>
            </div>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Reviews Grid (Left) */}
            <div className="lg:col-span-2">
              {isLoading && (
                <div className="flex flex-col items-center justify-center py-24 gap-4">
                  <Loader2 className="w-9 h-9 text-[var(--ae-blue)] animate-spin" />
                  <p className="text-slate-500 text-sm">Loading reviews…</p>
                </div>
              )}

              {!isLoading && fetchError && (
                <div className="flex flex-col items-center gap-4 py-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-rose-500/15 border border-rose-500/20 flex items-center justify-center">
                    <AlertCircle className="w-7 h-7 text-rose-400" />
                  </div>
                  <p className="text-rose-300">{fetchError}</p>
                  <button type="button" onClick={() => void loadTestimonials()} className="px-6 py-2.5 bg-rose-500 hover:bg-rose-400 rounded-xl font-medium text-white transition-colors">
                    Try Again
                  </button>
                </div>
              )}

              {!isLoading && !fetchError && testimonials.length === 0 && (
                <div className="text-center py-24">
                  <MessageSquareQuote className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No reviews yet. Be the first to share your experience!</p>
                </div>
              )}

              {!isLoading && !fetchError && testimonials.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map((t, idx) => (
                    <FadeInWhenVisible delay={0.08 * idx} key={t.id}>
                      <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col group">
                        <MessageSquareQuote size={28} className="text-[var(--ae-blue)]/60 mb-4" />

                        <p className="text-slate-700 text-base leading-relaxed flex-grow italic mb-6">
                          "{t.content}"
                        </p>

                        <div className="flex items-center gap-3 mt-auto">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--ae-blue)] to-[var(--ae-plum)] flex items-center justify-center shrink-0 shadow-inner">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[var(--ae-plum-deep)] font-bold text-sm truncate">{t.name}</h4>
                            {(t.title || t.company) && (
                              <p className="text-slate-500 text-xs truncate font-medium">
                                {[t.title, t.company].filter(Boolean).join(" · ")}
                              </p>
                            )}
                          </div>
                        </div>

                        {t.rating != null && (
                          <div className="flex gap-1 mt-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={13}
                                className={i < (t.rating ?? 0) ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </FadeInWhenVisible>
                  ))}
                </div>
              )}
            </div>

            {/* Submission Form (Right) */}
            <div className="lg:col-span-1">
              <FadeInWhenVisible delay={0.4}>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 sticky top-32 shadow-sm">
                  <h3 className="text-2xl font-bold text-[var(--ae-plum-deep)] mb-1">Share Your Story</h3>
                  <p className="text-slate-500 text-sm mb-7">Your feedback gets reviewed and might be featured on our wall of love.</p>

                  {isSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Send className="text-emerald-500" size={20} />
                      </div>
                      <h4 className="text-emerald-900 font-bold mb-2">Submitted! 🎉</h4>
                      <p className="text-emerald-700/80 text-sm">Thank you — it'll be reviewed and published if approved.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {submitError && (
                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                          <p className="text-red-700 text-sm font-medium">{submitError}</p>
                        </div>
                      )}

                      <div>
                        <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => { setSubmitError(null); setFormData({ ...formData, name: e.target.value }); }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[var(--ae-blue)] focus:ring-4 focus:ring-[rgba(51,65,143,0.1)] transition-all placeholder:text-slate-400 text-sm font-medium shadow-sm"
                          placeholder="Jane Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">Role & Company</label>
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[var(--ae-blue)] focus:ring-4 focus:ring-[rgba(51,65,143,0.1)] transition-all placeholder:text-slate-400 text-sm font-medium shadow-sm"
                          placeholder="Software Engineer at ACME"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">Your Review *</label>
                        <textarea
                          required
                          rows={4}
                          value={formData.content}
                          onChange={(e) => { setSubmitError(null); setFormData({ ...formData, content: e.target.value }); }}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-[var(--ae-blue)] focus:ring-4 focus:ring-[rgba(51,65,143,0.1)] transition-all resize-none placeholder:text-slate-400 text-sm font-medium shadow-sm"
                          placeholder="How did AE help you?"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">Rating</label>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFormData({ ...formData, rating: star })}
                              className="focus:outline-none hover:scale-110 transition-transform"
                            >
                              <Star size={22} className={star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-4 rounded-xl flex items-center justify-center gap-2 bg-[var(--ae-plum-deep)] text-white font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            <Send size={16} />
                            Submit Review
                          </>
                        )}
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
