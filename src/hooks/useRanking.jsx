import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { 
  rankingTypes, 
  rankingCategories, 
  getRankingData, 
  getCurrentUserPosition, 
  getPointsToNextPosition,
  getUserLeague,
  rankingRewards
} from '../constants/rankingData'
import { useGamification } from './useGamification.jsx'

export const useRanking = () => {
  const { userStats } = useGamification()
  
  // Estados do ranking
  const [currentType, setCurrentType] = useState(rankingTypes.GLOBAL)
  const [currentCategory, setCurrentCategory] = useState(rankingCategories.XP)
  const [rankingData, setRankingData] = useState([])
  const [loading, setLoading] = useState(false)
  const [userPosition, setUserPosition] = useState(null)
  const [userLeague, setUserLeague] = useState(null)
  const [pointsToNext, setPointsToNext] = useState(0)
  const [lastUpdate, setLastUpdate] = useState(null)

  // Carregar dados do ranking
  const loadRankingData = useCallback(async (type = currentType, category = currentCategory) => {
    setLoading(true)
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const data = getRankingData(type, category)
      setRankingData(data)
      
      const position = getCurrentUserPosition(type, category)
      setUserPosition(position)
      
      const points = getPointsToNextPosition(type, category)
      setPointsToNext(points)
      
      setLastUpdate(new Date())
      
    } catch (error) {
      console.error('Erro ao carregar ranking:', error)
      toast.error('Erro ao carregar ranking')
    } finally {
      setLoading(false)
    }
  }, [currentType, currentCategory])

  // Atualizar liga do usuário
  const updateUserLeague = useCallback(() => {
    if (userStats?.totalXP !== undefined) {
      const league = getUserLeague(userStats.totalXP)
      setUserLeague(league)
    }
  }, [userStats?.totalXP])

  // Carregar dados iniciais
  useEffect(() => {
    loadRankingData()
  }, [loadRankingData])

  // Atualizar liga quando XP mudar
  useEffect(() => {
    updateUserLeague()
  }, [updateUserLeague])

  // Mudar tipo de ranking
  const changeRankingType = useCallback((type) => {
    setCurrentType(type)
    loadRankingData(type, currentCategory)
  }, [currentCategory, loadRankingData])

  // Mudar categoria de ranking
  const changeRankingCategory = useCallback((category) => {
    setCurrentCategory(category)
    loadRankingData(currentType, category)
  }, [currentType, loadRankingData])

  // Atualizar ranking manualmente
  const refreshRanking = useCallback(() => {
    loadRankingData(currentType, currentCategory)
    toast.success('Ranking atualizado!')
  }, [currentType, currentCategory, loadRankingData])

  // Obter dados do usuário atual no ranking
  const getCurrentUserData = useCallback(() => {
    return rankingData.find(user => user.isCurrentUser)
  }, [rankingData])

  // Obter usuários próximos (acima e abaixo)
  const getNearbyUsers = useCallback((range = 2) => {
    const currentUser = getCurrentUserData()
    if (!currentUser) return []

    const currentIndex = rankingData.findIndex(user => user.isCurrentUser)
    const start = Math.max(0, currentIndex - range)
    const end = Math.min(rankingData.length, currentIndex + range + 1)
    
    return rankingData.slice(start, end)
  }, [rankingData, getCurrentUserData])

  // Verificar se usuário pode receber recompensa
  const checkRankingRewards = useCallback(() => {
    if (!userPosition) return null

    if (userPosition === 1) return rankingRewards[1]
    if (userPosition === 2) return rankingRewards[2]
    if (userPosition === 3) return rankingRewards[3]
    if (userPosition <= 10) return rankingRewards.top10
    if (userPosition <= 50) return rankingRewards.top50
    
    return null
  }, [userPosition])

  // Simular subida no ranking
  const simulateRankingChange = useCallback((newPosition) => {
    const updatedData = rankingData.map(user => {
      if (user.isCurrentUser) {
        return { ...user, position: newPosition }
      }
      return user
    })
    
    setRankingData(updatedData)
    setUserPosition(newPosition)
    
    const reward = checkRankingRewards()
    if (reward) {
      toast.success(`🎉 Nova posição: ${newPosition}º lugar! ${reward.title}`)
    }
  }, [rankingData, checkRankingRewards])

  // Obter estatísticas do ranking
  const getRankingStats = useCallback(() => {
    const totalUsers = rankingData.length
    const currentUser = getCurrentUserData()
    
    if (!currentUser) return null

    const percentile = Math.round(((totalUsers - userPosition + 1) / totalUsers) * 100)
    
    return {
      totalUsers,
      userPosition,
      percentile,
      pointsToNext,
      league: userLeague,
      canClaimReward: !!checkRankingRewards()
    }
  }, [rankingData, userPosition, pointsToNext, userLeague, getCurrentUserData, checkRankingRewards])

  // Buscar usuário por nome
  const searchUser = useCallback((username) => {
    if (!username.trim()) return rankingData

    return rankingData.filter(user => 
      user.username.toLowerCase().includes(username.toLowerCase())
    )
  }, [rankingData])

  // Obter histórico de posições (simulado)
  const getPositionHistory = useCallback(() => {
    // Simular histórico dos últimos 7 dias
    const history = []
    const basePosition = userPosition || 10
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      // Simular variação de posição
      const variation = Math.floor(Math.random() * 6) - 3 // -3 a +3
      const position = Math.max(1, Math.min(100, basePosition + variation))
      
      history.push({
        date: date.toISOString().split('T')[0],
        position,
        change: i === 6 ? 0 : position - history[history.length - 1]?.position || 0
      })
    }
    
    return history
  }, [userPosition])

  // Calcular tempo até próxima atualização
  const getTimeToNextUpdate = useCallback(() => {
    if (!lastUpdate) return null
    
    const nextUpdate = new Date(lastUpdate)
    nextUpdate.setHours(nextUpdate.getHours() + 1) // Atualiza a cada hora
    
    const now = new Date()
    const diff = nextUpdate - now
    
    if (diff <= 0) return 'Disponível agora'
    
    const minutes = Math.floor(diff / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }, [lastUpdate])

  return {
    // Estados
    currentType,
    currentCategory,
    rankingData,
    loading,
    userPosition,
    userLeague,
    pointsToNext,
    lastUpdate,
    
    // Funções de navegação
    changeRankingType,
    changeRankingCategory,
    refreshRanking,
    
    // Funções de dados
    getCurrentUserData,
    getNearbyUsers,
    getRankingStats,
    searchUser,
    getPositionHistory,
    
    // Funções de recompensas
    checkRankingRewards,
    simulateRankingChange,
    
    // Utilitários
    getTimeToNextUpdate,
    
    // Constantes
    rankingTypes,
    rankingCategories
  }
} 