"use client"

import { MenuSection as MSInterface } from '@/types';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
    default: 2,
    1024: 2,
    640: 1,
};


interface MenuCardProps {
    card: MSInterface;
}

const MenuCard: React.FC<MenuCardProps> = ({ card }) => {
    const menuCardRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const setItemRef = (itemName: string) => (el: HTMLDivElement | null) => {
        itemRefs.current[itemName] = el;
    };




    return (
        <motion.div
            className="rounded-xl relative bg-blend-luminosity"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 0 }}
        >
            <div
                key={card.title}
                ref={menuCardRef}
                className="border border-black rounded-xl p-4 sm:p-6 md:p-8 relative bg-gray-50 shadow-2xl/75 shadow-black/50"
            >
                <div className="rounded-lg p-4 sm:p-6">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-center mb-2 tracking-wide pb-2">
                        {card.title}
                    </h2>

                    {card.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex} className={sectionIndex > 0 ? "mt-4 sm:mt-6" : ""}>
                            {section.section && (
                                <div className="bg-neutral-900 text-white rounded-t-md px-3 py-1 sm:px-4 sm:py-2 text-lg sm:text-xl font-display font-semibold tracking-wide">
                                    {section.section}
                                </div>
                            )}

                            {section.items.map((item) => (
                                <div
                                    key={item.name}
                                    ref={setItemRef(item.name)}
                                    className={`px-3 py-3 sm:px-4 sm:py-4 relative group`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                                        <div className="flex items-center gap-3">
                                            {item.image && (
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <span className="text-xl sm:text-2xl font-display font-semibold">
                                                {item.name}
                                            </span>
                                        </div>
                                        <span className="text-xl sm:text-2xl font-display font-semibold min-w-max">{item.price}</span>
                                    </div>
                                    <div className="text-base sm:text-lg font-medium mt-1">{item.description}</div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut"
        }
    }
};

const CardWrapper: React.FC<{ card: MSInterface; index: number }> = ({ card, index }) => {
    const [cardRef, cardInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '-50px 0px'
    });

    return (
        <motion.div
            ref={cardRef}
            variants={itemVariants}
            initial="hidden"
            animate={cardInView ? "visible" : "hidden"}
            transition={{ delay: index * 0.1 }}
        >
            <MenuCard card={card} />
        </motion.div>
    );
};

export const MenuSection = () => {

    const t = useTranslations('MenuSection');

    // Intersection observer hook for the whole section
    const [sectionRef, sectionInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '-50px 0px'
    });

    const [menuData, setMenuData] = useState<MSInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const res = await fetch('/api/menu-sections', {
                    headers: {
                        'x-locale': window.location.pathname.split('/')[1] || 'en'
                    }
                });
                const data = await res.json();
                setMenuData(data);
            } catch (err) {
                console.error('Failed to fetch menu:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    return (
        <div
            ref={sectionRef}
            className="px-4 sm:px-6 md:px-8 py-6 md:py-12 relative left-1/2 -translate-x-1/2 max-w-7xl overflow-hidden "
        >
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-6 md:gap-10"
                columnClassName="bg-clip-padding flex flex-col gap-6 md:gap-10 mb-10"
            >
                {/* Menu Copy Content */}
                <motion.div
                    className="bg-neutral-900 text-white rounded-md p-6 sm:p-8 md:p-12"
                    initial="hidden"
                    animate={sectionInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <motion.div className="flex flex-col gap-6 md:gap-10" variants={containerVariants}>
                        <motion.div className="flex flex-col gap-2 md:gap-3 items-start" variants={itemVariants}>
                            <h1 className="text-3xl sm:text-4xl md:text-[52px] leading-snug font-style text-orange-300">
                                {t('discover')}
                            </h1>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display tracking-wide font-bold">
                                {t('menus')}
                            </h2>
                        </motion.div>
                        <motion.div
                            className="flex flex-col gap-4 text-base sm:text-lg"
                            variants={itemVariants}
                        >
                            <p>{t('para1')}</p>
                            <p>{t('para2')}</p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Cards with staggered animation */}
                {loading ? (
                    <p className="text-center col-span-2"> {t('loadingMenu')} </p>
                ) : (
                    menuData.map((card, idx) => (
                        <CardWrapper key={idx} card={card} index={idx} />
                    ))
                )}
            </Masonry>
        </div>
    );
}
