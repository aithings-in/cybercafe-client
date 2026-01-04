import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import StatsSection from "@/components/stats-section";
import WhyChooseUsSection from "@/components/why-choose-us-section";
import ProtectDataSection from "@/components/protect-data-section";
import ResourcesSection from "@/components/resources-section";
import TeamSection from "@/components/team-section";
import TestimonialsSection from "@/components/testimonials-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ProtectDataSection />
      <ResourcesSection />
      <TeamSection />
      <TestimonialsSection />
    </>
  );
}
