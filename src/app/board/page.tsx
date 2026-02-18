import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function BoardHomePage() {
    return (
        <div className="h-full w-full p-2 md:p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-4 md:grid-rows-2 gap-4 h-full min-h-[600px]">

                {/* 1. Explore Internships - Tall Left Card */}
                <Link
                    href="/board/internships"
                    className="md:col-span-1 md:row-span-2 group relative bg-[#F3E5F5]/60 hover:bg-[#F3E5F5]/80 backdrop-blur-xl border border-white/60 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="hidden md:flex bg-white/50 w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="text-[#4F3457]" size={20} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#4F3457] tracking-tight mb-2 leading-tight">Explore <br />Internships</h2>
                            <p className="text-[#4F3457]/70 font-medium text-base md:text-lg max-w-[90%] md:max-w-[80%]">Find the opportunities to go from zero to one.</p>
                        </div>
                    </div>

                    {/* Halftone Asset */}

                </Link>

                {/* 2. Find Co-founders - Wide Top Right Card */}
                <Link
                    href="/board/co-founder"
                    className="md:col-span-2 md:row-span-1 group relative bg-[#F3E5F5]/60 hover:bg-[#F3E5F5]/80 backdrop-blur-xl border border-white/60 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                    <div className="hidden md:flex absolute top-6 right-6 md:top-8 md:right-8 z-20 bg-white/50 w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowUpRight className="text-[#4F3457]" size={20} />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-center pl-0 md:pl-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#4F3457] tracking-tight mb-2">Find <span className="text-[#8C6997]">Co-founders</span></h2>
                        <p className="text-[#4F3457]/70 font-medium text-base md:text-lg max-w-[90%] md:max-w-[60%]">Connect with founders looking for their other half.</p>
                    </div>

                    {/* Halftone Asset */}

                </Link>

                {/* 3. Founder Spotlights - Bottom Right 1 */}
                <Link
                    href="/board/founder-spotlights" // Assuming route exists or will be created
                    className="md:col-span-1 md:row-span-1 group relative bg-[#F3E5F5]/60 hover:bg-[#F3E5F5]/80 backdrop-blur-xl border border-white/60 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
                >
                    <div className="relative z-10 flex flex-col justify-between h-full">
                        <div>
                            <div className="hidden md:flex bg-white/50 w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="text-[#4F3457]" size={20} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#4F3457] tracking-tight mb-2 leading-tight">Founder <br />Spotlights</h2>
                            <p className="text-[#4F3457]/70 font-medium text-base md:text-lg max-w-[90%]">See what cool things are happening in the community!</p>
                        </div>
                    </div>

                    {/* Halftone Asset */}

                </Link>

                {/* 4. Ecosystem Events - Bottom Right 2 */}
                <Link
                    href="/board/events" // Assuming route exists or will be created
                    className="md:col-span-1 md:row-span-1 group relative bg-[#F3E5F5]/60 hover:bg-[#F3E5F5]/80 backdrop-blur-xl border border-white/60 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
                >
                    <div className="relative z-10 flex flex-col justify-between h-full bg-transparent">
                        <div>
                            <div className="hidden md:flex bg-white/50 w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center mb-4 group-hover:scale-110 transition-transform self-start">
                                <ArrowUpRight className="text-[#4F3457]" size={20} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-[#4F3457] tracking-tight mb-2 leading-tight">Ecosystem <br />Events</h2>
                            <p className="text-[#4F3457]/70 font-medium text-base md:text-lg max-w-[90%]">Other cool events to check out in QLD :)</p>
                        </div>
                    </div>

                    {/* Halftone Asset */}

                </Link>
            </div>
        </div>
    )
}
