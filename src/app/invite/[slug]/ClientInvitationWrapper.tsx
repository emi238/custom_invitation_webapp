'use client'

import React, { useEffect, useState } from 'react'
import { Invitation, InvitationStatus } from '@/lib/types'
import { respondToInvitation, markAsOpened } from '@/app/actions'
import Envelope from '@/components/Envelope'
import InvitationCard from '@/components/InvitationCard'

interface WrapperProps {
    invitation: Invitation
}

type InvitePhase = 'closed' | 'opening' | 'revealed'

export default function ClientInvitationWrapper({ invitation }: WrapperProps) {
    const [phase, setPhase] = useState<InvitePhase>('closed')
    const [status, setStatus] = useState<InvitationStatus>(invitation.status)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const isClosed = phase === 'closed'

    // If the invite has already been responded to, skip straight to revealed so the user sees the result instantly.
    useEffect(() => {
        if (invitation.status !== 'pending') {
            setPhase('revealed')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOpen = async () => {
        if (phase !== 'closed') return
        setPhase('opening')
        if (!invitation.opened_at) {
            await markAsOpened(invitation.slug)
        }

        // Ensure we always land in revealed even if animation events are dropped (mobile browser quirks).
        window.setTimeout(() => setPhase((p) => (p === 'opening' ? 'revealed' : p)), 1100)
    }

    const handleRespond = async (responseStatus: InvitationStatus) => {
        setIsSubmitting(true)
        const result = await respondToInvitation(invitation.slug, responseStatus)
        if (result.success) {
            setStatus(responseStatus)
        } else {
            alert(result.error || 'Something went wrong')
        }
        setIsSubmitting(false)
    }

    return (
        <div className="w-full max-w-[900px] flex flex-col items-center justify-center relative select-none">
            <div className={isClosed ? "animate-bounce-slow" : ""}>
                <Envelope
                    phase={phase}
                    onOpen={handleOpen}
                    brandLabel="HYPHAE"
                >
                    <InvitationCard
                        inviteeName={invitation.invitee_name}
                        invitationStatus={status}
                        onRespond={handleRespond}
                        isSubmitting={isSubmitting}
                        message={invitation.message}
                        eventTitle={invitation.event_title}
                        eventDate={invitation.event_date}
                        location={invitation.location}
                        whatToBring={invitation.what_to_bring}
                    />
                </Envelope>
            </div>

            {/* To: [person] - fixed to top left of screen */}
            <div
                className="fixed top-4 left-4 sm:top-8 sm:left-8 pointer-events-none"
                style={{
                    color: '#a381adff',
                    fontFamily: 'var(--font-dm-sans), sans-serif',
                    fontWeight: 'bold',
                    fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                    zIndex: 50,
                }}
            >
                To: {invitation.invitee_name}
            </div>

            {isClosed && (
                <p className="mt-10 lg:mt-32 text-purple-100/90 text-lg tracking-wide animate-pulse">
                    Tap to open
                </p>
            )}
        </div>
    )
}
