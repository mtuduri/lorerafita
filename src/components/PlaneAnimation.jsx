import React from 'react'
import { motion } from 'framer-motion'
import './PlaneAnimation.css'

const PlaneAnimation = () => {
  return (
    <div className="plane-animation-container">
      <motion.div
        className="plane"
        initial={{ x: -100, y: 50, rotate: 0 }}
        animate={{ 
          x: window.innerWidth + 100, 
          y: -50,
          rotate: [0, 5, -5, 0]
        }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 3,
          ease: "easeInOut",
          rotate: {
            duration: 0.5,
            repeat: 6,
            ease: "easeInOut"
          }
        }}
      >
        ✈️
      </motion.div>
      
      <motion.div 
        className="welcome-message"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1>¡Bienvenidos a bordo!</h1>
        <p>Su vuelo al amor está a punto de despegar...</p>
      </motion.div>
    </div>
  )
}

export default PlaneAnimation