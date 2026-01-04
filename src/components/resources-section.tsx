"use client";

import ResourceCard from "./resource-card";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

const resources = [
  {
    imageSrc: "/images/resources/network-global.jpg",
    imageAlt: "Global network connectivity",
  },
  {
    imageSrc: "/images/resources/ai-brain.jpg",
    imageAlt: "Artificial intelligence and advanced computing",
  },
  {
    imageSrc: "/images/resources/cloud-security.jpg",
    imageAlt: "Cloud security with shield protection",
  },
  {
    imageSrc: "/images/resources/earth-network.jpg",
    imageAlt: "Global network with Earth view",
  },
  {
    imageSrc: "/images/resources/circuit-board.jpg",
    imageAlt: "Advanced digital infrastructure",
  },
  {
    imageSrc: "/images/resources/digital-security.jpg",
    imageAlt: "Digital security interface with padlocks",
  },
];

export default function ResourcesSection() {
  const { t } = useTranslation();
  
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            {t("resources.title")}
          </h2>
        </motion.div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              imageSrc={resource.imageSrc}
              imageAlt={resource.imageAlt}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

