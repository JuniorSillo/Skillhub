import React from "react";
import { assets } from "../../assets/assets";
import Searchbar from "./Searchbar";

const Hero = () => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center 
                    "
    >
      <h1 className="md:text-home-heading-large text-home-heading-small relative font-bold text-[#450920] max-w-3xl mx-auto">
        Transform your future with courses that{" "}
        <span className="text-[#A53860]">align with your ambitions.</span>
      </h1>

      <p className="md:block hidden text-[#450920] max-w-2xl mx-auto">
        Learn from top experts, engage with dynamic content, and thrive in a
        community that fuels your success - because your growth is our mission.
      </p>

      <p className="md:hidden text-[#450920] max-w-sm mx-auto">
        We bring together world-class instructors to help you achieve your
        professional goals.
      </p>
      <Searchbar />
    </div>
  );
};

export default Hero;
