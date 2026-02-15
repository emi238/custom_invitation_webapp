'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const isBoard = pathname?.startsWith('/board')
    const isManifesto = pathname === '/manifesto'

    // Configuration
    // Configuration
    const textColor = isManifesto ? '#E8A87C' : '#5E4175'
    // User requested #3D2654 for manifesto navbar background (liquid glass)
    const barBgColor = isBoard ? 'transparent' : (isManifesto ? 'rgba(61, 38, 84, 0.1)' : 'rgba(226, 210, 235, 0.3)') // 
    // User requested #F7E3BD transparent for manifesto, keeping liquid glass feel for the button
    const buttonBgColor = isManifesto ? 'rgba(247, 227, 189, 0.8)' : '#E2D2EB'

    const navLinks = [
        { name: 'events', href: '/home#events' },
        { name: 'community board', href: '/board' },
        { name: 'our story', href: '/manifesto' },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`fixed top-[27px] left-0 right-0 z-50 flex items-center justify-between px-6 py-2 mx-8 ${isBoard ? 'md:mx-12' : isManifesto ? 'md:mx-24' : 'md:mx-32'} rounded-full backdrop-blur-md transition-all duration-300`}
                style={{
                    backgroundColor: barBgColor,
                    // 'liquid glass' effect 
                    boxShadow: isBoard ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : '0 4px 30px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
            >
                {/* Logo */}
                <Link href="/home" className="text-xl font-bold tracking-tight uppercase" style={{ color: textColor }}>
                    HYPHAE
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 font-medium text-sm">
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
                        href="/home#join"
                        onClick={(e) => {
                            if (pathname === '/home') {
                                e.preventDefault();
                                const element = document.getElementById('join');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
                                }
                            }
                        }}
                        className={`px-5 py-2 rounded-full font-medium transition-transform hover:scale-105 active:scale-95 ${isManifesto ? 'backdrop-blur-md' : ''}`}
                        style={{
                            backgroundColor: buttonBgColor,
                            color: isManifesto ? '#3D2654' : textColor
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
                        transition={{ type: "spring", bounce: 0, duration: 0.15 }}
                        className="fixed inset-0 z-[60] flex flex-col bg-[#FFF5EB]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-black/5">
                            <Link href="/home" onClick={() => setIsOpen(false)} className="text-xl font-bold tracking-tight uppercase" style={{ color: textColor }}>
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
                                href="/home#join"
                                onClick={(e) => {
                                    setIsOpen(false);
                                    if (pathname === '/home') {
                                        e.preventDefault();
                                        const element = document.getElementById('join');
                                        if (element) {
                                            element.scrollIntoView({ behavior: 'smooth', block: 'end' });
                                        }
                                    }
                                }}
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
