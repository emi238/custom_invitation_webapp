'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function NewHomeNavbar() {
    const [isOpen, setIsOpen] = useState(false)

    // Configuration
    const textColor = '#5E4175'
    const barBgColor = 'rgba(226, 210, 235, 0.3)'
    const buttonBgColor = '#E2D2EB'

    const navLinks = [
        { name: 'events', href: '/newhome#events' },
        { name: 'community', href: '/board' },
        { name: 'our story', href: '/newhome#story' },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-8 left-0 right-0 z-50 flex items-center justify-between px-6 py-2 mx-8 md:mx-32 rounded-full backdrop-blur-md"
                style={{
                    backgroundColor: barBgColor,
                    // 'liquid glass' effect - subtle border and shadow could enhance this
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                {/* Logo */}
                <Link href="/newhome" className="text-xl font-bold tracking-tight uppercase" style={{ color: textColor }}>
                    HYPHAE
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-medium text-sm">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:opacity-70 transition-opacity"
                            style={{ color: textColor }}
                        >
                            {link.name}
                        </Link>
                    ))}

                    {/* Join Us Button */}
                    <Link
                        href="/newhome#join" // Assuming join section exists or external link
                        className="px-5 py-2 rounded-full font-medium transition-transform hover:scale-105 active:scale-95"
                        style={{
                            backgroundColor: buttonBgColor,
                            color: textColor
                        }}
                    >
                        join us
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
                    onClick={() => setIsOpen(true)}
                    style={{ color: textColor }}
                >
                    <Menu size={24} />
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed inset-0 z-[60] flex flex-col bg-[#FFF5EB]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-black/5">
                            <Link href="/newhome" onClick={() => setIsOpen(false)} className="text-xl font-bold tracking-tight uppercase" style={{ color: textColor }}>
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
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-bold hover:opacity-70 transition-opacity"
                                    style={{ color: textColor }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/newhome#join"
                                onClick={() => setIsOpen(false)}
                                className="px-8 py-3 rounded-full text-xl font-bold transition-transform hover:scale-105 active:scale-95"
                                style={{
                                    backgroundColor: buttonBgColor,
                                    color: textColor
                                }}
                            >
                                join us
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
