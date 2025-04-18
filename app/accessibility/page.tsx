"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, Volume2, Mic, ZoomIn, Type, MousePointer, Keyboard } from "lucide-react"
import { Card3D } from "@/components/card-3d"
import { HyperspeedBackground } from "@/components/hyperspeed-background"
import { GlitchText } from "@/components/glitch-text"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export default function Accessibility() {
  const [contrastMode, setContrastMode] = useState("normal")
  const [textToSpeech, setTextToSpeech] = useState(false)
  const [voiceCommands, setVoiceCommands] = useState(false)
  const [magnification, setMagnification] = useState(100)

  // Voice command hints
  const voiceCommandHints = [
    { command: "Navigate to Home", action: "Opens the Home page" },
    { command: "Open Dashboard", action: "Opens the Dashboard page" },
    { command: "Start recording", action: "Activates audio recording" },
    { command: "Enable camera", action: "Activates video recording" },
    { command: "Increase font size", action: "Makes text larger" },
    { command: "Decrease font size", action: "Makes text smaller" },
    { command: "High contrast mode", action: "Toggles high contrast" },
    { command: "Read page", action: "Reads the current page content" },
  ]

  return (
    <>
      <HyperspeedBackground />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <GlitchText text="Accessibility Tools" />
          </h1>
          <p className="text-muted-foreground">Customize your experience for better accessibility</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Visual Settings */}
          <Card3D className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Eye className="mr-2 h-5 w-5 text-primary" /> Visual Settings
            </h2>

            <div className="space-y-6">
              {/* Contrast Mode */}
              <div className="space-y-3">
                <Label>Contrast Mode</Label>
                <div className="flex gap-3">
                  <Button
                    variant={contrastMode === "normal" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContrastMode("normal")}
                    className={contrastMode === "normal" ? "bg-primary" : ""}
                  >
                    Normal
                  </Button>
                  <Button
                    variant={contrastMode === "high" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContrastMode("high")}
                    className={contrastMode === "high" ? "bg-primary" : ""}
                  >
                    High Contrast
                  </Button>
                  <Button
                    variant={contrastMode === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setContrastMode("dark")}
                    className={contrastMode === "dark" ? "bg-primary" : ""}
                  >
                    Dark
                  </Button>
                </div>
              </div>

              {/* Magnifier */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="magnification">Magnification: {magnification}%</Label>
                  <span className="text-sm text-muted-foreground">{magnification}%</span>
                </div>
                <Slider
                  id="magnification"
                  min={100}
                  max={200}
                  step={10}
                  value={[magnification]}
                  onValueChange={(value) => setMagnification(value[0])}
                />
              </div>

              {/* Magnifier Preview */}
              <div className="mt-4 border border-primary/30 rounded-lg p-4 relative overflow-hidden">
                <h3 className="text-center mb-2">Magnifier Preview</h3>
                <div
                  className="bg-black/20 p-4 rounded-lg text-center"
                  style={{ fontSize: `${magnification / 100}rem` }}
                >
                  Sample text with magnification applied
                </div>
                <div className="absolute top-2 right-2">
                  <ZoomIn className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
          </Card3D>

          {/* Audio Settings */}
          <Card3D className="p-6" glowColor="secondary">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Volume2 className="mr-2 h-5 w-5 text-secondary" /> Audio Settings
            </h2>

            <div className="space-y-6">
              {/* Text-to-Speech */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="text-to-speech">Text-to-Speech</Label>
                  <p className="text-sm text-muted-foreground">Read on-screen text aloud</p>
                </div>
                <Switch id="text-to-speech" checked={textToSpeech} onCheckedChange={setTextToSpeech} />
              </div>

              {/* Voice Commands */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="voice-commands">Voice Commands</Label>
                  <p className="text-sm text-muted-foreground">Control the app with your voice</p>
                </div>
                <Switch id="voice-commands" checked={voiceCommands} onCheckedChange={setVoiceCommands} />
              </div>

              {/* Voice Speed */}
              <div className="space-y-3">
                <Label htmlFor="voice-speed">Voice Speed</Label>
                <Slider id="voice-speed" min={0.5} max={2} step={0.1} defaultValue={[1]} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Slower</span>
                  <span>Normal</span>
                  <span>Faster</span>
                </div>
              </div>

              {/* Test Button */}
              <Button
                variant="outline"
                className="w-full border-secondary/50 hover:bg-secondary/20"
                disabled={!textToSpeech}
              >
                <Volume2 className="mr-2 h-4 w-4" /> Test Text-to-Speech
              </Button>
            </div>
          </Card3D>

          {/* Voice Commands */}
          <Card3D className="p-6" glowColor="accent">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Mic className="mr-2 h-5 w-5 text-accent" /> Voice Command Hints
            </h2>

            <div className="space-y-4">
              {voiceCommandHints.map((cmd, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between p-2 border-b border-accent/20 last:border-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center">
                    <span className="text-sm font-medium">"{cmd.command}"</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{cmd.action}</span>
                </motion.div>
              ))}

              <div className="mt-4 p-3 bg-black/30 rounded-lg border border-accent/30">
                <p className="text-sm text-center">
                  Say "Hey EchoLens" followed by any command to activate voice control
                </p>
              </div>
            </div>
          </Card3D>

          {/* Input Assistance */}
          <Card3D className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Keyboard className="mr-2 h-5 w-5 text-primary" /> Input Assistance
            </h2>

            <div className="space-y-6">
              {/* Keyboard Navigation */}
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="keyboard-nav">Enhanced Keyboard Navigation</Label>
                  <p className="text-sm text-muted-foreground">Improved focus indicators and shortcuts</p>
                </div>
                <Switch id="keyboard-nav" defaultChecked />
              </div>

              {/* Mouse Settings */}
              <div className="space-y-3">
                <Label>Pointer Settings</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="justify-start">
                    <MousePointer className="mr-2 h-4 w-4" /> Larger Cursor
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <Type className="mr-2 h-4 w-4" /> High Visibility
                  </Button>
                </div>
              </div>

              {/* Keyboard Shortcuts */}
              <div className="mt-4 space-y-2">
                <h3 className="text-sm font-medium">Keyboard Shortcuts</h3>
                <div className="bg-black/30 p-3 rounded-lg space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Alt + 1</span>
                    <span className="text-muted-foreground">Navigate to Home</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Alt + 2</span>
                    <span className="text-muted-foreground">Navigate to Dashboard</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Alt + M</span>
                    <span className="text-muted-foreground">Toggle Microphone</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Alt + C</span>
                    <span className="text-muted-foreground">Toggle Camera</span>
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Save Settings Button */}
        <div className="mt-8 flex justify-center">
          <Button className="bg-primary hover:bg-primary/80 px-8">Save Accessibility Settings</Button>
        </div>
      </div>
    </>
  )
}
