"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, BookOpen } from "lucide-react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`bg-background border-b border-border sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg backdrop-blur-sm bg-background/95" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary group-hover:scale-110 transition-transform duration-200" />
            <span className="text-lg sm:text-xl font-bold text-foreground">Kitab Junction</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/buy" className="text-foreground hover:text-primary transition-colors duration-200 font-medium">
              Buy
            </Link>
            <Link
              href="/sell"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Sell
            </Link>
            <Link
              href="/rent"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Rent
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 bg-transparent"
            >
              Customer Support
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="hover:bg-muted transition-colors duration-200"
            >
              {isOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
            <Link
              href="/buy"
              className="block px-3 py-3 text-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Buy Books
            </Link>
            <Link
              href="/sell"
              className="block px-3 py-3 text-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Sell Books
            </Link>
            <Link
              href="/rent"
              className="block px-3 py-3 text-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              Rent Books
            </Link>
            <Link
              href="/about"
              className="block px-3 py-3 text-foreground hover:text-primary hover:bg-muted rounded-md transition-all duration-200 font-medium"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <div className="px-3 py-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
              >
                Customer Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
