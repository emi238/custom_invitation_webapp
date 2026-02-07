'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { getCommunityPolaroids } from '@/app/actions' // Server Action import

interface PolaroidProps {
    id: string
    src: string
    caption?: string
    rotation: number
    x: number
    y: number
    delay: number
}

function Polaroid({ src, caption, rotation, x, y, delay }: PolaroidProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.2, x: '80%', y: '80%' }} // Start near top of camera at bottom right
            animate={{ opacity: 1, scale: 1, x: `${x}%`, y: `${y}%` }} // Fly out to random position
            transition={{
                type: "spring",
                stiffness: 60,
                damping: 12,
                delay: delay * 0.15 // Stagger effect
            }}
            className="absolute w-40 md:w-56 overflow-visible transform hover:scale-110 hover:z-50 transition-all duration-300 ease-out cursor-pointer origin-center"
            style={{
                rotate: `${rotation}deg`,
                zIndex: 10,
            }}
        >
            <div className="relative w-full h-full pointer-events-none">
                <img
                    src={src}
                    alt={caption || 'Community Polaroid'}
                    className="w-full h-full object-contain filter drop-shadow-md"
                    loading="lazy"
                />
            </div>
        </motion.div >
    )
}

export default function PolaroidGallery() {
    const [polaroids, setPolaroids] = useState<PolaroidProps[]>([])
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.25, once: true })

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // Use Server Action instead of client-side logic to avoid Anon Key issues
                const data = await getCommunityPolaroids()

                if (data && data.length > 0) {
                    // Predefined scatter positions (x, y) in percentages to mimic the reference layout
                    // Avoiding bottom right corner where the camera is.
                    const slots = [
                        { x: 5, y: 10, r: -5 },   // Top Left
                        { x: 25, y: 5, r: 3 },    // Top mid-left
                        { x: 45, y: 15, r: -2 },  // Top center
                        { x: 65, y: 8, r: 4 },    // Top right
                        { x: 10, y: 40, r: 6 },   // Mid left
                        { x: 35, y: 35, r: -4 },  // Mid center
                        { x: 60, y: 45, r: 2 },   // Mid right
                        { x: 15, y: 70, r: -3 },  // Bottom left
                        { x: 40, y: 65, r: 5 },   // Bottom center
                        { x: 75, y: 30, r: -6 },  // Upper mid right (above camera)
                    ]

                    const mapped = data.map((item: any, i: number) => {
                        // Use a slot if available, otherwise random
                        const slot = slots[i % slots.length]
                        return {
                            id: item.id,
                            src: item.src,
                            caption: item.caption,
                            rotation: slot.r + (Math.random() * 4 - 2), // Slight rotation jitter
                            x: slot.x + (Math.random() * 2 - 1),        // Slight x jitter
                            y: slot.y + (Math.random() * 2 - 1),        // Slight y jitter
                            delay: i
                        }
                    })
                    setPolaroids(mapped)
                }
            } catch (err) {
                console.error('Error fetching polaroids:', err)
            }
        }

        fetchPhotos()
    }, [])

    return (
        <section
            ref={containerRef}
            id="polaroid-gallery"
            className="relative min-h-[120vh] w-full overflow-hidden"
            style={{
                // "The background is linear gradient from 100%, #FFE9C0 to 100%, #AD99C1 from half of the screen."
                background: 'linear-gradient(to bottom, #FFE9C0 0%, #FFE9C0 50%, #AD99C1 100%)'
            }}
        >
            <div className="relative w-full h-full min-h-[120vh]">
                {/* Section Title */}
                <div className="absolute top-10 left-0 right-0 text-center z-20 pointer-events-none">
                    <h2 className="text-4xl md:text-6xl font-bold text-[#5E4175]/80 font-sans tracking-tight opacity-70">
                        our community
                    </h2>
                </div>

                {/* Fixed Camera Image at Bottom Right */}
                <div className="absolute bottom-10 right-[-20px] md:right-10 z-30 w-64 md:w-[500px] pointer-events-none">
                    <Image
                        src="/fujifilm.png"
                        alt="Fujifilm Camera"
                        width={600}
                        height={600}
                        className="object-contain transform -rotate-6"
                        priority
                    />
                </div>

                {/* Polaroids - Render only when in view */}
                {isInView && polaroids.map((p) => (
                    <Polaroid
                        key={p.id}
                        {...p}
                    />
                ))}
            </div>
        </section>
    )
}
