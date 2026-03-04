import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";

import logo from "../../../../../public/TT LogoTT Logo 1.png";
import { MdLocalPhone } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";

export default function Footer() {
  
  return (
    <footer className="relative min-h-[323px] bg-[url('/footer.png')]  bg-center bg-cover bg   text-white py-10 px-6 md:px-16 bg-no-repeat">
      {/* Overlay Layer */}
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      {/* Content Layer */}
      <div className="relative container mx-auto z-10 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Logo and description */}
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <Image
              src={logo}
              alt="Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
          </div>
          <p className="text-[14px] text-white/70 font-medium leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div className="grid grid-cols-2">
          {/* Contact Us */}
          <div className="md:hidden">
            <h3 className="font-semibold text-white mb-4 text-[24px]">
              Contact Us
            </h3>
            <ul className="space-y-2 text-white text-[14px]">
              <li>
                <div className="">
                  <div className="flex items-center gap-2">
                    <MdLocalPhone className="text-[24px] text-[#F0F0F0]" />
                    +87 01928491
                  </div>
                </div>{" "}
              </li>
              <li>
                <div className="">
                  <div className="flex items-center gap-2">
                    <SiGmail className="text-[24px] text-[#F0F0F0]" />
                    Named@gmail.com
                  </div>
                </div>{" "}
              </li>
              <li>
                <div className="">
                  <div className="flex items-center gap-2">
                    <FaLocationDot className="text-[24px] text-[#F0F0F0]" />
                    381, cairo, egypt
                  </div>
                </div>{" "}
              </li>
            </ul>
          </div>

          {/* Let Us Help */}
          <div>
            <h3 className="font-semibold mb-4 text-white text-[24px]">
              Let Us Help
            </h3>
            <ul className="space-y-2 text-white/70 text-[16px]">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  All Products
                </a>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div className="hidden md:block">
            <h3 className="font-semibold text-white mb-4 text-[24px]">
              Policies
            </h3>
            <ul className="space-y-2 text-white/70 text-[16px]">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cancellation Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Send Email */}
        <div>
          <h3 className="font-semibold mb-4 text-white text-[24px]">
            Send Email
          </h3>

          {/* Input + Button */}
          <div className="relative mb-4 w-full max-w-[369px]">
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-[56px] md:h-[62px] px-4 placeholder:text-gray-400 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 pr-[120px] md:pr-[135px]"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 bg-primary hover:bg-[#b99987] text-white font-medium rounded-lg md:rounded-xl w-[100px] md:w-[135px] h-[42px] md:h-[46px] transition-all shadow-md">
              Send
            </button>
          </div>

          <p className="text-[16px] text-white mb-2">Follow Us</p>
          <div className="flex space-x-4 text-gray-300 text-lg">
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors"
              aria-label="Telegram"
            >
              <FaTelegramPlane />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
