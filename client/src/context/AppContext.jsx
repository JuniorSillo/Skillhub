import { createContext, useState, useEffect } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [allCourses, setAllCourses] = useState([]);
  const [isTutor, setIsTutor] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Fetch all courses on mount
  useEffect(() => {
    setAllCourses(dummyCourses);
    fetchUserEnrolledCourses(); // ✅ Ensuring enrollments are fetched on mount
  }, []);

  // Function to calculate average rating of a course
  const calculateRating = (course) => {
    if (!course.courseRatings || course.courseRatings.length === 0) return 0;

    let totalRating = course.courseRatings.reduce(
      (acc, rating) => acc + rating.rating,
      0
    );
    return totalRating / course.courseRatings.length;
  };

  // Function to calculate chapter duration
  const calculateChapterTime = (chapter) => {
    let time = chapter.chapterContent.reduce(
      (acc, lecture) => acc + lecture.lectureDuration,
      0
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate course duration
  const calculateCourseDuration = (course) => {
    let totalTime = course.courseContent.reduce(
      (acc, chapter) =>
        acc +
        chapter.chapterContent.reduce(
          (sum, lecture) => sum + lecture.lectureDuration,
          0
        ),
      0
    );
    return humanizeDuration(totalTime * 60 * 1000, { units: ["h", "m"] });
  };

  // Function to calculate the number of lectures in a course
  const calculateNoOfLectures = (course) => {
    return course.courseContent.reduce(
      (total, chapter) => total + chapter.chapterContent.length,
      0
    );
  };

  // Fetch user enrolled courses
  const fetchUserEnrolledCourses = () => {
    setEnrolledCourses(dummyCourses);
  };

  const value = {
    currency,
    allCourses,
    navigate,
    calculateRating,
    isTutor,
    setIsTutor,
    calculateCourseDuration,
    calculateNoOfLectures,
    calculateChapterTime,
    enrolledCourses,
    fetchUserEnrolledCourses,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
