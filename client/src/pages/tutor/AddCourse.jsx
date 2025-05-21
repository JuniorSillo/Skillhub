import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId = null) => {
    if (action === "add") {
      const title = prompt("Enter chapter title");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters([...chapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters(
        chapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleLecture = () => {
    if (
      !lectureDetails.lectureTitle ||
      !lectureDetails.lectureDuration ||
      !lectureDetails.lectureUrl
    ) {
      alert("Please fill in all lecture details");
      return;
    }

    setChapters(
      chapters.map((chapter) =>
        chapter.chapterId === currentChapterId
          ? {
              ...chapter,
              chapterContent: [
                ...chapter.chapterContent,
                { ...lectureDetails, lectureId: uniqid() },
              ],
            }
          : chapter
      )
    );

    setShowPopup(false);
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
  };

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder:
              chapter.chapterContent.length > 0
                ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1
                : 1,
            lectureId: uniqid(),
          };
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0 bg-[#A53860] bg-gradient-to-b from-[#FFA5AB] to-[#DA627D] text-[#450920]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md w-full text-[#450920]"
      >
        <div className="flex flex-col gap-1">
          <p className="font-medium">Course Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-[#A53860] bg-[#F9DBBD] text-[#450920] placeholder-[#A53860]"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Course Description</p>
          <div ref={editorRef} className="bg-[#F9DBBD] rounded"></div>
        </div>

        <div className="flex items-center justify-between flex-wrap">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              className="outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-[#A53860] bg-[#F9DBBD] text-[#450920] placeholder-[#A53860]"
              required
            />
          </div>

          <div className="flex md:flex-row flex-col items-center gap-3">
            <p className="font-medium">Course Thumbnail</p>
            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3"
            >
              <img
                src={assets.file_upload_icon}
                alt="file_upload_icon"
                className="p-3 bg-[#DA627D] rounded hover:bg-[#A53860] transition-colors"
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="Image/*"
                hidden
              />
              <img
                className="max-h-10"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-medium">Discount %</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            type="number"
            placeholder="0"
            min={0}
            max={100}
            className="outline-none md:py-2.5 py-2 px-3 w-28 rounded border border-[#A53860] bg-[#F9DBBD] text-[#450920] placeholder-[#A53860]"
            required
          />
        </div>

        {/* Adding chapters & lectures */}
        <div>
          {chapters.map((chapter, chapterIndex) => (
            <div
              key={chapterIndex}
              className="bg-[#F9DBBD] border border-[#A53860] rounded-lg mb-4"
            >
              <div className="flex justify-between items-center p-4 border-b border-[#A53860]">
                <div className="flex items-center">
                  <img
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    src={assets.dropdown_icon}
                    width={14}
                    alt="dropdown_icon"
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed && "rotate-90"
                    }`}
                  />
                  <span className="font-semibold text-[#450920]">
                    {chapterIndex + 1} {chapter.chapterTitle}
                  </span>
                </div>
                <span className="text-[#A53860]">
                  {chapter.chapterContent.length} Lectures
                </span>
                <img
                  src={assets.cross_icon}
                  alt="cross_icon"
                  className="cursor-pointer invert"
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                />
              </div>

              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, lectureIndex) => (
                    <div
                      key={lectureIndex}
                      className="flex justify-between items-center mb-2"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#A53860]">
                          {lectureIndex + 1} {lecture.lectureTitle} -{" "}
                          {lecture.lectureDuration} mins -{" "}
                          <a
                            href={lecture.lectureUrl}
                            target="_blank"
                            className="text-[#DA627D] hover:text-[#450920] transition-colors"
                          >
                            Link
                          </a>{" "}
                          - {lecture.isPreviewFree ? "Free" : "Paid"}
                        </span>

                        <img
                          src={assets.cross_icon}
                          alt="cross_icon"
                          className="cursor-pointer invert"
                          onClick={() =>
                            handleLecture(
                              "remove",
                              chapter.chapterId,
                              lectureIndex
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                  <div
                    className="inline-flex bg-[#FFA5AB] p-2 rounded cursor-pointer mt-2 text-[#450920] hover:bg-[#DA627D] transition-colors"
                    onClick={() => {
                      setCurrentChapterId(chapter.chapterId);
                      setShowPopup(true);
                    }}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}
          <div
            className="flex justify-center items-center bg-[#FFA5AB] p-2 rounded-lg cursor-pointer text-[#450920] hover:bg-[#DA627D] transition-colors"
            onClick={() => handleChapter("add")}
          >
            + Add Chapter
          </div>

          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#450920] bg-opacity-50">
              <div className="bg-[#F9DBBD] text-[#450920] p-4 rounded relative w-full max-w-80">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-[#A53860] rounded py-1 px-2 bg-white text-[#450920] placeholder-[#A53860]"
                    value={lectureDetails.lectureTitle}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    placeholder="Enter title"
                  />
                </div>

                <div className="mb-2">
                  <p>Duration (minutes)</p>
                  <input
                    type="number"
                    className="mt-1 block w-full border border-[#A53860] rounded py-1 px-2 bg-white text-[#450920] placeholder-[#A53860]"
                    value={lectureDetails.lectureDuration}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    placeholder="e.g., 10"
                  />
                </div>

                <div className="mb-2">
                  <p>Lecture URL</p>
                  <input
                    type="text"
                    className="mt-1 block w-full border border-[#A53860] rounded py-1 px-2 bg-white text-[#450920] placeholder-[#A53860]"
                    value={lectureDetails.lectureUrl}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    placeholder="Paste URL"
                  />
                </div>

                <div className="flex gap-2 my-4">
                  <p>Is Preview Free?</p>
                  <input
                    type="checkbox"
                    className="mt-1 scale-125 accent-[#DA627D]"
                    checked={lectureDetails.isPreviewFree}
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                  />
                </div>

                <button
                  type="button"
                  onClick={handleLecture}
                  className="w-full bg-[#DA627D] text-white py-2 px-4 rounded hover:bg-[#A53860] transition-colors"
                >
                  Add
                </button>
                <img
                  onClick={() => setShowPopup(false)}
                  src={assets.cross_icon}
                  className="absolute top-4 right-4 w-4 cursor-pointer invert"
                  alt="cross_icon"
                />
              </div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="px-8 py-2.5 rounded my-4 text-white bg-[#450920] hover:bg-[#A53860] transition-colors"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddCourse;