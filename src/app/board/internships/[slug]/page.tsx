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

export default async function InternshipDetailPage({ params }: { params: { slug: string } }) {
    const post = await getInternship(params.slug)

    if (!post) {
        return <div className="p-12 text-center text-[#4F3457]">Post not found</div>
    }

    return (
        <div className="min-h-screen bg-[#FFF5EB] pb-20">
            {/* Header Image */}
            <div className="h-64 md:h-80 w-full relative">
                <img
                    src={post.banner_image || '/placeholder-banner.jpg'}
                    alt={post.startup_name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4F3457]/80 to-transparent" />

                <div className="absolute top-6 left-4 md:left-8">
                    <Link href="/board/internships" className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white hover:bg-white/40 transition-colors">
                        <ArrowLeft />
                    </Link>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 md:px-8 -mt-20 relative z-10">
                <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-xl border border-white/50">

                    {/* Startup Header */}
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-8 border-b border-[#4F3457]/10 pb-8">
                        <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-md bg-white">
                            <img
                                src={post.startup_icon || '/placeholder-icon.png'}
                                alt="logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold text-[#4F3457] mb-2">{post.startup_name}</h1>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${post.is_paid ? 'bg-green-100 text-green-700 border-green-200' : 'bg-[#4F3457]/5 text-[#4F3457]/60 border-[#4F3457]/10'}`}>
                                    {post.is_paid ? 'Paid Opportunity' : 'Vocational/Unpaid'}
                                </span>
                                {post.promotional_video && (
                                    <a href={post.promotional_video} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100 text-xs font-bold uppercase tracking-wide hover:bg-red-100 transition-colors">
                                        <Play size={10} className="fill-current" /> Watch Video
                                    </a>
                                )}
                            </div>
                        </div>
                        <a href={post.contact_details.includes('@') ? `mailto:${post.contact_details}` : post.contact_details} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto px-8 py-3 bg-[#4F3457] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#5E4165] transition-all text-center">
                            Apply Now
                        </a>
                    </div>

                    {/* Description */}
                    <div className="mb-10">
                        <h2 className="text-xl font-bold text-[#4F3457] mb-3">About Us</h2>
                        <p className="text-[#4F3457]/80 leading-relaxed text-lg">
                            {post.description}
                        </p>
                    </div>

                    {/* Founder Message */}
                    {post.message_from_founder && (
                        <div className="bg-[#4F3457]/5 p-6 md:p-8 rounded-2xl border-l-4 border-[#4F3457] mb-10 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-[#4F3457] mb-4">Message from the Founder</h3>
                                <p className="text-[#4F3457]/90 italic text-lg leading-relaxed font-serif">
                                    "{post.message_from_founder}"
                                </p>
                                {post.founder_signature_photo && (
                                    <div className="mt-6 h-12 w-32">
                                        <img src={post.founder_signature_photo} className="w-full h-full object-contain mix-blend-multiply opacity-80" />
                                    </div>
                                )}
                            </div>
                            <div className="absolute -right-10 -bottom-10 opacity-5">
                                <div className="text-[200px] leading-none text-[#4F3457] font-serif">"</div>
                            </div>
                        </div>
                    )}

                    {/* Roles */}
                    <div>
                        <h2 className="text-2xl font-bold text-[#4F3457] mb-6">Open Roles</h2>
                        <div className="space-y-6">
                            {post.roles.map((role, idx) => (
                                <div key={idx} className="bg-white border border-[#4F3457]/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                                        <h3 className="text-xl font-bold text-[#4F3457]">{role.position_title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-[#4F3457]/60 font-medium">
                                            <Clock size={16} />
                                            {role.hours_required}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[#4F3457]/80">{role.description}</p>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-sm font-bold text-[#4F3457] uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <Target size={14} /> Responsibilities
                                                </h4>
                                                <p className="text-sm text-[#4F3457]/80">{role.responsibilities}</p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-[#4F3457] uppercase tracking-wider mb-2 flex items-center gap-2">
                                                    <CheckCircle size={14} /> Requirements
                                                </h4>
                                                <p className="text-sm text-[#4F3457]/80">{role.role_requirements}</p>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-[#4F3457]/5">
                                            <h4 className="text-sm font-bold text-[#4F3457] uppercase tracking-wider mb-2 flex items-center gap-2">
                                                <BookOpen size={14} /> What you will gain
                                            </h4>
                                            <p className="text-sm text-[#4F3457]/80">{role.what_they_will_gain}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
