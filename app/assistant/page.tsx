"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card3D } from "@/components/card-3d"
import { HyperspeedBackground } from "@/components/hyperspeed-background"
import { GlitchText } from "@/components/glitch-text"
import { TypewriterText } from "@/components/typewriter-text"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your EchoLens AI assistant. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample AI responses
  const aiResponses = [
    "I can detect a table with a laptop and coffee mug in front of you.",
    "There appears to be a person approaching from your left side.",
    "The exit door is approximately 5 meters ahead of you.",
    "I've detected text on a sign that reads 'Restrooms this way'.",
    "The traffic light ahead has just turned green.",
    "I can see that you're currently in what appears to be a coffee shop.",
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI typing
    setIsTyping(true)

    // Add AI response after delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  // Toggle recording
  const toggleRecording = () => {
    setIsRecording(!isRecording)

    if (!isRecording) {
      // Simulate voice recognition
      setTimeout(() => {
        const recognizedText = "Can you help me find the nearest exit?"
        setInput(recognizedText)
        setIsRecording(false)
      }, 2000)
    }
  }

  return (
    <>
      <HyperspeedBackground />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <GlitchText text="AI Assistant" />
          </h1>
          <p className="text-muted-foreground">Your intelligent companion for navigation and assistance</p>
        </header>

        <Card3D className="p-4 h-[70vh] flex flex-col">
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto mb-4 pr-2">
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user" ? "bg-primary/20 text-white" : "bg-black/40 text-white glow-border"
                    }`}
                  >
                    {message.sender === "ai" && message.id === messages.length ? (
                      <TypewriterText text={message.text} delay={30} className="text-sm" />
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-black/40 p-3 rounded-lg glow-border">
                    <div className="typing-dots flex space-x-1">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input area */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="bg-black/30 border-primary/30 focus:border-primary"
              />
            </div>
            <Button
              type="button"
              variant={isRecording ? "default" : "outline"}
              size="icon"
              onClick={toggleRecording}
              className={isRecording ? "bg-primary" : "bg-black/30 border-primary/30"}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/80">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </Card3D>
      </div>
    </>
  )
}
