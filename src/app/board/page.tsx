import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function BoardHomePage() {
    return (
        <div className="h-full w-full p-2 md:p-0">
            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-4 md:grid-rows-2 gap-4 h-full min-h-[600px]">

                {/* 1. Explore Internships - Tall Left Card */}
                <Link
                    href="/board/internships"
                    className="md:col-span-1 md:row-span-2 group relative bg-[#F3E5F5]/60 hover:bg-[#F3E5F5]/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <div className="bg-white/50 w-12 h-12 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="text-[#4F3457]" size={24} />
                            </div>
                            <h2 className="text-4xl font-bold text-[#4F3457] tracking-tight mb-2 leading-tight">Explore <br />Internships</h2>
                            <p className="text-[#4F3457]/70 font-medium text-lg max-w-[80%]">Find your next big break in the startup world.</p>
                        </div>
                    </div>

                    {/* Halftone Asset */}
                    <div className="absolute -bottom-16 -right-16 w-[320px] h-[320px] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-3 opacity-90 mix-blend-multiply">
                        <img src="/icon-internship-halftone.png" alt="Internship" className="w-full h-full object-contain" />
                    </div>
                </Link>

                {/* 2. Find Co-founders - Wide Top Right Card */}
                <Link
                    href="/board/co-founder"
                    className="md:col-span-2 md:row-span-1 group relative bg-[#F3E5F5]/60 hover:bg-[#F3E5F5]/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col h-full justify-center pl-8">
                        <div className="bg-white/50 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <ArrowUpRight className="text-[#4F3457]" size={24} />
                        </div>
                        <h2 className="text-4xl font-bold text-[#4F3457] tracking-tight mb-2">Find <span className="text-[#8C6997]">Co-founders</span></h2>
                        <p className="text-[#4F3457]/70 font-medium text-lg max-w-[60%]">Build with the best. Connect with visionaries looking for their other half.</p>
                    </div>

                    {/* Halftone Asset */}
                    <div className="absolute top-1/2 -translate-y-1/2 -right-10 w-[280px] h-[280px] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-rotate-6 opacity-90 mix-blend-multiply">
                        <img src="/icon-cofounder-halftone.png" alt="Co-founders" className="w-full h-full object-contain" />
                    </div>
                </Link>

                {/* 3. Founder Spotlights - Bottom Right 1 */}
                <Link
                    href="/board/founder-spotlights" // Assuming route exists or will be created
                    className="md:col-span-1 md:row-span-1 group relative bg-[#F3E5F5]/60 hover:bg-[#F3E5F5]/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
                >
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-[#4F3457] tracking-tight mb-1">Founder Spotlights</h2>
                        <p className="text-[#4F3457]/70 text-sm font-semibold">Stories that inspire.</p>
                    </div>

                    <div className="self-end bg-white/50 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <ArrowUpRight className="text-[#4F3457]" size={20} />
                    </div>

                    {/* Halftone Asset */}
                    <div className="absolute -bottom-8 -left-8 w-[180px] h-[180px] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-12 opacity-90 mix-blend-multiply">
                        <img src="/icon-spotlight-halftone.png" alt="Spotlight" className="w-full h-full object-contain" />
                    </div>
                </Link>

                {/* 4. Ecosystem Events - Bottom Right 2 */}
                <Link
                    href="/board/events" // Assuming route exists or will be created
                    className="md:col-span-1 md:row-span-1 group relative bg-[#F3E5F5]/60 hover:bg-[#F3E5F5]/80 backdrop-blur-xl border border-white/60 rounded-[2.5rem] p-8 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
                >
                    <div className="relative z-10 text-right">
                        <h2 className="text-2xl font-bold text-[#4F3457] tracking-tight mb-1">Ecosystem Events</h2>
                        <p className="text-[#4F3457]/70 text-sm font-semibold">Don't miss out.</p>
                    </div>

                    <div className="self-start bg-white/50 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-white transition-colors">
                        <ArrowUpRight className="text-[#4F3457]" size={20} />
                    </div>

                    {/* Halftone Asset */}
                    <div className="absolute -bottom-10 -right-4 w-[160px] h-[160px] transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-rotate-12 opacity-90 mix-blend-multiply">
                        <img src="/icon-event-halftone.png" alt="Events" className="w-full h-full object-contain" />
                    </div>
                </Link>
            </div>
        </div>
    )
}
