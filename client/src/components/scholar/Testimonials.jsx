import React from "react";
import { assets, dummyTestimonial } from "../../assets/assets";

const Testimonials = () => {
  return (
    <div className="pb-14 px-8 md:px-0">
      <h2 className="text-3xl font-semibold text-[#A53860]">What Our Users Say</h2>
      <p className="md:text-base text-gray-700 mt-3">
        Discover how our platform has transformed lives through innovative learning experiences. <br />
        Hear from our community about their journeys and successes.
      </p>
      <div className="grid grid-cols-auto gap-8 mt-14">
        {dummyTestimonial.map((testimonial, index) => (
          <div
            key={index}
            className="text-sm text-left border border-gray-300 pb-6 rounded-lg bg-white shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105"
          >
            <div className="flex items-center gap-4 px-5 py-4 bg-[#450920]/10">
              <img
                className="h-12 w-12 rounded-full border-2 border-[#A53860]"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {testimonial.name}
                </h1>
                <p className="text-gray-700/80">{testimonial.role}</p>
              </div>
            </div>
            <div className="p-5 pb-7">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <img
                    className="h-5"
                    key={i}
                    src={
                      i < Math.floor(testimonial.rating)
                        ? assets.star
                        : assets.star_blank
                    }
                    alt=""
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-5">{testimonial.feedback}</p>
            </div>
            <a href="#" className="text-[#A53860] underline px-5 font-medium">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
