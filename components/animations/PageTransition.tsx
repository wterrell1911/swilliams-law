"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode } from "react"
import { pageTransitionVariants } from "@/lib/animations"

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={pageTransitionVariants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
