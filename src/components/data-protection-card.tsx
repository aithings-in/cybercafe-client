"use client";

import { CircleCheck } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

interface DataProtectionCardProps {
  text: string;
  isHighlighted?: boolean;
}

export default function DataProtectionCard({
  text,
  isHighlighted = false,
}: DataProtectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const backgroundControls = useAnimation();

  const handleHoverStart = () => {
    setIsHovered(true);
    backgroundControls.start({ width: "100%" });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    backgroundControls.start({ width: 0 });
  };

  return (
    <motion.div
      className={`relative rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer overflow-hidden border ${
        isHighlighted
          ? "bg-blue-400 text-white border-0"
          : "bg-white text-gray-800 border-l-2 border-l-blue-400 border-t-0 border-r-0 border-b-0"
      }`}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.7 }}
    >
      {/* Animated Background - Fills from left to right */}
      {!isHighlighted && (
        <motion.div
          className="absolute inset-y-0 left-0 bg-blue-400 z-0"
          initial={{ width: 0 }}
          animate={backgroundControls}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center gap-3 w-full">
        <motion.div
          animate={{
            color: isHovered || isHighlighted ? "#ffffff" : "#3b82f6",
          }}
          transition={{ duration: 0.7 }}
        >
          <CircleCheck className="w-5 h-5 shrink-0" />
        </motion.div>
        <motion.span
          className="text-sm font-medium"
          animate={{
            color: isHovered || isHighlighted ? "#ffffff" : "#1f2937",
          }}
          transition={{ duration: 0.7 }}
        >
          {text}
        </motion.span>
      </div>
    </motion.div>
  );
}
