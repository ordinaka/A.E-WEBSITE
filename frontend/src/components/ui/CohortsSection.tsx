import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Search, ArrowRight, Palette, Server, Code, Brain, BarChart3, Binary } from "lucide-react";

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
  const inView = useInView(ref, { once: true, margin: "-120px" });

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

const cohorts = [
  { title: "UI/UX & Product Design", icon: Palette },
  { title: "Backend Development", icon: Server },
  { title: "Frontend Development", icon: Code },
  { title: "Machine Learning", icon: Brain },
  { title: "Computational Analysis", icon: BarChart3 },
  { title: "Algorithm Basics", icon: Binary },
];

export default function CohortsSection() {
  return (
    <section className="relative z-20 px-4 sm:px-6 pt-12 pb-6 sm:pt-16 md:pt-24 text-[var(--text-color)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <FadeInWhenVisible delay={0.2}>
          <header className="text-center mb-8 sm:mb-10 md:mb-16">
            <h1 className="mx-auto mb-3 sm:mb-4 md:mb-6 w-full max-w-134.5 text-center font-semibold text-2xl sm:text-3xl md:text-5xl lg:text-[72.8527px] md:leading-23 md:tracking-[-4.40297px] bg-[linear-gradient(270deg,var(--ae-blue)_0%,var(--ae-plum-deep)_147.96%)] bg-clip-text text-transparent leading-tight">
              Learning Cohorts
            </h1>
            <p className="text-[var(--text-color)]/80 text-xs sm:text-sm md:text-base lg:text-xl max-w-2xl mx-auto leading-relaxed px-2 sm:px-4">
              Master industry-leading skills with expert guidance and hands-on projects through our specialized learning cohorts.
            </p>
          </header>
        </FadeInWhenVisible>

        {/* Search Bar */}
        <FadeInWhenVisible delay={0.3}>
          <div className="w-full flex justify-center px-2 sm:px-0 mb-8 sm:mb-10 md:mb-12">
            <div className="flex w-full max-w-xl sm:max-w-2xl gap-2">
              <div className="flex flex-row items-center w-full py-2 sm:py-2.5 pr-2 sm:pr-2.5 pl-3 sm:pl-6 rounded-2xl sm:rounded-[15px] ae-brand-card shadow-sm border border-[var(--ae-border)]">
                <input
                  type="text"
                  placeholder="Search for a course"
                  className="flex-1 bg-transparent text-xs sm:text-sm md:text-base text-[var(--text-color)] placeholder-gray-400 focus:outline-none pr-3"
                />
              </div>
              {/* Search Icon Bubble */}
              <div className="h-full w-12 sm:w-15 rounded-2xl sm:rounded-[15px] flex items-center justify-center ae-brand-button flex-shrink-0">
                <Search className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Swiper */}
        <FadeInWhenVisible delay={0.4}>
          <div className="relative w-full flex justify-center items-center min-h-[320px] sm:min-h-80 md:min-h-125">
            {/* Center fixed person */}
            <div className="absolute z-20 top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center px-3 sm:px-0">
              <div className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full bg-[var(--ae-blue)] shadow-[0_0_40px_var(--ae-lavender)] sm:h-[180px] sm:w-[180px] md:h-[245px] md:w-[245px] md:shadow-[0_0_56px_var(--ae-lavender)] lg:h-72.75 lg:w-72.75 lg:shadow-[0_0_94px_var(--ae-lavender)]">
                <div className="relative flex h-[110px] w-[110px] items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_0_24px_rgba(0,19,34,0.08)] sm:h-[145px] sm:w-[145px] md:h-[205px] md:w-[205px] md:shadow-[0_0_32px_rgba(0,19,34,0.08)] lg:h-61.25 lg:w-61.25 lg:shadow-[0_0_51.2px_rgba(0,19,34,0.08)]">
                  <img
                    src="/favicon.png"
                    alt="center-person"
                    className="h-[55px] w-[70px] object-contain sm:h-[70px] sm:w-[92px] md:h-[92px] md:w-[120px] lg:h-[115.76px] lg:w-[151.94px]"
                  />
                </div>
              </div>

              <Link
                to="/signup"
                className="ae-brand-button mt-4 sm:mt-5 md:mt-8 flex h-12 sm:h-14 md:h-19.25 px-4 sm:px-5 md:px-6 items-center justify-center gap-2 rounded-lg sm:rounded-xl md:rounded-[16px] text-xs sm:text-sm md:text-base lg:text-lg font-semibold md:font-normal text-white transition-transform hover:scale-[1.03] active:scale-95 whitespace-nowrap"
              >
                Enroll now
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-4 md:w-4 lg:h-[16.33px] lg:w-[16.33px] -rotate-45" />
              </Link>
            </div>

            {/* Background moving slides */}
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
              }}
              breakpoints={{
                640: { slidesPerView: 2.5 },
                1024: { slidesPerView: 3.5 },
              }}
              className="w-full h-full opacity-30 select-none pointer-events-none"
            >
              {cohorts.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <SwiperSlide key={idx} className="flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 sm:w-17 sm:h-17 md:w-18 md:h-18 lg:w-19 lg:h-19 rounded-full bg-[var(--ae-blue)]/5 backdrop-blur-lg border border-[var(--ae-blue)]/10 flex items-center justify-center mb-2 sm:mb-3">
                        <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-[var(--ae-blue)]" />
                      </div>
                      <p className="text-center text-[10px] sm:text-xs md:text-sm text-[var(--ae-plum-deep)]/80 font-medium max-w-20 sm:max-w-25 md:max-w-30 leading-tight">
                        {item.title}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
