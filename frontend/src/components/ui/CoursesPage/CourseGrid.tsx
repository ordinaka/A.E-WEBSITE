import CourseCard from "./CourseCard";

export default function CourseGrid() {
  const courses = Array(12).fill({
    title: "Beginner's Guide to Design",
    author: "Ronald Richards",
  });

  return (
    <div className="grid grid-cols-4 gap-6">
      {courses.map((course, i) => (
        <CourseCard key={i} {...course} />
      ))}
    </div>
  );
}