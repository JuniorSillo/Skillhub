import React from "react";
import Hero from "../../components/scholar/Hero";
import Companies from "../../components/scholar/Companies";
import CoursesSec from "../../components/scholar/CoursesSec";
import Testimonials from "../../components/scholar/Testimonials";
import CallToAction from "../../components/scholar/CallToAction";
import Footer from "../../components/scholar/Footer";
import Loading from "../../components/scholar/Loading";

const Home = () => {
  return (
    <div className="flex flex-col items-center space-y-7 text-center bg-[#A53860] bg-gradient-to-b from-[#FFA5AB] to-[#DA627D] min-h-screen text-[#450920]">
      <Hero />
      <Companies />
      <CoursesSec />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
