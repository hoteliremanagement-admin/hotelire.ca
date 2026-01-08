import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"

interface BookingDetails {
  id?: string
  bookingId?: string
  guestName: string
  guestEmail: string
  guestPhone: string
  property: string
  room: string
  checkIn: string
  checkOut: string
  guests: number
  adults: number
  children: number
  amount: number
  nights: number
  status: string
  paymentStatus: string
}

export async function generateBookingPDF(booking: BookingDetails) {
  try {
    // Create a temporary container for PDF content
    const container = document.createElement("div")
    container.style.position = "absolute"
    container.style.left = "-9999px"
    container.style.width = "210mm" // A4 width
    container.style.backgroundColor = "white"
    container.style.padding = "20px"
    container.style.fontFamily = "Arial, sans-serif"

    // Generate PDF HTML content
    const bookingId = booking.id || booking.bookingId || "N/A"
    const currentDate = new Date().toLocaleDateString()

    container.innerHTML = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #59A5B2; padding-bottom: 20px;">
          <h1 style="margin: 0 0 5px 0; color: #59A5B2; font-size: 28px;">BOOKING CONFIRMATION</h1>
          <p style="margin: 0; color: #666; font-size: 12px;">Professional Booking Record</p>
        </div>

        <!-- Booking ID & Dates -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div>
            <p style="margin: 0 0 5px 0; color: #666; font-size: 12px; font-weight: bold;">BOOKING ID</p>
            <p style="margin: 0; font-size: 16px; font-weight: bold; color: #59A5B2;">${bookingId}</p>
          </div>
          <div>
            <p style="margin: 0 0 5px 0; color: #666; font-size: 12px; font-weight: bold;">GENERATED</p>
            <p style="margin: 0; font-size: 16px; font-weight: bold;">${currentDate}</p>
          </div>
        </div>

        <!-- Status Badges -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
          <div>
            <p style="margin: 0 0 5px 0; color: #666; font-size: 12px; font-weight: bold;">BOOKING STATUS</p>
            <p style="margin: 0; padding: 8px 12px; display: inline-block; border-radius: 4px; font-weight: bold; background-color: ${getStatusBgColor(booking.status)}; color: ${getStatusTextColor(booking.status)};">
              ${booking.status}
            </p>
          </div>
          <div>
            <p style="margin: 0 0 5px 0; color: #666; font-size: 12px; font-weight: bold;">PAYMENT STATUS</p>
            <p style="margin: 0; padding: 8px 12px; display: inline-block; border-radius: 4px; font-weight: bold; background-color: ${getStatusBgColor(booking.paymentStatus)}; color: ${getStatusTextColor(booking.paymentStatus)};">
              ${booking.paymentStatus}
            </p>
          </div>
        </div>

        <!-- Section: Guest Information -->
        <div style="margin-bottom: 30px;">
          <h2 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #59A5B2; border-bottom: 1px solid #ddd; padding-bottom: 8px;">GUEST INFORMATION</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 30%; color: #666; font-size: 12px;">Full Name</td>
              <td style="padding: 8px 0; font-size: 14px;">${booking.guestName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; font-size: 12px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;">${booking.guestEmail}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; font-size: 12px;">Phone</td>
              <td style="padding: 8px 0; font-size: 14px;">${booking.guestPhone}</td>
            </tr>
          </table>
        </div>

        <!-- Section: Property & Room -->
        <div style="margin-bottom: 30px;">
          <h2 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #59A5B2; border-bottom: 1px solid #ddd; padding-bottom: 8px;">PROPERTY & ROOM</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 30%; color: #666; font-size: 12px;">Property</td>
              <td style="padding: 8px 0; font-size: 14px;">${booking.property}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; font-size: 12px;">Room</td>
              <td style="padding: 8px 0; font-size: 14px;">${booking.room}</td>
            </tr>
          </table>
        </div>

        <!-- Section: Stay Details -->
        <div style="margin-bottom: 30px;">
          <h2 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #59A5B2; border-bottom: 1px solid #ddd; padding-bottom: 8px;">STAY DETAILS</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 30%; color: #666; font-size: 12px;">Check-In</td>
              <td style="padding: 8px 0; font-size: 14px;">${booking.checkIn}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; font-size: 12px;">Check-Out</td>
              <td style="padding: 8px 0; font-size: 14px;">${booking.checkOut}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; font-size: 12px;">Number of Nights</td>
              <td style="padding: 8px 0; font-size: 14px;">${booking.nights} night${booking.nights !== 1 ? "s" : ""}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; font-size: 12px;">Guests</td>
              <td style="padding: 8px 0; font-size: 14px;">${booking.guests} (${booking.adults} adults, ${booking.children} children)</td>
            </tr>
          </table>
        </div>

        <!-- Section: Payment Information -->
        <div style="margin-bottom: 30px; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <h2 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #59A5B2;">PAYMENT INFORMATION</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #666; font-size: 12px; border-bottom: 1px solid #ddd;">Total Amount</td>
              <td style="padding: 8px 0; text-align: right; font-size: 18px; font-weight: bold; color: #FEBC11; border-bottom: 1px solid #ddd;">$${booking.amount.toLocaleString()}</td>
            </tr>
          </table>
        </div>

        <!-- Footer -->
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; color: #999; font-size: 11px;">
          <p style="margin: 0;">This is an official booking record. For inquiries, please contact the property owner.</p>
          <p style="margin: 5px 0 0 0;">Generated on ${currentDate}</p>
        </div>
      </div>
    `

    // Append to body temporarily
    document.body.appendChild(container)

    // Convert to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    })

    // Remove temporary container
    document.body.removeChild(container)

    // Create PDF
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    })

    const imgData = canvas.toDataURL("image/png")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pdfWidth
    const imgHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)

    // Download PDF
    const fileName = `Booking_${bookingId}_${new Date().toISOString().split("T")[0]}.pdf`
    pdf.save(fileName)
  } catch (error) {
    console.error("Error generating PDF:", error)
    throw error
  }
}

function getStatusBgColor(status: string): string {
  switch (status) {
    case "CONFIRMED":
    case "COMPLETED":
      return "#dcfce7"
    case "PENDING":
      return "#fef3c7"
    case "CANCELLED":
      return "#fee2e2"
    default:
      return "#f3f4f6"
  }
}

function getStatusTextColor(status: string): string {
  switch (status) {
    case "CONFIRMED":
    case "COMPLETED":
      return "#166534"
    case "PENDING":
      return "#b45309"
    case "CANCELLED":
      return "#991b1b"
    default:
      return "#374151"
  }
}
