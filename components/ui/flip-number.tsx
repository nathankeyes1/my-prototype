"use client"

import { motion, AnimatePresence } from "framer-motion"

export function FlipNumber({ number, index }: { number: string; index: number }) {
  return (
    <div className="relative inline-block">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={number}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{
            duration: 0.2,
            delay: index * 0.1, // Stagger the animation based on digit position
            ease: "easeInOut",
          }}
          className="inline-block"
        >
          {number}
        </motion.span>
      </AnimatePresence>
    </div>
  )
} 