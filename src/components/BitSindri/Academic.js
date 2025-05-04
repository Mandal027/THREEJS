"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Code, Cpu, Database, FlaskRoundIcon as Flask, Lightbulb, Radio, Zap } from "lucide-react";

export default function AcademicsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const departments = [
    {
      id: "cse",
      name: "Computer Science & Engineering",
      icon: <Code className="h-6 w-6" />,
      description:
        "The Department of Computer Science & Engineering offers undergraduate and postgraduate programs focusing on software development, algorithms, artificial intelligence, and more.",
      courses: ["B.Tech in Computer Science & Engineering", "M.Tech in Computer Science & Engineering"],
    },
    {
      id: "ece",
      name: "Electronics & Communication",
      icon: <Radio className="h-6 w-6" />,
      description:
        "The Department of Electronics & Communication Engineering provides education in electronic systems, communication networks, signal processing, and embedded systems.",
      courses: ["B.Tech in Electronics & Communication Engineering", "M.Tech in Communication Systems"],
    },
    {
      id: "ee",
      name: "Electrical Engineering",
      icon: <Zap className="h-6 w-6" />,
      description:
        "The Electrical Engineering Department focuses on power systems, electrical machines, control systems, and renewable energy technologies.",
      courses: ["B.Tech in Electrical Engineering", "M.Tech in Power Systems"],
    },
    {
      id: "me",
      name: "Mechanical Engineering",
      icon: <Cpu className="h-6 w-6" />,
      description:
        "The Mechanical Engineering Department offers programs covering thermodynamics, manufacturing processes, machine design, and industrial engineering.",
      courses: ["B.Tech in Mechanical Engineering", "M.Tech in Thermal Engineering"],
    },
    {
      id: "ce",
      name: "Chemical Engineering",
      icon: <Flask className="h-6 w-6" />,
      description:
        "The Chemical Engineering Department provides education in process engineering, chemical reactions, plant design, and environmental engineering.",
      courses: ["B.Tech in Chemical Engineering", "M.Tech in Chemical Engineering"],
    },
    {
      id: "it",
      name: "Information Technology",
      icon: <Database className="h-6 w-6" />,
      description:
        "The Information Technology Department focuses on data management, networking, web technologies, and information systems.",
      courses: ["B.Tech in Information Technology", "M.Tech in Information Technology"],
    },
  ];

  return (
    <section id="academics" ref={ref} className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div className="text-center mb-16" style={{ y }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
          >
            Academic Programs
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
            BIT Sindri offers a wide range of undergraduate and postgraduate programs across various engineering
            disciplines. Our curriculum is designed to provide both theoretical knowledge and practical skills.
          </motion.p>
        </motion.div>

        <Tabs defaultValue="cse" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-14">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 bg-gray-200 dark:bg-gray-700">
              {departments.map((dept) => (
                <TabsTrigger
                  key={dept.id}
                  value={dept.id}
                  className="flex flex-col items-center gap-1 py-3 px-4 data-[state=active]:bg-orange-600 data-[state=active]:text-white"
                >
                  {dept.icon}
                  <span className="text-xs md:text-sm text-center">{dept.name.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {departments.map((dept) => (
            <TabsContent key={dept.id} value={dept.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {dept.icon}
                      <span>{dept.name}</span>
                    </CardTitle>
                    <CardDescription>Department Overview</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">{dept.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Programs Offered</span>
                    </CardTitle>
                    <CardDescription>Undergraduate and Postgraduate Courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {dept.courses.map((course, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Lightbulb className="h-5 w-5 text-orange-600 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{course}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}