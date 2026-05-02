import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// TODO: Replace with your real WhatsApp / Discord / Telegram invite link
const COMMUNITY_LINK = "https://forms.gle/sc9w11jVmH6tucEo8";

const VECTOR = "Vector.png";


export default function CommunitySection(){
  return (
    <section className="relative h-fit p-5 bg-transparent text-[var(--ae-plum-deep)] overflow-hidden flex flex-col items-center">
      {/* Title Section */}
      <div className="mt-20 text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[87.11px] font-semibold tracking-tight">Our Community</h1>
        <div className="flex justify-center mt-4">
          <div className="relative flex h-10 lg:h-12 w-56.25 items-center justify-center rounded-[9.90566px] bg-white border border-[var(--ae-border)] px-[33.4057px] text-[var(--ae-plum-deep)] shadow-sm">
            <div className="relative flex h-12 min-w-[188.21px] items-center justify-start">
             <img src="/btn-members.png" alt="" className="h-7" />
            </div>
          </div>
        </div>
      </div>



      {/* MAP SECTION */}
      <div className="w-full max-w-7xl mt-15 lg:mt-20 flex flex-col items-center">
        <div className="w-full rounded-2xl overflow-hidden">
          {/* Map Background */}
          <img src={VECTOR} alt="map" className="w-full opacity-80 object-cover" />
        </div>

        {/* Email Capture Area */}
        <div className="mt-6 w-full max-w-161.75 px-4">
          <div className="flex flex-col items-stretch gap-3 p-0 sm:h-15 sm:flex-row sm:items-center sm:gap-2.75">
            <div className="flex h-14 w-full items-center gap-3 rounded-[15px] bg-white border border-[var(--ae-border)] px-4 py-2.5 shadow-sm sm:h-15 sm:w-105.25 sm:gap-3.25 sm:px-6.75">
              <input
                type="email"
                placeholder="Enter your email..."
                className="h-6.25 w-full min-w-0 bg-transparent text-base leading-6.25 tracking-[-0.500092px] text-[var(--ae-plum-deep)] outline-none placeholder:text-gray-400 sm:w-43.75 sm:text-[20.0037px]"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => window.open(COMMUNITY_LINK, "_blank", "noreferrer")}
              className="ae-brand-button flex h-14 w-full items-center justify-center gap-2.5 rounded-[15px] px-2.5 py-2.5 text-white sm:h-15 sm:w-53.75 transition-transform hover:scale-[1.03]"
            >
              <ArrowUpRight size={20} className="inline-block" />
              <span className="h-6.25 text-base leading-6.25 font-semibold text-white sm:text-[20px]">
                Join Community
              </span>
            </motion.button>
          </div>
        </div>
      </div>



    </section>
  );
}
