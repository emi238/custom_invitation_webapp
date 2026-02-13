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
        <section id="events" className="w-full bg-[#E6DDD8] pt-24 pb-16 relative px-4 md:px-8 flex flex-col justify-center overflow-hidden">
            {/* Reduced max-width to make grids smaller as requested (4xl) */}
            <div className="max-w-6xl mx-auto w-full flex flex-col">
                <h2 className={`${inter.className} font-bold text-[#4F3457] text-3xl md:text-5xl mb-6 mt-[30px] lowercase tracking-tight shrink-0 pl-6 md:pl-8`}>
                    our events
                </h2>

                {/* Glass Container */}
                <div
                    className="relative rounded-[0.5rem] md:rounded-[1rem] overflow-hidden p-10 md:p-8 flex flex-col"
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

                                    // FIX: Use local date construction to avoid timezone issues with toISOString()
                                    // toISOString() converts to UTC, which might shift the day back depending on timezone
                                    const year = date.getFullYear()
                                    const month = String(date.getMonth() + 1).padStart(2, '0')
                                    const day = String(date.getDate()).padStart(2, '0')
                                    const dateString = `${year}-${month}-${day}` // YYYY-MM-DD in local time

                                    // Match event by checking if they are on the same local day
                                    // 2026-01-29 08:00:00+00 should show up on Jan 29th locally
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
                                                    onClick={() => event.link && window.open(event.link, '_blank')}
                                                >
                                                    <div className="relative w-full h-full rounded-sm shadow-sm opacity-80 hover:opacity-100 transition-opacity">
                                                        <Image
                                                            src={event.photo_url}
                                                            alt={event.event_title}
                                                            fill
                                                            className="object-cover rounded-sm"
                                                        />
                                                    </div>

                                                    {/* Hover Overlay */}
                                                    <div
                                                        className={`absolute inset-0 bg-[#E6DDD8]/95 backdrop-blur-sm p-1 flex flex-col justify-center gap-0.5 transition-opacity duration-300 rounded-sm overflow-hidden ${hoveredEventId === event.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                                                    >
                                                        <h4 className={`${inter.className} text-[#4F3457] font-bold text-[10px] md:text-[15px] leading-tight line-clamp-2`}>
                                                            {event.event_title}
                                                        </h4>
                                                        <p className={`${inter.className} text-[#4F3457] text-[8px] md:text-[10px]`}>
                                                            {formatDateWithSuffix(new Date(event.event_timestamp))}
                                                        </p>
                                                        <p className={`${inter.className} text-[#4F3457] text-[8px] md:text-[10px]`}>
                                                            {timeString}
                                                        </p>
                                                        {event.address && (
                                                            <p className={`${inter.className} text-[#4F3457] text-[8px] md:text-[10px] text-wrap`}>
                                                                {event.address}
                                                            </p>
                                                        )}
                                                        {event.link && (
                                                            <span className={`${inter.className} text-[#8F7CB7] text-[8px] md:text-[11px] font-bold underline`}>
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
        </section>
    )
}
