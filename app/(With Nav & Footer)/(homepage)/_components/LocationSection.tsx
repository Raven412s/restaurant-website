"use client"
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";


export default function LocationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const cardY = useTransform(scrollYProgress, [0, 1.2], [40, -60]);

  // Configuration for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="w-full overflow-hidden py-8 md:py-16 px-4 sm:px-6 lg:px-8 ">
      <motion.div
        ref={ref}
        className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >

          {/* Image Grid Section */}
          <motion.div
          className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 mb-8 lg:mb-0 order-1 lg:order-none"
          variants={itemVariants}
        >
          {/* Top row - 3 images */}
          <motion.div
            className="col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
            variants={itemVariants}
          >
            <motion.div className="col-span-1" variants={itemVariants}>
              <div className="relative w-full aspect-square sm:h-40 rounded-lg overflow-hidden">
                <Image
                  src="/story-sec-dish1.jpg"
                  alt="Bowl of soup with bread"
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  className="object-cover hover:scale-110 transition-transform duration-300 ease-linear"
                  priority={false}
                />
              </div>
            </motion.div>
            <motion.div className="col-span-1" variants={itemVariants}>
              <div className="relative w-full aspect-square sm:h-40 rounded-lg overflow-hidden">
                <Image
                  src="/story-sec-dish2.jpg"
                  alt="Chef cooking in kitchen"
                  fill
                  sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
                  className="object-cover hover:scale-110 transition-transform duration-300 ease-linear"
                  priority={false}
                />
              </div>
            </motion.div>
            <motion.div className="col-span-2 sm:col-span-1" variants={itemVariants}>
              <div className="relative w-full aspect-square sm:h-40 rounded-lg overflow-hidden">
                <Image
                  src="/story-sec-dish1.jpg"
                  alt="People toasting with wine glasses"
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 33vw, 25vw"
                  className="object-cover hover:scale-110 transition-transform duration-300 ease-linear"
                  priority={false}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom row - 2 images */}
          <motion.div className="col-span-1" variants={itemVariants}>
            <div className="relative w-full h-40 sm:h-64 rounded-lg overflow-hidden">
              <Image
                src="/story-sec-dish2.jpg"
                alt="Restaurant bar counter"
                fill
                sizes="(max-width: 639px) 50vw, 25vw"
                className="object-cover hover:scale-110 transition-transform duration-300 ease-linear"
                priority={false}
              />
            </div>
          </motion.div>
          <motion.div className="col-span-1" variants={itemVariants}>
            <div className="relative w-full h-40 sm:h-64 rounded-lg overflow-hidden">
              <Image
                src="/chocolate-explosion.jpg"
                alt="Restaurant interior"
                fill
                sizes="(max-width: 639px) 50vw, 25vw"
                className="object-cover hover:scale-110 transition-transform duration-300 ease-linear"
                priority={false}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Content Card Section */}
        <motion.div
          className="flex-1 relative lg:right-12 bg-white p-6 sm:p-8 rounded-lg shadow-lg self-center z-20 mb-8 lg:mb-0"
          variants={itemVariants}
          style={{y : cardY}}
        >
          <motion.div className="text-center" variants={itemVariants} >
            <motion.h3
              className="font-style text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-orange-400 mb-2"
              variants={itemVariants}
            >
              Visit Our
            </motion.h3>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4"
              variants={itemVariants}
            >
              RESTAURANT
            </motion.h2>
            <motion.div
              className="flex justify-center mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12,2L9.2,8.6L2,9.2L7,14.4L5.8,22L12,18.4L18.2,22L17,14.4L22,9.2L14.8,8.6L12,2Z"
                />
              </svg>
            </motion.div>
            <motion.p
              className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base"
              variants={itemVariants}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
              veritatis et quasi.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link
                href="#"
                className="inline-block text-yellow-400 border-b-2 border-yellow-400 pb-1 font-medium font-display text-base sm:text-lg"
              >
                Get Locations
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
