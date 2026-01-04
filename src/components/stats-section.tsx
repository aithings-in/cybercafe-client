"use client";

import StatCard from "./stat-card";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const statsValues = [
  { value: "20+", suffix: "" },
  { value: "7000", suffix: "" },
  { value: "350+", suffix: "" },
  { value: "50+", suffix: "" },
];

export default function StatsSection() {
  const { t } = useTranslation();
  
  const stats = [
    {
      ...statsValues[0],
      label: t("stats.yearsExperience"),
    },
    {
      ...statsValues[1],
      label: t("stats.devicesProtected"),
    },
    {
      ...statsValues[2],
      label: t("stats.confidentClients"),
    },
    {
      ...statsValues[3],
      label: t("stats.awardsReceived"),
    },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]">
      {/* Cosmic Background with Stars */}
      <div className="absolute inset-0">
        {/* Background Image */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] md:h-[800px] opacity-60">
          <img
            src="/images/stats-background.jpg"
            alt="Global network background"
            className="w-full h-full object-cover object-bottom"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={2}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
