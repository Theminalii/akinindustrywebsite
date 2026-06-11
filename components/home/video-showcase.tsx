'use client'

import { useEffect, useState, useRef } from 'react'

const videos = [
  '/video1.mp4',
  '/video2.mp4'
]

export function VideoShowcase() {
  const [current, setCurrent] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const currentVideo = videoRefs.current[current]
    if (currentVideo) {
      const handleEnded = () => {
        setCurrent((prev) => (prev + 1) % videos.length)
      }
      
      currentVideo.addEventListener('ended', handleEnded)
      
      return () => {
        currentVideo.removeEventListener('ended', handleEnded)
      }
    }
  }, [current])

  useEffect(() => {
    const currentVideo = videoRefs.current[current]
    if (currentVideo && isVisible) {
      currentVideo.play().catch(() => {
        // Handle play promise rejection (e.g., autoplay blocked)
      })
    }
  }, [current, isVisible])

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full h-[60vh] overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ perspective: '1000px' }}
    >
      
      {/* VIDEOLAR */}
      {videos.map((video, index) => (
        <video
          key={index}
          ref={(el) => { videoRefs.current[index] = el }}
          src={video}
          autoPlay
          muted
          playsInline
          controls={false}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ${
            index === current ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
          }`}
          style={{ transform: isVisible ? 'rotateX(0deg)' : 'rotateX(10deg)' }}
        />
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/50 z-20" />

      {/* CONTENT */}
      <div className="absolute inset-0 z-30 flex flex-col justify-center px-10 md:px-20 text-white">
        <h1 className="text-4xl md:text-6xl font-montserrat font-light mb-4 transform transition-transform duration-1000" 
            style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
          Building the Future
        </h1>

        <p className="text-lg md:text-2xl font-inter max-w-2xl mb-6 transform transition-transform duration-1000 delay-200" 
           style={{ transform: isVisible ? 'translateY(0)' : 'translateY(20px)' }}>
          Precision. Quality. Trust.
        </p>
      </div>

      {/* SLIDER LINE (alt progress kimi) */}
      <div className="absolute bottom-6 left-10 right-10 z-30 flex gap-2">
        {videos.map((_, i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 transition-all duration-500 ${
              i === current ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </section>
  )
}