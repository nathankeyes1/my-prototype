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

export default function Calculator() {
  const searchParams = useSearchParams()
  const [sendAmount, setSendAmount] = useState(searchParams.get("amount") || "100")
  const [deliveryMethod, setDeliveryMethod] = useState("bank")
  const [paymentMethod, setPaymentMethod] = useState("debit")
  const fxRate = 20.38
  const boostMultiplier = 1.1815

  const regularAmount = Number(sendAmount) * fxRate
  const boostedAmount = regularAmount * boostMultiplier
  const extraAmount = Math.round(boostedAmount - regularAmount)
  const fee = paymentMethod === "debit" ? 0.99 : 0

  return (
    <main className="min-h-screen p-4 max-w-xl mx-auto pt-8 pb-8">
      <Card className="p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Send money</h1>
          <p className="text-muted-foreground">Calculate your transfer</p>
        </div>

        {/* Calculator */}
        <div className="space-y-6">
          {/* Amount Exchange Section */}
          <div className="space-y-4 border rounded-lg p-4">
            {/* Send Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium">You send</label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="text-lg"
                />
                <Button variant="outline" className="w-24">USD</Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>Fee: ${fee}</span>
              </div>
            </div>

            {/* Conversion Rate */}
            <div className="bg-muted/50 p-3 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Exchange rate</span>
                <span className="font-medium">1 USD = {fxRate} MXN</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <span>First transfer boost</span>
                <span>+18.15%</span>
              </div>
            </div>

            {/* Receive Amount */}
            <div className="space-y-2">
              <label className="text-sm font-medium">They receive</label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  value={boostedAmount.toFixed(2)}
                  readOnly
                  className="text-lg bg-muted"
                />
                <Button variant="outline" className="w-24">MXN</Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600">
                <ArrowRight className="h-4 w-4" />
                <span>Extra {extraAmount} MXN with boost</span>
              </div>
            </div>
          </div>

          {/* Delivery Method Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium">How should they receive it?</label>
            <RadioGroup
              value={deliveryMethod}
              onValueChange={setDeliveryMethod}
              className="grid gap-4"
            >
              {DELIVERY_METHODS.map((method) => (
                <Label
                  key={method.id}
                  className={`flex items-center space-x-4 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${
                    deliveryMethod === method.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                  <method.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">{method.title}</div>
                    <div className="text-sm text-muted-foreground">{method.description}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{method.eta}</div>
                </Label>
              ))}
            </RadioGroup>
          </div>

          {/* Payment Method Section */}
          <div className="space-y-3">
            <label className="text-sm font-medium">How would you like to pay?</label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="grid gap-4"
            >
              {PAYMENT_METHODS.map((method) => (
                <Label
                  key={method.id}
                  className={`flex items-center space-x-4 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${
                    paymentMethod === method.id ? "border-primary bg-primary/5" : ""
                  }`}
                >
                  <RadioGroupItem value={method.id} id={method.id} className="sr-only" />
                  <method.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <div className="font-medium">{method.title}</div>
                    <div className="text-sm text-muted-foreground">{method.description}</div>
                  </div>
                  <div className="text-sm">
                    {method.fee === "0" ? "Free" : `$${method.fee}`}
                  </div>
                </Label>
              ))}
            </RadioGroup>
          </div>
        </div>

        {/* Continue Button */}
        <Button 
          className="w-full bg-[#2C3A4B] hover:bg-[#2C3A4B]/90 text-white py-6"
          onClick={() => console.log("Continue to recipient details")}
        >
          Continue
        </Button>
      </Card>
    </main>
  )
} 