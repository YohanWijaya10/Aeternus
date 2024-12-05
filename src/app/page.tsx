"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'
import Link from "next/link"
import { ParticleBackground } from "../components/ui/particle-background"
import { AnimatedGradient } from "../components/ui/animated-gradient"
import { FeaturesSection } from "../components/ui/feature-section"
import { HowItWorksSection } from "../components/ui/how-it-works-section"
import { InteractiveBackground } from "../components/ui/interactive-background"
import { InteractiveCTAText } from "../components/ui/interactive-cta-text"
import { AnimatedHeroText } from "../components/ui/animated-hero"
import {client} from "../lib/utils"
import { ConnectButton } from "thirdweb/react";

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParticleBackground />
      <AnimatedGradient />
      <InteractiveBackground />

      <motion.header
        style={{ opacity: headerOpacity }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-orange-500/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"
            >
              Aeternus
            </motion.span>
          </Link>
          <nav>
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex space-x-8"
            >
             
              <li>
              <ConnectButton
            client={client}
            appMetadata={{
              name: "Example App",
              url: "https://example.com",
            }}
          />
              </li>
            </motion.ul>
          </nav>
        </div>
      </motion.header>

      <main>
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="container mx-auto px-4 text-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AnimatedHeroText />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300"
              >
                A decentralized platform for secure, transparent, and efficient freelance project management with smart contracts.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-x-4"
              >
                  <Link href="/about">  
                <Button
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-1"
                >
                  Dashboard
                </Button>
                </Link>
                <Link href="/explore"> 
                <Button
                  variant="outline"
                  className="border-orange-500/20 hover:border-orange-500 text-orange-500 hover:text-orange-400 px-8 py-6 rounded-xl text-lg font-semibold backdrop-blur-sm transition-all duration-300"
                >
                  Explore
                </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-10 h-10 text-orange-500" />
            </motion.div>
          </motion.div>
        </section>

        <FeaturesSection />
        <HowItWorksSection />

        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl p-12 backdrop-blur-lg border border-orange-500/20 relative overflow-hidden group"
            >
              <div className="text-center max-w-3xl mx-auto relative z-10">
                <InteractiveCTAText />
                <motion.p
                  className="text-xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Join thousands of freelancers and clients who have used our platform for their projects.
                </motion.p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 rounded-xl text-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 transform hover:-translate-y-1"
                  >
                    Sign Up Now
                  </Button>
                </motion.div>
              </div>

              {/* Add animated background effect for the card */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-orange-600/5 animate-pulse" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_rgba(255,165,0,0.1)_100%)] animate-[ping_3s_ease-in-out_infinite]" />
              </div>
            </motion.div>
          </div>
        </section>
        </main>

      <footer className="bg-black/50 backdrop-blur-md border-t border-orange-500/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold text-orange-500 mb-4">FreelanceDApp</h3>
              <p className="text-gray-400">
                A decentralized freelance platform based on blockchain.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Smart Contracts</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Escrow</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-orange-500 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-orange-500/10 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FreelanceDApp. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )

}