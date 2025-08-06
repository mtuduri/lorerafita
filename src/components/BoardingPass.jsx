import React from 'react'
import { motion } from 'framer-motion'
import './BoardingPass.css'

const BoardingPass = ({ onNext }) => {
  return (
    <motion.div 
      className="boarding-pass-container"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 3.5 }}
    >
      <div className="boarding-pass">
        <div className="boarding-pass-header">
          <div className="airline-logo">
            <motion.div 
              className="heart-plane"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            >
              ✈️💕
            </motion.div>
            <h1 className="airline-font">AEROLÍNEAS DEL AMOR</h1>
          </div>
        </div>
        
        <div className="boarding-pass-body">
          <div className="boarding-pass-left">
            <div className="passenger-info">
              <h2 className="airline-font">PASE DE ABORDAR</h2>
              <div className="flight-header">
                <h3>VUELO ESPECIAL</h3>
                <div className="flight-number">ADA2024</div>
              </div>
            </div>
            
            <div className="wedding-announcement">
              <motion.h2 
                className="couple-names"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.2, duration: 0.6 }}
              >
                Lorena & Rafael
              </motion.h2>
              
              <motion.p 
                className="wedding-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5, duration: 0.6 }}
              >
                Te invitan a abordar el vuelo más importante de sus vidas
              </motion.p>
              
              <motion.p 
                className="tagline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.8, duration: 0.6 }}
              >
                ¡Destino: Para Siempre! 💍
              </motion.p>
            </div>
            
            <motion.button 
              className="continue-button"
              onClick={onNext}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 5.1, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              VER DETALLES DEL VUELO ✈️
            </motion.button>
          </div>
          
          <div className="boarding-pass-right">
            <div className="barcode-section">
              <div className="barcode">
                <div className="barcode-lines">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} className="barcode-line"></div>
                  ))}
                </div>
                <p className="barcode-text">AMOR ETERNO</p>
              </div>
              
              <div className="stub-info">
                <div className="stub-item">
                  <span className="stub-label">VUELO</span>
                  <span className="stub-value">ADA2024</span>
                </div>
                <div className="stub-item">
                  <span className="stub-label">PUERTA</span>
                  <span className="stub-value">❤️</span>
                </div>
                <div className="stub-item">
                  <span className="stub-label">ASIENTO</span>
                  <span className="stub-value">💕</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="boarding-pass-footer">
          <div className="perforated-line"></div>
        </div>
      </div>
    </motion.div>
  )
}

export default BoardingPass