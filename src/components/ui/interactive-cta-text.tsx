"use client"

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { motion } from 'framer-motion'

export function InteractiveCTAText() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const letters = textRef.current.querySelectorAll('.letter')

    const animation = anime({
      targets: letters,
      translateY: [-20, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      rotate: [-10, 0],
      duration: 1500,
      delay: anime.stagger(100),
      easing: 'easeOutElastic(1, .5)',
    })

    const handleMouseEnter = () => {
      anime({
        targets: letters,
        scale: 1.2,
        rotate: function() {
          return anime.random(-15, 15)
        },
        duration: 800,
        delay: anime.stagger(50),
        easing: 'easeOutElastic(1, .5)'
      })
    }

    const handleMouseLeave = () => {
      anime({
        targets: letters,
        scale: 1,
        rotate: 0,
        duration: 600,
        delay: anime.stagger(50),
        easing: 'easeOutElastic(1, .5)'
      })
    }

    textRef.current.addEventListener('mouseenter', handleMouseEnter)
    textRef.current.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (textRef.current) {
        textRef.current.removeEventListener('mouseenter', handleMouseEnter)
        textRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }
      animation.pause()
    }
  }, [])

  const text = "Step into the Future with Web3!"

  return (
    <motion.div
      ref={textRef}
      className="text-4xl md:text-5xl font-bold mb-6 cursor-pointer select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="letter inline-block"
          style={{ 
            transformOrigin: '50% 50%',
            display: char === ' ' ? 'inline' : 'inline-block',
            marginRight: char === ' ' ? '0.5rem' : '0',
          }}
        >
          {char === 'W' ? (
            <span className="text-orange-500">{char}</span>
          ) : char === '3' ? (
            <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">{char}</span>
          ) : (
            char
          )}
        </span>
      ))}
    </motion.div>
  )
}
