import { Navigation } from "@/components/navigation"
import { SellPageContent } from "@/components/sell-page-content"

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <SellPageContent />
      </main>
    </div>
  )
}
