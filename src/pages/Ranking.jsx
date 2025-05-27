import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, 
  Medal, 
  Crown, 
  TrendingUp, 
  TrendingDown, 
  Search, 
  RefreshCw,
  Calendar,
  Users,
  Target,
  Award,
  ChevronUp,
  ChevronDown,
  Minus
} from 'lucide-react'
import { useRanking } from '../hooks/useRanking.jsx'
import { useGamification } from '../hooks/useGamification.jsx'

const Ranking = () => {
  const {
    currentType,
    currentCategory,
    rankingData,
    loading,
    userPosition,
    userLeague,
    pointsToNext,
    changeRankingType,
    changeRankingCategory,
    refreshRanking,
    getCurrentUserData,
    getNearbyUsers,
    getRankingStats,
    searchUser,
    getPositionHistory,
    checkRankingRewards,
    getTimeToNextUpdate,
    rankingTypes,
    rankingCategories
  } = useRanking()

  const { userStats } = useGamification()
  const [searchTerm, setSearchTerm] = useState('')
  const [showNearbyOnly, setShowNearbyOnly] = useState(false)

  const rankingStats = getRankingStats()
  const positionHistory = getPositionHistory()
  const currentReward = checkRankingRewards()
  const timeToUpdate = getTimeToNextUpdate()

  const typeLabels = {
    [rankingTypes.GLOBAL]: 'Global',
    [rankingTypes.WEEKLY]: 'Semanal',
    [rankingTypes.MONTHLY]: 'Mensal',
    [rankingTypes.FRIENDS]: 'Amigos'
  }

  const categoryLabels = {
    [rankingCategories.XP]: 'XP Total',
    [rankingCategories.STREAK]: 'Sequência',
    [rankingCategories.GAMES_COMPLETED]: 'Jogos Concluídos',
    [rankingCategories.TOPICS_COMPLETED]: 'Tópicos Concluídos'
  }

  const getPositionIcon = (position) => {
    if (position === 1) return <Crown className="w-6 h-6 text-yellow-500" />
    if (position === 2) return <Medal className="w-6 h-6 text-gray-400" />
    if (position === 3) return <Medal className="w-6 h-6 text-amber-600" />
    return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{position}</span>
  }

  const getPositionChange = (currentPos, previousPos) => {
    if (!previousPos || currentPos === previousPos) return <Minus className="w-4 h-4 text-gray-400" />
    if (currentPos < previousPos) return <ChevronUp className="w-4 h-4 text-green-500" />
    return <ChevronDown className="w-4 h-4 text-red-500" />
  }

  const getCategoryValue = (user, category) => {
    switch (category) {
      case rankingCategories.XP:
        return user.totalXP?.toLocaleString() || '0'
      case rankingCategories.STREAK:
        return `${user.streak} dias`
      case rankingCategories.GAMES_COMPLETED:
        return user.gamesCompleted?.toLocaleString() || '0'
      case rankingCategories.TOPICS_COMPLETED:
        return user.topicsCompleted?.toLocaleString() || '0'
      default:
        return '0'
    }
  }

  const filteredData = searchTerm 
    ? searchUser(searchTerm) 
    : showNearbyOnly 
      ? getNearbyUsers(3) 
      : rankingData

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900">Ranking</h1>
          </div>
          <p className="text-xl text-gray-600">
            Veja como você se compara com outros aprendizes de React Native
          </p>
        </motion.div>

        {/* Estatísticas do Usuário */}
        {rankingStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Sua Posição</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">#{rankingStats.userPosition}</div>
                <div className="text-sm text-gray-600">Posição Atual</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{rankingStats.percentile}%</div>
                <div className="text-sm text-gray-600">Percentil</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-2xl">{userLeague?.icon}</span>
                  <div className="text-lg font-bold" style={{ color: userLeague?.color }}>
                    {userLeague?.name}
                  </div>
                </div>
                <div className="text-sm text-gray-600">Liga Atual</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">{pointsToNext}</div>
                <div className="text-sm text-gray-600">Para Próxima Posição</div>
              </div>
            </div>
            
            {currentReward && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 text-yellow-800">
                  <Award className="w-5 h-5" />
                  <span className="font-medium">Recompensa Disponível: {currentReward.title}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Controles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Filtros de Tipo */}
            <div className="flex gap-2">
              {Object.entries(typeLabels).map(([type, label]) => (
                <button
                  key={type}
                  onClick={() => changeRankingType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Filtros de Categoria */}
            <div className="flex gap-2">
              {Object.entries(categoryLabels).map(([category, label]) => (
                <button
                  key={category}
                  onClick={() => changeRankingCategory(category)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Busca e Controles */}
            <div className="flex gap-2 items-center">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar usuário..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={() => setShowNearbyOnly(!showNearbyOnly)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  showNearbyOnly
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Users className="w-4 h-4" />
              </button>

              <button
                onClick={refreshRanking}
                disabled={loading}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {timeToUpdate && (
            <div className="mt-4 text-sm text-gray-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Próxima atualização em: {timeToUpdate}
            </div>
          )}
        </motion.div>

        {/* Lista de Ranking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              Ranking {typeLabels[currentType]} - {categoryLabels[currentCategory]}
            </h2>
            <p className="text-gray-600">
              {filteredData.length} {filteredData.length === 1 ? 'usuário' : 'usuários'} 
              {searchTerm && ` encontrado${filteredData.length === 1 ? '' : 's'} para "${searchTerm}"`}
              {showNearbyOnly && ' próximos a você'}
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            <AnimatePresence>
              {loading ? (
                <div className="p-8 text-center">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Carregando ranking...</p>
                </div>
              ) : filteredData.length === 0 ? (
                <div className="p-8 text-center">
                  <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {searchTerm ? 'Nenhum usuário encontrado' : 'Nenhum dado disponível'}
                  </p>
                </div>
              ) : (
                filteredData.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 hover:bg-gray-50 transition-colors ${
                      user.isCurrentUser ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Posição */}
                        <div className="flex items-center gap-2">
                          {getPositionIcon(user.position)}
                          {positionHistory.length > 1 && (
                            getPositionChange(user.position, positionHistory[positionHistory.length - 2]?.position)
                          )}
                        </div>

                        {/* Avatar e Info */}
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                            {user.avatar}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className={`font-semibold ${user.isCurrentUser ? 'text-blue-900' : 'text-gray-900'}`}>
                                {user.username}
                              </h3>
                              {user.isCurrentUser && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                  Você
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              Nível {user.level} • Ativo {new Date(user.lastActive).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Estatísticas */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {getCategoryValue(user, currentCategory)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.streak > 0 && `🔥 ${user.streak} dias`}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Histórico de Posições */}
        {positionHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6 mt-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">Histórico de Posições (7 dias)</h2>
            <div className="grid grid-cols-7 gap-2">
              {positionHistory.map((day, index) => (
                <div key={day.date} className="text-center">
                  <div className="text-xs text-gray-600 mb-1">
                    {new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' })}
                  </div>
                  <div className={`w-full h-12 rounded-lg flex items-center justify-center text-sm font-bold ${
                    day.change > 0 ? 'bg-red-100 text-red-800' :
                    day.change < 0 ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    #{day.position}
                  </div>
                  {day.change !== 0 && (
                    <div className={`text-xs mt-1 ${
                      day.change > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {day.change > 0 ? '+' : ''}{day.change}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Ranking 