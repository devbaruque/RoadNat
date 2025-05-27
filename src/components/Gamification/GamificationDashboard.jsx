import { motion } from 'framer-motion'
import { useState } from 'react'
import { Trophy, Star, Flame, Target, Award, TrendingUp } from 'lucide-react'
import AchievementCard from './AchievementCard'
import BadgeCard from './BadgeCard'
import ProgressBar from '../Roadmap/ProgressBar'
import { achievements, badges } from '../../constants/achievementsData'

const GamificationDashboard = ({ 
  userStats, 
  earnedAchievements, 
  earnedBadges, 
  levelProgress,
  triggerConfetti 
}) => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', name: 'Visão Geral', icon: TrendingUp },
    { id: 'achievements', name: 'Conquistas', icon: Trophy },
    { id: 'badges', name: 'Badges', icon: Award }
  ]

  const StatCard = ({ icon: Icon, title, value, subtitle, color = 'blue' }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-xl shadow-lg p-6 border-l-4"
      style={{ borderLeftColor: color }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  )

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Estatísticas principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Star}
          title="XP Total"
          value={userStats.totalXP.toLocaleString()}
          subtitle={`Nível ${userStats.level}`}
          color="#f59e0b"
        />
        <StatCard
          icon={Flame}
          title="Sequência Atual"
          value={`${userStats.currentStreak} dias`}
          subtitle={`Recorde: ${userStats.longestStreak} dias`}
          color="#ef4444"
        />
        <StatCard
          icon={Trophy}
          title="Conquistas"
          value={earnedAchievements.length}
          subtitle={`de ${achievements.length} disponíveis`}
          color="#22c55e"
        />
        <StatCard
          icon={Award}
          title="Badges"
          value={earnedBadges.length}
          subtitle={`de ${badges.length} disponíveis`}
          color="#8b5cf6"
        />
      </div>

      {/* Progresso do nível */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Progresso do Nível</h3>
          <button
            onClick={() => triggerConfetti('level')}
            className="text-yellow-600 hover:text-yellow-700 transition-colors"
          >
            <Star className="w-6 h-6" />
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Nível {userStats.level}</span>
            <span>Nível {userStats.level + 1}</span>
          </div>
          <ProgressBar
            progress={levelProgress.progressPercentage}
            color="bg-gradient-to-r from-yellow-400 to-orange-500"
            height="h-4"
            showPercentage={false}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{levelProgress.currentLevelXP} XP</span>
            <span>{levelProgress.xpNeededForNext} XP para próximo nível</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{userStats.overallProgress}%</div>
            <div className="text-sm text-blue-700">Progresso Geral</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{userStats.totalXP}</div>
            <div className="text-sm text-green-700">XP Total</div>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{userStats.level}</div>
            <div className="text-sm text-purple-700">Nível Atual</div>
          </div>
        </div>
      </motion.div>

      {/* Conquistas recentes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-4">Conquistas Recentes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements
            .filter(achievement => earnedAchievements.includes(achievement.id))
            .slice(-3)
            .map(achievement => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                isEarned={true}
              />
            ))}
          {earnedAchievements.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Nenhuma conquista ainda. Complete tópicos para ganhar suas primeiras conquistas!</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )

  const AchievementsTab = () => (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        {['all', 'earned', 'available', 'locked'].map(filter => (
          <button
            key={filter}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            {filter === 'all' && 'Todas'}
            {filter === 'earned' && 'Conquistadas'}
            {filter === 'available' && 'Disponíveis'}
            {filter === 'locked' && 'Bloqueadas'}
          </button>
        ))}
      </div>

      {/* Grid de conquistas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map(achievement => {
          const isEarned = earnedAchievements.includes(achievement.id)
          return (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              isEarned={isEarned}
              progress={isEarned ? 100 : 0}
            />
          )
        })}
      </div>
    </div>
  )

  const BadgesTab = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coleção de Badges</h2>
        <p className="text-gray-600">
          Ganhe badges conforme avança de nível e demonstra seu domínio em React Native
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map(badge => {
          const isEarned = earnedBadges.includes(badge.id)
          return (
            <BadgeCard
              key={badge.id}
              badge={badge}
              isEarned={isEarned}
              currentLevel={userStats.level}
            />
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎮 Dashboard de Gamificação
          </h1>
          <p className="text-xl text-gray-600">
            Acompanhe seu progresso, conquistas e badges
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-lg">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Conteúdo das tabs */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'achievements' && <AchievementsTab />}
          {activeTab === 'badges' && <BadgesTab />}
        </motion.div>
      </div>
    </div>
  )
}

export default GamificationDashboard 