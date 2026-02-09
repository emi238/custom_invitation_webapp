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
    mx: number // Mobile X
    my: number // Mobile Y
    delay: number
}

function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false)

    useEffect(() => {
        const media = window.matchMedia(query)
        if (media.matches !== matches) {
            setMatches(media.matches)
        }
        const listener = () => setMatches(media.matches)
        media.addEventListener('change', listener)
        return () => media.removeEventListener('change', listener)
    }, [matches, query])

    return matches
}

function Polaroid({ src, caption, rotation, x, y, mx, my, delay }: PolaroidProps) {
    const isMobile = useMediaQuery('(max-width: 1024px)') // Mobile and Tablet mode

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.1, left: '80%', top: '80%' }} // Start near camera at bottom right
            animate={{
                opacity: 1,
                scale: 1,
                left: `${isMobile ? mx : x}%`,
                top: `${isMobile ? my : y}%`
            }} // Fly out to random position
            transition={{
                type: "spring",
                stiffness: 60,
                damping: 12,
                delay: delay * 0.15 // Stagger effect
            }}
            className="absolute w-24 md:w-44 overflow-visible transform hover:scale-110 hover:z-50 transition-all duration-300 ease-out cursor-pointer origin-center"
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
                    // "Wijdan, Ronil, Flynn, Blake, Tinzen, Isaac, Demus, Dakoda, Sam"
                    // Predefined scatter positions (x, y) = Desktop, (mx, my) = Mobile/Tablet
                    const knownSlots = [
                        { names: ['Wijdan'], x: 5, y: 12, mx: 3, my: 12, r: 5 },       // Top Left
                        { names: ['Ronil'], x: 22, y: 15, mx: 7, my: 35, r: 3 },        // Mid Left
                        { names: ['Isaac'], x: 8, y: 60, mx: 7, my: 58, r: 8 },        // Bottom Left
                        { names: ['Flynn'], x: 38, y: 11, mx: 35, my: 15, r: -4 },        // Top Center-Left
                        { names: ['Dennis'], x: 27, y: 60, mx: 43, my: 59, r: 6 }, // Bottom Center-Left
                        { names: ['Blake'], x: 42, y: 50, mx: 37, my: 37, r: -4 },       // Center
                        { names: ['Dakoda'], x: 55, y: 18, mx: 65, my: 34, r: -5 },      // Bottom Center
                        { names: ['Tinzen'], x: 70, y: 12, mx: 70, my: 12, r: 8 },      // Top Right
                        { names: ['First', 'Shot'], x: 85, y: 14, mx: 78, my: 55, r: 6 }, // Far Right
                        { names: ['Sam'], x: 60, y: 60, mx: 20, my: 79, r: -5 },          // Bottom Right
                    ]

                    const mapped = data.map((item: any, i: number) => {
                        // Find matching slot by caption
                        let slot = knownSlots.find(s =>
                            s.names.some(name => item.caption?.toLowerCase().includes(name.toLowerCase()))
                        )

                        // Fallback if no specific slot found
                        if (!slot) {
                            slot = {
                                names: [],
                                x: Math.random() * 80 + 10,
                                y: Math.random() * 80 + 10,
                                mx: Math.random() * 80 + 10,
                                my: Math.random() * 80 + 10,
                                r: (Math.random() * 10) - 5
                            }
                        }

                        return {
                            id: item.id,
                            src: item.src,
                            caption: item.caption,
                            rotation: slot.r,
                            x: slot.x,
                            y: slot.y,
                            mx: slot.mx,
                            my: slot.my,
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
            className="relative h-[100vh] w-full overflow-hidden"
            style={{
                // "The background is linear gradient from 100%, #FFE9C0 to 100%, #AD99C1 from half of the screen."
                background: 'linear-gradient(to bottom, #FFE9C0 0%, #FFE9C0 50%, #AD99C1 100%)'
            }}
        >
            <div className="relative w-full h-full">
                {/* Fixed Camera Image at Bottom Right */}
                <div className="absolute bottom-5 right-[-20px] md:right-5 z-0 w-[180px] md:w-[320px] lg:w-[380px] pointer-events-none">
                    <Image
                        src="/fujifilm.png"
                        alt="Fujifilm Camera"
                        width={400}
                        height={400}
                        className="object-contain transform rotate-6"
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
