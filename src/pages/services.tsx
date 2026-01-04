"use client";

import PageHero from "@/components/page-hero";
import ServicesSection from "@/components/services-section";
import WhyChooseUsSection from "@/components/why-choose-us-section";
import ProtectDataSection from "@/components/protect-data-section";
import { useTranslation } from "@/hooks/useTranslation";

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <>
      {/* Page Hero Banner */}
      <PageHero
        title={t("common.services")}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("common.services") },
        ]}
      />

      {/* Services Section */}
      <section className="bg-white">
        <ServicesSection isServicesPage={true} />
        <WhyChooseUsSection />
        <ProtectDataSection />
      </section>
    </>
  );
}
