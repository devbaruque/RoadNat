import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import confetti from 'canvas-confetti'
import {
  challengeTypes,
  challengeCategories,
  challengeDifficulty,
  generateDailyChallenges,
  generateWeeklyChallenges,
  checkChallengeCompletion,
  calculateChallengeRewards,
  getActiveChallenges,
  getChallengeStats
} from '../constants/challengesData'
import { useGamification } from './useGamification.jsx'

export const useChallenges = () => {
  const { userStats, addXP } = useGamification()
  
  // Estados dos desafios
  const [dailyChallenges, setDailyChallenges] = useState([])
  const [weeklyChallenges, setWeeklyChallenges] = useState([])
  const [completedChallenges, setCompletedChallenges] = useState([])
  const [dailyStats, setDailyStats] = useState({})
  const [loading, setLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(null)

  // Carregar dados salvos
  useEffect(() => {
    const savedData = localStorage.getItem('roadnat_challenges')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setDailyChallenges(data.dailyChallenges || [])
        setWeeklyChallenges(data.weeklyChallenges || [])
        setCompletedChallenges(data.completedChallenges || [])
        setDailyStats(data.dailyStats || {})
        setLastUpdate(data.lastUpdate)
      } catch (error) {
        console.error('Erro ao carregar dados dos desafios:', error)
      }
    }
  }, [])

  // Salvar dados
  const saveData = useCallback(() => {
    const data = {
      dailyChallenges,
      weeklyChallenges,
      completedChallenges,
      dailyStats,
      lastUpdate,
      savedAt: new Date().toISOString()
    }
    localStorage.setItem('roadnat_challenges', JSON.stringify(data))
  }, [dailyChallenges, weeklyChallenges, completedChallenges, dailyStats, lastUpdate])

  // Salvar dados quando mudarem
  useEffect(() => {
    saveData()
  }, [saveData])

  // Verificar se precisa gerar novos desafios
  const checkForNewChallenges = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]
    const lastUpdateDate = lastUpdate ? new Date(lastUpdate).toISOString().split('T')[0] : null
    
    // Se é um novo dia, gerar novos desafios diários
    if (lastUpdateDate !== today) {
      const newDailyChallenges = generateDailyChallenges(new Date())
      setDailyChallenges(newDailyChallenges)
      
      // Reset das estatísticas diárias
      setDailyStats({
        gamesCompleted: 0,
        topicsCompleted: 0,
        topicsStudied: 0,
        xpGained: 0,
        quizStreak: 0,
        codeCompletedNoHints: 0,
        date: today
      })
      
      setLastUpdate(new Date().toISOString())
      toast.success('🎯 Novos desafios diários disponíveis!')
    }
    
    // Verificar desafios semanais (segunda-feira)
    const currentWeek = getWeekNumber(new Date())
    const lastWeek = lastUpdate ? getWeekNumber(new Date(lastUpdate)) : null
    
    if (currentWeek !== lastWeek) {
      const newWeeklyChallenges = generateWeeklyChallenges(new Date())
      setWeeklyChallenges(newWeeklyChallenges)
      toast.success('📅 Novos desafios semanais disponíveis!')
    }
  }, [lastUpdate])

  // Função auxiliar para obter número da semana
  const getWeekNumber = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const dayNum = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - dayNum)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
  }

  // Verificar novos desafios ao carregar
  useEffect(() => {
    checkForNewChallenges()
  }, [checkForNewChallenges])

  // Atualizar estatísticas diárias
  const updateDailyStats = useCallback((statType, increment = 1) => {
    setDailyStats(prev => ({
      ...prev,
      [statType]: (prev[statType] || 0) + increment
    }))
  }, [])

  // Verificar progresso dos desafios
  const checkChallengeProgress = useCallback(() => {
    const allChallenges = [...dailyChallenges, ...weeklyChallenges]
    let hasUpdates = false
    
    allChallenges.forEach(challenge => {
      if (challenge.isCompleted) return
      
      const { completed, progress } = checkChallengeCompletion(challenge, userStats, dailyStats)
      
      // Atualizar progresso
      if (challenge.progress !== progress) {
        challenge.progress = progress
        hasUpdates = true
      }
      
      // Completar desafio
      if (completed && !challenge.isCompleted) {
        challenge.isCompleted = true
        challenge.completedAt = new Date().toISOString()
        
        // Calcular e aplicar recompensas
        const rewards = calculateChallengeRewards(challenge)
        
        // Adicionar XP
        if (rewards.xp > 0) {
          addXP(rewards.xp, `Desafio: ${challenge.title}`)
        }
        
        // Adicionar energia (implementar se necessário)
        if (rewards.energy > 0) {
          // TODO: Implementar sistema de energia
        }
        
        // Adicionar aos desafios completados
        setCompletedChallenges(prev => [...prev, { ...challenge, rewards }])
        
        // Feedback visual
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        })
        
        toast.success(`🎉 Desafio completado: ${challenge.title}! +${rewards.xp} XP`)
        hasUpdates = true
      }
    })
    
    // Atualizar estados se houve mudanças
    if (hasUpdates) {
      setDailyChallenges([...dailyChallenges])
      setWeeklyChallenges([...weeklyChallenges])
    }
  }, [dailyChallenges, weeklyChallenges, userStats, dailyStats, addXP])

  // Verificar progresso quando estatísticas mudarem
  useEffect(() => {
    checkChallengeProgress()
  }, [dailyStats, userStats])

  // Registrar atividade do usuário
  const recordActivity = useCallback((activityType, data = {}) => {
    switch (activityType) {
      case 'game_completed':
        updateDailyStats('gamesCompleted')
        if (data.gameType === 'quiz' && data.isCorrect) {
          updateDailyStats('quizStreak')
        } else if (data.gameType === 'quiz' && !data.isCorrect) {
          setDailyStats(prev => ({ ...prev, quizStreak: 0 }))
        }
        if (data.gameType === 'code_completion' && data.hintsUsed === 0) {
          updateDailyStats('codeCompletedNoHints')
        }
        break
        
      case 'topic_completed':
        updateDailyStats('topicsCompleted')
        updateDailyStats('topicsStudied')
        break
        
      case 'topic_studied':
        updateDailyStats('topicsStudied')
        break
        
      case 'xp_gained':
        updateDailyStats('xpGained', data.amount || 0)
        break
        
      default:
        console.warn('Tipo de atividade não reconhecido:', activityType)
    }
  }, [updateDailyStats])

  // Obter desafios por tipo
  const getChallengesByType = useCallback((type) => {
    switch (type) {
      case challengeTypes.DAILY:
        return dailyChallenges
      case challengeTypes.WEEKLY:
        return weeklyChallenges
      default:
        return [...dailyChallenges, ...weeklyChallenges]
    }
  }, [dailyChallenges, weeklyChallenges])

  // Obter desafios por categoria
  const getChallengesByCategory = useCallback((category) => {
    const allChallenges = [...dailyChallenges, ...weeklyChallenges]
    return allChallenges.filter(challenge => challenge.category === category)
  }, [dailyChallenges, weeklyChallenges])

  // Obter estatísticas dos desafios
  const getStats = useCallback(() => {
    return getChallengeStats(completedChallenges)
  }, [completedChallenges])

  // Obter progresso geral dos desafios
  const getOverallProgress = useCallback(() => {
    const allChallenges = [...dailyChallenges, ...weeklyChallenges]
    const totalChallenges = allChallenges.length
    const completedCount = allChallenges.filter(c => c.isCompleted).length
    const totalProgress = allChallenges.reduce((sum, c) => sum + c.progress, 0)
    
    return {
      totalChallenges,
      completedCount,
      completionRate: totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0,
      averageProgress: totalChallenges > 0 ? (totalProgress / totalChallenges) * 100 : 0
    }
  }, [dailyChallenges, weeklyChallenges])

  // Obter próximos desafios a serem completados
  const getUpcomingChallenges = useCallback((limit = 3) => {
    const allChallenges = [...dailyChallenges, ...weeklyChallenges]
    return allChallenges
      .filter(c => !c.isCompleted)
      .sort((a, b) => b.progress - a.progress)
      .slice(0, limit)
  }, [dailyChallenges, weeklyChallenges])

  // Simular completar desafio (para testes)
  const simulateCompleteChallenge = useCallback((challengeId) => {
    const allChallenges = [...dailyChallenges, ...weeklyChallenges]
    const challenge = allChallenges.find(c => c.id === challengeId)
    
    if (challenge && !challenge.isCompleted) {
      challenge.isCompleted = true
      challenge.progress = 1
      challenge.completedAt = new Date().toISOString()
      
      const rewards = calculateChallengeRewards(challenge)
      addXP(rewards.xp, `Desafio: ${challenge.title}`)
      
      setCompletedChallenges(prev => [...prev, { ...challenge, rewards }])
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      toast.success(`🎉 Desafio completado: ${challenge.title}! +${rewards.xp} XP`)
      
      // Atualizar listas
      if (challenge.type === challengeTypes.DAILY) {
        setDailyChallenges([...dailyChallenges])
      } else {
        setWeeklyChallenges([...weeklyChallenges])
      }
    }
  }, [dailyChallenges, weeklyChallenges, addXP])

  // Resetar desafios (para desenvolvimento)
  const resetChallenges = useCallback(() => {
    setDailyChallenges([])
    setWeeklyChallenges([])
    setCompletedChallenges([])
    setDailyStats({})
    setLastUpdate(null)
    localStorage.removeItem('roadnat_challenges')
    toast.success('Desafios resetados!')
  }, [])

  return {
    // Estados
    dailyChallenges,
    weeklyChallenges,
    completedChallenges,
    dailyStats,
    loading,
    lastUpdate,
    
    // Funções de atividade
    recordActivity,
    updateDailyStats,
    
    // Funções de consulta
    getChallengesByType,
    getChallengesByCategory,
    getStats,
    getOverallProgress,
    getUpcomingChallenges,
    
    // Funções de controle
    checkForNewChallenges,
    simulateCompleteChallenge,
    resetChallenges,
    
    // Constantes
    challengeTypes,
    challengeCategories,
    challengeDifficulty
  }
} 