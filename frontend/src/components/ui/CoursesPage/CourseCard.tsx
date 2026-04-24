import rectangle from "../course-details/images/Rectangle 1080.png"

export default function CourseCard() {

  const progress = 65;

  return (
    <div className="w-[300px] p-[2px] rounded-2xl bor">

      {/* CARD */}
      <div className="bg-[#000000] rounded-2xl p-3">

        {/* IMAGE */}
        <img
          src={rectangle}
          alt="Course"
          className="w-full h-[140px] object-cover rounded-lg mb-4"
        />

        {/* TITLE */}
        <h4 className="text-lg font-semibold text-white mb-1">
          Beginner’s Guide to Design
        </h4>

        {/* AUTHOR */}
        <p className="text-sm text-gray-400 mb-1">
          By Ronald Richards
        </p>

      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#5F00FF] rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

        {/* RATINGS */}
        <div className="flex items-center gap-2 mb-1">
          <div className="text-yellow-400 text-lg">
            ★★★★★
          </div>

          <span className="text-gray-300 text-sm">
            (1200 Ratings)
          </span>
        </div>

        {/* PRICE */}
        <p className="text-xl font-bold text-white">
          $149.9
        </p>

      </div>
    </div>
  )
}