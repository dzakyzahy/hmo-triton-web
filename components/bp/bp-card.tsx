"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MagneticButton } from "@/components/magnetic-button"
import type { Bidang } from "@/data/bp-data"

interface BPCardProps {
    bidang: Bidang
    index: number
    onViewDetails: () => void
}

export function BPCard({ bidang, index, onViewDetails }: BPCardProps) {
    const ketua = bidang.ketua

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] md:p-6"
            style={{
                contain: "layout style paint",
                willChange: "transform, opacity",
            }}
        >
            {/* Subtle gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col gap-4">
                {/* Header with photo and role badge */}
                <div className="flex items-start gap-4">
                    {/* Ketua Photo */}
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 md:h-16 md:w-16">
                        {ketua?.photo ? (
                            <Image
                                src={ketua.photo}
                                alt={ketua.name}
                                fill
                                sizes="64px"
                                className="object-cover"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDBAMBAAAAAAAAAAAAAQIDBAURABIhMQYTQVH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABkRAAMBAQEAAAAAAAAAAAAAAAECAwAEEf/aAAwDAQACEQMRAD8Ax9a81kdLbaqoqIpPfGkmON2RsZxnB5+alXC/1lRcKqVJGCPKzAAkcEnHWjRpELlljhcbcYLiK1bE5n//2Q=="
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <span className="text-lg font-semibold text-foreground/50">
                                    {ketua?.name?.charAt(0) || bidang.name.charAt(0)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Name and Role */}
                    <div className="min-w-0 flex-1">
                        <h3 className="mb-1 truncate font-sans text-base font-medium text-foreground md:text-lg">
                            {bidang.name}
                        </h3>
                        {ketua && (
                            <>
                                <p className="truncate text-sm text-foreground/70">
                                    {ketua.name}
                                </p>
                                <p className="font-mono text-xs text-foreground/50">
                                    {ketua.role}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {/* Description preview - fixed height for alignment */}
                <div className="min-h-[2.5rem]">
                    {bidang.deskripsi ? (
                        <p className="line-clamp-2 text-sm leading-relaxed text-foreground/60">
                            {bidang.deskripsi}
                        </p>
                    ) : bidang.visi ? (
                        <p className="line-clamp-2 text-sm leading-relaxed text-foreground/60">
                            {bidang.visi}
                        </p>
                    ) : null}
                </div>

                {/* Division count badge */}
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-foreground/70">
                        <span className="font-semibold text-foreground/90">
                            {bidang.divisi.length}
                        </span>
                        Divisi
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-foreground/70">
                        <span className="font-semibold text-foreground/90">
                            {bidang.divisi.reduce((acc, d) => acc + d.proker.length, 0)}
                        </span>
                        Proker
                    </span>
                </div>

                {/* View Details Button - always at bottom */}
                <div className="mt-auto pt-1">
                    <MagneticButton
                        variant="secondary"
                        onClick={onViewDetails}
                        className="w-full justify-center text-sm"
                    >
                        Lihat Detail
                    </MagneticButton>
                </div>
            </div>
        </motion.div>
    )
}
