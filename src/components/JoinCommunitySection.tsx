'use client'
import React from 'react'
import { Inter } from 'next/font/google'
import { submitCommunitySignup } from '@/app/actions'

const inter = Inter({ subsets: ['latin'] })

export default function JoinCommunitySection() {
    const [email, setEmail] = React.useState('')
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')
        try {
            const response = await submitCommunitySignup(email)

            if (!response.success) throw new Error(response.message)

            setStatus('success')
            setEmail('')
        } catch (error) {
            console.error('Error signing up:', error)
            setStatus('error')
        }
    }

    return (
        <section id="join" className="scroll-mt-28 relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden border-b border-[#5E4175] bg-gradient-to-b from-[#E2D2EB] to-[#C2A2CE]">
            {/* Background Asset - Flower Decor */}
            <div className="absolute bottom-0 w-full flex justify-center z-0 pointer-events-none opacity-30 mix-blend-multiply translate-y-[18%]">
                <img
                    src="/flower-decor.png"
                    alt="Flower Decor"
                    className="w-full md:w-auto md:max-h-[100vh] object-contain object-bottom"
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6 w-full">
                {/* Glass Container */}
                <div className="w-full bg-white/0 backdrop-blur-[2px] border border-white/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col items-center gap-8 shadow-sm">
                    {/* Title */}
                    <h2 className={`${inter.className} font-bold text-5xl md:text-[60px] text-[#4F3457] leading-tight tracking-tight`}>
                        join the community
                    </h2>
                    {/* Description */}
                    <p className={`${inter.className} font-medium text-xl md:text-[20px] text-[#3D2654] leading-relaxed max-w-2xl`}>
                        We believe that entrepreneurship was never meant to be lonely. In Hyphae, you no longer need to build alone. Come join us!
                    </p>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="w-full max-w-md relative flex flex-col md:block gap-4">
                        <input
                            type="email"
                            placeholder="name@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`${inter.className} w-full px-6 py-3 md:py-4 rounded-xl bg-[#E6DDD8] border border-[#4F3457]/20 text-[#4F3457] placeholder-[#4F3457]/50 focus:outline-none focus:ring-2 focus:ring-[#71588A] transition-all text-center md:text-left md:pr-36 text-base`}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className={`${inter.className} w-full md:absolute md:right-2 md:top-2 md:bottom-2 md:w-auto md:px-6 py-3 md:py-0 rounded-xl md:rounded-lg font-bold text-white text-base transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed bg-[#917DB8] hover:bg-[#71588A] whitespace-nowrap`}
                        >
                            {status === 'loading' ? '...' : status === 'success' ? 'Joined!' : 'Join'}
                        </button>
                        {status === 'error' && (
                            <p className={`${inter.className} text-red-500 text-sm`}>Something went wrong. Please try again.</p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}
