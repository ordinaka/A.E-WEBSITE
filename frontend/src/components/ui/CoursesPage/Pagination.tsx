import { useState } from "react";

export default function Pagination() {
  const [active, setActive] = useState(1);

  const handlePrev = () => {
    if (active > 1) setActive(active - 1);
  };

  const handleNext = () => {
    if (active < 3) setActive(active + 1);
  };

  return (
    <div className="flex justify-center gap-3 mt-8 text-white">
      
      <button
        onClick={handlePrev}
        className="px-3 py-1 border border-gray-600 rounded cursor-pointer hover:bg-purple-600 hover:border-purple-600"
      >
        &lt;
      </button>

      <button
        onClick={() => setActive(1)}
        className={`px-3 py-1 border border-gray-600 rounded cursor-pointer hover:bg-purple-600 hover:border-purple-600 ${
          active === 1 ? "bg-purple-600 border-purple-600" : ""
        }`}
      >
        1
      </button>

      <button
        onClick={() => setActive(2)}
        className={`px-3 py-1 border border-gray-600 rounded cursor-pointer hover:bg-purple-600 hover:border-purple-600 ${
          active === 2 ? "bg-purple-600 border-purple-600" : ""
        }`}
      >
        2
      </button>

      <button
        onClick={() => setActive(3)}
        className={`px-3 py-1 border border-gray-600 rounded cursor-pointer hover:bg-purple-600 hover:border-purple-600 ${
          active === 3 ? "bg-purple-600 border-purple-600" : ""
        }`}
      >
        3
      </button>

      <button
        onClick={handleNext}
        className="px-3 py-1 border border-gray-600 rounded cursor-pointer hover:bg-purple-600 hover:border-purple-600"
      >
        &gt;
      </button>

    </div>
  );
}