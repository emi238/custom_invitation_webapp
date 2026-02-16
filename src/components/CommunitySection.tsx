'use client'
import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { motion, useMotionValue, useTransform, useAnimation, PanInfo, animate } from 'framer-motion'

import { getCommunityPhotos } from '@/app/actions'

const inter = Inter({ subsets: ['latin'] })

const LAYOUT_DESKTOP = {
    RADIUS: 1500,
    ANGLE_STEP: 10,
    ARC_CENTER_Y: 1300,
    OFFSET_X: 120,
    OFFSET_Y: 45
};

const LAYOUT_MOBILE = {
    RADIUS: 550,
    ANGLE_STEP: 22,
    ARC_CENTER_Y: 500,
    OFFSET_X: 104,
    OFFSET_Y: 128
};

const COLOR_SOLID = '#F8F8F8';

function PolaroidCard({
    item,
    index,
    rotation,
    totalCount,
    layout
}: {
    item: any,
    index: number,
    rotation: any,
    totalCount: number,
    layout: { RADIUS: number, ANGLE_STEP: number, ARC_CENTER_Y: number, OFFSET_X: number, OFFSET_Y: number }
}) {
    const { RADIUS, ANGLE_STEP, ARC_CENTER_Y, OFFSET_X, OFFSET_Y } = layout;

    // Center the collection around -90 degrees
    const totalSpread = (totalCount - 1) * ANGLE_STEP;
    const startAngle = -90 - (totalSpread / 2);
    const baseAngleDeg = startAngle + (index * ANGLE_STEP);

    // Global rotation is added to the base angle
    const angleDeg = useTransform(rotation, (r: number) => baseAngleDeg + r);
    const angleRad = useTransform(angleDeg, (d: number) => d * (Math.PI / 180));

    const x = useTransform(angleRad, (a: number) => RADIUS * Math.cos(a) - OFFSET_X);
    const y = useTransform(angleRad, (a: number) => ARC_CENTER_Y + RADIUS * Math.sin(a) - OFFSET_Y);

    // Rotate card based on position: 
    // Left side (entering) -> rotate left (-)
    // Center -> 0
    // Right side (exiting) -> rotate right (+)
    const rotate = useTransform(angleDeg, (d: number) => d + 90);

    // Fade out edges
    const opacity = useTransform(angleDeg, (d: number) => {
        const dist = Math.abs(d + 90);
        if (dist > 65) return Math.max(0, 1 - (dist - 65) / 15);
        return 1;
    });

    const scale = useTransform(angleDeg, (d: number) => {
        const dist = Math.abs(d + 90);
        return 1 - Math.min(dist / 300, 0.2);
    });

    const zIndex = useTransform(angleDeg, (d: number) => {
        return 100 - Math.round(Math.abs(d + 90));
    });

    return (
        <motion.div
            style={{
                x, y, rotate, opacity, scale, zIndex,
                position: 'absolute', transformOrigin: 'center center',
                backgroundColor: COLOR_SOLID
            }}
            className="w-52 h-64 md:w-60 md:h-76 p-3 shadow-2xl transform-gpu flex-shrink-0 cursor-pointer"
            whileHover={{ scale: 1.15, zIndex: 150, transition: { duration: 0.2 } }}
        >
            <div
                className="w-full h-[80%] shadow-inner mb-2 overflow-hidden relative bg-white"
                style={{ transition: 'background-color 0.3s' }}
            >
                {item.src ? (
                    <Image
                        src={item.src}
                        alt={item.caption || "Community Photo"}
                        fill
                        className="object-cover"
                        draggable={false}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        {/* Placeholder */}
                    </div>
                )}
            </div>

            {/* Caption Area */}
            {item.caption && (
                <div className="w-full text-center px-1">
                    <p className={`${inter.className} text-[#4F3457] text-xs md:text-sm font-medium opacity-80 leading-tight line-clamp-2`}>
                        {item.caption}
                    </p>
                </div>
            )}
        </motion.div>
    )
}

export default function CommunitySection() {
    const [photos, setPhotos] = useState<any[]>([])
    const [layout, setLayout] = useState(LAYOUT_DESKTOP);

    const rotation = useMotionValue(-50);
    const containerRef = useRef<HTMLDivElement>(null);
    const [autoScrollSpeed, setAutoScrollSpeed] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setLayout(LAYOUT_MOBILE);
                setAutoScrollSpeed(0.1);
            } else {
                setLayout(LAYOUT_DESKTOP);
                setAutoScrollSpeed(0);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Animation Loop
    useEffect(() => {
        let lastTime = performance.now();
        let frameId: number;

        const loop = (time: number) => {
            const deltaOffset = (time - lastTime) * 0.05;
            lastTime = time;

            if (autoScrollSpeed !== 0 && photos.length > 0) {
                // "Slow the rate of scroll" -> scale factor 0.3
                const step = autoScrollSpeed * deltaOffset * 0.3;

                const currentRotation = rotation.get();
                const totalSpread = (photos.length - 1) * layout.ANGLE_STEP;
                const startAngle = -90 - (totalSpread / 2);

                const item0Angle = startAngle + currentRotation;
                const itemLastAngle = startAngle + totalSpread + currentRotation;

                // Bounds
                // Stop scrolling Right (bringing left items in) if FirstItem is at left edge (-105)
                // Stop scrolling Left (bringing right items in) if LastItem is at right edge (-75)

                if (step > 0) { // Moving Right
                    if (item0Angle < -105) {
                        rotation.set(currentRotation + step);
                    } else {
                        // Hit Left Limit
                        if (window.innerWidth < 768) {
                            setAutoScrollSpeed(s => -Math.abs(s)); // Reverse
                        }
                    }
                } else { // Moving Left
                    if (itemLastAngle > -75) {
                        rotation.set(currentRotation + step);
                    } else {
                        // Hit Right Limit
                        if (window.innerWidth < 768) {
                            setAutoScrollSpeed(s => Math.abs(s)); // Reverse
                        }
                    }
                }
            }
            frameId = requestAnimationFrame(loop);
        };
        frameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameId);
    }, [autoScrollSpeed, photos.length, layout.ANGLE_STEP]);

    // Fallback static cards
    const staticPolaroids = Array(5).fill(null).map((_, i) => ({
        color: COLOR_SOLID, rotation: 0, zIndex: 10, src: null, caption: null, id: `static-${i}`
    }));

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await getCommunityPhotos()

                // User requirement: "ensure that the photos being displayed is not repeated twice"
                // We use the fetched data directly if available, otherwise static.
                // We DO NOT duplicate the array anymore.
                let items = (data && data.length > 0) ? data : staticPolaroids;

                // Assign IDs but NO random colors needed anymore
                items = items.map((it: any, i: number) => ({
                    ...it,
                    tempId: `p-${i}`
                    // color property is no longer used for individual overrides
                }));

                setPhotos(items);
            } catch (err) {
                console.error("Failed to load community photos", err)
                setPhotos(staticPolaroids);
            }
        }
        fetchPhotos()
    }, [])

    useEffect(() => {
        if (photos.length === 0) return;

        // Entrance
        animate(rotation, 0, {
            type: "spring", stiffness: 30, damping: 15, duration: 2.5
        });

    }, [photos.length])

    const onPan = (event: any, info: PanInfo) => {
        const delta = info.delta.x * 0.1;
        const currentRot = rotation.get();
        const nextRot = currentRot + delta;

        if (photos.length > 0) {
            const totalSpread = (photos.length - 1) * layout.ANGLE_STEP;
            const startAngle = -90 - (totalSpread / 2);

            const item0Angle = startAngle + nextRot;
            const itemLastAngle = startAngle + totalSpread + nextRot;

            // Check bounds before setting
            if (delta > 0 && item0Angle >= -105) return;
            if (delta < 0 && itemLastAngle <= -75) return;

            rotation.set(nextRot);
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        // Disable mouse interaction scroll on mobile logic if we want strictly auto-scroll
        // But for hybrid, we check width
        if (window.innerWidth < 768) return;

        const { clientX, currentTarget } = e;
        const width = currentTarget.clientWidth;
        const x = clientX - currentTarget.getBoundingClientRect().left;

        // Zones
        const zoneSize = width * 0.10; // 25% edge zones

        if (x < zoneSize) {
            // Left Zone -> Move Right (Positive Rotation)
            const intensity = 1 - (x / zoneSize);
            setAutoScrollSpeed(2 * intensity);
        } else if (x > width - zoneSize) {
            // Right Zone -> Move Left (Negative Rotation)
            const intensity = (x - (width - zoneSize)) / zoneSize;
            setAutoScrollSpeed(-2 * intensity);
        } else {
            setAutoScrollSpeed(0);
        }
    }

    const handleMouseLeave = () => {
        if (window.innerWidth < 768) return; // Don't stop auto-scroll on mobile
        setAutoScrollSpeed(0);
    }

    const displayItems = photos.length > 0 ? photos : staticPolaroids

    return (
        <section
            id="communitySection"
            className="relative w-full min-h-screen h-screen overflow-hidden flex flex-col items-center justify-center"
            style={{
                background: 'linear-gradient(to bottom, #E6DDD8 40%, #E2D2EB 100%)'
            }}
        >
            <div className="absolute bottom-0 left-0 w-full h-[85%] opacity-100 pointer-events-none z-0">
                <Image
                    src="/leaf.png"
                    alt="Leaf"
                    fill
                    className="object-cover object-bottom"
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-between h-full py-12 w-full max-w-[95%]">
                <div className="mt-10 md:mt-35 z-20">
                    <h2 className={`${inter.className} font-bold text-[#4F3457] text-2xl md:text-5xl text-center lowercase tracking-tight`}>
                        our community of young founders
                    </h2>
                </div>

                {/* Interactable Arc Container */}
                <div
                    className="relative w-full flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing"
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{ perspective: 1000 }}
                >
                    {/* Invisible Pan Surface */}
                    <motion.div
                        className="absolute inset-0 z-50 bg-transparent"
                        onPan={onPan}
                        style={{ touchAction: 'pan-y' }}
                    />

                    {/* Anchor Point */}
                    <div className="absolute top-[50%] left-1/2">
                        {displayItems.map((item, i) => (
                            <PolaroidCard
                                key={item.tempId || i}
                                item={item}
                                index={i}
                                rotation={rotation}
                                totalCount={photos.length}
                                layout={layout}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
