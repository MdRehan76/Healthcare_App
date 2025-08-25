// YogaExercise.jsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Clock, Target, Heart, Zap } from 'lucide-react'

const YogaExercise = () => {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const exercises = [ /* ... your exercise array unchanged ... */ ]

  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsActive(false)
      if (currentStep < exercises[currentExercise].steps.length - 1) {
        setCurrentStep(currentStep + 1)
        setTimeLeft(exercises[currentExercise].steps[currentStep + 1].duration)
      }
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft, currentExercise, currentStep])

  // ✅ Keep only one set of variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const exerciseCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.2
      }
    }
  }

  const timerVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const startExercise = () => {
    setTimeLeft(exercises[currentExercise].steps[0].duration)
    setCurrentStep(0)
    setIsActive(true)
  }

  const pauseExercise = () => setIsActive(false)

  const resetExercise = () => {
    setIsActive(false)
    setTimeLeft(0)
    setCurrentStep(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    const totalSteps = exercises[currentExercise].steps.length
    return ((currentStep + 1) / totalSteps) * 100
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* ---- your JSX content remains unchanged ---- */}
    </motion.div>
  )
}

export default YogaExercise
