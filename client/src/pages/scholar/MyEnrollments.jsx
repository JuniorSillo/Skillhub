import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/scholar/Footer";

const MyEnrollments = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    fetchUserEnrolledCourses,
    navigate,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 },
  ]);

  useEffect(() => {
    fetchUserEnrolledCourses();
  }, []);

  return (
    <>
      <div className="md:px-36 px-8 pt-10 min-h-screen bg-[#A53860] bg-gradient-to-b from-[#FFA5AB] to-[#DA627D] text-[#450920]">
        <h1 className="text-2xl font-semibold text-[#F9DBBD]">
          My Enrollments
        </h1>

        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full border-collapse border border-[#A53860] bg-[#F9DBBD] rounded-md">
            {/* Table Header */}
            <thead className="bg-[#FFA5AB] text-[#450920] border-b border-[#A53860] text-sm text-left max-sm:hidden">
              <tr>
                <th className="px-4 py-2 font-semibold min-w-[250px]">
                  Course
                </th>
                <th className="px-4 py-2 font-semibold w-24">Duration</th>
                <th className="px-4 py-2 font-semibold w-28">Completed</th>
                <th className="px-4 py-2 font-semibold w-32">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-[#A53860]">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((course, index) => (
                  <tr
                    key={course._id || index}
                    className="border-b border-[#A53860]/20 hover:bg-[#FFA5AB]/20 transition-colors"
                  >
                    <td className="px-4 py-3 flex items-center gap-2">
                      <img
                        src={course.courseThumbnail}
                        alt="Course Thumbnail"
                        className="w-12 h-12 rounded object-cover sm:w-16 sm:h-16"
                      />
                      <div className="flex-1">
                        <p className="mb-1 max-sm:text-sm truncate">
                          {course.courseTitle}
                        </p>
                        <Line
                          strokeWidth={2}
                          strokeColor="#DA627D"
                          trailColor="#A53860"
                          percent={
                            progressArray[index]
                              ? (progressArray[index].lectureCompleted * 100) /
                                progressArray[index].totalLectures
                              : 0
                          }
                          className="rounded-full"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {calculateCourseDuration(course)}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {progressArray[index] &&
                        `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}
                      <span className="text-[10px]"> Lec</span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/player/${course._id}`)}
                        className="bg-[#DA627D] text-white px-3 py-1 rounded text-sm hover:bg-[#A53860] transition-colors w-full"
                      >
                        {progressArray[index] &&
                        progressArray[index].lectureCompleted /
                          progressArray[index].totalLectures ===
                          1
                          ? "Done"
                          : "Go"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-[#A53860]">
                    No enrollments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
