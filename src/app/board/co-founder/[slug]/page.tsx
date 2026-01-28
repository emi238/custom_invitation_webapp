import { getCofounderPost } from '@/app/actions'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowLeft, Mail } from 'lucide-react'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

interface PageProps {
    params: {
        slug: string
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { data: post } = await getCofounderPost(params.slug)
    if (!post) return { title: 'Not Found' }
    return {
        title: `${post.position_title} at ${post.startup_name} | Co-founder`,
        description: post.description,
    }
}

export default async function CofounderPostPage({ params }: PageProps) {
    const { data: post } = await getCofounderPost(params.slug)

    if (!post) {
        return notFound()
    }

    return (
        <div className="min-h-screen bg-white font-sans text-[#4F3457]">
            {/* Top Banner */}
            <div className="h-48 md:h-64 w-full relative overflow-hidden bg-[#2D1B36]">
                {/* Abstract Wavy Lines (CSS or Image) - using generic gradient/pattern for now to match vibe */}
                <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] animate-pulse"></div>

                {post.banner_image && (
                    <img
                        src={post.banner_image}
                        alt="Banner"
                        className="w-full h-full object-cover opacity-60 mix-blend-overlay"
                    />
                )}

                <div className="absolute top-6 left-6">
                    <Link href="/board/co-founder" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                        <ArrowLeft size={16} />
                        <span className="text-sm font-bold">Back to Board</span>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-3xl mx-auto px-6 -mt-20 relative z-10 pb-20">
                {/* Header Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-3xl shadow-lg p-2 flex items-center justify-center mb-6">
                        {post.logo_image ? (
                            <img src={post.logo_image} alt={post.startup_name} className="w-full h-full object-contain rounded-2xl" />
                        ) : (
                            <div className="text-4xl font-bold text-[#4F3457]">{post.startup_name.charAt(0)}</div>
                        )}
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 tracking-tight">{post.startup_name}</h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#71588A] text-center mb-4">{post.position_title}</h2>

                    <div className="flex gap-2">
                        {post.industry_tags && post.industry_tags.map((tag: string, i: number) => (
                            <span key={i} className="text-sm font-medium uppercase tracking-widest text-[#4F3457]/60">
                                {tag}{i < post.industry_tags.length - 1 ? ' • ' : ''}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Body Content */}
                <div className="prose prose-lg prose-purple mx-auto text-[#4F3457]/80 leading-relaxed whitespace-pre-wrap">
                    {post.extended_description}
                </div>

                {/* Footer Action */}
                <div className="mt-16 flex justify-center">
                    <a
                        href={`mailto:${post.founder_email}`}
                        className="px-8 py-4 bg-[#86A59C] text-white font-bold rounded-full hover:bg-[#749289] transition-all shadow-lg hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-1"
                    >
                        <Mail size={20} />
                        Message Founder
                    </a>
                </div>
            </div>
        </div>
    )
}
