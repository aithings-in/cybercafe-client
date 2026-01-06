"use client";

import ServiceCard from "./service-card";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { getAllServices } from "@/data/services";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function ServicesSection({
  isServicesPage = false,
}: {
  isServicesPage?: boolean;
}) {
  const { t } = useTranslation();
  const services = getAllServices();
  const translatedServices = (t("services.items") || []) as any[];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {!isServicesPage && (
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-blue-500 uppercase text-sm font-semibold tracking-wider">
                {t("services.sectionTitle")}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
              {t("services.title")}
            </h2>
          </motion.div>
        )}

        {/* Service Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service) => {
            const translatedService = translatedServices.find(
              (ts) => ts.id === service.id
            );
            return (
              <motion.div key={service.id} variants={itemVariants}>
                <ServiceCard
                  title={translatedService?.title || `Service ${service.id}`}
                  description={translatedService?.shortDescription || ""}
                  imageSrc={service.image}
                  imageAlt={service.imageAlt}
                  href={`/services/${service.id}`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
