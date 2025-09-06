"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MessageCircle, Send, Users } from "lucide-react"

export function ContactSection() {
  const contactInfo = {
    phones: ["+919555417732", "+919682436074"],
    email: "Kitabjunctionup@gmail.com",
    whatsappGroup: "https://chat.whatsapp.com/FAQvnIu8YZ07ejUWBClazj?mode=ems_copy_t",
    telegramGroup: "https://t.me/kitabjunctionup",
  }

  const handleContactClick = (type: string, value: string) => {
    switch (type) {
      case "phone":
        window.open(`tel:${value}`, "_self")
        break
      case "email":
        window.open(`mailto:${value}`, "_self")
        break
      case "whatsapp":
        window.open(value, "_blank")
        break
      case "telegram":
        window.open(value, "_blank")
        break
      case "whatsapp-direct":
        window.open(`https://wa.me/${value.replace(/[^0-9]/g, "")}`, "_blank")
        break
    }
  }

  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">Get in Touch</h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? Need help? Contact us through any of these channels and we'll get back to you quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Phone Contacts */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="bg-primary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg">Call Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 pt-0">
              {contactInfo.phones.map((phone, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-xs sm:text-sm bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                  onClick={() => handleContactClick("phone", phone)}
                >
                  {phone}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="bg-accent/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
              <CardTitle className="text-base sm:text-lg">Email Us</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                variant="outline"
                className="w-full text-xs sm:text-sm bg-transparent hover:bg-accent hover:text-accent-foreground transition-all duration-200 break-all"
                onClick={() => handleContactClick("email", contactInfo.email)}
              >
                {contactInfo.email}
              </Button>
            </CardContent>
          </Card>

          {/* WhatsApp */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="bg-primary/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <CardTitle className="text-base sm:text-lg">WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 pt-0">
              <Button
                variant="outline"
                className="w-full text-xs sm:text-sm bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                onClick={() => handleContactClick("whatsapp-direct", contactInfo.phones[0])}
              >
                Direct Chat
              </Button>
              <Button
                variant="outline"
                className="w-full text-xs sm:text-sm bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                onClick={() => handleContactClick("whatsapp", contactInfo.whatsappGroup)}
              >
                Join Group
              </Button>
            </CardContent>
          </Card>

          {/* Telegram */}
          <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-400">
            <CardHeader className="text-center pb-3 sm:pb-4">
              <div className="bg-accent/10 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                <Send className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              </div>
              <CardTitle className="text-base sm:text-lg">Telegram</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Button
                variant="outline"
                className="w-full text-xs sm:text-sm bg-transparent hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                onClick={() => handleContactClick("telegram", contactInfo.telegramGroup)}
              >
                Join Channel
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Customer Support */}
        <div className="mt-8 sm:mt-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
          <Card className="max-w-sm sm:max-w-md mx-auto hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl flex items-center justify-center space-x-2">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <span>Customer Support</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-muted-foreground mb-3 sm:mb-4 text-xs sm:text-sm">
                Need dedicated support? Our customer service team is here to help.
              </p>
              <Button className="w-full hover:scale-105 transition-transform duration-200" size="lg">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
