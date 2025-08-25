import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, TrendingUp, Target, Quote } from 'lucide-react'
import useStore from '../store/useStore'
import { format } from 'date-fns'

const Dashboard = () => {
  const { habits, reminders, userProfile, currentQuote, triggerCelebration } = useStore()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const completedHabits = habits.filter(habit => habit.completed).length
  const totalHabits = habits.length
  const progressPercentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0

  const nextReminder = reminders
    .filter(reminder => reminder.enabled)
    .sort((a, b) => a.time.localeCompare(b.time))
    .find(reminder => {
      const [hours, minutes] = reminder.time.split(':').map(Number)
      const reminderTime = new Date()
      reminderTime.setHours(hours, minutes, 0, 0)
      return reminderTime > currentTime
    })

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

  const progressVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const floatingVariants = {
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
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
      {/* Welcome Section */}
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Good {currentTime.getHours() < 12 ? 'Morning' : currentTime.getHours() < 17 ? 'Afternoon' : 'Evening'}, {userProfile.name}!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {format(currentTime, 'EEEE, MMMM do, yyyy')}
        </p>
      </motion.div>

      {/* Progress Overview */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Today's Progress</h3>
          <Target className="w-6 h-6 text-primary-600" />
        </div>
        
        <div className="text-center mb-4">
          <motion.div 
            className="relative inline-block"
            variants={progressVariants}
            initial="hidden"
            animate="visible"
          >
            <svg className="w-24 h-24 transform -rotate-90">
              <motion.circle
                cx="48"
                cy="48"
                r="36"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-200 dark:text-gray-700"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              <motion.circle
                cx="48"
                cy="48"
                r="36"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 36}`}
                strokeDashoffset={`${2 * Math.PI * 36 * (1 - progressPercentage / 100)}`}
                className="text-primary-600"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progressPercentage / 100 }}
                transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
              />
            </svg>
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                {progressPercentage}%
              </span>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {completedHabits} of {totalHabits} habits completed
          </p>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        <motion.div 
          className="bg-gradient-to-br from-wellness-green to-green-500 rounded-xl p-4 text-white"
          variants={floatingVariants}
          animate="float"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Current Streak</p>
              <p className="text-2xl font-bold">
                {Math.max(...habits.map(h => h.streak), 0)} days
              </p>
            </div>
            <motion.div
              variants={pulseVariants}
              animate="pulse"
            >
              <TrendingUp className="w-8 h-8 opacity-80" />
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-gradient-to-br from-wellness-blue to-blue-500 rounded-xl p-4 text-white"
          variants={floatingVariants}
          animate="float"
          whileHover={{ scale: 1.05, rotate: -2 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Completions</p>
              <p className="text-2xl font-bold">
                {habits.reduce((sum, habit) => sum + habit.totalCompletions, 0)}
              </p>
            </div>
            <motion.div
              variants={pulseVariants}
              animate="pulse"
            >
              <Target className="w-8 h-8 opacity-80" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Motivational Quote */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-wellness-purple to-purple-600 rounded-2xl p-6 text-white">
        <div className="flex items-start space-x-3">
          <Quote className="w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <p className="text-lg italic mb-2">"{currentQuote.text}"</p>
            <p className="text-sm opacity-80">— {currentQuote.author}</p>
          </div>
        </div>
      </motion.div>

      {/* Next Reminder */}
      {nextReminder && (
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Next Reminder</h3>
            <Clock className="w-6 h-6 text-primary-600" />
          </div>
          
          <div className="bg-gradient-to-r from-wellness-orange to-orange-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{nextReminder.title}</p>
                <p className="text-sm opacity-90">{nextReminder.medicine}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{nextReminder.time}</p>
                <p className="text-sm opacity-80">Today</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // This would navigate to habits page
              console.log('Navigate to habits')
            }}
            className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Log Habit
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // This would navigate to reminders page
              console.log('Navigate to reminders')
            }}
            className="bg-wellness-green hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-200"
          >
            Add Reminder
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
