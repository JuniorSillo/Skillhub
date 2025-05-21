import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Searchbar from "../../components/scholar/Searchbar";
import { useParams } from "react-router-dom";
import Coursecard from "../../components/scholar/Coursecard";
import { assets } from "../../assets/assets";
import Footer from "../../components/scholar/Footer";

const CoursesList = () => {
  const { navigate, allCourses } = useContext(AppContext);
  const { input } = useParams();
  const [filteredCourse, setFilteredCourse] = useState([]);

  useEffect(() => {
    if (allCourses && allCourses.length > 0) {
      const tempCourses = allCourses.slice();

      input
        ? setFilteredCourse(
            tempCourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredCourse(tempCourses);
    }
  }, [allCourses, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left min-h-screen bg-[#A53860] bg-gradient-to-b from-[#FFA5AB] to-[#DA627D] text-[#450920]">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-[#F9DBBD]">
              Course List
            </h1>
            <p className="text-[#A53860]">
              <span
                className="text-[#F9DBBD] cursor-pointer hover:text-[#450920] transition-colors"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              | <span>Course List</span>
            </p>
          </div>
          <Searchbar data={input} />
        </div>

        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border border-[#F9DBBD] mt-8 -mb-8 text-[#F9DBBD] bg-[#450920]/50 rounded-md">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt="clear search"
              className="cursor-pointer invert"
              onClick={() => navigate("/courses-list")}
            />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-6 px-2 md:p-0">
          {filteredCourse.map((course, index) => (
            <Coursecard key={index} course={course} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursesList;
