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
import { BookOpen, Heart, Calculator, Beaker, Clock, Shield, MapPin } from "lucide-react"
import { createWhatsAppURL, formatRentMessage } from "@/lib/whatsapp"

const rentCategories = [
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
        weeklyRent: "₹49",
        monthlyRent: "₹149",
        deposit: "₹200",
        image: "/the-art-of-being-alone-book-cover.jpg",
        available: true,
      },
      {
        id: 2,
        title: "Rich Dad Poor Dad",
        author: "Robert Kiyosaki",
        weeklyRent: "₹59",
        monthlyRent: "₹179",
        deposit: "₹250",
        image: "/rich-dad-poor-dad-cover.png",
        available: true,
      },
      {
        id: 3,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        weeklyRent: "₹69",
        monthlyRent: "₹199",
        deposit: "₹300",
        image: "/psychology-of-money-cover.png",
        available: false,
      },
      {
        id: 4,
        title: "Atomic Habits",
        author: "James Clear",
        weeklyRent: "₹65",
        monthlyRent: "₹189",
        deposit: "₹280",
        image: "/atomic-habits-inspired-cover.png",
        available: true,
      },
    ],
  },
  {
    id: "textbooks",
    title: "Textbooks",
    icon: BookOpen,
    description: "Academic books for all classes",
    books: [
      {
        id: 5,
        title: "NCERT Physics Class 12",
        author: "NCERT",
        weeklyRent: "₹39",
        monthlyRent: "₹119",
        deposit: "₹150",
        image: "/ncert-physics-class-12-textbook.jpg",
        available: true,
      },
      {
        id: 6,
        title: "Mathematics JEE Main",
        author: "R.D. Sharma",
        weeklyRent: "₹79",
        monthlyRent: "₹229",
        deposit: "₹350",
        image: "/mathematics-jee-main-r-d--sharma-book.jpg",
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
        id: 7,
        title: "Physics for NEET",
        author: "DC Pandey",
        weeklyRent: "₹75",
        monthlyRent: "₹219",
        deposit: "₹320",
        image: "/physics-for-neet-dc-pandey-book.jpg",
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
        id: 8,
        title: "English Grammar",
        author: "Wren & Martin",
        weeklyRent: "₹35",
        monthlyRent: "₹99",
        deposit: "₹180",
        image: "/wren-martin-english-grammar-book.jpg",
        available: true,
      },
    ],
  },
]

interface RentFormData {
  name: string
  mobile: string
  email: string
  aadhaar: string
  address: string
  houseNumber: string
  pickupAddress: string
  rentalPeriod: string
  additionalNotes: string
}

export function RentPageContent() {
  const [selectedCategory, setSelectedCategory] = useState("self-help")
  const [selectedBook, setSelectedBook] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<RentFormData>({
    name: "",
    mobile: "",
    email: "",
    aadhaar: "",
    address: "",
    houseNumber: "",
    pickupAddress: "",
    rentalPeriod: "",
    additionalNotes: "",
  })

  const handleBookSelect = (book: any) => {
    setSelectedBook(book)
  }

  const handleInputChange = (field: keyof RentFormData, value: string) => {
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

    if (
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
      !formData.aadhaar ||
      !formData.address ||
      !formData.houseNumber ||
      !formData.rentalPeriod
    ) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      const message = formatRentMessage(formData, selectedBook)
      const whatsappURL = createWhatsAppURL(message)
      window.open(whatsappURL, "_blank")
    } catch (error) {
      console.error("Error creating WhatsApp URL:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentCategory = rentCategories.find((cat) => cat.id === selectedCategory)

  const getRentPrice = () => {
    if (!selectedBook || !formData.rentalPeriod) return null
    return formData.rentalPeriod === "weekly" ? selectedBook.weeklyRent : selectedBook.monthlyRent
  }

  return (
    <div className="py-4 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">Rent Books</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Rent books for short-term study needs. Perfect for exam preparation and quick reference.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="lg:sticky lg:top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">Book Categories</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground">Choose from our rental collection</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {rentCategories.map((category) => {
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

            {/* Rental Info */}
            <Card className="mt-4 sm:mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  <span>Rental Terms</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Weekly rentals: 7 days from pickup</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Monthly rentals: 30 days from pickup</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Security deposit refunded on return</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Late return charges: ₹10/day</p>
                </div>
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
                              Not Available
                            </Badge>
                          </div>
                        )}
                        {book.available && (
                          <Badge
                            variant="secondary"
                            className="absolute top-2 right-2 bg-accent text-accent-foreground text-xs"
                          >
                            Available
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-foreground line-clamp-2 text-sm sm:text-base">
                          {book.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">by {book.author}</p>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-muted-foreground">Weekly</span>
                            <span className="font-bold text-primary text-sm sm:text-base">{book.weeklyRent}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-xs sm:text-sm text-muted-foreground">Monthly</span>
                            <span className="font-bold text-primary text-sm sm:text-base">{book.monthlyRent}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-border">
                            <span className="text-xs text-muted-foreground">Security Deposit</span>
                            <span className="text-xs sm:text-sm font-medium text-accent">{book.deposit}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Rental Form */}
            {selectedBook && (
              <Card className="animate-in slide-in-from-bottom-4 duration-500">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl flex items-center space-x-2">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="text-balance">Rent "{selectedBook.title}"</span>
                  </CardTitle>
                  <p className="text-muted-foreground text-sm sm:text-base text-pretty">
                    Fill in your details to rent this book. ID verification required for security.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2">
                        Personal Information
                      </h3>
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
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="Enter your email address"
                          className="transition-all duration-200 focus:scale-[1.02]"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="aadhaar" className="text-sm font-medium">
                          Aadhaar Card Number *
                        </Label>
                        <Input
                          id="aadhaar"
                          value={formData.aadhaar}
                          onChange={(e) => handleInputChange("aadhaar", e.target.value)}
                          placeholder="Enter your 12-digit Aadhaar number"
                          maxLength={12}
                          className="transition-all duration-200 focus:scale-[1.02]"
                          required
                        />
                        <p className="text-xs text-muted-foreground">Required for identity verification</p>
                      </div>
                    </div>

                    {/* Address Information */}
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center space-x-2">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        <span>Address Information</span>
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="houseNumber" className="text-sm font-medium">
                            House/Flat Number *
                          </Label>
                          <Input
                            id="houseNumber"
                            value={formData.houseNumber}
                            onChange={(e) => handleInputChange("houseNumber", e.target.value)}
                            placeholder="Enter house/flat number"
                            className="transition-all duration-200 focus:scale-[1.02]"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-sm font-medium">
                            Complete Address *
                          </Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            placeholder="Street, Area, City, Pincode"
                            className="transition-all duration-200 focus:scale-[1.02]"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pickupAddress" className="text-sm font-medium">
                          Pickup Address
                        </Label>
                        <Textarea
                          id="pickupAddress"
                          value={formData.pickupAddress}
                          onChange={(e) => handleInputChange("pickupAddress", e.target.value)}
                          placeholder="If different from above address, specify pickup location..."
                          rows={2}
                          className="transition-all duration-200 focus:scale-[1.02] resize-none"
                        />
                      </div>
                    </div>

                    {/* Rental Details */}
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2">
                        Rental Details
                      </h3>
                      <div className="space-y-2">
                        <Label htmlFor="rentalPeriod" className="text-sm font-medium">
                          Rental Period *
                        </Label>
                        <Select
                          value={formData.rentalPeriod}
                          onValueChange={(value) => handleInputChange("rentalPeriod", value)}
                        >
                          <SelectTrigger className="transition-all duration-200 focus:scale-[1.02]">
                            <SelectValue placeholder="Select rental period" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly - {selectedBook.weeklyRent}</SelectItem>
                            <SelectItem value="monthly">Monthly - {selectedBook.monthlyRent}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalNotes" className="text-sm font-medium">
                          Additional Notes
                        </Label>
                        <Textarea
                          id="additionalNotes"
                          value={formData.additionalNotes}
                          onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                          placeholder="Any special instructions or requirements..."
                          rows={3}
                          className="transition-all duration-200 focus:scale-[1.02] resize-none"
                        />
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-muted p-3 sm:p-4 rounded-lg space-y-2 border">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Rental Summary</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm truncate pr-2">{selectedBook.title}</span>
                        <span className="font-bold text-primary text-sm sm:text-base">
                          {getRentPrice() || "Select period"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">Security Deposit</span>
                        <span className="font-medium text-accent text-sm">{selectedBook.deposit}</span>
                      </div>
                      {getRentPrice() && (
                        <div className="flex justify-between items-center pt-2 border-t border-border animate-in fade-in duration-300">
                          <span className="font-medium text-foreground text-sm sm:text-base">Total Amount</span>
                          <span className="font-bold text-base sm:text-lg text-primary">
                            ₹{Number(getRentPrice()?.slice(1)) + Number(selectedBook.deposit.slice(1))}
                          </span>
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Processing..." : "Rent Book via WhatsApp"}
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
