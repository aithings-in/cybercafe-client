"use client";

import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";
import PageHero from "@/components/page-hero";
import Button from "@/components/button";
import { getServiceById } from "@/data/services";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function ServiceDetailPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  // Get service data
  const serviceId = id ? parseInt(id as string, 10) : null;
  const service = serviceId ? getServiceById(serviceId) : null;
  const translatedServices = (t("services.items") || []) as any[];
  const translatedService = serviceId
    ? translatedServices.find((ts) => ts.id === serviceId)
    : null;

  // If service not found, show 404
  if (!service && router.isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("common.serviceNotFound")}
          </h1>
          <p className="text-gray-600 mb-8">
            {t("common.serviceNotFoundDesc")}
          </p>
          <Link href="/services">
            <Button variant="primary">{t("common.backToServices")}</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Loading state
  if (!router.isReady || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t("common.loading")}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Page Hero Banner */}
      <PageHero
        title={translatedService?.title || service.title}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("common.services"), href: "/services" },
          { label: translatedService?.title || service.title },
        ]}
      />

      {/* Service Detail Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link href="/services">
              <Button variant="secondary" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                {t("common.backToServices")}
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content - Left Side (2 columns) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Service Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl"
              >
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      service.title
                    )}&background=3b82f6&color=fff&size=400`;
                  }}
                />
              </motion.div>

              {/* Full Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {t("services.aboutService")}
                </h2>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {translatedService?.fullDescription ||
                    service.fullDescription}
                </p>
              </motion.div>

              {/* Process Section (if available) */}
              {translatedService?.process &&
                translatedService.process.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                      {t("services.ourProcess")}
                    </h2>
                    <div className="space-y-4">
                      {translatedService.process.map(
                        (step: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                              {index + 1}
                            </div>
                            <p className="text-base text-gray-700 flex-1">
                              {step}
                            </p>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
            </div>

            {/* Sidebar - Right Side (1 column) */}
            <div className="lg:col-span-1 space-y-8">
              {/* Quick Info Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t("services.quickOverview")}
                </h3>
                <p className="text-base text-gray-700">
                  {translatedService?.shortDescription ||
                    service.shortDescription}
                </p>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t("services.keyFeatures")}
                </h3>
                <ul className="space-y-3">
                  {(translatedService?.features || service.features).map(
                    (feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-700">
                          {feature}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {t("services.benefits")}
                </h3>
                <ul className="space-y-3">
                  {(translatedService?.benefits || service.benefits).map(
                    (benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-base text-gray-700">
                          {benefit}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link href="/contact">
                  <Button variant="primary" className="w-full">
                    {t("services.getFreeQuote")}
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
