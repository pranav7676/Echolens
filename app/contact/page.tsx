"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Mail, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card3D } from "@/components/card-3d"
import { HyperspeedBackground } from "@/components/hyperspeed-background"
import { GlitchText } from "@/components/glitch-text"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isFocused, setIsFocused] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleFocus = (field: string) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }))
  }

  const handleBlur = (field: string) => {
    if (!formState[field as keyof typeof formState]) {
      setIsFocused((prev) => ({ ...prev, [field]: false }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsFocused({
        name: false,
        email: false,
        subject: false,
        message: false,
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <>
      <HyperspeedBackground />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <GlitchText text="Contact Us" />
          </h1>
          <p className="text-muted-foreground">Get in touch with the EchoLens team</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card3D className="p-6">
            <h2 className="text-xl font-semibold mb-6">Send us a message</h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-primary/20 p-4 rounded-lg border border-primary/30 text-center"
              >
                <p className="font-medium mb-2">Thank you for your message!</p>
                <p className="text-sm text-muted-foreground">We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={() => handleBlur("name")}
                    className="w-full bg-black/30 border border-primary/30 rounded-lg p-3 pl-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="name"
                    className={`floating-label absolute left-10 text-muted-foreground transition-all ${
                      isFocused.name ? "transform -translate-y-5 text-xs text-primary" : "top-3"
                    }`}
                  >
                    Your Name
                  </label>
                  <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    className="w-full bg-black/30 border border-primary/30 rounded-lg p-3 pl-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="email"
                    className={`floating-label absolute left-10 text-muted-foreground transition-all ${
                      isFocused.email ? "transform -translate-y-5 text-xs text-primary" : "top-3"
                    }`}
                  >
                    Email Address
                  </label>
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus("subject")}
                    onBlur={() => handleBlur("subject")}
                    className="w-full bg-black/30 border border-primary/30 rounded-lg p-3 pl-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder=" "
                    required
                  />
                  <label
                    htmlFor="subject"
                    className={`floating-label absolute left-10 text-muted-foreground transition-all ${
                      isFocused.subject ? "transform -translate-y-5 text-xs text-primary" : "top-3"
                    }`}
                  >
                    Subject
                  </label>
                  <MessageSquare className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus("message")}
                    onBlur={() => handleBlur("message")}
                    rows={5}
                    className="w-full bg-black/30 border border-primary/30 rounded-lg p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    placeholder=" "
                    required
                  ></textarea>
                  <label
                    htmlFor="message"
                    className={`floating-label absolute left-3 text-muted-foreground transition-all ${
                      isFocused.message ? "transform -translate-y-5 text-xs text-primary" : "top-3"
                    }`}
                  >
                    Your Message
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/80 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card3D>

          <div className="space-y-6">
            <Card3D className="p-6" glowColor="secondary">
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                    <Mail className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">support@echolens.tech</p>
                    <p className="text-muted-foreground">info@echolens.tech</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                    <MessageSquare className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-muted-foreground">Available Monday to Friday</p>
                    <p className="text-muted-foreground">9:00 AM - 5:00 PM EST</p>
                  </div>
                </div>
              </div>
            </Card3D>

            <Card3D className="p-6" glowColor="accent">
              <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
              <div className="flex gap-4">
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </>
  )
}
