import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { AuthUser } from "../context/AuthContext";

/**
 * This page is the "landing zone" after Google OAuth.
 * The backend redirects here with ?token=...&userId=...&role=...&status=...
 * We read those params, log the user in via AuthContext, then redirect to Dashboard.
 */
export default function OAuthCallback() {
  const navigate = useNavigate();
  const { login, isLoggedIn, user } = useAuth();
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current) return;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userId = params.get("userId");
    const firstName = params.get("firstName");
    const email = params.get("email");
    const role = params.get("role");
    const status = params.get("status");
    const error = params.get("error");

    if (error || !token || !userId || !firstName || !email || !role) {
      navigate("/login?error=oauth_failed", { replace: true });
      return;
    }

    processed.current = true;

    const authUser: AuthUser = {
      id: userId,
      firstName,
      lastName: params.get("lastName") ?? "",
      username: params.get("username") ?? email,
      email,
      role: role as AuthUser["role"],
      status: (status as AuthUser["status"]) ?? "ACTIVE"
    };

    login(authUser, token);
  }, [login, navigate]);

  // Once logged in, redirect to the right place
  useEffect(() => {
    if (isLoggedIn && user) {
      const isAdmin = user.role === "ADMIN" || user.role === "SUPER_ADMIN";
      navigate(isAdmin ? "/admin" : "/dashboard", { replace: true });
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <div className="min-h-screen bg-[#050020] flex items-center justify-center">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin mx-auto mb-5 shadow-[0_0_20px_rgba(139,92,246,0.4)]" />
        <p className="text-white font-semibold text-lg">Signing you in…</p>
        <p className="text-white/40 text-sm mt-2">Almost there — setting up your session.</p>
      </div>
    </div>
  );
}
