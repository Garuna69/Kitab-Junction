"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const books = [
  {
    id: 1,
    title: "The Art of Being Alone",
    author: "Renuka Gavrani",
    price: "₹199",
    originalPrice: "₹299",
    category: "Self Help",
    image: "/the-art-of-being-alone-book-cover.jpg",
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: "₹249",
    originalPrice: "₹399",
    category: "Self Help",
    image: "/rich-dad-poor-dad-cover.png",
  },
  {
    id: 3,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: "₹299",
    originalPrice: "₹450",
    category: "Self Help",
    image: "/psychology-of-money-cover.png",
  },
  {
    id: 4,
    title: "NCERT Physics Class 12",
    author: "NCERT",
    price: "₹150",
    originalPrice: "₹250",
    category: "Textbook",
    image: "/ncert-physics-class-12-textbook.jpg",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    price: "₹279",
    originalPrice: "₹399",
    category: "Self Help",
    image: "/atomic-habits-inspired-cover.png",
  },
  {
    id: 6,
    title: "Mathematics JEE Main",
    author: "R.D. Sharma",
    price: "₹350",
    originalPrice: "₹500",
    category: "Textbook",
    image: "/mathematics-jee-main-r-d--sharma-book.jpg",
  },
  {
    id: 7,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: "₹199",
    originalPrice: "₹299",
    category: "Self Help",
    image: "/think-and-grow-rich-book-cover.jpg",
  },
  {
    id: 8,
    title: "English Grammar",
    author: "Wren & Martin",
    price: "₹180",
    originalPrice: "₹280",
    category: "Textbook",
    image: "/wren-martin-english-grammar-book.jpg",
  },
]

export function BookCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Duplicate books for infinite scroll effect
  const extendedBooks = [...books, ...books, ...books]

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(
        () => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % books.length)
        },
        isMobile ? 4000 : 3000,
      ) // Slower on mobile
      return () => clearInterval(interval)
    }
  }, [isHovered, isMobile])

  const itemsPerView = isMobile ? 2 : 4

  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">Featured Books</h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Discover our collection of affordable textbooks and self-help books from fellow students
          </p>
        </div>

        <div
          className="relative overflow-hidden rounded-lg"
          onMouseEnter={() => !isMobile && setIsHovered(true)}
          onMouseLeave={() => !isMobile && setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setTimeout(() => setIsHovered(false), 3000)}
        >
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsPerView}%)`,
              width: `${(extendedBooks.length * 100) / itemsPerView}%`,
            }}
          >
            {extendedBooks.map((book, index) => (
              <div
                key={`${book.id}-${Math.floor(index / books.length)}`}
                className={`${isMobile ? "w-1/2" : "w-1/4"} px-2 sm:px-3 flex-shrink-0`}
              >
                <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 bg-card border-border h-full">
                  <CardContent className="p-3 sm:p-4 h-full flex flex-col">
                    <div className="relative mb-3 sm:mb-4 flex-shrink-0">
                      <img
                        src={book.image || "/placeholder.svg"}
                        alt={book.title}
                        className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md shadow-md group-hover:shadow-lg transition-shadow duration-300"
                      />
                      <Badge
                        variant="secondary"
                        className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs"
                      >
                        {book.category}
                      </Badge>
                    </div>

                    <div className="space-y-1 sm:space-y-2 flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground text-xs sm:text-sm line-clamp-2 group-hover:text-primary transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">by {book.author}</p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <span className="font-bold text-primary text-sm sm:text-lg">{book.price}</span>
                          <span className="text-xs text-muted-foreground line-through">{book.originalPrice}</span>
                        </div>
                        <div className="text-xs text-accent font-medium">
                          {Math.round(
                            ((Number.parseInt(book.originalPrice.slice(1)) - Number.parseInt(book.price.slice(1))) /
                              Number.parseInt(book.originalPrice.slice(1))) *
                              100,
                          )}
                          % OFF
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
          {books.slice(0, Math.ceil(books.length / itemsPerView)).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * itemsPerView)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / itemsPerView) === index
                  ? "bg-primary scale-125"
                  : "bg-border hover:bg-muted-foreground"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
