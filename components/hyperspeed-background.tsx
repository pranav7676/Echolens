"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import type * as THREE from "three"

function MovingStars() {
  const starsRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.z = clock.getElapsedTime() * 0.05
      starsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.1
    }
  })

  return <Stars ref={starsRef} radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
}

export function HyperspeedBackground() {
  return (
    <div className="hyperspeed-bg">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <color attach="background" args={["#000"]} />
        <MovingStars />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}
