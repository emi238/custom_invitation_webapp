'use client'
import React from 'react'
import Image from 'next/image'
import { Inter, DM_Sans } from 'next/font/google'
import { motion, Variants } from 'framer-motion'

const inter = Inter({ subsets: ['latin'] })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['700'] })

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 40,
            damping: 15, // Smooth, engaging feel
            mass: 1
        }
    }
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 30, // Softer spring for larger elements
            damping: 20,
            duration: 0.8
        }
    }
}

export default function MissionVisionSection() {
    return (
        <section
            id="missionVisionSection"
            className="relative w-full min-h-screen md:h-screen overflow-y-auto md:overflow-hidden flex flex-col justify-between snap-start"
            style={{
                background: 'linear-gradient(to bottom, #B19BBA 0%, #8875B7 100%)'
            }}
        >
            {/* Stats Row */}
            <motion.div
                className={`max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center mt-24 md:mt-32 relative z-20`}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-10%" }}
            >
                {[
                    { val: "1", label: "Community" },
                    { val: "20+", label: "Young Founders" },
                    { val: "∞", label: "Ideas Shared" },
                    { val: "Brisbane", label: "Based" }
                ].map((stat, i) => (
                    <motion.div key={i} className="flex flex-col items-center" variants={itemVariants}>
                        <span className={`${dmSans.className} text-[#5E4175] text-2xl md:text-4xl lg:text-5xl font-bold`}>{stat.val}</span>
                        <span className="text-white text-base md:text-xl mt-2 font-medium tracking-wide">{stat.label}</span>
                    </motion.div>
                ))}
            </motion.div>

            {/* Mission/Vision Container */}
            <div className="flex-grow flex items-center md:items-end justify-center px-4 md:px-8 z-20 pb-0 mt-2 md:mt-10 mb-8 md:mb-0">
                <div className="relative w-full max-w-[1200px] bg-white/20 backdrop-blur-md border border-white/40 border-b-0 rounded-t-[2rem] md:rounded-t-[2.5rem] rounded-b-[2rem] md:rounded-b-none p-4 md:p-8 pb-4 md:pb-0 shadow-xl h-full flex flex-col justify-center">
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 h-full"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ staggerChildren: 0.2 }}
                    >
                        {/* Mission Card */}
                        <motion.div
                            className="bg-white/60 rounded-t-[1.5rem] md:rounded-t-[2rem] rounded-b-[1.5rem] md:rounded-b-none p-4 md:p-12 pb-4 md:pb-40 flex flex-col justify-start pt-6 md:pt-16 gap-2 md:gap-3 shadow-inner h-full"
                            variants={cardVariants}
                            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }} // Subtle depth effect
                        >
                            <motion.h3
                                variants={itemVariants}
                                className={`${inter.className} text-[#5E4175] text-2xl md:text-5xl lg:text-5xl font-bold lowercase tracking-tight`}
                            >
                                our mission
                            </motion.h3>
                            <motion.p
                                variants={itemVariants}
                                className={`${inter.className} text-[#4F3457] text-sm md:text-sm lg:text-lg leading-relaxed`}
                            >
                                To build a safe and founder-led space where young entrepreneurs feel <strong>supported</strong>, <strong>connected</strong>, and <strong>empowered</strong> to experiment, fail, and grow - together, because you shouldn't have to build alone.
                            </motion.p>
                        </motion.div>

                        {/* Vision Card */}
                        <motion.div
                            className="bg-white/60 rounded-t-[1.5rem] md:rounded-t-[2rem] rounded-b-[1.5rem] md:rounded-b-none p-4 md:p-12 pb-4 md:pb-40 flex flex-col justify-start pt-6 md:pt-16 gap-2 md:gap-3 shadow-inner h-full"
                            variants={cardVariants}
                            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
                        >
                            <motion.h3
                                variants={itemVariants}
                                className={`${inter.className} text-[#5E4175] text-2xl md:text-5xl lg:text-5xl font-bold lowercase tracking-tight text-left md:text-right`}
                            >
                                our vision
                            </motion.h3>
                            <motion.p
                                variants={itemVariants}
                                className={`${inter.className} text-[#4F3457] text-sm md:text-sm lg:text-lg leading-relaxed text-left md:text-right`}
                            >
                                To <strong>redefine</strong> what it means to build a startup, not in isolation, but <strong>in community</strong>.
                            </motion.p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Full Screen Spanning Petal Asset */}
            <div className="absolute bottom-0 left-0 w-full h-[50vh] z-30 pointer-events-none">
                <Image
                    src="/petal.png"
                    alt="Petals"
                    fill
                    className="object-cover object-bottom opacity-90"
                />
            </div>
        </section>
    )
}
