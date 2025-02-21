"use client"

import { BottomNav } from "../components/ui/bottom-nav"
import { PromoBoost } from "../components/promo-boost"
import { useState } from "react"

export default function Home() {
  const [activeTab] = useState("home")

  return (
    <main className="flex min-h-screen flex-col items-center bg-background pb-16">
      {/* Main Content */}
      <div className="w-full max-w-md p-6">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p className="text-muted-foreground">Start sending money globally</p>
          </div>

          {/* Promo Boost Widget */}
          <PromoBoost />

          {/* Recent Activity or other content */}
          <div className="rounded-lg border p-4">
            <h2 className="font-medium mb-2">Recent Activity</h2>
            <p className="text-sm text-muted-foreground">No recent transactions</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} />
    </main>
  )
}
