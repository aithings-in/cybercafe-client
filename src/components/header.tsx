"use client";

import Link from "next/link";
import Button from "@/components/button";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLocale } from "@/contexts/LocaleContext";
import { Languages } from "lucide-react";

export default function Header() {
  const { t } = useTranslation();
  const { locale, toggleLocale } = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    string | null
  >(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Prevent scrolling when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling when menu is closed
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`header min-h-[80px] w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 transition-all duration-300 fixed top-0 left-0 right-0 z-50 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      id="frame-panel"
      data-cursor-element-id="cursor-el-5"
    >
      {/* Circuit Board Background Pattern - Only visible when not scrolled */}
      {!isScrolled && (
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
          >
            {/* Circuit lines */}
            <path
              d="M50,20 L150,20 L150,40 L250,40 L250,60 L350,60"
              stroke="#00d4ff"
              strokeWidth="1"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M80,50 L180,50 L180,70 L280,70"
              stroke="#00d4ff"
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M120,30 L220,30 L220,50 L320,50"
              stroke="#00d4ff"
              strokeWidth="1"
              fill="none"
              opacity="0.35"
            />
            {/* Glowing dots */}
            <circle cx="150" cy="20" r="2" fill="#00d4ff" opacity="0.6">
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="250" cy="40" r="2" fill="#00d4ff" opacity="0.6">
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="350" cy="60" r="2" fill="#00d4ff" opacity="0.6">
              <animate
                attributeName="opacity"
                values="0.3;0.8;0.3"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="180" cy="50" r="1.5" fill="#00d4ff" opacity="0.5">
              <animate
                attributeName="opacity"
                values="0.2;0.7;0.2"
                dur="2.2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="280" cy="70" r="1.5" fill="#00d4ff" opacity="0.5">
              <animate
                attributeName="opacity"
                values="0.2;0.7;0.2"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      )}

      {/* Logo - Left aligned */}
      <div className="flex items-center z-10">
        <Link
          href="/"
          className={`font-bold text-lg sm:text-xl transition-colors ${
            isScrolled ? "text-gray-800" : "text-white"
          }`}
        >
          {t("header.title")}
        </Link>
      </div>

      {/* Desktop Navigation - Centered */}
      <nav className="hidden lg:flex items-center gap-4 xl:gap-6 absolute left-1/2 transform -translate-x-1/2 z-10">
        {/* Home Dropdown */}
        <div className="relative">
          <Link
            href="/"
            className={`transition-colors text-sm flex items-center gap-1 ${
              isScrolled
                ? activeDropdown === "home"
                  ? "text-gray-900"
                  : "text-gray-700 hover:text-gray-900"
                : activeDropdown === "home"
                ? "text-cyan-400"
                : "text-white hover:text-cyan-400"
            }`}
          >
            {t("common.home")}
          </Link>
        </div>

        <Link
          href="/about"
          className={`transition-colors text-sm ${
            isScrolled
              ? "text-gray-700 hover:text-gray-900"
              : "text-white hover:text-cyan-400"
          }`}
        >
          {t("common.about")}
        </Link>

        {/* Services Dropdown */}
        <div className="relative">
          <Link
            href="/services"
            className={`transition-colors text-sm flex items-center gap-1 ${
              isScrolled
                ? activeDropdown === "services"
                  ? "text-gray-900"
                  : "text-gray-700 hover:text-gray-900"
                : activeDropdown === "services"
                ? "text-cyan-400"
                : "text-white hover:text-cyan-400"
            }`}
          >
            {t("common.services")}
          </Link>
        </div>

        <Link
          href="/contact"
          className={`transition-colors text-sm ${
            isScrolled
              ? "text-gray-700 hover:text-gray-900"
              : "text-white hover:text-cyan-400"
          }`}
        >
          {t("common.contact")}
        </Link>
      </nav>

      {/* Desktop Upload Document Button and Language Toggle - Right aligned */}
      <div className="hidden lg:flex items-center gap-3 z-10">
        <Link
          href="/upload-document"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
            isScrolled
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {t("common.uploadDocument")}
        </Link>
        <button
          onClick={toggleLocale}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
            isScrolled
              ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
              : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
          }`}
          aria-label="Toggle language"
        >
          <Languages className="w-4 h-4" />
          <span>{locale === "en" ? "English" : "हिंदी"}</span>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className={`lg:hidden p-2 z-10 transition-colors ${
          isScrolled ? "text-gray-800" : "text-white"
        }`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`fixed top-[80px] left-0 right-0 bottom-0 border-t lg:hidden z-50 transition-colors shadow-lg overflow-y-auto ${
            isScrolled
              ? "bg-white border-gray-200"
              : "bg-[#0a0e27] border-slate-800"
          }`}
        >
          <nav className="flex flex-col p-4 space-y-4 items-center">
            {/* Mobile Home Dropdown */}
            <Link
              href="/"
              className={`transition-colors text-center text-sm py-2 ${
                isScrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-cyan-400"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("common.home")}
            </Link>

            <Link
              href="/about"
              className={`transition-colors text-center text-sm py-2 ${
                isScrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-cyan-400"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("common.about")}
            </Link>

            {/* Mobile Services Dropdown */}
            <Link
              href="/services"
              className={`transition-colors text-center text-sm py-2 ${
                isScrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-cyan-400"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("common.services")}
            </Link>

            {/* Mobile Pages Dropdown */}
            <Link
              href="/contact"
              className={`transition-colors text-center text-sm py-2 ${
                isScrolled
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-cyan-400"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("common.contact")}
            </Link>

            {/* Mobile Upload Document Button */}
            <Link
              href="/upload-document"
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium w-full ${
                isScrolled
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t("common.uploadDocument")}
            </Link>

            {/* Mobile Language Toggle */}
            <button
              onClick={() => {
                toggleLocale();
                setIsMobileMenuOpen(false);
              }}
              className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium w-full ${
                isScrolled
                  ? "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  : "bg-white/10 hover:bg-white/20 text-white"
              }`}
            >
              <Languages className="w-4 h-4" />
              <span>{locale === "en" ? "English" : "हिंदी"}</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
