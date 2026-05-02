import pic1 from "../learning-cohorts/images/image (copy 1).png"
import pic2 from "../learning-cohorts/images/image (1).png"
import arrow from "../learning-cohorts/images/arrow-narrow-right.png"
export default function CTAFooter() {
  return (
    <section className="w-full py-32">

      <div className="max-w-7xl mx-auto px-6 space-y-32">

        {/* ================= TOP CTA ================= */}
        <div className="grid md:grid-cols-2 items-center">

          {/* IMAGE (closer to edge) */}
          <div className="flex justify-start">
            <div className="w-[400px] h-[425px] rounded-[40px] overflow-hidden">
              <img
                src= {pic1}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

          {/* TEXT (tight beside image) */}
          <div className="max-w-md ml-0 bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-left text-[var(--ae-plum-deep)]">
              Become an Instructor
            </h3>

            <p className="text-gray-600 text-sm mb-5 leading-relaxed text-left">
              Instructors from around the world teach millions of students on Byway.
              We provide the tools and skills to teach what you love.
            </p>

            <div className="flex justify-start">
              <button className="ae-brand-button px-5 py-2.5 rounded-lg text-sm transition border-none flex items-center justify-center gap-2">
                Start Your Instructor Journey <img src={arrow} className="w-5 h-5"/>
              </button>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM CTA ================= */}
        <div className="grid md:grid-cols-2 items-center">

          {/* TEXT */}
          <div className="max-w-md bg-[#F8FAFC] p-8 rounded-2xl border border-gray-100 shadow-sm order-2 md:order-1">
            <h3 className="text-xl font-semibold mb-3 text-left text-[var(--ae-plum-deep)]">
              Transform your life through education
            </h3>

            <p className="text-gray-600 text-sm mb-5 leading-relaxed text-left">
              Learners around the world are launching new careers, advancing in
              their fields, and enriching their lives.
            </p>

            <div className="flex justify-start">
              <button className="ae-brand-button px-6 py-2.5 rounded-lg text-sm transition border-none flex items-center justify-center gap-2">
                Checkout Courses <img src={arrow} className="w-5 h-5"/>
              </button>
            </div>
          </div>

          {/* IMAGE (closer to right edge) */}
          <div className="flex justify-end order-1 md:order-2">
            <div className="w-[471.5px] h-[385px] rounded-[40px] overflow-hidden">
              <img
                src= {pic2}
                className="object-cover w-full h-full"
              />
            </div>
          </div>

        </div>

        {/* ================= FOOTER ================= */}
        <footer className="pt-16 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

            {/* LEFT */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-left text-[var(--ae-plum-deep)]">
                Algorithmic Explorers.
              </h2>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed text-left">
                Work together seamlessly with real-time updates and communication.
              </p>
              <p className="text-[var(--ae-plum-deep)] text-sm text-left font-semibold">
                Team Conditional & Policy
              </p>
            </div>

            {/* PAGES */}
            <div>
              <h3 className="font-medium mb-4 text-left text-[var(--ae-plum-deep)]">Pages</h3>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li className="hover:text-[var(--ae-blue)] cursor-pointer transition-colors">Home</li>
                <li className="hover:text-[var(--ae-blue)] cursor-pointer transition-colors">Projects</li>
                <li className="hover:text-[var(--ae-blue)] cursor-pointer transition-colors">AE News</li>
                <li className="hover:text-[var(--ae-blue)] cursor-pointer transition-colors">Exco Team</li>
              </ul>
            </div>

            {/* COMPANY */}
            <div>
              <h3 className="font-medium mb-4 text-left text-[var(--ae-plum-deep)]">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600 text-left">
                <li className="hover:text-[var(--ae-blue)] cursor-pointer transition-colors">Customer</li>
                <li className="hover:text-[var(--ae-blue)] cursor-pointer transition-colors">Enterprise</li>
                <li className="hover:text-[var(--ae-blue)] cursor-pointer transition-colors">Partners</li>
                <li className="hover:text-[var(--ae-blue)] cursor-pointer transition-colors">Job</li>
              </ul>
            </div>



          </div>

          {/* BOTTOM */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            @ae. all right reserve
          </div>
        </footer>

      </div>
    </section>
  );
}