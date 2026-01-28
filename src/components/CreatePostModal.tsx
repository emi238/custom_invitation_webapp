'use client'

import React, { useState } from 'react'
import { X } from 'lucide-react'
import { createPost } from '@/app/actions'
import { motion, AnimatePresence } from 'framer-motion'
import CreateInternshipForm from './CreateInternshipForm'
import CreateCofounderForm from './CreateCofounderForm'

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
                        className={`absolute inset-0 z-[70] ${type === 'internship' || type === 'cofounder' ? 'bg-[#462E61]' : 'bg-[#4F3457]/95 backdrop-blur-md'}`}
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={`absolute inset-0 z-[70] ${type === 'internship' || type === 'cofounder' ? 'pointer-events-auto flex flex-col' : 'flex items-center justify-center pointer-events-none'}`}
                    >
                        {type === 'internship' || type === 'cofounder' ? (
                            // Constrained Full Container Layout for Internships & Cofounders
                            <div className="w-full h-full relative flex flex-col">
                                <button
                                    onClick={onClose}
                                    className="absolute top-6 right-6 p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors z-[80] text-white/50 hover:text-white"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
                                    <div className="w-full max-w-3xl mx-auto pb-12">
                                        {success ? (
                                            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                                                <h3 className="text-3xl font-bold text-white mb-2">Submitted!</h3>
                                                <p className="text-white/50 text-lg">Your post is now live.</p>
                                            </div>
                                        ) : (
                                            <>
                                                {type === 'internship' && (
                                                    <CreateInternshipForm
                                                        onSuccess={() => {
                                                            setSuccess(true)
                                                            setTimeout(() => {
                                                                setSuccess(false)
                                                                onClose()
                                                                window.location.reload()
                                                            }, 1500)
                                                        }}
                                                        onCancel={onClose}
                                                    />
                                                )}
                                                {type === 'cofounder' && (
                                                    <CreateCofounderForm
                                                        onSuccess={() => {
                                                            setSuccess(true)
                                                            setTimeout(() => {
                                                                setSuccess(false)
                                                                onClose()
                                                                window.location.reload()
                                                            }, 1500)
                                                        }}
                                                        onCancel={onClose}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            // Default Modal content for other types (Events)
                            <div className="pointer-events-auto max-w-lg w-full bg-white/90 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-8 m-4">
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
                                            className="mt-4 w-full py-4 rounded-xl bg-[#71588A] text-white font-bold text-lg hover:bg-[#604878] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? 'Posting...' : 'Submit Post'}
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
