import FeedLayout from '@/components/FeedLayout'
import { getPosts } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default async function EventsPage() {
    const posts = await getPosts('event')

    return (
        <FeedLayout
            title="ecosystem events"
            posts={posts}
            type="event"
        />
    )
}
