import React from "react";
import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-36">
      <h1 className="text-xl md:text-4xl text-[#450920] font-semibold text-center">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-[#A53860] text-sm md:text-base text-center max-w-2xl">
        Unlock your potential with flexible, expert-led courses designed to fit your schedule. 
        From coding to creativity, we’ve got the tools to help you grow, no matter where you are.
      </p>
      <div className="flex items-center font-medium gap-6 mt-4">
        <button className="px-6 py-2 md:px-10 md:py-3 rounded-md text-white bg-[#DA627D] hover:bg-[#A53860] transition-colors">
          Get Started
        </button>
        <button className="flex items-center gap-2 text-[#450920] hover:text-[#A53860] transition-colors">
          Learn More <img src={assets.arrow_icon} alt="arrow_icon" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CallToAction;