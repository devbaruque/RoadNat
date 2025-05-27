roadnat/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       ├── images/
│       │   ├── roadmap-bg.svg
│       │   ├── badges/
│       │   └── characters/
│       └── sounds/
│           ├── success.mp3
│           ├── error.mp3
│           └── level-up.mp3
│
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Layout.jsx
│   │   │
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   ├── RegisterForm.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── roadmap/
│   │   │   ├── RoadmapVisualization.jsx
│   │   │   ├── TopicNode.jsx
│   │   │   ├── CategoryFilter.jsx
│   │   │   ├── ProgressTracker.jsx
│   │   │   └── RoadmapPath.jsx
│   │   │
│   │   ├── learning/
│   │   │   ├── TopicContent.jsx
│   │   │   ├── CodeExample.jsx
│   │   │   ├── InteractivePlayground.jsx
│   │   │   └── TopicNavigation.jsx
│   │   │
│   │   ├── games/
│   │   │   ├── GameEngine.jsx
│   │   │   ├── QuizGame.jsx
│   │   │   ├── CodeCompletion.jsx
│   │   │   ├── DragDropGame.jsx
│   │   │   ├── GameResults.jsx
│   │   │   └── GameProgress.jsx
│   │   │
│   │   ├── profile/
│   │   │   ├── UserProfile.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── AchievementsList.jsx
│   │   │   ├── StatsDashboard.jsx
│   │   │   └── StreakTracker.jsx
│   │   │
│   │   └── common/
│   │       ├── ConfettiCelebration.jsx
│   │       ├── XPNotification.jsx
│   │       ├── SoundManager.jsx
│   │       └── ThemeToggle.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Roadmap.jsx
│   │   ├── TopicDetail.jsx
│   │   ├── Game.jsx
│   │   ├── Profile.jsx
│   │   ├── Leaderboard.jsx
│   │   └── Settings.jsx
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useProgress.js
│   │   ├── useGameState.js
│   │   ├── useLocalStorage.js
│   │   ├── useSound.js
│   │   └── useTimer.js
│   │
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   ├── GameContext.jsx
│   │   ├── ProgressContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── services/
│   │   ├── supabase.js
│   │   ├── auth.service.js
│   │   ├── progress.service.js
│   │   ├── game.service.js
│   │   ├── content.service.js
│   │   └── analytics.service.js
│   │
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   ├── gameLogic.js
│   │   ├── xpCalculator.js
│   │   └── dateUtils.js
│   │
│   ├── data/
│   │   ├── roadmapData.js
│   │   ├── questionsBank.js
│   │   ├── achievementsData.js
│   │   ├── topicsContent.js
│   │   └── codeExamples.js
│   │
│   ├── styles/
│   │   ├── index.css
│   │   ├── tailwind.css
│   │   ├── animations.css
│   │   └── components.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── router.jsx
│
├── supabase/
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_add_gamification.sql
│   │   ├── 003_add_achievements.sql
│   │   └── 004_add_analytics.sql
│   │
│   ├── functions/
│   │   ├── calculate-xp/
│   │   │   └── index.js
│   │   ├── update-streaks/
│   │   │   └── index.js
│   │   └── generate-daily-challenges/
│   │       └── index.js
│   │
│   └── seed/
│       ├── categories.sql
│       ├── topics.sql
│       ├── achievements.sql
│       └── sample_users.sql
│
├── tests/
│   ├── components/
│   │   ├── auth/
│   │   ├── games/
│   │   └── roadmap/
│   │
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── utils/
│
├── docs/
│   ├── API.md
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   └── GAME_MECHANICS.md
│
├── .env.example
├── .env.local
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
├── README.md
└── CHANGELOG.md