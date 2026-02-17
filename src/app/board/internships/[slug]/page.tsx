import { getPosts } from '@/app/actions'
import { InternshipPost } from '@/lib/types'
import { ArrowLeft, Play, Clock, CheckCircle, Target, BookOpen } from 'lucide-react'
import Link from 'next/link'

// Mock Data getter for now, assuming getPosts returns mixed content
async function getInternship(slug: string): Promise<InternshipPost | null> {
    const posts = await getPosts('internship') as unknown as InternshipPost[]
    const found = posts.find(p => p.slug === slug)

    // Fallback to example data for demo if not found in DB
    if (!found) {
        if (slug === 'ubiquiart') {
            return {
                id: '1',
                slug: 'ubiquiart',
                startup_name: 'Ubiquiart',
                is_paid: false,
                startup_icon: 'https://api.dicebear.com/7.x/identicon/svg?seed=ubiquiart',
                banner_image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000',
                description: 'We are building a music licensing marketplace that connects filmmakers with artists worldwide.',
                message_from_founder: "We are passionate about music and film. Join us to revolutionize the industry!",
                founder_signature_photo: '/signature.jpeg', // Fallback
                contact_details: 'apply@ubiquiart.com',
                roles: [
                    {
                        position_title: 'Full Stack Developer',
                        description: 'Build core features of the marketplace.',
                        hours_required: '15-20 hours/week',
                        responsibilities: 'Develop frontend and backend components.',
                        role_requirements: 'React, Node.js experience.',
                        what_they_will_gain: 'Mentorship and published code.'
                    }
                ],
                created_at: new Date().toISOString(),
            }
        }
    }
    return found || null
}

export default async function InternshipDetailPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await getInternship(params.slug)

    if (!post) {
        return <div className="p-12 text-center text-[#4F3457]">Post not found</div>
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm overflow-hidden relative">
            <div className="flex-1 overflow-y-auto scrollbar-hide bg-white">
                {/* Top Full-Width Banner */}
                <div className="w-full h-32 md:h-48 relative">
                    <img
                        src={post.banner_image || '/placeholder-banner.jpg'}
                        alt={post.startup_name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    <Link
                        href="/board/internships"
                        className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/90 backdrop-blur-sm p-2 rounded-full text-[#4F3457] hover:bg-white shadow-sm transition-all z-10"
                    >
                        <ArrowLeft size={18} />
                    </Link>
                </div>

                <div className="p-6 md:p-10 max-w-5xl mx-auto">
                    {/* Main Content Split Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
                        {/* LEFT COL: Branding & Info */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex items-center gap-4">
                                {post.startup_icon && (
                                    <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 shadow-sm shrink-0">
                                        <img src={post.startup_icon} className="w-full h-full object-cover" alt="logo" />
                                    </div>
                                )}
                                <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] tracking-tight">{post.startup_name}</h1>
                            </div>

                            {/* Text Content */}
                            <div className="space-y-6 text-[#4F3457]/80 leading-relaxed font-sans">
                                <div>
                                    <p className="text-lg">{post.description}</p>
                                </div>

                                <div className="space-y-3">
                                    <h2 className="text-2xl font-bold text-[#4F3457]">message from the founder</h2>
                                    {post.message_from_founder && (
                                        <div className="relative">
                                            <p>{post.message_from_founder}</p>
                                            {post.founder_signature_photo && (
                                                <div className="mt-4 w-32">
                                                    <img src={post.founder_signature_photo} alt="Signature" className="w-full object-contain mix-blend-multiply opacity-80" />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COL: Media (Video or Image) */}
                        {/* Stacked below on tablet/mobile (default), side on LG */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                            {post.promotional_video ? (
                                <iframe
                                    className="w-full h-full absolute inset-0"
                                    src={post.promotional_video.replace('watch?v=', 'embed/')}
                                    title="Promotional Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <img
                                    src={post.banner_image || '/placeholder-banner.jpg'}
                                    alt="Office or Atmosphere"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    </div>

                    {/* Bottom Section: Current Open Roles */}
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-[#4F3457] mb-2">Current Open Roles</h2>
                        </div>

                        <div className="space-y-5">
                            {post.roles.map((role, idx) => (
                                <div key={idx} className="bg-gray-50/50 border border-[#4F3457]/10 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-bold text-[#4F3457]">{role.position_title}</h3>
                                        <span className="text-xs font-bold uppercase tracking-wider bg-[#4F3457]/5 text-[#4F3457]/60 px-2 py-1 rounded-md">
                                            {role.hours_required}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[#4F3457]/70 mb-4">{role.description}</p>

                                    <div className="grid sm:grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t border-[#4F3457]/5">
                                        <div>
                                            <strong className="block text-[#4F3457] mb-1 flex items-center gap-1"><Target size={14} /> Responsibilities</strong>
                                            <p className="text-[#4F3457]/70 leading-snug">{role.responsibilities}</p>
                                        </div>
                                        <div>
                                            <strong className="block text-[#4F3457] mb-1 flex items-center gap-1"><CheckCircle size={14} /> Requirements</strong>
                                            <p className="text-[#4F3457]/70 leading-snug">{role.role_requirements}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 text-center">
                            <p className="text-[#4F3457]/60 mb-2">
                                If you are interested, Send your resume along with a short introduction of yourself to our email/form:
                            </p>
                            <a
                                href={post.contact_details.includes('@') ? `mailto:${post.contact_details}` : post.contact_details}
                                className="text-[#71588A] font-bold hover:underline"
                            >
                                {post.contact_details}
                            </a>
                            <p className="text-[#4F3457]/60 mt-1">or message us on linkedin!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
