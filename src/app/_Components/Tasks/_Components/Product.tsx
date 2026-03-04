"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdHeartEmpty,
} from "react-icons/io";
import shirt1 from "../../../../../public/128675430_50654237-removebg-preview.png";
import shirt2 from "../../../../../public/360_F_649571437_eo442p0EwFcdkUOoeocbdi7VKl4VWqRP-removebg-preview.png";
import shirt3 from "../../../../../public/young-adult-man-wearing-hoodie-beanie 1.png";
import { IoBagAddOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";

export default function Product() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("blue");
  const [quantity, setQuantity] = useState(1);
  const [selectedType, setSelectedType] = useState("Cotton");
  const [selectedSize, setSelectedSize] = useState("2XL");

  const productImages = [shirt1, shirt2, shirt3];

  const thumbnailImages = [shirt1, shirt2, shirt3];

  const colors = [
    { name: "red", value: "bg-red-500" },
    { name: "blue", value: "bg-blue-500" },
    { name: "olive", value: "bg-green-600" },
    { name: "light blue", value: "bg-blue-300" },
    { name: "dark gray", value: "bg-gray-700" },
  ];

  return (
    <div className="container mx-auto">
      <div className="bg-[#ECECEC66] rounded-xl mt-4  py-4">
        <div className="max-w-7xl ms-[32px] ">
          <nav className="text-sm text-[#020202] text-[16px] font-medium">
            <span>Home</span>
            <span className="mx-2">&gt;</span>
            <span>Our Category</span>
            <span className="mx-2">&gt;</span>
            <span className="text-[#8A8A8A] font-medium">Product Details</span>
          </nav>
        </div>
      </div>
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Product Images */}
            <div className="space-y-4 relative">
              {/* Main Image */}
              <div className="relative w-full h-[500px]">
                <Image
                  src={productImages[selectedImage]}
                  alt="Product"
                  fill
                  className="object-contain bg-[#F5F5F5] rounded-2xl p-2"
                  priority
                />

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    setSelectedImage(
                      (prev) =>
                        (prev - 1 + productImages.length) % productImages.length
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#C4C4C4]  p-2 rounded-full shadow-lg"
                >
                  <IoIosArrowBack className="w-5 h-5 text-[#FFFFFF]" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage(
                      (prev) => (prev + 1) % productImages.length
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary  p-2 rounded-full shadow-lg"
                >
                  <IoIosArrowForward className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-3">
                {thumbnailImages.map((thumb, index) => (
                  <div className="relative" key={index}>
                    <Image
                      src={thumb}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-[523px] h-[183px] bg-[#F5F5F5]  object-contain rounded-xl cursor-pointer hover:opacity-75 `}
                      onClick={() => setSelectedImage(index)}
                      width={200} // Specify the desired width of the image
                      height={200} // Specify the desired height of the image
                      quality={90} // Optional: Specify the image quality (0-100)
                      loading="lazy" // Optional: Specify the image loading strategy
                    />
                    {index === 3 && (
                      <div className="absolute inset-0 bg-[#020202B2] rounded-2xl flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          +2
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              {/* Category Tag */}
              <div className="flex justify-between items-center">
                <div className="text-[#BE968E] flex justify-center items-center border border-[#BE968E] rounded-full text-[14px] font-semibold w-[82px] h-[37px]">
                  T-Shirt
                </div>
                <div className="flex gap-1 justify-between items-center">
                  <div className="w-[48px] h-[48px] border border-[#4040401A] rounded-2xl flex justify-center items-center">
                    <IoBagAddOutline className="text-primary text-[24px] " />
                  </div>
                  <div className="w-[48px] h-[48px] border border-[#4040401A] rounded-2xl flex justify-center items-center">
                    <IoMdHeartEmpty className="text-primary text-[24px] " />
                  </div>
                </div>
              </div>

              {/* Product Title */}
              <h2 className="text-[24px] font-medium text-black/500 leading-tight">
                J.VER Man Shirts Solid Long Sleeve Stretch Wrinkle-Free With
                Blue
              </h2>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-[20px] font-medium text-black/500">
                    $300.00
                  </span>
                  <span className="text-[16px] font-normal text-gray/200  line-through">
                    $360.00
                  </span>
                </div>
                <p className="text-[12px] font-normal text-[#333333]">
                  This price is exclusive of taxes
                </p>
              </div>

              {/* Description */}
              <p className="text-black/500 font-normal text-[14px] leading-relaxed">
                Lorem ipsum dolor sit, consectetuer adipiscing elit, sed diam
                nonummy Lorem ipsum dolor sit amet, diam nonummy
              </p>
              <div className="h-[2px] w-full bg-[#E6E6E6]"></div>
              {/* Type Dropdown */}
              <div className="relative w-[300px] h-[55px]">
                <select
                  id="type"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="peer w-full h-[55px] px-3 pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-800"
                >
                  <option value="Cotton">Cotton</option>
                  <option value="Polyester">Polyester</option>
                  <option value="Blend">Blend</option>
                </select>

                <label
                  htmlFor="type"
                  className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
               peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:text-blue-500 
               peer-valid:text-xs peer-valid:-translate-y-2"
                >
                  Type
                </label>

                {/* Optional: Dropdown arrow icon */}
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Size Dropdown */}
              <div className="relative w-[300px] h-[55px]">
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="peer w-full h-[55px] px-3 pt-5 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none text-gray-800"
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="2XL">2XL</option>
                </select>

                <label
                  htmlFor="size"
                  className="absolute left-3 top-3 text-gray-500 text-sm transition-all 
               peer-focus:text-xs peer-focus:-translate-y-2 peer-focus:text-blue-500 
               peer-valid:text-xs peer-valid:-translate-y-2"
                >
                  Size
                </label>

                {/* سهم الاختيار */}
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {/* Colors */}
              <div>
                <label className="block text-[20px] font-medium text-black/500 mb-3">
                  Colors
                </label>
                <div className="flex space-x-3">
                  {colors.map((color) => (
                    <div
                      className="flex flex-col justify-center  items-center"
                      key={color.name}
                    >
                      <div
                        className={`${
                          color.name === selectedColor
                            ? " w-12 h-12 border border-black/500 "
                            : ""
                        } flex justify-center items-center rounded-full`}
                        key={color.name}
                      >
                        <button
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-8 h-8 rounded-full ${color.value}  `}
                        />
                      </div>
                      <span className="text-[#545454] text-[14px] font-medium">
                        {selectedColor === color.name && color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center justify-between w-full mt-6">
                {/* Quantity Section */}
                <div>
                  <p className="font-medium text-[20px] text-black/500">
                    Quantity{" "}
                    <span className="text-[#8A8A8A] text-[16px]">
                      ($300.00 for Piece)
                    </span>
                  </p>

                  <div className="flex items-center mt-2 space-x-4">
                    {/* Counter */}
                    <div className="flex items-center bg-[#F5F5F5] rounded-lg px-2">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium text-gray-800">
                        {quantity.toString().padStart(2, "0")}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-black transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <p className="text-[24px] font-medium text-black/500">
                      ${(300 * quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Add To Cart Button */}
                <button className=" hidden md:flex items-center justify-center gap-2 bg-[#BE968E] hover:bg-[#a87f78] text-white font-medium w-full md:w-[234] h-[56px] rounded-lg transition">
                  <span>Add To Cart</span>
                  <div className="">
                    <HiOutlineShoppingBag className="w-6 h-6" />
                  </div>
                </button>
              </div>
              <button className="flex items-center md:hidden justify-center gap-2 bg-[#BE968E] hover:bg-[#a87f78] text-white font-medium w-full md:w-[234] h-[56px] rounded-lg transition">
                <span>Add To Cart</span>
                <div className="">
                  <HiOutlineShoppingBag className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
