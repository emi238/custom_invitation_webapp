import React from 'react'
import Image from 'next/image'
import Navbar from '../../components/Navbar'
import PolaroidGallery from '../../components/PolaroidGallery'
import MissionVisionSection from '../../components/MissionVisionSection'
import EventsSection from '../../components/EventsSection'
import CommunitySection from '../../components/CommunitySection'
import JoinCommunitySection from '../../components/JoinCommunitySection'
import Footer from '../../components/Footer'

export default function Home() {
    return (
        <main className="bg-[#E6DDD8] min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[100dvh] w-full overflow-hidden snap-start">
                {/* Background Image */}
                <div className="absolute inset-0 z-0 flex justify-center items-start">
                    {/* Mobile Image */}
                    <img
                        src="/hero_mobile.JPG"
                        alt="Hero Background Mobile"
                        className="absolute inset-0 w-full h-full object-cover object-top block md:hidden"
                    />
                    {/* Desktop Image */}
                    <img
                        src="/hero_image.png"
                        alt="Hero Background Desktop"
                        className="absolute inset-0 w-full h-full object-cover object-top hidden md:block"
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">

                    {/* Definition Section - Top Right Area (With Padding) */}
                    <div className="flex justify-end mt-24 md:mt-32 w-full p-6 md:p-12">
                        <div className="w-1/2 md:w-auto md:max-w-md text-right flex flex-col items-end gap-2">
                            <h2
                                className="text-lg md:text-3xl font-bold font-sans"
                                style={{ color: '#4F3457' }}
                            >
                                /hʌɪfiː/ — noun, plural
                            </h2>
                            <p
                                className="text-xs md:text-xl font-medium leading-relaxed font-sans"
                                style={{ color: 'rgba(226, 210, 235, 0.7)' }}
                            >
                                The branching filamentous structures of a fungus that form an underground network,
                                connecting and nourishing entire ecosystems. It is invisible to the eye, but essential
                                for growth.
                            </p>
                        </div>
                    </div>

                    {/* Main Title - Bottom (No Padding, Left Aligned) */}
                    <div className="w-full mt-auto mb-0 md:mb-2">
                        <h1
                            className="font-bold leading-none tracking-tighter w-full font-sans uppercase whitespace-nowrap text-left md:-mb-[1vh]"
                            style={{
                                color: 'rgba(226, 210, 235, 0.8)',
                                fontSize: '15vw',
                                width: '100%',
                                marginLeft: '-0.05em',
                            }}
                        >
                            HYPHAE SPACE
                        </h1>
                    </div>
                </div>
            </section>

            {/* Polaroid Gallery Section */}
            <div className="snap-start w-full">
                <PolaroidGallery />
            </div>

            {/* Mission & Vision Section */}
            <div className="snap-start w-full">
                <MissionVisionSection />
            </div>

            {/* Events Section */}
            <div className="snap-start w-full">
                <EventsSection />
            </div>

            {/* Community Section */}
            <div className="snap-start w-full">
                <CommunitySection />
            </div>

            {/* Join Community Section */}
            <div className="snap-start w-full">
                <JoinCommunitySection />
            </div>

            {/* Footer */}
            <div className="snap-start w-full">
                <Footer />
            </div>
        </main>
    )
}
