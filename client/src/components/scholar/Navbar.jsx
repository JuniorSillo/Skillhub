import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "../../context/AppContext";

const Navbar = () => {
  const { navigate, isTutor } = useContext(AppContext);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [showWelcome, setShowWelcome] = useState(false); // State for welcome message

  // Show welcome message when user logs in
  useEffect(() => {
    if (user) {
      setShowWelcome(true);
      // Hide welcome message after 5 seconds
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [user]);

  return (
    <div
      className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 
                 border-b border-[#F9DBBD]/20 py-4 bg-[#A53860] shadow-lg 
                 bg-gradient-to-b from-[#FFA5AB] to-[#DA627D]"
    >
      {/* Welcome Message (Toast) */}
      {showWelcome && user && (
        <div
          className="absolute top-16 left-1/2 transform -translate-x-1/2 p-4 bg-[#F9DBBD] text-[#450920] rounded-lg shadow-md 
                     animate-bounce z-50 flex items-center gap-2 max-w-xs"
        >
          <span>
            🎉 Welcome, {user.firstName || user.username || "User"}! 🥳
          </span>
          <span>Let’s celebrate your learning journey! 🎈✨</span>
        </div>
      )}

      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-28 lg:w-32 cursor-pointer"
      />
      <div className="hidden md:flex items-center gap-6 text-[#F9DBBD]">
        <div className="flex items-center gap-4 text-sm">
          {user && (
            <>
              <button
                onClick={() => navigate("/tutor")}
                className="hover:text-[#450920] transition-colors"
              >
                {isTutor ? "Tutor Dashboard" : "Become a Tutor"}
              </button>
              <span>|</span>
              <Link
                to="/my-enrollments"
                className="hover:text-[#450920] transition-colors"
              >
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-[#DA627D] text-white px-5 py-2 rounded-full hover:bg-[#A53860] transition-colors"
          >
            Create Account
          </button>
        )}
      </div>
      <div className="md:hidden flex items-center gap-2 sm:gap-4 text-[#F9DBBD]">
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          {user && (
            <>
              <button
                onClick={() => navigate("/tutor")}
                className="hover:text-[#450920] transition-colors"
              >
                {isTutor ? "Tutor" : "Join"}
              </button>
              <span>|</span>
              <Link
                to="/my-enrollments"
                className="hover:text-[#450920] transition-colors"
              >
                Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="user" className="invert w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
