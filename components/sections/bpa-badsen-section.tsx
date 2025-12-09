"use client"

import { useReveal } from "@/hooks/use-reveal"

export function BPABadSenSection() {
    const { ref, isVisible } = useReveal(0.3)

    return (
        <section
            ref={ref}
            className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-24 lg:px-16"
        >
            <div className="mx-auto w-full max-w-6xl">
                <div
                    className={`mb-6 transition-all duration-700 md:mb-12 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
                        }`}
                >
                    <h2 className="mb-1 font-sans text-2xl font-light tracking-tight text-foreground md:mb-2 md:text-5xl lg:text-6xl">
                        Pengawas & Senat
                    </h2>
                    <p className="font-mono text-[10px] text-foreground/60 md:text-sm">/ BPA & Badan Kesenatoran</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20">
                    {/* BPA Section */}
                    <div
                        className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                            }`}
                        style={{ transitionDelay: "150ms" }}
                    >
                        <div className="mb-2 flex items-center gap-2 md:mb-3">
                            <div className="h-px w-6 bg-cyan-400/50 md:w-8" />
                            <span className="font-mono text-[10px] text-cyan-400 md:text-xs">BPA</span>
                        </div>
                        <h3 className="mb-2 font-sans text-lg font-light text-foreground md:mb-3 md:text-2xl">
                            Badan Pengawas Anggota
                        </h3>
                        <p className="max-w-md text-xs leading-relaxed text-foreground/80 md:text-sm">
                            BPA merupakan badan yang bertugas mengawasi jalannya organisasi dan memastikan
                            kepatuhan terhadap AD/ART himpunan.
                        </p>
                        <div className="mt-2 space-y-1 md:mt-3 md:space-y-2">
                            <div className="flex items-center gap-2 text-[10px] text-foreground/60 md:text-xs">
                                <span className="h-1 w-1 rounded-full bg-cyan-400 md:h-1.5 md:w-1.5" />
                                <span>Pengawasan AD/ART</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-foreground/60 md:text-xs">
                                <span className="h-1 w-1 rounded-full bg-cyan-400 md:h-1.5 md:w-1.5" />
                                <span>Evaluasi Kinerja</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-foreground/60 md:text-xs">
                                <span className="h-1 w-1 rounded-full bg-cyan-400 md:h-1.5 md:w-1.5" />
                                <span>Mediasi Konflik</span>
                            </div>
                        </div>
                    </div>

                    {/* BadSen Section */}
                    <div
                        className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                            }`}
                        style={{ transitionDelay: "300ms" }}
                    >
                        <div className="mb-2 flex items-center gap-2 md:mb-3">
                            <div className="h-px w-6 bg-blue-400/50 md:w-8" />
                            <span className="font-mono text-[10px] text-blue-400 md:text-xs">BadSen</span>
                        </div>
                        <h3 className="mb-2 font-sans text-lg font-light text-foreground md:mb-3 md:text-2xl">
                            Badan Kesenatoran
                        </h3>
                        <p className="max-w-md text-xs leading-relaxed text-foreground/80 md:text-sm">
                            Senator Oseanografi adalah perwakilan mahasiswa Oseanografi di tingkat Keluarga
                            Mahasiswa ITB (KM ITB).
                        </p>
                        <div className="mt-2 space-y-1 md:mt-3 md:space-y-2">
                            <div className="flex items-center gap-2 text-[10px] text-foreground/60 md:text-xs">
                                <span className="h-1 w-1 rounded-full bg-blue-400 md:h-1.5 md:w-1.5" />
                                <span>Representasi di KM ITB</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-foreground/60 md:text-xs">
                                <span className="h-1 w-1 rounded-full bg-blue-400 md:h-1.5 md:w-1.5" />
                                <span>Advokasi Mahasiswa</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-foreground/60 md:text-xs">
                                <span className="h-1 w-1 rounded-full bg-blue-400 md:h-1.5 md:w-1.5" />
                                <span>Diplomasi Antar-Himpunan</span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info Cards */}
                    <div
                        className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                            }`}
                        style={{ transitionDelay: "450ms" }}
                    >
                        <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-3 backdrop-blur-sm md:rounded-xl md:p-5">
                            <h4 className="mb-1 font-sans text-sm font-light text-foreground md:mb-2 md:text-base">Prinsip Pengawasan</h4>
                            <p className="text-[10px] text-foreground/70 md:text-xs">
                                Transparansi, akuntabilitas, dan integritas dalam setiap aspek organisasi.
                            </p>
                        </div>
                    </div>

                    <div
                        className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                            }`}
                        style={{ transitionDelay: "600ms" }}
                    >
                        <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-3 backdrop-blur-sm md:rounded-xl md:p-5">
                            <h4 className="mb-1 font-sans text-sm font-light text-foreground md:mb-2 md:text-base">Misi Diplomasi</h4>
                            <p className="text-[10px] text-foreground/70 md:text-xs">
                                Membangun sinergi dan kolaborasi untuk kemajuan bersama di tingkat kampus.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

