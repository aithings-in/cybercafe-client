"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  rating: number;
  quote: string;
  clientName: string;
  clientTitle: string;
  imageSrc: string;
  imageAlt: string;
  index?: number;
}

export default function TestimonialCard({
  rating,
  quote,
  clientName,
  clientTitle,
  imageSrc,
  imageAlt,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-6 md:p-8 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, shadow: "lg" }}
    >
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-5 h-5 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      {/* Quote Text */}
      <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow leading-relaxed">
        {quote}
      </p>

      {/* Client Info */}
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden mb-3 ring-2 ring-gray-200 dark:ring-gray-700">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback placeholder
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                clientName
              )}&size=64&background=3b82f6&color=fff`;
            }}
          />
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-1">
          {clientName}
        </h3>

        {/* Title */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {clientTitle}
        </p>
      </div>
    </motion.div>
  );
}

