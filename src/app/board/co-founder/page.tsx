import FeedLayout from '@/components/FeedLayout'
import { getPosts } from '@/app/actions'
import CofounderCard from '@/components/CofounderCard'

export const dynamic = 'force-dynamic'

export default async function CofounderPage() {
    const posts = await getPosts('cofounder')

    // Adapt posts for FeedLayout prop (which only checks length/existence)
    const genericPosts = posts.map((p: any) => ({
        id: p.id,
        title: p.startup_name,
        description: p.description,
        created_at: p.created_at
    }))

    return (
        <FeedLayout
            title="find a co-founder"
            posts={genericPosts}
            type="cofounder"
        >
            <div className="flex flex-col gap-6">
                {posts.map((post: any) => (
                    <CofounderCard key={post.id} post={post} />
                ))}
            </div>
        </FeedLayout>
    )
}
