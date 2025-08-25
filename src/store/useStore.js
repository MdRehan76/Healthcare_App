import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useStore = create(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

      // User Profile
      userProfile: {
        name: 'Wellness Warrior',
        age: 25,
        height: 170,
        weight: 70,
        email: 'user@example.com',
      },
      updateProfile: (profile) => set({ userProfile: { ...get().userProfile, ...profile } }),

      // Habits
      habits: [
        {
          id: 1,
          name: 'Exercise',
          category: 'fitness',
          icon: '💪',
          color: 'wellness-green',
          completed: false,
          streak: 0,
          totalCompletions: 0,
        },
        {
          id: 2,
          name: 'Meditation',
          category: 'mindfulness',
          icon: '🧘',
          color: 'wellness-blue',
          completed: false,
          streak: 0,
          totalCompletions: 0,
        },
        {
          id: 3,
          name: 'Yoga',
          category: 'fitness',
          icon: '🧘‍♀️',
          color: 'wellness-purple',
          completed: false,
          streak: 0,
          totalCompletions: 0,
        },
        {
          id: 4,
          name: 'Water Intake',
          category: 'health',
          icon: '💧',
          color: 'wellness-blue',
          completed: false,
          streak: 0,
          totalCompletions: 0,
          target: 8, // glasses
          current: 0,
        },
        {
          id: 5,
          name: 'Breakfast',
          category: 'nutrition',
          icon: '🍳',
          color: 'wellness-orange',
          completed: false,
          streak: 0,
          totalCompletions: 0,
        },
        {
          id: 6,
          name: 'Lunch',
          category: 'nutrition',
          icon: '🥗',
          color: 'wellness-green',
          completed: false,
          streak: 0,
          totalCompletions: 0,
        },
        {
          id: 7,
          name: 'Dinner',
          category: 'nutrition',
          icon: '🍽️',
          color: 'wellness-purple',
          completed: false,
          streak: 0,
          totalCompletions: 0,
        },
        {
          id: 8,
          name: 'Sleep',
          category: 'health',
          icon: '😴',
          color: 'wellness-blue',
          completed: false,
          streak: 0,
          totalCompletions: 0,
          target: 8, // hours
          current: 0,
        },
      ],

      // Reminders
      reminders: [
        {
          id: 1,
          title: 'Take Medicine',
          time: '09:00',
          enabled: true,
          type: 'medicine',
          medicine: 'Sugar Medicine',
        },
        {
          id: 2,
          title: 'BP Medicine',
          time: '20:00',
          enabled: true,
          type: 'medicine',
          medicine: 'BP Medicine',
        },
      ],

      // Progress tracking
      dailyProgress: {},
      weeklyProgress: {},
      monthlyProgress: {},

      // Actions
      toggleHabit: (habitId) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === habitId
              ? {
                  ...habit,
                  completed: !habit.completed,
                  streak: !habit.completed ? habit.streak + 1 : Math.max(0, habit.streak - 1),
                  totalCompletions: !habit.completed ? habit.totalCompletions + 1 : habit.totalCompletions,
                }
              : habit
          ),
        })),

      updateHabitProgress: (habitId, progress) =>
        set((state) => ({
          habits: state.habits.map((habit) =>
            habit.id === habitId ? { ...habit, current: progress } : habit
          ),
        })),

      addReminder: (reminder) =>
        set((state) => ({
          reminders: [...state.reminders, { ...reminder, id: Date.now() }],
        })),

      updateReminder: (reminderId, updates) =>
        set((state) => ({
          reminders: state.reminders.map((reminder) =>
            reminder.id === reminderId ? { ...reminder, ...updates } : reminder
          ),
        })),

      deleteReminder: (reminderId) =>
        set((state) => ({
          reminders: state.reminders.filter((reminder) => reminder.id !== reminderId),
        })),

      resetDailyHabits: () =>
        set((state) => ({
          habits: state.habits.map((habit) => ({ ...habit, completed: false, current: 0 })),
        })),

      // Motivational quotes
      currentQuote: {
        text: "The only bad workout is the one that didn't happen.",
        author: "Unknown",
      },

      // Celebration state
      showCelebration: false,
      triggerCelebration: () => {
        set({ showCelebration: true })
        setTimeout(() => set({ showCelebration: false }), 3000)
      },
    }),
    {
      name: 'wellness-tracker-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        userProfile: state.userProfile,
        habits: state.habits,
        reminders: state.reminders,
        dailyProgress: state.dailyProgress,
        weeklyProgress: state.weeklyProgress,
        monthlyProgress: state.monthlyProgress,
      }),
    }
  )
)

export default useStore
