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
            <section id="hero" className="relative h-[100dvh] w-full overflow-hidden">
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
                        src="/hero_image_copy.png"
                        alt="Hero Background Desktop"
                        className="absolute inset-0 w-full h-full object-cover object-top hidden md:block"
                    />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">

                    {/* Definition Section - Top Right Area (With Padding) */}
                    <div className="flex justify-end mt-26 md:mt-32 w-full p-6 pr-2 md:p-12 -translate-y-[3px] md:translate-y-0">
                        <div className="w-1/2 md:w-auto md:max-w-md text-right flex flex-col items-end gap-0">
                            <h2
                                className="text-md md:text-3xl font-bold font-sans"
                                style={{ color: '#4F3457' }}
                            >
                                /hʌɪfiː/ — noun, plural
                            </h2>
                            <p
                                className="text-[11px] md:text-xl font-medium leading-tight md:leading-relaxed font-sans text-[rgba(226,210,235,0.8)] md:text-[rgba(226,210,235,0.7)] max-w-[140px] md:max-w-full"
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
                            className="font-bold leading-none tracking-tighter w-full font-sans uppercase whitespace-nowrap text-left md:-mb-[5vh]"
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
            <div id="who-we-are">
                <PolaroidGallery />
            </div>

            {/* Mission & Vision Section */}
            <div id="mission">
                <MissionVisionSection />
            </div>

            {/* Events Section */}
            <div id="events">
                <EventsSection />
            </div>

            {/* Community Section */}
            <CommunitySection />

            {/* Join Community Section */}
            <div id="join">
                <JoinCommunitySection />
            </div>

            {/* Footer */}
            <Footer />
        </main>
    )
}
