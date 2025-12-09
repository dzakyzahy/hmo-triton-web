"use client"

import { useReveal } from "@/hooks/use-reveal"

export function BPSection() {
    const { ref, isVisible } = useReveal(0.3)

    return (
        <section
            ref={ref}
            className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-28 md:px-12 md:pt-0 lg:px-16"
        >
            <div className="mx-auto w-full max-w-7xl">
                <div
                    className={`mb-12 transition-all duration-700 md:mb-16 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
                        }`}
                >
                    <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
                        Badan Pengurus
                    </h2>
                    <p className="font-mono text-sm text-foreground/60 md:text-base">/ BP HMO TRITON ITB</p>
                </div>

                <div
                    className={`mb-8 max-w-2xl transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        }`}
                    style={{ transitionDelay: "200ms" }}
                >
                    <p className="text-lg leading-relaxed text-foreground/90 md:text-xl">
                        Badan Pengurus merupakan motor penggerak utama HMO TRITON ITB yang menjalankan
                        roda organisasi sehari-hari. BP bertanggung jawab dalam mengeksekusi seluruh
                        program kerja dan memastikan tercapainya visi-misi himpunan.
                    </p>
                </div>

                <div className="space-y-6 md:space-y-8">
                    {[
                        {
                            number: "01",
                            title: "Eksekutor Program Kerja",
                            description: "Merancang dan melaksanakan program kerja yang bermanfaat bagi anggota dan masyarakat",
                            direction: "left",
                        },
                        {
                            number: "02",
                            title: "Koordinator Kegiatan",
                            description: "Mengkoordinasikan seluruh kegiatan internal dan eksternal himpunan",
                            direction: "right",
                        },
                        {
                            number: "03",
                            title: "Pengembangan Anggota",
                            description: "Memfasilitasi pengembangan soft skill dan hard skill mahasiswa Oseanografi",
                            direction: "left",
                        },
                    ].map((item, i) => (
                        <BPCard key={i} item={item} index={i} isVisible={isVisible} />
                    ))}
                </div>
            </div>
        </section>
    )
}

function BPCard({
    item,
    index,
    isVisible,
}: {
    item: { number: string; title: string; description: string; direction: string }
    index: number
    isVisible: boolean
}) {
    const getRevealClass = () => {
        if (!isVisible) {
            return item.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
        }
        return "translate-x-0 opacity-100"
    }

    return (
        <div
            className={`group flex items-start justify-between border-b border-foreground/10 py-6 transition-all duration-700 hover:border-foreground/20 md:py-8 ${getRevealClass()}`}
            style={{
                transitionDelay: `${300 + index * 150}ms`,
                marginLeft: index % 2 === 0 ? "0" : "auto",
                maxWidth: index % 2 === 0 ? "85%" : "90%",
            }}
        >
            <div className="flex items-baseline gap-4 md:gap-8">
                <span className="font-mono text-sm text-foreground/30 transition-colors group-hover:text-foreground/50 md:text-base">
                    {item.number}
                </span>
                <div>
                    <h3 className="mb-1 font-sans text-2xl font-light text-foreground transition-transform duration-300 group-hover:translate-x-2 md:text-3xl lg:text-4xl">
                        {item.title}
                    </h3>
                    <p className="max-w-md font-mono text-xs text-foreground/50 md:text-sm">{item.description}</p>
                </div>
            </div>
        </div>
    )
}
