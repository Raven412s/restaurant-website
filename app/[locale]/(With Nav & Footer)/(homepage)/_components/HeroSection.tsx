"use client"
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

const HeroSection: React.FC = () => {
  // Create a reference for the section
  const { scrollY } = useScroll();

  // Transform values for parallax and fade effects
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200, 300], [1, 0.5, 0]);
    const t = useTranslations("HomePage.HeroSection")
  return (
    <div className="">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: backgroundY }}
        >
          <Image
            src="/interior.jpg"
            alt="Grand Restaurant Interior"
            layout="fill"
            objectFit="cover"
            priority
          />
        </motion.div>

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Hero Content with Fade Effect */}
        <motion.div
          className="relative h-full flex flex-col items-center justify-center text-white text-center px-4"
          style={{
            y: textY,
            opacity: opacity
          }}
        >
          <motion.h2
            className="text-5xl md:text-7xl  font-style font-light mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t("welcome")}
          </motion.h2>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-wider mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {t('aroma')}
          </motion.h1>

          <motion.h3
            className="text-3xl md:text-[44px] font-bold font-display tracking-wide mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {t("indArab")}
          </motion.h3>
          <motion.h3
            className="text-4xl md:text-6xl font-bold font-display tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {t("restaurant")}
          </motion.h3>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
