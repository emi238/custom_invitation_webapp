'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Briefcase, Users, Calendar, Sparkles } from 'lucide-react'

const navItems = [
    { name: 'home', href: '/board', icon: Home },
    { name: 'internships', href: '/board/internships', icon: Briefcase },
    { name: 'find a co-founder', href: '/board/co-founder', icon: Users },
    { name: 'founder spotlights', href: '/board/spotlights', icon: Sparkles },
    { name: 'ecosystem events', href: '/board/events', icon: Calendar },
]

export default function BoardSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-row md:flex-col justify-between md:justify-start gap-0 md:gap-2 pb-0 md:pb-0">
            {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/board' && pathname.startsWith(item.href))

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-0.5 md:gap-3 px-0 md:px-6 py-2 md:py-3 rounded-xl transition-all font-medium flex-1 md:flex-none
                            ${isActive
                                ? 'bg-white/40 md:bg-white shadow-sm md:shadow-md text-[#4F3457] font-bold'
                                : 'text-[#4F3457]/70 hover:bg-white/50 hover:text-[#4F3457]'
                            }`}
                    >
                        <div className={`p-1.5 md:p-2 rounded-lg ${isActive ? 'bg-[#4F3457]/10' : 'bg-transparent'}`}>
                            <item.icon className="w-5 h-5 md:w-5 md:h-5" />
                        </div>
                        <span className={`${isActive ? 'block' : 'hidden'} md:block capitalize text-[9px] md:text-base leading-none text-center md:text-left`}>{item.name}</span>
                    </Link>
                )
            })}
        </aside>
    )
}
