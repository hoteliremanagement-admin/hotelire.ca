import { MapPin } from "lucide-react"

interface InvoicePrintProps {
  data: any
}

export function InvoicePrint({ data }: InvoicePrintProps) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleDateString("en-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="invoice-print hidden">
      <div className="invoice-container">
        {/* Header */}
        <div className="invoice-header">
          <div className="header-content">
            <h1 className="invoice-title">BOOKING CONFIRMATION</h1>
            <p className="confirmation-id">
              Confirmation ID: <strong>{data.confirmationId}</strong>
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="invoice-content">
          {/* Property Section */}
          <section className="invoice-section">
            <h2 className="section-title">PROPERTY DETAILS</h2>
            <div className="property-info">
              {data.property.image && (
                <div className="property-image">
                  <img src={data.property.image || "/placeholder.svg"} alt={data.property.name} />
                </div>
              )}
              <div className="property-details">
                <h3 className="property-name">{data.property.name}</h3>
                {data.property.subtitle && <p className="property-subtitle">{data.property.subtitle}</p>}
                <p className="property-address">
                  <MapPin className="inline-icon" />
                  {data.property.address}
                </p>
                <p className="postal-code">{data.property.postalCode}</p>
              </div>
            </div>
          </section>

          {/* Guest Information */}
          <section className="invoice-section">
            <h2 className="section-title">GUEST INFORMATION</h2>
            <div className="guest-info">
              <div className="info-row">
                <span className="label">Name:</span>
                <span className="value">
                  {data.User.firstName} {data.User.lastName}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{data.User.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Phone:</span>
                <span className="value">{data.User.phone}</span>
              </div>
            </div>
          </section>

          {/* Booking Details */}
          <section className="invoice-section">
            <h2 className="section-title">BOOKING DETAILS</h2>
            <div className="booking-grid">
              <div className="booking-item">
                <span className="detail-label">Booking ID</span>
                <span className="detail-value">{data.booking.bookingId}</span>
              </div>
              <div className="booking-item">
                <span className="detail-label">Booking Date</span>
                <span className="detail-value">{formatDate(data.booking.createdAt)}</span>
              </div>
              <div className="booking-item">
                <span className="detail-label">Check-In</span>
                <span className="detail-value">{formatDate(data.dates.checkIn)}</span>
              </div>
              <div className="booking-item">
                <span className="detail-label">Check-In Time</span>
                <span className="detail-value">{data.property.checkInTime}</span>
              </div>
              <div className="booking-item">
                <span className="detail-label">Check-Out</span>
                <span className="detail-value">{formatDate(data.dates.checkOut)}</span>
              </div>
              <div className="booking-item">
                <span className="detail-label">Check-Out Time</span>
                <span className="detail-value">{data.property.checkOutTime}</span>
              </div>
              <div className="booking-item">
                <span className="detail-label">Number of Nights</span>
                <span className="detail-value">{data.dates.nights}</span>
              </div>
              <div className="booking-item">
                <span className="detail-label">Guests</span>
                <span className="detail-value">
                  {data.guests.adults} {data.guests.adults === 1 ? "Adult" : "Adults"}
                  {data.guests.children > 0 &&
                    `, ${data.guests.children} ${data.guests.children === 1 ? "Child" : "Children"}`}
                </span>
              </div>
            </div>
          </section>

          {/* Rooms Table */}
          <section className="invoice-section">
            <h2 className="section-title">ROOM DETAILS</h2>
            <table className="rooms-table">
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Qty</th>
                  <th>Price/Night</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {data.rooms.map((room: any) => (
                  <tr key={room.bookingRoomId}>
                    <td>
                      <div className="room-cell">
                        {room.pic1 && (
                          <img src={room.pic1 || "/placeholder.svg"} alt={room.roomName} className="room-thumbnail" />
                        )}
                        <span>{room.roomName}</span>
                      </div>
                    </td>
                    <td>{room.roomType}</td>
                    <td>{room.quantity}</td>
                    <td>CAD {room.pricePerNight}</td>
                    <td className="subtotal-cell">CAD {room.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Payment Details */}
          <section className="invoice-section">
            <h2 className="section-title">PAYMENT DETAILS</h2>
            <div className="payment-box">
              <div className="payment-row">
                <span className="label">Payment Method:</span>
                <span className="value">{data.payment.paymentMethod}</span>
              </div>
              <div className="payment-row">
                <span className="label">Payment Status:</span>
                <span className="value status-paid">✓ {data.payment.paymentStatus}</span>
              </div>
              <div className="payment-row total">
                <span className="label">Total Amount:</span>
                <span className="amount">
                  {data.payment.currency} {data.payment.total}
                </span>
              </div>
            </div>
          </section>

          {/* Property Owner Contact */}
          <section className="invoice-section">
            <h2 className="section-title">PROPERTY CONTACT INFORMATION</h2>
            <div className="contact-info">
              <div className="info-row">
                <span className="label">Owner Name:</span>
                <span className="value">
                  {data.property.firstName} {data.property.lastName}
                </span>
              </div>
              <div className="info-row">
                <span className="label">Email:</span>
                <span className="value">{data.property.email}</span>
              </div>
              <div className="info-row">
                <span className="label">Phone:</span>
                <span className="value">{data.property.phoneno}</span>
              </div>
            </div>
          </section>

          {/* Thank You Section */}
          <section className="invoice-section thank-you-section">
            <div className="thank-you-content">
              <h2 className="thank-you-title">Thank You for Your Booking!</h2>
              <p className="thank-you-message">
                We appreciate your business and look forward to hosting you. If you have any questions or need
                assistance, please don't hesitate to contact us.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="invoice-footer">
          <p className="footer-text">
            For support and assistance, please reach out to the property owner using the contact information provided
            above.
          </p>
          <p className="footer-note">This is an automated confirmation. Please retain for your records.</p>
        </div>
      </div>
    </div>
  )
}
