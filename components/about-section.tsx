import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Heart, Target } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">About Kitab Junction</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-pretty">
            We believe education should be accessible to everyone. Our platform connects students to buy, sell, and rent
            affordable second-hand books, making quality education within reach for all.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="text-center border-border bg-card hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Student Community</h3>
              <p className="text-sm text-muted-foreground">
                Connect with fellow students and build a supportive learning network
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-border bg-card hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Quality Books</h3>
              <p className="text-sm text-muted-foreground">
                Access textbooks and self-help books in excellent condition at great prices
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-border bg-card hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Affordable Education</h3>
              <p className="text-sm text-muted-foreground">
                Save money on books and invest in your future without breaking the bank
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-border bg-card hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Easy Process</h3>
              <p className="text-sm text-muted-foreground">
                Simple buying, selling, and renting process with WhatsApp integration
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
