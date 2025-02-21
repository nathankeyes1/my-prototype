"use client"

import * as React from "react"
import { Home, Users, Send, Settings } from "lucide-react"
import { cn } from "../../lib/utils"
import { useRouter, usePathname } from "next/navigation"

const NavItem = ({ icon, label, isActive, onClick }: {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick: () => void
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex flex-col items-center justify-center flex-1 py-2 px-4",
      isActive ? "text-primary" : "text-muted-foreground"
    )}
  >
    {icon}
    <span className="mt-1 text-xs">{label}</span>
  </button>
)

export function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()

  const navigate = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-4 left-4 right-4">
      <nav className="mx-auto max-w-md bg-background rounded-full border shadow-lg">
        <div className="flex justify-between px-2 py-1">
          <NavItem
            icon={<Home size={24} />}
            label="Home"
            isActive={pathname === "/"}
            onClick={() => navigate("/")}
          />
          <NavItem
            icon={<Users size={24} />}
            label="Recipients"
            isActive={pathname === "/recipients"}
            onClick={() => navigate("/recipients")}
          />
          <NavItem
            icon={<Send size={24} />}
            label="Send"
            isActive={pathname === "/calculator"}
            onClick={() => navigate("/calculator")}
          />
          <NavItem
            icon={<Settings size={24} />}
            label="Manage"
            isActive={pathname === "/manage"}
            onClick={() => navigate("/manage")}
          />
        </div>
      </nav>
    </div>
  )
} 