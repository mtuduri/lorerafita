import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './FlightInfo.css'

const FlightInfo = ({ onNext }) => {
  const [copiedAccount, setCopiedAccount] = useState(null)

  const copyToClipboard = async (text, accountType) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAccount(accountType)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="flight-info-container">
      <motion.div
        className="flight-info-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flight-header">
          <motion.div
            className="flight-status"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="status-indicator">🟢</span>
            <span className="status-text">VUELO CONFIRMADO</span>
          </motion.div>

          <h1 className="flight-title airline-font">INFORMACIÓN DEL VUELO</h1>
        </div>

        <div className="flight-details">
          <div className="route-section">
            <motion.div
              className="departure"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="location-code">SOL</div>
              <div className="location-name">Soltería</div>
              <div className="time">21:00</div>
            </motion.div>

            <motion.div
              className="flight-path"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="flight-line">
                <motion.div
                  className="plane-icon"
                  animate={{
                    x: [0, 10, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ✈️
                </motion.div>
              </div>
              <div className="flight-duration">Duración: Para Siempre</div>
            </motion.div>

            <motion.div
              className="arrival"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="location-code">MAT</div>
              <div className="location-name">Matrimonio</div>
              <div className="time">04:00</div>
            </motion.div>
          </div>

          <motion.div
            className="wedding-details"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <h2 className="details-title">DETALLES DEL EVENTO</h2>

            <div className="details-grid">
              <div className="detail-item">
                <div className="detail-icon">📅</div>
                <div className="detail-content">
                  <div className="detail-label">FECHA</div>
                  <div className="detail-value">04/10/2025</div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">🕐</div>
                <div className="detail-content">
                  <div className="detail-label">HORA</div>
                  <div className="detail-value">21:00</div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">⛪</div>
                <div className="detail-content">
                  <div className="detail-label">CEREMONIA</div>
                  <div className="detail-value">
                    <a 
                      className="directions-link" 
                      target='_blank' 
                      href="https://maps.app.goo.gl/xH132ZyuWUV4iZx26"
                    >
                      <span className="venue-name">Marquis Fiestas y Eventos</span>
                      <span className="directions-hint">
                        <span className="directions-icon">📍</span>
                        Toca para ver en Google Maps
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="detail-item">
                <div className="detail-icon">👗</div>
                <div className="detail-content">
                  <div className="detail-label">CÓDIGO DE VESTIMENTA</div>
                  <div className="detail-value">Elegante / Formal</div>
                </div>
              </div>
            </div>

            <div className="detail-item gifts-section full-width">
                <div className="detail-icon">🎁</div>
                <div className="detail-content">
                  <div className="detail-label">REGALOS</div>
                  <div className="detail-value">Su presencia es nuestro regalo</div>
                  
                  <div className="bank-transfer-section">
                    <div className="bank-header">
                      <img 
                        src="https://companieslogo.com/img/orig/BSBR-9870d28e.png?t=1720244491" 
                        alt="Banco Santander" 
                        className="bank-logo"
                      />
                      <span className="bank-name">Banco Santander</span>
                    </div>
                    
                    <div className="transfer-options">
                      <div className="transfer-option">
                        <h4>Transferencias dentro de Santander</h4>
                        <div className="account-info">
                          <div className="account-row">
                            <span className="account-label">Cuenta:</span>
                            <div className="account-value-container">
                              <span className="account-number">1205969280</span>
                              <button 
                                className={`copy-btn ${copiedAccount === 'santander' ? 'copied' : ''}`}
                                onClick={() => copyToClipboard('1205969280', 'santander')}
                                title="Copiar número de cuenta"
                              >
                                {copiedAccount === 'santander' ? '✓' : '📋'}
                              </button>
                            </div>
                          </div>
                          <div className="account-row">
                            <span className="account-label">Moneda:</span>
                            <span className="account-value">UYU</span>
                          </div>
                          <div className="account-row">
                            <span className="account-label">Sucursal:</span>
                            <span className="account-value">17 - Ciudad De La Costa</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="transfer-option">
                        <h4>Transferencias desde otros bancos</h4>
                        <div className="account-info">
                          <div className="account-row">
                            <span className="account-label">Cuenta:</span>
                            <div className="account-value-container">
                              <span className="account-number">0017001205969280</span>
                              <button 
                                className={`copy-btn ${copiedAccount === 'other' ? 'copied' : ''}`}
                                onClick={() => copyToClipboard('0017001205969280', 'other')}
                                title="Copiar número de cuenta"
                              >
                                {copiedAccount === 'other' ? '✓' : '📋'}
                              </button>
                            </div>
                          </div>
                          <div className="account-row">
                            <span className="account-label">Moneda:</span>
                            <span className="account-value">UYU</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </motion.div>

          <motion.div
            className="special-notes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.6 }}
          >
            <h3>📝 INSTRUCCIONES ESPECIALES</h3>
            <ul>
              <li>• Favor de confirmar asistencia</li>
              <li>• Se servirá cena y barra libre</li>
              <li>• Para alergias alimentarias, contactar a los novios</li>
            </ul>
          </motion.div>

          <motion.button
            className="boarding-button"
            onClick={onNext}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            CONFIRMAR ASISTENCIA 🎫
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

export default FlightInfo