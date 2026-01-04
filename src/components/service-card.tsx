"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { MoveRight } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt: string;
  href?: string;
}

export default function ServiceCard({
  title,
  description,
  imageSrc,
  imageAlt,
  href = "#",
}: ServiceCardProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const borderControls = useAnimation();

  const handleHoverStart = () => {
    setIsHovered(true);
    borderControls.start({ width: "100%" });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    borderControls.start({ width: 0 });
  };

  return (
    <motion.div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{
        scale: 1.05,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Image Container */}
      <div className="relative w-full h-64 overflow-hidden">
        {imageSrc ? (
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 flex items-center justify-center">
            <div className="text-white/50 text-4xl font-bold">
              {title.charAt(0)}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4 relative">
        {/* Title */}
        <motion.h3
          className="text-xl font-bold text-gray-800 text-center"
          whileHover={{ color: "#2563eb" }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed text-center">
          {description}
        </p>

        {/* Read More Button */}
        <div className="flex justify-center">
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-gray-800 font-medium text-sm group/button"
          >
            <motion.span
              className="w-10 h-10 rounded-full border border-blue-400 flex items-center justify-center shadow-md"
              animate={{
                backgroundColor: isHovered ? "#3b82f6" : "transparent",
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                animate={{
                  color: isHovered ? "#ffffff" : "#60a5fa",
                }}
                transition={{ duration: 0.3 }}
              >
                <MoveRight className="w-5 h-5" />
              </motion.div>
            </motion.span>
            <motion.span
              animate={{
                color: isHovered ? "#2563eb" : "#1f2937",
              }}
              transition={{ duration: 0.3 }}
            >
              {t("common.readMore")}
            </motion.span>
          </Link>
        </div>

        {/* Animated Bottom Border - Expands from center */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-blue-500"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
          }}
          initial={{ width: 0 }}
          animate={borderControls}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
