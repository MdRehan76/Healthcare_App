import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Plus, Minus, Target, TrendingUp } from 'lucide-react'
import useStore from '../store/useStore'

const Habits = () => {
  const { habits, toggleHabit, updateHabitProgress, triggerCelebration } = useStore()
  const [selectedHabit, setSelectedHabit] = useState(null)

  const handleHabitToggle = (habitId) => {
    const habit = habits.find(h => h.id === habitId)
    if (!habit.completed) {
      triggerCelebration()
    }
    toggleHabit(habitId)
  }

  const handleProgressUpdate = (habitId, increment) => {
    const habit = habits.find(h => h.id === habitId)
    if (habit && habit.target) {
      const newProgress = Math.max(0, Math.min(habit.target, habit.current + increment))
      updateHabitProgress(habitId, newProgress)
      
      if (newProgress >= habit.target && !habit.completed) {
        triggerCelebration()
      }
    }
  }

  const getColorClass = (color) => {
    const colorMap = {
      'wellness-green': 'from-wellness-green to-green-500',
      'wellness-blue': 'from-wellness-blue to-blue-500',
      'wellness-purple': 'from-wellness-purple to-purple-500',
      'wellness-orange': 'from-wellness-orange to-orange-500',
      'wellness-pink': 'from-wellness-pink to-pink-500',
    }
    return colorMap[color] || 'from-gray-500 to-gray-600'
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

  const cardHoverVariants = {
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  }

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: (progress) => ({
      width: `${progress}%`,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    })
  }

  const checkmarkVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "backOut"
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
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Daily Habits</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your wellness journey one habit at a time
        </p>
      </motion.div>

      {/* Progress Summary */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Today's Progress</h3>
          <Target className="w-6 h-6 text-primary-600" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary-600">
              {habits.filter(h => h.completed).length}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-wellness-green">
              {Math.max(...habits.map(h => h.streak), 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Best Streak</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-wellness-blue">
              {habits.reduce((sum, h) => sum + h.totalCompletions, 0)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          </div>
        </div>
      </motion.div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {habits.map((habit, index) => (
            <motion.div
              key={habit.id}
              variants={itemVariants}
              layout
              whileHover="hover"
              variants={cardHoverVariants}
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg card-hover relative overflow-hidden ${
                habit.completed ? 'ring-2 ring-wellness-green' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`text-3xl ${habit.completed ? 'animate-bounce-gentle' : ''}`}>
                    {habit.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">{habit.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{habit.category}</p>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleHabitToggle(habit.id)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                    habit.completed
                      ? 'bg-wellness-green text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-wellness-green hover:text-white'
                  }`}
                >
                  <motion.div
                    variants={checkmarkVariants}
                    initial="hidden"
                    animate={habit.completed ? "visible" : "hidden"}
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                </motion.button>
              </div>

              {/* Progress Bar for habits with targets */}
              {habit.target && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress</span>
                    <span>{habit.current}/{habit.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-wellness-blue to-blue-500 h-2 rounded-full"
                      custom={(habit.current / habit.target) * 100}
                      variants={progressBarVariants}
                      initial="hidden"
                      animate="visible"
                    />
                  </div>
                  
                  <div className="flex justify-center space-x-2 mt-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleProgressUpdate(habit.id, -1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-red-100 dark:hover:bg-red-900"
                    >
                      <Minus className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleProgressUpdate(habit.id, 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-green-100 dark:hover:bg-green-900"
                    >
                      <Plus className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Streak Information */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-wellness-green" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {habit.streak} day{habit.streak !== 1 ? 's' : ''} streak
                  </span>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                  <p className="font-semibold text-gray-800 dark:text-white">{habit.totalCompletions}</p>
                </div>
              </div>

              {/* Completion Animation */}
              {habit.completed && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-wellness-green/20 to-green-500/20 rounded-2xl pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Motivational Message */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-wellness-purple to-purple-600 rounded-2xl p-6 text-white text-center">
        <h3 className="text-xl font-semibold mb-2">Keep Going!</h3>
        <p className="text-sm opacity-90">
          Every completed habit brings you closer to your wellness goals. 
          Consistency is the key to lasting change.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Habits
