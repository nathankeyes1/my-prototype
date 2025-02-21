"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Info, 
  Building,
  CreditCard,
  Landmark
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Suspense } from "react"
import { Calculator } from "@/components/calculator"

const DELIVERY_METHODS = [
  {
    id: "bank",
    title: "Bank Transfer",
    description: "Direct to their bank account",
    icon: Landmark,
    eta: "1-2 business days"
  },
  {
    id: "cash",
    title: "Cash Pickup",
    description: "Collect at 15,000+ locations",
    icon: Building,
    eta: "Ready in minutes"
  }
]

const PAYMENT_METHODS = [
  {
    id: "debit",
    title: "Debit Card",
    description: "Instant transfer",
    icon: CreditCard,
    fee: "0.99"
  },
  {
    id: "bank",
    title: "Bank Transfer",
    description: "2-3 business days",
    icon: Landmark,
    fee: "0"
  }
]

function CalculatorPage() {
  const searchParams = useSearchParams()
  const amount = searchParams.get('amount')

  return (
    <main className="min-h-screen p-4 max-w-xl mx-auto">
      <Calculator initialAmount={amount ? parseInt(amount) : undefined} />
    </main>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CalculatorPage />
    </Suspense>
  )
} 