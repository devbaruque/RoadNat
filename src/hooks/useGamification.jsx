import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { 
  achievements, 
  badges, 
  checkAchievement, 
  getAvailableAchievements,
  calculateLevel,
  getLevelProgress,
  rarityColors
} from '../constants/achievementsData'
import { categories, getTopicsByCategory, topics } from '../constants/roadmapData'

export const useGamification = () => {
  const [earnedAchievements, setEarnedAchievements] = useState([])
  const [earnedBadges, setEarnedBadges] = useState([])
  const [userStats, setUserStats] = useState({
    totalXP: 0,
    currentStreak: 0,
    longestStreak: 0,
    level: 1,
    overallProgress: 0,
    topicsCompletedToday: 0,
    lastActivityDate: null,
    totalStudyTime: 0
  })
  const [completedTopics, setCompletedTopics] = useState([])

  // Carregar dados salvos
  useEffect(() => {
    const savedData = localStorage.getItem('roadnat_gamification')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setEarnedAchievements(data.earnedAchievements || [])
        setEarnedBadges(data.earnedBadges || [])
        setUserStats(data.userStats || userStats)
        setCompletedTopics(data.completedTopics || [])
      } catch (error) {
        console.error('Erro ao carregar dados de gamificação:', error)
      }
    } else {
      // Dados iniciais para demonstração
      const mockCompletedTopics = ['js-fundamentals', 'functions-arrow']
      setCompletedTopics(mockCompletedTopics)
      calculateAndUpdateStats(mockCompletedTopics)
    }
  }, [])

  // Salvar dados
  const saveData = useCallback((newEarnedAchievements, newEarnedBadges, newUserStats, newCompletedTopics) => {
    const data = {
      earnedAchievements: newEarnedAchievements,
      earnedBadges: newEarnedBadges,
      userStats: newUserStats,
      completedTopics: newCompletedTopics,
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem('roadnat_gamification', JSON.stringify(data))
  }, [])

  // Calcular estatísticas
  const calculateAndUpdateStats = useCallback((completedTopicsList) => {
    const totalTopics = topics.length
    const overallProgress = totalTopics > 0 
      ? Math.round((completedTopicsList.length / totalTopics) * 100) 
      : 0

    // Calcular XP total baseado nos tópicos reais
    const totalXP = completedTopicsList.reduce((total, topicId) => {
      const topic = topics.find(t => t.id === topicId)
      return total + (topic?.xp_reward || 100)
    }, 0)

    const level = calculateLevel(totalXP)
    
    // Simular streak (em produção viria do backend)
    const today = new Date().toDateString()
    const lastActivity = userStats.lastActivityDate
    let currentStreak = userStats.currentStreak
    
    if (lastActivity !== today) {
      // Se é um novo dia, incrementar streak
      currentStreak = lastActivity === new Date(Date.now() - 86400000).toDateString() 
        ? currentStreak + 1 
        : 1
    }

    const newStats = {
      ...userStats,
      totalXP,
      level,
      overallProgress,
      currentStreak,
      longestStreak: Math.max(userStats.longestStreak, currentStreak),
      lastActivityDate: today
    }

    setUserStats(newStats)
    return newStats
  }, [userStats])

  // Obter progresso por categoria
  const getCategoryProgress = useCallback((categoryId) => {
    const categoryTopics = getTopicsByCategory(categoryId)
    if (categoryTopics.length === 0) return 0
    
    const completedCount = categoryTopics.filter(topic => 
      completedTopics.includes(topic.id)
    ).length
    
    return Math.round((completedCount / categoryTopics.length) * 100)
  }, [completedTopics])

  // Verificar novas conquistas
  const checkNewAchievements = useCallback((newUserStats, newCompletedTopics) => {
    const categoryProgress = {}
    categories.forEach(category => {
      categoryProgress[category.id] = getCategoryProgress(category.id)
    })

    const newAchievements = getAvailableAchievements(
      newUserStats, 
      newCompletedTopics, 
      categoryProgress, 
      earnedAchievements
    )

    return newAchievements
  }, [earnedAchievements, getCategoryProgress])

  // Verificar novos badges
  const checkNewBadges = useCallback((newUserStats) => {
    const newBadges = badges.filter(badge => {
      const isEarned = earnedBadges.includes(badge.id)
      const isUnlocked = newUserStats.level >= badge.requirement.value
      return !isEarned && isUnlocked
    })

    return newBadges
  }, [earnedBadges])

  // Animação de confetti
  const triggerConfetti = useCallback((type = 'achievement') => {
    const colors = type === 'level' 
      ? ['#FFD700', '#FFA500', '#FF6347'] 
      : ['#00f5ff', '#0080ff', '#0040ff']

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors
    })
  }, [])

  // Mostrar notificação de conquista
  const showAchievementNotification = useCallback((achievement) => {
    const rarityColor = rarityColors[achievement.rarity]
    
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto 
        flex ring-1 ring-black ring-opacity-5 border-l-4`}
        style={{ borderLeftColor: rarityColor }}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">{achievement.icon}</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                🏆 Nova Conquista!
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {achievement.name}
              </p>
              <p className="text-xs text-gray-500">
                {achievement.description}
              </p>
              <p className="text-xs text-amber-600 font-medium">
                +{achievement.xp_reward} XP
              </p>
            </div>
          </div>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-right'
    })
  }, [])

  // Mostrar notificação de badge
  const showBadgeNotification = useCallback((badge) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto 
        flex ring-1 ring-black ring-opacity-5 border-l-4`}
        style={{ borderLeftColor: badge.color }}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-2xl">{badge.icon}</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                🎖️ Novo Badge!
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {badge.name}
              </p>
              <p className="text-xs text-gray-500">
                {badge.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-right'
    })
  }, [])

  // Mostrar notificação de level up
  const showLevelUpNotification = useCallback((newLevel) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} 
        max-w-md w-full bg-gradient-to-r from-yellow-400 to-orange-500 
        shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <span className="text-3xl">🎉</span>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-white">
                Level Up!
              </p>
              <p className="text-lg font-bold text-white">
                Nível {newLevel}
              </p>
              <p className="text-xs text-yellow-100">
                Parabéns pelo seu progresso!
              </p>
            </div>
          </div>
        </div>
      </div>
    ), {
      duration: 6000,
      position: 'top-center'
    })
  }, [])

  // Completar tópico com gamificação
  const completeTopicWithGamification = useCallback((topicId) => {
    if (completedTopics.includes(topicId)) {
      return false // Já completado
    }

    const newCompletedTopics = [...completedTopics, topicId]
    const oldLevel = userStats.level
    const newStats = calculateAndUpdateStats(newCompletedTopics)
    
    // Verificar level up
    if (newStats.level > oldLevel) {
      triggerConfetti('level')
      showLevelUpNotification(newStats.level)
    }

    // Verificar novas conquistas
    const newAchievements = checkNewAchievements(newStats, newCompletedTopics)
    const newEarnedAchievements = [...earnedAchievements]
    
    newAchievements.forEach(achievement => {
      newEarnedAchievements.push(achievement.id)
      showAchievementNotification(achievement)
      triggerConfetti('achievement')
      
      // Adicionar XP da conquista
      newStats.totalXP += achievement.xp_reward
    })

    // Verificar novos badges
    const newBadges = checkNewBadges(newStats)
    const newEarnedBadges = [...earnedBadges]
    
    newBadges.forEach(badge => {
      newEarnedBadges.push(badge.id)
      showBadgeNotification(badge)
    })

    // Atualizar estados
    setCompletedTopics(newCompletedTopics)
    setEarnedAchievements(newEarnedAchievements)
    setEarnedBadges(newEarnedBadges)
    
    // Recalcular stats com XP das conquistas
    if (newAchievements.length > 0) {
      const finalStats = calculateAndUpdateStats(newCompletedTopics)
      finalStats.totalXP = newStats.totalXP
      finalStats.level = calculateLevel(finalStats.totalXP)
      setUserStats(finalStats)
      saveData(newEarnedAchievements, newEarnedBadges, finalStats, newCompletedTopics)
    } else {
      saveData(newEarnedAchievements, newEarnedBadges, newStats, newCompletedTopics)
    }

    return true
  }, [
    completedTopics, 
    userStats, 
    earnedAchievements, 
    earnedBadges,
    calculateAndUpdateStats,
    checkNewAchievements,
    checkNewBadges,
    triggerConfetti,
    showAchievementNotification,
    showBadgeNotification,
    showLevelUpNotification,
    saveData
  ])

  // Resetar progresso
  const resetProgress = useCallback(() => {
    setCompletedTopics([])
    setEarnedAchievements([])
    setEarnedBadges([])
    const resetStats = {
      totalXP: 0,
      currentStreak: 0,
      longestStreak: 0,
      level: 1,
      overallProgress: 0,
      topicsCompletedToday: 0,
      lastActivityDate: null,
      totalStudyTime: 0
    }
    setUserStats(resetStats)
    saveData([], [], resetStats, [])
  }, [saveData])

  return {
    // Estados
    userStats,
    completedTopics,
    earnedAchievements,
    earnedBadges,
    
    // Funções
    completeTopicWithGamification,
    resetProgress,
    getCategoryProgress,
    
    // Dados calculados
    levelProgress: getLevelProgress(userStats.totalXP),
    availableAchievements: checkNewAchievements(userStats, completedTopics),
    
    // Utilitários
    triggerConfetti
  }
} 