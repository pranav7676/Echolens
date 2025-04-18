"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AudioWaveformProps {
  isActive?: boolean
}

export function AudioWaveform({ isActive = false }: AudioWaveformProps) {
  const [bars, setBars] = useState<number[]>([])

  useEffect(() => {
    // Generate random heights for bars
    const generateBars = () => {
      return Array.from({ length: 30 }, () => Math.random() * 100)
    }

    if (isActive) {
      setBars(generateBars())
      const interval = setInterval(() => {
        setBars(generateBars())
      }, 100)

      return () => clearInterval(interval)
    } else {
      setBars(Array.from({ length: 30 }, () => 10))
    }
  }, [isActive])

  return (
    <div className="waveform">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className="waveform-bar"
          animate={{ height: `${isActive ? height : 10}%` }}
          transition={{ duration: 0.2 }}
          style={{
            backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--muted))",
          }}
        />
      ))}
    </div>
  )
}
