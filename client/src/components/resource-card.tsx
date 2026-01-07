"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface ResourceCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  index?: number;
}

export default function ResourceCard({
  imageSrc,
  imageAlt,
  title,
  description,
  index = 0,
}: ResourceCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[250px] md:h-[300px] rounded-lg overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative w-full h-full">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          onError={() => setImageError(true)}
        />

        <div className="absolute inset-0 bg-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg">
          <div className="absolute bottom-6 left-6 right-6 text-white z-10">
            <h3 className="text-xl md:text-2xl font-bold leading-tight mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
              {title}
            </h3>
            <p className="text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
