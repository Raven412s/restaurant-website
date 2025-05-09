import React from 'react'
import { MenuSection } from '../(homepage)/_components/MenuSection'
import SeparatorParallax from '@/components/global/SeparatorParallax'
import Image from 'next/image'

const MenuPage = () => {
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
                    <h1 className="text-6xl md:text-6xl  mb-4 text-center font-style">
                        Check out
                    </h1>
                    <h2 className="text-5xl md:text-7xl font-bold font-display text-center">
                        Our Menus
                    </h2>
                </div>
            </div>

            <MenuSection />
            <SeparatorParallax imageSrc='/chocolate-explosion.jpg' />
        </div>
    )
}

export default MenuPage
