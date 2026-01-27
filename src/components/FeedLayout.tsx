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
    posts: Post[]
    type?: 'internship' | 'cofounder' | 'event'
    showAddButton?: boolean
    children?: React.ReactNode
}

export default function FeedLayout({ title, posts, type, showAddButton = true, children }: FeedLayoutProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Filler content if no posts
    const displayPosts = posts.length > 0 ? posts : [
        { id: 'filler-1', title: 'Example Post: Tech Lead Needed', description: 'We are building the future of social connection...', created_at: new Date().toISOString() },
        { id: 'filler-2', title: 'Marketing Intern Role', description: 'Join our growth team and learn from the best...', created_at: new Date().toISOString() },
        { id: 'filler-3', title: 'Cofounder Match', description: 'Looking for a business-minded cofounder for a fintech startup...', created_at: new Date().toISOString() }
    ]

    return (
        <div className="flex-1 flex flex-col h-full bg-white/30 backdrop-blur-md rounded-3xl border border-white/40 shadow-sm overflow-hidden relative">
            {/* Header */}
            <div className="p-8 border-b border-[#4F3457]/5 flex justify-between items-center bg-white/20">
                <div>
                    <h1 className="text-3xl font-bold text-[#4F3457] tracking-tight">{title}</h1>
                    <p className="text-[#4F3457]/60 text-sm font-medium mt-1">Community Board</p>
                </div>

                {showAddButton && type && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="p-3 md:px-6 md:py-3 rounded-xl bg-[#4F3457] text-white font-bold shadow-lg hover:shadow-xl hover:bg-[#5E4165] transition-all flex items-center gap-2"
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
                        No posts yet. Examples shown below.
                    </div>
                )}

                {displayPosts.map((post) => (
                    <div key={post.id} className="bg-white/60 p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-[#4F3457]">{post.title}</h3>
                            <span className="text-xs font-bold text-[#4F3457]/30 uppercase tracking-wider">
                                {new Date(post.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <p className="text-[#4F3457]/80 leading-relaxed">
                            {post.description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-[#4F3457]/5 flex gap-4">
                            <button className="text-sm font-bold text-[#4F3457]/60 hover:text-[#E8A87C] flex items-center gap-2 transition-colors">
                                <MessageSquare size={16} /> Reply
                            </button>
                        </div>
                    </div>
                ))}
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
