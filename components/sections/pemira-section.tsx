"use client"

import { useReveal } from "@/hooks/use-reveal"
import { User } from "lucide-react"

export function PemiraSection() {
    const { ref, isVisible } = useReveal(0.2)

    return (
        <section
            ref={ref}
            className="relative h-screen w-screen shrink-0 snap-start overflow-hidden"
        >
            {/* Inner scrollable content */}
            <div data-pemilu-scroll className="absolute inset-0 overflow-y-auto overflow-x-hidden">
                <div className="min-h-full px-4 pt-28 pb-16 md:px-12 md:pt-28 lg:px-16">
                    <div className="mx-auto w-full max-w-7xl">
                        <div
                            className={`mb-8 transition-all duration-700 md:mb-10 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                                }`}
                        >
                            <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
                                Pemilu 2025
                            </h2>
                            <p className="font-mono text-xs text-foreground/60 md:text-base">/ Pemilihan Umum HMO TRITON ITB</p>
                        </div>

                        {/* Calon Ketua Himpunan */}
                        <div
                            className={`mb-8 transition-all duration-700 md:mb-10 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                                }`}
                            style={{ transitionDelay: "150ms" }}
                        >
                            <div className="mb-4 flex items-center gap-3">
                                <div className="h-px w-12 bg-gradient-to-r from-cyan-400 to-blue-500" />
                                <span className="font-mono text-sm font-medium text-cyan-400">Calon Ketua Himpunan (Kahim)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 md:gap-6">
                                {[
                                    { name: "Gavra", noUrut: 1 },
                                    { name: "Fachrul", noUrut: 2 },
                                ].map((kandidat, i) => (
                                    <CandidateCard
                                        key={kandidat.name}
                                        kandidat={kandidat}
                                        index={i}
                                        isVisible={isVisible}
                                        delay={200 + i * 100}
                                        accentColor="cyan"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Row with Senator and BSO Candidates */}
                        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
                            {/* Calon Senator */}
                            <div
                                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                                    }`}
                                style={{ transitionDelay: "400ms" }}
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="h-px w-12 bg-gradient-to-r from-blue-400 to-indigo-500" />
                                    <span className="font-mono text-sm font-medium text-blue-400">Calon Senator</span>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <CandidateCard
                                        kandidat={{ name: "Felly", noUrut: 1 }}
                                        index={0}
                                        isVisible={isVisible}
                                        delay={500}
                                        accentColor="blue"
                                    />
                                </div>
                            </div>

                            {/* Calon Ketua BSO POSEIDON */}
                            <div
                                className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                                    }`}
                                style={{ transitionDelay: "450ms" }}
                            >
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="h-px w-12 bg-gradient-to-r from-teal-400 to-cyan-500" />
                                    <span className="font-mono text-sm font-medium text-teal-400">Calon Ketua BSO POSEIDON</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 md:gap-4">
                                    {[
                                        { name: "Sada", noUrut: 1 },
                                        { name: "Ilham", noUrut: 2 },
                                        { name: "Tama", noUrut: 3 },
                                        { name: "Syahwal", noUrut: 4 },
                                    ].map((kandidat, i) => (
                                        <CandidateCard
                                            key={kandidat.name}
                                            kandidat={kandidat}
                                            index={i}
                                            isVisible={isVisible}
                                            delay={550 + i * 75}
                                            accentColor="teal"
                                            compact
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bottom padding for scroll */}
                        <div className="h-8" />
                    </div>
                </div>
            </div>

            {/* Scroll hint - fixed at bottom */}
            <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center">
                <div className="rounded-full border border-foreground/20 bg-background/50 px-4 py-2 backdrop-blur-sm">
                    <p className="font-mono text-xs text-foreground/60">↓ Scroll untuk melihat semua</p>
                </div>
            </div>
        </section>
    )
}

function CandidateCard({
    kandidat,
    index,
    isVisible,
    delay,
    accentColor = "cyan",
    compact = false,
}: {
    kandidat: { name: string; noUrut: number }
    index: number
    isVisible: boolean
    delay: number
    accentColor?: "cyan" | "blue" | "teal"
    compact?: boolean
}) {
    const colorClasses = {
        cyan: {
            border: "border-cyan-400/30",
            bg: "from-cyan-400/5 to-blue-500/5",
            glow: "shadow-cyan-400/10",
            accent: "bg-cyan-400/20 text-cyan-400",
            icon: "text-cyan-400/40",
        },
        blue: {
            border: "border-blue-400/30",
            bg: "from-blue-400/5 to-indigo-500/5",
            glow: "shadow-blue-400/10",
            accent: "bg-blue-400/20 text-blue-400",
            icon: "text-blue-400/40",
        },
        teal: {
            border: "border-teal-400/30",
            bg: "from-teal-400/5 to-cyan-500/5",
            glow: "shadow-teal-400/10",
            accent: "bg-teal-400/20 text-teal-400",
            icon: "text-teal-400/40",
        },
    }

    const colors = colorClasses[accentColor]

    return (
        <div
            className={`group relative overflow-hidden rounded-2xl border ${colors.border} bg-gradient-to-br ${colors.bg} backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.03] hover:shadow-xl ${colors.glow} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
            style={{
                transitionDelay: `${delay}ms`,
                willChange: "transform",
            }}
        >
            {/* Photo Placeholder */}
            <div
                className={`relative flex items-center justify-center bg-foreground/5 ${compact ? "aspect-square" : "aspect-[4/5]"
                    }`}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <User className={`${compact ? "h-8 w-8" : "h-10 w-10"} ${colors.icon}`} />
                    <span className={`font-mono ${compact ? "text-[10px]" : "text-xs"} text-foreground/40`}>
                        Foto Kandidat
                    </span>
                </div>

                {/* Badge */}
                <div className="absolute right-2 top-2">
                    <span className={`rounded-full ${colors.accent} px-2 py-0.5 font-mono text-[10px] font-bold`}>
                        #{kandidat.noUrut}
                    </span>
                </div>
            </div>

            {/* Name */}
            <div className={`${compact ? "p-2" : "p-3"}`}>
                <h3
                    className={`font-sans font-medium text-foreground ${compact ? "text-sm" : "text-base md:text-lg"
                        }`}
                >
                    {kandidat.name}
                </h3>
                <p className={`font-mono text-foreground/50 ${compact ? "text-[10px]" : "text-xs"}`}>
                    No. Urut {kandidat.noUrut}
                </p>
            </div>
        </div>
    )
}
