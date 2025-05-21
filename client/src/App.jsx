import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/scholar/Home.jsx";
import CoursesList from "./pages/scholar/CoursesList.jsx";
import CourseDetails from "./pages/scholar/CourseDetails.jsx";
import MyEnrollments from "./pages/scholar/MyEnrollments.jsx";
import Player from "./pages/scholar/Player.jsx";
import Loading from "./components/scholar/Loading.jsx";
import Tutor from "./pages/tutor/Tutor.jsx";
import Dashboard from "./pages/tutor/Dashboard.jsx";
import AddCourse from "./pages/tutor/AddCourse.jsx";
import MyCourses from "./pages/tutor/MyCourses.jsx";
import StudentsEnrolled from "./pages/tutor/StudentsEnrolled.jsx";
import Navbar from "./components/scholar/Navbar.jsx";
import "quill/dist/quill.snow.css";

const App = () => {
  const isTutorRoute = useMatch("/tutor/*");

  return (
    <div className="text-default min-h-screen bg-white">
      {!isTutorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses-list" element={<CoursesList />} />
        <Route path="/courses-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:id" element={<Player />} /> {/* Fixed route */}
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/tutor" element={<Tutor />}>
          <Route path="/tutor" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="students-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
