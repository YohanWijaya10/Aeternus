"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

const steps = [
  {
    number: "01",
    title: "Create Contract",
    description: "Define the project requirements and payment terms in the smart contract."
  },
  {
    number: "02",
    title: "Work on Project",
    description: "Freelancer works on the project according to the defined milestones."
  },
  {
    number: "03",
    title: "Verification",
    description: "Client verifies the work completed at each milestone."
  },
  {
    number: "04",
    title: "Automatic Payment",
    description: "The smart contract automatically transfers payment after verification."
  }
]

export function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16"
        >
          How it <span className="text-orange-500">Works</span>
        </motion.h2>

        <div ref={ref} className="relative">
          <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />
          
          <div className="space-y-24">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="flex-1">
                  <div className={`max-w-lg ${index % 2 === 0 ? "ml-auto" : "mr-auto"}`}>
                    <div className="text-5xl font-bold text-orange-500/20 mb-4">{step.number}</div>
                    <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-black border-4 border-orange-500 relative z-10">
                  <div className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" />
                </div>
                
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
