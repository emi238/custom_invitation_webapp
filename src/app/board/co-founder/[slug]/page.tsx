import { getPosts } from '@/app/actions'
import { CofounderPost } from '@/lib/types'
import { ArrowLeft, Mail } from 'lucide-react'
import Link from 'next/link'

// Helper to get post with fallback mock data
async function getCofounderPost(slug: string): Promise<CofounderPost | null> {
    const posts = await getPosts('cofounder') as unknown as CofounderPost[]
    const found = posts.find(p => p.slug === slug)

    if (!found) {
        // Fallback for "mealistik" demo
        if (slug.includes('mealistik') || slug === 'demo') {
            return {
                id: 'demo-1',
                created_at: new Date().toISOString(),
                slug: 'mealistik',
                startup_name: 'Mealistik',
                logo_image: 'https://api.dicebear.com/7.x/initials/svg?seed=M&backgroundColor=71588A', // Mock logo
                banner_image: '/hero-background.png', // Fallback or reuse generic
                position_title: 'Technical Co-founder',
                industry_tags: ['HealthTech'],
                description: 'Mealistik is an AI-powered nutrition app focused on women managing PCOS, thyroid issues, and other chronic conditions. It offers simple, non-restrictive meal planning that adapts to real-life habits, energy levels, and health needs.',
                extended_description: `We are looking for a tech co-founder who cares deeply about building a thoughtful, user first product, not just writing code. This is an early stage role suited to someone who enjoys problem solving, rapid iteration and learning as the product evolves.

You will take ownership of the product build and make key technical decisions, with experience in full stack development, database design and working with modern tools and APIs. Experience with web or mobile apps, scalable backends, or AI and automation workflows is a plus, but curiosity and a willingness to learn matter more than knowing everything upfront.

Mindset is critical. We are looking for someone collaborative, proactive and comfortable with ambiguity, who can turn ideas into practical solutions and communicate clearly with non technical co founders.

We have already validated the product and are currently in active user testing. Mealistik was part of the UQ iLab Venture Accelerator from July 2025 to November 2025, where we refined the problem, validated user demand and built our MVP.

This role is ideal for someone who wants to help shape both the product and the company from the ground up, and is motivated by ownership, impact and long term growth.`,
                founder_email: 'hello@mealistik.com'
            }
        }
    }
    return found || null
}

export default async function CofounderDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params
    const post = await getCofounderPost(params.slug)

    if (!post) {
        return <div className="p-12 text-center text-[#4F3457]">Post not found</div>
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm overflow-hidden relative">
            <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
                {/* Top Banner */}
                <div className="w-full h-32 md:h-48 relative">
                    <img
                        src={post.banner_image || '/placeholder-banner.jpg'}
                        alt={post.startup_name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#2A2438]/20" /> {/* Slight overlay */}

                    <Link
                        href="/board/co-founder"
                        className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#4F3457] hover:bg-white shadow-sm transition-all z-10"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                </div>

                {/* Main Content */}
                <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col items-center text-center">

                    {/* Header Section */}
                    <div className="mb-10 w-full flex flex-col items-center">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-md bg-white -mt-6 relative z-10 mb-3">
                            <img
                                src={post.logo_image || '/placeholder-icon.png'}
                                alt={post.startup_name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h1 className="text-3xl font-bold text-[#4F3457] mb-1">{post.startup_name}</h1>
                        <h2 className="text-xl font-bold text-[#71588A] mb-2">{post.position_title}</h2>
                        <div className="flex gap-2 justify-center">
                            {post.industry_tags.map((tag, idx) => (
                                <span key={idx} className="text-xs font-medium uppercase tracking-wide text-[#4F3457]/60 bg-[#4F3457]/5 px-2 py-1 rounded-md">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Description Body */}
                    <div className="space-y-8 text-left w-full text-[#4F3457]/80 leading-relaxed font-sans text-md md:text-lg">

                        {/* Short Description */}
                        <div>
                            <p>{post.description}</p>
                        </div>

                        {/* Extended Description */}
                        <div className="whitespace-pre-wrap">
                            {post.extended_description}
                        </div>

                    </div>

                    {/* Call to Action */}
                    <div className="mt-16 mb-8">
                        <a
                            href={`mailto:${post.founder_email}`}
                            className="bg-[#93B89F] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-[#7A9985] transition-all transform hover:-translate-y-0.5 flex items-center gap-2 text-lg"
                        >
                            <Mail size={20} />
                            Message Founder
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}
