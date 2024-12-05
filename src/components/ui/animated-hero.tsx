"use client"

import { useEffect, useRef } from 'react'
import anime from 'animejs'
import { motion } from 'framer-motion'




export function AnimatedHeroText() {
  const textRef = useRef<HTMLDivElement>(null)
  const wordsRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    if (!textRef.current) return

    // Initial animation
    anime.timeline({
      targets: '.hero-letter',
      delay: anime.stagger(50),
    })
    .add({
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1200,
      easing: 'easeOutExpo',
    })
    .add({
      scale: [1, 1.1, 1],
      rotate: [-2, 2, 0],
      duration: 800,
      easing: 'easeOutElastic(1, .5)',
    }, '-=800')

    // Hover animation for each word
    wordsRef.current.forEach((word) => {
      word.addEventListener('mouseenter', () => {
        anime({
          targets: word.querySelectorAll('.hero-letter'),
          scale: 1.2,
          rotate: () => anime.random(-10, 10),
          duration: 800,
          delay: anime.stagger(30),
          easing: 'easeOutElastic(1, .5)',
        })
      })

      word.addEventListener('mouseleave', () => {
        anime({
          targets: word.querySelectorAll('.hero-letter'),
          scale: 1,
          rotate: 0,
          duration: 600,
          delay: anime.stagger(30),
          easing: 'easeOutElastic(1, .5)',
        })
      })
    })
  }, [])

  const words = ['Transforming', 'Freelance', 'through', 'Blockchain'];

  return (
   
    <motion.div
      ref={textRef}
      className="text-5xl md:text-7xl font-bold mb-6 leading-tight select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        
        {words.map((word, wordIndex) => (
          <motion.span
            key={wordIndex}
            ref={(el) => {
              if (el) wordsRef.current[wordIndex] = el
            }}
            className="inline-block cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            {word.split('').map((char, charIndex) => (
              <span
                key={charIndex}
                className={`hero-letter inline-block origin-center ${
                  word === 'Freelance' 
                    ? 'relative z-10 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent'
                    : ''
                }`}
                style={{ 
                  transformOrigin: '50% 50%',
                }}
              >
                {char}
              </span>
            ))}
            {word === 'Freelance' && (
              <motion.div
                className="absolute -inset-2 bg-orange-500/20 blur-lg -z-10"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

