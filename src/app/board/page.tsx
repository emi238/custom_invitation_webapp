import FeedLayout from '@/components/FeedLayout'

export default function BoardHomePage() {
    // Determine what "Home" shows. Maybe a mix or just general updates?
    // User said: "filler as there is no contents yet".
    // "Home page" usually aggregates or just shows welcome.
    // I'll leave it as a general feed without "Add Post" or a specific "General" type.

    return (
        <FeedLayout
            title="home feed"
            posts={[]}
            showAddButton={false}
        />
    )
}
