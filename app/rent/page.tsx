import { Navigation } from "@/components/navigation"
import { RentPageContent } from "@/components/rent-page-content"

export default function RentPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <RentPageContent />
      </main>
    </div>
  )
}
