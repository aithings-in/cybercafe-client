"use client";

import TeamMemberCard from "./team-member-card";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export default function TeamSection() {
  const { t } = useTranslation();
  const teamMembers = (t("team.members") || []) as any[];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Blue dot and "MEET THE TEAM" */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <p className="text-sm md:text-base font-medium text-blue-500 uppercase tracking-wider">
              {t("team.sectionTitle")}
            </p>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100">
            {t("team.title")}
          </h2>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              designation={member.designation}
              imageSrc={`/images/team/${member.name.toLowerCase().replace(/\s+/g, "-")}.jpg`}
              imageAlt={`${member.name} - Team Member`}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
