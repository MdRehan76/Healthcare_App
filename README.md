# Wellness Tracker App

A comprehensive wellness and habit tracking application built with React, featuring beautiful animations, progress tracking, and motivational features to help users maintain a healthy lifestyle.

## 🌟 Features

### Core Features
- **Daily Habit Tracking**: Log exercise, meditation, yoga, water intake, medicine reminders, meals, and sleep
- **Yoga & Exercise Section**: Guided workouts with built-in timer and step-by-step instructions
- **Motivational Quotes**: Daily changing inspirational quotes
- **Profile Management**: Editable user details with health metrics and BMI calculation

### Reminders & Notifications
- **Dedicated Reminder Section**: Animated window for managing reminders
- **Time Picker**: Add reminders with specific times
- **Medicine Reminders**: Special reminders for sugar, BP, thyroid medications
- **Enable/Disable**: Toggle notifications on/off

### Progress & Streak Tracking
- **Progress Window**: Animated progress tracking with completion percentages
- **Streak Tracking**: Daily streaks and achievement levels
- **Visual Charts**: Weekly and monthly progress visualization
- **Achievement System**: Different levels based on consistency

### Design & UI
- **Smooth Animations**: Framer Motion powered transitions throughout the app
- **Dark/Light Mode**: Toggle between themes (top right corner)
- **Celebration Effects**: Confetti animations when completing tasks
- **Modern Design**: Clean, gradient-based UI with rounded components
- **Responsive**: Works on desktop and mobile devices

### User Flow
1. **Home Dashboard**: Quick overview of today's habits, progress %, next reminder
2. **Profile Page**: Editable user details and health metrics
3. **Habits Page**: Add/view habits with progress animation
4. **Reminder Page**: Add/view/edit reminders with time settings
5. **Progress Page**: View streaks, charts, and completion statistics
6. **Yoga & Exercise**: Guided workouts with timer and instructions

## 🛠️ Technology Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Date Handling**: date-fns
- **Celebration Effects**: react-confetti

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wellness-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📱 Usage

### Getting Started
1. **Set up your profile**: Go to the Profile page and add your personal information
2. **Configure habits**: Visit the Habits page to see your daily wellness tasks
3. **Add reminders**: Set up medicine reminders in the Reminders section
4. **Track progress**: Monitor your wellness journey in the Progress page

### Key Features Usage

#### Habit Tracking
- Tap the checkmark to complete daily habits
- Use +/- buttons for progress-based habits (water intake, sleep)
- View your streaks and total completions

#### Reminders
- Add new reminders with specific times
- Enable/disable reminders as needed
- Edit or delete existing reminders

#### Exercise & Yoga
- Choose from different workout types
- Follow step-by-step instructions
- Use the built-in timer for guided sessions

#### Progress Monitoring
- View overall completion percentage
- Track weekly progress trends
- See achievement levels based on streaks

## 🎨 Design Features

### Color Scheme
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Wellness Colors**: 
  - Green (#10b981) - Success/Health
  - Blue (#3b82f6) - Information
  - Purple (#8b5cf6) - Premium/Meditation
  - Orange (#f59e0b) - Energy/Exercise
  - Pink (#ec4899) - Wellness

### Animations
- **Page Transitions**: Smooth slide animations between pages
- **Card Hover Effects**: Scale and shadow animations with floating effects
- **Progress Bars**: Animated width transitions with smooth easing
- **Progress Circles**: Animated SVG circles with path animations
- **Celebration Effects**: Confetti animation on task completion
- **Loading States**: Staggered animations for content loading
- **Live Animations**: Floating cards, pulsing icons, and micro-interactions
- **Hover Effects**: Enhanced card hover with 3D-like transformations
- **Progress Animations**: Smooth progress bar fills with custom easing
- **Checkmark Animations**: Rotating and scaling checkmarks on completion

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Responsive grid layouts
- **Desktop Experience**: Enhanced layouts for larger screens

## 📊 Data Persistence

The app uses Zustand with persistence middleware to save:
- User profile information
- Habit progress and streaks
- Reminder settings
- Progress tracking data

All data is stored locally in the browser's localStorage.

## 🔧 Customization

### Adding New Habits
Edit the `habits` array in `src/store/useStore.js`:
```javascript
{
  id: 9,
  name: 'New Habit',
  category: 'custom',
  icon: '🎯',
  color: 'wellness-green',
  completed: false,
  streak: 0,
  totalCompletions: 0,
}
```

### Adding New Exercises
Add to the `exercises` array in `src/components/YogaExercise.jsx`:
```javascript
{
  id: 5,
  name: 'New Exercise',
  category: 'exercise',
  duration: 300,
  difficulty: 'Beginner',
  calories: 50,
  icon: '🏃‍♀️',
  description: 'Exercise description',
  steps: [
    { name: 'Step 1', duration: 30, instruction: 'Instruction here' }
  ]
}
```

### Customizing Colors
Modify the color scheme in `tailwind.config.js`:
```javascript
colors: {
  wellness: {
    green: '#10b981',
    blue: '#3b82f6',
    // Add your custom colors
  }
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)

#### Option 1: Deploy via Vercel Dashboard (Easiest)
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project" and import your repository
4. Vercel will automatically detect it's a Vite React app
5. Click "Deploy" - no additional configuration needed!

#### Option 2: Deploy via Vercel CLI
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts to connect your project
4. Deploy with: `vercel --prod`

#### Option 3: Deploy via GitHub Integration
1. Connect your GitHub account to Vercel
2. Every push to main branch automatically deploys
3. Preview deployments for pull requests

### Deploy to Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify

### Environment Variables
No environment variables required for basic deployment. The app works entirely client-side.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Icons provided by [Lucide React](https://lucide.dev/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)
- State management with [Zustand](https://zustand-demo.pmnd.rs/)

## 📞 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ for better wellness and healthier living**
