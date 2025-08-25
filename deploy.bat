@echo off
echo 🚀 Deploying Wellness Tracker to Vercel...

REM Check if vercel CLI is installed
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing Vercel CLI...
    npm install -g vercel
)

REM Build the project
echo 🔨 Building project...
npm run build

REM Deploy to Vercel
echo 🚀 Deploying to Vercel...
vercel --prod

echo ✅ Deployment complete! Check your Vercel dashboard for the live URL.
pause
