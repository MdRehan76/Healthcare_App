import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Clock, Plus, Edit, Trash2, Pill, ToggleLeft, ToggleRight } from 'lucide-react'
import useStore from '../store/useStore'

const Reminders = () => {
  const { reminders, addReminder, updateReminder, deleteReminder } = useStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingReminder, setEditingReminder] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    time: '09:00',
    medicine: '',
    type: 'medicine',
    enabled: true
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingReminder) {
      updateReminder(editingReminder.id, formData)
      setEditingReminder(null)
    } else {
      addReminder(formData)
    }
    setFormData({
      title: '',
      time: '09:00',
      medicine: '',
      type: 'medicine',
      enabled: true
    })
    setShowAddForm(false)
  }

  const handleEdit = (reminder) => {
    setEditingReminder(reminder)
    setFormData({
      title: reminder.title,
      time: reminder.time,
      medicine: reminder.medicine || '',
      type: reminder.type,
      enabled: reminder.enabled
    })
    setShowAddForm(true)
  }

  const handleDelete = (reminderId) => {
    if (window.confirm('Are you sure you want to delete this reminder?')) {
      deleteReminder(reminderId)
    }
  }

  const toggleReminder = (reminderId, enabled) => {
    updateReminder(reminderId, { enabled: !enabled })
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
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Reminders</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Never miss your important wellness activities
        </p>
      </motion.div>

      {/* Add Reminder Button */}
      <motion.div variants={itemVariants} className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="w-5 h-5 inline mr-2" />
          Add New Reminder
        </motion.button>
      </motion.div>

      {/* Add/Edit Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              {editingReminder ? 'Edit Reminder' : 'Add New Reminder'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reminder Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Take Medicine"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Medicine Name (Optional)
                </label>
                <input
                  type="text"
                  value={formData.medicine}
                  onChange={(e) => setFormData({ ...formData, medicine: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Sugar Medicine, BP Medicine"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Enable Reminder
                </span>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, enabled: !formData.enabled })}
                  className="flex items-center"
                >
                  {formData.enabled ? (
                    <ToggleRight className="w-8 h-8 text-wellness-green" />
                  ) : (
                    <ToggleLeft className="w-8 h-8 text-gray-400" />
                  )}
                </button>
              </div>

              <div className="flex space-x-3 pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  {editingReminder ? 'Update' : 'Add'} Reminder
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingReminder(null)
                    setFormData({
                      title: '',
                      time: '09:00',
                      medicine: '',
                      type: 'medicine',
                      enabled: true
                    })
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reminders List */}
      <div className="space-y-4">
        <AnimatePresence>
          {reminders.map((reminder, index) => (
            <motion.div
              key={reminder.id}
              variants={itemVariants}
              layout
              className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg card-hover ${
                !reminder.enabled ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${
                    reminder.enabled 
                      ? 'bg-gradient-to-r from-wellness-orange to-orange-500' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}>
                    <Pill className={`w-6 h-6 ${reminder.enabled ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">{reminder.title}</h4>
                    {reminder.medicine && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{reminder.medicine}</p>
                    )}
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{reminder.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleReminder(reminder.id, reminder.enabled)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    {reminder.enabled ? (
                      <Bell className="w-5 h-5 text-wellness-green" />
                    ) : (
                      <Bell className="w-5 h-5 text-gray-400" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEdit(reminder)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Edit className="w-5 h-5 text-primary-600" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(reminder.id)}
                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </motion.button>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    reminder.enabled ? 'bg-wellness-green' : 'bg-gray-400'
                  }`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {reminder.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
                
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Medicine Reminder
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {reminders.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
              No reminders yet
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              Add your first reminder to stay on track with your wellness goals
            </p>
          </motion.div>
        )}
      </div>

      {/* Tips Section */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-wellness-blue to-blue-600 rounded-2xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-3">💡 Reminder Tips</h3>
        <ul className="space-y-2 text-sm">
          <li>• Set reminders for your medicine at consistent times</li>
          <li>• Use descriptive titles to remember what each reminder is for</li>
          <li>• Enable notifications to never miss important activities</li>
          <li>• Review and update your reminders regularly</li>
        </ul>
      </motion.div>
    </motion.div>
  )
}

export default Reminders
