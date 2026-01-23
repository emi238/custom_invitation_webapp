export type InvitationStatus = 'pending' | 'accepted' | 'declined'

export interface Invitation {
    id: string
    slug: string
    invitee_name: string
    status: InvitationStatus
    message: string | null
    event_title: string | null
    event_date: string | null
    location: string | null
    what_to_bring: string | null
    opened_at: string | null
    responded_at: string | null
    created_at: string
}
