import { useState, useEffect, type ChangeEvent, type ReactElement } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { apiFetch } from "../lib/api";
import loginImg from "/login_mage.png";
import { FaGoogle, FaFacebook, FaMicrosoft } from "react-icons/fa";
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

type LoginData = {
  username: string;
  password: string;
};

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
  const { login, isLoggedIn, user } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(() => {
    const err = searchParams.get("error");
    if (err === "google_failed" || err === "oauth_failed") return "Google sign-in failed. Please try again or use email.";
    return null;
  });
  const [data, setData] = useState<LoginData>({ username: "", password: "" });

  useEffect(() => {
    if (isLoggedIn) {
      const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
      navigate(isAdmin ? "/admin" : "/dashboard");
    }
  }, [isLoggedIn, navigate, user?.role]);

  const handleLogin = async (e?: React.FormEvent): Promise<void> => {
    if (e) e.preventDefault();
    setError(null);

    if (data.username.trim() === "" || data.password.trim() === "") {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const result = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: data.username,
          password: data.password,
        }),
      });

      login(result.user, result.accessToken);
      const isAdmin = result?.user?.role === "ADMIN" || result?.user?.role === "SUPER_ADMIN";
      navigate(isAdmin ? "/admin" : "/dashboard");
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Invalid credentials. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof LoginData) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setError(null);
      setData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  return (
    <div className="min-h-screen w-full ae-brand-page flex items-stretch overflow-hidden font-outfit">
      {/* ── Left: Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16 xl:px-24 z-10">
        <div className="w-full max-w-md ae-brand-card rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-[var(--ae-border)] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--ae-blue)]/5 rounded-bl-[4rem] -mr-16 -mt-16 pointer-events-none" />

          {/* Logo / Brand */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl ae-brand-button flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-[var(--text-color)] font-black text-lg tracking-tight uppercase">A.E Platform</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-color)] mt-6 leading-tight italic tracking-tight">
              Welcome back
            </h1>
            <p className="text-[var(--text-color)]/60 mt-2 text-sm italic font-medium">Sign in to continue your learning journey.</p>
          </div>

          {/* ── Social Buttons ── */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a
              href={`${API_BASE}/auth/google`}
              className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl border border-[var(--ae-border)] bg-[var(--bg-color)]/50 hover:bg-[var(--ae-blue)]/10 px-4 py-3.5 transition-all duration-300 shadow-sm group"
            >
              <FaGoogle className="text-[#EA4335]" />
              <span className="text-sm font-bold text-[var(--text-color)]/70 group-hover:text-[var(--text-color)] transition-colors">Google</span>
            </a>
            <button
              type="button"
              onClick={() => setError("Facebook login coming soon! Use Google or email for now.")}
              className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl border border-[var(--ae-border)] bg-[var(--bg-color)]/50 hover:bg-[var(--ae-blue)]/10 px-4 py-3.5 transition-all duration-300 shadow-sm group"
            >
              <FaFacebook className="text-[#0866FF]" />
              <span className="text-sm font-bold text-[var(--text-color)]/70 group-hover:text-[var(--text-color)] transition-colors">Facebook</span>
            </button>
            <button
              type="button"
              onClick={() => setError("Microsoft login coming soon! Use Google or email for now.")}
              className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl border border-[var(--ae-border)] bg-[var(--bg-color)]/50 hover:bg-[var(--ae-blue)]/10 px-4 py-3.5 transition-all duration-300 shadow-sm group"
            >
              <FaMicrosoft className="text-[#00A4EF]" />
              <span className="text-sm font-bold text-[var(--text-color)]/70 group-hover:text-[var(--text-color)] transition-colors">Microsoft</span>
            </button>
          </div>

          {/* ── Divider ── */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-[var(--ae-border)]" />
            <span className="text-xs font-bold text-[var(--text-color)]/30 uppercase tracking-widest whitespace-nowrap italic">or sign in with email</span>
            <div className="flex-1 h-px bg-[var(--ae-border)]" />
          </div>

          {/* ── Error Alert ── */}
          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 mb-6">
              <FiAlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-500 font-medium">{error}</p>
            </div>
          )}

          {/* ── Form ── */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-xs font-bold text-[var(--text-color)]/60 uppercase tracking-wider italic">
                Email or Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your email or username"
                value={data.username}
                onChange={handleInputChange("username")}
                className="w-full rounded-2xl bg-[var(--bg-color)]/50 border border-[var(--ae-border)] focus:border-[var(--ae-blue)] focus:ring-4 focus:ring-[rgba(51,65,143,0.1)] outline-none px-4 py-4 text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 transition-all font-medium text-sm shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold text-[var(--text-color)]/60 uppercase tracking-wider italic">
                  Password
                </label>
                <Link to="/forgot-password" size="sm" className="text-xs text-[var(--ae-blue)] hover:text-[var(--ae-plum-deep)] transition-colors font-bold italic">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={handleInputChange("password")}
                  className="w-full rounded-2xl bg-[var(--bg-color)]/50 border border-[var(--ae-border)] focus:border-[var(--ae-blue)] focus:ring-4 focus:ring-[rgba(51,65,143,0.1)] outline-none px-4 py-4 pr-12 text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 transition-all font-medium text-sm shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-color)]/30 hover:text-[var(--ae-blue)] transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl ae-brand-button font-bold py-4 mt-2 transition-all duration-300 hover:shadow-2xl active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base text-white hover:-translate-y-1"
            >
              {loading ? (
                <>
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                "Sign In →"
              )}
            </button>
          </form>

          {/* ── Footer ── */}
          <p className="mt-8 text-center text-sm text-[var(--text-color)]/60 font-medium italic">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-[var(--ae-blue)] hover:text-[var(--ae-plum-deep)] font-black transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: Image Panel ── */}
      <div className="hidden lg:block relative w-[45%] xl:w-[50%] shrink-0">
        <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-[var(--bg-color)] via-[var(--bg-color)]/40 to-transparent z-10 pointer-events-none" />

        <img
          src={loginImg}
          alt="Learning platform illustration"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
        />

        {/* Floating badge */}
        <div className="absolute bottom-12 left-12 z-20 max-w-sm">
          <div className="ae-brand-card backdrop-blur-md rounded-[2rem] p-7 shadow-2xl border border-[var(--ae-border)] hover:scale-[1.02] transition-transform">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex -space-x-3">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-[var(--ae-border)] flex items-center justify-center text-xs font-bold text-white shadow-sm overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i+10}`} alt="avatar" />
                  </div>
                ))}
              </div>
              <span className="text-xs text-[var(--text-color)]/60 font-black uppercase tracking-widest">2,400+ Joiners</span>
            </div>
            <p className="text-[var(--text-color)] font-bold text-lg leading-tight italic mb-2">
              "The most structured & modern AI learning path."
            </p>
            <p className="text-[var(--ae-blue)] font-black text-xs uppercase tracking-tighter">— Top Rated Engineering Community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
