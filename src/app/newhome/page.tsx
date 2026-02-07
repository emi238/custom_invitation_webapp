import React from 'react'
import Image from 'next/image'
import NewHomeNavbar from '../../components/NewHomeNavbar'
import PolaroidGallery from '../../components/PolaroidGallery'

export default function NewHomePage() {
    return (
        <main className="relative min-h-[100dvh] w-full overflow-hidden bg-stone-900">
            <NewHomeNavbar />

            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero_image.png"
                    alt="Hero Background"
                    fill
                    className="object-contain object-top -mt-[5vh] md:-mt-[110px]"
                    priority
                />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 w-full min-h-[100dvh] flex flex-col justify-between">

                {/* Definition Section - Top Right Area (With Padding) */}
                <div className="flex justify-end mt-24 md:mt-32 w-full p-6 md:p-12">
                    <div className="max-w-md text-right flex flex-col items-end gap-2">
                        <h2
                            className="text-2xl md:text-3xl font-bold font-sans"
                            style={{ color: '#4F3457' }}
                        >
                            /hʌɪfiː/ — noun, plural
                        </h2>
                        <p
                            className="text-lg md:text-xl font-medium leading-relaxed font-sans"
                            style={{ color: 'rgba(226, 210, 235, 0.7)' }} // #E2D2EB 70% opacity
                        >
                            The branching filamentous structures of a fungus that form an underground network,
                            connecting and nourishing entire ecosystems. It is invisible to the eye, but essential
                            for growth.
                        </p>
                    </div>
                </div>

                {/* Main Title - Bottom (No Padding, Left Aligned) */}
                <div className="w-full mt-auto mb-12">
                    <h1
                        className="font-bold leading-none tracking-tighter w-full font-sans uppercase whitespace-nowrap text-left"
                        style={{
                            color: 'rgba(226, 210, 235, 0.8)',
                            fontSize: '17vw',
                            width: '100%',
                            marginLeft: '-0.05em',
                            marginBottom: '-10vh',
                        }}
                    >
                        HYPHAE SPACE
                    </h1>
                </div>
            </div>

            {/* Polaroid Gallery Section */}
            <PolaroidGallery />
        </main>
    )
}
