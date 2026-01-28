'use client'

import React from 'react'
import Link from 'next/link'

interface CofounderPost {
    id: string
    slug: string
    startup_name: string
    position_title: string
    description: string
    industry_tags: string[]
    logo_image?: string
}

interface CofounderCardProps {
    post: CofounderPost
}

export default function CofounderCard({ post }: CofounderCardProps) {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-[#4F3457]/10 group relative overflow-hidden">
            <Link href={`/board/co-founder/${post.slug}`} className="absolute inset-0 z-10" />

            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-4">
                    <h2 className="text-3xl font-bold text-[#4F3457] tracking-tight mb-1 group-hover:text-[#71588A] transition-colors">{post.startup_name}</h2>
                    <h3 className="text-xl font-bold text-[#71588A]">{post.position_title}</h3>
                </div>

                {/* Description */}
                <p className="text-[#4F3457]/80 leading-relaxed mb-8 flex-1 line-clamp-4">
                    {post.description}
                </p>

                {/* Footer / Tags */}
                <div className="flex flex-wrap justify-end gap-2 mt-auto">
                    {post.industry_tags && post.industry_tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-4 py-1.5 rounded-full bg-[#71588A] text-white text-sm font-medium lowercase tracking-wide"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
