"use client";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="w-24 h-24 mb-4 mx-auto"
        >
          <div className="w-full h-full border-4 border-t-[#d25c25] border-b-[#d25c25] rounded-full animate-spin" />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl font-medium text-gray-700"
        >
          Loading 3D Experience...
        </motion.p>
      </div>
    </div>
  );
}
