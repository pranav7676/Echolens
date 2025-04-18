import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/components/sidebar-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarTrigger } from "@/components/sidebar-trigger"
import { CustomCursor } from "@/components/custom-cursor"
import { PageTransition } from "@/components/page-transition"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EchoLens - AI Assistive Technology",
  description: "Real-time speech transcription and object detection for visually impaired users",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white overflow-x-hidden custom-cursor`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <SidebarProvider>
            <CustomCursor />
            <div className="flex min-h-screen">
              <AppSidebar />
              <main className="flex-1 relative">
                <div className="fixed top-4 left-4 z-50 md:hidden">
                  <SidebarTrigger />
                </div>
                <PageTransition>
                  <div className="p-4 md:p-8">{children}</div>
                </PageTransition>
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'