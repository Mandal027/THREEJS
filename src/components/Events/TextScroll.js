// components/ScrollingText.js
import { easeInOut, motion } from "framer-motion";

const ScrollingText = () => {
  const content = (
    <>
      <span>Web Design</span>
      <span>✦</span>
      <span>E-commerce Solutions</span>
      <span>✦</span>
      <span>Mobile App Design</span>
      <span>✦</span>
      <span>Digital Marketing</span>
      <span>✦</span>
      <span>Graphic Design</span>
      <span>✦</span>
      <span>Content Creation</span>
      <span>✦</span>
      <span>Social Media Management</span>
      <span>✦</span>
      <span>Video Production</span>
      <span>✦</span>
      <span>Consulting Services</span>
      <span>✦</span>
    </>
  );

  return (
    <motion.div
      className="relative w-full bg-white py-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Fade effect on both sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

      {/* Scrolling track */}
      <div className="flex w-max animate-loop-scroll gap-6 whitespace-nowrap text-lg font-medium text-black">
        <div className="flex gap-6">{content}</div>
        <div className="flex gap-6">{content}</div>{" "}
        {/* duplicated for seamless loop */}
      </div>
    </motion.div>
  );
};

export default ScrollingText;
