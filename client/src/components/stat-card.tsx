"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatCardProps {
  value: string;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function StatCard({
  value,
  suffix = "",
  label,
  duration = 2,
}: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  // Extract numeric value and suffix
  const numericValue = parseInt(value.replace(/\D/g, ""));
  const hasPlus = value.includes("+");

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min(
        (currentTime - startTime) / (duration * 1000),
        1
      );

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * numericValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, numericValue, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-center space-y-2 group cursor-default"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.1 }}
    >
      <motion.div
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-white"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        {count.toLocaleString()}
        {suffix}
        {hasPlus && "+"}
      </motion.div>
      <motion.p
        className="text-white/90 text-sm md:text-base"
        whileHover={{ color: "#60a5fa" }}
        transition={{ duration: 0.3 }}
      >
        {label}
      </motion.p>
    </motion.div>
  );
}
