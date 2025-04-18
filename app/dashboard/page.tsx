"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Mic, MicOff, Camera, CameraOff, Play, Pause, Eye, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HyperspeedBackground } from "@/components/hyperspeed-background"
import { GlitchText } from "@/components/glitch-text"
import { TypewriterText } from "@/components/typewriter-text"
import { Card3D } from "@/components/card-3d"
import { AudioWaveform } from "@/components/audio-waveform"
import fs from "fs";
import Groq from "groq-sdk";

export default function Dashboard() {
  const [isAudioActive, setIsAudioActive] = useState(false)
  const [isVideoActive, setIsVideoActive] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcription, setTranscription] = useState<string[]>([])
  const [detectedObjects, setDetectedObjects] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const groq = new Groq();

async function main() {
  // Create a transcription job
  const transcription = await groq.audio.transcriptions.create({
    file: fs.createReadStream("YOUR_AUDIO.wav"), // Required path to audio file - replace with your audio file!
    model: "whisper-large-v3-turbo", // Required model to use for transcription
    prompt: "Specify context or spelling", // Optional
    response_format: "verbose_json", // Optional
    timestamp_granularities: ["word", "segment"], // Optional (must set response_format to "json" to use and can specify "word", "segment" (default), or both)
    language: "en", // Optional
    temperature: 0.0, // Optional
  });
  // To print only the transcription text, you'd use console.log(transcription.text); (here we're printing the entire transcription object to access timestamps)
  console.log(JSON.stringify(transcription, null, 2));
}
main();


  // Simulated transcription data
  const simulatedTranscriptions = [
    "Hello, can you help me identify what's in front of me?",
    "I'm trying to find my way to the kitchen.",
    "Is there anyone else in the room with me?",
    "What time is it currently?",
  ]

  // Simulated object detection data
  const simulatedObjects = [
    "Person (confidence: 98%)",
    "Chair (confidence: 95%)",
    "Table (confidence: 92%)",
    "Laptop (confidence: 90%)",
    "Coffee mug (confidence: 85%)",
  ]

  // Simulated AI feedback
  const simulatedFeedback =
    "I detect a person sitting approximately 2 meters in front of you. There's a table with a laptop and coffee mug to your right. The kitchen appears to be through the doorway on your left."

  // Toggle audio recording
  const toggleAudio = async () => {
    setIsAudioActive(!isAudioActive);
  
    if (!isAudioActive && !isProcessing && audioFile) {
      setIsProcessing(true);
      setTranscription([]);
      setIsLoading(true);
  
      try {
        // Simulated transcription logic
        const simulatedTranscription = simulatedTranscriptions[Math.floor(Math.random() * simulatedTranscriptions.length)];
        setTranscription((prev) => [...prev, simulatedTranscription]);
      } catch (error) {
        console.error("Error during transcription:", error);
      } finally {
        setIsLoading(false);
        setIsProcessing(false);
      }
    } else {
      console.error("No audio file selected");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAudioFile(event.target.files[0]);
    }
  };

  // Toggle video recording
  const toggleVideo = () => {
    setIsVideoActive(!isVideoActive)

    if (!isVideoActive && !isProcessing) {
      // Simulate starting object detection
      setIsProcessing(true)
      setDetectedObjects([])

      let index = 0
      const interval = setInterval(() => {
        if (index < simulatedObjects.length) {
          setDetectedObjects((prev) => [...prev, simulatedObjects[index]])
          index++
        } else {
          clearInterval(interval)
        }
      }, 1000)
    }
  }

  // Draw detection boxes on canvas
  useEffect(() => {
    if (isVideoActive && canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        // Draw detection boxes
        detectedObjects.forEach((_, index) => {
          // Random position and size for demo
          const x = Math.random() * (canvas.width - 100)
          const y = Math.random() * (canvas.height - 100)
          const width = Math.random() * 100 + 50
          const height = Math.random() * 100 + 50

          // Draw box
          ctx.strokeStyle = index === 0 ? "#a855f7" : "#06b6d4"
          ctx.lineWidth = 2
          ctx.strokeRect(x, y, width, height)

          // Draw label
          ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
          ctx.fillRect(x, y - 20, 100, 20)
          ctx.fillStyle = index === 0 ? "#a855f7" : "#06b6d4"
          ctx.font = "12px Inter, sans-serif"
          ctx.fillText(detectedObjects[index].split(" ")[0], x + 5, y - 5)
        })
      }
    }
  }, [isVideoActive, detectedObjects])

  return (
    <>
      <HyperspeedBackground />

      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <GlitchText text="Dashboard" />
          </h1>
          <p className="text-muted-foreground">Real-time speech transcription and object detection</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Feed */}
          <Card3D className="lg:col-span-2 p-4 relative">
            <div className="aspect-video bg-black/50 rounded-lg overflow-hidden relative">
              {isVideoActive ? (
                <>
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    src="/placeholder.svg?height=720&width=1280"
                  />
                  <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" width={1280} height={720} />
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Camera feed inactive</p>
                </div>
              )}

              {/* Controls overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant={isAudioActive ? "default" : "outline"}
                    size="icon"
                    onClick={toggleAudio}
                    className={isAudioActive ? "bg-primary" : "bg-black/50 border-primary/50"}
                  >
                    {isAudioActive ? <MicOff /> : <Mic />}
                  </Button>

                  <Button
                    variant={isVideoActive ? "default" : "outline"}
                    size="icon"
                    onClick={toggleVideo}
                    className={isVideoActive ? "bg-secondary" : "bg-black/50 border-secondary/50"}
                  >
                    {isVideoActive ? <CameraOff /> : <Camera />}
                  </Button>
                </div>

                <Button variant="outline" size="icon" className="bg-black/50 border-accent/50">
                  {isProcessing ? <Pause /> : <Play />}
                </Button>
              </div>
            </div>

            {/* Audio Waveform */}
            <div className="mt-4 p-2 bg-black/30 rounded-lg">
              <AudioWaveform isActive={isAudioActive} />
            </div>
          </Card3D>

          {/* Sidebar with Transcription and Detection */}
          <div className="space-y-6">
            {/* Transcription */}
            <Card3D className="p-4">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Mic className="w-4 h-4 mr-2 text-primary" />
                Speech Transcription
              </h2>

              <div className="mb-4">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleFileChange}
                  className="file-input"
                />
              </div>

              <div className="h-40 overflow-y-auto space-y-2 mb-2">
                {isLoading ? (
                  <div className="p-2 rounded bg-black/30 text-sm shimmer h-full"></div>
                ) : transcription.length > 0 ? (
                  transcription.map((text, index) => (
                    <div key={index} className="p-2 rounded bg-black/30 text-sm">
                      {index === transcription.length - 1 ? (
                        <span className="fuzzy-text">
                          <TypewriterText text={text} delay={30} />
                        </span>
                      ) : (
                        <span className="fuzzy-text">{text}</span>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No transcription available. Click the microphone button to start.
                  </p>
                )}
              </div>
            </Card3D>

            {/* Object Detection */}
            <Card3D className="p-4" glowColor="secondary">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Eye className="w-4 h-4 mr-2 text-secondary" />
                Object Detection
              </h2>

              <div className="h-40 overflow-y-auto space-y-1 mb-2">
                {detectedObjects.length > 0 ? (
                  detectedObjects.map((object, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center p-2 rounded bg-black/30 text-sm"
                    >
                      <div className="w-2 h-2 rounded-full bg-secondary mr-2" />
                      {object}
                    </motion.div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No objects detected. Click the camera button to start.
                  </p>
                )}
              </div>
            </Card3D>

            {/* AI Feedback */}
            <Card3D className="p-4" glowColor="accent">
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <Brain className="w-4 h-4 mr-2 text-accent" />
                AI Feedback
              </h2>

              <div className="p-3 rounded bg-black/30">
                {isProcessing && transcription.length > 0 && detectedObjects.length > 0 ? (
                  <TypewriterText text={simulatedFeedback} delay={20} className="fuzzy-text" />
                ) : (
                  <p className="text-muted-foreground text-sm">
                    AI feedback will appear here once audio and video processing are active.
                  </p>
                )}
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </>
  )
}
