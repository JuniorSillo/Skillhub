import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/scholar/Loading";

const MyCourses = () => {
  const { currency, allCourses } = useContext(AppContext);
  const [courses, setCourses] = useState(null);

  const fetchTutorCourses = async () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    fetchTutorCourses();
  }, []);

  return courses ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 p-4 pt-8 bg-[#A53860] bg-gradient-to-b from-[#FFA5AB] to-[#DA627D] text-[#450920]">
      <div className="w-full">
        <h2 className="pb-4 text-lg font-medium text-[#F9DBBD]">My Courses</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-[#A53860] bg-[#F9DBBD] rounded-md">
            <thead className="bg-[#FFA5AB] text-[#450920] border-b border-[#A53860] text-sm text-left">
              <tr>
                <th className="px-4 py-2 font-semibold min-w-[200px]">Course</th>
                <th className="px-4 py-2 font-semibold w-24">Earnings</th>
                <th className="px-4 py-2 font-semibold w-20 text-center">Students</th>
                <th className="px-4 py-2 font-semibold w-28">Published</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#A53860]">
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-b border-[#A53860]/20 hover:bg-[#FFA5AB]/20 transition-colors"
                >
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <img
                      src={course.courseThumbnail}
                      alt="Course"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                    <span className="truncate">{course.courseTitle}</span>
                  </td>
                  <td className="px-4 py-3">
                    {currency}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default MyCourses;