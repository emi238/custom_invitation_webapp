import { notFound } from 'next/navigation'
import { getInvitation } from '@/app/actions'
import ClientInvitationWrapper from './ClientInvitationWrapper'
import { Metadata } from 'next'
import Image from 'next/image'

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    await params // Ensure params is resolved (Next.js 16 requirement)
    return {
        title: `Invitation for you`,
        description: 'You have received a digital invitation.'
    }
}

export default async function InvitationPage({ params }: PageProps) {
    const { slug } = await params

    console.log(`[InvitationPage] Fetching invitation for slug: "${slug}"`)
    
    const { data: invitation, error } = await getInvitation(slug)

    if (error) {
        console.error(`[InvitationPage] Error for slug "${slug}":`, error)
        notFound()
    }
    
    if (!invitation) {
        console.error(`[InvitationPage] No invitation found for slug: "${slug}"`)
        notFound()
    }
    
    console.log(`[InvitationPage] Successfully loaded invitation for: ${invitation.invitee_name}`)

    return (
        <main className="min-h-[100svh] bg-gradient-to-b from-[#2A0A3A] via-[#3B1155] to-[#5A2A7A] flex items-center justify-center overflow-hidden relative">
            {/* Background botanical image on the right */}
            <div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl flex items-center justify-end pointer-events-none z-0">
                <Image
                    src="/background-botanical.png"
                    alt=""
                    width={800}
                    height={1200}
                    className="h-full w-auto object-contain opacity-40"
                    priority
                />
            </div>

            {/* Background accents (no assets required) */}
            <div className="absolute inset-0 opacity-35">
                <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-purple-300 blur-3xl" />
                <div className="absolute right-[-6rem] top-[-4rem] h-80 w-80 rounded-full bg-fuchsia-300 blur-3xl" />
                <div className="absolute left-20 bottom-[-6rem] h-80 w-80 rounded-full bg-violet-400 blur-3xl" />
            </div>

            {/* Scene */}
            <div className="relative z-10 w-full px-4 py-10 flex items-center justify-center">
                <ClientInvitationWrapper invitation={invitation} />
            </div>
        </main>
    )
}
