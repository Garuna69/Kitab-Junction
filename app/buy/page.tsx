import { Navigation } from "@/components/navigation"
import { BuyPageContent } from "@/components/buy-page-content"

export default function BuyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <BuyPageContent />
      </main>
    </div>
  )
}
