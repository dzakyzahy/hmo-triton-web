"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function BSOSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
    const { ref, isVisible } = useReveal(0.3)

    return (
        <section
            ref={ref}
            className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-28 md:px-12 md:pt-0 lg:px-16"
        >
            <div className="mx-auto w-full max-w-7xl">
                <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
                    {/* Left side - Title and Description */}
                    <div>
                        <div
                            className={`mb-6 transition-all duration-700 md:mb-12 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
                                }`}
                        >
                            <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                                BSO
                                <br />
                                POSEIDON
                            </h2>
                            <p className="font-mono text-sm text-cyan-400 md:text-base">
                                / Persembahan Oseanografi untuk Indonesia
                            </p>
                        </div>

                        <div
                            className={`space-y-3 transition-all duration-700 md:space-y-4 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                                }`}
                            style={{ transitionDelay: "200ms" }}
                        >
                            <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                                BSO POSEIDON adalah unit pengabdian masyarakat HMO TRITON yang berdedikasi
                                untuk membawa ilmu Oseanografi langsung ke masyarakat pesisir Indonesia.
                            </p>
                            <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                                Melalui berbagai program nyata, POSEIDON menjadi jembatan antara dunia
                                akademis dan kebutuhan riil masyarakat maritim.
                            </p>
                        </div>
                    </div>

                    {/* Right side - Achievements */}
                    <div className="flex flex-col justify-center space-y-6 md:space-y-12">
                        {/* Featured Project */}
                        <div
                            className={`rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 p-6 backdrop-blur-sm transition-all duration-700 md:p-8 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                                }`}
                            style={{ transitionDelay: "300ms" }}
                        >
                            <div className="mb-3 flex items-center gap-2">
                                <span className="rounded-full bg-cyan-400/20 px-3 py-1 font-mono text-xs text-cyan-400">
                                    Featured Project
                                </span>
                            </div>
                            <h3 className="mb-2 font-sans text-xl font-light text-foreground md:text-2xl">
                                Pantai Cirebon Project
                            </h3>
                            <p className="text-sm text-foreground/80 md:text-base">
                                BSO POSEIDON berhasil melaksanakan proyek besar di <strong className="text-cyan-400">Pantai Cirebon</strong>,
                                memberikan edukasi kelautan dan konservasi kepada masyarakat setempat, serta
                                melakukan pendataan ekosistem pesisir untuk keberlanjutan lingkungan.
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
                                    className={`flex items-baseline gap-4 border-l-2 border-cyan-400/30 pl-4 transition-all duration-700 md:gap-8 md:pl-8 ${getRevealClass()}`}
                                    style={{
                                        transitionDelay: `${450 + i * 150}ms`,
                                        marginLeft: i % 2 === 0 ? "0" : "auto",
                                        maxWidth: i % 2 === 0 ? "100%" : "85%",
                                    }}
                                >
                                    <div className="text-3xl font-light text-foreground md:text-5xl lg:text-6xl">{stat.value}</div>
                                    <div>
                                        <div className="font-sans text-base font-light text-foreground md:text-xl">{stat.label}</div>
                                        <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div
                    className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-16 md:gap-4 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
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
        </section>
    )
}
