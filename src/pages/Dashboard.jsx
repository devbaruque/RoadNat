import GamificationDashboard from '../components/Gamification/GamificationDashboard'
import { useGamification } from '../hooks/useGamification.jsx'

const Dashboard = () => {
  const {
    userStats,
    earnedAchievements,
    earnedBadges,
    levelProgress,
    triggerConfetti
  } = useGamification()

  return (
    <GamificationDashboard
      userStats={userStats}
      earnedAchievements={earnedAchievements}
      earnedBadges={earnedBadges}
      levelProgress={levelProgress}
      triggerConfetti={triggerConfetti}
    />
  )
}

export default Dashboard 