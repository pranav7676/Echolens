"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Mic, Camera, Calendar, Clock, ChevronDown, ChevronUp } from "lucide-react"
import { Card3D } from "@/components/card-3d"
import { HyperspeedBackground } from "@/components/hyperspeed-background"
import { GlitchText } from "@/components/glitch-text"
import { Button } from "@/components/ui/button"

interface HistoryItem {
  id: number
  date: Date
  duration: string
  hasAudio: boolean
  hasVideo: boolean
  summary: string
  transcript: string
}

// Generate mock history data
const generateMockData = (): HistoryItem[] => {
  const data: HistoryItem[] = []
  const now = new Date()

  for (let i = 0; i < 20; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    data.push({
      id: i + 1,
      date,
      duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`,
      hasAudio: Math.random() > 0.2,
      hasVideo: Math.random() > 0.3,
      summary: [
        "Detected 3 people and furniture in a living room setting.",
        "Identified street signs and pedestrians while walking outdoors.",
        "Transcribed conversation with 2 speakers in a coffee shop.",
        "Detected objects in a kitchen environment.",
        "Analyzed text from documents and signage.",
      ][Math.floor(Math.random() * 5)],
      transcript:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    })
  }

  return data
}

export default function History() {
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([])
  const [expandedItem, setExpandedItem] = useState<number | null>(null)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const observerTarget = useRef(null)

  // Load initial data
  useEffect(() => {
    setHistoryItems(generateMockData())
  }, [])

  // Infinite scroll implementation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page < 5) {
          loadMoreItems()
        }
      },
      { threshold: 1.0 },
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loading, page])

  const loadMoreItems = () => {
    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const newItems = generateMockData().map((item) => ({
        ...item,
        id: item.id + historyItems.length,
      }))

      setHistoryItems((prev) => [...prev, ...newItems])
      setPage((prev) => prev + 1)
      setLoading(false)
    }, 1000)
  }

  const toggleExpand = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      <HyperspeedBackground />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <GlitchText text="History" />
          </h1>
          <p className="text-muted-foreground">Your past EchoLens sessions</p>
        </header>

        <div className="space-y-4">
          {historyItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card3D className="p-4">
                <div className="flex flex-col">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleExpand(item.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="text-xs text-muted-foreground mt-1">
                          {formatDate(item.date).split(" ")[1]}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-medium">{formatDate(item.date)}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>{item.duration}</span>
                          {item.hasAudio && <Mic className="w-3 h-3 text-primary" />}
                          {item.hasVideo && <Camera className="w-3 h-3 text-secondary" />}
                        </div>
                      </div>
                    </div>

                    <Button variant="ghost" size="sm" className="p-0 h-8 w-8">
                      {expandedItem === item.id ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </Button>
                  </div>

                  {expandedItem === item.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-primary/10"
                    >
                      <div className="mb-3">
                        <h4 className="text-sm font-medium mb-1">AI Summary</h4>
                        <p className="text-sm text-muted-foreground">{item.summary}</p>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-1">Transcript</h4>
                        <p className="text-sm text-muted-foreground">{item.transcript}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </Card3D>
            </motion.div>
          ))}

          {/* Loading indicator and observer target */}
          <div ref={observerTarget} className="py-4 text-center">
            {loading && (
              <div className="flex justify-center items-center gap-2">
                <div className="w-5 h-5 rounded-full border-2 border-t-primary border-r-secondary border-b-accent border-l-transparent animate-spin" />
                <span className="text-sm text-muted-foreground">Loading more...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
