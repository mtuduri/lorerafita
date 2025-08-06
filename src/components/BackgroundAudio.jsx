import React, { useState, useRef, useEffect } from 'react'
import './BackgroundAudio.css'

const BackgroundAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef(null)

  // Note: Since we can't directly use YouTube audio due to terms of service,
  // you'll need to replace this with an actual audio file
  // For now, I'll use a placeholder that you can replace with your audio file
  const audioSrc = "/audio/background-music.mp3" // Replace with your audio file

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = 0.3 // Set volume to 30%
      audio.loop = true

      // Set up event listeners
      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)
      const handleLoadedData = () => {
        setIsLoaded(true)
        // Try autoplay when audio is loaded
        audio.play().then(() => {
          console.log('Autoplay successful')
        }).catch(e => {
          console.log('Autoplay blocked by browser:', e.message)
        })
      }

      audio.addEventListener('play', handlePlay)
      audio.addEventListener('pause', handlePause)
      audio.addEventListener('loadeddata', handleLoadedData)

      return () => {
        audio.removeEventListener('play', handlePlay)
        audio.removeEventListener('pause', handlePause)
        audio.removeEventListener('loadeddata', handleLoadedData)
      }
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(e => {
        console.log('Play failed:', e.message)
      })
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    audio.muted = !audio.muted
    setIsMuted(audio.muted)
  }

  // Auto-play on first user interaction if autoplay was blocked
  useEffect(() => {
    let hasStarted = false

    const handleUserInteraction = () => {
      const audio = audioRef.current
      if (audio && !hasStarted && isLoaded && !isPlaying) {
        hasStarted = true
        audio.play().then(() => {
          console.log('Started playing after user interaction')
        }).catch(e => {
          console.log('Failed to start after interaction:', e.message)
        })
      }
    }

    if (isLoaded && !isPlaying) {
      document.addEventListener('click', handleUserInteraction, { once: true })
      document.addEventListener('touchstart', handleUserInteraction, { once: true })
      document.addEventListener('keydown', handleUserInteraction, { once: true })
    }

    return () => {
      document.removeEventListener('click', handleUserInteraction)
      document.removeEventListener('touchstart', handleUserInteraction)
      document.removeEventListener('keydown', handleUserInteraction)
    }
  }, [isLoaded, isPlaying])

  return (
    <div className="background-audio">
      <audio
        ref={audioRef}
        preload="auto"
        src={audioSrc}
      >
        <source src={audioSrc} type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
      
      <div className="audio-controls">
        <button 
          className={`audio-btn ${isPlaying ? 'playing' : 'paused'}`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
          disabled={!isLoaded}
        >
          {!isLoaded ? '⏳' : isPlaying ? '⏸️' : '▶️'}
        </button>
        
        <button 
          className={`audio-btn ${isMuted ? 'muted' : 'unmuted'}`}
          onClick={toggleMute}
          aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
          disabled={!isLoaded}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>
      
      {/* Debug info - remove this in production */}
      {/* <div style={{
        position: 'fixed',
        top: '70px',
        right: '20px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 1001
      }}>
        <div>Loaded: {isLoaded ? '✅' : '❌'}</div>
        <div>Playing: {isPlaying ? '✅' : '❌'}</div>
        <div>Muted: {isMuted ? '✅' : '❌'}</div>
      </div> */}
    </div>
  )
}

export default BackgroundAudio