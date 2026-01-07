"use client";

import DataProtectionCard from "./data-protection-card";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function ProtectDataSection() {
  const { t } = useTranslation();
  const services = (t("protectData.services") || []) as string[];

  return (
    <section className="py-16 md:py-24 bg-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Section - Isometric Illustration */}
          <motion.div
            className="relative w-full h-[500px] md:h-[600px] order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/protect-data-illustration.png"
              alt="Data protection illustration"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </motion.div>

          {/* Right Section - Text Content */}
          <motion.div
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-blue-500 uppercase text-sm font-semibold tracking-wider">
                  {t("protectData.sectionTitle")}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                {t("protectData.title")}
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                {t("protectData.description")}
              </p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <DataProtectionCard
                    text={service}
                    isHighlighted={index === 0}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
