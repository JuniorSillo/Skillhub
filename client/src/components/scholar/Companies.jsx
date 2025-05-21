import React from "react";
import { assets } from "../../assets/assets";

const Companies = () => {
  return (
    <div className="pt-16 text-center pb-10">
      <p className="text-lg font-semibold text-[#450920]">
        Trusted by learners from
      </p>
      <div className="flex items-center justify-start gap-6 md:gap-16 md:mt-10 mt-5">
        <img
          src={assets.google_logo}
          alt="Google"
          className="w-12 h-12 md:w-28 opacity-80 hover:opacity-100 transition duration-300 object-contain"
        />
        <img
          src={assets.github_logo}
          alt="GitHub"
          className="w-12 h-12 md:w-28 opacity-80 hover:opacity-100 transition duration-300 object-contain"
        />
        <img
          src={assets.amazon}
          alt="Amazon"
          className="w-12 h-12 md:w-28 opacity-80 hover:opacity-100 transition duration-300 object-contain"
        />
        <img
          src={assets.apple_logo}
          alt="Apple"
          className="w-12 h-12 md:w-28 opacity-80 hover:opacity-100 transition duration-300 object-contain"
        />
        <img
          src={assets.windows_logo}
          alt="Windows"
          className="w-12 h-12 md:w-28 opacity-80 hover:opacity-100 transition duration-300 object-contain"
        />
        <img
          src={assets.paypal_logo}
          alt="PayPal"
          className="w-12 h-12 md:w-28 opacity-80 hover:opacity-100 transition duration-300 object-contain"
        />
      </div>
    </div>
  );
};

export default Companies;
