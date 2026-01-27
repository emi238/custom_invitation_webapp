'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'




import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const sansFont = 'var(--font-dm-sans), sans-serif'
const serifFont = 'var(--font-playfair-display), serif'

const manifestoText = [
    "75% of people building Australia's innovative future operate under huge stress.",
    "63% experience anxiety, 45% experience burnout and 43% experience loneliness.",
    "Even worse:",
    "85% of first-time founders feel overwhelmed.",
    "That is, a 45% higher chance in loneliness for entrepreneurs under 34.",
    "Most startups don't fail because of bad ideas.",
    "They fail because founders burn out, feel isolated, or lose confidence.",
    "There is plenty of support in the ecosystem for connecting with mentors, operators, VCs...",
    "...but there is no true safe space for founder-to-founder connection and building real friendships that will last.",
    "Current solutions of community are built as a secondary channel for retention and delivery.",
    "Over 80% of Australian founders are university graduates or in university.",
    "Particularly for early-stage, first-time young founders, support is fragmented, where the majority of ecosystem support depends on university selection.",
    "University innovation ecosystems are not equal in maturity, creating support and resource asymmetry.",
    "It seems that most support for young founders in Queensland depends on the selection of university, not by hunger or commitment.",
    "Hyphae exists to change that.",
    "We believe that entrepreneurship was never meant to be lonely.",
    "There should be a community that places connection, genuine support and radical resource sharing at the forefront.",
    "We want to redefine what it means to build a startup - not in isolation, but in community.",
    "We welcome passionate young founders under 30 to connect, share and grow together by bonding over experiences.",
    "Imagine dinners, sharing of experiences, hobbies, retreats - all designed to make lifelong friendships...",
    "...create positive feedback loops, open opportunities for collaboration and form a more connected Queensland.",
    "Thanks for being here, and we would love to have you with us ☺."
]

interface ManifestoItemProps {
    text: string
    index: number
}

function ManifestoItem({ text, index }: ManifestoItemProps) {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    })

    // Map scroll progress to opacity and other properties
    // We want the item to be highlighted when it's in the center of the screen
    // "start end": top of element meets bottom of viewport (entered)
    // "end start": bottom of element meets top of viewport (left)

    // 0.5 is roughly the center of the lifecycle of the element on screen assuming it's smaller than viewport
    // But better to use offsets relative to center.
    // Let's optimize for: 
    // opacity 0 at start
    // opacity 1 at center (0.5)
    // opacity 0 at end

    const opacity = useTransform(scrollYProgress,
        [0, 0.2, 0.5, 0.8, 1],
        [0.1, 0.2, 1, 0.2, 0.1]
    )

    const scale = useTransform(scrollYProgress,
        [0, 0.5, 1],
        [0.9, 1.05, 0.9]
    )

    const color = useTransform(scrollYProgress,
        [0.3, 0.5, 0.7],
        ['#8C6997', '#E8A87C', '#8C6997']
    )

    const x = useTransform(scrollYProgress,
        [0, 0.5, 1],
        [0, 0, 0] // Could add horizontal movement if desired
    )

    return (
        <motion.div
            ref={targetRef}
            style={{ opacity, scale, color, x }}
            className="min-h-[50vh] flex items-center justify-center p-6 md:p-12 transition-colors duration-200"
        >
            <p
                className="text-xl md:text-4xl lg:text-5xl font-bold text-center leading-tight max-w-5xl"
                style={{ fontFamily: sansFont }}
            >
                {text}
            </p>
        </motion.div>
    )
}

export default function ManifestoPage() {
    return (
        <main className="min-h-screen bg-[#462E61] text-[#E8A87C] overflow-x-hidden selection:bg-[#E8A87C] selection:text-[#462E61]">
            {/* Nav / Back Button */}
            {/* Navigation */}
            <Navbar theme="dark" />

            {/* Back to Home Button */}
            <Link href="/home" className="fixed top-20 left-8 z-40 flex items-center gap-2 text-[#E8A87C]/50 hover:text-[#E8A87C] transition-colors">
                <ArrowLeft size={16} />
                <span className="text-xs font-bold tracking-widest uppercase">Back to Home</span>
            </Link>

            {/* The Manifesto Label */}
            <div className="fixed top-20 right-8 z-40 text-[#E8A87C]/50 text-xs font-bold tracking-widest uppercase pointer-events-none">
                The Manifesto
            </div>

            {/* Background Flower */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center opacity-15">
                <img
                    src="/flower-decor.png"
                    alt=""
                    className="w-[80vw] max-w-lg object-contain animate-pulse-slow"
                />
            </div>

            <div className="pt-[50vh] pb-[50vh]">
                {manifestoText.map((text, i) => (
                    <ManifestoItem key={i} text={text} index={i} />
                ))}

                {/* Final Call to Action */}
                <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 gap-8">
                    <Link
                        href="/home#join"
                        className="px-8 py-4 rounded-full font-bold text-[#462E61] bg-[#E8A87C] hover:bg-[#F0C09D] transition-all transform hover:scale-105 shadow-xl text-lg tracking-wide"
                    >
                        Join the Community
                    </Link>
                </div>
            </div>

            <div className="fixed bottom-8 left-0 right-0 flex justify-center z-50 pointer-events-none opacity-20">
                <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            </div>

            <Footer />
        </main>
    )
}
