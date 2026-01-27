import FeedLayout from '@/components/FeedLayout'
import { getPosts } from '@/app/actions'
import { Linkedin } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function InternshipsPage() {
    const posts = await getPosts('internship')

    return (
        <FeedLayout
            title="Internships"
            posts={posts}
            type="internship"
        >
            {/* Pinned Post */}
            <div className="bg-white/90 p-8 rounded-2xl border-l-4 border-[#4F3457] shadow-sm mb-8">
                <h3 className="text-xl font-bold text-[#4F3457] mb-4">Note from Em</h3>

                <div className="space-y-4 text-[#4F3457]/90 leading-relaxed font-medium">
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

                <div className="mt-8 flex items-center gap-4">
                    <div className="relative w-24 h-12">
                        <img
                            src="/signature.jpeg"
                            alt="Emi"
                            className="object-contain w-full h-full mix-blend-multiply"
                        />
                    </div>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#4F3457] hover:text-[#0077b5] transition-colors">
                        <Linkedin size={24} />
                    </a>
                </div>
            </div>
        </FeedLayout>
    )
}
