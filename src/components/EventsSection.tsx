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
    const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1))
    const [events, setEvents] = useState<EventInfo[]>([])
    const [hoveredEventId, setHoveredEventId] = useState<string | null>(null)
    const [selectedEvent, setSelectedEvent] = useState<EventInfo | null>(null)

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
        <section id="events" className="w-full bg-[#E6DDD8] min-h-screen pt-24 pb-12 relative px-4 md:px-8 flex flex-col justify-center">
            <div className="w-full md:max-w-6xl mx-auto flex flex-col justify-center gap-6">
                <h2 className={`${inter.className} font-bold text-[#4F3457] text-3xl md:text-5xl mb-4 mt-4 lowercase tracking-tight shrink-0 pl-2 md:pl-8`}>
                    our events
                </h2>

                {/* Glass Container */}
                <div
                    className="relative rounded-[0.5rem] md:rounded-[1rem] overflow-hidden p-2 md:p-8 flex flex-col shadow-lg"
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
                        {/* Month Navigation */}
                        <div className="flex justify-center items-center gap-4 md:gap-6 mb-4 md:mb-8 shrink-0">
                            <button
                                onClick={prevMonth}
                                className={`${inter.className} text-[#4F3457] text-3xl md:text-4xl font-bold hover:opacity-70 transition-opacity`}
                            >
                                &lt;
                            </button>
                            <h3 className={`${inter.className} text-[#4F3457] text-2xl md:text-4xl font-bold tracking-tight uppercase mt-[10px]`}>
                                {monthName}
                            </h3>
                            <button
                                onClick={nextMonth}
                                className={`${inter.className} text-[#4F3457] text-3xl md:text-4xl font-bold hover:opacity-70 transition-opacity`}
                            >
                                &gt;
                            </button>
                        </div>

                        {/* Calendar Grid Container */}
                        <div className="w-full flex flex-col">
                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 gap-1 mb-2 shrink-0">
                                {weekDays.map((day) => (
                                    <div key={day} className={`${inter.className} text-[#4F3457] text-xs md:text-xl font-bold uppercase text-center py-2 icon-shadow`}>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-0 border-t border-l border-[#4F3457]/20 rounded-lg overflow-hidden shaoow-sm bg-white/5">
                                {days.map((date, index) => {
                                    if (!date) {
                                        return <div key={`empty-${index}`} className="bg-transparent aspect-[3/4] md:aspect-square border-b border-r border-[#4F3457]/20"></div>
                                    }

                                    const year = date.getFullYear()
                                    const month = String(date.getMonth() + 1).padStart(2, '0')
                                    const day = String(date.getDate()).padStart(2, '0')
                                    const dateString = `${year}-${month}-${day}`

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
                                            className="bg-transparent relative flex flex-col p-1 md:p-3 transition-colors hover:bg-white/10 aspect-[3/4] md:aspect-square border-b border-r border-[#4F3457]/20 group"
                                        >


                                            {event && (
                                                <div
                                                    className="absolute inset-0 m-0.5 cursor-pointer group/wrapper z-10 peer"
                                                    onMouseEnter={() => setHoveredEventId(event.id)}
                                                    onMouseLeave={() => setHoveredEventId(null)}
                                                    onClick={() => setHoveredEventId(event.id)}
                                                >
                                                    <div
                                                        className="relative w-full h-full rounded-sm shadow-sm opacity-100 hover:scale-[1.02] transition-all duration-300"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            if (window.innerWidth < 768) {
                                                                setHoveredEventId(null)
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
                                                        className="hidden md:flex absolute inset-0 bg-[#E6DDD8] backdrop-blur-md p-2 flex-col justify-center gap-1 transition-all duration-300 rounded-sm overflow-hidden opacity-0 group-hover/wrapper:opacity-100 pointer-events-none group-hover/wrapper:pointer-events-auto"
                                                    >
                                                        <div className="shrink-0 w-full">
                                                            <h4 className={`${inter.className} text-[#4F3457] font-bold text-sm md:text-base leading-tight line-clamp-2`}>
                                                                {event.event_title}
                                                            </h4>
                                                        </div>
                                                        <div className="flex flex-col gap-0.5 mt-1">
                                                            <p className={`${inter.className} text-[#4F3457] text-xs font-medium`}>
                                                                {formatDateWithSuffix(new Date(event.event_timestamp))}
                                                            </p>
                                                            <p className={`${inter.className} text-[#4F3457] text-xs`}>
                                                                {timeString}
                                                            </p>
                                                            {event.address && (
                                                                <p className={`${inter.className} text-[#4F3457] text-xs text-wrap mt-1`}>
                                                                    {event.address}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            <span className={`${inter.className} text-[#4F3457] font-bold text-sm md:text-xl z-20 relative pointer-events-none transition-opacity duration-300 peer-hover:opacity-0`}>
                                                {dayNumber}
                                            </span>
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
                        className="bg-[#FFFFFF] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl flex flex-col relative animate-in fade-in zoom-in duration-200"
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

                        <div className="p-8 flex flex-col gap-4">
                            <h3 className={`${inter.className} text-[#5E4175] text-3xl font-bold leading-tight`}>
                                {selectedEvent.event_title}
                            </h3>

                            <div className="flex flex-col gap-1">
                                <p className={`${inter.className} text-[#8F7CB7] text-base font-semibold uppercase tracking-wide`}>
                                    {formatDateWithSuffix(new Date(selectedEvent.event_timestamp))}
                                </p>
                                <p className={`${inter.className} text-[#4F3457] text-lg`}>
                                    {new Date(selectedEvent.event_timestamp).toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase()} (AEST) Start
                                </p>
                            </div>

                            {selectedEvent.address && (
                                <div className="flex items-start gap-2 mt-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5E4175" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                    <p className={`${inter.className} text-[#4F3457] text-base leading-snug`}>
                                        {selectedEvent.address}
                                    </p>
                                </div>
                            )}

                            {selectedEvent.link && (
                                <button
                                    onClick={() => window.open(selectedEvent.link, '_blank')}
                                    className="mt-6 w-full bg-[#E2D2EB] text-[#5E4175] font-bold py-4 rounded-xl hover:bg-[#d4c0df] transition-colors active:scale-95 text-lg"
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
