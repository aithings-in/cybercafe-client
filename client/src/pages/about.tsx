"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/page-hero";
import StatsSection from "@/components/stats-section";
import InstitutionFeatureCard from "@/components/institution-feature-card";
import FloatingWidget from "@/components/floating-widget";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutPage() {
  const { t } = useTranslation();
  const features = (t("about.features") || []) as any[];

  return (
    <>
      <FloatingWidget />

      {/* Page Hero Banner */}
      <PageHero
        title={t("about.title")}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("about.title") },
        ]}
      />

      {/* Upper Section - Who We Are & What We Do */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-8">
              {/* Who We Are */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {t("about.whoWeAre")}
                </h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {t("about.whoWeAreDesc")}
                </p>
              </motion.div>

              {/* What We Do */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {t("about.whatWeDo")}
                </h2>
                <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                  <p>
                    {t("about.whatWeDoDesc1")}
                  </p>
                  <p>
                    {t("about.whatWeDoDesc2")}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden shadow-xl">
                <img
                  src="/images/about-us-computer-lab.jpg"
                  alt="Students in computer lab"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback placeholder
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=Computer+Lab&background=3b82f6&color=fff&size=400`;
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Lower Section - Why Choose Our Institution */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t("about.whyChooseUs")}
            </h2>
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
              {t("about.whyChooseUsDesc")}
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const icons = ["monitor", "graduation", "rupee"];
              return (
                <InstitutionFeatureCard
                  key={index}
                  icon={icons[index] as "monitor" | "graduation" | "rupee"}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
