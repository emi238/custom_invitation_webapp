'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function InternshipWarning() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="w-full mb-8">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#71588A] hover:bg-[#5B4573] text-white py-3 px-6 rounded-xl flex items-center justify-between transition-all shadow-md group"
            >
                <div className="flex items-center gap-3">
                    <span className="font-bold text-md">First time here? Read this</span>
                </div>
                {isOpen ? (
                    <ChevronUp className="transition-transform group-hover:-translate-y-1" />
                ) : (
                    <ChevronDown className="transition-transform group-hover:translate-y-1" />
                )}
            </button>

            {isOpen && (
                <div className="mt-4 bg-white border-2 border-[#4F3457]/20 rounded-xl p-6 md:p-8 animate-in fade-in slide-in-from-top-4 duration-300 shadow-lg">
                    <div className="flex items-start justify-between mb-6">
                        <h2 className="text-2xl font-bold text-[#4F3457]">Attention Startups & Students</h2>
                    </div>

                    <p className="text-[#4F3457] mb-6 text-lg">
                        <strong>Unpaid Internships</strong> in Australia are <strong>strictly regulated</strong> to <strong>protect internees</strong>.
                        Companies and students <strong>PLEASE READ</strong> before engaging in opportunities:
                        <span className="italic block mt-1 text-sm opacity-80">(Lists are non-cumulative)</span>
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {/* NOT OK Column */}
                        <div className="bg-red-50 p-6 rounded-xl border border-red-100">
                            <div className="flex items-center gap-2 mb-4 text-red-700">
                                <XCircle className="w-6 h-6 flex-shrink-0" />
                                <h3 className="font-bold text-lg">Unpaid is NOT OK when:</h3>
                            </div>
                            <ul className="space-y-3 text-[#4F3457] list-disc pl-5">
                                <li>There are <strong>set/rostered hours</strong>, minimum weekly commitments, or full-time blocks.</li>
                                <li>The person does <strong>productive work</strong> the business needs (tasks a paid employee would do) or <strong>client-billable</strong> work.</li>
                                <li>The arrangement runs <strong>for weeks/months</strong> or becomes <strong>integral to operations</strong>.</li>
                                <li>There are <strong>deliverables/targets</strong>, covering shifts, or responsibility for outcomes.</li>
                                <li><strong>Perks</strong> (meals, accommodation, “exposure”) are offered <strong>instead of wages</strong>.</li>
                                <li>A “trial” that goes beyond a <strong>short, supervised skills demo</strong>.</li>
                            </ul>
                        </div>

                        {/* OK Column */}
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <div className="flex items-center gap-2 mb-4 text-green-700">
                                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                                <h3 className="font-bold text-lg">Unpaid is OK when:</h3>
                            </div>
                            <ul className="space-y-3 text-[#4F3457] list-disc pl-5">
                                <li>It’s a <strong>vocational placement</strong> (for-credit, <strong>approved</strong> by a uni/TAFE/course).</li>
                                <li>It’s <strong>short, flexible, and mainly observational</strong> (learning/skill-building; minimal productive work).</li>
                                <li>The <strong>main benefit</strong> clearly goes to the <strong>student</strong>.</li>
                                <li>An <strong>unpaid trial</strong> that is only a <strong>brief, supervised skills demo</strong> for a vacancy (just long enough to test).</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-[#4F3457]/5 p-6 rounded-xl mb-8">
                        <p className="text-[#4F3457] text-lg">
                            <strong>Bottom line:</strong> If it looks like a job (set hours, real deliverables, business benefit, direction/control) → <strong>it must be paid</strong> (minimum wage + super + payslips) <strong>UNLESS</strong> it constitutes credit (hours) for an <strong>approved vocational placement (uni/TAFE)</strong>.
                        </p>
                    </div>

                    <div className="space-y-4 text-[#4F3457]">
                        <p>
                            <strong>Students</strong>, know your <strong>rights to fair work</strong>. If you think you’ve engaged in an internships that violates fair work, you may be eligible to <strong>back-pay</strong>.
                        </p>
                        <p>
                            <strong>Startups</strong>, do the right thing, <strong>protect yourselves from legal liability & back-pay</strong>, and create a positive experience for all parties.
                        </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-[#4F3457]/80">
                        <p className="font-semibold mb-2">Further resources:</p>
                        <div className="flex flex-wrap gap-4">
                            <a href="https://www.fairwork.gov.au/pay-and-wages/unpaid-work" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#4F3457] font-medium">Unpaid work - Fair Work Ombudsman</a>
                            <a href="https://www.fairwork.gov.au/starting-employment/unpaid-work/work-experience-and-internships" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#4F3457] font-medium">Work experience and internships - Fair Work Ombudsman</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
