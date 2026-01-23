'use client'

import React from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import Image from 'next/image'

interface EnvelopeProps {
    children: React.ReactNode
    onOpen?: () => void
    disabled?: boolean
    phase?: 'closed' | 'opening' | 'revealed'
    toLabel?: string
    brandLabel?: string
}

export default function Envelope({
    children,
    onOpen,
    disabled = false,
    phase = 'closed',
    toLabel,
    brandLabel,
}: EnvelopeProps) {
    const opened = phase !== 'closed'

    // Animation variants
    const flapVariants = {
        closed: { rotateX: 0 },
        open: { rotateX: 180 },
    }

    const letterVariants = {
        closed: { y: '25%', x: '-50%', opacity: 0, scale: 'var(--letter-scale)' },
        opening: {
            y: '0%',
            x: '-50%',
            opacity: 1,
            scale: 'var(--letter-scale)',
            transition: { delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }
        },
        revealed: {
            y: 'var(--letter-reveal-y)',
            x: '-50%',
            opacity: 1,
            scale: 'var(--letter-scale)',
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const }
        }
    }

    return (
        <div
            className={clsx(
                "relative flex items-center justify-center w-[min(92vw,835px)] mx-auto perspective-[1000px]",
                disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            )}
            style={{
                aspectRatio: '835/500',
                transform: 'scale(var(--envelope-scale)) translateY(var(--envelope-y))',
                transformOrigin: 'center'
            }}
            onClick={() => phase === 'closed' && !disabled && onOpen?.()}
        >
            {/* Envelope Body (Back) */}
            <div className="absolute inset-0" style={{ backgroundColor: '#8B6A97', zIndex: 0 }} />

            {/* Letter (Inside) - behind left, right, and bottom flaps, but above top flap when opened */}
            <motion.div
                className="absolute shadow-xl bg-white rounded-md overflow-hidden flex flex-col"
                style={{
                    width: '95%',
                    minHeight: '98%',
                    height: 'auto',
                    maxHeight: '105%',
                    left: '50%',
                    top: '-35%',
                    zIndex: phase === 'closed' ? 5 : 15
                }}
                initial="closed"
                animate={phase}
                variants={letterVariants}
            >
                {children}
            </motion.div>

            {/* Bottom triangular flap */}
            <div
                className="absolute bottom-0 left-0 w-full h-full"
                style={{
                    zIndex: 16,
                    pointerEvents: 'none'
                }}
            >
                <Image
                    src="/bottom.svg"
                    alt=""
                    fill
                    className="object-contain object-bottom"
                    style={{ pointerEvents: 'none' }}
                />
            </div>

            {/* Left triangular flap */}
            <div
                className="absolute left-0 top-0 w-full h-full"
                style={{
                    zIndex: 15,
                    pointerEvents: 'none'
                }}
            >
                <Image
                    src="/left.svg"
                    alt=""
                    fill
                    className="object-contain object-left"
                    style={{ pointerEvents: 'none' }}
                />
            </div>

            {/* Right triangular flap */}
            <div
                className="absolute right-0 top-0 w-full h-full"
                style={{
                    zIndex: 15,
                    pointerEvents: 'none'
                }}
            >
                <Image
                    src="/right.svg"
                    alt=""
                    fill
                    className="object-contain object-right"
                    style={{ pointerEvents: 'none' }}
                />
            </div>

            {/* HYPHAE - bottom left of envelope */}
            <div
                className="absolute bottom-4 left-4"
                style={{
                    color: '#4F3457',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontSize: 'clamp(2rem, 10vw, 5rem)',
                    fontWeight: 'bold',
                    lineHeight: '1',
                    zIndex: 26
                }}
            >
                HYPHAE
            </div>

            {/* To: [person] - outside letter, bottom left */}
            {toLabel && (
                <div
                    className="relative bottom-[-300px]"
                    style={{
                        color: '#4F3457',
                        fontFamily: 'var(--font-dm-sans), sans-serif',
                        fontWeight: 'bold',
                        fontSize: 'clamp(1rem, 4vw, 2.5rem)',
                        zIndex: 20
                    }}
                >
                    To: {toLabel}
                </div>
            )}

            {/* Envelope Flap (Top) */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full origin-top overflow-visible"
                style={{ zIndex: opened ? 10 : 20 }}
                initial="closed"
                animate={opened ? "open" : "closed"}
                variants={flapVariants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <Image
                    src="/top.svg"
                    alt=""
                    fill
                    className="object-contain object-top"
                    style={{ pointerEvents: 'none' }}
                />
            </motion.div>

        </div>
    )
}
