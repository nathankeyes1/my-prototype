"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "./ui/card"
import { ChevronDown } from "lucide-react"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { FlipNumber } from "./ui/flip-number"

const AMOUNT_OPTIONS = [100, 500, 1000, 2000]

export function PromoBoost() {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(100)
  const fxRate = 20.38
  const boostMultiplier = 1.1815

  const regularAmount = selectedAmount * fxRate
  const boostedAmount = regularAmount * boostMultiplier
  const extraAmount = Math.round(boostedAmount - regularAmount)

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
  }

  const getDisplayTitle = () => {
    if (isExpanded) {
      return `Send ${selectedAmount} USD`
    }
    return `Send ${selectedAmount} USD`
  }

  const handleSend = () => {
    router.push(`/calculator?amount=${selectedAmount}`)
  }

  const formatBonusNumber = (num: number) => {
    return num.toString().split('').map((digit, i) => (
      <FlipNumber key={i} number={digit} index={i} />
    ))
  }

  return (
    <Card className="p-3 sm:p-4">
      <motion.div
        layout
        className="space-y-4"
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.2
        }}
      >
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left"
        >
          <div className="flex items-center justify-between">
            <motion.h3 
              layout="position" 
              className="text-xl font-semibold"
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.2
              }}
            >
              {getDisplayTitle()}
            </motion.h3>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{
                type: "spring",
                bounce: 0,
                duration: 0.2
              }}
            >
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            </motion.div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: "auto",
                opacity: 1,
                transition: {
                  height: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.2
                  },
                  opacity: {
                    duration: 0.1
                  }
                }
              }}
              exit={{ 
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.2
                  },
                  opacity: {
                    duration: 0.1
                  }
                }
              }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2">
                {AMOUNT_OPTIONS.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    onClick={() => handleAmountSelect(amount)}
                    className="w-full text-sm sm:text-base"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              <div className="pt-2">
                <Button 
                  onClick={handleSend}
                  className="w-full" 
                  size="lg"
                >
                  Send
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          layout="position" 
          className="space-y-2"
          transition={{
            type: "spring",
            bounce: 0,
            duration: 0.2
          }}
        >
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Rate:</span>
            <div className="flex items-center gap-1">
              <span>1 USD = {fxRate.toFixed(2)} MXN</span>
              <div className="flex items-center gap-0.5 text-xs">
                <span className="text-emerald-600">↗</span>
                <span className="text-emerald-600">+18.15%</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground line-through">
            Receive = {regularAmount.toFixed(2)} MXN
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <div className="text-lg sm:text-xl font-semibold">
              Receive = {boostedAmount.toFixed(2)} MXN
            </div>
            <div className="flex items-center gap-1 bg-emerald-900/10 text-emerald-600 px-2 py-0.5 rounded-md text-xs">
              <span>↗</span>
              <span>+{formatBonusNumber(extraAmount)}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Card>
  )
} 