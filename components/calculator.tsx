"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  ArrowRight, 
  Info, 
  Building,
  CreditCard,
  Landmark,
  ArrowDown,
  ChevronDown,
  Wallet
} from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CurrencySelector, type Currency } from "./ui/currency-selector"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { type LucideIcon } from "lucide-react"

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

interface PaymentMethod {
  id: string
  title: string
  subtitle?: string
  description: string
  icon: LucideIcon
  fee: string
  isExisting?: boolean
}

const PAYMENT_METHODS: {
  existing: PaymentMethod[]
  other: PaymentMethod[]
} = {
  existing: [
    {
      id: "chase",
      title: "Chase",
      subtitle: "USD · CHASE SAVINGS",
      description: "Connected bank account",
      icon: Building,
      fee: "0",
      isExisting: true
    },
    {
      id: "rusd",
      title: "RUSD",
      subtitle: "Remitly Stablecoin",
      description: "Available balance: $25.00",
      icon: Wallet,
      fee: "0",
      isExisting: true
    },
    {
      id: "debit",
      title: "Debit Card",
      subtitle: "****4234",
      description: "Expires 12/25",
      icon: CreditCard,
      fee: "0.99",
      isExisting: true
    }
  ],
  other: [
    {
      id: "new-bank",
      title: "Connect new bank account",
      description: "Connect bank account to add money quickly",
      icon: Building,
      fee: "0"
    },
    {
      id: "bank-transfer",
      title: "Regular bank transfer",
      description: "Transfer from your other bank",
      icon: ArrowRight,
      fee: "0"
    },
    {
      id: "apple-pay",
      title: "Apple Pay",
      description: "Pay with Apple Pay",
      icon: CreditCard,
      fee: "0.99"
    },
    {
      id: "new-debit",
      title: "Add debit card",
      description: "Add a new debit card",
      icon: CreditCard,
      fee: "0.99"
    },
    {
      id: "cash",
      title: "Add cash",
      description: "At one of our 90k+ locations",
      icon: Building,
      fee: "0"
    },
    {
      id: "direct-deposit",
      title: "Direct deposit",
      description: "Get paid up to two days early",
      icon: Building,
      fee: "0"
    }
  ]
}

const RECOMMENDED_AMOUNTS = [100, 500, 1000, 2000]

export function Calculator({ initialAmount }: { initialAmount?: number }) {
  const [amount, setAmount] = useState(initialAmount || 0)
  const [focusedCurrency, setFocusedCurrency] = useState<'from' | 'to' | null>(null)
  const [fromCurrency, setFromCurrency] = useState<Currency>({ 
    code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' 
  })
  const [toCurrency, setToCurrency] = useState<Currency>({ 
    code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' 
  })
  const [isFromSelectorOpen, setIsFromSelectorOpen] = useState(false)
  const [isToSelectorOpen, setIsToSelectorOpen] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState("bank")
  const [paymentMethod, setPaymentMethod] = useState("debit")
  const [showDeliverySelector, setShowDeliverySelector] = useState(false)
  const [showPaymentSelector, setShowPaymentSelector] = useState(false)

  const [receiveAmount, setReceiveAmount] = useState(0)

  const getExchangeRate = (from: string, to: string) => {
    // This would ideally come from an API
    const rates: Record<string, number> = {
      'USD-MXN': 20.38,
      'USD-INR': 83.12,
      'USD-PHP': 56.50,
      'USD-CNY': 7.24,
      'USD-VND': 24565,
      'USD-PKR': 278.95,
      'USD-BDT': 109.82,
      'USD-NGN': 1562.45,
      'USD-EGP': 30.90,
      'USD-GBP': 0.79,
      'USD-EUR': 0.92,
      'USD-CAD': 1.35,
      'USD-AUD': 1.52,
      'USD-BRL': 4.97,
      'USD-IDR': 15682,
      'USD-LKR': 313.89,
      'USD-NPR': 133.29,
      'USD-KRW': 1338.24,
      'USD-THB': 35.97,
      // Add reverse rates
      'MXN-USD': 1/20.38,
      'INR-USD': 1/83.12,
      // ... add other reverse rates as needed
    }
    return rates[`${from}-${to}`] || 1
  }

  const fxRate = getExchangeRate(fromCurrency.code, toCurrency.code)
  const fee = PAYMENT_METHODS.existing.find(m => m.id === paymentMethod)?.fee || "0"
  const total = amount + parseFloat(fee)

  useEffect(() => {
    const calculated = amount * fxRate
    setReceiveAmount(calculated)
  }, [amount, fxRate])

  const handleReceiveAmountChange = (newAmount: number) => {
    setReceiveAmount(newAmount)
    setAmount(newAmount / fxRate)
  }

  const regularReceive = receiveAmount
  const boostedReceive = regularReceive * 1.1815 // Same multiplier as PromoBoost
  const extraAmount = Math.round(boostedReceive - regularReceive)

  const selectedDeliveryMethod = DELIVERY_METHODS.find(m => m.id === deliveryMethod) ?? DELIVERY_METHODS[0]
  const selectedPaymentMethod = PAYMENT_METHODS.existing.find(m => m.id === paymentMethod) ?? PAYMENT_METHODS.existing[0]

  return (
    <Card className="p-3 sm:p-6 space-y-4">
      <div className="space-y-2 sm:space-y-4">
        {/* From Currency Card */}
        <div 
          className={cn(
            "relative bg-muted/50 rounded-lg p-3",
            focusedCurrency === 'from' && "bg-muted"
          )}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsFromSelectorOpen(true)}
              className="flex items-center gap-2 hover:opacity-80"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full">
                {fromCurrency.flag}
              </div>
              <span className="font-medium text-sm">{fromCurrency.code}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <Input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-28 bg-transparent border-0 text-right focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xl font-medium p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
              onFocus={() => setFocusedCurrency('from')}
              onBlur={() => setFocusedCurrency(null)}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Balance: {fromCurrency.symbol}25.00
          </div>
        </div>

        {/* Arrow Divider */}
        <div className="relative flex justify-center h-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* To Currency Card */}
        <div 
          className={cn(
            "relative bg-muted/50 rounded-lg p-3",
            focusedCurrency === 'to' && "bg-muted"
          )}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsToSelectorOpen(true)}
              className="flex items-center gap-2 hover:opacity-80"
            >
              <div className="flex items-center justify-center w-5 h-5 rounded-full">
                {toCurrency.flag}
              </div>
              <span className="font-medium text-sm">{toCurrency.code}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            <Input
              type="number"
              value={receiveAmount || ''}
              onChange={(e) => handleReceiveAmountChange(parseFloat(e.target.value) || 0)}
              className="w-28 bg-transparent border-0 text-right focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-xl font-medium p-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="0"
              onFocus={() => setFocusedCurrency('to')}
              onBlur={() => setFocusedCurrency(null)}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Balance: {toCurrency.symbol}0.00
          </div>
        </div>
      </div>

      <CurrencySelector
        isOpen={isFromSelectorOpen}
        onClose={() => setIsFromSelectorOpen(false)}
        onSelect={setFromCurrency}
        selected={fromCurrency}
      />

      <CurrencySelector
        isOpen={isToSelectorOpen}
        onClose={() => setIsToSelectorOpen(false)}
        onSelect={setToCurrency}
        selected={toCurrency}
      />

      {/* Amount buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {RECOMMENDED_AMOUNTS.map((recommendedAmount) => (
          <Button
            key={recommendedAmount}
            variant="outline"
            size="sm"
            onClick={() => setAmount(recommendedAmount)}
            className="w-full text-sm sm:text-base"
          >
            ${recommendedAmount}
          </Button>
        ))}
      </div>

      {/* Delivery Method */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <selectedDeliveryMethod.icon className="h-5 w-5" />
            <div>
              <div className="font-medium">{selectedDeliveryMethod.title}</div>
              <div className="text-sm text-muted-foreground">
                {selectedDeliveryMethod.description}
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowDeliverySelector(true)}
          >
            Change
          </Button>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <selectedPaymentMethod.icon className="h-5 w-5" />
            <div>
              <div className="font-medium">{selectedPaymentMethod.title}</div>
              <div className="text-sm text-muted-foreground">
                {selectedPaymentMethod.description}
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowPaymentSelector(true)}
          >
            Change
          </Button>
        </div>
      </div>

      {/* Method Selectors in Dialogs */}
      <Dialog open={showDeliverySelector} onOpenChange={setShowDeliverySelector}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select Delivery Method</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <RadioGroup value={deliveryMethod} onValueChange={(value) => {
                setDeliveryMethod(value)
                setShowDeliverySelector(false)
              }}>
                <div className="grid gap-2">
                  {DELIVERY_METHODS.map((method) => (
                    <Label
                      key={method.id}
                      className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:bg-muted"
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <method.icon className="h-5 w-5" />
                      <div className="flex-1">
                        <div className="font-medium">{method.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {method.description}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{method.eta}</div>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPaymentSelector} onOpenChange={setShowPaymentSelector}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How to add money</DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-sm font-medium mb-2">Accounts</h3>
              <div className="grid gap-1">
                {PAYMENT_METHODS.existing.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => {
                      setPaymentMethod(method.id)
                      setShowPaymentSelector(false)
                    }}
                    className={cn(
                      "flex items-center gap-3 p-3 w-full text-left rounded-md",
                      "hover:bg-muted active:bg-muted/70 transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      paymentMethod === method.id && "bg-muted"
                    )}
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/60 shrink-0">
                      <method.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{method.title}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {method.subtitle}
                      </div>
                    </div>
                    {method.id === paymentMethod && (
                      <div className="text-sm text-muted-foreground shrink-0 ml-2">
                        {method.fee === "0" ? "Free" : `$${method.fee}`}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t">
              <div className="p-4">
                <h3 className="text-sm font-medium mb-2">Other methods</h3>
                <div className="grid gap-1">
                  {PAYMENT_METHODS.other.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => {
                        console.log(`Selected ${method.title}`)
                        setShowPaymentSelector(false)
                      }}
                      className={cn(
                        "flex items-center gap-3 p-3 w-full text-left rounded-md",
                        "hover:bg-muted active:bg-muted/70 transition-colors",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      )}
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/60 shrink-0">
                        <method.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{method.title}</div>
                        <div className="text-sm text-muted-foreground truncate">
                          {method.description}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Updated Summary Section */}
      <div className="pt-4 border-t space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Send amount</span>
          <span>${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Fee</span>
          <span>${fee}</span>
        </div>
        <div className="flex justify-between font-medium">
          <span>Total to pay</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex flex-col gap-1 pt-2 border-t">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground line-through">They receive</span>
              <Info className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-muted-foreground line-through">
              {regularReceive.toFixed(2)} {toCurrency.code}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>They receive</span>
              <div className="flex items-center gap-1 bg-emerald-900/10 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-0.5 rounded-md text-xs">
                <span>↗</span>
                <span>+{extraAmount} {toCurrency.code}</span>
              </div>
            </div>
            <div className="text-xl font-semibold">
              {boostedReceive.toFixed(2)} {toCurrency.code}
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <Button className="w-full" size="lg">
        Continue
      </Button>
    </Card>
  )
} 