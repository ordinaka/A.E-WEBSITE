import { useState, type ChangeEvent, type ReactElement } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiFetch } from "../lib/api";
import { FaGoogle, FaFacebook, FaMicrosoft } from "react-icons/fa";
import { FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import classImg from "/class.png";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000/api";

type SignupData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
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

const InputField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  extra,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  extra?: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label htmlFor={id} className="block text-xs font-bold text-[var(--text-color)]/60 uppercase tracking-wider italic">
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={id}
        className="w-full rounded-2xl bg-[var(--bg-color)]/50 border border-[var(--ae-border)] focus:border-[var(--ae-blue)] focus:ring-4 focus:ring-[rgba(51,65,143,0.1)] outline-none px-4 py-3.5 text-[var(--text-color)] placeholder:text-[var(--text-color)]/30 transition-all font-medium text-sm shadow-sm pr-12"
      />
      {extra}
    </div>
  </div>
);

const Signup = (): ReactElement => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [data, setData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange =
    (field: keyof SignupData) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      setError(null);
      setData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const createAccount = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (
      !data.firstName.trim() ||
      !data.lastName.trim() ||
      !data.username.trim() ||
      !data.email.trim() ||
      !data.password.trim() ||
      !data.confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!data.email.includes("@") || !data.email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (data.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: unknown) {
      setError(getErrorMessage(err, "Failed to create account. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const ToggleBtn = ({
    show,
    onToggle,
  }: {
    show: boolean;
    onToggle: () => void;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-color)]/30 hover:text-[var(--ae-blue)] transition-colors"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
    </button>
  );

  return (
    <div className="min-h-screen w-full flex items-stretch overflow-hidden ae-brand-page font-outfit">
      {/* ── Left: Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16 xl:px-24 z-10">
        <div className="w-full max-w-xl ae-brand-card shadow-2xl border border-[var(--ae-border)] rounded-[2.5rem] p-6 sm:p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--ae-blue)]/5 rounded-bl-[4rem] -mr-16 -mt-16 pointer-events-none" />

          {/* Brand */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl ae-brand-button flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-[var(--text-color)] font-black text-lg tracking-tight uppercase">A.E Platform</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--text-color)] mt-6 leading-tight italic tracking-tight">
              Create your account ✨
            </h1>
            <p className="text-[var(--text-color)]/60 font-medium mt-2 text-sm italic">Join thousands of learners today. It's free.</p>
          </div>

          {/* ── Success State ── */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-4">
                <FiCheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-color)] mb-2">Account Created! 🎉</h2>
              <p className="text-[var(--text-color)]/60 text-sm mb-1 font-light">Please check your email to verify your account.</p>
              <p className="text-[var(--text-color)]/40 text-xs animate-pulse font-medium">Redirecting to login…</p>
            </div>
          ) : (
            <>
              {/* ── Social Buttons ── */}
              <div className="flex flex-col sm:flex-row gap-3 mb-7">
                {/* Google — real OAuth */}
                <a
                  href={`${API_BASE}/auth/google`}
                  className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl border border-[var(--ae-border)] bg-[var(--bg-color)]/50 hover:bg-[var(--ae-blue)]/10 shadow-sm px-4 py-3 transition-all group"
                >
                  <FaGoogle className="text-[#EA4335]" />
                  <span className="text-sm font-bold text-[var(--text-color)]/80 transition-colors">Google</span>
                </a>
                {/* Facebook — coming soon */}
                <button
                  type="button"
                  onClick={() => setError("Facebook login coming soon! Use Google or email for now.")}
                  className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl border border-[var(--ae-border)] bg-[var(--bg-color)]/50 hover:bg-[var(--ae-blue)]/10 shadow-sm px-4 py-3 transition-all group"
                >
                  <FaFacebook className="text-[#0866FF]" />
                  <span className="text-sm font-bold text-[var(--text-color)]/80 transition-colors">Facebook</span>
                </button>
                {/* Microsoft — coming soon */}
                <button
                  type="button"
                  onClick={() => setError("Microsoft login coming soon! Use Google or email for now.")}
                  className="flex-1 flex items-center justify-center gap-2.5 rounded-2xl border border-[var(--ae-border)] bg-[var(--bg-color)]/50 hover:bg-[var(--ae-blue)]/10 shadow-sm px-4 py-3 transition-all group"
                >
                  <FaMicrosoft className="text-[#00A4EF]" />
                  <span className="text-sm font-bold text-[var(--text-color)]/80 transition-colors">Microsoft</span>
                </button>
              </div>

              {/* ── Divider ── */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-[var(--ae-border)]" />
                <span className="text-xs font-bold text-[var(--text-color)]/30 uppercase tracking-widest whitespace-nowrap italic">or register with email</span>
                <div className="flex-1 h-px bg-[var(--ae-border)]" />
              </div>

              {/* ── Error Alert ── */}
              {error && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 mb-5">
                  <FiAlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <p className="text-sm font-medium text-red-500">{error}</p>
                </div>
              )}

              {/* ── Form ── */}
              <form onSubmit={createAccount} className="space-y-4">
                {/* First + Last Name */}
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    id="firstName"
                    label="First Name"
                    type="text"
                    placeholder="Enter first name"
                    value={data.firstName}
                    onChange={handleInputChange("firstName")}
                  />
                  <InputField
                    id="lastName"
                    label="Last Name"
                    type="text"
                    placeholder="Enter last name"
                    value={data.lastName}
                    onChange={handleInputChange("lastName")}
                  />
                </div>

                {/* Username */}
                <InputField
                  id="username"
                  label="Username"
                  type="text"
                  placeholder="Choose username"
                  value={data.username}
                  onChange={handleInputChange("username")}
                />

                {/* Email */}
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  value={data.email}
                  onChange={handleInputChange("email")}
                />

                {/* Password + Confirm */}
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 chars"
                    value={data.password}
                    onChange={handleInputChange("password")}
                    extra={
                      <ToggleBtn show={showPassword} onToggle={() => setShowPassword((v) => !v)} />
                    }
                  />
                  <InputField
                    id="confirmPassword"
                    label="Confirm Password"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat password"
                    value={data.confirmPassword}
                    onChange={handleInputChange("confirmPassword")}
                    extra={
                      <ToggleBtn show={showConfirm} onToggle={() => setShowConfirm((v) => !v)} />
                    }
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl ae-brand-button text-white shadow-xl hover:shadow-2xl font-bold py-4 mt-2 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:-translate-y-1 active:translate-y-0"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating Account…
                    </>
                  ) : (
                    "Create Account →"
                  )}
                </button>
              </form>

              {/* Footer */}
              <p className="mt-8 text-center text-sm font-medium text-[var(--text-color)]/60 italic">
                Already have an account?{" "}
                <Link to="/login" className="text-[var(--ae-blue)] hover:text-[var(--ae-plum-deep)] font-black transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Right: Image Panel ── */}
      <div className="hidden lg:block relative w-[42%] xl:w-[48%] shrink-0">
        {/* Gradient overlays */}
        <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-[var(--bg-color)] via-[var(--bg-color)]/50 to-transparent z-10 pointer-events-none" />

        <img
          src={classImg}
          alt="Students learning"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.2]"
        />

        {/* Floating stats card */}
        <div className="absolute top-12 right-10 z-20">
          <div className="ae-brand-card backdrop-blur-md rounded-3xl border border-[var(--ae-border)] p-6 shadow-2xl min-w-[200px] hover:scale-105 transition-transform">
            <p className="text-4xl font-black text-[var(--ae-blue)] italic tracking-tighter">2.4k+</p>
            <p className="text-[var(--text-color)]/60 font-bold text-xs uppercase tracking-widest mt-1">Active learners</p>
            <div className="flex items-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-amber-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-[var(--text-color)] font-black text-xs ml-1 font-outfit">5.0 Rating</span>
            </div>
          </div>
        </div>

        {/* Floating bottom badge */}
        <div className="absolute bottom-12 right-10 z-20 max-w-[240px]">
          <div className="ae-brand-card backdrop-blur-md rounded-3xl border border-[var(--ae-border)] p-6 shadow-2xl hover:scale-105 transition-transform">
            <div className="w-12 h-12 rounded-xl bg-[var(--ae-blue)]/10 border border-[var(--ae-blue)]/20 flex items-center justify-center mb-4">
              <FiCheckCircle size={24} className="text-[var(--ae-blue)]" />
            </div>
            <p className="text-[var(--text-color)] font-black text-lg italic tracking-tight mb-1">Certified Growth</p>
            <p className="text-[var(--text-color)]/60 font-medium text-xs leading-relaxed">Earn blockchain-verified certificates upon cohort completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
