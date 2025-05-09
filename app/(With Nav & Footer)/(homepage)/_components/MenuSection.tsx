"use client"
import { menuCards } from '@/data/menu-items';
import { MenuSection as MSInterface, NutritionPopupProps } from '@/types';
import React, { useEffect, useRef, useState } from 'react'
import Masonry from 'react-masonry-css';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

const breakpointColumnsObj = {
    default: 2,
    1024: 2,
    640: 1,
};

const NutritionPopup: React.FC<NutritionPopupProps> = ({ info, position, itemRect, image }) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [adjustedPosition, setAdjustedPosition] = useState(position);

    useEffect(() => {
        if (!itemRect || !popupRef.current) return;

        const popupWidth = popupRef.current.offsetWidth;
        const viewportWidth = window.innerWidth;

        // Check if popup would go off-screen on the right
        if (position === 'right' && (itemRect.right + popupWidth) > viewportWidth) {
            setAdjustedPosition('left');
        }
        // Check if popup would go off-screen on the left
        else if (position === 'left' && (itemRect.left - popupWidth) < 0) {
            setAdjustedPosition('right');
        } else {
            setAdjustedPosition(position);
        }
    }, [position, itemRect]);

    return (
        <motion.div
            ref={popupRef}
            className={`absolute ${adjustedPosition === 'left' ? 'right-full mr-4' : 'left-full ml-4'} top-1/2 -translate-y-1/2 w-80 !bg-white rounded-xl shadow-lg border p-6 z-[999]`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            {image && (
                <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                    <Image
                        src={image}
                        alt="Dish"
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="font-semibold tracking-wide mb-2">NUTRITION INFORMATION</div>
            <ul className="mb-2">
                {Object.entries(info).map(([key, value]) => (
                    <li key={key} className="mb-1">
                        <span className="font-bold">{key}</span> {value}
                    </li>
                ))}
            </ul>
            <div className="text-xs text-gray-700 mt-2">
                * 2,000 calories a day is used for general nutrition advice, but calorie needs vary.
            </div>
        </motion.div>
    );
};

interface MenuCardProps {
    card: MSInterface;
}

const MenuCard: React.FC<MenuCardProps> = ({ card }) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [itemRect, setItemRect] = useState<DOMRect | null>(null);
    const menuCardRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const handleMouseEnter = (itemName: string) => {
        setHoveredItem(itemName);
        if (itemRefs.current[itemName]) {
            setItemRect(itemRefs.current[itemName]!.getBoundingClientRect());
        }
    };

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
                                    onMouseEnter={() => handleMouseEnter(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
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
                                        <span className="text-xl sm:text-2xl font-display font-semibold">{item.price}</span>
                                    </div>
                                    <div className="text-base sm:text-lg font-medium mt-1">{item.description}</div>
                                    {hoveredItem === item.name && item.nutrition && (
                                        <NutritionPopup
                                            info={item.nutrition}
                                            position={itemRect && itemRect.left > window.innerWidth / 2 ? 'left' : 'right'}
                                            itemRect={itemRect}
                                            image={item.image}
                                        />
                                    )}
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
    // Intersection observer hook for the whole section
    const [sectionRef, sectionInView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '-50px 0px'
    });

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
                                Discover
                            </h1>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display tracking-wide font-bold">
                                MENUS
                            </h2>
                        </motion.div>
                        <motion.div
                            className="flex flex-col gap-4 text-base sm:text-lg"
                            variants={itemVariants}
                        >
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, suscipit vitae!</p>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate maiores sit doloribus.</p>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Cards with staggered animation */}
                {menuCards.map((card, idx) => (
                    <CardWrapper key={idx} card={card} index={idx} />
                ))}
            </Masonry>
        </div>

    );
}
