import React, { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import { AppContext } from "../../context/AppContext"; // Note: Not used directly in this component
import Loading from "../../components/scholar/Loading";

const StudentsEnrolled = () => {
  const [enrolledStudents, setEnrolledStudents] = useState(null); // Fixed initial state

  const fetchEnrolledStudents = async () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchEnrolledStudents();
  }, []);

  return enrolledStudents ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0 bg-[#A53860] bg-gradient-to-b from-[#FFA5AB] to-[#DA627D] text-[#450920]">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-[#F9DBBD] border border-[#A53860]">
        <table className="table-auto w-full overflow-hidden">
          <thead className="bg-[#FFA5AB] text-[#450920] border-b border-[#A53860] text-sm text-left">
            <tr>
              <th className="px-4 py-2 font-semibold text-center w-12 hidden sm:table-cell">
                #
              </th>
              <th className="px-4 py-2 font-semibold min-w-[200px]">
                Student Name
              </th>
              <th className="px-4 py-2 font-semibold">Course Title</th>
              <th className="px-4 py-2 font-semibold w-28 hidden sm:table-cell">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#A53860]">
            {enrolledStudents?.length > 0 ? (
              enrolledStudents.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-[#A53860]/20 hover:bg-[#FFA5AB]/20 transition-colors"
                >
                  {/* Index Number */}
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {index + 1}
                  </td>

                  {/* Student Info */}
                  <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                    {item?.student?.imageUrl ? (
                      <img
                        src={item.student.imageUrl}
                        alt="Student"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-[#DA627D] flex items-center justify-center text-white text-sm">
                        ?
                      </span>
                    )}
                    <span className="truncate">
                      {item?.student?.name || "N/A"}
                    </span>
                  </td>

                  {/* Course Title */}
                  <td className="px-4 py-3 truncate text-ellipsis overflow-hidden">
                    {item?.courseTitle || "No Title"}
                  </td>

                  {/* Purchase Date */}
                  <td className="px-4 py-3 text-xs hidden sm:table-cell">
                    {item?.purchaseDate
                      ? new Date(item.purchaseDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-3 text-center text-[#A53860]"
                >
                  No students enrolled yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StudentsEnrolled;
