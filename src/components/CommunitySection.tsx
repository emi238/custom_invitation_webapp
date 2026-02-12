'use client'
import React from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import { getCommunityPhotos } from '@/app/actions'

const inter = Inter({ subsets: ['latin'] })

export default function CommunitySection() {
    const [photos, setPhotos] = React.useState<any[]>([])

    // Fallback static cards for loading or empty state
    const staticPolaroids = [
        { color: '#BFB8E6', rotation: -6, zIndex: 10 },
        { color: '#CAC7EC', rotation: -3, zIndex: 20 },
        { color: '#AC9ECB', rotation: 0, zIndex: 30 },
        { color: '#CCC3EC', rotation: 3, zIndex: 20 },
        { color: '#C7BCE8', rotation: 6, zIndex: 10 },
    ]

    React.useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await getCommunityPhotos()
                if (data && data.length > 0) {
                    // Combine with static styles
                    const mapped = data.slice(0, 5).map((item: any, i: number) => ({
                        ...item,
                        // Cycle through static styles if we have more photos or just match index
                        ...staticPolaroids[i % staticPolaroids.length]
                    }))
                    setPhotos(mapped)
                }
            } catch (err) {
                console.error("Failed to load community photos", err)
            }
        }
        fetchPhotos()
    }, [])

    const displayItems = photos.length > 0 ? photos : staticPolaroids

    return (
        <section
            className="relative w-full h-[100vh] overflow-hidden flex flex-col items-center justify-center snap-start"
            style={{
                background: 'linear-gradient(to bottom, #FFF5E2 40%, #E2D2EB 100%)'
            }}
        >
            <div className="absolute bottom-0 left-0 w-full h-[85%] opacity-100 pointer-events-none z-0">
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
                    className="relative w-full max-w-[90rem] bg-white/5 backdrop-blur-[2px] border border-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.2)] rounded-[3rem] p-8 md:p-16 flex items-center justify-center mb-[-5rem]"
                >
                    <div className="flex flex-nowrap items-center justify-center gap-2 md:-space-x-4 lg:-space-x-8">
                        {displayItems.map((p, i) => (
                            <div
                                key={i}
                                className="relative w-44 h-52 md:w-52 md:h-64 lg:w-60 lg:h-76 p-3 shadow-xl transform transition-all duration-300 hover:scale-110 hover:z-50 cursor-pointer hover:rotate-0 flex-shrink-0"
                                style={{
                                    backgroundColor: p.color,
                                    transform: `rotate(${p.rotation}deg)`,
                                    zIndex: p.zIndex
                                }}
                            >
                                {/* Photo Area (White) */}
                                <div className="w-full h-[80%] bg-white shadow-inner mb-2 overflow-hidden relative">
                                    {p.src ? (
                                        <Image
                                            src={p.src}
                                            alt={p.caption || "Community Photo"}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        /* Placeholder */
                                        <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                                            {/* Photo */}
                                        </div>
                                    )}
                                </div>

                                {/* Caption Area */}
                                {p.caption && (
                                    <div className="w-full text-center px-2">
                                        <p className={`${inter.className} text-[#4F3457] text-sm md:text-base font-medium truncate opacity-80`}>
                                            {p.caption}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
