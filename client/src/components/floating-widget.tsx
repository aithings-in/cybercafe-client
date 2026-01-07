"use client";

import { Settings, Folder, List, Wrench, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingWidget() {
  const icons = [
    { Icon: Settings, label: "Settings" },
    { Icon: Folder, label: "Folder" },
    { Icon: List, label: "List" },
    { Icon: Wrench, label: "Tools" },
    { Icon: Plus, label: "Add" },
  ];

  return (
    <motion.div
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="bg-black rounded-lg p-2 flex flex-col gap-2 shadow-2xl">
        {icons.map(({ Icon, label }, index) => (
          <motion.button
            key={index}
            className="w-10 h-10 flex items-center justify-center text-white hover:bg-gray-800 rounded transition-colors"
            aria-label={label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-5 h-5" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

