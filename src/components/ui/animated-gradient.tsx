"use client"

import { motion } from "framer-motion"

export function AnimatedGradient() {
  return (
    <motion.div
      className="absolute inset-0 -z-10"
      animate={{
        background: [
          "radial-gradient(circle at 50% 50%, rgba(255, 119, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1) 100%)",
          "radial-gradient(circle at 0% 100%, rgba(255, 119, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1) 100%)",
          "radial-gradient(circle at 100% 0%, rgba(255, 119, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1) 100%)",
          "radial-gradient(circle at 50% 50%, rgba(255, 119, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 1) 100%)",
        ]
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  )
}
