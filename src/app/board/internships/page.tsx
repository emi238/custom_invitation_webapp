import FeedLayout from '@/components/FeedLayout'
import { getPosts } from '@/app/actions'

export const dynamic = 'force-dynamic'

export default async function InternshipsPage() {
    const posts = await getPosts('internship')

    return (
        <FeedLayout
            title="Internships"
            posts={posts}
            type="internship"
        />
    )
}
