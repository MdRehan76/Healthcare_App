import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Award, Calendar, Target, BarChart3, Star } from 'lucide-react'
import useStore from '../store/useStore'

const Progress = () => {
  const { habits } = useStore()
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const completedHabits = habits.filter(habit => habit.completed).length
  const totalHabits = habits.length
  const progressPercentage = totalHabits > 0 ? Math.round((completedHabits / totalHabits) * 100) : 0

  const bestStreak = Math.max(...habits.map(h => h.streak), 0)
  const totalCompletions = habits.reduce((sum, habit) => sum + habit.totalCompletions, 0)
  const averageCompletion = habits.length > 0 ? Math.round(totalCompletions / habits.length) : 0

  // Calculate weekly progress (mock data for demonstration)
  const weeklyData = [
    { day: 'Mon', completed: 6, total: 8 },
    { day: 'Tue', completed: 7, total: 8 },
    { day: 'Wed', completed: 5, total: 8 },
    { day: 'Thu', completed: 8, total: 8 },
    { day: 'Fri', completed: 6, total: 8 },
    { day: 'Sat', completed: 7, total: 8 },
    { day: 'Sun', completed: 4, total: 8 },
  ]

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

  const getAchievementLevel = (streak) => {
    if (streak >= 30) return { level: 'Master', color: 'from-yellow-400 to-yellow-600', icon: '🏆' }
    if (streak >= 21) return { level: 'Expert', color: 'from-purple-400 to-purple-600', icon: '⭐' }
    if (streak >= 14) return { level: 'Advanced', color: 'from-blue-400 to-blue-600', icon: '🔥' }
    if (streak >= 7) return { level: 'Intermediate', color: 'from-green-400 to-green-600', icon: '🌱' }
    return { level: 'Beginner', color: 'from-gray-400 to-gray-600', icon: '🌱' }
  }

  const achievement = getAchievementLevel(bestStreak)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Progress & Achievements</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Track your wellness journey and celebrate your achievements
        </p>
      </motion.div>

      {/* Overall Progress */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Overall Progress</h3>
          <BarChart3 className="w-6 h-6 text-primary-600" />
        </div>
        
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
                className="text-primary-600 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div>
                <span className="text-3xl font-bold text-gray-800 dark:text-white block">
                  {progressPercentage}%
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Complete
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-primary-600">{completedHabits}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-wellness-green">{totalHabits}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-wellness-blue">{averageCompletion}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average</p>
          </div>
        </div>
      </motion.div>

      {/* Achievement Level */}
      <motion.div variants={itemVariants} className={`bg-gradient-to-r ${achievement.color} rounded-2xl p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">Achievement Level</h3>
            <p className="text-3xl font-bold mb-1">{achievement.level}</p>
            <p className="text-sm opacity-90">Best streak: {bestStreak} days</p>
          </div>
          <div className="text-6xl">{achievement.icon}</div>
        </div>
      </motion.div>

      {/* Weekly Progress Chart */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Weekly Progress</h3>
          <div className="flex space-x-2">
            {['week', 'month'].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedPeriod === period
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          {weeklyData.map((day, index) => {
            const percentage = day.total > 0 ? (day.completed / day.total) * 100 : 0
            return (
              <div key={day.day} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {day.day}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span>{day.completed}/{day.total}</span>
                    <span>{Math.round(percentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-wellness-green to-green-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Habit Performance */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Habit Performance</h3>
        
        <div className="space-y-4">
          {habits
            .sort((a, b) => b.streak - a.streak)
            .slice(0, 5)
            .map((habit, index) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{habit.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">{habit.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {habit.streak} day{habit.streak !== 1 ? 's' : ''} streak
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4 text-wellness-green" />
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {habit.totalCompletions}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">total</p>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-wellness-green to-green-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Best Streak</p>
              <p className="text-2xl font-bold">{bestStreak} days</p>
            </div>
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-wellness-blue to-blue-500 rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Completions</p>
              <p className="text-2xl font-bold">{totalCompletions}</p>
            </div>
            <Award className="w-8 h-8 opacity-80" />
          </div>
        </div>
      </motion.div>

      {/* Motivational Message */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-wellness-purple to-purple-600 rounded-2xl p-6 text-white text-center">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Star className="w-6 h-6" />
          <h3 className="text-xl font-semibold">Keep Up the Great Work!</h3>
          <Star className="w-6 h-6" />
        </div>
        <p className="text-sm opacity-90">
          Consistency is the key to lasting change. Every day you complete your habits, 
          you're building a healthier, happier version of yourself.
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Progress
