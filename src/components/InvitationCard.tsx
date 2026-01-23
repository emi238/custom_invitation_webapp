'use client'

import React from 'react'
import { InvitationStatus } from '@/lib/types'
import clsx from 'clsx'

interface InvitationCardProps {
    inviteeName: string
    invitationStatus: InvitationStatus
    onRespond: (status: InvitationStatus) => void
    isSubmitting?: boolean
    message?: string | null
    eventTitle?: string | null
    eventDate?: string | null
    location?: string | null
    whatToBring?: string | null
}

export default function InvitationCard({
    inviteeName,
    invitationStatus,
    onRespond,
    isSubmitting = false,
    message,
    eventTitle,
    eventDate,
    location,
    whatToBring
}: InvitationCardProps) {
    const isPending = invitationStatus === 'pending'
    const isAccepted = invitationStatus === 'accepted'

    // Format event date if provided
    const formattedDate = eventDate
        ? new Date(eventDate).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        })
        : null

    return (
        <div className="p-[clamp(0.75rem,3vw,2rem)] text-start h-full max-h-full flex flex-col justify-between bg-white relative overflow-hidden" style={{ fontFamily: 'var(--font-dm-sans), sans-serif' }}>
            {/* Decorative Border */}
            <div className="absolute inset-2 rounded-sm pointer-events-none" />

            <div className="flex-1 flex flex-col justify-center space-y-1 py-2 overflow-y-auto scrollbar-hide w-full">
                <p className="text-[#4F3457] w-full text-left px-2" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontWeight: 'bold', fontSize: 'var(--card-font-header)' }}>
                    Dear {inviteeName},
                </p>

                {message && (
                    <p className="text-gray-700 leading-relaxed px-2 text-left" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontWeight: 'bold', fontSize: 'var(--card-font-base)' }}>
                        {message}
                    </p>
                )}

                <div className="mt-1 lg:mt-6 space-y-1 text-gray-700 px-2 text-center flex flex-col items-center" style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 'var(--card-font-base)' }}>
                    <p className="font-medium, text-[#4F3457]" style={{ fontWeight: 'bold' }}>
                        {formattedDate}
                    </p>
                    <p className="text-[#4F3457]" style={{ fontWeight: 'bold' }}>
                        {location}
                    </p>
                    {whatToBring && (
                        <p className="text-gray-600 italic mt-2 max-w-[60%] mx-auto" style={{ fontSize: '0.9em' }}>
                            {whatToBring}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-2 z-10" style={{ marginTop: 'var(--button-margin-top)' }}>
                {isPending ? (
                    <div className="flex flex-row justify-center gap-[var(--button-gap)] px-2 w-full">
                        <button
                            onClick={() => onRespond('accepted')}
                            disabled={isSubmitting}
                            className="bg-[#4F3457] text-white font-medium rounded hover:bg-[#856198] transition-colors disabled:opacity-50 whitespace-nowrap"
                            style={{
                                fontFamily: 'var(--font-dm-sans), sans-serif',
                                paddingLeft: 'var(--button-px)',
                                paddingRight: 'var(--button-px)',
                                paddingTop: 'var(--button-py)',
                                paddingBottom: 'var(--button-py)',
                                fontSize: 'var(--button-text-size)'
                            }}
                        >
                            RSVP Yes
                        </button>
                        <button
                            onClick={() => onRespond('declined')}
                            disabled={isSubmitting}
                            className="border border-[#4F3457] text-[#4F3457] font-medium rounded hover:bg-purple-50 transition-colors disabled:opacity-50 whitespace-nowrap"
                            style={{
                                fontFamily: 'var(--font-dm-sans), sans-serif',
                                paddingLeft: 'var(--button-px)',
                                paddingRight: 'var(--button-px)',
                                paddingTop: 'var(--button-py)',
                                paddingBottom: 'var(--button-py)',
                                fontSize: 'var(--button-text-size)'
                            }}
                        >
                            Decline
                        </button>
                    </div>
                ) : (
                    <div className="p-3 rounded animate-fade-in">
                        <p className={clsx("font-medium text-center mx-auto max-w-[260px]", isAccepted ? "text-[#4F3457]" : "text-[#4F3457]")} style={{ fontFamily: 'var(--font-dm-sans), sans-serif', fontSize: 'var(--card-font-base)' }}>
                            {isAccepted ? "We look forward to seeing you!" : "See you next time!"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
