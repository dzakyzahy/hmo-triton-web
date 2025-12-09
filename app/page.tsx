"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { BPSection } from "@/components/sections/bp-section"
import { BPABadSenSection } from "@/components/sections/bpa-badsen-section"
import { BSOSection } from "@/components/sections/bso-section"
import { PemiraSection } from "@/components/sections/pemira-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import Image from "next/image"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  // Reference to track if we're allowing vertical scroll in Pemilu
  const pemiraScrollRef = useRef<HTMLDivElement | null>(null)
  const [allowVerticalScroll, setAllowVerticalScroll] = useState(false)

  // Get reference to Pemilu section's scroll container
  useEffect(() => {
    const pemiraSection = document.querySelector('[data-pemilu-scroll]') as HTMLDivElement
    if (pemiraSection) {
      pemiraScrollRef.current = pemiraSection
    }
  }, [isLoaded])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current) return

      const container = scrollContainerRef.current
      const sectionWidth = container.offsetWidth
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      const isAtEnd = container.scrollLeft >= maxScrollLeft - 10 // Small threshold

      // Check if we're on the last section (Pemilu)
      if (currentSection === 4 && isAtEnd) {
        const pemiraScroll = pemiraScrollRef.current

        if (pemiraScroll) {
          const isAtTop = pemiraScroll.scrollTop <= 5
          const isScrollingUp = e.deltaY < 0

          // If at top of Pemilu content and scrolling up, go back to horizontal
          if (isAtTop && isScrollingUp) {
            e.preventDefault()
            // Scroll back to previous section
            scrollToSection(3)
            return
          }

          // Allow vertical scrolling within Pemilu
          return // Don't prevent default - let it scroll naturally
        }
      }

      // For all other sections, convert vertical scroll to horizontal
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        container.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const newSection = Math.round(container.scrollLeft / sectionWidth)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection])

  const navItems = ["Home", "BP", "BPA & BadSen", "BSO", "Pemilu"]

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#001F3F"
            colorB="#00A3E0"
            speed={0.5}
            detail={0.9}
            blend={60}
            coarseX={30}
            coarseY={30}
            mediumX={50}
            mediumY={50}
            fineX={60}
            fineY={60}
          />
          <ChromaFlow
            baseColor="#0077B6"
            upColor="#00A3E0"
            downColor="#001F3F"
            leftColor="#48CAE4"
            rightColor="#023E8A"
            intensity={0.85}
            radius={2.0}
            momentum={20}
            maskType="alpha"
            opacity={0.95}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/15" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 transition-opacity duration-700 md:px-12 md:py-6 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-3 transition-transform hover:scale-105"
        >
          <div className="flex items-center gap-2">
            <Image
              src="/logo-triton.png"
              alt="HMO TRITON"
              width={48}
              height={48}
              className="h-10 w-10 rounded-lg object-contain md:h-12 md:w-12"
            />
            <Image
              src="/logo-itb.png"
              alt="ITB"
              width={40}
              height={40}
              className="h-8 w-8 object-contain md:h-10 md:w-10"
            />
          </div>
          <span className="hidden font-sans text-lg font-semibold tracking-tight text-foreground sm:inline md:text-xl">
            HMO TRITON
          </span>
        </button>

        <div className="hidden items-center gap-6 lg:flex">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </button>
          ))}
        </div>

        <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
          Pemilu 2025
        </MagneticButton>
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-6 pb-16 pt-32 md:px-12 md:pb-24 md:pt-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-foreground/90">Oseanografi ITB 🌊</p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                HMO "TRITON"
                <br />
                <span className="text-foreground/70">ITB</span>
              </span>
            </h1>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                Selamat datang di Himpunan Mahasiswa Oseanografi Institut Teknologi Bandung.
                Bersama TRITON, kita menyelami ilmu kelautan dan berkontribusi untuk Indonesia maritim.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection(4)}
              >
                Lihat Pemilu
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(1)}>
                Tentang Kami
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Scroll untuk menjelajah</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        <BPSection />
        <BPABadSenSection />
        <BSOSection scrollToSection={scrollToSection} />
        <PemiraSection />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
