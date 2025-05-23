import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/scholar/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/scholar/Footer";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateCourseDuration,
    calculateNoOfLectures,
    calculateChapterTime,
    currency,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return courseData ? (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left">
        <div className="absolute top-0 left-0 w-full h-section-height -z-1 bg-gradient-to-b from-[#F9DBBD]/20 to-white"></div>
        {/* left col */}
        <div className="max-w-xl z-10" style={{ color: '#A53860' }}>
          <h1 className="md:text-4xl text-2xl font-semibold" style={{ color: '#450920' }}>
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* review and ratings */}
          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p style={{ color: '#DA627D' }} className="font-medium">
              {calculateRating(courseData)}
            </p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p style={{ color: '#DA627D' }}>
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>
            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "scholars" : "scholar"}
            </p>
          </div>
          <p>
            Course by{" "}
            <span className="underline" style={{ color: '#DA627D' }}>
              Binary Wizard
            </span>
          </p>

          <div className="pt-8" style={{ color: '#450920' }}>
            <h2 className="text-xl font-semibold">Course Structure</h2>
            
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border mb-2 rounded-lg shadow-sm"
                  style={{ borderColor: '#FFA5AB', backgroundColor: '#F9DBBD' }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    style={{ backgroundColor: '#FFA5AB' }}
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-90" : ""
                        }`}
                        src={assets.down_arrow_icon}
                        alt="down_arrow_icon"
                      />
                      <p className="font-medium md:text-base text-sm" style={{ color: '#450920' }}>
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-default" style={{ color: '#A53860' }}>
                      {chapter.chapterContent.length} lectures |{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2" style={{ borderColor: '#FFA5AB' }}>
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-1">
                          <img
                            className="w-4 h-4 mt-1"
                            src={assets.play_icon}
                            alt="play_icon"
                          />
                          <div className="flex items-center justify-between w-full text-xs md:text-sm" style={{ color: '#450920' }}>
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="cursor-pointer"
                                  style={{ color: '#DA627D' }}
                                >
                                  Preview
                                </p>
                              )}
                              <p style={{ color: '#A53860' }}>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="py-20 text-sm md:text-default">
            <h3 className="text-xl font-semibold" style={{ color: '#450920' }}>
              Course Description
            </h3>
            <p
              className="pt-3 rich-text"
              style={{ color: '#A53860' }}
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>
        {/* right col */}
        <div className="max-w-course-card z-10 shadow-lg rounded-t md:rounded-lg overflow-hidden min-w-[300px] sm:min-w-[420px]" style={{ backgroundColor: '#F9DBBD' }}>
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="" className="w-full" />
          )}

          <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                className="w-3.5"
                src={assets.time_clock_icon}
                alt="time_clock_icon"
              />
              <p style={{ color: '#DA627D' }}>
                <span className="font-medium">5 days</span> left at this price!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="md:text-4xl text-2xl font-semibold" style={{ color: '#450920' }}>
                {currency}{" "}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="md:text-lg line-through" style={{ color: '#A53860' }}>
                {currency} {courseData.coursePrice}
              </p>
              <p className="md:text-lg" style={{ color: '#DA627D' }}>
                {courseData.discount}% off
              </p>
            </div>

            <div className="flex items-center text-sm md:text-default gap-4 pt-2 md:pt-4" style={{ color: '#A53860' }}>
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p style={{ color: '#DA627D' }}>{calculateRating(courseData)}</p>
              </div>
              <div className="h-4 w-px" style={{ backgroundColor: '#FFA5AB' }}></div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px" style={{ backgroundColor: '#FFA5AB' }}></div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson icon" />
                <p>{calculateNoOfLectures(courseData)} lessons</p>
              </div>
            </div>
            <button 
              className="md:mt-6 mt-4 w-full py-3 rounded text-white font-medium transition-colors"
              style={{ 
                backgroundColor: '#A53860',
                '&:hover': { backgroundColor: '#DA627D' }
              }}
            >
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="md:text-xl text-lg font-medium" style={{ color: '#450920' }}>
                What's in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-default list-disc" style={{ color: '#A53860' }}>
                <li>Lifetime access with free updates</li>
                <li>Step-by-step, hands-on project guidance</li>
                <li>Downloadable resources and source code</li>
                <li>Quizzes to test your knowledge</li>
                <li>Certificate of completion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;