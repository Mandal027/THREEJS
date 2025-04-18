"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Academics", href: "#academics" },
    { name: "Campus", href: "#campus" },
    { name: "News", href: "#news" },
    { name: "Contact", href: "#contact" },
  ]

  const resources = [
    { name: "Student Portal", href: "#" },
    { name: "Faculty Portal", href: "#" },
    { name: "Library", href: "#" },
    { name: "Research", href: "#" },
    { name: "Placements", href: "#" },
    { name: "Alumni", href: "#" },
  ]

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, href: "#", label: "LinkedIn" },
  ]

  const contactInfo = [
    { icon: <Mail className="h-5 w-5" />, text: "info@bitsindri.ac.in" },
    { icon: <Phone className="h-5 w-5" />, text: "+91 1234567890" },
    { icon: <MapPin className="h-5 w-5" />, text: "Sindri, Dhanbad, Jharkhand, India - 828123" },
  ]

  return (
    <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <img src="/placeholder.svg?height=40&width=40" alt="BIT Sindri Logo" className="h-10 w-10" />
              <span className="font-bold text-xl">BIT Sindri</span>
            </div>
            <p className="text-gray-400 mb-6">
              Birla Institute of Technology, Sindri is one of the premier engineering colleges in Eastern India,
              committed to excellence in education and research.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  aria-label={link.label}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-800 hover:bg-orange-600 p-2 rounded-full transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-600"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6 relative">
              Resources
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-600"></span>
            </h3>
            <ul className="space-y-3">
              {resources.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold mb-6 relative">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-orange-600"></span>
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start space-x-3">
                  <div className="text-orange-500 mt-1">{item.icon}</div>
                  <span className="text-gray-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Birla Institute of Technology, Sindri. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-500 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-500 hover:text-white text-sm">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}