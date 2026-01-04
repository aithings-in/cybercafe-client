"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageHero({ title, breadcrumbs }: PageHeroProps) {
  const defaultBreadcrumbs: BreadcrumbItem[] = breadcrumbs || [
    { label: "Home", href: "/" },
    { label: title },
  ];

  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden bg-gradient-to-b from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27] min-h-[400px] md:min-h-[500px] flex items-center">
      {/* Cosmic Background with Stars */}
      <div className="absolute inset-0">
        {/* Background Image - Earth with Network */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[600px] md:h-[800px] opacity-70">
          <img
            src="/images/stats-background.jpg"
            alt="Global network background"
            className="w-full h-full object-cover object-bottom"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {/* Animated Stars Overlay */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h1>

          {/* Breadcrumb Navigation */}
          <motion.nav
            className="flex items-center justify-center gap-2 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-label="Breadcrumb"
          >
            {defaultBreadcrumbs.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-sm md:text-base hover:text-blue-400 transition-colors flex items-center gap-1"
                  >
                    {index === 0 && <Home className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <span className="text-sm md:text-base">{item.label}</span>
                )}
              </div>
            ))}
          </motion.nav>
        </div>
      </div>
    </section>
  );
}

