// Mobile menu functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Book carousel data
  const books = [
    {
      title: "The Art of Being Alone",
      price: "₹299",
      image: "https://5.imimg.com/data5/SELLER/Default/2024/9/451053603/BH/KA/SA/231929105/flipkart-images-7-png-1000x1000.png",
    },
    {
      title: "Rich Dad Poor Dad",
      price: "₹399",
      image: "/api/placeholder/120/160?text=Rich+Dad+Poor+Dad",
    },
    {
      title: "Psychology of Money",
      price: "₹349",
      image: "/api/placeholder/120/160?text=Psychology+of+Money",
    },
    {
      title: "NCERT Physics Class 12",
      price: "₹199",
      image: "/api/placeholder/120/160?text=NCERT+Physics",
    },
    {
      title: "Atomic Habits",
      price: "₹329",
      image: "/api/placeholder/120/160?text=Atomic+Habits",
    },
    {
      title: "Mathematics JEE",
      price: "₹449",
      image: "/api/placeholder/120/160?text=JEE+Math",
    },
    {
      title: "Think and Grow Rich",
      price: "₹279",
      image: "/api/placeholder/120/160?text=Think+Grow+Rich",
    },
    {
      title: "NCERT Chemistry",
      price: "₹189",
      image: "/api/placeholder/120/160?text=NCERT+Chemistry",
    },
  ]

  // Initialize book carousel
  const carousel = document.getElementById("book-carousel")
  if (carousel) {
    // Create book cards
    const bookCards = books
      .map(
        (book) => `
            <div class="book-card">
                <img src="${book.image}" alt="${book.title}" class="book-cover">
                <div class="book-title">${book.title}</div>
                <div class="book-price">${book.price}</div>
            </div>
        `,
      )
      .join("")

    // Duplicate for infinite scroll effect
    carousel.innerHTML = bookCards + bookCards
  }

  // Form submissions with WhatsApp integration
  const whatsappNumber = "+919555417732"

  // Buy form
  const buyForm = document.getElementById("buy-form")
  if (buyForm) {
    buyForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const formData = new FormData(buyForm)

      const message =
        `*New Book Purchase Request*\n\n` +
        `Name: ${formData.get("name")}\n` +
        `Mobile: ${formData.get("mobile")}\n` +
        `Email: ${formData.get("email")}\n` +
        `Class: ${formData.get("class")}\n` +
        `Medium: ${formData.get("medium")}\n` +
        `Books Required: ${formData.get("books")}\n` +
        `Additional Requirements: ${formData.get("additional") || "None"}`

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    })
  }

  // Sell form
  const sellForm = document.getElementById("sell-form")
  if (sellForm) {
    sellForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const formData = new FormData(sellForm)

      const message =
        `*New Book Sale Request*\n\n` +
        `Seller Name: ${formData.get("sellerName")}\n` +
        `Mobile: ${formData.get("mobile")}\n` +
        `Email: ${formData.get("email")}\n` +
        `Book Class: ${formData.get("bookClass")}\n` +
        `Book Name: ${formData.get("bookName")}\n` +
        `Medium: ${formData.get("medium")}\n` +
        `Condition: ${formData.get("condition")}\n` +
        `Actual Price: ₹${formData.get("actualPrice")}\n` +
        `Selling Price: ₹${formData.get("sellingPrice")}\n` +
        `Details: ${formData.get("details") || "None"}`

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    })
  }

  // Rent form
  const rentForm = document.getElementById("rent-form")
  if (rentForm) {
    rentForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const formData = new FormData(rentForm)

      const message =
        `*New Book Rental Request*\n\n` +
        `Name: ${formData.get("name")}\n` +
        `Mobile: ${formData.get("mobile")}\n` +
        `Email: ${formData.get("email")}\n` +
        `Aadhaar: ${formData.get("aadhaar")}\n` +
        `Address: ${formData.get("address")}\n` +
        `House Number: ${formData.get("houseNumber")}\n` +
        `Pickup Address: ${formData.get("pickupAddress") || "Same as above"}\n` +
        `Books Required: ${formData.get("books")}\n` +
        `Duration: ${formData.get("duration")}\n` +
        `Pickup Date: ${formData.get("pickupDate")}`

      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
      window.open(whatsappUrl, "_blank")
    })
  }

  // Add smooth animations on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".animate-fade-in").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})
