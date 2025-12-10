"use client"

import { useState } from "react"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Bidang } from "@/data/bp-data"

interface BPDetailDialogProps {
    bidang: Bidang | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function BPDetailDialog({ bidang, open, onOpenChange }: BPDetailDialogProps) {
    const [activeTab, setActiveTab] = useState("overview")

    // Content only renders when dialog is open - lazy loading
    if (!bidang || !open) return null

    const hasVisiMisi = bidang.visi || (bidang.misi && bidang.misi.length > 0)
    const hasDivisi = bidang.divisi && bidang.divisi.length > 0
    const allProker = bidang.divisi.flatMap((d) =>
        d.proker.map((p) => ({ ...p, divisiName: d.name }))
    )

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-h-[85vh] w-[95vw] max-w-2xl cursor-default overflow-hidden border-white/10 bg-background/95 p-0 backdrop-blur-xl sm:w-full"
                style={{ contain: "layout style" }}
            >
                {/* Header */}
                <DialogHeader className="border-b border-white/10 px-5 py-4 md:px-6">
                    <div className="flex items-center gap-4">
                        {/* Ketua Photo */}
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5 md:h-14 md:w-14">
                            {bidang.ketua?.photo ? (
                                <Image
                                    src={bidang.ketua.photo}
                                    alt={bidang.ketua.name}
                                    fill
                                    sizes="56px"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                    <span className="text-base font-semibold text-foreground/50">
                                        {bidang.ketua?.name?.charAt(0) || bidang.name.charAt(0)}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <DialogTitle className="text-lg font-medium md:text-xl">
                                {bidang.name}
                            </DialogTitle>
                            {bidang.ketua && (
                                <DialogDescription className="mt-0.5 text-sm text-foreground/70">
                                    {bidang.ketua.name} • {bidang.ketua.role}
                                </DialogDescription>
                            )}
                        </div>
                    </div>
                </DialogHeader>

                {/* Tabs */}
                <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="flex h-full max-h-[calc(85vh-100px)] flex-col"
                >
                    <TabsList className="mx-5 mt-4 w-fit shrink-0 border border-white/10 bg-white/5 md:mx-6">
                        <TabsTrigger
                            value="overview"
                            className="data-[state=active]:bg-white/10"
                        >
                            Overview
                        </TabsTrigger>
                        {hasDivisi && (
                            <TabsTrigger
                                value="divisi"
                                className="data-[state=active]:bg-white/10"
                            >
                                Divisi ({bidang.divisi.length})
                            </TabsTrigger>
                        )}
                        {allProker.length > 0 && (
                            <TabsTrigger
                                value="proker"
                                className="data-[state=active]:bg-white/10"
                            >
                                Proker ({allProker.length})
                            </TabsTrigger>
                        )}
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="mt-0 flex-1 overflow-hidden">
                        <ScrollArea className="h-full max-h-[calc(85vh-180px)]">
                            <div className="space-y-4 px-5 py-4 md:px-6">
                                {/* Description */}
                                {bidang.deskripsi && (
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium text-foreground/90">
                                            Deskripsi
                                        </h4>
                                        <p className="text-sm leading-relaxed text-foreground/70">
                                            {bidang.deskripsi}
                                        </p>
                                    </div>
                                )}

                                {/* Visi */}
                                {bidang.visi && (
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium text-foreground/90">
                                            Visi
                                        </h4>
                                        <p className="text-sm leading-relaxed text-foreground/70">
                                            {bidang.visi}
                                        </p>
                                    </div>
                                )}

                                {/* Misi */}
                                {bidang.misi && bidang.misi.length > 0 && (
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium text-foreground/90">
                                            Misi
                                        </h4>
                                        <ul className="space-y-2">
                                            {bidang.misi.map((misi, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex gap-2 text-sm leading-relaxed text-foreground/70"
                                                >
                                                    <span className="shrink-0 font-mono text-xs text-foreground/40">
                                                        {String(idx + 1).padStart(2, "0")}
                                                    </span>
                                                    {misi}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Ketua Info */}
                                {bidang.ketua && (
                                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                                        <h4 className="mb-3 text-sm font-medium text-foreground/90">
                                            Ketua
                                        </h4>
                                        <div className="flex items-center gap-3">
                                            <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                                                {bidang.ketua.photo ? (
                                                    <Image
                                                        src={bidang.ketua.photo}
                                                        alt={bidang.ketua.name}
                                                        fill
                                                        sizes="40px"
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <span className="text-sm font-semibold text-foreground/50">
                                                            {bidang.ketua.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">
                                                    {bidang.ketua.name}
                                                </p>
                                                <p className="font-mono text-xs text-foreground/50">
                                                    {bidang.ketua.nim}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    {/* Divisi Tab */}
                    {hasDivisi && (
                        <TabsContent value="divisi" className="mt-0 flex-1 overflow-hidden">
                            <ScrollArea className="h-full max-h-[calc(85vh-180px)]">
                                <div className="space-y-3 px-5 py-4 md:px-6">
                                    {bidang.divisi.map((divisi) => (
                                        <div
                                            key={divisi.id}
                                            className="rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/[0.08]"
                                        >
                                            <div className="mb-2 flex items-start justify-between gap-2">
                                                <h4 className="text-sm font-medium text-foreground">
                                                    {divisi.name}
                                                </h4>
                                                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-foreground/60">
                                                    {divisi.proker.length} Proker
                                                </span>
                                            </div>
                                            <p className="mb-3 text-sm text-foreground/60">
                                                {divisi.deskripsi}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-foreground/50">
                                                <span className="font-medium text-foreground/70">
                                                    Ketua:
                                                </span>
                                                <span>{divisi.ketua.name}</span>
                                                <span className="text-foreground/30">•</span>
                                                <span className="font-mono">{divisi.ketua.nim}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    )}

                    {/* Proker Tab */}
                    {allProker.length > 0 && (
                        <TabsContent value="proker" className="mt-0 flex-1 overflow-hidden">
                            <ScrollArea className="h-full max-h-[calc(85vh-180px)]">
                                <div className="space-y-2 px-5 py-4 md:px-6">
                                    {allProker.map((proker, idx) => (
                                        <div
                                            key={`${proker.divisiName}-${idx}`}
                                            className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-3 transition-colors hover:bg-white/5"
                                        >
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 font-mono text-xs text-foreground/50">
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start gap-2">
                                                    <h5 className="text-sm font-medium text-foreground">
                                                        {proker.name}
                                                    </h5>
                                                    <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-foreground/50">
                                                        {proker.divisiName}
                                                    </span>
                                                </div>
                                                {proker.description && (
                                                    <p className="mt-0.5 text-xs text-foreground/50">
                                                        {proker.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </TabsContent>
                    )}
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}
