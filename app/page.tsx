import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { BookCarousel } from "@/components/book-carousel"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <BookCarousel />
        <AboutSection />
        <ContactSection />
      </main>
    </div>
  )
}
