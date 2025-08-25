import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Home, User, Target, Bell, BarChart3 } from 'lucide-react'
import Confetti from 'react-confetti'
import useStore from './store/useStore'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Habits from './components/Habits'
import Reminders from './components/Reminders'
import Progress from './components/Progress'
import YogaExercise from './components/YogaExercise'

function App() {
  const { isDarkMode, toggleTheme, showCelebration } = useStore()
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const navigationItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'habits', label: 'Habits', icon: Target },
    { id: 'yoga', label: 'Yoga & Exercise', icon: Target },
    { id: 'reminders', label: 'Reminders', icon: Bell },
    { id: 'progress', label: 'Progress', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />
      case 'habits':
        return <Habits />
      case 'yoga':
        return <YogaExercise />
      case 'reminders':
        return <Reminders />
      case 'progress':
        return <Progress />
      case 'profile':
        return <Profile />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className={`min-h-screen gradient-bg transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      {showCelebration && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 glass-effect backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-wellness-purple bg-clip-text text-transparent"
            >
              Wellness Tracker
            </motion.h1>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-200"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 glass-effect backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'text-primary-600 bg-primary-100 dark:bg-primary-900'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pb-20 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

export default App
