'use client'

import React, { useState } from 'react'
import { createPost } from '@/app/actions'
import ImageUpload from './ImageUpload'

interface CreateCofounderFormProps {
    onSuccess: () => void
    onCancel: () => void
}

export default function CreateCofounderForm({ onSuccess, onCancel }: CreateCofounderFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        startup_name: '',
        logo_image: '', // URL
        banner_image: '', // URL
        position_title: '',
        description: '', // Short
        extended_description: '', // Long
        industry_tags: '', // Comma separated string for input
        founder_email: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Generate a slug from name
            const slug = formData.startup_name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4)

            // Convert tags string to array
            const tagsArray = formData.industry_tags.split(',').map(t => t.trim()).filter(t => t.length > 0)

            const postContent = {
                ...formData,
                industry_tags: tagsArray,
                slug
            }

            const response = await createPost('cofounder', postContent)

            if (response.success) {
                onSuccess()
            } else {
                alert('Error submitting: ' + response.message)
            }
        } catch (error) {
            console.error(error)
            alert('Something went wrong')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full mx-auto px-4 md:px-0">
            <div className="space-y-6">
                <h3 className="text-[#E8A87C] font-bold text-sm tracking-widest uppercase mb-6 border-b border-white/10 pb-2">Startup Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                        <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">Startup Name <span className="text-red-400">*</span></label>
                        <input
                            required
                            value={formData.startup_name}
                            onChange={e => setFormData({ ...formData, startup_name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:bg-black/30 transition-all font-medium"
                            placeholder="e.g. Acme AI"
                        />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">Founder Email <span className="text-red-400">*</span></label>
                        <input
                            type="email"
                            required
                            value={formData.founder_email}
                            onChange={e => setFormData({ ...formData, founder_email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:bg-black/30 transition-all font-medium"
                            placeholder="founder@example.com"
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">Industry Tags (Comma Separated)</label>
                    <input
                        value={formData.industry_tags}
                        onChange={e => setFormData({ ...formData, industry_tags: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:bg-black/30 transition-all font-medium"
                        placeholder="e.g. HealthTech, AI, B2B"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUpload
                        label="Banner Image"
                        value={formData.banner_image}
                        onChange={(url) => setFormData({ ...formData, banner_image: url })}
                    />
                    <ImageUpload
                        label="Logo Image"
                        value={formData.logo_image}
                        onChange={(url) => setFormData({ ...formData, logo_image: url })}
                    />
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/10">
                <h3 className="text-[#E8A87C] font-bold text-sm tracking-widest uppercase mb-6 border-b border-white/10 pb-2">Role Details</h3>

                <div className="group">
                    <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">Position Title <span className="text-red-400">*</span></label>
                    <input
                        required
                        value={formData.position_title}
                        onChange={e => setFormData({ ...formData, position_title: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:bg-black/30 transition-all font-medium"
                        placeholder="e.g. Technical Co-founder"
                    />
                </div>

                <div className="group">
                    <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">Short Description (Card View) <span className="text-red-400">*</span></label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:bg-black/30 transition-all font-medium resize-none leading-relaxed"
                        placeholder="Brief overview for the main board..."
                    />
                </div>

                <div className="group">
                    <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">Extended Description (Detail View - Markdown Supported) <span className="text-red-400">*</span></label>
                    <textarea
                        required
                        value={formData.extended_description}
                        onChange={e => setFormData({ ...formData, extended_description: e.target.value })}
                        rows={8}
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:bg-black/30 transition-all font-medium resize-none leading-relaxed font-mono text-sm"
                        placeholder="Full details about the role, vision, requirements..."
                    />
                </div>
            </div>

            <div className="pt-8 flex gap-4 pb-8 border-t border-white/10">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-8 py-4 rounded-xl bg-transparent border border-white/10 text-white font-bold hover:bg-white/5 transition-all w-1/3"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 rounded-xl bg-[#71588A] text-white font-bold hover:bg-[#604878] transition-all disabled:opacity-50 text-lg tracking-wide"
                >
                    {isSubmitting ? 'Posting...' : 'Submit Request'}
                </button>
            </div>
        </form>
    )
}
