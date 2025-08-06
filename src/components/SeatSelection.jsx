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

  // Create seat map (6 seats per row, 10 rows)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const seatsPerRow = 6

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedSeats.length === parseInt(guestInfo.guests)) {
      setShowThankYou(true)
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
            <p><strong>Pasajero:</strong> {guestInfo.name}</p>
            <p><strong>Asientos:</strong> {selectedSeats.join(', ')}</p>
            <p><strong>Número de invitados:</strong> {guestInfo.guests}</p>
          </div>
          <p className="final-message">¡Nos vemos a bordo! 🎉</p>
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
                    const isOccupied = Math.random() < 0.3 // 30% chance of being occupied
                    
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
                    const isOccupied = Math.random() < 0.3
                    
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

              <motion.button
                type="submit"
                className="confirm-button"
                disabled={selectedSeats.length !== parseInt(guestInfo.guests) || !guestInfo.name || !guestInfo.email}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CONFIRMAR RESERVA ✈️
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default SeatSelection