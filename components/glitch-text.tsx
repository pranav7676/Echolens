"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(
      () => {
        setIsGlitching(true)
        setTimeout(() => setIsGlitching(false), 200)
      },
      Math.random() * 5000 + 3000,
    )

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <motion.span
      className={`relative inline-block ${isGlitching ? "glitch-text" : ""} ${className}`}
      animate={
        isGlitching
          ? {
              x: [0, -2, 3, -1, 0],
              opacity: [1, 0.8, 1, 0.9, 1],
            }
          : {}
      }
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.span>
  )
}
