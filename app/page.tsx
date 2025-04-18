"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Mic, Eye, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HyperspeedBackground } from "@/components/hyperspeed-background"
import { GlitchText } from "@/components/glitch-text"
import { CircularText } from "@/components/circular-text"
import { TypewriterText } from "@/components/typewriter-text"
import { Card3D } from "@/components/card-3d"
import { SplashScreen } from "@/components/splash-screen"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <>
      <SplashScreen onComplete={() => setIsLoaded(true)} />
      <HyperspeedBackground />

      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-12"
        >
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row items-center justify-between gap-8 min-h-[80vh]">
            <motion.div
              className="flex-1"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <GlitchText text="Welcome to " />
                <br />
                <GlitchText text="Echo" className="text-primary" />
                <GlitchText text="Lens" />
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-muted-foreground">
                AI-Powered Assistive Technology
              </h2>
              <TypewriterText
                text="Real-time speech transcription and object detection for visually impaired users."
                className="text-lg mb-8"
              />
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="group" asChild>
                  <motion.a href="/dashboard" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Try Dashboard
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </Button>
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/20" asChild>
                  <motion.a href="/about" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Learn More
                  </motion.a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="flex-1 relative"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="relative w-full h-80 md:h-96">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <CircularText text="AI ASSISTIVE TECHNOLOGY • REAL-TIME ANALYSIS • " size={280} />
                </div>
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-border"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 10px rgba(168, 85, 247, 0.5)",
                      "0 0 20px rgba(168, 85, 247, 0.7)",
                      "0 0 10px rgba(168, 85, 247, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Mic className="w-12 h-12 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="py-16">
            <h2 className="text-3xl font-bold mb-12 text-center">
              <GlitchText text="Key Features" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card3D className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Mic className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Speech Transcription</h3>
                  <p className="text-muted-foreground">
                    Real-time speech-to-text conversion with high accuracy for seamless communication.
                  </p>
                </div>
              </Card3D>

              <Card3D className="p-6" glowColor="secondary">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                    <Eye className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Object Detection</h3>
                  <p className="text-muted-foreground">
                    Advanced computer vision to identify objects and people in the environment.
                  </p>
                </div>
              </Card3D>

              <Card3D className="p-6" glowColor="accent">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                    <Brain className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI Feedback</h3>
                  <p className="text-muted-foreground">
                    Intelligent analysis and contextual feedback to enhance user experience.
                  </p>
                </div>
              </Card3D>
            </div>
          </section>
        </motion.div>
      )}
    </>
  )
}
