"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSidebar } from "./sidebar-provider"

export function SidebarTrigger() {
  const { toggle } = useSidebar()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      className="bg-black/50 border-primary/50 hover:bg-primary/20 hover:border-primary transition-all duration-300"
    >
      <Menu className="h-5 w-5 text-primary" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}
