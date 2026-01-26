'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Calendar, Users, Heart, Infinity } from 'lucide-react'
import { submitCommunitySignup, getPublicEvents } from '../actions'

// Define fonts in a safe way if variables aren't perfect, but we successfully added them in layout.
const serifFont = 'var(--font-playfair-display), serif'
const sansFont = 'var(--font-dm-sans), sans-serif'

// Types
interface Event {
    id: string
    title: string
    description: string
    location: string
    status: string
}

function JoinCommunitySection() {
    const [email, setEmail] = React.useState('')
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')
        try {
            const response = await submitCommunitySignup(email)

            if (!response.success) throw new Error(response.message)

            setStatus('success')
            setEmail('')
        } catch (error) {
            console.error('Error signing up:', error)
            setStatus('error')
        }
    }

    return (
        <section id="join" className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/community-background.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.75
                }}
            />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-8">
                <div className="space-y-4">
                    <h2
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                        style={{ fontFamily: sansFont, color: '#4F3457' }}
                    >
                        join the community
                    </h2>
                    <p
                        className="text-lg md:text-xl font-medium leading-relaxed max-w-xl mx-auto"
                        style={{ color: '#4F3457' }}
                    >
                        We believe that entrepreneurship was never meant to be lonely.
                        <br className="hidden md:block" />
                        You no longer need to build alone. Get notified when we launch.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-6 py-3 rounded-lg bg-white/50 backdrop-blur-sm border border-[#4F3457]/20 text-[#4F3457] placeholder-[#4F3457]/50 focus:outline-none focus:ring-2 focus:ring-[#71588A] transition-all text-center"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading' || status === 'success'}
                        className="w-full py-3 rounded-lg font-semibold text-white transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed bg-[#71588A] hover:bg-[#9784AB]"
                    >
                        {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Welcome!' : 'Submit'}
                    </button>
                    {status === 'error' && (
                        <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                    )}
                </form>
            </div>
        </section>
    )
}

function WhatWeDoSection() {
    return (
        <section className="relative py-24 px-4 md:px-3 overflow-hidden bg-[linear-gradient(to_bottom,#FFFFFF_0%,#E8A87C_40%)] flex flex-col justify-center">
            {/* Background Text - 3 Lines */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 pointer-events-none select-none overflow-hidden gap-0 space-y-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="whitespace-nowrap text-[30px] font-bold text-[#F7E3BD] leading-none opacity-10">
                        grow as a community — mutual support — connecting threads — grow as a community — mutual support — connecting threads
                    </div>
                ))}
            </div>

            <div className="max-w-5xl mx-auto w-full relative z-10">
                {/* Header */}
                <div className="text-center mb-8 max-w-3xl mx-auto">
                    <h2
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
                        style={{ fontFamily: sansFont, color: '#E8A87C' }}
                    >
                        what we do
                    </h2>
                    <p
                        className="text-lg md:text-xl leading-relaxed font-medium"
                        style={{ color: '#4F3457' }}
                    >
                        Think intimate dinners, celebrations, sports get-togethers, and experiences
                        to discover and share new skills and activities. We do what friends do.
                        <br />
                        <span className="font-bold">We bond over experiences.</span>
                    </p>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Card 1: Fun Stuff */}
                    <div className="flex flex-col gap-4 group">
                        <div className="aspect-square w-full bg-neutral-200 rounded-2xl overflow-hidden relative shadow-md transition-transform duration-300 group-hover:-translate-y-1">
                            {/* Placeholder for "fun stuff" image (running/sports) */}
                            <div className="absolute inset-0 bg-[#E8A87C]/10 flex items-center justify-center text-[#4F3457]/30 font-bold text-xl uppercase tracking-widest">
                                Placeholder: Fun Stuff
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-[#4F3457]">fun stuff</h3>
                            <p className="text-[#4F3457]/80 text-base md:text-lg leading-relaxed">
                                series of deep bonding and wellness activities and celebrating wins
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Serious Stuff */}
                    <div className="flex flex-col gap-4 group">
                        <div className="aspect-square w-full bg-neutral-200 rounded-2xl overflow-hidden relative shadow-md transition-transform duration-300 group-hover:-translate-y-1">
                            {/* Placeholder for "serious stuff" image (fireside/talks) */}
                            <div className="absolute inset-0 bg-[#E8A87C]/10 flex items-center justify-center text-[#4F3457]/30 font-bold text-xl uppercase tracking-widest">
                                Placeholder: Serious Stuff
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-[#4F3457]">serious stuff</h3>
                            <p className="text-[#4F3457]/80 text-base md:text-lg leading-relaxed">
                                fireside discussions, peer upskilling sessions and external guest workshops
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function MissionSection() {
    return (
        <div className="bg-[#462E61] text-white selection:bg-[#E8A87C] selection:text-[#462E61] relative z-20">

            {/* STATIC CONTENT: Who We Are */}
            <div className="min-h-screen container mx-auto px-6 md:px-12 py-24 flex flex-col justify-center">

                {/* Top Row: Definition & Who We Are */}
                <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24 mb-12">
                    {/* Left: Definition */}
                    <div className="flex-1 max-w-xl">
                        <h2 className="text-6xl md:text-8xl font-bold mb-4 tracking-tighter" style={{ fontFamily: sansFont, color: '#8C6997' }}>
                            HY-PHAE
                        </h2>
                        <div className="text-2xl md:text-3xl mb-6 font-normal" style={{ fontFamily: sansFont, color: '#D9C8BF' }}>
                            /hʌɪfiː/ — noun, plural
                        </div>
                        <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#E6DCD7' }}>
                            The branching filamentous structures of a fungus that form an underground network,
                            connecting and nourishing entire ecosystems — invisible to the eye, but essential for growth.
                        </p>
                    </div>

                    {/* Right: Who We Are - Stepped Down */}
                    <div className="flex-1 max-w-xl text-right md:text-right mt-12 md:mt-32">
                        <h3 className="text-5xl md:text-7xl font-bold mb-8 opacity-80" style={{ fontFamily: sansFont, color: '#8C6997' }}>
                            who we are
                        </h3>
                        <p className="text-lg md:text-xl leading-relaxed" style={{ color: '#E6DCD7' }}>
                            Hyphae is a founder-first social community for young founders across Queensland.
                            We connect ambitious entrepreneurs not by university or experience but by hunger and commitment.
                            We prioritise belonging, wellbeing and peer support.
                        </p>
                    </div>
                </div>

                {/* Bottom Row: Connect Share Grow & Stats */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
                    <div
                        className="text-5xl md:text-7xl font-semibold leading-[0.85] capitalize"
                        style={{ fontFamily: sansFont, color: '#8C6997' }}
                    >
                        <div>Connect.</div>
                        <div>Share.</div>
                        <div>Grow.</div>
                    </div>

                    <div className="flex gap-12 md:gap-24 text-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-4xl font-bold text-white">-</div>
                            <div className="text-sm uppercase tracking-wider text-[#8C6997] h-10 flex items-center justify-center font-semibold">
                                young<br />founders
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-4xl font-bold text-2xl text-white"><Infinity size={40} /></div>
                            <div className="text-sm uppercase tracking-wider text-[#8C6997] h-10 flex items-center justify-center font-semibold">
                                ideas<br />shared
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-4xl font-bold text-white">1</div>
                            <div className="text-sm uppercase tracking-wider text-[#8C6997] h-10 flex items-center justify-center font-semibold">
                                community
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-4xl font-bold text-white">Brisbane</div>
                            <div className="text-sm uppercase tracking-wider text-[#8C6997] h-10 flex items-center justify-center font-semibold">
                                based
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Part 1: MISSION SECTION (Static Block) */}
            <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden">
                {/* Flower Decor (Top Center) */}
                <div className="absolute top-0 md:top-[10%] left-0 right-0 flex justify-center opacity-30 pointer-events-none">
                    <img src="/flower-decor.png" alt="" className="w-[80vw] md:w-auto md:max-h-[50vh] object-contain opacity-60 mix-blend-screen" />
                </div>

                {/* Mission Text */}
                <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
                    <h2
                        className="text-5xl md:text-8xl font-bold mb-12"
                        style={{ fontFamily: sansFont, color: '#8C6997' }}
                    >
                        our mission
                    </h2>
                    <p
                        className="text-xl md:text-3xl leading-relaxed font-medium"
                        style={{ color: '#E6DCD7' }}
                    >
                        To build a safe and founder-led space where young entrepreneurs feel
                        supported, connected, and empowered to experiment, fail, and grow. Together.
                        If you're a young founder and you're hungry, you deserve the same support as anyone else.
                    </p>
                </div>
            </div>

            {/* Part 2: VISION SECTION (Static Block) */}
            <div className="relative min-h-screen w-full flex items-center justify-center p-6 overflow-hidden">
                {/* Vision Text */}
                <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
                    <h2
                        className="text-5xl md:text-8xl font-bold mb-12"
                        style={{ fontFamily: sansFont, color: '#8C6997' }}
                    >
                        our vision
                    </h2>
                    <p className="text-xl md:text-3xl text-[#FFD6C0] leading-relaxed font-bold">
                        Together, lets redefine what it means to build a startup – not in isolation, but in community.
                    </p>
                </div>

                {/* Vision Asset (Bottom) */}
                <div className="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
                    <img src="/vision-transparent.png" alt="" className="w-full object-cover opacity-80" />
                </div>
            </div>

        </div>
    )
}

function EventsSection() {
    const [events, setEvents] = React.useState<Event[]>([])
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getPublicEvents()
                if (data && data.length > 0) {
                    setEvents(data)
                }
            } catch (error) {
                console.error('Error fetching events:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    // Fallback/Placeholder if no events in DB yet (so design doesn't break for user immediately)
    const displayEvents = events.length > 0 ? events : [
        { id: '1', title: 'Founder Dinner #1', description: 'Intimate gathering of young founders across Brisbane. Bring your story, take home new friends and connections.', location: 'Brisbane', status: 'coming soon...' },
        { id: '2', title: 'Startups & Sunday Run', description: 'Join us for a casual 5k run along the river followed by coffee and chat.', location: 'New Farm Park', status: 'coming soon...' },
        { id: '3', title: 'Pitch Night', description: 'Practice your pitch in a safe environment with constructive feedback.', location: 'The Precinct', status: 'coming soon...' }
    ]

    return (
        <section id="events" className="scroll-mt-32 py-24 px-6 md:px-12 bg-gradient-to-b from-[#3D2654] to-[#8754BA] min-h-screen relative overflow-hidden">
            {/* Background Botanical */}
            <div className="absolute right-[5%] top-1/2 -translate-y-1/2 h-[90%] w-auto aspect-square pointer-events-none opacity-40 mix-blend-multiply md:mix-blend-normal md:opacity-100">
                <img
                    src="/background-botanical.png"
                    alt=""
                    className="w-full h-full object-contain object-center"
                />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h2
                        className="text-5xl md:text-6xl text-[#E8A87C] mb-6 font-bold tracking-tight"
                        style={{ fontFamily: sansFont }}
                    >
                        events
                    </h2>
                    <p className="text-[#E6DCD7] text-lg md:text-xl max-w-2xl mx-auto">
                        Our events are designed to foster genuine connection and radical mutual support.
                        No pre-rehearsed intros or pitches, just a celebration of real people building real things.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {displayEvents.map((item, i) => (
                        <div key={item.id || i} className="bg-[#F5F5F5]/80 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-[#4F3457] flex flex-col gap-4 shadow-lg">
                            <span className="text-sm font-medium opacity-60">{item.status}</span>
                            <h3 className="text-2xl font-bold">{item.title}</h3>
                            <p className="opacity-80 text-sm leading-relaxed mb-auto">
                                {item.description}
                            </p>
                            <div className="mt-4 pt-4 border-t border-[#4F3457]/10 flex items-center gap-2 text-sm opacity-80">
                                <div className="w-2 h-2 rounded-full bg-[#4F3457]"></div>
                                {item.location}
                            </div>
                            <button className="w-full py-3 mt-2 rounded-lg bg-[#71588A] hover:bg-[#5a3e70] transition-colors text-white text-sm font-medium shadow-md">
                                view more
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default function HomeLanding() {
    return (
        <div className="min-h-screen w-full overflow-x-hidden font-sans text-stone-800 bg-[#FFF5EB]">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-white/20 backdrop-blur-xl border-b border-white/10 shadow-sm transition-all duration-300">
                <div className="text-xl font-bold tracking-tight text-[#5e4175]">HYPHAE</div>
                <div className="flex items-center gap-6 text-[#5e4175] font-medium text-sm">
                    <a href="#events" className="hover:opacity-70 transition-opacity">events</a>
                    <a href="#" className="hover:opacity-70 transition-opacity">community board</a>
                    <a href="#join" className="hover:opacity-70 transition-opacity">join us</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 w-full h-full z-0"
                    style={{
                        backgroundImage: "url('/hero-background.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.8
                    }}
                />

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 max-w-5xl mx-auto mt-20 flex flex-col items-center gap-6"
                >
                    <h1
                        className="text-5xl md:text-7xl font-bold mb-2 tracking-tight"
                        style={{ fontFamily: sansFont, color: '#71588A' }}
                    >
                        Everyone celebrates unicorns.
                    </h1>
                    <p
                        className="text-2xl md:text-4xl font-medium leading-relaxed max-w-4xl mx-auto"
                        style={{ color: '#E8A87C' }}
                    >
                        No one talks about the network that grows underneath.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                        <button
                            className="px-8 py-3 rounded-full font-semibold text-white transition-colors shadow-lg hover:shadow-xl transform active:scale-95 duration-200"
                            style={{ backgroundColor: '#71588A' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#9784AB'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#71588A'}
                        >
                            join us
                        </button>
                        <button
                            className="px-8 py-3 rounded-full font-semibold border-2 transition-colors hover:bg-[#71588A]/5"
                            style={{
                                borderColor: '#71588A',
                                color: '#71588A',
                                backgroundColor: 'transparent'
                            }}
                        >
                            our founding manifesto
                        </button>
                    </div>
                </motion.div>


            </section>

            {/* Mission & Vision Section */}
            <MissionSection />

            {/* What We Do Section */}
            <WhatWeDoSection />

            {/* Events Section */}
            <EventsSection />

            {/* Join Community Section */}
            <JoinCommunitySection />

            {/* Footer */}
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
                            <a href="#" className="hover:opacity-70 transition-opacity">What is Hyphae?</a>
                            <a href="#" className="hover:opacity-70 transition-opacity">Who We Are</a>
                            <a href="#" className="hover:opacity-70 transition-opacity">Mission</a>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h4 className="font-bold mb-1 text-black">Connect</h4>
                            <a href="#events" className="hover:opacity-70 transition-opacity">Events</a>
                            <a href="#" className="hover:opacity-70 transition-opacity">Waitlist</a>
                            <a href="#" className="hover:opacity-70 transition-opacity">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div >
    )
}
