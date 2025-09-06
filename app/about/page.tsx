import { Navigation } from "@/components/navigation"
import { ContactSection } from "@/components/contact-section"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Kitab Junction</h1>
            <p className="text-xl text-muted-foreground text-pretty">
              Empowering students through affordable education and accessible books
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-foreground space-y-8">
            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Kitab Junction, we believe that financial constraints should never be a barrier to quality education.
                Our platform connects students across India, enabling them to buy, sell, and rent affordable second-hand
                books. We're building a community where knowledge is shared, costs are reduced, and every student has
                access to the resources they need to succeed.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-primary">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold mb-2">Buy Books</h3>
                  <p className="text-sm text-muted-foreground">
                    Find affordable textbooks and self-help books from fellow students
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Sell Books</h3>
                  <p className="text-sm text-muted-foreground">
                    Turn your old books into cash and help other students save money
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Rent Books</h3>
                  <p className="text-sm text-muted-foreground">
                    Rent books weekly or monthly for short-term study needs
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-lg border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Why Choose Us?</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Affordable prices - Save up to 70% on textbooks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Quality assurance - All books are verified for condition</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Easy communication - Direct WhatsApp integration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>Student community - Connect with peers across India</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <ContactSection />
      </main>
    </div>
  )
}
