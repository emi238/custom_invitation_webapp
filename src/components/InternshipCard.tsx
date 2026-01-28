'use client'

import React from 'react'
import Link from 'next/link'
import { Play } from 'lucide-react'
import { InternshipPost } from '@/lib/types'

interface InternshipCardProps {
    post: InternshipPost
}

export default function InternshipCard({ post }: InternshipCardProps) {
    return (
        <Link href={`/board/internships/${post.slug}`} className="block h-full">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden border border-[#4F3457]/10 hover:shadow-lg hover:border-[#4F3457]/30 transition-all group h-full flex flex-col">
                {/* Banner Image */}
                <div className="h-32 w-full relative overflow-hidden">
                    <img
                        src={post.banner_image || '/placeholder-banner.jpg'}
                        alt={`${post.startup_name} banner`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Founder Signature Overlay (Optional aesthetics) */}
                    <div className="absolute bottom-0 right-0 p-2 opacity-50 mix-blend-multiply">
                        {/* Could put something here */}
                    </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-start gap-3 mb-3">
                        {/* Startup Icon */}
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0 bg-white shadow-sm relative -mt-8 z-10">
                            <img
                                src={post.startup_icon || '/placeholder-icon.png'}
                                alt="logo"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex-1 min-w-0 pt-1">
                            <h3 className="font-bold text-[#4F3457] text-lg leading-tight truncate">
                                {post.startup_name}
                            </h3>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${post.is_paid ? 'text-green-600' : 'text-[#4F3457]/50'}`}>
                                {post.is_paid ? 'Paid Opportunity' : 'Vocational/Unpaid'}
                            </span>
                        </div>
                    </div>

                    <p className="text-[#4F3457]/80 text-xs leading-relaxed line-clamp-4 mb-4 flex-1">
                        {post.description}
                    </p>

                    {/* Footer / Meta if needed */}
                    <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[#4F3457]/5">
                        {post.promotional_video && (
                            <div className="flex items-center gap-1 text-[10px] font-bold text-[#4F3457]/60">
                                <Play size={10} className="fill-current" />
                                <span>Video Intro</span>
                            </div>
                        )}
                        <span className="text-[10px] text-[#4F3457]/40 ml-auto">
                            {(post.roles || []).length} Role{(post.roles || []).length !== 1 && 's'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}
