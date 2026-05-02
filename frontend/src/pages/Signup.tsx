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
    <label htmlFor={id} className="block text-[10px] font-black text-[var(--text-color)]/40 uppercase tracking-[0.15em] ml-1">
      {label}
    </label>
    <div className="relative group">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={id}
        className="w-full rounded-2xl bg-[var(--bg-color)]/60 border border-transparent focus:border-[var(--ae-blue)]/30 focus:bg-[var(--bg-color)] focus:ring-4 focus:ring-[var(--ae-blue)]/5 outline-none px-5 py-4 text-[var(--text-color)] placeholder:text-[var(--text-color)]/20 transition-all font-semibold text-sm shadow-sm pr-12 group-hover:bg-[var(--bg-color)]"
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
      className="absolute right-5 top-1/2 -translate-y-1/2 text-[var(--text-color)]/20 hover:text-[var(--ae-blue)] transition-colors"
      aria-label={show ? "Hide password" : "Show password"}
    >
      {show ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
    </button>
  );

  return (
    <div className="min-h-screen w-full flex items-stretch overflow-hidden ae-brand-page font-outfit">
      {/* ── Left: Form Panel ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-16 xl:px-24 z-10">
        <div className="w-full max-w-xl ae-brand-card shadow-2xl border border-transparent rounded-[2.5rem] p-6 sm:p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--ae-blue)]/5 rounded-bl-[4rem] -mr-16 -mt-16 pointer-events-none" />

          {/* Brand */}
          <div className="mb-10 text-center sm:text-left">
            <div className="inline-flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-xl ae-brand-button flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-[var(--text-color)] font-black text-lg tracking-tight uppercase">A.E Platform</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[var(--text-color)] mt-6 leading-tight italic tracking-tighter uppercase underline decoration-[var(--ae-blue)]/20 underline-offset-8">
              Join Us ✨
            </h1>
          </div>

          {/* ── Success State ── */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 animate-bounce">
                <FiCheckCircle className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-black text-[var(--text-color)] mb-3 uppercase italic tracking-tight">Success! 🎉</h2>
              <p className="text-[var(--text-color)]/60 text-base mb-2 font-medium italic">Your journey begins shortly.</p>
              <p className="text-[var(--ae-blue)] text-xs font-black uppercase tracking-widest">Redirecting...</p>
            </div>
          ) : (
            <>
              {/* ── Social Buttons ── */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a
                  href={`${API_BASE}/auth/google`}
                  className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-[var(--bg-color)]/50 hover:bg-[var(--bg-color)] shadow-sm px-4 py-4 transition-all group border border-transparent hover:border-[var(--ae-blue)]/10"
                >
                  <FaGoogle className="text-[#EA4335] text-lg" />
                  <span className="text-sm font-black text-[var(--text-color)]/60 group-hover:text-[var(--text-color)] transition-colors uppercase tracking-wider">Google</span>
                </a>
                <button
                  type="button"
                  onClick={() => setError("Facebook login coming soon!")}
                  className="flex-1 flex items-center justify-center gap-3 rounded-2xl bg-[var(--bg-color)]/50 hover:bg-[var(--bg-color)] shadow-sm px-4 py-4 transition-all group border border-transparent hover:border-[var(--ae-blue)]/10"
                >
                  <FaFacebook className="text-[#0866FF] text-lg" />
                  <span className="text-sm font-black text-[var(--text-color)]/60 group-hover:text-[var(--text-color)] transition-colors uppercase tracking-wider">Facebook</span>
                </button>
              </div>

              {/* ── Divider ── */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex-1 h-px bg-[var(--ae-border)]" />
                <span className="text-[10px] font-black text-[var(--text-color)]/20 uppercase tracking-[0.3em] whitespace-nowrap">Secure Registration</span>
                <div className="flex-1 h-px bg-[var(--ae-border)]" />
              </div>

              {/* ── Error Alert ── */}
              {error && (
                <div className="flex items-center gap-4 bg-red-500/5 border-l-4 border-red-500 rounded-lg px-5 py-4 mb-8 animate-shake">
                  <FiAlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                  <p className="text-sm font-bold text-red-500 italic uppercase tracking-tight">{error}</p>
                </div>
              )}

              {/* ── Form ── */}
              <form onSubmit={createAccount} className="space-y-6">
                {/* First + Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    id="firstName"
                    label="First Name"
                    type="text"
                    placeholder="E.g. David"
                    value={data.firstName}
                    onChange={handleInputChange("firstName")}
                  />
                  <InputField
                    id="lastName"
                    label="Last Name"
                    type="text"
                    placeholder="E.g. Smith"
                    value={data.lastName}
                    onChange={handleInputChange("lastName")}
                  />
                </div>

                {/* Username */}
                <InputField
                  id="username"
                  label="Username"
                  type="text"
                  placeholder="Unique ID"
                  value={data.username}
                  onChange={handleInputChange("username")}
                />

                {/* Email */}
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  value={data.email}
                  onChange={handleInputChange("email")}
                />

                {/* Password + Confirm */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    id="password"
                    label="Security Key"
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
                    label="Verification"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Repeat key"
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
                  className="w-full rounded-2xl ae-brand-button text-white shadow-xl hover:shadow-2xl font-black py-5 mt-4 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:-translate-y-1 active:translate-y-0 uppercase tracking-[0.2em] italic"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Initializing...
                    </>
                  ) : (
                    "Authorize Account →"
                  )}
                </button>
              </form>

              {/* Footer */}
              <p className="mt-10 text-center text-xs font-black text-[var(--text-color)]/30 uppercase tracking-widest italic">
                Already part of the network?{" "}
                <Link to="/login" className="text-[var(--ae-blue)] hover:text-[var(--ae-plum-deep)] transition-colors underline decoration-[var(--ae-blue)]/20 underline-offset-4 ml-1">
                  Connect here
                </Link>
              </p>
            </>
          )}
        </div>
      </div>

      {/* ── Right: Image Panel ── */}
      <div className="hidden lg:block relative w-[40%] xl:w-[45%] shrink-0">
        <div className="absolute inset-x-0 inset-y-0 bg-gradient-to-r from-[var(--bg-color)] via-[var(--bg-color)]/30 to-transparent z-10 pointer-events-none" />

        <img
          src={classImg}
          alt="Students learning"
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.3]"
        />

        <div className="absolute inset-0 bg-[var(--ae-blue)]/5 z-[5]" />

        {/* Floating stats card */}
        <div className="absolute top-16 right-12 z-20">
          <div className="ae-brand-card backdrop-blur-md rounded-[2.5rem] border border-transparent p-8 shadow-2xl min-w-[240px] hover:scale-105 transition-transform duration-700">
            <p className="text-5xl font-black text-[var(--ae-blue)] italic tracking-tighter leading-none mb-2">2.4k+</p>
            <p className="text-[var(--text-color)]/40 font-black text-[10px] uppercase tracking-[0.2em]">Active Members</p>
            <div className="flex items-center gap-1 mt-6">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* Floating bottom badge */}
        <div className="absolute bottom-16 right-12 z-20 max-w-[280px]">
          <div className="ae-brand-card backdrop-blur-md rounded-[2.5rem] border border-transparent p-8 shadow-2xl hover:scale-105 transition-transform duration-700">
            <div className="w-14 h-14 rounded-2xl bg-[var(--ae-blue)]/10 border border-[var(--ae-blue)]/20 flex items-center justify-center mb-6">
              <FiCheckCircle size={28} className="text-[var(--ae-blue)]" />
            </div>
            <p className="text-[var(--text-color)] font-black text-xl italic tracking-tight mb-2 uppercase">Verified Growth</p>
            <p className="text-[var(--text-color)]/50 font-medium text-xs leading-relaxed italic">Earn blockchain-verified credentials upon cohort completion.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
