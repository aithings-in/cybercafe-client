"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/page-hero";
import FloatingWidget from "@/components/floating-widget";
import { useTranslation } from "@/hooks/useTranslation";

export default function TermsPage() {
  const { t } = useTranslation();

  return (
    <>
      <FloatingWidget />

      {/* Page Hero Banner */}
      <PageHero
        title={t("terms.title")}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("terms.title") },
        ]}
      />

      {/* Main Content Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Terms and Conditions Section */}
          <motion.div
            className="mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t("terms.termsAndConditions")}
            </h2>
            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>{t("terms.termsContent1")}</p>
              <p>{t("terms.termsContent2")}</p>
            </div>
          </motion.div>

          {/* Data Security Commitment Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              {t("terms.dataSecurityCommitment")}
            </h2>
            <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>{t("terms.securityContent1")}</p>
              <p>{t("terms.securityContent2")}</p>
              <p>{t("terms.securityContent3")}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

