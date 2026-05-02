import { useState, type ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../lib/api";
import loginImg from "/login_mage.png";
import { FaGoogle, FaFacebook, FaMicrosoft } from "react-icons/fa";
import { FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  return fallback;
};

const Login = (): ReactElement => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      console.log("Login successful:", response);
      navigate("/home");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Invalid email or password. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-stretch overflow-hidden ae-brand-page font-outfit">
      {/* ── Left: Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16 xl:px-24 z-10">
        <div className="w-full max-w-lg ae-brand-card shadow-2xl border border-transparent rounded-[2.5rem] p-6 sm:p-10 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--ae-blue)]/5 rounded-bl-[4rem] -mr-16 -mt-16 pointer-events-none" />

          {/* Brand */}
          <div className="mb-12 text-center sm:text-left">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl ae-brand-button flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-[var(--text-color)] font-black text-lg tracking-tight uppercase">A.E Platform</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-[var(--text-color)] mt-6 leading-tight italic tracking-tighter uppercase underline decoration-[var(--ae-blue)]/20 underline-offset-8">
              Welcome <span className="text-[var(--ae-blue)]">Back</span>
            </h1>
          </div>

          {/* ── Social Login ── */}
          <div className="grid grid-cols-3 gap-3 mb-10">
            <a
              href={`${API_BASE}/auth/google`}
              className="flex items-center justify-center gap-3 rounded-2xl bg-[var(--bg-color)]/40 hover:bg-[var(--bg-color)] shadow-sm px-4 py-4 transition-all group lg:hover:-translate-y-1 active:scale-95"
            >
              <FaGoogle className="text-[#EA4335] text-lg" />
              <span className="text-xs font-black text-[var(--text-color)]/40 group-hover:text-[var(--text-color)] transition-colors uppercase tracking-widest">Google</span>
            </a>
            <button
              onClick={() => setError("Facebook login coming soon!")}
              className="flex items-center justify-center gap-3 rounded-2xl bg-[var(--bg-color)]/40 hover:bg-[var(--bg-color)] shadow-sm px-4 py-4 transition-all group lg:hover:-translate-y-1 active:scale-95"
            >
              <FaFacebook className="text-[#0866FF] text-lg" />
              <span className="text-xs font-black text-[var(--text-color)]/40 group-hover:text-[var(--text-color)] transition-colors uppercase tracking-widest">Facebook</span>
            </button>
            <button
              onClick={() => setError("Microsoft login coming soon!")}
              className="flex items-center justify-center gap-3 rounded-2xl bg-[var(--bg-color)]/40 hover:bg-[var(--bg-color)] shadow-sm px-4 py-4 transition-all group lg:hover:-translate-y-1 active:scale-95"
            >
              <FaMicrosoft className="text-[#00A4EF] text-lg" />
              <span className="text-xs font-black text-[var(--text-color)]/40 group-hover:text-[var(--text-color)] transition-colors uppercase tracking-widest">Microsoft</span>
            </button>
          </div>

          <div className="flex items-center gap-6 mb-10">
            <div className="flex-1 h-px bg-[var(--ae-border)]" />
            <span className="text-[10px] font-black text-[var(--text-color)]/20 uppercase tracking-[0.3em]">Credentials</span>
            <div className="flex-1 h-px bg-[var(--ae-border)]" />
          </div>

          {/* ── Error Alert ── */}
          {error && (
            <div className="flex items-center gap-4 bg-red-500/5 border-l-4 border-red-500 rounded-xl px-5 py-4 mb-8 animate-shake">
              <FiAlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm font-bold text-red-500 italic uppercase tracking-tight">{error}</p>
            </div>
          )}

          {/* ── Login Form ── */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-[10px] font-black text-[var(--text-color)]/40 uppercase tracking-[0.15em] ml-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl bg-[var(--bg-color)]/50 border-0 focus:bg-[var(--bg-color)] focus:ring-4 focus:ring-[var(--ae-blue)]/5 outline-none px-6 py-4.5 text-[var(--text-color)] placeholder:text-[var(--text-color)]/10 transition-all font-semibold text-[15px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <label htmlFor="password" className="block text-[10px] font-black text-[var(--text-color)]/40 uppercase tracking-[0.15em]">
                  Password
                </label>
                <Link to="/forgot-password" className="text-[10px] text-[var(--ae-blue)] hover:text-[var(--ae-plum-deep)] transition-colors font-black uppercase tracking-wider italic">
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl bg-[var(--bg-color)]/50 border-0 focus:bg-[var(--bg-color)] focus:ring-4 focus:ring-[var(--ae-blue)]/5 outline-none px-6 py-4.5 text-[var(--text-color)] placeholder:text-[var(--text-color)]/10 transition-all font-semibold text-[15px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] pr-14 group-hover:bg-[var(--bg-color)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-color)]/20 hover:text-[var(--ae-blue)] transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl ae-brand-button text-white shadow-xl hover:shadow-2xl font-black py-5 mt-6 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:-translate-y-1 active:translate-y-0 uppercase tracking-[0.2em] italic"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying...
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-12 text-center text-xs font-black text-[var(--text-color)]/30 uppercase tracking-widest italic">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[var(--ae-blue)] hover:text-[var(--ae-plum-deep)] transition-colors underline decoration-[var(--ae-blue)]/20 underline-offset-4 ml-1">
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: Image Panel ── */}
      <div className="hidden lg:block relative w-[40%] xl:w-[45%] shrink-0">
        <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-[var(--bg-color)] via-[var(--bg-color)]/30 to-transparent z-10 pointer-events-none" />

        <img
          src={loginImg}
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
        />

        <div className="absolute inset-0 bg-[var(--ae-blue)]/10 z-[5]" />

        <div className="absolute bottom-16 right-12 z-20 max-w-sm">
          <div className="ae-brand-card backdrop-blur-md rounded-[2.5rem] border border-transparent p-8 shadow-2xl hover:scale-105 transition-transform duration-700">
            <h3 className="text-3xl font-black text-[var(--text-color)] italic mb-4 uppercase tracking-tighter">Accelerated <span className="text-[var(--ae-blue)]">Engineers</span></h3>
            <p className="text-[var(--text-color)]/60 text-sm leading-relaxed font-medium italic">
              "The best way to predict the future is to build it ourselves. Join the next generation of algorithmic thinkers."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
