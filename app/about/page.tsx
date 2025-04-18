"use client"

import { motion } from "framer-motion"
import { GlitchText } from "@/components/glitch-text"
import { Card3D } from "@/components/card-3d"
import { HyperspeedBackground } from "@/components/hyperspeed-background"
import { Mic, Eye, Brain, Users, Clock, Code, Award, Target } from "lucide-react"

export default function About() {
  // Animated counter component
  const Counter = ({ end, label, icon: Icon }: { end: number; label: string; icon: any }) => {
    return (
      <Card3D className="p-6 flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <motion.span
          className="text-3xl font-bold mb-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
            {end}
          </motion.span>
          {label.includes("%") && "%"}
        </motion.span>
        <span className="text-sm text-muted-foreground text-center">{label.replace("%", "")}</span>
      </Card3D>
    )
  }

  // Timeline component
  const TimelineItem = ({
    year,
    title,
    description,
    index,
  }: { year: string; title: string; description: string; index: number }) => {
    return (
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
      >
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold">
            {year}
          </div>
          <div className="w-0.5 h-full bg-primary/30 mt-2"></div>
        </div>
        <div className="pb-10">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </motion.div>
    )
  }

  // Floating card component
  const FloatingCard = ({
    title,
    icon: Icon,
    description,
    delay,
  }: { title: string; icon: any; description: string; delay: number }) => {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay, duration: 0.5 }}
        className="animate-float"
      >
        <Card3D className="p-6 h-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </Card3D>
      </motion.div>
    )
  }

  const timelineItems = [
    {
      year: "2022",
      title: "Concept Development",
      description: "Initial research and concept development for EchoLens assistive technology.",
    },
    {
      year: "2023",
      title: "Prototype Testing",
      description: "First working prototype developed and tested with focus groups.",
    },
    {
      year: "2024",
      title: "AI Integration",
      description: "Advanced AI models integrated for improved speech recognition and object detection.",
    },
    {
      year: "2025",
      title: "Public Launch",
      description: "Official launch of EchoLens platform with full feature set.",
    },
  ]

  return (
    <>
      <HyperspeedBackground />
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">
            <GlitchText text="About" /> <GlitchText text="EchoLens" className="text-primary" />
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering visually impaired users with cutting-edge AI technology for enhanced environmental awareness and
            communication.
          </p>
        </header>

        {/* Timeline Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto">
            {timelineItems.map((item, index) => (
              <TimelineItem
                key={index}
                year={item.year}
                title={item.title}
                description={item.description}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Impact & Statistics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Counter end={10000} label="Users Helped" icon={Users} />
            <Counter end={98} label="% Transcription Accuracy" icon={Mic} />
            <Counter end={95} label="% Object Detection Accuracy" icon={Eye} />
            <Counter end={24} label="Hour Support" icon={Clock} />
          </div>
        </section>

        {/* Mission, Vision, Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Foundation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FloatingCard
              title="Mission"
              icon={Target}
              description="To create accessible technology that empowers visually impaired individuals to navigate their world with confidence and independence."
              delay={0.1}
            />
            <FloatingCard
              title="Vision"
              icon={Eye}
              description="A world where visual impairment is no longer a barrier to full participation in society, education, and employment."
              delay={0.3}
            />
            <FloatingCard
              title="Values"
              icon={Award}
              description="Accessibility, innovation, empathy, and excellence in everything we create and provide to our users."
              delay={0.5}
            />
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card3D className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Mic className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Advanced Speech Recognition</h3>
                <p className="text-muted-foreground">
                  Our speech recognition system can identify multiple speakers, filter background noise, and transcribe
                  conversations with high accuracy in real-time.
                </p>
              </div>
            </Card3D>

            <Card3D className="p-6" glowColor="secondary">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Computer Vision</h3>
                <p className="text-muted-foreground">
                  Using state-of-the-art object detection algorithms, EchoLens can identify people, objects, text, and
                  even facial expressions in the user's environment.
                </p>
              </div>
            </Card3D>

            <Card3D className="p-6" glowColor="accent">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <Brain className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Contextual AI</h3>
                <p className="text-muted-foreground">
                  Our AI combines speech and visual data to provide meaningful context, helping users navigate
                  conversations and environments with confidence.
                </p>
              </div>
            </Card3D>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            EchoLens is developed by a passionate team of AI researchers, accessibility experts, and engineers dedicated
            to creating technology that makes a difference.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["AI Research", "Accessibility", "Engineering", "Design"].map((department, index) => (
              <Card3D key={index} className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center mb-4">
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{department}</h3>
                  <p className="text-muted-foreground">
                    Our {department.toLowerCase()} team ensures EchoLens delivers the best possible experience for all
                    users.
                  </p>
                </div>
              </Card3D>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
