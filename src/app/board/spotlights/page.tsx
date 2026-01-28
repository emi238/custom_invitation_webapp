import FeedLayout from '@/components/FeedLayout'

export default function SpotlightsPage() {
    return (
        <FeedLayout
            title="founder spotlights"
            posts={[]} // Empty for now
            showAddButton={false}
        >
            <div className="bg-white/90 p-8 rounded-2xl border-l-4 border-[#4F3457] shadow-sm mb-8">
                <h3 className="text-lgs font-bold text-[#4F3457] mb-4">Founder Spotlights</h3>
                <p className="text-[#4F3457]/90">
                    Coming soon! We will be featuring founder stories here.
                </p>
            </div>
        </FeedLayout>
    )
}
