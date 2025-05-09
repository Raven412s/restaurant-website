"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const OurStory: React.FC = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const cardY = useTransform(scrollYProgress, [0, 1.2], [40, -60]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section
            ref={sectionRef}
            className="relative py-12 sm:py-16 md:py-24 bg-gray-50 overflow-hidden"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="flex flex-col lg:flex-row gap-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Story Card */}
                    <motion.div
                        className="relative z-10 lg:left-14 bg-white rounded-lg p-6 sm:p-8 lg:p-10 xl:p-12 lg:w-2/5 flex flex-col justify-center shadow-lg"
                        variants={itemVariants}
                        style={{ y: cardY }}
                    >
                        <h3 className="text-3xl sm:text-4xl md:text-[52px] leading-snug text-orange-400 font-style font-light mb-2">
                            Discover
                        </h3>
                        <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-6 font-display">
                            OUR STORY
                        </h2>
                        <span className="mb-6 relative w-12 h-12 mx-auto">
                            <Image
                                src="/p.jpg"
                                alt="petal"
                                fill
                                className="object-cover"
                            />
                        </span>
                        <p className="text-gray-600 text-base sm:text-lg mb-8">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi.
                        </p>
                        <div className="mt-auto">
                            <a
                                href="#"
                                className="inline-block text-amber-600 border-b border-amber-600 pb-1 hover:text-amber-700 transition-colors"
                            >
                                Learn More
                            </a>
                        </div>
                    </motion.div>

                    {/* Food Images */}
                    <motion.div
                        className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-6 flex-1"
                        variants={itemVariants}
                    >
                        {[1, 2].map((num) => (
                            <div key={num} className="w-full sm:w-1/2 lg:w-full xl:w-1/2">
                                <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden">
                                    <Image
                                        src={`/story-sec-dish${num}.jpg`}
                                        alt={`Dish ${num}`}
                                        fill
                                        className="object-cover rounded-md hover:scale-105 transition-transform duration-300 ease-in-out"
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default OurStory;
