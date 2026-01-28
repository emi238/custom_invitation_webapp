import FeedLayout from '@/components/FeedLayout'
import InternshipWarning from '@/components/InternshipWarning'
import InternshipCard from '@/components/InternshipCard'
import { getPosts } from '@/app/actions'
import { Linkedin } from 'lucide-react'
import { InternshipPost } from '@/lib/types'

export const dynamic = 'force-dynamic'

const examplePosts: InternshipPost[] = [
    {
        id: '1',
        slug: 'ubiquiart',
        startup_name: 'Ubiquiart',
        startup_icon: 'https://api.dicebear.com/7.x/identicon/svg?seed=ubiquiart',
        banner_image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1000',
        description: 'We are building a music licensing marketplace that connects filmmakers with artists worldwide, unlocking opportunities for independent artists and making music sync licensing faster, simpler and more transparent.',
        is_paid: false,
        message_from_founder: "We are passionate about music and film. Join us to revolutionize the industry!",
        founder_signature_photo: '/signature.jpeg',
        contact_details: 'apply@ubiquiart.com',
        roles: [],
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        slug: 'ecoflow',
        startup_name: 'EcoFlow',
        startup_icon: 'https://api.dicebear.com/7.x/identicon/svg?seed=ecoflow',
        banner_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
        description: 'Revolutionizing urban gardening with smart, IoT-enabled vertical farming solutions for residential buildings.',
        is_paid: true,
        message_from_founder: '',
        founder_signature_photo: '',
        contact_details: '',
        roles: [],
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        slug: 'health-ai',
        startup_name: 'HealthAI',
        startup_icon: 'https://api.dicebear.com/7.x/identicon/svg?seed=healthai',
        banner_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000',
        description: 'Using computer vision to detect early signs of skin conditions through smartphone cameras.',
        is_paid: false,
        message_from_founder: '',
        founder_signature_photo: '',
        contact_details: '',
        roles: [],
        created_at: new Date().toISOString()
    }
]

export default async function InternshipsPage() {
    const rawPosts = await getPosts('internship')
    // Fallback logic: if rawPosts has items but they don't look like InternshipPost (e.g. old schema), 
    // we might want to filter them or just show examples for now to match the USER's "display information as in screenshot" request.
    // For this demo, I'll mix them or prioritize examples if rawPosts is empty.

    // cast rawPosts to potential InternshipPost if they have the content spread into them.
    // If getPosts returns { type: 'internship', ...content_fields }, then it works.
    const posts = rawPosts.length > 0 ? rawPosts as unknown as InternshipPost[] : examplePosts

    return (
        <FeedLayout
            title="internships"
            posts={[]} // Pass empty to suppress list rendering
            type="internship"
        >
            <div className="mb-0">
                {/* Note from Em */}
                <div className="bg-white/90 p-4 md:p-5 rounded-2xl shadow-sm mb-4">
                    <h3 className="text-lg font-bold text-[#4F3457] mb-2">Note from Em</h3>

                    <div className="space-y-1.5 text-[#4F3457]/90 leading-relaxed text-md">
                        <p>
                            23% of startups fail because they didn't have "the right team".
                        </p>
                        <p>
                            Having worked and supported several early-stage startups during my time working for a student-led venture capital fund, it was clear that many startups struggle to find their dream team.
                        </p>
                        <p>
                            Therefore, I have been very excited to launch this internship/job board to build a open space for early-stage operators and students to access rewarding and challenging opportunities, open up the flow of talent and collaboration in our startup ecosystem.
                        </p>
                        <p>
                            Most startups listed are founders currently in university or have graduated recently who are excited to give other students the unique opportunity to go from zero to one. All listings are vetted by me to ensure that startups are able to support interns and provide a good experience.
                        </p>
                        <p>
                            I hope you enjoy this new uplift of the job board! If you have any further feedbacks to help me improve this job board, please message me!
                        </p>
                        <p>
                            Happy exploring :)
                        </p>
                    </div>

                    <div className="mt-2 flex items-center gap-3">
                        <div className="w-6">
                            <img
                                src="/emi-signature.png"
                                alt="Emi"
                                className="w-full h-auto"
                            />
                        </div>
                        <a href="https://www.linkedin.com/in/emiho" target="_blank" rel="noopener noreferrer" className="text-[#4F3457] hover:text-[#0077b5] transition-colors">
                            <Linkedin size={18} />
                        </a>
                    </div>
                </div>

                {/* Warning Card */}
                <InternshipWarning />

                {/* Grid of Internships */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posts.map((post) => (
                        <InternshipCard key={post.id} post={post} />
                    ))}
                </div>
            </div>

        </FeedLayout>
    )
}
