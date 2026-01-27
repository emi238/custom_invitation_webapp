import FeedLayout from '@/components/FeedLayout'
import { getPosts } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default async function CofounderPage() {
    const posts = await getPosts('cofounder')

    return (
        <FeedLayout
            title="Find a Co-founder"
            posts={posts}
            type="cofounder"
        />
    )
}
