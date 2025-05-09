'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface SeparatorProps {
    imageSrc: string;
    alt?: string;
    height?: string;
    parallaxOffset?: [string, string];
    skewRange?: [number, number];
    overlayColor?: string;
    overlayOpacity?: number;
    imagePriority?: boolean;
    imageQuality?: number;
    springConfig?: {
        stiffness?: number;
        damping?: number;
        mass?: number;
    };
    className?: string;
    imageClassName?: string;
    overlayClassName?: string;
    videoClassName?: string;
}

export default function SeparatorParallax({
    imageSrc,
    alt = '',
    height = 'h-[70vh]',
    parallaxOffset = ['0%', '-40%'],
    skewRange = [-3, 0],
    overlayColor = 'bg-transparent lg:bg-stone-50',
    overlayOpacity = 100,
    imagePriority = true,
    imageQuality = 75,
    springConfig = { stiffness: 100, damping: 20, mass: 0.5 },
    className = '',
    imageClassName = '!h-full !w-full',
    overlayClassName = '',
    videoClassName = 'object-cover',
}: SeparatorProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(16 / 9);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    // Improved parallax effect with better mobile handling
    const yImage = useTransform(
        scrollYProgress,
        [0, 1],
        isMobile ? ['0%', '0%'] : parallaxOffset
    );

    const skew = useTransform(scrollYProgress, [0, 1], skewRange);
    const smoothSkew = useSpring(skew, springConfig);

    const isVideo = imageSrc.toLowerCase().endsWith('.mp4');

    // Calculate aspect ratio for videos
    useEffect(() => {
        if (isVideo) {
            const video = document.createElement('video');
            video.src = imageSrc;
            video.onloadedmetadata = () => {
                setAspectRatio(video.videoWidth / video.videoHeight);
            };
        }
    }, [imageSrc, isVideo]);

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden ${height} ${className}`}
            role="presentation"
            aria-hidden="true"
        >
            {/* Background media */}
            {isVideo ? (
                <motion.div
                    style={{
                        y: yImage,
                        aspectRatio: aspectRatio.toString(),
                        scale: isMobile ? 1 : 1.2 // Slightly zoomed out for better parallax effect
                    }}
                    className={`absolute inset-0 -z-20 w-full h-full will-change-transform ${videoClassName}`}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`absolute inset-0 w-full h-full ${videoClassName}`}

                    >
                        <source src={imageSrc} type="video/mp4" />
                    </video>
                </motion.div>
            ) : (
                <motion.div
                    style={{
                        y: yImage,
                        scale: isMobile ? 1 : 1.2 // Slightly zoomed out for better parallax effect
                    }}
                    className={`absolute inset-0 -z-20 w-full h-full will-change-transform ${imageClassName}`}
                >
                    <Image
                        src={imageSrc}
                        alt={alt}
                        fill
                        quality={imageQuality}
                        priority={imagePriority}
                        className={`object-cover ${imageClassName}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                    />
                </motion.div>
            )}

            {/* Top skewed overlay */}
            <motion.div
                style={{
                    skewY: smoothSkew,
                    opacity: `${overlayOpacity}%`
                }}
                className={`absolute top-[80%] left-0 w-full h-1/2 ${overlayColor} z-10 translate-y-10 will-change-transform ${overlayClassName}`}
            />

            {/* Bottom skewed overlay */}
            <motion.div
                style={{
                    skewY: smoothSkew,
                    opacity: `${overlayOpacity}%`
                }}
                className={`absolute bottom-[80%] left-0 w-full h-1/2 ${overlayColor} z-10 -translate-y-10 will-change-transform ${overlayClassName}`}
            />
        </div>
    );
}
