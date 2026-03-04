"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import image1 from "../../../../../public/dress1.png";
import image2 from "../../../../../public/61GoUmCw1PL._AC_SX679_-removebg-preview.png";
import image3 from "../../../../../public/61K-51V+wsL._AC_SX679_-removebg-preview.png";
import image4 from "../../../../../public/81jorIOyDhL._AC_SX679_-removebg-preview.png";
import { IoBagAddOutline, IoHeartOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wishlist, setWishlist] = useState<{ [key: number]: boolean }>({});
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const products = [
    {
      id: 1,
      name: "2019 Apple MacBook Pro with 2.4GHz Intel Core i9",
      price: 699.0,
      originalPrice: 1128.0,
      image: image1,
      rating: 4,
      reviews: 738,
      color: "black",
      category: "category",
    },
    {
      id: 2,
      name: "Simple Mobile 4G LTE Prepaid Smartphone",
      price: 1500.0,
      image: image2,
      rating: 4,
      reviews: 536,
      color: "white",
      category: "category",
    },
    {
      id: 3,
      name: "Sony DSCHX8 High Zoom Point & Shoot Camera",
      price: 1203.0,
      image: image3,
      rating: 5,
      reviews: 423,
      color: "brown",
      category: "category",
    },
    {
      id: 4,
      name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor",
      price: 250.0,
      image: image4,
      rating: 4,
      reviews: 672,
      color: "blue",
      category: "category",
    },
    {
      id: 5,
      name: "4K UHD LED Smart TV with Chromecast Built-in",
      price: 865.99,
      image: image1,
      rating: 5,
      reviews: 945,
      color: "black",
      category: "category",
    },
    {
      id: 7,
      name: "4K UHD LED Smart TV with Chromecast Built-in",
      price: 865.99,
      image: image1,
      rating: 5,
      reviews: 945,
      color: "black",
      category: "category",
    },
    {
      id: 6,
      name: "4K UHD LED Smart TV with Chromecast Built-in",
      price: 865.99,
      image: image1,
      rating: 5,
      reviews: 945,
      color: "black",
      category: "category",
    },
  ];

  // Responsive number of visible items
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(5);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderStars = (rating: number) => (
    <div className="flex items-center justify-center gap-0.5">
      <FaStar size={16} className={"fill-[#BE968E] text-[#BE968E]"} />
      <span className="text-black/500 text-[12px]"> {rating}</span>
    </div>
  );

  const getColorDot = (color: string): string => {
    const colors: Record<string, string> = {
      black: "bg-black",
      white: "bg-white border border-gray-300",
      brown: "bg-amber-800",
      blue: "bg-blue-500",
    };
    return colors[color] || "bg-gray-400";
  };

  return (
    <div className="w-full   px-2 sm:px-4 py-4 sm:py-8">
      <div className="relative">
        {/* Products Container */}
        <div className="overflow-x-hidden overflow-y-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-1 sm:px-2"
                style={{ width: `288px`, height: "384px" }}
              >
                <div className="bg-white rounded-lg   p-2 sm:p-4 hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative aspect-square mb-2 sm:mb-3  rounded-lg overflow-hidden group">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full p-9 border border-[#0000000D] h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-300 ease-in-out"
                    />

                    {/* Wishlist Button */}
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all"
                        aria-label="Add to cart"
                      >
                        <div className="w-[36px] h-[36px] border border-[#4040401A] rounded-lg flex justify-center items-center">
                          <IoBagAddOutline className="text-primary text-[24px]" />
                        </div>
                      </button>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center transition-all"
                        aria-label="Add to wishlist"
                      >
                        <div
                          className={`w-[36px] h-[36px] border text-primary border-[#4040401A] rounded-lg flex justify-center items-center transition-all ${
                            wishlist[product.id] ? "bg-primary/10" : ""
                          }`}
                        >
                          <IoHeartOutline
                            className={`text-[24px] transition-colors ${
                              wishlist[product.id]
                                ? "text-primary"
                                : "text-primary/50"
                            }`}
                          />
                        </div>
                      </button>
                    </div>

                    {/* Discount Badge */}
                    {product.originalPrice && (
                      <div className="absolute flex justify-center items-center top-1 left-1 sm:top-2 border border-[#4040401A] sm:left-2 bg-[#FFFFFF4D] text-primary text-[10px] sm:text-xs font-semibold w-[74px] h-[30px] sm:px-2 sm:py-1 rounded">
                        {Math.round(
                          (1 - product.price / product.originalPrice) * 100
                        )}
                        % OFF
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[12px] text-[#545454] font-medium">
                        {product.category}
                      </span>
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        {renderStars(product.rating)}
                        <span className="text-[10px] sm:text-xs text-[#545454]">
                          ({product.reviews})
                        </span>
                      </div>
                    </div>
                    <h3 className="text-[14px]  font-medium text-[black/500] line-clamp-2 leading-snug min-h-[2rem] sm:min-h-[2.5rem]">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          <span className="text-[16px] me-1 font-medium text-black/500">
                            AED
                          </span>
                          {product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs flex justify-between items-center gap-1 sm:text-sm text-gray-400 ">
                            <span className="line-through">
                              AED {product.originalPrice.toFixed(2)}
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Color Options */}
                      <div className="flex items-center gap-1.5 sm:gap-2 pt-0.5 sm:pt-1">
                        <div
                          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${getColorDot(
                            product.color
                          )} cursor-pointer ring-2 ring-gray-300`}
                        ></div>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-300 cursor-pointer hover:ring-2 hover:ring-gray-400"></div>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-400 cursor-pointer hover:ring-2 hover:ring-gray-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex mt-16 justify-center items-center gap-4 ">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-[50px] h-[50px] rounded-full bg-[#E8EDF2] shadow-lg flex items-center justify-center  disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-gray-200"
            aria-label="Previous"
          >
            <IoIosArrowBack className="w-5 h-5 text-[#020202]" />
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            className="w-[50px] h-[50px] rounded-full bg-primary shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-gray-200"
            aria-label="Next"
          >
            <IoIosArrowForward className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
