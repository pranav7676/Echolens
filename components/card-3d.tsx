"use client"

import type React from "react"

import { useState, useRef, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Card3DProps {
  children: ReactNode
  className?: string
  glowColor?: "primary" | "secondary" | "accent"
}

export function Card3D({ children, className = "", glowColor = "primary" }: Card3DProps) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()

    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    // Calculate rotation (limited to +/- 10 degrees)
    const rotateY = (mouseX / (rect.width / 2)) * 5
    const rotateX = -(mouseY / (rect.height / 2)) * 5

    setRotateX(rotateX)
    setRotateY(rotateY)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  const glowClasses = {
    primary: "glow-border",
    secondary: "glow-border-secondary",
    accent: "glow-border-accent",
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn("relative rounded-xl overflow-hidden glassmorphism", glowClasses[glowColor], className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative z-10">{children}</div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/20 opacity-50 z-0"
        style={{
          transform: `translateZ(-10px)`,
        }}
      />
    </motion.div>
  )
}
