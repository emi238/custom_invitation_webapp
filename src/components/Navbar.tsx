'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
    theme?: 'light' | 'dark'
}

export default function Navbar({ theme = 'light' }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    // Configuration based on theme
    const isLight = theme === 'light'
    const textColor = isLight ? '#5e4175' : '#E8A87C'
    const bgColor = isLight ? 'bg-white/20' : 'bg-[#462E61]/80'
    const borderColor = isLight ? 'border-white/10' : 'border-white/10'
    const mobileMenuBg = isLight ? 'bg-[#FFF5EB]' : 'bg-[#462E61]'

    // Custom Smooth Scroll Logic
    const smoothScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        // Close mobile menu if open
        setIsOpen(false)

        // If we are not on the home page, allow default navigation to /home#id
        if (pathname !== '/home' && pathname !== '/') {
            return
        }

        e.preventDefault()
        const targetId = id.replace('#', '')
        const element = document.getElementById(targetId)
        if (!element) return

        // Align the bottom of the section to the bottom of the viewport
        const elementRect = element.getBoundingClientRect()
        const elementBottom = elementRect.bottom + window.scrollY
        const offsetPosition = elementBottom - window.innerHeight

        const startPosition = window.scrollY
        const distance = offsetPosition - startPosition
        const duration = 1500 // 1.5s duration
        let start: number | null = null

        const animation = (currentTime: number) => {
            if (start === null) start = currentTime
            const timeElapsed = currentTime - start
            const run = ease(timeElapsed, startPosition, distance, duration)
            window.scrollTo(0, run)
            if (timeElapsed < duration) requestAnimationFrame(animation)
        }

        // Ease in-out quadratic function
        const ease = (t: number, b: number, c: number, d: number) => {
            t /= d / 2
            if (t < 1) return (c / 2) * t * t + b
            t--
            return (-c / 2) * (t * (t - 2) - 1) + b
        }

        requestAnimationFrame(animation)
    }

    const navLinks = [
        { name: 'events', href: '/home#events', id: '#events' },
        { name: 'community board', href: '/home', id: null }, // distinct behavior?
        { name: 'join us', href: '/home#join', id: '#join' },
    ]

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 ${bgColor} backdrop-blur-xl border-b ${borderColor} shadow-sm transition-all duration-300`}>
                <Link href="/home" className="text-xl font-bold tracking-tight" style={{ color: textColor }}>
                    HYPHAE
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 font-medium text-sm" style={{ color: textColor }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => link.id ? smoothScrollTo(e as any, link.id) : undefined}
                            className="hover:opacity-70 transition-opacity"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
                    onClick={() => setIsOpen(true)}
                    style={{ color: textColor }}
                >
                    <Menu size={24} />
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className={`fixed inset-0 z-[60] flex flex-col ${mobileMenuBg}`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-4 border-b border-white/10">
                            <Link href="/home" onClick={() => setIsOpen(false)} className="text-xl font-bold tracking-tight" style={{ color: textColor }}>
                                HYPHAE
                            </Link>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-full hover:bg-black/5 transition-colors"
                                style={{ color: textColor }}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Links */}
                        <div className="flex flex-col items-center justify-center flex-1 gap-8 p-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => link.id ? smoothScrollTo(e as any, link.id) : setIsOpen(false)}
                                    className="text-2xl font-bold capitalize hover:opacity-70 transition-opacity"
                                    style={{ color: textColor }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
