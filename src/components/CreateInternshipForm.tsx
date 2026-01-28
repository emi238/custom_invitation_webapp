'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Video, Upload } from 'lucide-react'
import { createPost } from '@/app/actions'
import { InternshipRole } from '@/lib/types'
import ImageUpload from './ImageUpload'

interface CreateInternshipFormProps {
    onSuccess: () => void
    onCancel: () => void
}

export default function CreateInternshipForm({ onSuccess, onCancel }: CreateInternshipFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        startup_name: '',
        startup_icon: '', // URL
        banner_image: '', // URL
        description: '',
        is_paid: false,
        message_from_founder: '',
        founder_signature_photo: '', // URL
        promotional_video: '',
        contact_details: '',
    })

    const [roles, setRoles] = useState<InternshipRole[]>([
        {
            position_title: '',
            description: '',
            hours_required: '',
            responsibilities: '',
            role_requirements: '',
            what_they_will_gain: ''
        }
    ])

    const handleRoleChange = (index: number, field: keyof InternshipRole, value: string) => {
        const newRoles = [...roles]
        newRoles[index][field] = value
        setRoles(newRoles)
    }

    const addRole = () => {
        setRoles([...roles, {
            position_title: '',
            description: '',
            hours_required: '',
            responsibilities: '',
            role_requirements: '',
            what_they_will_gain: ''
        }])
    }

    const removeRole = (index: number) => {
        if (roles.length > 1) {
            const newRoles = roles.filter((_, i) => i !== index)
            setRoles(newRoles)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            // Generate a slug from name
            const slug = formData.startup_name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4)

            const postContent = {
                ...formData,
                slug,
                roles
            }

            const response = await createPost('internship', postContent)

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
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full mx-auto px-3 md:px-0">
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
                            placeholder="e.g. startup name"
                        />
                    </div>
                    <div className="group">
                        <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">Contact Email/Link <span className="text-red-400">*</span></label>
                        <input
                            required
                            value={formData.contact_details}
                            onChange={e => setFormData({ ...formData, contact_details: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:bg-black/30 transition-all font-medium"
                            placeholder="Apply link or email"
                        />
                    </div>
                </div>

                <div className="group">
                    <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">Short Description <span className="text-red-400">*</span></label>
                    <textarea
                        required
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:bg-black/30 transition-all font-medium resize-none leading-relaxed"
                        placeholder="what your startup does.."
                    />
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-black/20 border border-white/5 hover:bg-black/30 transition-colors cursor-pointer" onClick={() => setFormData({ ...formData, is_paid: !formData.is_paid })}>
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${formData.is_paid ? 'bg-[#E8A87C] border-[#E8A87C]' : 'border-white/30'}`}>
                        {formData.is_paid && <Plus size={14} className="text-[#121212] rotate-45" strokeWidth={4} />}
                    </div>
                    <label className="text-sm font-medium text-white/80 cursor-pointer pointer-events-none">
                        Is this a Paid Opportunity?
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ImageUpload
                        label="Banner Image"
                        value={formData.banner_image}
                        onChange={(url) => setFormData({ ...formData, banner_image: url })}
                    />
                    <ImageUpload
                        label="Logo Image"
                        value={formData.startup_icon}
                        onChange={(url) => setFormData({ ...formData, startup_icon: url })}
                    />
                </div>

                <div className="group">
                    <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">Promotional Video URL (Optional)</label>
                    <input
                        value={formData.promotional_video}
                        onChange={e => setFormData({ ...formData, promotional_video: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:bg-black/30 transition-all font-medium"
                        placeholder="YouTube/url link"
                    />
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/10">
                <h3 className="text-[#E8A87C] font-bold text-sm tracking-widest uppercase mb-6 border-b border-white/10 pb-2">Founder Note</h3>
                <div className="group">
                    <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">Message from Founder</label>
                    <textarea
                        value={formData.message_from_founder}
                        onChange={e => setFormData({ ...formData, message_from_founder: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] focus:bg-black/30 transition-all font-medium resize-none leading-relaxed"
                        placeholder="Looking for someone who..."
                    />
                </div>
                <div className="group">
                    <ImageUpload
                        label="Signature Image"
                        value={formData.founder_signature_photo}
                        onChange={(url) => setFormData({ ...formData, founder_signature_photo: url })}
                    />
                </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-white/10">
                <div className="flex justify-between items-end">
                    <h3 className="text-[#E8A87C] font-bold text-sm tracking-widest uppercase">Roles</h3>
                </div>

                {roles.map((role, index) => (
                    <div key={index} className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4 hover:border-white/20 transition-colors">
                        <div className="flex justify-between items-center mb-2 pb-2 border-b border-white/5">
                            <span className="text-xs font-bold text-white/40 uppercase tracking-wider">Role {index + 1}</span>
                            {roles.length > 1 && (
                                <button type="button" onClick={() => removeRole(index)} className="text-white/30 hover:text-red-400 transition-colors p-1">
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input
                                placeholder="Position Title"
                                value={role.position_title}
                                onChange={e => handleRoleChange(index, 'position_title', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] text-sm"
                            />
                            <input
                                placeholder="Hours Required"
                                value={role.hours_required}
                                onChange={e => handleRoleChange(index, 'hours_required', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] text-sm"
                            />
                        </div>
                        <textarea
                            placeholder="Description"
                            value={role.description}
                            onChange={e => handleRoleChange(index, 'description', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] text-sm resize-none"
                            rows={2}
                        />
                        <textarea
                            placeholder="Responsibilities"
                            value={role.responsibilities}
                            onChange={e => handleRoleChange(index, 'responsibilities', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] text-sm resize-none"
                            rows={2}
                        />
                        <textarea
                            placeholder="Requirements"
                            value={role.role_requirements}
                            onChange={e => handleRoleChange(index, 'role_requirements', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] text-sm resize-none"
                            rows={2}
                        />
                        <textarea
                            placeholder="What they will gain"
                            value={role.what_they_will_gain}
                            onChange={e => handleRoleChange(index, 'what_they_will_gain', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#E8A87C] text-sm resize-none"
                            rows={2}
                        />
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addRole}
                    className="w-full py-4 rounded-xl border border-dashed border-white/10 text-white/50 hover:border-[#E8A87C] hover:text-[#E8A87C] hover:bg-[#E8A87C]/5 transition-all font-bold text-sm flex items-center justify-center gap-2"
                >
                    <Plus size={18} /> Add Another Role
                </button>
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
                    {isSubmitting ? 'Posting Opportunity' : 'Submit Opportunity'}
                </button>
            </div>
        </form>
    )
}
