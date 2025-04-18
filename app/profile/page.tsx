"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Edit, Save, X, Bell, Shield, Download, Trash2, Camera } from "lucide-react"
import { Card3D } from "@/components/card-3d"
import { HyperspeedBackground } from "@/components/hyperspeed-background"
import { GlitchText } from "@/components/glitch-text"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Profile() {
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex@example.com",
    username: "alexj",
    bio: "Accessibility advocate and technology enthusiast. Using EchoLens to explore new ways of interacting with the world.",
  })
  const [formData, setFormData] = useState({ ...profileData })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setProfileData({ ...formData })
    setEditMode(false)
  }

  const handleCancel = () => {
    setFormData({ ...profileData })
    setEditMode(false)
  }

  return (
    <>
      <HyperspeedBackground />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <GlitchText text="Profile" />
          </h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </header>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="profile" className="data-[state=active]:bg-primary/20">
              <User className="w-4 h-4 mr-2" /> Profile
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-primary/20">
              <Bell className="w-4 h-4 mr-2" /> Preferences
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-primary/20">
              <Shield className="w-4 h-4 mr-2" /> Privacy & Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Profile Card */}
              <Card3D className="p-6 md:col-span-1">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center mb-4 glow-border">
                      <User className="w-16 h-16 text-white" />
                    </div>
                    <button className="absolute bottom-4 right-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <Camera className="w-4 h-4 text-white" />
                    </button>
                  </div>
                  <h2 className="text-xl font-bold">{profileData.name}</h2>
                  <p className="text-muted-foreground">@{profileData.username}</p>

                  <div className="mt-6 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Member since</span>
                      <span className="text-sm">January 2025</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last active</span>
                      <span className="text-sm">Today</span>
                    </div>
                  </div>
                </div>
              </Card3D>

              {/* Profile Details */}
              <Card3D className="p-6 md:col-span-2">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Profile Information</h2>
                  {!editMode ? (
                    <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="mr-2 h-4 w-4" /> Cancel
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="mr-2 h-4 w-4" /> Save
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {editMode ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-black/30 border-primary/30"
                      />
                    ) : (
                      <div className="p-2 bg-black/20 rounded-md">{profileData.name}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    {editMode ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-black/30 border-primary/30"
                      />
                    ) : (
                      <div className="p-2 bg-black/20 rounded-md flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                        {profileData.email}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    {editMode ? (
                      <Input
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-black/30 border-primary/30"
                      />
                    ) : (
                      <div className="p-2 bg-black/20 rounded-md">@{profileData.username}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {editMode ? (
                      <textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="w-full bg-black/30 border border-primary/30 rounded-lg p-3 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    ) : (
                      <div className="p-2 bg-black/20 rounded-md">{profileData.bio}</div>
                    )}
                  </div>
                </div>
              </Card3D>
            </div>
          </TabsContent>

          <TabsContent value="preferences">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card3D className="p-6">
                <h2 className="text-xl font-semibold mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive updates and alerts via email</p>
                    </div>
                    <Switch id="email-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                    </div>
                    <Switch id="push-notifications" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="sound-alerts">Sound Alerts</Label>
                      <p className="text-sm text-muted-foreground">Play sounds for important notifications</p>
                    </div>
                    <Switch id="sound-alerts" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="weekly-summary">Weekly Summary</Label>
                      <p className="text-sm text-muted-foreground">Receive a weekly usage report</p>
                    </div>
                    <Switch id="weekly-summary" defaultChecked />
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Application Preferences</h3>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="auto-start">Auto-start Recording</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically start recording when opening the dashboard
                        </p>
                      </div>
                      <Switch id="auto-start" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Label htmlFor="save-history">Save History</Label>
                        <p className="text-sm text-muted-foreground">Save transcriptions and detections to history</p>
                      </div>
                      <Switch id="save-history" defaultChecked />
                    </div>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </TabsContent>

          <TabsContent value="privacy">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card3D className="p-6">
                <h2 className="text-xl font-semibold mb-6">Privacy & Data</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="data-collection">Data Collection</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow anonymous usage data collection to improve EchoLens
                      </p>
                    </div>
                    <Switch id="data-collection" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label htmlFor="third-party">Third-party Integrations</Label>
                      <p className="text-sm text-muted-foreground">Allow integration with third-party services</p>
                    </div>
                    <Switch id="third-party" />
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-medium">Your Data</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <Download className="mr-2 h-4 w-4" /> Download Your Data
                    </Button>
                    <Button variant="outline" className="justify-start text-destructive hover:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                    </Button>
                  </div>

                  <div className="p-4 bg-black/30 rounded-lg mt-4">
                    <p className="text-sm text-muted-foreground">
                      Your data is encrypted and stored securely. We never share your personal information with third
                      parties without your explicit consent. See our{" "}
                      <a href="#" className="text-primary hover:underline">
                        Privacy Policy
                      </a>{" "}
                      for more details.
                    </p>
                  </div>
                </div>
              </Card3D>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
