"use client"

import { useEffect, useRef } from 'react'
import anime from 'animejs'

export function InteractiveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const dots: HTMLDivElement[] = []
    const numberOfDots = 50
    const colors = ['#ff6b00', '#ff8800', '#ffa200']

    // Create dots
    for (let i = 0; i < numberOfDots; i++) {
      const dot = document.createElement('div')
      dot.className = 'absolute rounded-full pointer-events-none'
      dot.style.width = '4px'
      dot.style.height = '4px'
      dot.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      container.appendChild(dot)
      dots.push(dot)

      // Random initial positions
      dot.style.left = `${Math.random() * 100}%`
      dot.style.top = `${Math.random() * 100}%`
    }

    // Animate dots
    const animation = anime({
      targets: dots,
      translateX: function() {
        return anime.random(-200, 200)
      },
      translateY: function() {
        return anime.random(-200, 200)
      },
      scale: function() {
        return anime.random(1, 3)
      },
      opacity: function() {
        return anime.random(0.2, 0.6)
      },
      duration: function() {
        return anime.random(3000, 6000)
      },
      delay: function() {
        return anime.random(0, 1000)
      },
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad'
    })

    // Interactive mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event
      const rect = container.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top

      dots.forEach((dot, index) => {
        const dotRect = dot.getBoundingClientRect()
        const dotX = dotRect.left - rect.left + dotRect.width / 2
        const dotY = dotRect.top - rect.top + dotRect.height / 2

        const distance = Math.sqrt(
          Math.pow(x - dotX, 2) + Math.pow(y - dotY, 2)
        )

        if (distance < 100) {
          anime({
            targets: dot,
            translateX: x - dotX,
            translateY: y - dotY,
            scale: 3,
            duration: 800,
            easing: 'easeOutElastic(1, .5)'
          })
        }
      })
    }

    container.addEventListener('mousemove', handleMouseMove)

    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      animation.pause()
      dots.forEach(dot => dot.remove())
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    />
  )
}