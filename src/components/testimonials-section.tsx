"use client";

import TestimonialCard from "./testimonial-card";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const testimonials = (t("testimonials.items") || []) as any[];

  return (
    <section className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Blue dot and "TESTIMONIAL" */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <p className="text-sm md:text-base font-medium text-blue-500 uppercase tracking-wider">
              {t("testimonials.sectionTitle")}
            </p>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100">
            {t("testimonials.title")}
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              rating={5}
              quote={testimonial.quote}
              clientName={testimonial.clientName}
              clientTitle={testimonial.clientTitle}
              imageSrc={`/images/testimonials/${testimonial.clientName.toLowerCase().replace(/\s+/g, "-")}.jpg`}
              imageAlt={`${testimonial.clientName} - Client`}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

