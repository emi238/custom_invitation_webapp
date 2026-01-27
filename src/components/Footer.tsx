'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sansFont = 'var(--font-dm-sans), sans-serif'

export default function Footer() {
    const pathname = usePathname()

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        // Only run custom scroll if we are currently on the Home page
        if (pathname === '/home' || pathname === '/') {
            e.preventDefault()
            const element = document.getElementById(id)
            if (!element) return

            // Align the bottom of the section to the bottom of the viewport
            const elementRect = element.getBoundingClientRect()
            const elementBottom = elementRect.bottom + window.scrollY
            const offsetPosition = elementBottom - window.innerHeight

            const startPosition = window.scrollY
            const distance = offsetPosition - startPosition
            const duration = 1500
            let start: number | null = null

            const animation = (currentTime: number) => {
                if (start === null) start = currentTime
                const timeElapsed = currentTime - start
                const run = ease(timeElapsed, startPosition, distance, duration)
                window.scrollTo(0, run)
                if (timeElapsed < duration) requestAnimationFrame(animation)
            }

            const ease = (t: number, b: number, c: number, d: number) => {
                t /= d / 2
                if (t < 1) return (c / 2) * t * t + b
                t--
                return (-c / 2) * (t * (t - 2) - 1) + b
            }

            requestAnimationFrame(animation)
        }
    }

    return (
        <footer className="py-8 px-4 bg-[#C2A2CE] overflow-hidden">
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12">
                <div className="flex-1">
                    <h2
                        className="text-8xl md:text-[7rem] font-bold tracking-tighter leading-none"
                        style={{ fontFamily: sansFont, color: '#4F3457' }}
                    >
                        HYPHAE
                    </h2>
                </div>

                <div className="flex gap-12 md:gap-16 text-[#4F3457] text-m font-medium pr-4 md:pr-12">
                    <div className="flex flex-col gap-1">
                        <h4 className="font-bold mb-1 text-black">Community</h4>
                        <Link href="/home#definition" onClick={(e) => handleScroll(e, 'definition')} className="hover:opacity-70 transition-opacity">What is Hyphae?</Link>
                        <Link href="/home#definition" onClick={(e) => handleScroll(e, 'definition')} className="hover:opacity-70 transition-opacity">Who We Are</Link>
                        <Link href="/home#our-mission" onClick={(e) => handleScroll(e, 'our-mission')} className="hover:opacity-70 transition-opacity">Mission</Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h4 className="font-bold mb-1 text-black">Connect</h4>
                        <Link href="/home#events" onClick={(e) => handleScroll(e, 'events')} className="hover:opacity-70 transition-opacity">Events</Link>
                        <Link href="/home#join" onClick={(e) => handleScroll(e, 'join')} className="hover:opacity-70 transition-opacity">Waitlist</Link>
                        <Link href="#" className="hover:opacity-70 transition-opacity">Contact</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
