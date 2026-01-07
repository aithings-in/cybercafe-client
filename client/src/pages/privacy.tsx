"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/page-hero";
import FloatingWidget from "@/components/floating-widget";
import { useTranslation } from "@/hooks/useTranslation";

export default function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <>
      <FloatingWidget />

      {/* Page Hero Banner */}
      <PageHero
        title={t("privacy.title")}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("privacy.title") },
        ]}
      />

      {/* Main Content Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Introduction - Terms of use Agreement Section */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t("privacy.introductionTitle")}
            </h2>
            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>{t("privacy.introductionContent1")}</p>
              <p>{t("privacy.introductionContent2")}</p>
              <p>{t("privacy.introductionContent3")}</p>
            </div>
          </motion.div>

          {/* Acceptable Payment Methods Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t("privacy.paymentMethodsTitle")}
            </h2>
            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>{t("privacy.paymentContent1")}</p>
              <p>{t("privacy.paymentContent2")}</p>
              <p>{t("privacy.paymentContent3")}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

