"use client";

import { useState, useEffect } from "react";
import Button from "@/components/button";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

interface Slide {
  heading: string;
  headingHighlight: string;
  description: string;
  button1Text: string;
  button2Text: string;
}

export default function HeroSection() {
  const { t, locale } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get slides from translations
  const slidesData = t("hero.slides") || [];
  const slides: Slide[] = Array.isArray(slidesData) ? slidesData : [];

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  // Auto-play carousel
  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setTimeout(() => setIsAnimating(false), 600);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAnimating, slides.length]);

  const currentSlideData = slides[currentSlide] || {
    heading: "",
    headingHighlight: "",
    description: "",
    button1Text: "",
    button2Text: "",
  };

  return (
    <div className="relative w-full min-h-screen  bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] overflow-hidden">
      {/* Left Side - Digital Circuit Patterns with Padlock */}
      <div className="absolute left-0 top-0 bottom-0 w-1/2 lg:w-2/5 opacity-40 pointer-events-none">
        {/* Abstract Circuit Patterns */}
        <svg
          className="w-full h-full"
          viewBox="0 0 400 800"
          preserveAspectRatio="xMinYMin meet"
        >
          {/* Circuit lines */}
          <path
            d="M50,100 Q150,150 200,200 T350,300"
            stroke="#00d4ff"
            strokeWidth="2"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M80,200 L180,250 L280,300 L350,400"
            stroke="#00d4ff"
            strokeWidth="1.5"
            fill="none"
            opacity="0.25"
          />
          <path
            d="M120,300 Q200,350 250,400 T350,500"
            stroke="#00d4ff"
            strokeWidth="1"
            fill="none"
            opacity="0.2"
          />
          {/* Gear-like patterns */}
          <circle
            cx="150"
            cy="250"
            r="40"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="2"
            opacity="0.2"
          />
          <circle
            cx="150"
            cy="250"
            r="25"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="1"
            opacity="0.3"
          />
          <circle
            cx="250"
            cy="400"
            r="35"
            fill="none"
            stroke="#00d4ff"
            strokeWidth="1.5"
            opacity="0.2"
          />
        </svg>

        {/* Large Padlock Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-[#00d4ff] drop-shadow-[0_0_20px_rgba(0,212,255,0.5)]"
            >
              <path
                d="M50 20 C40 20 32 28 32 38 L32 50 C28 50 25 53 25 57 L25 75 C25 79 28 82 32 82 L68 82 C72 82 75 79 75 75 L75 57 C75 53 72 50 68 50 L68 38 C68 28 60 20 50 20 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                opacity="0.8"
              />
              <circle
                cx="50"
                cy="57"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Right Side - Bokeh Effect */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 lg:w-3/5 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-xl opacity-30"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, ${
                Math.random() > 0.5 ? "#00d4ff" : "#00b8e6"
              } 0%, transparent 70%)`,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content Container - Centered */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center justify-center min-h-screen  px-4 sm:px-6 lg:px-12 py-12 lg:py-0">
        {/* Centered Content */}
        <div className="w-full max-w-4xl space-y-6 sm:space-y-8 text-center overflow-hidden">
          {/* Heading with animation from left */}
          <h1
            key={`heading-${currentSlide}`}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight ${
              isAnimating ? "animate-slide-in-left" : "animate-fade-in"
            }`}
          >
            {currentSlideData.heading}
            <br />
            <span className="text-blue-400">
              {currentSlideData.headingHighlight}
            </span>
          </h1>
          {/* Description with animation from right */}
          <p
            key={`description-${currentSlide}`}
            className={`text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto ${
              isAnimating ? "animate-slide-in-right" : "animate-fade-in"
            }`}
          >
            {currentSlideData.description}
          </p>
          <div
            key={`buttons-${currentSlide}`}
            className={`flex flex-col sm:flex-row gap-4 pt-4 justify-center ${
              isAnimating ? "animate-fade-in" : ""
            }`}
          >
            <Link href="/services">
              <button className="bg-white text-blue-500 hover:bg-gray-100 font-medium px-8 py-3 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto border-2 border-transparent">
                {currentSlideData.button1Text}
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-[#00d4ff] hover:bg-[#00b8e6] text-white font-medium px-8 py-3 rounded-lg transition-colors text-sm sm:text-base w-full sm:w-auto">
                {currentSlideData.button2Text}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Picture - Bottom Right */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20">
        <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-300 overflow-hidden border-2 border-white/20 shadow-lg">
          <div className="w-full h-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-20"
        aria-label="Previous slide"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-20"
        aria-label="Next slide"
      >
        <svg
          className="w-4 h-4 sm:w-5 sm:h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 600);
              }
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index
                ? "bg-blue-400 w-8"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
