import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Target, 
  Calendar, 
  Clock, 
  Trophy, 
  Star, 
  Zap, 
  CheckCircle, 
  Circle,
  Gift,
  TrendingUp,
  Award,
  RefreshCw,
  Play
} from 'lucide-react'
import { useChallenges } from '../hooks/useChallenges.jsx'
import { useGamification } from '../hooks/useGamification.jsx'

const Challenges = () => {
  const {
    dailyChallenges,
    weeklyChallenges,
    completedChallenges,
    dailyStats,
    getStats,
    getOverallProgress,
    getUpcomingChallenges,
    simulateCompleteChallenge,
    resetChallenges,
    challengeTypes,
    challengeCategories,
    challengeDifficulty
  } = useChallenges()

  const { userStats } = useGamification()
  const [selectedTab, setSelectedTab] = useState('daily')
  const [showCompleted, setShowCompleted] = useState(false)

  const challengeStats = getStats()
  const overallProgress = getOverallProgress()
  const upcomingChallenges = getUpcomingChallenges()

  const tabs = [
    { id: 'daily', label: 'Diários', icon: Calendar },
    { id: 'weekly', label: 'Semanais', icon: Clock },
    { id: 'stats', label: 'Estatísticas', icon: TrendingUp }
  ]

  const difficultyColors = {
    [challengeDifficulty.EASY]: 'green',
    [challengeDifficulty.MEDIUM]: 'yellow',
    [challengeDifficulty.HARD]: 'red'
  }

  const difficultyLabels = {
    [challengeDifficulty.EASY]: 'Fácil',
    [challengeDifficulty.MEDIUM]: 'Médio',
    [challengeDifficulty.HARD]: 'Difícil'
  }

  const categoryIcons = {
    [challengeCategories.GAMES]: '🎮',
    [challengeCategories.TOPICS]: '📚',
    [challengeCategories.XP]: '⭐',
    [challengeCategories.STREAK]: '🔥',
    [challengeCategories.SOCIAL]: '👥'
  }

  const getCurrentChallenges = () => {
    switch (selectedTab) {
      case 'daily':
        return dailyChallenges
      case 'weekly':
        return weeklyChallenges
      default:
        return []
    }
  }

  const ChallengeCard = ({ challenge }) => {
    const progressPercentage = Math.round(challenge.progress * 100)
    const difficultyColor = difficultyColors[challenge.difficulty]
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 ${
          challenge.isCompleted 
            ? 'border-green-300 bg-green-50' 
            : 'border-gray-200 hover:border-blue-300 hover:shadow-xl'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{challenge.icon}</div>
            <div>
              <h3 className={`font-bold text-lg ${
                challenge.isCompleted ? 'text-green-800' : 'text-gray-900'
              }`}>
                {challenge.title}
              </h3>
              <p className={`text-sm ${
                challenge.isCompleted ? 'text-green-600' : 'text-gray-600'
              }`}>
                {challenge.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${difficultyColor}-100 text-${difficultyColor}-800`}>
              {difficultyLabels[challenge.difficulty]}
            </span>
            {challenge.isCompleted ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6 text-gray-400" />
            )}
          </div>
        </div>

        {/* Barra de Progresso */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progresso: {progressPercentage}%
            </span>
            <span className="text-sm text-gray-500">
              {challenge.type === challengeTypes.DAILY ? 'Hoje' : 'Esta semana'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
              className={`h-3 rounded-full ${
                challenge.isCompleted 
                  ? 'bg-green-500' 
                  : progressPercentage > 50 
                    ? 'bg-blue-500' 
                    : 'bg-gray-400'
              }`}
            />
          </div>
        </div>

        {/* Recompensas */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>{challenge.xpReward} XP</span>
            </div>
            {challenge.energyReward > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>{challenge.energyReward} Energia</span>
              </div>
            )}
          </div>
          
          {!challenge.isCompleted && (
            <button
              onClick={() => simulateCompleteChallenge(challenge.id)}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
        </div>

        {challenge.isCompleted && challenge.completedAt && (
          <div className="mt-3 pt-3 border-t border-green-200">
            <p className="text-xs text-green-600">
              Completado em {new Date(challenge.completedAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        )}
      </motion.div>
    )
  }

  const StatsCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center">
      <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center mx-auto mb-3`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
      <div className={`text-3xl font-bold text-${color}-600 mb-1`}>{value}</div>
      <div className="text-lg font-semibold text-gray-900 mb-1">{title}</div>
      {subtitle && <div className="text-sm text-gray-600">{subtitle}</div>}
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Desafios</h1>
          </div>
          <p className="text-xl text-gray-600">
            Complete desafios diários e semanais para ganhar XP e recompensas especiais
          </p>
        </motion.div>

        {/* Progresso Geral */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Progresso Geral</h2>
            <button
              onClick={resetChallenges}
              className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{overallProgress.completedCount}</div>
              <div className="text-sm text-gray-600">Completados</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{Math.round(overallProgress.completionRate)}%</div>
              <div className="text-sm text-gray-600">Taxa de Conclusão</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{challengeStats.totalXPEarned}</div>
              <div className="text-sm text-gray-600">XP Total Ganho</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{challengeStats.totalEnergyEarned}</div>
              <div className="text-sm text-gray-600">Energia Total Ganha</div>
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress.averageProgress}%` }}
              transition={{ duration: 1 }}
              className="h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Progresso médio: {Math.round(overallProgress.averageProgress)}%
          </p>
        </motion.div>

        {/* Estatísticas Diárias */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Atividade de Hoje</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{dailyStats.gamesCompleted || 0}</div>
              <div className="text-sm text-blue-700">Jogos Completados</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{dailyStats.topicsCompleted || 0}</div>
              <div className="text-sm text-green-700">Tópicos Completados</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{dailyStats.xpGained || 0}</div>
              <div className="text-sm text-purple-700">XP Ganho</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{dailyStats.quizStreak || 0}</div>
              <div className="text-sm text-orange-700">Sequência Quiz</div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                    selectedTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'stats' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Desafios Diários"
                  value={challengeStats.dailyCompleted}
                  subtitle="Completados"
                  icon={Calendar}
                  color="blue"
                />
                <StatsCard
                  title="Desafios Semanais"
                  value={challengeStats.weeklyCompleted}
                  subtitle="Completados"
                  icon={Clock}
                  color="green"
                />
                <StatsCard
                  title="Desafios Especiais"
                  value={challengeStats.specialCompleted}
                  subtitle="Completados"
                  icon={Award}
                  color="purple"
                />
                <StatsCard
                  title="Taxa de Sucesso"
                  value={`${Math.round(challengeStats.completionRate)}%`}
                  subtitle="Geral"
                  icon={Trophy}
                  color="yellow"
                />
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {selectedTab === 'daily' ? 'Desafios Diários' : 'Desafios Semanais'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowCompleted(!showCompleted)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        showCompleted
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {showCompleted ? 'Ocultar Completados' : 'Mostrar Completados'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {getCurrentChallenges()
                      .filter(challenge => showCompleted || !challenge.isCompleted)
                      .map((challenge, index) => (
                        <motion.div
                          key={challenge.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <ChallengeCard challenge={challenge} />
                        </motion.div>
                      ))}
                  </AnimatePresence>
                </div>

                {getCurrentChallenges().length === 0 && (
                  <div className="text-center py-12">
                    <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Nenhum desafio disponível
                    </h3>
                    <p className="text-gray-600">
                      Novos desafios serão gerados automaticamente.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Próximos Desafios */}
        {upcomingChallenges.length > 0 && selectedTab !== 'stats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Próximos a Completar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingChallenges.map((challenge, index) => (
                <div
                  key={challenge.id}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{challenge.icon}</span>
                    <div>
                      <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                      <p className="text-sm text-gray-600">{Math.round(challenge.progress * 100)}% completo</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 bg-blue-500 rounded-full"
                      style={{ width: `${challenge.progress * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Challenges 