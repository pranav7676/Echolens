"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, ChevronDown, ChevronUp, MessageSquare, X, Send } from "lucide-react"
import { Card3D } from "@/components/card-3d"
import { HyperspeedBackground } from "@/components/hyperspeed-background"
import { GlitchText } from "@/components/glitch-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TypewriterText } from "@/components/typewriter-text"

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function Support() {
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<{ text: string; sender: "user" | "ai" }[]>([
    { text: "Hi there! How can I help you with EchoLens today?", sender: "ai" },
  ])
  const [messageInput, setMessageInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  // FAQ data
  const faqItems: FAQItem[] = [
    {
      question: "How do I start using EchoLens?",
      answer:
        "To start using EchoLens, navigate to the Dashboard page and click the microphone button to enable speech transcription or the camera button to enable object detection. You can use both features simultaneously for a complete assistive experience.",
      category: "Getting Started",
    },
    {
      question: "What devices are compatible with EchoLens?",
      answer:
        "EchoLens works on most modern devices including smartphones, tablets, laptops, and desktop computers. For the best experience, we recommend using a device with a good quality camera and microphone. You can check device compatibility in the Settings page.",
      category: "Compatibility",
    },
    {
      question: "How accurate is the speech transcription?",
      answer:
        "EchoLens uses state-of-the-art AI models for speech transcription with approximately 95% accuracy for clear audio in English. Accuracy may vary based on factors like background noise, accent, and speech clarity. We're continuously improving our models to enhance accuracy.",
      category: "Features",
    },
    {
      question: "Can EchoLens work offline?",
      answer:
        "Currently, EchoLens requires an internet connection to process speech transcription and object detection as these features rely on cloud-based AI models. We're working on developing lightweight offline models for basic functionality in future updates.",
      category: "Connectivity",
    },
    {
      question: "How is my data handled and stored?",
      answer:
        "We take privacy seriously. Audio and video data is processed in real-time and is not stored on our servers unless you explicitly save it to your history. All data transmission is encrypted, and you can delete your history at any time from the Settings page.",
      category: "Privacy",
    },
    {
      question: "How do I customize accessibility settings?",
      answer:
        "You can customize accessibility settings by navigating to the Accessibility page. There, you'll find options for text size, contrast modes, voice commands, and other features designed to enhance your experience based on your specific needs.",
      category: "Accessibility",
    },
    {
      question: "Is EchoLens available in languages other than English?",
      answer:
        "Currently, EchoLens supports English, Spanish, French, German, and Japanese for speech transcription. Object detection works regardless of language. We're actively working on adding support for more languages in future updates.",
      category: "Languages",
    },
    {
      question: "How do I report issues or bugs?",
      answer:
        "You can report issues or bugs through the Contact page or by sending an email to support@echolens.tech. Please include as much detail as possible, including your device type, browser, and steps to reproduce the issue.",
      category: "Support",
    },
  ]

  // Filter FAQ items based on search query
  const filteredFAQs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Toggle FAQ item expansion
  const toggleItem = (index: number) => {
    setExpandedItem(expandedItem === index ? null : index)
  }

  // Handle chat message submission
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!messageInput.trim()) return

    // Add user message
    setChatMessages((prev) => [...prev, { text: messageInput, sender: "user" }])
    setMessageInput("")

    // Simulate AI typing
    setIsTyping(true)

    // Generate AI response based on user input
    setTimeout(() => {
      let response = "I'm not sure how to help with that. Could you provide more details?"

      // Simple keyword matching for demo purposes
      const input = messageInput.toLowerCase()
      if (input.includes("transcription") || input.includes("speech")) {
        response =
          "Speech transcription can be accessed from the Dashboard. Click the microphone button to start recording and your speech will be transcribed in real-time."
      } else if (input.includes("object") || input.includes("detection") || input.includes("camera")) {
        response =
          "Object detection is available on the Dashboard. Click the camera button to activate your device's camera and EchoLens will identify objects in view."
      } else if (input.includes("account") || input.includes("profile")) {
        response =
          "You can manage your account settings in the Profile page, including personal information and preferences."
      } else if (input.includes("help") || input.includes("support")) {
        response =
          "For additional support, you can browse our FAQ section, contact us through the Contact page, or email support@echolens.tech."
      }

      setChatMessages((prev) => [...prev, { text: response, sender: "ai" }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <>
      <HyperspeedBackground />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <GlitchText text="Support" />
          </h1>
          <p className="text-muted-foreground">Find answers to common questions and get help</p>
        </header>

        {/* Search Bar */}
        <Card3D className="p-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search for help topics..."
              className="pl-10 bg-black/30 border-primary/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card3D>

        {/* FAQ Section */}
        <div className="space-y-4 mb-16">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>

          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card3D className="p-4">
                  <div className="flex flex-col">
                    <button
                      className="flex items-center justify-between text-left"
                      onClick={() => toggleItem(index)}
                      aria-expanded={expandedItem === index}
                    >
                      <div>
                        <span className="text-xs text-primary mb-1 block">{item.category}</span>
                        <h3 className="font-medium">{item.question}</h3>
                      </div>
                      {expandedItem === index ? (
                        <ChevronUp className="h-5 w-5 flex-shrink-0 text-primary" />
                      ) : (
                        <ChevronDown className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      )}
                    </button>

                    {expandedItem === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-primary/10"
                      >
                        <p className="text-muted-foreground">{item.answer}</p>
                      </motion.div>
                    )}
                  </div>
                </Card3D>
              </motion.div>
            ))
          ) : (
            <Card3D className="p-6 text-center">
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              <p className="mt-2 text-sm">Try different keywords or browse the categories below</p>
            </Card3D>
          )}
        </div>

        {/* Categories Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Getting Started",
              "Features",
              "Accessibility",
              "Privacy",
              "Connectivity",
              "Languages",
              "Compatibility",
              "Support",
            ].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 border-primary/30 hover:bg-primary/20"
                  onClick={() => setSearchQuery(category)}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Still Need Help Section */}
        <Card3D className="p-6 text-center" glowColor="accent">
          <h2 className="text-xl font-semibold mb-4">Still Need Help?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is ready to assist you with any questions or issues you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="/contact">Contact Support</a>
            </Button>
            <Button variant="outline" className="border-accent/30 hover:bg-accent/20">
              View Documentation
            </Button>
          </div>
        </Card3D>

        {/* AI Chat Assistant */}
        <motion.div
          className={`fixed bottom-6 right-6 z-50 ${isChatOpen ? "w-80 h-96" : "w-auto h-auto"}`}
          initial={false}
          animate={isChatOpen ? { width: 320, height: 400 } : { width: "auto", height: "auto" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {isChatOpen ? (
            <Card3D className="p-4 h-full flex flex-col" glowColor="secondary">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2 text-secondary" /> AI Assistant
                </h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsChatOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-2 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-primary/20 text-white"
                          : "bg-black/40 text-white border border-secondary/30"
                      }`}
                    >
                      {index === chatMessages.length - 1 && msg.sender === "ai" ? (
                        <TypewriterText text={msg.text} delay={20} className="text-sm" />
                      ) : (
                        <p className="text-sm">{msg.text}</p>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-black/40 p-2 rounded-lg border border-secondary/30">
                      <div className="typing-dots flex space-x-1">
                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                        <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Ask a question..."
                  className="flex-1 bg-black/30 border-secondary/30"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <Button type="submit" size="icon" className="bg-secondary hover:bg-secondary/80">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </Card3D>
          ) : (
            <Button
              onClick={() => setIsChatOpen(true)}
              className="rounded-full h-14 w-14 bg-secondary hover:bg-secondary/80 shadow-lg"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          )}
        </motion.div>
      </div>
    </>
  )
}
