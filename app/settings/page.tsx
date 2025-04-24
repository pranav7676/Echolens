"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Volume2, VolumeX, Type, Monitor, Smartphone } from "lucide-react"
import { Card3D } from "@/components/card-3d"
import { HyperspeedBackground } from "@/components/hyperspeed-background"
import { GlitchText } from "@/components/glitch-text"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"

export default function Settings() {
  const { theme } = useTheme()
  const [aiVoice, setAiVoice] = useState(true)
  const [fontSize, setFontSize] = useState(16)
  const [deviceType, setDeviceType] = useState("desktop")

  return (
    <>
      <HyperspeedBackground />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <GlitchText text="Settings" />
          </h1>
          <p className="text-muted-foreground">Customize your EchoLens experience</p>
        </header>

        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="appearance" className="data-[state=active]:bg-primary/20">
              <Monitor className="w-4 h-4 mr-2" /> Appearance
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="data-[state=active]:bg-primary/20">
              <Type className="w-4 h-4 mr-2" /> Accessibility
            </TabsTrigger>
            <TabsTrigger value="devices" className="data-[state=active]:bg-primary/20">
              <Smartphone className="w-4 h-4 mr-2" /> Devices
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card3D className="p-6">
                <h2 className="text-xl font-semibold mb-6">Appearance Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="theme">Theme</Label>
                      <div className="text-sm text-muted-foreground">Choose between light and dark mode</div>
                    </div>
                    <ThemeToggle />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="animations">Animations</Label>
                      <div className="text-sm text-muted-foreground">Enable or disable UI animations</div>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="background">3D Background</Label>
                      <div className="text-sm text-muted-foreground">Enable or disable the hyperspeed background</div>
                    </div>
                    <Switch id="background" defaultChecked />
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </TabsContent>

          <TabsContent value="accessibility">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card3D className="p-6">
                <h2 className="text-xl font-semibold mb-6">Accessibility Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="ai-voice">AI Voice</Label>
                      <div className="text-sm text-muted-foreground">Enable or disable AI voice feedback</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={aiVoice ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAiVoice(true)}
                        className={aiVoice ? "bg-primary" : ""}
                      >
                        <Volume2 className="w-4 h-4 mr-2" /> On
                      </Button>
                      <Button
                        variant={!aiVoice ? "default" : "outline"}
                        size="sm"
                        onClick={() => setAiVoice(false)}
                        className={!aiVoice ? "bg-primary" : ""}
                      >
                        <VolumeX className="w-4 h-4 mr-2" /> Off
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                      <span className="text-sm text-muted-foreground">{fontSize}px</span>
                    </div>
                    <Slider
                      id="font-size"
                      min={12}
                      max={24}
                      step={1}
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="high-contrast">High Contrast</Label>
                      <div className="text-sm text-muted-foreground">Increase contrast for better visibility</div>
                    </div>
                    <Switch id="high-contrast" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="reduce-motion">Reduce Motion</Label>
                      <div className="text-sm text-muted-foreground">Minimize animations and motion effects</div>
                    </div>
                    <Switch id="reduce-motion" />
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </TabsContent>

          <TabsContent value="devices">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card3D className="p-6">
                <h2 className="text-xl font-semibold mb-6">Device Settings</h2>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="device-type">Device Type</Label>
                    <Select value={deviceType} onValueChange={setDeviceType}>
                      <SelectTrigger id="device-type" className="w-full">
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="desktop">Desktop</SelectItem>
                        <SelectItem value="laptop">Laptop</SelectItem>
                        <SelectItem value="tablet">Tablet</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="camera">Camera</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="camera" className="w-full">
                        <SelectValue placeholder="Select camera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Camera</SelectItem>
                        <SelectItem value="front">Front Camera</SelectItem>
                        <SelectItem value="back">Back Camera</SelectItem>
                        <SelectItem value="external">External Camera</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="microphone">Microphone</Label>
                    <Select defaultValue="default">
                      <SelectTrigger id="microphone" className="w-full">
                        <SelectValue placeholder="Select microphone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default Microphone</SelectItem>
                        <SelectItem value="headset">Headset Microphone</SelectItem>
                        <SelectItem value="external">External Microphone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="auto-connect">Auto-Connect Devices</Label>
                      <div className="text-sm text-muted-foreground">Automatically connect to saved devices</div>
                    </div>
                    <Switch id="auto-connect" defaultChecked />
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* Save Settings Button */}
        <div className="mt-8 flex justify-center">
          <Button className="bg-primary hover:bg-primary/80 px-8">Save Settings</Button>
        </div>
      </div>
    </>
  )
}
