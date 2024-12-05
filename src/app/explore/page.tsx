'use client'
import { Search, MessageCircle, Star, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"


const categories = [
  "Graphic Designer",
  "Web Developer",
  "Content Writer",
  "Translator",
  "Videographer",
  "Illustrator",
]

const freelancers = [
    {
      id: 1,
      name: "Andi Pratama",
      category: "Graphic Designer",
      location: "Jakarta",
      completedProjects: 47,
      rating: 4.8,
      walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
      image: "https://cdn.pixabay.com/photo/2016/06/20/04/30/asian-man-1468032_1280.jpg?height=100&width=100",
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      category: "Web Developer",
      location: "Surabaya",
      completedProjects: 32,
      rating: 4.9,
      walletAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
      image: "https://cdn.pixabay.com/photo/2022/04/30/14/04/woman-7165664_1280.jpg?&width=100",
    },
    {
      id: 3,
      name: "Budi Santoso",
      category: "Content Writer",
      location: "Bandung",
      completedProjects: 56,
      rating: 4.7,
      walletAddress: "0x7890abcdef1234567890abcdef1234567890abcd",
      image: "https://cdn.pixabay.com/photo/2019/12/04/09/30/man-4672229_1280.jpg?height=100&width=100",
    },
  ];
  

export default function FreelancerMarketplaceElegant() {

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans">
    

      <main className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">Find the Best Talent</h2>
          <p className="text-xl text-gray-400 mb-8">Explore a variety of freelancer categories to suit your needs</p>
          <div className="flex space-x-4 max-w-2xl mx-auto">
          <input
              type="text"
              placeholder="Search for freelancers..."
              className="w-full px-6 py-2 rounded-full border border-gray-600 text-gray-100 bg-gray-800 focus:outline-none focus:border-orange-500"
            />
         
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-full transition-colors duration-200">
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Popular Categories</h3>
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
            <img 
                src={freelancer.image} 
                alt={freelancer.name} 
                className="w-20 h-20 rounded-full mr-4 border-2 border-orange-500 object-cover" 
                />

              <div>
                <h3 className="text-2xl font-bold">{freelancer.name}</h3>
                <p className="text-orange-500">{freelancer.category}</p>
              </div>
            </div>
            <div className="mb-6 text-gray-400">
              <p className="mb-2">📍 {freelancer.location}</p>
              <p className="mb-2">🏆 {freelancer.completedProjects} projects completed</p>
              <div className="flex items-center mb-2">
                <Star className="text-yellow-400 mr-1" />
                <span className="text-xl font-semibold">{freelancer.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-500">Wallet Address: <span className="text-gray-300">{freelancer.walletAddress}</span></p>
            </div>
            <div className="flex justify-between items-center">
              <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white rounded-full px-6 py-2 transition-colors duration-200">
                View Profile
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
            Load More <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </main>

      <footer className="bg-gray-900 py-8 mt-16 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 EliteFreelance. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
