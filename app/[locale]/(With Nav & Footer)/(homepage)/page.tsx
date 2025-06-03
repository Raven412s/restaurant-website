import React from 'react'
import HeroSection from './_components/HeroSection'
import OurStory from './_components/OurStory'
import SeparatorParallax from '@/components/global/SeparatorParallax'
import { MenuSection } from './_components/MenuSection'
import LocationSection from './_components/LocationSection'
import TestimonialSection from './_components/TestimonialSection'
import { PlatesGrid } from './_components/PlatesGrid'


const HomePage = () => {
    return (
        <div className=''>
            <HeroSection />
            <OurStory />
            <SeparatorParallax
                imageSrc='/chocolate-explosion.jpg'
            />
            {/* MENU SECTION */}
        <MenuSection/>
            <SeparatorParallax
                imageSrc='/Restaurant-Dishes.mp4'
            />
        <LocationSection direction='rtl'/>
        <TestimonialSection/>
        <PlatesGrid/>
        </div>
    )
}

export default HomePage
