import React from "react";
import { BookOpen } from "lucide-react"; // Lucide icon for a study/book effect

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      {/* Animated Icon */}
      <div className="relative w-16 sm:w-20 aspect-square animate-spin-very-slow">
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className="w-16 h-16 text-blue-500" />
        </div>
      </div>

      {/* Loading Text */}
      <p className="text-gray-600 text-lg font-medium animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
