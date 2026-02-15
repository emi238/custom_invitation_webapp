'use client'

import React, { useEffect, useState, useRef } from 'react'
import { MotionValue, motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { getCommunityPolaroids } from '@/app/actions'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface PolaroidData {
    id: string
    src: string
    caption?: string
    rotation: number
    x: number
    y: number
    mx: number
    my: number
    ex: number
    ey: number
    emx: number
    emy: number
    delay: number
}

interface PolaroidProps extends PolaroidData {
    scrollYProgress: MotionValue<number>
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

function Polaroid({ src, caption, rotation, x, y, mx, my, ex, ey, emx, emy, delay, scrollYProgress }: PolaroidProps) {
    const isMobile = useMediaQuery('(max-width: 1024px)') // Mobile and Tablet mode

    // Use transform to animate from Start Position (x) to Edge Position (ex) based on scroll
    // 0.15 - 0.5 matches the overlay animation range
    const currentX = useTransform(scrollYProgress, [0.15, 0.5], [`${isMobile ? mx : x}%`, `${isMobile ? emx : ex}%`])
    const currentY = useTransform(scrollYProgress, [0.15, 0.5], [`${isMobile ? my : y}%`, `${isMobile ? emy : ey}%`])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.1, x: 100, y: 100 }} // Start near camera (offset translation)
            animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0
            }} // Fly to natural position
            transition={{
                type: "spring",
                stiffness: 60,
                damping: 12,
                delay: delay * 0.15 // Stagger effect
            }}
            className="absolute w-24 md:w-32 lg:w-44 overflow-visible transform hover:scale-110 hover:z-50 transition-all duration-300 ease-out cursor-pointer origin-center"
            style={{
                rotate: `${rotation}deg`,
                zIndex: 10,
                left: currentX,
                top: currentY
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
    const [polaroids, setPolaroids] = useState<PolaroidData[]>([])
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { amount: 0.25, once: true })
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Map scroll progress to overlay position (y)
    // As user scrolls through the 300vh section:
    // 0.15 - 0.5: Overlay slides up to cover the screen
    // 0.5 - 1.0: Overlay stays fully visible (static) for ~100vh+ of scrolling
    const overlayY = useTransform(scrollYProgress, [0.15, 0.5], ['100%', '0%'])

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                // Use Server Action instead of client-side logic to avoid Anon Key issues
                const data = await getCommunityPolaroids()

                if (data && data.length > 0) {
                    // Predefined scatter positions (x, y) = Desktop, (mx, my) = Mobile/Tablet
                    // ex, ey = Edge positions for Desktop (when overlay is up) -> Forming a circle/frame
                    // emx, emy = Edge positions for Mobile -> Forming a frame around text
                    const knownSlots = [
                        { names: ['Wijdan'], x: 5, y: 12, mx: 3, my: 12, r: 5, ex: 13, ey: 10, emx: 5, emy: 10 },       // Top Left (Higher, Right)
                        { names: ['Ronil'], x: 22, y: 15, mx: 7, my: 35, r: 3, ex: 5, ey: 45, emx: 2, emy: 35 },        // Mid Left
                        { names: ['Isaac'], x: 8, y: 60, mx: 7, my: 58, r: 8, ex: 18, ey: 78, emx: 5, emy: 65 },        // Bottom Left (Right, Higher)
                        { names: ['Flynn'], x: 38, y: 11, mx: 35, my: 15, r: -4, ex: 35, ey: 5, emx: 30, emy: 20 },        // Top Center-Left
                        { names: ['Dennis'], x: 27, y: 60, mx: 43, my: 59, r: 6, ex: 35, ey: 75, emx: 30, emy: 75 }, // Bottom Center-Left (Higher)
                        { names: ['Blake'], x: 42, y: 50, mx: 37, my: 37, r: -4, ex: 58, ey: 75, emx: 58, emy: 70 },       // Center -> Bottom Right Center (Higher, Left)
                        { names: ['Dakoda'], x: 55, y: 18, mx: 65, my: 34, r: -5, ex: 55, ey: 5, emx: 55, emy: 5 },      // Top Center -> Top Right Center (Left)
                        { names: ['Tinzen'], x: 70, y: 12, mx: 70, my: 12, r: 8, ex: 75, ey: 8, emx: 80, emy: 10 },      // Top Right (Left, Higher)
                        { names: ['First', 'Shot'], x: 85, y: 20, mx: 78, my: 55, r: 6, ex: 90, ey: 25, emx: 80, emy: 50 }, // Right Edge (Higher)
                        { names: ['Sam'], x: 60, y: 60, mx: 20, my: 79, r: -5, ex: 90, ey: 70, emx: 58, emy: 27 },          // Bottom Right (Higher)
                    ]

                    const mapped = data.map((item: any, i: number) => {
                        // Find matching slot by caption
                        let slot = knownSlots.find(s =>
                            s.names.some(name => item.caption?.toLowerCase().includes(name.toLowerCase()))
                        )

                        // If found, use specific slot values
                        if (slot) {
                            return {
                                id: item.id,
                                src: item.src,
                                caption: item.caption,
                                rotation: slot.r,
                                x: slot.x,
                                y: slot.y,
                                mx: slot.mx,
                                my: slot.my,
                                ex: slot.ex,
                                ey: slot.ey,
                                emx: slot.emx,
                                emy: slot.emy,
                                delay: i
                            }
                        }

                        // Fallback: Random scatter and random edge push
                        const isLeft = Math.random() > 0.5
                        const isTop = Math.random() > 0.5
                        return {
                            id: item.id,
                            src: item.src,
                            caption: item.caption,
                            rotation: (Math.random() * 10) - 5,
                            x: Math.random() * 80 + 10,
                            y: Math.random() * 80 + 10,
                            mx: Math.random() * 80 + 10,
                            my: Math.random() * 80 + 10,
                            // Push random items to corners/edges
                            ex: isLeft ? Math.random() * 15 : 85 + Math.random() * 15,
                            ey: isTop ? Math.random() * 15 : 85 + Math.random() * 15,
                            emx: isLeft ? Math.random() * 15 : 85 + Math.random() * 15,
                            emy: isTop ? Math.random() * 15 : 85 + Math.random() * 15,
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
            className="relative h-[300vh] w-full snap-start"
        >
            {/* Internal Snap Point for Overlay Visibility */}
            <div className="absolute top-[50%] w-full h-1 snap-start pointer-events-none" />

            <div
                className="sticky top-0 h-[100vh] w-full overflow-hidden"
                style={{
                    // "The background is linear gradient from 100%, #FFE9C0 to 100%, #AD99C1 from half of the screen."
                    background: 'linear-gradient(to bottom, #FFE9C0 0%, #FFE9C0 30%, #AD99C1 100%)'
                }}
            >
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
                        scrollYProgress={scrollYProgress}
                    />
                ))}

                {/* Liquid Glass Overlay */}
                <motion.div
                    style={{ y: overlayY }}
                    className="absolute inset-x-0 bottom-0 h-full z-20 flex flex-col items-center justify-center pt-24 md:pt-40 text-center"
                >
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-xs rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border-t border-white/30"></div>

                    <div className="relative z-10 max-w-4xl mx-auto flex flex-col gap-2">
                        <h2 className={`${inter.className} font-bold text-[#5E4175] text-2xl md:text-7xl leading-none tracking-tight`}>
                            who we are
                        </h2>
                        <p className={`${inter.className} font-medium text-[#4F3457] text-sm md:text-xl leading-relaxed max-w-[60%] mx-auto`}>
                            Hyphae is a founder-first social community for young
                            founders across Queensland. We connect ambitious
                            entrepreneurs not by university or experience but by hunger
                            and commitment.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
