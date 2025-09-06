"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, GraduationCap, Heart, Calculator, Globe, Beaker } from "lucide-react"
import { createWhatsAppURL, formatBuyMessage } from "@/lib/whatsapp"

const bookCategories = [
  {
    id: "self-help",
    title: "Self Help Books",
    icon: Heart,
    description: "Personal development and motivation",
    books: [
      {
        id: 1,
        title: "The Art of Being Alone",
        author: "Renuka Gavrani",
        price: "₹199",
        originalPrice: "₹299",
        image: "/the-art-of-being-alone-book-cover.jpg",
        available: true,
      },
      {
        id: 2,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        price: "₹249",
        originalPrice: "₹399",
        image: "/rich-dad-poor-dad-cover.png",
        available: true,
      },
      {
        id: 3,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        price: "₹299",
        originalPrice: "₹450",
        image: "/psychology-of-money-cover.png",
        available: true,
      },
      {
        id: 4,
        title: "Atomic Habits",
        author: "James Clear",
        price: "₹279",
        originalPrice: "₹399",
        image: "/atomic-habits-inspired-cover.png",
        available: false,
      },
    ],
  },
  {
    id: "class-9-10",
    title: "Class 9-10 Books",
    icon: BookOpen,
    description: "NCERT and reference books",
    books: [
      {
        id: 5,
        title: "NCERT Mathematics Class 10",
        author: "NCERT",
        price: "₹120",
        originalPrice: "₹200",
        image: "/ncert-mathematics-class-10-textbook.jpg",
        available: true,
      },
      {
        id: 6,
        title: "NCERT Science Class 9",
        author: "NCERT",
        price: "₹130",
        originalPrice: "₹220",
        image: "/ncert-science-class-9-textbook.jpg",
        available: true,
      },
    ],
  },
  {
    id: "class-11-12",
    title: "Class 11-12 Books",
    icon: GraduationCap,
    description: "Higher secondary textbooks",
    books: [
      {
        id: 7,
        title: "NCERT Physics Class 12",
        author: "NCERT",
        price: "₹150",
        originalPrice: "₹250",
        image: "/ncert-physics-class-12-textbook.jpg",
        available: true,
      },
      {
        id: 8,
        title: "NCERT Chemistry Class 11",
        author: "NCERT",
        price: "₹140",
        originalPrice: "₹240",
        image: "/ncert-chemistry-class-11-textbook.jpg",
        available: true,
      },
    ],
  },
  {
    id: "competitive",
    title: "Competitive Exams",
    icon: Calculator,
    description: "JEE, NEET, and other exam prep",
    books: [
      {
        id: 9,
        title: "Mathematics JEE Main",
        author: "R.D. Sharma",
        price: "₹350",
        originalPrice: "₹500",
        image: "/mathematics-jee-main-r-d--sharma-book.jpg",
        available: true,
      },
      {
        id: 10,
        title: "Physics for NEET",
        author: "DC Pandey",
        price: "₹320",
        originalPrice: "₹480",
        image: "/physics-for-neet-dc-pandey-book.jpg",
        available: false,
      },
    ],
  },
  {
    id: "college",
    title: "College Books",
    icon: Globe,
    description: "B.A., B.Sc., and other degrees",
    books: [
      {
        id: 11,
        title: "English Literature",
        author: "Various Authors",
        price: "₹280",
        originalPrice: "₹400",
        image: "/english-literature-college-textbook.jpg",
        available: true,
      },
      {
        id: 12,
        title: "General Psychology",
        author: "S.K. Mangal",
        price: "₹250",
        originalPrice: "₹350",
        image: "/general-psychology-s-k--mangal-textbook.jpg",
        available: true,
      },
    ],
  },
  {
    id: "reference",
    title: "Reference Books",
    icon: Beaker,
    description: "Grammar, dictionaries, and guides",
    books: [
      {
        id: 13,
        title: "English Grammar",
        author: "Wren & Martin",
        price: "₹180",
        originalPrice: "₹280",
        image: "/wren-martin-english-grammar-book.jpg",
        available: true,
      },
      {
        id: 14,
        title: "Oxford Dictionary",
        author: "Oxford",
        price: "₹220",
        originalPrice: "₹350",
        image: "/oxford-english-dictionary.jpg",
        available: true,
      },
    ],
  },
]

interface FormData {
  name: string
  mobile: string
  email: string
  class: string
  bookName: string
  medium: string
  additionalDetails: string
}

export function BuyPageContent() {
  const [selectedCategory, setSelectedCategory] = useState("self-help")
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    mobile: "",
    email: "",
    class: "",
    bookName: "",
    medium: "",
    additionalDetails: "",
  })

  const handleBookSelect = (book: any) => {
    setSelectedBook(book)
    setFormData((prev) => ({
      ...prev,
      bookName: book.title,
    }))
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedBook) {
      alert("Please select a book first")
      return
    }

    if (!formData.name || !formData.mobile || !formData.class) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const message = formatBuyMessage(formData, selectedBook)
      const whatsappURL = createWhatsAppURL(message)
      window.open(whatsappURL, "_blank")
    } catch (error) {
      console.error("Error creating WhatsApp URL:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentCategory = bookCategories.find((cat) => cat.id === selectedCategory)

  return (
    <div className="py-4 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Buy Books</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Find affordable textbooks and self-help books from fellow students. Browse by category and place your order.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">Book Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {bookCategories.map((category) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center space-x-3 hover:scale-[1.02] active:scale-[0.98] ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground shadow-md transform scale-[1.02]"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{category.title}</div>
                        <div className="text-xs opacity-80 truncate">{category.description}</div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Books Grid and Form */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Books Grid */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center space-x-2">
                {currentCategory && <currentCategory.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
                <span className="text-balance">{currentCategory?.title}</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {currentCategory?.books.map((book, index) => (
                  <Card
                    key={book.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] ${
                      selectedBook?.id === book.id ? "ring-2 ring-primary shadow-lg scale-[1.02]" : ""
                    } ${!book.available ? "opacity-60" : ""}`}
                    onClick={() => book.available && handleBookSelect(book)}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <CardContent className="p-3 sm:p-4">
                      <div className="relative mb-3 sm:mb-4">
                        <img
                          src={book.image || "/placeholder.svg"}
                          alt={book.title}
                          className="w-full h-40 sm:h-48 object-cover rounded-md transition-transform duration-300 hover:scale-105"
                        />
                        {!book.available && (
                          <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center">
                            <Badge variant="destructive" className="text-xs">
                              Out of Stock
                            </Badge>
                          </div>
                        )}
                        {book.available && (
                          <Badge
                            variant="secondary"
                            className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs"
                          >
                            Available
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-foreground line-clamp-2 text-sm sm:text-base">
                          {book.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">by {book.author}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-primary text-base sm:text-lg">{book.price}</span>
                            <span className="text-xs sm:text-sm text-muted-foreground line-through">
                              {book.originalPrice}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm text-accent font-medium">
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
                ))}
              </div>
            </div>

            {/* Order Form */}
            {selectedBook && (
              <Card className="animate-in slide-in-from-bottom-4 duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl">Place Your Order</CardTitle>
                  <p className="text-muted-foreground text-sm sm:text-base text-pretty">
                    Fill in your details to buy "{selectedBook.title}"
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          className="transition-all duration-200 focus:scale-[1.02]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-sm font-medium">
                          Mobile Number *
                        </Label>
                        <Input
                          id="mobile"
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          placeholder="Enter your mobile number"
                          className="transition-all duration-200 focus:scale-[1.02]"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        className="transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="class" className="text-sm font-medium">
                          Class/Course *
                        </Label>
                        <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                          <SelectTrigger className="transition-all duration-200 focus:scale-[1.02]">
                            <SelectValue placeholder="Select your class/course" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="9">Class 9</SelectItem>
                            <SelectItem value="10">Class 10</SelectItem>
                            <SelectItem value="11">Class 11</SelectItem>
                            <SelectItem value="12">Class 12</SelectItem>
                            <SelectItem value="ba">B.A.</SelectItem>
                            <SelectItem value="bsc">B.Sc.</SelectItem>
                            <SelectItem value="bcom">B.Com.</SelectItem>
                            <SelectItem value="btech">B.Tech.</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medium" className="text-sm font-medium">
                          Medium
                        </Label>
                        <Select value={formData.medium} onValueChange={(value) => handleInputChange("medium", value)}>
                          <SelectTrigger className="transition-all duration-200 focus:scale-[1.02]">
                            <SelectValue placeholder="Select medium" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hindi">Hindi</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="details" className="text-sm font-medium">
                        Additional Details
                      </Label>
                      <Textarea
                        id="details"
                        value={formData.additionalDetails}
                        onChange={(e) => handleInputChange("additionalDetails", e.target.value)}
                        placeholder="Any specific requirements or questions about the book..."
                        rows={3}
                        className="transition-all duration-200 focus:scale-[1.02] resize-none"
                      />
                    </div>

                    <div className="bg-muted p-4 rounded-lg border">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Order Summary</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm sm:text-base truncate pr-2">
                          {selectedBook.title}
                        </span>
                        <span className="font-bold text-primary text-base sm:text-lg">{selectedBook.price}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Place Order via WhatsApp"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
