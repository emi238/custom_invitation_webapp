'use client'
import React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function CommunitySection() {
    const polaroids = [
        { color: '#BFB8E6', rotation: -6, zIndex: 10 },
        { color: '#CAC7EC', rotation: -3, zIndex: 20 },
        { color: '#AC9ECB', rotation: 0, zIndex: 30 },
        { color: '#CCC3EC', rotation: 3, zIndex: 20 },
        { color: '#C7BCE8', rotation: 6, zIndex: 10 },
    ]

    return (
        <section
            className="relative w-full h-[100vh] overflow-hidden flex flex-col items-center justify-center snap-start"
            style={{
                background: 'linear-gradient(to bottom, #FFF5E2 0%, #E2D2EB 90%)'
            }}
        >
            <div className="absolute bottom-0 left-0 w-full h-[85%] opacity-60 pointer-events-none z-0">
                <Image
                    src="/leaf.png"
                    alt="Leaf"
                    fill
                    className="object-cover object-bottom"
                />
            </div>

            {/* Also maybe one more? User didn't specify multiple, just 'The background asset is called leaf.png' */}
            {/* I'll put it in the corner as decoration */}

            <div className="relative z-10 flex flex-col items-center gap-4 w-full max-w-[95%]">
                {/* Title */}
                <h2 className={`${inter.className} font-bold text-[#4F3457] text-4xl md:text-5xl text-center lowercase tracking-tight`}>
                    our community of young founders
                </h2>

                {/* Liquid Glass Container with Photos */}
                <div
                    className="relative w-full max-w-7xl bg-white/10 backdrop-blur-md border border-white/20 rounded-[3rem] p-8 md:p-12 flex items-center justify-center"
                >
                    <div className="flex flex-nowrap items-center justify-center gap-2 md:-space-x-4 lg:-space-x-8">
                        {polaroids.map((p, i) => (
                            <div
                                key={i}
                                className="relative w-32 h-40 md:w-40 md:h-52 lg:w-48 lg:h-64 p-2 shadow-xl transform transition-all duration-300 hover:scale-110 hover:z-50 cursor-pointer hover:rotate-0 flex-shrink-0"
                                style={{
                                    backgroundColor: p.color,
                                    transform: `rotate(${p.rotation}deg)`,
                                    zIndex: p.zIndex
                                }}
                            >
                                {/* Photo Area (White) */}
                                <div className="w-full h-[80%] bg-white shadow-inner mb-2 overflow-hidden relative">
                                    {/* Placeholder Image or actual photo? User didn't specify content */}
                                    {/* Using a placeholder gradient or empty */}
                                    <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                                        {/* Photo */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
