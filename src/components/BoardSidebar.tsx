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
        <aside className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
            {navItems.map((item) => {
                const isActive = pathname === item.href

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all font-medium text-sm md:text-base
                            ${isActive
                                ? 'bg-white shadow-md text-[#4F3457] font-bold'
                                : 'text-[#4F3457]/70 hover:bg-white/50 hover:text-[#4F3457]'
                            }`}
                    >
                        <div className={`p-2 rounded-lg ${isActive ? 'bg-[#4F3457]/10' : 'bg-transparent'}`}>
                            <item.icon size={20} />
                        </div>
                        {item.name}
                    </Link>
                )
            })}
        </aside>
    )
}
