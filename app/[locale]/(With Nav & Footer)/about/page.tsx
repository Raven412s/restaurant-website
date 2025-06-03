import SeparatorParallax from '@/components/global/SeparatorParallax'
import Image from 'next/image'
import React from 'react'
import { useTranslations } from 'next-intl'
import LocationSection from '../(homepage)/_components/LocationSection'

const AboutPage = () => {
    const t = useTranslations('AboutPage')

    return (
        <div>
            {/* Hero Section */}
            <div className="relative h-[60vh] w-full">
                <Image
                    src="/menu-hero.jpg"
                    alt="Restaurant Menu"
                    fill
                    priority
                    className="object-cover brightness-75"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h1 className="text-6xl md:text-6xl mb-4 text-center font-style">
                        {t('hero.discover')}
                    </h1>
                    <h2 className="text-5xl md:text-7xl font-bold font-display text-center">
                        {t('hero.aboutUs')}
                    </h2>
                </div>
            </div>
            <div className="bg-neutral-950 text-white py-16">
                <div className="max-w-3xl flex flex-col items-center justify-center py-7 mx-auto space-y-6">
                    <p className='uppercase font-bold'>{t('testimonial.tagline')}</p>
                    <p className='font-semibold text-4xl text-center leading-normal'>{t('testimonial.description')}</p>
                    <span className='text-5xl font-style font-semibold'>{t('testimonial.author')}</span>
                </div>
            </div>
            <div className="">
                <LocationSection direction='ltr'/>
            </div>

            <SeparatorParallax imageSrc='/chocolate-explosion.jpg' />
        </div>
    )
}

export default AboutPage
