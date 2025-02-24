"use client"

import { Suspense } from "react"
import { Calculator } from "@/components/calculator"

export default function CalculatorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Calculator />
    </Suspense>
  )
} 