import { useState, useEffect } from "react";
import favicon from "../learning-cohorts/images/favicon.png";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../../context/useAuth";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const dashboardPath = isAdmin ? "/admin" : "/dashboard";

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/cohorts", label: "Cohorts" },
    { to: "/modules", label: "Modules" },
    { to: "/products", label: "Products" },
    { to: "/guru-circle", label: "Guru Circle" },
    { to: "/testimonials", label: "Testimonials" },
    { to: "/contact", label: "Contact" },
  ];

  const authenticatedLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/leaderboard", label: "Leaderboard" },
    ...(isAdmin ? [{ to: "/admin", label: "Admin" }] : []),
  ];

  const adminLinks = [
    { to: "/admin", label: "Admin Dashboard" },
    { to: "/admin/modules", label: "Modules" },
    { to: "/admin/quizzes", label: "Quizzes" },
    { to: "/admin/products", label: "Products" },
    { to: "/admin/testimonials", label: "Testimonials" },
    { to: "/admin/team", label: "Team" },
    { to: "/admin/users", label: "Users" },
  ];

  const navLinks = !isLoggedIn ? publicLinks : isAdmin ? adminLinks : authenticatedLinks;

  return (
    <header className={`fixed top-0 left-0 w-full z-50 flex justify-center px-4 transition-all duration-300 ${isScrolled ? "pt-2" : "pt-4"}`}>
      <div className="w-full max-w-7xl relative">
        <div className={`w-full flex items-center justify-between px-6 py-3 rounded-full border transition-all duration-300 ${
          isScrolled 
            ? "bg-white/90 backdrop-blur-md border-[var(--ae-blue)]/20 shadow-lg" 
            : "ae-brand-card backdrop-blur-xl border-transparent"
        }`}>

          {/* LOGO */}
          <Link to="/" onClick={closeMenu}>
            <img src={favicon} className="w-10 h-10 rounded-full" alt="Logo" />
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden lg:flex gap-8 text-sm text-slate-600 font-medium tracking-wide">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-[var(--ae-blue)] transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* PROFILE / LOGIN / HAMBURGER */}
          <div className="flex gap-4 items-center">
            <div className="hidden sm:flex gap-4 items-center">
              {!isLoggedIn ? (
                <>
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => 
                      `text-sm font-bold transition-all duration-300 relative px-1 ${
                        isActive 
                          ? "text-[var(--ae-blue)] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-[var(--ae-blue)]" 
                          : "text-slate-500 hover:text-[var(--ae-blue)]"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                  <NavLink 
                    to="/signup" 
                    className={({ isActive }) => 
                      `text-sm px-5 py-2.5 font-bold rounded-full transition-all duration-300 shadow-sm ${
                        isActive 
                          ? "bg-[var(--ae-plum-deep)] text-white ring-2 ring-[var(--ae-blue)]/50 ring-offset-2" 
                          : "ae-brand-button text-white hover:shadow-lg"
                      }`
                    }
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <Link to={dashboardPath} className="text-sm font-bold text-slate-500 hover:text-[var(--ae-blue)] transition-colors">
                    {isAdmin ? "Admin Dashboard" : "Dashboard"}
                  </Link>
                  <button
                    onClick={logout}
                    className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* MOBILE TOGGLE */}
            <button 
              className="lg:hidden text-2xl text-[var(--ae-plum-deep)] p-2 hover:bg-slate-100 rounded-full transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <HiX /> : <HiMenu />}
            </button>

            {isLoggedIn && (
              <Link to={dashboardPath} onClick={closeMenu} className="hidden sm:flex w-10 h-10 ml-2 rounded-full bg-slate-100 text-[var(--ae-plum-deep)] items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                👤
              </Link>
            )}
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMenuOpen && (
          <div className="absolute top-20 left-0 w-full bg-white border border-slate-200 shadow-xl rounded-3xl p-8 lg:hidden flex flex-col gap-6 text-lg text-slate-800 font-medium animate-in fade-in slide-in-from-top-4 duration-300 z-40">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className="hover:text-[var(--ae-blue)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            <hr className="border-slate-200" />
            
            {!isLoggedIn ? (
              <div className="flex flex-col gap-4">
                <Link to="/login" onClick={closeMenu} className="hover:text-[var(--ae-blue)] transition-colors">Login</Link>
                <Link to="/signup" onClick={closeMenu} className="bg-[var(--ae-blue)] text-center text-white font-bold py-3 rounded-xl hover:bg-opacity-90 transition-colors">Sign Up</Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Link to={dashboardPath} onClick={closeMenu} className="hover:text-[var(--ae-blue)] transition-colors">
                  {isAdmin ? "Admin Dashboard" : "Dashboard"}
                </Link>
                <button
                  onClick={() => { logout(); closeMenu(); }}
                  className="text-left text-red-500 font-bold hover:text-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
