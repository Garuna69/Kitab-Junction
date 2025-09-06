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
import {
  BookOpen,
  GraduationCap,
  Heart,
  Calculator,
  Globe,
  Beaker,
  DollarSign,
  Camera,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { createWhatsAppURL, formatSellMessage } from "@/lib/whatsapp"

const sellCategories = [
  {
    id: "self-help",
    title: "Self Help Books",
    icon: Heart,
    description: "Personal development and motivation",
    examples: [
      "The Art of Being Alone",
      "Rich Dad Poor Dad",
      "The Psychology of Money",
      "Atomic Habits",
      "Think and Grow Rich",
      "The 7 Habits of Highly Effective People",
    ],
  },
  {
    id: "class-9-10",
    title: "Class 9-10 Books",
    icon: BookOpen,
    description: "NCERT and reference books",
    examples: ["NCERT Mathematics", "NCERT Science", "NCERT Social Science", "NCERT English", "Reference Books"],
  },
  {
    id: "class-11-12",
    title: "Class 11-12 Books",
    icon: GraduationCap,
    description: "Higher secondary textbooks",
    examples: ["NCERT Physics", "NCERT Chemistry", "NCERT Biology", "NCERT Mathematics", "Board Exam Guides"],
  },
  {
    id: "competitive",
    title: "Competitive Exams",
    icon: Calculator,
    description: "JEE, NEET, and other exam prep",
    examples: ["JEE Mathematics", "NEET Physics", "GATE Preparation", "CAT Preparation", "Banking Exams"],
  },
  {
    id: "college",
    title: "College Books",
    icon: Globe,
    description: "B.A., B.Sc., and other degrees",
    examples: ["English Literature", "Psychology", "Economics", "Political Science", "Computer Science"],
  },
  {
    id: "reference",
    title: "Reference Books",
    icon: Beaker,
    description: "Grammar, dictionaries, and guides",
    examples: ["English Grammar", "Oxford Dictionary", "Study Guides", "Language Learning", "General Knowledge"],
  },
]

interface SellFormData {
  sellerName: string
  mobile: string
  email: string
  bookClass: string
  bookName: string
  medium: string
  bookCondition: string
  actualPrice: string
  sellingPrice: string
  description: string
}

export function SellPageContent() {
  const [selectedCategory, setSelectedCategory] = useState("self-help")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<SellFormData>({
    sellerName: "",
    mobile: "",
    email: "",
    bookClass: "",
    bookName: "",
    medium: "",
    bookCondition: "",
    actualPrice: "",
    sellingPrice: "",
    description: "",
  })

  const handleInputChange = (field: keyof SellFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.sellerName ||
      !formData.mobile ||
      !formData.email ||
      !formData.bookName ||
      !formData.bookClass ||
      !formData.medium ||
      !formData.bookCondition ||
      !formData.actualPrice ||
      !formData.sellingPrice
    ) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const message = formatSellMessage(formData)
      const whatsappURL = createWhatsAppURL(message)

      setShowSuccess(true)
      setTimeout(() => {
        window.open(whatsappURL, "_blank")
        setShowSuccess(false)
      }, 1500)
    } catch (error) {
      console.error("Error creating WhatsApp URL:", error)
      alert("Something went wrong. Please try again.")
    } finally {
      setTimeout(() => setIsSubmitting(false), 1000)
    }
  }

  const currentCategory = sellCategories.find((cat) => cat.id === selectedCategory)

  return (
    <div className="py-4 sm:py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Sell Your Books
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Turn your old books into cash and help fellow students save money. List your books and connect with buyers.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1 animate-in fade-in slide-in-from-left duration-700 delay-200">
            <Card className="lg:sticky lg:top-24 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">Book Categories</CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground">Select the category that best fits your book</p>
              </CardHeader>
              <CardContent className="space-y-2">
                {sellCategories.map((category, index) => {
                  const Icon = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 flex items-center space-x-3 hover:scale-[1.02] active:scale-[0.98] animate-in fade-in slide-in-from-left ${
                        selectedCategory === category.id
                          ? "bg-primary text-primary-foreground shadow-md transform scale-[1.02]"
                          : "hover:bg-muted text-foreground hover:shadow-sm"
                      }`}
                      style={{
                        animationDelay: `${300 + index * 100}ms`,
                      }}
                    >
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                      <div className="min-w-0">
                        <div className="font-medium text-sm truncate">{category.title}</div>
                        <div className="text-xs opacity-80 truncate">{category.description}</div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Selling Tips */}
            <Card className="mt-4 sm:mt-6 animate-in fade-in slide-in-from-left duration-700 delay-500 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-accent animate-pulse" />
                  <span>Selling Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                {[
                  "Price your books competitively - check similar listings",
                  "Be honest about book condition to build trust",
                  "Include clear photos and detailed descriptions",
                  "Respond quickly to buyer inquiries",
                ].map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 animate-in fade-in slide-in-from-left"
                    style={{
                      animationDelay: `${600 + index * 100}ms`,
                    }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse" />
                    <p>{tip}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Category Examples and Form */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right duration-700 delay-300">
            {/* Category Examples */}
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-4 sm:mb-6 flex items-center space-x-2 animate-in fade-in slide-in-from-top duration-500">
                {currentCategory && (
                  <currentCategory.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-bounce" />
                )}
                <span className="text-balance">{currentCategory?.title}</span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {currentCategory?.examples.map((example, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:bg-primary/5 active:scale-[0.95] group animate-in fade-in zoom-in"
                    onClick={() => handleInputChange("bookName", example)}
                    style={{
                      animationDelay: `${400 + index * 100}ms`,
                    }}
                  >
                    <CardContent className="p-3 sm:p-4 text-center">
                      <div className="bg-primary/10 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                        <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-primary transition-transform duration-300 group-hover:rotate-12" />
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-foreground line-clamp-2 transition-colors duration-200 group-hover:text-primary">
                        {example}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sell Form */}
            <Card className="transition-all duration-300 hover:shadow-lg animate-in fade-in slide-in-from-bottom duration-700 delay-400">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl flex items-center space-x-2">
                  <Camera className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
                  <span>List Your Book</span>
                </CardTitle>
                <p className="text-muted-foreground text-sm sm:text-base text-pretty">
                  Fill in the details to list your book for sale
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4 animate-in fade-in slide-in-from-left duration-500 delay-500">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2">
                      Seller Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sellerName" className="text-sm font-medium">
                          Seller Name *
                        </Label>
                        <Input
                          id="sellerName"
                          value={formData.sellerName}
                          onChange={(e) => handleInputChange("sellerName", e.target.value)}
                          placeholder="Enter your full name"
                          className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md hover:shadow-sm"
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
                          className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md hover:shadow-sm"
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
                        className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md hover:shadow-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Book Information */}
                  <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500 delay-600">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2">
                      Book Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="bookClass" className="text-sm font-medium">
                          Book Class/Course *
                        </Label>
                        <Select
                          value={formData.bookClass}
                          onValueChange={(value) => handleInputChange("bookClass", value)}
                        >
                          <SelectTrigger className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md hover:shadow-sm">
                            <SelectValue placeholder="Select class/course" />
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
                            <SelectItem value="competitive">Competitive Exams</SelectItem>
                            <SelectItem value="self-help">Self Help</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medium" className="text-sm font-medium">
                          Medium *
                        </Label>
                        <Select value={formData.medium} onValueChange={(value) => handleInputChange("medium", value)}>
                          <SelectTrigger className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md hover:shadow-sm">
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
                      <Label htmlFor="bookName" className="text-sm font-medium">
                        Book Name *
                      </Label>
                      <Input
                        id="bookName"
                        value={formData.bookName}
                        onChange={(e) => handleInputChange("bookName", e.target.value)}
                        placeholder="Enter the complete book name and author"
                        className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md hover:shadow-sm"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bookCondition" className="text-sm font-medium">
                        Book Condition *
                      </Label>
                      <Select
                        value={formData.bookCondition}
                        onValueChange={(value) => handleInputChange("bookCondition", value)}
                      >
                        <SelectTrigger className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md hover:shadow-sm">
                          <SelectValue placeholder="Select book condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent - Like new, no marks</SelectItem>
                          <SelectItem value="good">Good - Minor wear, few marks</SelectItem>
                          <SelectItem value="fair">Fair - Noticeable wear, some marks</SelectItem>
                          <SelectItem value="poor">Poor - Heavy wear, many marks</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="space-y-4 animate-in fade-in slide-in-from-left duration-500 delay-700">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2">
                      Pricing Information
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="actualPrice" className="text-sm font-medium">
                          Original Price *
                        </Label>
                        <Input
                          id="actualPrice"
                          type="number"
                          value={formData.actualPrice}
                          onChange={(e) => handleInputChange("actualPrice", e.target.value)}
                          placeholder="Enter original book price"
                          className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md hover:shadow-sm"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sellingPrice" className="text-sm font-medium">
                          Your Selling Price *
                        </Label>
                        <Input
                          id="sellingPrice"
                          type="number"
                          value={formData.sellingPrice}
                          onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
                          placeholder="Enter your selling price"
                          className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md hover:shadow-sm"
                          required
                        />
                      </div>
                    </div>

                    {formData.actualPrice && formData.sellingPrice && (
                      <div className="bg-muted p-3 sm:p-4 rounded-lg border animate-in fade-in zoom-in duration-500 transition-all hover:shadow-md">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Discount Percentage:</span>
                          <Badge
                            variant="secondary"
                            className="bg-accent text-accent-foreground text-xs sm:text-sm animate-pulse"
                          >
                            {Math.round(
                              ((Number(formData.actualPrice) - Number(formData.sellingPrice)) /
                                Number(formData.actualPrice)) *
                                100,
                            )}
                            % OFF
                          </Badge>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 animate-in fade-in slide-in-from-bottom duration-500 delay-800">
                    <Label htmlFor="description" className="text-sm font-medium">
                      Book Description
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe the book condition, any highlights, missing pages, etc..."
                      rows={4}
                      className="transition-all duration-300 focus:scale-[1.02] focus:shadow-md hover:shadow-sm resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg animate-in fade-in slide-in-from-bottom duration-500 delay-900"
                    size="lg"
                    disabled={isSubmitting || showSuccess}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : showSuccess ? (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 animate-bounce" />
                        <span>Opening WhatsApp...</span>
                      </div>
                    ) : (
                      "List Book for Sale via WhatsApp"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
