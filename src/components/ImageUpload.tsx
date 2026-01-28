'use client'

import React, { useRef, useState } from 'react'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'
import { uploadFile } from '@/app/actions'

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    label: string
    className?: string
}

export default function ImageUpload({ value, onChange, label, className = '' }: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isUploading, setIsUploading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const formData = new FormData()
            formData.append('file', file)

            const result = await uploadFile(formData)

            if (result.success && result.url) {
                onChange(result.url)
            } else {
                alert('Upload failed: ' + result.message)
            }
        } catch (error) {
            console.error('Upload component error:', error)
            alert('Upload failed')
        } finally {
            setIsUploading(false)
            // Reset input so same file can be selected again if needed (though unlikely)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const clearImage = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent triggering parent click if any
        onChange('')
    }

    return (
        <div className={`group ${className}`}>
            <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-wider group-focus-within:text-[#E8A87C] transition-colors">
                {label}
            </label>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />

            {value ? (
                <div className="relative w-full h-40 bg-black/40 rounded-xl border border-white/10 overflow-hidden group/image">
                    <img
                        src={value}
                        alt="Uploaded preview"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                            title="Replace image"
                        >
                            <Upload size={18} />
                        </button>
                        <button
                            type="button"
                            onClick={clearImage}
                            className="p-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-full transition-colors"
                            title="Remove image"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <div
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    className={`
                        w-full h-32 px-4 rounded-xl border-dashed border-2 
                        ${isUploading ? 'border-white/10 bg-black/10 cursor-wait' : 'border-white/20 bg-black/20 hover:border-[#E8A87C]/50 hover:bg-black/30 cursor-pointer'} 
                        flex flex-col items-center justify-center gap-2 transition-all group/upload
                    `}
                >
                    {isUploading ? (
                        <>
                            <Loader2 size={24} className="text-[#E8A87C] animate-spin" />
                            <span className="text-xs text-white/50">Uploading...</span>
                        </>
                    ) : (
                        <>
                            <div className="p-3 rounded-full bg-white/5 group-hover/upload:bg-[#E8A87C]/10 transition-colors">
                                <Upload size={20} className="text-white/40 group-hover/upload:text-[#E8A87C] transition-colors" />
                            </div>
                            <span className="text-xs font-medium text-white/40 group-hover/upload:text-white/70 transition-colors">
                                Click to upload image
                            </span>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
