"use client";

import React from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, BookOpen, Users } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats = [
    { icon: <BookOpen className="h-8 w-8 text-orange-600" />, value: "1949", label: "Established" },
    { icon: <Users className="h-8 w-8 text-orange-600" />, value: "3000+", label: "Students" },
    { icon: <Award className="h-8 w-8 text-orange-600" />, value: "12", label: "Departments" },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="about" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" style={{ y }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            About BIT Sindri
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="h-1 bg-orange-600 mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-lg text-gray-700 dark:text-gray-300"
          >
            Birla Institute of Technology, Sindri was established in 1949 and is one of the oldest engineering colleges
            in India. Located in Sindri, Jharkhand, the institute has been consistently producing quality engineers who
            have contributed significantly to the nation's development.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center transform transition-transform hover:scale-105"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Legacy</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              BIT Sindri has a rich legacy of academic excellence and innovation. The institute was established with a
              vision to create a center of excellence for engineering education in Eastern India.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Over the decades, BIT Sindri has evolved into a premier institution known for its quality education,
              research facilities, and industry connections. Our alumni have made significant contributions in various
              fields both in India and abroad.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              The institute continues to uphold its tradition of excellence while adapting to the changing needs of the
              industry and society.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-80 rounded-lg overflow-hidden shadow-xl"
          >
            <Image src='/Bit.jpeg' alt="BIT Sindri Campus" className="w-full h-full object-cover" width={110} height={110} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6">
                <p className="text-white text-lg font-medium">The historic main building of BIT Sindri</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}