// WhatsApp integration utility functions
const WHATSAPP_NUMBER = "919555417732"

export function createWhatsAppURL(message: string): string {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export function formatBuyMessage(formData: any, selectedBook: any): string {
  return `🛒 *BOOK PURCHASE REQUEST*

📚 *Book Details:*
• Book: ${selectedBook.title}
• Author: ${selectedBook.author}
• Price: ${selectedBook.price}

👤 *Buyer Information:*
• Name: ${formData.name}
• Mobile: ${formData.mobile}
• Email: ${formData.email || "Not provided"}
• Class/Course: ${formData.class}
• Medium: ${formData.medium || "Not specified"}

📝 *Additional Details:*
${formData.additionalDetails || "None"}

Please confirm availability and arrange pickup/delivery.

Thank you!`
}

export function formatSellMessage(formData: any): string {
  return `💰 *BOOK SELLING REQUEST*

👤 *Seller Information:*
• Name: ${formData.sellerName}
• Mobile: ${formData.mobile}
• Email: ${formData.email}

📚 *Book Details:*
• Book Name: ${formData.bookName}
• Class/Course: ${formData.bookClass}
• Medium: ${formData.medium}
• Condition: ${formData.bookCondition}
• Original Price: ₹${formData.actualPrice}
• Selling Price: ₹${formData.sellingPrice}

📝 *Description:*
${formData.description || "No additional description"}

Please help me list this book for sale.

Thank you!`
}

export function formatRentMessage(formData: any, selectedBook: any): string {
  const rentPrice = formData.rentalPeriod === "weekly" ? selectedBook.weeklyRent : selectedBook.monthlyRent
  const totalAmount = Number(rentPrice.slice(1)) + Number(selectedBook.deposit.slice(1))

  return `📖 *BOOK RENTAL REQUEST*

📚 *Book Details:*
• Book: ${selectedBook.title}
• Author: ${selectedBook.author}
• Rental Period: ${formData.rentalPeriod}
• Rent: ${rentPrice}
• Security Deposit: ${selectedBook.deposit}
• Total Amount: ₹${totalAmount}

👤 *Renter Information:*
• Name: ${formData.name}
• Mobile: ${formData.mobile}
• Email: ${formData.email}
• Aadhaar: ${formData.aadhaar}

🏠 *Address Details:*
• House Number: ${formData.houseNumber}
• Address: ${formData.address}
• Pickup Address: ${formData.pickupAddress || "Same as above"}

📝 *Additional Notes:*
${formData.additionalNotes || "None"}

Please confirm availability and rental terms.

Thank you!`
}
