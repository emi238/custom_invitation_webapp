'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { createPost } from '@/app/actions'
import { motion, AnimatePresence } from 'framer-motion'

interface CreatePostModalProps {
    isOpen: boolean
    onClose: () => void
    type: 'internship' | 'cofounder' | 'event'
}

export default function CreatePostModal({ isOpen, onClose, type }: CreatePostModalProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const response = await createPost(type, { title, description })
            if (response.success) {
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                    onClose()
                    setTitle('')
                    setDescription('')
                    // Optional: Refresh page/posts
                    window.location.reload()
                }, 1500)
            } else {
                alert('Error submitting post: ' + response.message)
            }
        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    const typeLabel = type === 'cofounder' ? 'Co-founder Request' : type === 'internship' ? 'Internship Opportunity' : 'Event'

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-white/40 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 z-[70]"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-[#4F3457]">New {typeLabel}</h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                                <X size={24} className="text-[#4F3457]" />
                            </button>
                        </div>

                        {success ? (
                            <div className="text-center py-12">
                                <div className="text-4xl mb-4">✨</div>
                                <h3 className="text-xl font-bold text-[#4F3457]">Submitted Successfully!</h3>
                                <p className="text-[#4F3457]/70">Your post is now live on the board.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-[#4F3457]/80 mb-2 uppercase tracking-wider">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] text-[#4F3457] placeholder-[#4F3457]/40"
                                        placeholder={`e.g. Looking for a technical co-founder...`}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#4F3457]/80 mb-2 uppercase tracking-wider">Description</label>
                                    <textarea
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] text-[#4F3457] placeholder-[#4F3457]/40 resize-none"
                                        placeholder="Describe what you are looking for..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="mt-4 w-full py-4 rounded-xl bg-[#4F3457] text-white font-bold text-lg hover:bg-[#5E4165] transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? 'Posting...' : 'Submit Post'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
