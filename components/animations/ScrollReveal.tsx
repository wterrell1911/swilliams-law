"use client"

import { motion, useInView, type Transition } from "framer-motion"
import { useRef, ReactNode } from "react"
import { staggerContainer, staggerItem } from "@/lib/animations"

const staggerVisibleTransition = (staggerContainer.visible as { transition?: Transition })?.transition

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  stagger?: boolean
  staggerDelay?: number
  className?: string
  once?: boolean
}

export function ScrollReveal({
  children,
  delay = 0,
  stagger = false,
  staggerDelay = 0.1,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: "-100px" })

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          ...staggerContainer,
          visible: {
            ...staggerContainer.visible,
            transition: {
              ...staggerVisibleTransition,
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            delay,
            ease: [0.25, 0.1, 0.25, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function ScrollRevealItem({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  )
}
