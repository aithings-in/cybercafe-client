"use client";

import { motion } from "framer-motion";

interface TeamMemberCardProps {
  name: string;
  designation: string;
  imageSrc: string;
  imageAlt: string;
  index?: number;
}

export default function TeamMemberCard({
  name,
  designation,
  imageSrc,
  imageAlt,
  index = 0,
}: TeamMemberCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full max-w-[200px] md:max-w-[250px] aspect-[3/4] rounded-lg overflow-hidden mb-4 group">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            // Fallback placeholder
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              name
            )}&size=200&background=3b82f6&color=fff`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 text-center">
        {name}
      </h3>
      <p className="text-sm text-blue-400 text-center">{designation}</p>
    </motion.div>
  );
}
