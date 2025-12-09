"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { BPSection } from "@/components/sections/bp-section"
import { BPABadSenSection } from "@/components/sections/bpa-badsen-section"
import { BSOSection } from "@/components/sections/bso-section"
import { PemiraSection } from "@/components/sections/pemira-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number | undefined>(undefined)
  const isScrollingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  const scrollToSection = useCallback((index: number) => {
    if (scrollContainerRef.current && !isScrollingRef.current) {
      isScrollingRef.current = true
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
      setTimeout(() => {
        isScrollingRef.current = false
      }, 500)
    }
  }, [])

  // Reference to track Pemilu scroll
  const pemiraScrollRef = useRef<HTMLDivElement | null>(null)

  // Get reference to Pemilu section's scroll container
  useEffect(() => {
    const pemiraSection = document.querySelector('[data-pemilu-scroll]') as HTMLDivElement
    if (pemiraSection) {
      pemiraScrollRef.current = pemiraSection
    }
  }, [isLoaded])

  // MOBILE TOUCH HANDLING - Separate horizontal and vertical gestures
  useEffect(() => {
    if (!isMobile) return

    let touchStartX = 0
    let touchStartY = 0
    let touchDirection: 'none' | 'horizontal' | 'vertical' = 'none'

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX
      touchStartY = e.touches[0].clientY
      touchDirection = 'none'
    }

    const handleTouchMove = (e: TouchEvent) => {
      const deltaX = e.touches[0].clientX - touchStartX
      const deltaY = e.touches[0].clientY - touchStartY

      // Determine direction on first significant move
      if (touchDirection === 'none') {
        if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
          touchDirection = Math.abs(deltaX) > Math.abs(deltaY) ? 'horizontal' : 'vertical'
        }
      }

      // If horizontal gesture detected, prevent vertical scroll
      if (touchDirection === 'horizontal') {
        e.preventDefault()
      }

      // If vertical gesture on non-Pemilu section, prevent it
      if (touchDirection === 'vertical' && currentSection !== 4) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX
      const touchEndY = e.changedTouches[0].clientY
      const deltaX = touchStartX - touchEndX
      const deltaY = touchStartY - touchEndY

      // Horizontal swipe - navigate sections
      if (touchDirection === 'horizontal' && Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentSection < 4) {
          // Swipe left - go to next section
          scrollToSection(currentSection + 1)
        } else if (deltaX < 0 && currentSection > 0) {
          // Swipe right - go to previous section
          scrollToSection(currentSection - 1)
        }
      }

      // Vertical swipe on Pemilu - handled naturally by browser
      // But if at top of Pemilu and swiping down (going back), go to previous section
      if (touchDirection === 'vertical' && currentSection === 4) {
        const pemiraScroll = pemiraScrollRef.current
        if (pemiraScroll && pemiraScroll.scrollTop <= 5 && deltaY < -50) {
          scrollToSection(3)
        }
      }

      touchDirection = 'none'
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
  }, [currentSection, isMobile, scrollToSection])

  // DESKTOP WHEEL HANDLING
  useEffect(() => {
    if (isMobile) return

    const handleWheel = (e: WheelEvent) => {
      if (!scrollContainerRef.current || isScrollingRef.current) return

      const container = scrollContainerRef.current
      const sectionWidth = container.offsetWidth
      const maxScrollLeft = container.scrollWidth - container.clientWidth
      const isAtEnd = container.scrollLeft >= maxScrollLeft - 10

      // Check if we're on the last section (Pemilu)
      if (currentSection === 4 && isAtEnd) {
        const pemiraScroll = pemiraScrollRef.current

        if (pemiraScroll) {
          const isAtTop = pemiraScroll.scrollTop <= 5
          const isScrollingUp = e.deltaY < 0

          // If at top of Pemilu content and scrolling up, go back to previous section
          if (isAtTop && isScrollingUp) {
            e.preventDefault()
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

        // Smooth step-based navigation
        if (Math.abs(e.deltaY) > 30) {
          if (e.deltaY > 0 && currentSection < 4) {
            scrollToSection(currentSection + 1)
          } else if (e.deltaY < 0 && currentSection > 0) {
            scrollToSection(currentSection - 1)
          }
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
  }, [currentSection, isMobile, scrollToSection])

  // Track scroll position for section indicator
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
        {/* Hero Section - Mobile Responsive */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-center px-4 pb-20 pt-24 md:justify-end md:px-12 md:pb-24 md:pt-24">
          <div className="max-w-3xl">
            <div className="mb-3 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-3 py-1 backdrop-blur-md duration-700 md:mb-4 md:px-4 md:py-1.5">
              <p className="font-mono text-[10px] text-foreground/90 md:text-xs">Oseanografi ITB 🌊</p>
            </div>
            <h1 className="mb-4 animate-in fade-in slide-in-from-bottom-8 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:mb-6 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                HMO "TRITON"
                <br />
                <span className="text-foreground/70">ITB</span>
              </span>
            </h1>
            <p className="mb-6 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-sm leading-relaxed text-foreground/90 duration-1000 delay-200 md:mb-8 md:text-xl">
              <span className="text-pretty">
                Selamat datang di Himpunan Mahasiswa Oseanografi Institut Teknologi Bandung.
                Bersama TRITON, kita menyelami ilmu kelautan dan berkontribusi untuk Indonesia maritim.
              </span>
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-3 duration-1000 delay-300 sm:flex-row sm:items-center md:gap-4">
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

          {/* Scroll Indicator - Horizontal on Mobile, Centered */}
          <div className="mt-8 flex w-full animate-in fade-in justify-center duration-1000 delay-500 md:absolute md:bottom-8 md:left-1/2 md:mt-0 md:-translate-x-1/2">
            <div className="flex flex-col items-center gap-2">
              <p className="font-mono text-[10px] text-foreground/80 md:text-xs">
                {isMobile ? "Geser ke samping" : "Scroll untuk menjelajah"}
              </p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className={`h-2 w-2 animate-pulse rounded-full bg-foreground/80 ${isMobile ? "animate-bounce-x" : ""}`} />
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
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(4px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s ease-in-out infinite;
        }
      `}</style>
    </main>
  )
}

