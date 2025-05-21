import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/tutor/Navbar";
import Sidebar from "../../components/tutor/Sidebar";
import Footer from "../../components/tutor/Footer";

const Tutor = () => {
  return (
    <div className="text-[#450920] min-h-screen bg-[#A53860] bg-gradient-to-b from-[#FFA5AB] to-[#DA627D]">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 bg-[#F9DBBD]">{<Outlet />}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Tutor;
