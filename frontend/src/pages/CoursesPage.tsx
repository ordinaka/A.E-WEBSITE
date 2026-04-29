import { useState } from "react";
import Navbar from "../components/ui/CoursesPage/Navbar";
import Sidebar from "../components/ui/CoursesPage/Sidebar";
import CourseGrid from "../components/ui/CoursesPage/CourseGrid";
import Pagination from "../components/ui/CoursesPage/Pagination";
import Footer from "../components/ui/CoursesPage/Footer";
import { FiSearch } from "react-icons/fi";

export default function CoursesPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Relevance");

  return (
    <div className="bg-[#050020] text-white min-h-screen relative overflow-hidden">
      
      {/* 🌌 GLOBAL BACKGROUND GLOW */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[1000px] h-[1000px] bg-purple-700/20 blur-[150px] top-[-400px] right-[1500px]" />
        <div className="absolute w-[700px] h-[700px] bg-purple-600/30 blur-[150px] top-[35%] left-[-400px]" />
        <div className="absolute w-[700px] h-[700px] bg-purple-600/30 blur-[150px] top-[45%] right-[-400px]" />
      </div>

      <Navbar />

      <div className="flex gap-10 px-10 mt-10">
        <Sidebar />

        <div className="flex-1">

          {/* TOP SECTION */}
          <div className="flex justify-between items-start mb-6">

            {/* LEFT SIDE */}
            <div className="flex flex-col gap-3">
              <h2 className="text-white text-lg">Courses (12)</h2>

              <div className="relative w-[320px]">
                <input
                  type="text"
                  placeholder="Search User"
                  className="w-full bg-gray-400 text-black placeholder-gray-700 
                  border-2 border-[#5F00FF] rounded-lg 
                  py-2 pl-4 pr-10 outline-none"
                />

                <FiSearch
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-lg"
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex gap-3">
              <p className="text-white text-regular mt-1">Sort By</p>

              {/* DROPDOWN */}
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="bg-[#5F00FF] border border-white text-white text-sm px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
                >
                  {selected}

                  <svg
                    className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-40 bg-[#5F00FF] rounded shadow-lg">
                    {["Relevance", "Newest", "Popular"].map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setSelected(option);
                          setOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-purple-600 cursor-pointer text-sm"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FILTER BUTTON */}
              <button className="bg-[#5F00FF] border border-white text-white text-sm px-4 py-2 rounded flex items-center gap-2 mr-8 cursor-pointer">
                <div className="flex flex-col items-center justify-center gap-[3px]">
                  <span className="block h-[2px] w-4 bg-white"></span>
                  <span className="block h-[2px] w-3 bg-white"></span>
                  <span className="block h-[2px] w-2 bg-white"></span>
                </div>

                <span>Filter</span>
              </button>
            </div>
          </div>

          <CourseGrid />
          <Pagination />

        </div>
      </div>

      <Footer />
    </div>
  );
}