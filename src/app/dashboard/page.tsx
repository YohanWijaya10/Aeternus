'use client'
import React from 'react'
import { Search, MessageCircle, Star, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

const categories = [
  "Desainer Grafis",
  "Pengembang Web",
  "Penulis Konten",
  "Penerjemah",
  "Videografer",
  "Ilustrator",
]

const freelancers = [
  {
    id: 1,
    name: "Andi Pratama",
    category: "Desainer Grafis",
    location: "Jakarta",
    completedProjects: 47,
    rating: 4.8,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    category: "Pengembang Web",
    location: "Surabaya",
    completedProjects: 32,
    rating: 4.9,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Budi Santoso",
    category: "Penulis Konten",
    location: "Bandung",
    completedProjects: 56,
    rating: 4.7,
    image: "/placeholder.svg?height=100&width=100",
  },
  // Add more freelancers as needed
]

export default function FreelancerMarketplaceElegant() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
      <header className="bg-gray-900 py-6 border-b border-gray-800">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-orange-500">EliteFreelance</h1>
          <nav>
            <ul className="flex space-x-8">
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Beranda</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Tentang</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors duration-200">Kontak</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">Temukan Talenta Terbaik</h2>
          <p className="text-xl text-gray-400 mb-8">Jelajahi berbagai kategori freelancer sesuai kebutuhan Anda</p>
          <div className="flex space-x-4 max-w-2xl mx-auto">
            <Input type="text" placeholder="Cari freelancer..." className="flex-grow bg-gray-900 border-gray-700 text-white placeholder-gray-500" />
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-full transition-colors duration-200">
              <Search className="mr-2 h-5 w-5" /> Cari
            </Button>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Kategori Populer</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button key={category} variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full px-6 py-2 transition-colors duration-200">
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((freelancer) => (
            <div key={freelancer.id} className="bg-gray-900 rounded-lg p-8 shadow-2xl transform hover:scale-105 transition-transform duration-200">
              <div className="flex items-center mb-6">
                <img src={freelancer.image} alt={freelancer.name} className="w-20 h-20 rounded-full mr-4 border-2 border-orange-500" />
                <div>
                  <h3 className="text-2xl font-bold">{freelancer.name}</h3>
                  <p className="text-orange-500">{freelancer.category}</p>
                </div>
              </div>
              <div className="mb-6 text-gray-400">
                <p className="mb-2">📍 {freelancer.location}</p>
                <p className="mb-2">🏆 {freelancer.completedProjects} proyek selesai</p>
                <div className="flex items-center">
                  <Star className="text-yellow-400 mr-1" />
                  <span className="text-xl font-semibold">{freelancer.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full px-6 py-2 transition-colors duration-200">
                  Lihat Profil
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2 transition-colors duration-200">
                  <MessageCircle className="mr-2 h-5 w-5" /> Chat
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-200">
            Lihat Lebih Banyak <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>

      <footer className="bg-gray-900 py-8 mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 EliteFreelance. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  )
}

