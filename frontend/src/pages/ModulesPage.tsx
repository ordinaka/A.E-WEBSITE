import { useCallback, useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lock, BookOpen, Clock, Loader2, AlertCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { apiFetch } from "../lib/api";

const bgPath = "/background.jpg";

interface PublicModule {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  order: number;
  estimatedMinutes?: number | null;
  resourceCount: number;
  hasPublishedQuiz: boolean;
}

const isObject = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null;

const isPublicModule = (v: unknown): v is PublicModule =>
  isObject(v) &&
  typeof v.id === "string" &&
  typeof v.title === "string" &&
  typeof v.slug === "string" &&
  typeof v.shortDescription === "string" &&
  typeof v.description === "string" &&
  typeof v.order === "number" &&
  typeof v.resourceCount === "number" &&
  typeof v.hasPublishedQuiz === "boolean";

const isPublicModulesResponse = (v: unknown): v is PublicModule[] =>
  Array.isArray(v) && v.every(isPublicModule);

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

export default function ModulesPage() {
  const [modules, setModules] = useState<PublicModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadModules = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiFetch("/public/modules");
      if (!isPublicModulesResponse(response)) {
        throw new Error("Unexpected modules response shape.");
      }
      setModules(response);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to load modules.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadModules();
  }, [loadModules]);

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
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-[var(--ae-plum-deep)] text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight drop-shadow-sm mb-6">
                Learning Modules
              </h1>
              <p className="text-[var(--ae-plum-deep)]/80 text-lg md:text-xl leading-relaxed">
                Explore our comprehensive curriculum designed to take you from beginner to engineering expert.
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Loading */}
          {isLoading && (
            <FadeInWhenVisible>
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Loader2 className="w-10 h-10 text-[var(--ae-periwinkle)] animate-spin" />
                <p className="text-[var(--ae-plum-deep)]/60 text-sm">Loading modules…</p>
              </div>
            </FadeInWhenVisible>
          )}

          {/* Error */}
          {!isLoading && error && (
            <FadeInWhenVisible>
              <div className="flex flex-col items-center gap-4 py-16 text-center">
                <div className="w-14 h-14 rounded-full bg-rose-500/15 border border-rose-500/20 flex items-center justify-center">
                  <AlertCircle className="w-7 h-7 text-rose-400" />
                </div>
                <p className="text-rose-300">{error}</p>
                <button
                  type="button"
                  onClick={() => void loadModules()}
                  className="px-6 py-2.5 bg-rose-500 hover:bg-rose-400 transition-colors rounded-xl font-medium text-white"
                >
                  Try Again
                </button>
              </div>
            </FadeInWhenVisible>
          )}

          {/* Empty */}
          {!isLoading && !error && modules.length === 0 && (
            <FadeInWhenVisible>
              <div className="text-center py-24 bg-white border border-[var(--ae-border)] rounded-2xl shadow-sm">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4 opacity-50" />
                <p className="text-gray-500">No modules published yet. Check back soon.</p>
              </div>
            </FadeInWhenVisible>
          )}

          {/* Module Grid */}
          {!isLoading && !error && modules.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((mod, idx) => (
                <FadeInWhenVisible delay={0.08 * idx} key={mod.id}>
                  <div className="bg-white border border-[var(--ae-border)] rounded-2xl overflow-hidden hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full shadow-sm hover:shadow-lg">

                    {/* Gradient banner */}
                    <div className="relative h-40 w-full overflow-hidden bg-[var(--ae-blue)]/5">
                      {/* Order badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-[var(--ae-border)] py-1 px-3 rounded-full flex items-center gap-1.5 shadow-sm">
                        <span className="text-[var(--ae-plum-deep)] text-xs font-bold">#{String(mod.order).padStart(2, "0")}</span>
                      </div>

                      {mod.hasPublishedQuiz && (
                        <div className="absolute top-4 right-4 bg-[var(--ae-periwinkle)]/10 border border-[var(--ae-periwinkle)]/20 text-[var(--ae-blue)] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                          Quiz
                        </div>
                      )}

                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-xl font-semibold text-[var(--ae-plum-deep)] mb-3 group-hover:text-[var(--ae-blue)] transition-colors line-clamp-2">
                        {mod.title}
                      </h2>
                      <p className="text-[var(--ae-plum-deep)]/70 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                        {mod.shortDescription}
                      </p>

                      {/* Stats row */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
                        {mod.estimatedMinutes && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {mod.estimatedMinutes} min
                          </span>
                        )}
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          {mod.resourceCount} resource{mod.resourceCount !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* CTA */}
                      <div className="mt-auto space-y-3">
                        <Link
                          to="/login"
                          className="relative w-full py-3.5 rounded-2xl flex items-center justify-center gap-2.5 font-bold transition-all duration-300 overflow-hidden group/btn
                            ae-brand-button hover:scale-[1.02] active:scale-[0.98] text-white text-sm"
                        >
                          {/* Shine sweep */}
                          <span className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                          <Lock size={15} className="shrink-0 opacity-80" />
                          <span>Login to Start</span>
                          <ChevronRight size={15} className="ml-auto group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </Link>
                        <p className="text-center text-[11px] text-gray-400 tracking-wide">
                          Free to join · No credit card needed
                        </p>
                      </div>

                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
