import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { FiSearch } from "react-icons/fi";
import { Palette, Server, Code, Brain, BarChart3, Binary, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import favicon from "../learning-cohorts/images/favicon.png";

const cohorts = [
  { title: "UI/UX & Product Design", icon: Palette },
  { title: "Backend Development", icon: Server },
  { title: "Frontend Development", icon: Code },
  { title: "Machine Learning", icon: Brain },
  { title: "Computational Analysis", icon: BarChart3 },
  { title: "Algorithm Basics", icon: Binary },
];

function Hero() {
  return (
    <section className="w-full pt-48 pb-16 relative overflow-hidden flex flex-col items-center ae-brand-page">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-300px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[var(--ae-lavender)]/20 blur-[220px] rounded-full" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F8FAFC] via-transparent to-transparent" />
      </div>

      <div className="relative w-full max-w-7xl px-6 text-center">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-semibold leading-tight pb-2 mb-4 text-[var(--ae-plum-deep)]">
          Learning Cohorts
        </h1>

        <p className="text-[var(--ae-plum-deep)]/80 text-base mb-10 max-w-lg mx-auto leading-relaxed">
          Structured paths designed to take you from beginner to engineering expert. Choose your track and start learning today.
        </p>

        {/* Search */}
        <div className="flex justify-center items-center gap-3 mb-16">
          <input
            placeholder="Search for a course or cohort..."
            className="w-full max-w-[480px] px-6 py-4 rounded-2xl
              bg-white
              border border-[var(--ae-border)]
              text-[var(--ae-plum-deep)] placeholder:text-gray-400
              outline-none
              shadow-sm
              focus:border-[var(--ae-blue)]/50 transition-colors"
          />
          <button className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center
            ae-brand-button">
            <FiSearch className="text-white text-lg" />
          </button>
        </div>
      </div>

      {/* ── Animated Swiper Carousel (same as homepage) ── */}
      <div className="relative w-full flex justify-center items-center min-h-80 sm:min-h-[500px]">
        {/* Center fixed AE logo */}
        <div className="absolute z-20 top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <div className="relative flex h-[180px] w-[180px] items-center justify-center rounded-full bg-[var(--ae-blue)] shadow-[0_0_56px_var(--ae-lavender)] sm:h-[245px] sm:w-[245px] md:h-72 md:w-72 md:shadow-[0_0_94px_var(--ae-lavender)]">
            <div className="relative flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_0_32px_rgba(0,19,34,0.08)] sm:h-[205px] sm:w-[205px] md:h-60 md:w-60">
              <img
                src={favicon}
                alt="AE Logo"
                className="h-[70px] w-[92px] object-contain sm:h-[92px] sm:w-[120px] md:h-[112px] md:w-[148px]"
              />
            </div>
          </div>

          <Link
            to="/signup"
            className="ae-brand-button mt-5 sm:mt-8 flex h-[54px] w-[176px] items-center justify-center gap-2.5 rounded-[16px] px-4 text-base font-medium transition-transform hover:scale-[1.03] sm:h-[72px] sm:w-[220px] sm:rounded-[19px] sm:text-xl"
          >
            Enroll now
            <ArrowRight className="h-4 w-4 -rotate-45" />
          </Link>
        </div>

        {/* Spinning cohort Swiper */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={40}
          slidesPerView={1.5}
          centeredSlides={true}
          loop={true}
          loopAdditionalSlides={3}
          freeMode={{ enabled: true, momentum: false }}
          speed={8000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          allowTouchMove={false}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 50 },
            640: { slidesPerView: 3, spaceBetween: 60 },
            1024: { slidesPerView: 5, spaceBetween: 80 },
          }}
          className="cohorts-swiper w-full pointer-events-none"
        >
          {[...cohorts, ...cohorts, ...cohorts].map((item, index) => {
            const Icon = item.icon;
            return (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="flex flex-col items-center opacity-70">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-[var(--ae-blue)]/5 backdrop-blur-lg border border-[var(--ae-blue)]/10 flex items-center justify-center mb-3">
                    <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[var(--ae-blue)]" />
                  </div>
                  <p className="text-center text-[10px] sm:text-xs md:text-sm text-[var(--ae-plum-deep)]/80 font-medium max-w-[80px] sm:max-w-[100px] leading-tight">
                    {item.title}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}

export default Hero;