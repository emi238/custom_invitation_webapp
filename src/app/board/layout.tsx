import Navbar from '../../components/Navbar'
import BoardSidebar from '../../components/BoardSidebar'

export default function BoardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen font-sans text-[#4F3457] flex flex-col overflow-hidden" style={{ background: 'linear-gradient(to bottom, #FFE9C0, #AD99C1)' }}>


            <Navbar />

            <main className="flex-1 relative z-10 pt-36 pb-8 px-4 md:px-12 flex flex-col md:flex-row gap-8 max-w-[1600px] mx-auto w-full h-[calc(100vh)]">
                {/* Left Sidebar */}
                <BoardSidebar />

                {/* Middle Content */}
                <section className="flex-1 h-full min-h-0">
                    {children}
                </section>
            </main>
        </div>
    )
}
