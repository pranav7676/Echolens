"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "./sidebar-provider"
import { cn } from "@/lib/utils"
import {
  Home,
  Info,
  LayoutDashboard,
  MessageSquare,
  History,
  Settings,
  Contact,
  HelpCircle,
  Accessibility,
  User,
  Mic,
} from "lucide-react"

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "AI Assistant", href: "/assistant", icon: MessageSquare },
  { name: "History", href: "/history", icon: History },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Contact", href: "/contact", icon: Contact },
  { name: "Support", href: "/support", icon: HelpCircle },
  { name: "Accessibility", href: "/accessibility", icon: Accessibility },
  { name: "Profile", href: "/profile", icon: User },
]

export function AppSidebar() {
  const { isOpen, toggle, isMobile } = useSidebar()
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      {(isOpen || !isMobile) && (
        <motion.aside
          initial={{ x: isMobile ? -300 : 0, opacity: isMobile ? 0 : 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-primary/20",
            "flex flex-col glassmorphism md:relative",
          )}
        >
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-border">
              <Mic className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-full animate-pulse-glow opacity-50"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-primary glow-text">Echo</span>
                <span className="text-white">Lens</span>
              </h1>
              <p className="text-xs text-muted-foreground">AI Assistive Technology</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link key={item.name} href={item.href} onClick={isMobile ? toggle : undefined}>
                  <motion.div
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                      "hover:bg-primary/10 group relative overflow-hidden",
                      isActive ? "bg-primary/20 glow-border" : "",
                    )}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-primary/10 z-0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
                    />

                    <item.icon
                      className={cn(
                        "w-5 h-5 z-10",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                      )}
                    />

                    <span
                      className={cn(
                        "text-sm font-medium z-10",
                        isActive ? "text-white" : "text-muted-foreground group-hover:text-white",
                      )}
                    >
                      {item.name}
                    </span>

                    {isActive && (
                      <motion.div
                        className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary"
                        layoutId="activeNavIndicator"
                      />
                    )}
                  </motion.div>
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-primary/10">
            <div className="text-xs text-center text-muted-foreground">
              <p>© 2025 EchoLens</p>
              <p className="mt-1">AI Assistive Technology</p>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}
