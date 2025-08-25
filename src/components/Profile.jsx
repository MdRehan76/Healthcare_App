import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Edit, Save, X, Heart, Activity, Target, Award } from 'lucide-react'
import useStore from '../store/useStore'

const Profile = () => {
  const { userProfile, updateProfile } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userProfile)

  const handleSave = () => {
    updateProfile(formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData(userProfile)
    setIsEditing(false)
  }

  const calculateBMI = () => {
    const heightInMeters = userProfile.height / 100
    const bmi = userProfile.weight / (heightInMeters * heightInMeters)
    return bmi.toFixed(1)
  }

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' }
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' }
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' }
    return { category: 'Obese', color: 'text-red-600' }
  }

  const bmi = calculateBMI()
  const bmiCategory = getBMICategory(bmi)

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
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Profile</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your personal information and health metrics
        </p>
      </motion.div>

      {/* Profile Card */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Personal Information</h3>
              <p className="text-gray-600 dark:text-gray-400">Update your details</p>
            </div>
          </div>
          
          {!isEditing ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-600 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200"
            >
              <Edit className="w-5 h-5" />
            </motion.button>
          ) : (
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="p-2 rounded-lg bg-green-100 dark:bg-green-900 text-green-600 hover:bg-green-200 dark:hover:bg-green-800 transition-colors duration-200"
              >
                <Save className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCancel}
                className="p-2 rounded-lg bg-red-100 dark:bg-red-900 text-red-600 hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-white font-medium">{userProfile.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-white font-medium">{userProfile.age} years</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="cm"
              />
            ) : (
              <p className="text-gray-800 dark:text-white font-medium">{userProfile.height} cm</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight
            </label>
            {isEditing ? (
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="kg"
              />
            ) : (
              <p className="text-gray-800 dark:text-white font-medium">{userProfile.weight} kg</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-white font-medium">{userProfile.email}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Health Metrics */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Health Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-wellness-green to-green-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">BMI</p>
                <p className="text-2xl font-bold">{bmi}</p>
                <p className="text-sm opacity-80">{bmiCategory.category}</p>
              </div>
              <Heart className="w-8 h-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-wellness-blue to-blue-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Height</p>
                <p className="text-2xl font-bold">{userProfile.height}cm</p>
                <p className="text-sm opacity-80">{(userProfile.height / 100).toFixed(2)}m</p>
              </div>
              <Activity className="w-8 h-8 opacity-80" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-wellness-purple to-purple-500 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Weight</p>
                <p className="text-2xl font-bold">{userProfile.weight}kg</p>
                <p className="text-sm opacity-80">{(userProfile.weight * 2.20462).toFixed(1)}lbs</p>
              </div>
              <Target className="w-8 h-8 opacity-80" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Wellness Goals */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Wellness Goals</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-wellness-green rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">Daily Exercise</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">30 minutes of physical activity</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Target</p>
              <p className="font-semibold text-gray-800 dark:text-white">30 min</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-wellness-blue rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">Water Intake</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Stay hydrated throughout the day</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Target</p>
              <p className="font-semibold text-gray-800 dark:text-white">8 glasses</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-wellness-purple rounded-full flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-white">Sleep Quality</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get adequate rest for recovery</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Target</p>
              <p className="font-semibold text-gray-800 dark:text-white">8 hours</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Motivational Message */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-wellness-purple to-purple-600 rounded-2xl p-6 text-white text-center">
        <h3 className="text-xl font-semibold mb-2">Your Wellness Journey</h3>
        <p className="text-sm opacity-90">
          Every step you take towards better health is a victory. 
          Keep tracking, stay motivated, and celebrate your progress!
        </p>
      </motion.div>
    </motion.div>
  )
}

export default Profile
