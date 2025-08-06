import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './SeatSelection.css'

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([])
  const [guestInfo, setGuestInfo] = useState({
    name: '',
    email: '',
    phone: '',
    dietary: '',
    guests: 1
  })
  const [showThankYou, setShowThankYou] = useState(false)
  const [bookingData, setBookingData] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState('')

  // Create seat map (6 seats per row, 10 rows)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const seatsPerRow = 6

  // Generate occupied seats once and keep them stable
  const [occupiedSeats] = useState(() => {
    const occupied = new Set()
    rows.forEach(row => {
      for (let seatNum = 1; seatNum <= 6; seatNum++) {
        if (Math.random() < 0.3) { // 30% chance of being occupied
          occupied.add(`${row}${seatNum}`)
        }
      }
    })
    return occupied
  })

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId))
    } else if (selectedSeats.length < guestInfo.guests) {
      setSelectedSeats([...selectedSeats, seatId])
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setGuestInfo(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Reset seat selection if guest count changes
    if (name === 'guests') {
      setSelectedSeats([])
    }
  }



  // Save to local storage
  const saveToLocalStorage = (data) => {
    const bookings = JSON.parse(localStorage.getItem('ada2024-bookings') || '[]')
    const newBooking = {
      ...data,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      confirmationNumber: `ADA${Date.now().toString().slice(-6)}`
    }
    bookings.push(newBooking)
    localStorage.setItem('ada2024-bookings', JSON.stringify(bookings))
    return newBooking
  }

  // Send email via backend
  const sendEmailViaBackend = async (bookingData) => {
    try {
      const response = await fetch('http://localhost:3001/send-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: guestInfo.name,
          email: guestInfo.email,
          selectedSeats,
          guests: guestInfo.guests,
          phone: guestInfo.phone,
          dietary: guestInfo.dietary,
          confirmationNumber: bookingData.confirmationNumber
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      return result;
    } catch (error) {
      console.error('Backend email error:', error);
      throw error;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedSeats.length === parseInt(guestInfo.guests)) {
      setIsSubmitting(true)
      setEmailError('')

      try {
        // Save booking data locally first
        const booking = saveToLocalStorage({
          ...guestInfo,
          selectedSeats,
          flightNumber: 'ADA2024'
        })
        
        setBookingData(booking)

        // Send email via backend
        try {
          await sendEmailViaBackend(booking)
          console.log('Email sent successfully via backend')
        } catch (emailError) {
          console.log('Backend email failed:', emailError.message)
          setEmailError('No se pudo enviar el email de confirmación. Por favor, contacta al +598 96 109 982 para confirmar tu reserva.')
        }

        setShowThankYou(true)
      } catch (error) {
        setEmailError('Error al procesar la reserva. Por favor, intenta nuevamente.')
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  if (showThankYou) {
    return (
      <motion.div 
        className="thank-you-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="thank-you-card">
          <motion.div 
            className="thank-you-plane"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✈️💕
          </motion.div>
          <h1>¡Gracias por confirmar!</h1>
          <p>Tu reserva ha sido confirmada para el vuelo ADA2024</p>
          <div className="confirmation-details">
            <p><strong>Número de confirmación:</strong> {bookingData?.confirmationNumber}</p>
            <p><strong>Pasajero:</strong> {guestInfo.name}</p>
            <p><strong>Asientos:</strong> {selectedSeats.join(', ')}</p>
            <p><strong>Número de invitados:</strong> {guestInfo.guests}</p>
            <p><strong>Email:</strong> {guestInfo.email}</p>
            {!emailError && (
              <p style={{ color: '#27ae60', fontWeight: 'bold' }}>
                ✅ Email de confirmación enviado automáticamente
              </p>
            )}
          </div>
          
          {emailError && (
            <div style={{ 
              backgroundColor: '#fdf2f2', 
              border: '1px solid #e74c3c', 
              borderRadius: '8px', 
              padding: '1.5rem', 
              margin: '1rem 0',
              color: '#c0392b',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '18px', marginBottom: '0.5rem' }}>⚠️ <strong>Error al enviar email</strong></p>
              <p style={{ marginBottom: '1rem' }}>{emailError}</p>
              <div style={{ 
                backgroundColor: '#27ae60', 
                color: 'white', 
                padding: '12px', 
                borderRadius: '6px',
                fontSize: '18px',
                fontWeight: 'bold'
              }}>
                📞 Contactar: +598 96 109 982
              </div>
            </div>
          )}
          
          <p className="final-message" style={{ marginTop: '2rem' }}>¡Nos vemos a bordo! 🎉</p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="seat-selection-container">
      <motion.div 
        className="airplane-cabin"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="cabin-header">
          <h1 className="airline-font">SELECCIÓN DE ASIENTOS</h1>
          <p className="flight-info">Vuelo ADA2024 • Destino: Para Siempre</p>
        </div>

        <div className="cabin-layout">
          <div className="seat-map">
            <div className="seat-legend">
              <div className="legend-item">
                <div className="seat available"></div>
                <span>Disponible</span>
              </div>
              <div className="legend-item">
                <div className="seat selected"></div>
                <span>Seleccionado</span>
              </div>
              <div className="legend-item">
                <div className="seat occupied"></div>
                <span>Ocupado</span>
              </div>
            </div>

            <div className="airplane-seats">
              {rows.map((row, rowIndex) => (
                <motion.div 
                  key={row} 
                  className="seat-row"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: rowIndex * 0.1, duration: 0.5 }}
                >
                  <div className="row-label">{row}</div>
                  {[1, 2, 3].map(seatNum => {
                    const seatId = `${row}${seatNum}`
                    const isSelected = selectedSeats.includes(seatId)
                    const isOccupied = occupiedSeats.has(seatId)
                    
                    return (
                      <motion.button
                        key={seatId}
                        className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : 'available'}`}
                        onClick={() => !isOccupied && handleSeatClick(seatId)}
                        disabled={isOccupied}
                        whileHover={!isOccupied ? { scale: 1.1 } : {}}
                        whileTap={!isOccupied ? { scale: 0.95 } : {}}
                      >
                        {isOccupied ? '❌' : (isSelected ? '💕' : '💺')}
                      </motion.button>
                    )
                  })}
                  
                  <div className="aisle"></div>
                  
                  {[4, 5, 6].map(seatNum => {
                    const seatId = `${row}${seatNum}`
                    const isSelected = selectedSeats.includes(seatId)
                    const isOccupied = occupiedSeats.has(seatId)
                    
                    return (
                      <motion.button
                        key={seatId}
                        className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : 'available'}`}
                        onClick={() => !isOccupied && handleSeatClick(seatId)}
                        disabled={isOccupied}
                        whileHover={!isOccupied ? { scale: 1.1 } : {}}
                        whileTap={!isOccupied ? { scale: 0.95 } : {}}
                      >
                        {isOccupied ? '❌' : (isSelected ? '💕' : '💺')}
                      </motion.button>
                    )
                  })}
                  <div className="row-label">{row}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="passenger-form"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2>INFORMACIÓN DEL PASAJERO</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre Completo *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={guestInfo.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Tu nombre completo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={guestInfo.email}
                  onChange={handleInputChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Teléfono</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={guestInfo.phone}
                  onChange={handleInputChange}
                  placeholder="Tu número de teléfono"
                />
              </div>

              <div className="form-group">
                <label htmlFor="guests">Número de Invitados *</label>
                <select
                  id="guests"
                  name="guests"
                  value={guestInfo.guests}
                  onChange={handleInputChange}
                  required
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} invitado{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dietary">Restricciones Alimentarias</label>
                <textarea
                  id="dietary"
                  name="dietary"
                  value={guestInfo.dietary}
                  onChange={handleInputChange}
                  placeholder="Alergias, vegetariano, vegano, etc."
                  rows="3"
                />
              </div>

              <div className="selected-seats-info">
                <p><strong>Asientos seleccionados:</strong></p>
                <div className="selected-seats-display">
                  {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'Ninguno'}
                </div>
                <p className="seats-needed">
                  Necesitas seleccionar {guestInfo.guests} asiento{guestInfo.guests > 1 ? 's' : ''}
                </p>
              </div>

              {emailError && (
                <div className="error-message" style={{ color: '#e74c3c', marginBottom: '1rem', padding: '0.5rem', backgroundColor: '#fdf2f2', border: '1px solid #e74c3c', borderRadius: '4px' }}>
                  {emailError}
                </div>
              )}

              <motion.button
                type="submit"
                className="confirm-button"
                disabled={selectedSeats.length !== parseInt(guestInfo.guests) || !guestInfo.name || !guestInfo.email || isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                style={{ opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? (
                  <>
                    <span style={{ marginRight: '0.5rem' }}>📧</span>
                    ENVIANDO CONFIRMACIÓN...
                  </>
                ) : (
                  'CONFIRMAR RESERVA ✈️'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default SeatSelection