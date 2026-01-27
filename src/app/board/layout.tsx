import Navbar from '../../components/Navbar'
import BoardSidebar from '../../components/BoardSidebar'

export default function BoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#FFF5EB] font-sans text-[#4F3457] flex flex-col overflow-hidden">
            {/* Background Assets */}
            <div className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-10">
                <img
                    src="/hero-background.png"
                    alt=""
                    className="w-full h-full object-cover grayscale opacity-20"
                />
            </div>

            <Navbar theme="light" />

            <main className="flex-1 relative z-10 pt-24 pb-8 px-4 md:px-12 flex flex-col md:flex-row gap-8 max-w-[1600px] mx-auto w-full h-[calc(100vh)]">
                {/* Left Sidebar */}
                <BoardSidebar />

                {/* Middle Content */}
                <section className="flex-1 h-full min-h-0">
                    {children}
                </section>

                {/* Right Sidebar removed as requested */}
            </main>
        </div>
    )
}
