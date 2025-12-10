"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function BSOSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
    const { ref, isVisible } = useReveal(0.3)

    return (
        <section
            ref={ref}
            className="relative h-screen w-screen shrink-0 snap-start overflow-hidden"
        >
            {/* Inner scrollable content - smooth scroll on mobile */}
            <div className="absolute inset-0 overflow-y-auto overflow-x-hidden md:overflow-visible md:static md:h-auto">
                <div className="min-h-full px-4 pt-20 pb-8 md:flex md:min-h-screen md:items-center md:px-12 md:pt-24 md:pb-0 lg:px-16">
                    <div className="mx-auto w-full max-w-6xl">
                        <div className="grid gap-4 md:grid-cols-2 md:gap-12 lg:gap-20">
                            {/* Left side - Title and Description */}
                            <div>
                                <div
                                    className={`mb-4 transition-all duration-700 md:mb-8 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
                                        }`}
                                >
                                    <h2 className="mb-2 font-sans text-2xl font-light leading-[1.1] tracking-tight text-foreground md:mb-3 md:text-5xl lg:text-6xl">
                                        BSO
                                        <br />
                                        POSEIDON
                                    </h2>
                                    <p className="font-mono text-[10px] text-cyan-400 md:text-sm">
                                        / Persembahan Oseanografi untuk Indonesia
                                    </p>
                                </div>

                                <div
                                    className={`space-y-2 transition-all duration-700 md:space-y-3 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                        }`}
                                    style={{ transitionDelay: "200ms" }}
                                >
                                    <p className="max-w-md text-xs leading-relaxed text-foreground/90 md:text-base">
                                        BSO POSEIDON adalah unit pengabdian masyarakat HMO TRITON yang berdedikasi
                                        untuk membawa ilmu Oseanografi langsung ke masyarakat pesisir Indonesia.
                                    </p>
                                </div>
                            </div>

                            {/* Right side - Achievements */}
                            <div className="flex flex-col justify-center space-y-3 md:space-y-8">
                                {/* Featured Project */}
                                <div
                                    className={`rounded-xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 p-4 backdrop-blur-sm transition-all duration-700 md:p-6 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                                        }`}
                                    style={{ transitionDelay: "300ms" }}
                                >
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 font-mono text-[10px] text-cyan-400 md:px-3 md:py-1 md:text-xs">
                                            Featured Project
                                        </span>
                                    </div>
                                    <h3 className="mb-1 font-sans text-base font-light text-foreground md:mb-2 md:text-xl">
                                        Pantai Cirebon Project
                                    </h3>
                                    <p className="text-[10px] text-foreground/80 md:text-sm">
                                        BSO POSEIDON berhasil melaksanakan proyek besar di <strong className="text-cyan-400">Pantai Cirebon</strong>,
                                        memberikan edukasi kelautan dan konservasi kepada masyarakat setempat.
                                    </p>
                                </div>

                                {/* Stats */}
                                {[
                                    { value: "10+", label: "Desa Binaan", sublabel: "Pesisir Indonesia", direction: "right" },
                                    { value: "500+", label: "Masyarakat", sublabel: "Teredukasi", direction: "left" },
                                ].map((stat, i) => {
                                    const getRevealClass = () => {
                                        if (!isVisible) {
                                            return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                                        }
                                        return "translate-x-0 opacity-100"
                                    }

                                    return (
                                        <div
                                            key={i}
                                            className={`flex items-baseline gap-3 border-l-2 border-cyan-400/30 pl-3 transition-all duration-700 md:gap-6 md:pl-6 ${getRevealClass()}`}
                                            style={{
                                                transitionDelay: `${450 + i * 150}ms`,
                                                marginLeft: i % 2 === 0 ? "0" : "auto",
                                                maxWidth: i % 2 === 0 ? "100%" : "85%",
                                            }}
                                        >
                                            <div className="text-2xl font-light text-foreground md:text-4xl lg:text-5xl">{stat.value}</div>
                                            <div>
                                                <div className="font-sans text-sm font-light text-foreground md:text-lg">{stat.label}</div>
                                                <div className="font-mono text-[10px] text-foreground/60 md:text-xs">{stat.sublabel}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <div
                            className={`mt-6 flex flex-wrap gap-2 transition-all duration-700 md:mt-12 md:gap-3 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                                }`}
                            style={{ transitionDelay: "750ms" }}
                        >
                            <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(4)}>
                                Lihat Pemilu
                            </MagneticButton>
                            <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(0)}>
                                Kembali ke Home
                            </MagneticButton>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

