"use client"

import { useReveal } from "@/hooks/use-reveal"

export function BPABadSenSection() {
    const { ref, isVisible } = useReveal(0.3)

    return (
        <section
            ref={ref}
            className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-36 md:px-12 md:pt-24 lg:px-16"
        >
            <div className="mx-auto w-full max-w-7xl">
                <div
                    className={`mb-12 transition-all duration-700 md:mb-16 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
                        }`}
                >
                    <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
                        Pengawas & Senat
                    </h2>
                    <p className="font-mono text-sm text-foreground/60 md:text-base">/ BPA & Badan Kesenatoran</p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12 lg:gap-x-24">
                    {/* BPA Section */}
                    <div
                        className={`transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                            }`}
                        style={{ transitionDelay: "150ms" }}
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-px w-8 bg-cyan-400/50" />
                            <span className="font-mono text-xs text-cyan-400">BPA</span>
                        </div>
                        <h3 className="mb-3 font-sans text-2xl font-light text-foreground md:text-3xl">
                            Badan Pengawas Anggota
                        </h3>
                        <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
                            BPA merupakan badan yang bertugas mengawasi jalannya organisasi dan memastikan
                            kepatuhan terhadap AD/ART himpunan. Sebagai penjaga konstitusi internal, BPA
                            memiliki wewenang untuk memberikan rekomendasi dan evaluasi terhadap kinerja
                            seluruh badan di HMO TRITON.
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                <span>Pengawasan AD/ART</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                <span>Evaluasi Kinerja</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
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
                        <div className="mb-4 flex items-center gap-3">
                            <div className="h-px w-8 bg-blue-400/50" />
                            <span className="font-mono text-xs text-blue-400">BadSen</span>
                        </div>
                        <h3 className="mb-3 font-sans text-2xl font-light text-foreground md:text-3xl">
                            Badan Kesenatoran
                        </h3>
                        <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
                            Senator Oseanografi adalah perwakilan mahasiswa Oseanografi di tingkat Keluarga
                            Mahasiswa ITB (KM ITB). Sebagai jembatan aspirasi, Senator berperan aktif dalam
                            memperjuangkan kepentingan mahasiswa Oseanografi di forum tertinggi kampus dan
                            membangun relasi dengan himpunan lain.
                        </p>
                        <div className="mt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                <span>Representasi di KM ITB</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                <span>Advokasi Mahasiswa</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
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
                        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
                            <h4 className="mb-2 font-sans text-lg font-light text-foreground">Prinsip Pengawasan</h4>
                            <p className="text-sm text-foreground/70">
                                Transparansi, akuntabilitas, dan integritas dalam setiap aspek organisasi.
                            </p>
                        </div>
                    </div>

                    <div
                        className={`transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
                            }`}
                        style={{ transitionDelay: "600ms" }}
                    >
                        <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
                            <h4 className="mb-2 font-sans text-lg font-light text-foreground">Misi Diplomasi</h4>
                            <p className="text-sm text-foreground/70">
                                Membangun sinergi dan kolaborasi untuk kemajuan bersama di tingkat kampus.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
