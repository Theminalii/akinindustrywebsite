'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import { Building2, Users, Briefcase, Award } from 'lucide-react'
import { useAdmin } from '@/lib/admin/context'

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value])

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

export function StatsSection() {
  const { stats: adminStats } = useAdmin()

  const stats = useMemo(() => [
    { 
      icon: Building2, 
      value: adminStats.projects, 
      suffix: '+', 
      label: 'Tamamlanmış Layihə' 
    },
    { 
      icon: Users, 
      value: adminStats.employees, 
      suffix: '+', 
      label: 'Peşəkar İşçi' 
    },
    { 
      icon: Briefcase, 
      value: adminStats.years, 
      suffix: '', 
      label: 'İllik Təcrübə' 
    },
    { 
      icon: Award, 
      value: adminStats.clients, 
      suffix: '+', 
      label: 'Razı Müştəri' 
    },
  ], [adminStats])

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center text-black"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-accent" />
              </div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-black/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
