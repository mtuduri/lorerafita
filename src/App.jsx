import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BoardingPass from './components/BoardingPass'
import FlightInfo from './components/FlightInfo'
import SeatSelection from './components/SeatSelection'
import PlaneAnimation from './components/PlaneAnimation'
import BackgroundAudio from './components/BackgroundAudio'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('boarding')
  const [showPlane, setShowPlane] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPlane(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      <BackgroundAudio />
      
      <div className="clouds">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
      </div>
      
      <AnimatePresence>
        {showPlane && <PlaneAnimation key="plane" />}
      </AnimatePresence>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {currentSection === 'boarding' && (
            <motion.div
              key="boarding"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <BoardingPass onNext={() => setCurrentSection('flight')} />
            </motion.div>
          )}
          
          {currentSection === 'flight' && (
            <motion.div
              key="flight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <FlightInfo onNext={() => setCurrentSection('seats')} />
            </motion.div>
          )}
          
          {currentSection === 'seats' && (
            <motion.div
              key="seats"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <SeatSelection />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App