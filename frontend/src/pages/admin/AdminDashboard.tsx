import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../lib/api";
import { motion } from "framer-motion";
import { 
  Users, 
  BookOpen, 
  FileText, 
  ShoppingBag, 
  MessageSquare, 
  ShieldCheck, 
  ChevronRight,
  Loader2,
  AlertCircle,
  LayoutDashboard
} from "lucide-react";

interface AdminSummary {
  users: number;
  modules: number;
  quizzes: number;
  products: number;
  testimonials: number;
  teamMembers: number;
  pendingTestimonials: number;
  activeUsers: number;
  publishedModules: number;
}

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Failed to load admin overview.";
};

const asArray = (value: unknown): unknown[] => (Array.isArray(value) ? value : []);

// Animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
} as const;

export default function AdminDashboard() {
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [usersRes, modulesRes, quizzesRes, productsRes, testimonialsRes, teamRes] =
        await Promise.all([
          apiFetch("/admin/users"),
          apiFetch("/admin/modules"),
          apiFetch("/admin/quizzes"),
          apiFetch("/admin/products"),
          apiFetch("/admin/testimonials"),
          apiFetch("/admin/team")
        ]);

      const users = asArray(usersRes);
      const modules = asArray(modulesRes);
      const quizzes = asArray(quizzesRes);
      const products = asArray(productsRes);
      const testimonials = asArray(testimonialsRes);
      const teamMembers = asArray(teamRes);

      const activeUsers = users.filter(
        (item) => isObject(item) && item.status === "ACTIVE"
      ).length;

      const pendingTestimonials = testimonials.filter(
        (item) => isObject(item) && item.status === "PENDING"
      ).length;

      const publishedModules = modules.filter(
        (item) => isObject(item) && item.isPublished === true
      ).length;

      setSummary({
        users: users.length,
        modules: modules.length,
        quizzes: quizzes.length,
        products: products.length,
        testimonials: testimonials.length,
        teamMembers: teamMembers.length,
        pendingTestimonials,
        activeUsers,
        publishedModules
      });
    } catch (fetchError: unknown) {
      setError(getErrorMessage(fetchError));
      setSummary(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSummary();
  }, [loadSummary]);

  const cards = useMemo(() => {
    if (!summary) return [];
    return [
      { 
        label: "Total Users", 
        value: summary.users, 
        sub: `${summary.activeUsers} active accounts`,
        icon: Users,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "group-hover:border-blue-500/30"
      },
      {
        label: "Modules",
        value: summary.modules,
        sub: `${summary.publishedModules} published`,
        icon: BookOpen,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        border: "group-hover:border-indigo-500/30"
      },
      { 
        label: "Assessments", 
        value: summary.quizzes, 
        sub: "Total quizzes created",
        icon: FileText,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "group-hover:border-purple-500/30"
      },
      { 
        label: "Products", 
        value: summary.products, 
        sub: "Digital catalog entries",
        icon: ShoppingBag,
        color: "text-fuchsia-400",
        bg: "bg-fuchsia-500/10",
        border: "group-hover:border-fuchsia-500/30"
      },
      {
        label: "Testimonials",
        value: summary.testimonials,
        sub: `${summary.pendingTestimonials} pending review`,
        icon: MessageSquare,
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        border: "group-hover:border-rose-500/30"
      },
      { 
        label: "Team Members", 
        value: summary.teamMembers, 
        sub: "Public profiles active",
        icon: ShieldCheck,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "group-hover:border-emerald-500/30"
      }
    ];
  }, [summary]);

  const quickActions = [
    { label: "Manage Modules", path: "/admin/modules", icon: BookOpen },
    { label: "Manage Quizzes", path: "/admin/quizzes", icon: FileText },
    { label: "Manage Products", path: "/admin/products", icon: ShoppingBag },
    { label: "Manage Testimonials", path: "/admin/testimonials", icon: MessageSquare },
    { label: "Manage Team", path: "/admin/team", icon: ShieldCheck },
    { label: "View Users", path: "/admin/users", icon: Users },
  ];

  return (
    <div className="pt-24 px-6 min-h-screen bg-slate-50 text-slate-900 pb-20 overflow-hidden relative">
      {/* Background decorations for Admin Theme */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        className="max-w-7xl mx-auto relative z-10 pb-20 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section variants={itemVariants} className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-50 rounded-xl shadow-sm border border-blue-100">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-[var(--ae-plum-deep)]">
              Command Center
            </h1>
            <p className="text-slate-500 font-bold text-sm md:text-base mt-2">
              System overview and quick access to management tools.
            </p>
          </div>
        </motion.section>

        {isLoading ? (
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center p-12 bg-white border border-slate-200 rounded-3xl shadow-sm">
            <Loader2 className="w-10 h-10 text-[var(--ae-blue)] animate-spin mb-4" />
            <p className="text-slate-600 font-bold">Loading system overview...</p>
          </motion.div>
        ) : null}

        {!isLoading && error ? (
          <motion.div variants={itemVariants} className="bg-red-50 border border-red-200 rounded-3xl p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-900 mb-1">Failed to connect</h3>
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => void loadSummary()}
              className="px-6 py-2.5 bg-red-500 hover:bg-red-600 transition-colors rounded-xl font-bold text-white shadow-sm"
            >
              Retry
            </button>
          </motion.div>
        ) : null}

        {!isLoading && !error && summary ? (
          <>
            <motion.section variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card) => {
                const Icon = card.icon;
                return (
                  <motion.article
                    key={card.label}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className={`bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl transition-colors ${card.bg}`}>
                        <Icon className={`w-6 h-6 ${card.color}`} />
                      </div>
                    </div>
                    <p className="text-xs font-bold text-slate-400 mb-1 tracking-wider uppercase">{card.label}</p>
                    <p className="text-4xl font-black text-[var(--ae-plum-deep)] mb-2">{card.value}</p>
                    <p className="text-sm font-bold text-slate-500">{card.sub}</p>
                  </motion.article>
                );
              })}
            </motion.section>

            <motion.section variants={itemVariants} className="bg-white border border-slate-200 rounded-3xl p-8 mt-8 shadow-sm">
              <h2 className="text-2xl font-black text-[var(--ae-plum-deep)] mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link 
                      key={action.path}
                      to={action.path} 
                      className="group relative overflow-hidden rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 p-5 transition-all duration-300 hover:bg-slate-100 flex items-center justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="p-2.5 bg-white border border-slate-200 rounded-lg group-hover:bg-[var(--ae-blue)]/10 group-hover:border-[var(--ae-blue)]/20 transition-colors">
                           <Icon className="w-5 h-5 text-slate-500 group-hover:text-[var(--ae-blue)] transition-colors" />
                        </div>
                        <span className="font-bold text-slate-700 group-hover:text-[var(--ae-plum-deep)] transition-colors">
                          {action.label}
                        </span>
                      </div>
                      
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[var(--ae-blue)] transition-colors group-hover:translate-x-1 duration-300 relative z-10" />
                    </Link>
                  );
                })}
              </div>
            </motion.section>
          </>
        ) : null}
      </motion.div>
    </div>
  );
}
