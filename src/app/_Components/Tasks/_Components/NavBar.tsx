"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import logo from "../../../../../public/TT LogoTT Logo 1.png";
import Link from "next/link";
import { RiApps2Line, RiHeart3Line, RiHome6Line } from "react-icons/ri";
import {
  HiOutlineCursorArrowRipple,
  HiOutlineInformationCircle,
} from "react-icons/hi2";
import { BiIdCard } from "react-icons/bi";
import { TbShoppingBag } from "react-icons/tb";
import { IoIosArrowDown, IoMdNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";

// Types for better TypeScript support
interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

interface DropdownItem {
  href: string;
  label: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Navigation items configuration
  const navItems: NavItem[] = [
    {
      href: "/",
      label: "Home",
      icon: <RiHome6Line />,
      isActive: true,
    },
    {
      href: "/categories",
      label: "Our Category",
      icon: <RiApps2Line />,
    },
    {
      href: "/about",
      label: "About Us",
      icon: <HiOutlineCursorArrowRipple width={20} height={20} />,
    },
    {
      href: "/contact",
      label: "Contact Us",
      icon: <BiIdCard />,
    },
    {
      href: "/faqs",
      label: "FAQs",
      icon: <HiOutlineInformationCircle />,
    },
  ];

  // Dropdown items configuration
  const dropdownItems: DropdownItem[] = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/settings", label: "Settings" },
    { href: "/earnings", label: "Earnings" },
    { href: "/signout", label: "Sign out" },
  ];

  // Language options configuration
  const languageOptions = [
    { code: "EN", label: "English" },
    { code: "ES", label: "Español" },
    { code: "FR", label: "Français" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle dropdown toggle
  const toggleDropdown = (dropdownId: string) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className=" flex items-center justify-between mx-auto p-4">
        {/* Logo and Main Navigation */}
        <div className="flex justify-between items-center space-x-[42.5px]">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
            aria-label="Home"
          >
            <Image src={logo} alt="TT Logo" width={50} height={50} />
          </Link>
          
          {/* Main Navigation Menu - Desktop */}
          <div
            className="hidden md:block md:w-auto"
            id="navbar-default"
          >
            <ul
              className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg
          md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0
          dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            >
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`block py-2 px-3 rounded-sm md:bg-transparent md:p-0 transition-colors duration-200 ${
                      item.isActive 
                        ? "text-gray-800 dark:text-white" 
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                    aria-current={item.isActive ? "page" : undefined}
                  >
                    <div className="flex gap-2 items-center rtl:space-x-reverse text-[14px]">
                      <div className={`flex items-center justify-center ${
                        item.isActive ? "text-gray-800" : "text-gray-500"
                      }`}>
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={(e) => handleKeyDown(e, () => setIsOpen(!isOpen))}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 
          focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition-colors duration-200"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close main menu" : "Open main menu"}
        >
          <span className="sr-only">{isOpen ? "Close main menu" : "Open main menu"}</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Right Side Navigation - Action Items - Desktop */}
        <div
          className="hidden md:block md:w-auto"
          id="navbar-actions"
        >
          <ul
            className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg 
          md:flex-row md:space-x-4 rtl:space-x-reverse md:mt-0 md:border-0 
          dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
          >
            {/* Shopping Cart */}
            <li>
              <Link
                href="/cart"
                className="block py-2 px-3 text-gray-800 rounded-sm md:bg-transparent md:p-0 dark:text-white transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Shopping cart"
              >
                <div className="flex gap-1 items-center rtl:space-x-reverse">
                  <TbShoppingBag size={24} />
                </div>
              </Link>
            </li>
            

            {/* Notifications */}
            <li>
              <Link
                href="/notifications"
                className="block py-2 px-3 text-gray-800 rounded-sm md:bg-transparent md:p-0 dark:text-white transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Notifications"
              >
                <div className="flex gap-1 items-center rtl:space-x-reverse">
                  <IoMdNotificationsOutline size={24} />
                </div>
              </Link>
            </li>

            {/* Wishlist */}
            <li>
              <Link
                href="/wishlist"
                className="block py-2 px-3 text-gray-800 rounded-sm md:bg-transparent md:p-0 dark:text-white transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Wishlist"
              >
                <div className="flex gap-1 items-center rtl:space-x-reverse">
                  <RiHeart3Line size={24} />
                </div>
              </Link>
            </li>

            {/* Language Dropdown */}
            <li>
              <div className="relative">
                <button
                  id="languageDropdownButton"
                  onClick={() => toggleDropdown("language")}
                  onKeyDown={(e) => handleKeyDown(e, () => toggleDropdown("language"))}
                  className="text-[14px] text-gray-800 rounded-sm md:bg-transparent md:p-0 dark:text-white transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                  type="button"
                  aria-expanded={openDropdown === "language"}
                  aria-haspopup="true"
                  aria-label="Language selection"
                >
                  <div className="flex justify-center items-center gap-1">
                    <span>EN</span>
                    <IoIosArrowDown 
                      className={`transition-transform duration-200 ${
                        openDropdown === "language" ? "rotate-180" : ""
                      }`} 
                    />
                  </div>
                </button>
                
                {/* Language Dropdown menu */}
                <div
                  id="languageDropdown"
                  className={`absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 transition-all duration-200 ${
                    openDropdown === "language" ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="languageDropdownButton"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  >
                    {languageOptions.map((option, index) => (
                      <li key={index}>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                          role="menuitem"
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>

            {/* Profile Dropdown */}
            <li>
              <div className="relative">
                <button
                  id="profileDropdownButton"
                  onClick={() => toggleDropdown("profile")}
                  onKeyDown={(e) => handleKeyDown(e, () => toggleDropdown("profile"))}
                  className="text-[14px] text-gray-800 rounded-sm md:bg-transparent md:p-0 dark:text-white transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                  type="button"
                  aria-expanded={openDropdown === "profile"}
                  aria-haspopup="true"
                  aria-label="Profile menu"
                >
                  <div className="flex justify-center items-center gap-1">
                    <CiUser size={15} />
                    <IoIosArrowDown 
                      className={`transition-transform duration-200 ${
                        openDropdown === "profile" ? "rotate-180" : ""
                      }`} 
                    />
                  </div>
                </button>
                
                {/* Profile Dropdown menu */}
                <div
                  id="profileDropdown"
                  className={`absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 transition-all duration-200 ${
                    openDropdown === "profile" ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="profileDropdownButton"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  >
                    {dropdownItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                          role="menuitem"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu Content - Both navigation sections appear one after another */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full md:hidden`}
        id="navbar-mobile"
      >
        {/* Main Navigation Menu - First */}
        <ul
          className="font-medium flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-100 mx-4
          dark:bg-gray-800 dark:border-gray-700"
        >
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`block py-2 px-3 rounded-sm transition-colors duration-200 ${
                  item.isActive 
                    ? "text-gray-800 dark:text-white" 
                    : "text-gray-500 dark:text-gray-400"
                }`}
                aria-current={item.isActive ? "page" : undefined}
              >
                <div className="flex gap-2 items-center rtl:space-x-reverse text-[14px]">
                  <div className={`flex items-center justify-center ${
                    item.isActive ? "text-gray-800" : "text-gray-500"
                  }`}>
                    {item.icon}
                  </div>
                  <span>{item.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        {/* Action Items - Second */}
        <ul
          className="font-medium flex flex-col p-4 mt-2 border border-gray-100 rounded-lg bg-gray-100 mx-4 mb-4
          dark:bg-gray-800 dark:border-gray-700"
        >
          {/* Shopping Cart */}
          <li>
            <Link
              href="/cart"
              className="block py-2 px-3 text-gray-800 rounded-sm dark:text-white transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Shopping cart"
            >
              <div className="flex gap-1 items-center rtl:space-x-reverse">
                <TbShoppingBag size={24} />
              </div>
            </Link>
          </li>

          {/* Notifications */}
          <li>
            <Link
              href="/notifications"
              className="block py-2 px-3 text-gray-800 rounded-sm dark:text-white transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Notifications"
            >
              <div className="flex gap-1 items-center rtl:space-x-reverse">
                <IoMdNotificationsOutline size={24} />
              </div>
            </Link>
          </li>

          {/* Wishlist */}
          <li>
            <Link
              href="/wishlist"
              className="block py-2 px-3 text-gray-800 rounded-sm dark:text-white transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Wishlist"
            >
              <div className="flex gap-1 items-center rtl:space-x-reverse">
                <RiHeart3Line size={24} />
              </div>
            </Link>
          </li>

          {/* Language Dropdown */}
          <li>
            <div className="relative">
              <button
                id="mobileLanguageDropdownButton"
                onClick={() => toggleDropdown("language")}
                onKeyDown={(e) => handleKeyDown(e, () => toggleDropdown("language"))}
                className="text-[14px] text-gray-800 rounded-sm dark:text-white transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                type="button"
                aria-expanded={openDropdown === "language"}
                aria-haspopup="true"
                aria-label="Language selection"
              >
                <div className="flex justify-center items-center gap-1">
                  <span>EN</span>
                  <IoIosArrowDown 
                    className={`transition-transform duration-200 ${
                      openDropdown === "language" ? "rotate-180" : ""
                    }`} 
                  />
                </div>
              </button>
              
              {/* Language Dropdown menu */}
              <div
                id="mobileLanguageDropdown"
                className={`absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 transition-all duration-200 ${
                  openDropdown === "language" ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="mobileLanguageDropdownButton"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                >
                  {languageOptions.map((option, index) => (
                    <li key={index}>
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                        role="menuitem"
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          {/* Profile Dropdown */}
          <li>
            <div className="relative">
              <button
                id="mobileProfileDropdownButton"
                onClick={() => toggleDropdown("profile")}
                onKeyDown={(e) => handleKeyDown(e, () => toggleDropdown("profile"))}
                className="text-[14px] text-gray-800 rounded-sm dark:text-white transition-colors duration-200 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
                type="button"
                aria-expanded={openDropdown === "profile"}
                aria-haspopup="true"
                aria-label="Profile menu"
              >
                <div className="flex justify-center items-center gap-1">
                  <CiUser size={15} />
                  <IoIosArrowDown 
                    className={`transition-transform duration-200 ${
                      openDropdown === "profile" ? "rotate-180" : ""
                    }`} 
                  />
                </div>
              </button>
              
              {/* Profile Dropdown menu */}
              <div
                id="mobileProfileDropdown"
                className={`absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700 transition-all duration-200 ${
                  openDropdown === "profile" ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="mobileProfileDropdownButton"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                >
                  {dropdownItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-colors duration-200"
                        role="menuitem"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
