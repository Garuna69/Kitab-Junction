import { Button } from "@/components/ui/button"
import { BookOpen, ShoppingCart, DollarSign } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-12 sm:py-16 md:py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Hero Content */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6 text-balance leading-tight">
            Affordable Education for <span className="text-primary">Every Student</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto text-pretty px-4">
            Access quality second-hand books at unbeatable prices. Buy, sell, and rent textbooks and self-help books to
            make education affordable for everyone.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {/* Buy Card */}
          <Link href="/buy" className="group">
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              <div className="bg-primary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <ShoppingCart className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Buy Books</h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                Find affordable textbooks and self-help books from fellow students
              </p>
              <Button className="w-full" size="lg">
                Start Buying
              </Button>
            </div>
          </Link>

          {/* Sell Card */}
          <Link href="/sell" className="group">
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
              <div className="bg-accent/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Sell Books</h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                Turn your old books into cash and help other students save money
              </p>
              <Button variant="secondary" className="w-full" size="lg">
                Start Selling
              </Button>
            </div>
          </Link>

          {/* Rent Card */}
          <Link href="/rent" className="group sm:col-span-2 md:col-span-1">
            <div className="bg-card border border-border rounded-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-600">
              <div className="bg-primary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">Rent Books</h3>
              <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">
                Rent books weekly or monthly for short-term study needs
              </p>
              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Start Renting
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
