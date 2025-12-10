"use client"

import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { bpData, type Bidang } from "@/data/bp-data"
import { BPCard } from "@/components/bp/bp-card"
import { BPDetailDialog } from "@/components/bp/bp-detail-dialog"

export function BPSection() {
    const { ref, isVisible } = useReveal(0.2)
    const [selectedBidang, setSelectedBidang] = useState<Bidang | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleViewDetails = (bidang: Bidang) => {
        setSelectedBidang(bidang)
        setIsDialogOpen(true)
    }

    const handleCloseDialog = (open: boolean) => {
        setIsDialogOpen(open)
        if (!open) {
            // Delay clearing selected bidang to allow animation
            setTimeout(() => setSelectedBidang(null), 200)
        }
    }

    return (
        <section
            ref={ref}
            className="relative h-screen w-screen shrink-0 snap-start overflow-hidden"
        >
            {/* Inner scrollable content - smooth scroll on mobile */}
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden md:overflow-visible md:static md:h-auto">
                <div className="min-h-full px-4 pt-20 pb-8 md:flex md:min-h-screen md:items-center md:px-10 md:pt-16 md:pb-0 lg:px-14">
                    <div className="mx-auto w-full max-w-6xl">
                        {/* Header */}
                        <div
                            className={`mb-5 transition-all duration-700 md:mb-6 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                                }`}
                        >
                            <h2 className="mb-0.5 font-sans text-2xl font-light tracking-tight text-foreground md:text-3xl lg:text-4xl">
                                Badan Pengurus
                            </h2>
                            <p className="font-mono text-xs text-foreground/60 md:text-sm">
                                / BP HMO TRITON ITB 2024-2025
                            </p>
                        </div>

                        {/* Description */}
                        <div
                            className={`mb-6 max-w-2xl transition-all duration-700 md:mb-8 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                }`}
                            style={{ transitionDelay: "150ms" }}
                        >
                            <p className="text-sm leading-relaxed text-foreground/80 md:text-base">
                                Badan Pengurus merupakan motor penggerak utama HMO TRITON ITB yang
                                menjalankan roda organisasi sehari-hari. Terdiri dari pengurus inti
                                dan 6 bidang yang membawahi berbagai divisi dengan program kerja
                                masing-masing.
                            </p>
                        </div>

                        {/* Grid of Bidang Cards */}
                        <div
                            className={`grid grid-cols-1 gap-3 transition-opacity duration-700 sm:grid-cols-2 md:gap-4 lg:grid-cols-3 ${isVisible ? "opacity-100" : "opacity-0"
                                }`}
                            style={{ transitionDelay: "300ms" }}
                        >
                            {bpData.map((bidang, index) => (
                                <BPCard
                                    key={bidang.id}
                                    bidang={bidang}
                                    index={index}
                                    onViewDetails={() => handleViewDetails(bidang)}
                                />
                            ))}
                        </div>

                        {/* Stats Footer */}
                        <div
                            className={`mt-6 flex flex-wrap gap-4 border-t border-white/10 pt-4 transition-all duration-700 md:mt-8 md:gap-6 md:pt-6 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                }`}
                            style={{ transitionDelay: "500ms" }}
                        >
                            <div className="flex items-baseline gap-2">
                                <span className="font-sans text-xl font-semibold text-foreground md:text-2xl">
                                    {bpData.length}
                                </span>
                                <span className="text-sm text-foreground/60">Bidang</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-sans text-xl font-semibold text-foreground md:text-2xl">
                                    {bpData.reduce((acc, b) => acc + b.divisi.length, 0)}
                                </span>
                                <span className="text-sm text-foreground/60">Divisi</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-sans text-xl font-semibold text-foreground md:text-2xl">
                                    {bpData.reduce(
                                        (acc, b) =>
                                            acc + b.divisi.reduce((a, d) => a + d.proker.length, 0),
                                        0
                                    )}
                                </span>
                                <span className="text-sm text-foreground/60">Program Kerja</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Dialog - Only renders when open */}
            <BPDetailDialog
                bidang={selectedBidang}
                open={isDialogOpen}
                onOpenChange={handleCloseDialog}
            />
        </section>
    )
}
