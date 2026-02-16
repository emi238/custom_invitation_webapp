'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { getUpcomingEvents } from '@/app/actions'

const inter = Inter({ subsets: ['latin'] })

interface EventInfo {
    id: string
    event_timestamp: string // ISO string from Supabase (timestamptz)
    event_title: string
    photo_url: string
    address: string
    link: string
}

export default function EventsSection() {
    // Default to January 2026
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1))
    const [events, setEvents] = useState<EventInfo[]>([])
    const [hoveredEventId, setHoveredEventId] = useState<string | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null)

    // Fetch events from Supabase
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getUpcomingEvents()
                if (data) {
                    setEvents(data)
                }
            } catch (error) {
                console.error('Error fetching events:', error)
            }
        }
        fetchEvents()
    }, [])

    // Calendar Navigation
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    // Calendar Grid Logic
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const daysInMonth = new Date(year, month + 1, 0).getDate()
        const firstDayOfMonth = new Date(year, month, 1).getDay()
        const startDayIndex = (firstDayOfMonth + 6) % 7

        const days = []
        for (let i = 0; i < startDayIndex; i++) {
            days.push(null)
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i))
        }
        return days
    }

    const formatDateWithSuffix = (date: Date) => {
        const day = date.getDate()
        const month = date.toLocaleString('default', { month: 'long' })
        let suffix = 'th'
        if (day % 10 === 1 && day !== 11) suffix = 'st'
        else if (day % 10 === 2 && day !== 12) suffix = 'nd'
        else if (day % 10 === 3 && day !== 13) suffix = 'rd'
        return `${day}${suffix} of ${month}`
    }

    const days = getDaysInMonth(currentDate)
    const monthName = currentDate.toLocaleString('default', { month: 'long' })
    const weekDays = ['mon', 'tues', 'weds', 'thurs', 'fri', 'sat', 'sun']

    return (
        <section id="events" className="w-full bg-[#E6DDD8] min-h-screen pt-24 pb-16 relative px-4 md:px-8 flex flex-col justify-center overflow-hidden">
            <div className="max-w-6xl mx-auto w-full flex flex-col h-full justify-center">
                <h2 className={`${inter.className} font-bold text-[#4F3457] text-3xl md:text-5xl mb-6 mt-[30px] lowercase tracking-tight shrink-0 pl-6 md:pl-8`}>
                    our events
                </h2>

                {/* Glass Container */}
                <div
                    className="relative rounded-[0.5rem] md:rounded-[1rem] overflow-hidden p-4 md:p-8 flex flex-col"
                    style={{
                        background: 'linear-gradient(to bottom, rgba(247, 244, 243, 0.6) 0%, rgba(143, 124, 183, 0.6) 100%)'
                    }}
                >
                    {/* Botanical Background Asset - Fixed Right */}
                    <div className="absolute top-0 right-0 h-full w-[60%] z-0 pointer-events-none opacity-50 mix-blend-multiply">
                        <div className="relative w-full h-full">
                            <Image
                                src="/background-botanical.png"
                                alt="Botanical Background"
                                fill
                                className="object-contain object-right"
                            />
                        </div>
                    </div>

                    {/* Calendar Content */}
                    <div className="relative z-10 w-full flex flex-col">
                        {/* Month Navigation - Reduced Font Sizes */}
                        <div className="flex justify-center items-center gap-6 mb-4 shrink-0">
                            <button
                                onClick={prevMonth}
                                className={`${inter.className} text-[#4F3457] text-2xl md:text-4xl font-bold hover:opacity-70 transition-opacity`}
                            >
                                &lt;
                            </button>
                            <h3 className={`${inter.className} text-[#4F3457] text-2xl md:text-4xl font-bold tracking-tight`}>
                                {monthName}
                            </h3>
                            <button
                                onClick={nextMonth}
                                className={`${inter.className} text-[#4F3457] text-2xl md:text-4xl font-bold hover:opacity-70 transition-opacity`}
                            >
                                &gt;
                            </button>
                        </div>

                        {/* Calendar Grid Container */}
                        <div className="w-full flex flex-col">
                            {/* Weekday Headers - Reduced Font Sizes */}
                            <div className="grid grid-cols-7 gap-1 mb-1 shrink-0">
                                {weekDays.map((day) => (
                                    <div key={day} className={`${inter.className} text-[#4F3457] text-xs md:text-base font-bold uppercase text-center`}>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Days Grid - Reduced number sizes */}
                            <div className="grid grid-cols-7 gap-0 border-t border-l border-[#4F3457]/20 rounded-lg overflow-hidden">
                                {days.map((date, index) => {
                                    if (!date) {
                                        return <div key={`empty-${index}`} className="bg-transparent aspect-square border-b border-r border-[#4F3457]/20"></div>
                                    }

                                    const year = date.getFullYear()
                                    const month = String(date.getMonth() + 1).padStart(2, '0')
                                    const day = String(date.getDate()).padStart(2, '0')
                                    const dateString = `${year}-${month}-${day}` // YYYY-MM-DD in local time

                                    const event = events.find(e => {
                                        if (!e.event_timestamp) return false
                                        const eventDate = new Date(e.event_timestamp)
                                        return eventDate.toDateString() === date.toDateString()
                                    })

                                    const dayNumber = date.getDate().toString().padStart(2, '0')

                                    // Format time from timestamp
                                    const timeString = event ? new Date(event.event_timestamp).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase() + ' (AEST)' + ' Start' : ''

                                    return (
                                        <div
                                            key={dateString}
                                            className="bg-transparent relative flex flex-col p-1 transition-colors hover:bg-white/10 aspect-square border-b border-r border-[#4F3457]/20"
                                        >
                                            <span className={`${inter.className} text-[#4F3457] font-bold text-xs md:text-xl`}>
                                                {dayNumber}
                                            </span>

                                            {event && (
                                                <div
                                                    className="absolute inset-0 m-0.5 cursor-pointer group z-20"
                                                    onMouseEnter={() => setHoveredEventId(event.id)}
                                                    onMouseLeave={() => setHoveredEventId(null)}
                                                    onClick={() => setHoveredEventId(event.id)} // For desktop click
                                                // For mobile tap, we'll use a transparent overlay or button that triggers the modal
                                                >
                                                    <div
                                                        className="relative w-full h-full rounded-sm shadow-sm opacity-80 hover:opacity-100 transition-opacity"
                                                        onClick={(e) => {
                                                            e.stopPropagation(); // Prevent double trigger if parent has listener
                                                            // On mobile, this will open the modal
                                                            if (window.innerWidth < 768) {
                                                                setHoveredEventId(null) // Clear hover
                                                                // setSelectEvent equivalent
                                                                // Since I don't want to add a new state variable without being sure, and the tool requirement says "Add selectedEvent state (line 23)", I will do that in the multi_replace logic or just use `hoveredEventId` as the state?
                                                                // Actually, let's add the state.
                                                                // But I can't add state comfortably in a partial replace unless I replace the top of the file too.
                                                                // I will assume I can replace the whole file content or a large chunk locally if I use `replace_file_content`.
                                                                // The instructions say "EndLine: 225", which implies replacing the whole body roughly.
                                                                // I'll stick to replacing from line 81 down and manage the state in a separate tool call? No, that's messy.
                                                                // Wait, I can't add state at line 23 if I start replacing at line 81.
                                                                // I should use `startLine: 20` or similar to include the state definition.
                                                            }
                                                        }}
                                                    >
                                                        <Image
                                                            src={event.photo_url}
                                                            alt={event.event_title}
                                                            fill
                                                            className="object-cover rounded-sm"
                                                        />
                                                        {/* Mobile Tap Overlay */}
                                                        <div
                                                            className="absolute inset-0 z-30 md:hidden"
                                                            onClick={() => setSelectedEvent(event)}
                                                        ></div>
                                                    </div>

                                                    {/* Hover Overlay - Desktop Only */}
                                                    <div
                                                        className={`hidden md:flex absolute inset-0 bg-[#E6DDD8]/95 backdrop-blur-sm p-1 flex-col justify-center gap-0.5 transition-opacity duration-300 rounded-sm overflow-hidden ${hoveredEventId === event.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                                    >
                                                        <h4 className={`${inter.className} text-[#4F3457] font-bold text-[15px] leading-tight line-clamp-2`}>
                                                            {event.event_title}
                                                        </h4>
                                                        <p className={`${inter.className} text-[#4F3457] text-[10px]`}>
                                                            {formatDateWithSuffix(new Date(event.event_timestamp))}
                                                        </p>
                                                        <p className={`${inter.className} text-[#4F3457] text-[10px]`}>
                                                            {timeString}
                                                        </p>
                                                        {event.address && (
                                                            <p className={`${inter.className} text-[#4F3457] text-[10px] text-wrap`}>
                                                                {event.address}
                                                            </p>
                                                        )}
                                                        {event.link && (
                                                            <span
                                                                className={`${inter.className} text-[#8F7CB7] text-[11px] font-bold underline cursor-pointer`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    window.open(event.link, '_blank');
                                                                }}
                                                            >
                                                                See event details!
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Event Details Modal */}
            {selectedEvent && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
                    <div
                        className="bg-[#FFF5EB] w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl flex flex-col relative animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-3 z-10 p-2 bg-white/50 backdrop-blur-md rounded-full text-[#5E4175]"
                            onClick={() => setSelectedEvent(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>

                        <div className="relative w-full aspect-video">
                            <Image
                                src={selectedEvent.photo_url}
                                alt={selectedEvent.event_title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="p-6 flex flex-col gap-3">
                            <h3 className={`${inter.className} text-[#5E4175] text-2xl font-bold leading-tight`}>
                                {selectedEvent.event_title}
                            </h3>

                            <div className="flex flex-col gap-1">
                                <p className={`${inter.className} text-[#8F7CB7] text-sm font-semibold uppercase tracking-wide`}>
                                    {formatDateWithSuffix(new Date(selectedEvent.event_timestamp))}
                                </p>
                                <p className={`${inter.className} text-[#4F3457] text-base`}>
                                    {new Date(selectedEvent.event_timestamp).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()} (AEST) Start
                                </p>
                            </div>

                            {selectedEvent.address && (
                                <div className="flex items-start gap-2 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5E4175" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <p className={`${inter.className} text-[#4F3457] text-sm leading-snug`}>
                                        {selectedEvent.address}
                                    </p>
                                </div>
                            )}

                            {selectedEvent.link && (
                                <button
                                    onClick={() => window.open(selectedEvent.link, '_blank')}
                                    className="mt-4 w-full bg-[#E2D2EB] text-[#5E4175] font-bold py-3 rounded-xl hover:bg-[#d4c0df] transition-colors active:scale-95"
                                >
                                    Visit Event Page
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
