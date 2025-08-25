import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Clock, Target, Heart, Zap } from 'lucide-react'

const YogaExercise = () => {
  const [currentExercise, setCurrentExercise] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const exercises = [
    {
      id: 1,
      name: 'Sun Salutation',
      category: 'yoga',
      duration: 300, // 5 minutes
      difficulty: 'Beginner',
      calories: 50,
      icon: '🧘‍♀️',
      description: 'A sequence of yoga poses that energize the body and mind',
      steps: [
        { name: 'Mountain Pose', duration: 30, instruction: 'Stand tall with feet together, arms at sides' },
        { name: 'Forward Fold', duration: 30, instruction: 'Bend forward from hips, reaching toward toes' },
        { name: 'Half Lift', duration: 30, instruction: 'Lift chest halfway, hands on shins' },
        { name: 'Plank Pose', duration: 30, instruction: 'Step back to plank position, body straight' },
        { name: 'Downward Dog', duration: 30, instruction: 'Lift hips, form inverted V shape' },
        { name: 'Forward Fold', duration: 30, instruction: 'Step forward, fold over legs' },
        { name: 'Mountain Pose', duration: 30, instruction: 'Return to standing, arms overhead' },
      ]
    },
    {
      id: 2,
      name: 'Core Workout',
      category: 'exercise',
      duration: 240, // 4 minutes
      difficulty: 'Intermediate',
      calories: 80,
      icon: '💪',
      description: 'Strengthen your core with these effective exercises',
      steps: [
        { name: 'Plank Hold', duration: 45, instruction: 'Hold plank position, engage core' },
        { name: 'Crunches', duration: 45, instruction: 'Lie on back, lift shoulders off ground' },
        { name: 'Russian Twists', duration: 45, instruction: 'Sit with knees bent, twist side to side' },
        { name: 'Leg Raises', duration: 45, instruction: 'Lie on back, raise legs to 90 degrees' },
        { name: 'Mountain Climbers', duration: 60, instruction: 'From plank, alternate knee to chest' },
      ]
    },
    {
      id: 3,
      name: 'Meditation Session',
      category: 'mindfulness',
      duration: 180, // 3 minutes
      difficulty: 'Beginner',
      calories: 20,
      icon: '🧘',
      description: 'Find inner peace with guided meditation',
      steps: [
        { name: 'Find Comfort', duration: 30, instruction: 'Sit comfortably, close eyes' },
        { name: 'Deep Breathing', duration: 60, instruction: 'Breathe deeply, focus on breath' },
        { name: 'Body Scan', duration: 60, instruction: 'Scan body from head to toe' },
        { name: 'Mindful Awareness', duration: 30, instruction: 'Observe thoughts without judgment' },
      ]
    },
    {
      id: 4,
      name: 'Quick Cardio',
      category: 'exercise',
      duration: 300, // 5 minutes
      difficulty: 'Intermediate',
      calories: 100,
      icon: '🏃‍♀️',
      description: 'Get your heart rate up with this quick cardio session',
      steps: [
        { name: 'Jumping Jacks', duration: 60, instruction: 'Jump while raising arms and legs' },
        { name: 'High Knees', duration: 60, instruction: 'Run in place, bring knees to chest' },
        { name: 'Burpees', duration: 60, instruction: 'Squat, jump, plank, repeat' },
        { name: 'Mountain Climbers', duration: 60, instruction: 'From plank, alternate knee to chest' },
        { name: 'Cool Down', duration: 60, instruction: 'Gentle stretching and breathing' },
      ]
    }
  ]

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

  const pauseExercise = () => {
    setIsActive(false)
  }

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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Yoga & Exercise</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Guided workouts and mindfulness sessions
        </p>
      </motion.div>

      {/* Exercise Selection */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {exercises.map((exercise, index) => (
          <motion.div
            key={exercise.id}
            variants={exerciseCardVariants}
            whileHover="hover"
            className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg cursor-pointer transition-all duration-200 ${
              currentExercise === index ? 'ring-2 ring-primary-500' : ''
            }`}
            onClick={() => setCurrentExercise(index)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{exercise.icon}</div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {exercise.difficulty}
                </span>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              {exercise.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {exercise.description}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{Math.floor(exercise.duration / 60)}m</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap className="w-4 h-4" />
                <span>{exercise.calories} cal</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Current Exercise */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{exercises[currentExercise].icon}</div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {exercises[currentExercise].name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {exercises[currentExercise].description}
          </p>
        </div>

        {/* Timer */}
        <div className="text-center mb-6">
          <motion.div 
            className="text-6xl font-bold text-primary-600 mb-4"
            variants={timerVariants}
            animate={isActive ? "pulse" : "initial"}
          >
            {formatTime(timeLeft)}
          </motion.div>
          
          <div className="flex justify-center space-x-4 mb-6">
            {!isActive ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startExercise}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
              >
                <Play className="w-5 h-5 inline mr-2" />
                Start
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={pauseExercise}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
              >
                <Pause className="w-5 h-5 inline mr-2" />
                Pause
              </motion.button>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetExercise}
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-xl transition-colors duration-200"
            >
              <RotateCcw className="w-5 h-5 inline mr-2" />
              Reset
            </motion.button>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(getProgressPercentage())}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-wellness-green to-green-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Current Step */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800 rounded-xl p-4"
          >
            <h4 className="font-semibold text-primary-800 dark:text-primary-200 mb-2">
              Current: {exercises[currentExercise].steps[currentStep].name}
            </h4>
            <p className="text-primary-700 dark:text-primary-300 text-sm">
              {exercises[currentExercise].steps[currentStep].instruction}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Exercise Steps */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Exercise Steps</h3>
        
        <div className="space-y-3">
          {exercises[currentExercise].steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                currentStep === index && isActive
                  ? 'bg-primary-100 dark:bg-primary-900 border-2 border-primary-500'
                  : currentStep > index
                  ? 'bg-green-50 dark:bg-green-900'
                  : 'bg-gray-50 dark:bg-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep === index && isActive
                    ? 'bg-primary-500 text-white'
                    : currentStep > index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">{step.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.instruction}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{step.duration}s</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-wellness-blue to-blue-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-3">💡 Exercise Tips</h3>
        <ul className="space-y-2 text-sm">
          <li>• Listen to your body and don't push beyond your limits</li>
          <li>• Focus on proper form rather than speed</li>
          <li>• Breathe deeply and consistently throughout the exercise</li>
          <li>• Stay hydrated before, during, and after your workout</li>
          <li>• Warm up properly to prevent injuries</li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default YogaExercise
