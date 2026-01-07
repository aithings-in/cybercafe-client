"use client";

import { motion } from "framer-motion";
import { MonitorCheck, GraduationCap, DollarSign } from "lucide-react";

interface InstitutionFeatureCardProps {
  icon: "monitor" | "graduation" | "rupee";
  title: string;
  description: string;
  index: number;
}

const iconMap = {
  monitor: MonitorCheck,
  graduation: GraduationCap,
  rupee: DollarSign, // Using DollarSign as IndianRupee is not available in lucide-react
};

export default function InstitutionFeatureCard({
  icon,
  title,
  description,
  index,
}: InstitutionFeatureCardProps) {
  const IconComponent = iconMap[icon];

  return (
    <motion.div
      className="flex flex-col items-center text-center space-y-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Circular Icon Background */}
      <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
        <IconComponent className="w-12 h-12 text-blue-500" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>

      {/* Description */}
      <p className="text-base text-gray-700 max-w-xs">{description}</p>
    </motion.div>
  );
}

