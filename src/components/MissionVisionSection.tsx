'use client'
import React from 'react'
import Image from 'next/image'
import { Inter, DM_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['700'] })

export default function MissionVisionSection() {
    return (
        <section
            className="relative w-full h-[100vh] overflow-hidden flex flex-col justify-between snap-start"
            style={{
                background: 'linear-gradient(to bottom, #B19BBA 0%, #8875B7 100%)'
            }}
        >
            {/* Stats Row */}
            <div className={`max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center mt-24 md:mt-32 relative z-20`}>
                <div className="flex flex-col items-center">
                    <span className={`${dmSans.className} text-[#5E4175] text-2xl md:text-4xl lg:text-5xl font-bold`}>1</span>
                    <span className="text-white text-base md:text-xl mt-2 font-medium tracking-wide">Community</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className={`${dmSans.className} text-[#5E4175] text-2xl md:text-4xl lg:text-5xl font-bold`}>20+</span>
                    <span className="text-white text-base md:text-lg mt-2 font-medium tracking-wide">Young Founders</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className={`${dmSans.className} text-[#5E4175] text-2xl md:text-4xl lg:text-5xl font-bold`}>∞</span>
                    <span className="text-white text-base md:text-lg mt-2 font-medium tracking-wide">Ideas Shared</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className={`${dmSans.className} text-[#5E4175] text-2xl md:text-4xl lg:text-5xl font-bold`}>Brisbane</span>
                    <span className="text-white text-base md:text-lg mt-2 font-medium tracking-wide">Based</span>
                </div>
            </div>

            {/* Mission/Vision Container - Extended to bottom */}
            <div className="flex-grow flex items-end justify-center px-4 md:px-8 z-20 pb-0 mt-8 md:mt-12">
                <div className="relative w-full max-w-[980px] bg-white/20 backdrop-blur-md border border-white/40 border-b-0 rounded-t-[2rem] md:rounded-t-[2.5rem] rounded-b-none p-4 md:p-8 pb-0 shadow-xl h-full flex flex-col justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 h-full">
                        {/* Mission Card */}
                        <div className="bg-white/60 rounded-t-[1.5rem] md:rounded-t-[2rem] rounded-b-none p-6 md:p-12 pb-24 md:pb-40 flex flex-col justify-start pt-16 gap-3 shadow-inner h-full">
                            <h3 className={`${inter.className} text-[#5E4175] text-3xl md:text-5xl lg:text-5xl font-bold lowercase tracking-tight`}>our mission</h3>
                            <p className={`${inter.className} text-[#4F3457] text-base md:text-sm lg:text-lg leading-relaxed`}>
                                To build a safe and founder-led space where young entrepreneurs feel <strong>supported</strong>, <strong>connected</strong>, and <strong>empowered</strong> to experiment, fail, and grow - together, because if you're an ambitious young founder, you deserve the same support as anyone else.
                            </p>
                        </div>

                        {/* Vision Card */}
                        <div className="bg-white/60 rounded-t-[1.5rem] md:rounded-t-[2rem] rounded-b-none p-6 md:p-12 pb-24 md:pb-40 flex flex-col justify-start pt-16 gap-3 shadow-inner h-full">
                            <h3 className={`${inter.className} text-[#5E4175] text-3xl md:text-5xl lg:text-5xl font-bold lowercase tracking-tight text-left md:text-right`}>our vision</h3>
                            <p className={`${inter.className} text-[#4F3457] text-base md:text-sm lg:text-lg leading-relaxed text-left md:text-right`}>
                                To <strong>redefine</strong> what it means to build a startup, not in isolation, but <strong>in community</strong>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Screen Spanning Petal Asset */}
            <div className="absolute bottom-0 left-0 w-full h-[50vh] z-30 pointer-events-none">
                <Image
                    src="/petal.png"
                    alt="Petals"
                    fill
                    className="object-cover object-bottom opacity-90"
                />
            </div>
        </section>
    )
}
