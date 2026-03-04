import Image from "next/image";
import React from "react";
import logo from "../../../../../public/TT LogoTT Logo 1.png";
import { FaCommentDots, FaStar } from "react-icons/fa";

export default function Rating() {
  const reviews = [
    {
      id: 1,
      name: "Alex Daewn",
      rating: 5,
      date: "4 months ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "Alex Daewn",
      rating: 4,
      date: "4 months ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      name: "Alex Daewn",
      rating: 5,
      date: "4 months ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      name: "Alex Daewn",
      rating: 4,
      date: "4 months ago",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <>
      <section className="py-12 bg-white">
        <div className="w-full mx-auto px-4">
          <h3 className="text-[24px] font-semibold text-black/500 mb-[16px]">
            Rating & Reviews
            <div className="w-[40px] h-[4px] rounded-full bg-[#BE968E]"></div>
          </h3>

          <div className="w-full">
            {/* Grid applied inside */}
            <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-6">
              {/* Column 1 - Average rating */}
              <div className="text-center">
                <p className="text-[120px] font-bold text-black/500">
                  4,5{" "}
                  <span className="text-[#B0B0B0] font-medium text-[24px]">
                    /5
                  </span>
                </p>
              </div>

              {/* Column 2 - Rating bars */}
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-1">
                    <FaStar className="text-[#BE968E] text-[20px]" />
                    <span className="text-[20px] text-[#545454] flex items-center justify-center space-x-1 w-4">
                      {rating}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#BE968E] h-2 rounded-full"
                        style={{
                          width:
                            rating === 5
                              ? "67%"
                              : rating === 4
                              ? "15%"
                              : rating === 3
                              ? "6%"
                              : rating === 2
                              ? "3%"
                              : "9%",
                        }}
                      ></div>
                    </div>
                    <span className="text-[14px] font-medium text-[#545454] w-8">
                      {rating === 5
                        ? "67%"
                        : rating === 4
                        ? "15%"
                        : rating === 3
                        ? "6%"
                        : rating === 2
                        ? "3%"
                        : "9%"}
                    </span>
                  </div>
                ))}
              </div>

              {/* Column 3 - Total Reviews + Button */}
              <div className="text-center hidden md:block">
                <p className="text-[#545454] text-[16px] mb-3">Total Reviews</p>
                <p className="text-[60px] font-semibold text-black/500">3.0K</p>
                <button className="bg-[#BE968E] text-[16px] hover:bg-[#a87f78] text-white font-medium py-2 px-4 rounded-md transition flex items-center justify-center gap-2 mx-auto">
                  Add Comment
                  <FaCommentDots />
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-full mx-auto p-4 text-gray-800">
              {reviews.map((review) => (
                <div key={review.id} className=" my-[66px] last:border-none">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex relative items-center justify-center gap-2 mb-[32px]">
                      <h3 className="font-semibold text-black/500 text-[20px] ">
                        {review.name}{" "}
                      </h3>

                      <div className="flex items-center ">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            size={16}
                            className={
                              i < review.rating
                                ? "fill-[#BE968E] text-[#BE968E]"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>

                  <p className="text-sm text-black/500 leading-relaxed">
                    {review.text}
                  </p>
                </div>
              ))}
              <div className="absolute transform opacity-20 ">
                <Image
                  src={logo}
                  alt="logo"
                  width={98}
                  height={57.0976448059082}
                />
              </div>

              <div className="flex justify-center mt-6 ">
                <button className=" bg-[#F5F5F5] text-[14px] rounded-xl w-[207px] h-[53px]  text-[#BE968E] hover:bg-gray-100 transition-all">
                  View More Comments
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
