import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#A53860] md:px-36 text-left w-full mt-10 text-[#F9DBBD]">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-[#F9DBBD]/30">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo} alt="logo" />
          <p className="mt-6 text-center md:text-left text-sm text-[#F9DBBD]/80">
            Empowering innovation and creativity, we bring technology to life
            with seamless solutions and exceptional experiences.
          </p>
        </div>
        <div className="flex flex-col md:items-start items-center w-full">
          <h2 className="font-semibold text-[#F9DBBD] mb-5">Company</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-sm text-[#F9DBBD]/80">
            <li>
              <a href="#" className="hover:text-[#450920] transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#450920] transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#450920] transition-colors">
                Courses
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#450920] transition-colors">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#450920] transition-colors">
                Testimonials
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#450920] transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#450920] transition-colors">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#450920] transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#450920] transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div className="hidden md:flex flex-col items-start w-full">
          <h2 className="font-semibold text-[#F9DBBD] mb-5">
            Subscribe to our newsletter
          </h2>
          <p className="text-sm text-[#F9DBBD]/80">
            The latest news, articles, and resources, sent to your inbox weekly
          </p>
          <div className="flex items-center gap-2 pt-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-[#F9DBBD]/30 bg-[#FFA5AB]/20 text-[#450920] placeholder-[#A53860] outline-none w-64 h-9 rounded px-2 text-sm"
            />
            <button className="bg-[#DA627D] w-24 h-9 text-white rounded hover:bg-[#A53860] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs text-[#F9DBBD]/60 md:text-sm">
        Copyright © {new Date().getFullYear()} SkillHub. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
