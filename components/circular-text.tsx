"use client"

import { useRef, useEffect } from "react"

interface CircularTextProps {
  text: string
  size?: number
  className?: string
}

export function CircularText({ text, size = 150, className = "" }: CircularTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.clearRect(0, 0, size, size)

    // Set text properties
    ctx.font = "bold 14px Inter, sans-serif"
    ctx.fillStyle = "#a855f7"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    // Calculate radius for text placement
    const radius = size / 2 - 20

    // Draw text in a circle
    const characters = text.split("")
    const angleStep = (2 * Math.PI) / characters.length

    ctx.save()
    ctx.translate(size / 2, size / 2)

    characters.forEach((char, i) => {
      const angle = i * angleStep

      ctx.save()
      ctx.rotate(angle)
      ctx.translate(0, -radius)
      ctx.rotate(Math.PI / 2)
      ctx.fillText(char, 0, 0)
      ctx.restore()
    })

    ctx.restore()
  }, [text, size])

  return <canvas ref={canvasRef} width={size} height={size} className={`circular-text ${className}`} />
}
