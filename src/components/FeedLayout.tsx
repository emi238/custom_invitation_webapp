'use client'

import React, { useState } from 'react'
import { Plus, MessageSquare } from 'lucide-react'
import CreatePostModal from './CreatePostModal'

interface Post {
    id: string
    title: string
    description: string
    created_at: string
}

interface FeedLayoutProps {
    title: string
    posts: any[]
    type?: 'internship' | 'cofounder' | 'event'
    showAddButton?: boolean
    children?: React.ReactNode
}

export default function FeedLayout({ title, posts, type, showAddButton = true, children }: FeedLayoutProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="flex-1 flex flex-col h-full bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm overflow-hidden relative">
            {/* Header */}
            <div className="p-8 border-b border-[#4F3457]/5 flex justify-between items-center bg-white/20">
                <div>
                    <h1 className="text-3xl font-bold text-[#4F3457] tracking-tight">{title}</h1>
                </div>

                {showAddButton && type && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-3 md:px-6 md:py-3 rounded-xl bg-[#71588A] text-white font-bold shadow-lg hover:shadow-xl hover:bg-[#5E4165] transition-all flex items-center gap-2"
                    >
                        <Plus size={20} />
                        <span className="hidden md:inline">Create Post</span>
                    </button>
                )}
            </div>

            {/* Posts Feed */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-hide">
                {children}

                {posts.length === 0 && (
                    <div className="mb-8 p-4 bg-[#E8A87C]/10 rounded-xl border border-[#E8A87C]/20 text-[#4F3457]/80 text-sm italic text-center">
                        No posts yet. Check back soon!
                    </div>
                )}
            </div>

            {/* Modal */}
            {type && (
                <CreatePostModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    type={type}
                />
            )}
        </div>
    )
}
