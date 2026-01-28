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

// Board Types
export interface InternshipRole {
    position_title: string
    description: string
    hours_required: string
    responsibilities: string
    role_requirements: string
    what_they_will_gain: string
}

export interface InternshipPost {
    id: string
    created_at: string
    slug: string
    startup_name: string
    startup_icon: string // URL
    banner_image: string // URL
    description: string
    is_paid: boolean
    message_from_founder: string
    founder_signature_photo: string // URL
    promotional_video?: string // URL
    contact_details: string
    roles: InternshipRole[]
}

export interface CofounderPost {
    id: string
    created_at: string
    slug: string
    startup_name: string
    logo_image: string
    banner_image: string
    position_title: string
    description: string
    extended_description: string
    industry_tags: string[]
    founder_email: string
}
