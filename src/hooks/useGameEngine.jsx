import { useState, useEffect, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import confetti from 'canvas-confetti'
import { energySystem, difficultyConfig } from '../constants/gamesData'
import { useGamification } from './useGamification.jsx'

export const useGameEngine = () => {
  const { completeTopicWithGamification, userStats } = useGamification()
  
  // Estados do sistema de energia
  const [currentEnergy, setCurrentEnergy] = useState(energySystem.maxEnergy)
  const [lastEnergyUpdate, setLastEnergyUpdate] = useState(Date.now())
  
  // Estados do jogo atual
  const [currentGame, setCurrentGame] = useState(null)
  const [gameState, setGameState] = useState('idle') // idle, playing, paused, completed, failed
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [gameHistory, setGameHistory] = useState([])

  // Carregar dados salvos
  useEffect(() => {
    const savedData = localStorage.getItem('roadnat_game_engine')
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        setCurrentEnergy(data.currentEnergy || energySystem.maxEnergy)
        setLastEnergyUpdate(data.lastEnergyUpdate || Date.now())
        setGameHistory(data.gameHistory || [])
      } catch (error) {
        console.error('Erro ao carregar dados do game engine:', error)
      }
    }
  }, [])

  // Salvar dados
  const saveData = useCallback(() => {
    const data = {
      currentEnergy,
      lastEnergyUpdate,
      gameHistory,
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem('roadnat_game_engine', JSON.stringify(data))
  }, [currentEnergy, lastEnergyUpdate, gameHistory])

  // Regenerar energia automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      const timePassed = now - lastEnergyUpdate
      const energyToRegenerate = Math.floor(timePassed / energySystem.energyRegenTime)
      
      if (energyToRegenerate > 0 && currentEnergy < energySystem.maxEnergy) {
        const newEnergy = Math.min(currentEnergy + energyToRegenerate, energySystem.maxEnergy)
        setCurrentEnergy(newEnergy)
        setLastEnergyUpdate(now)
      }
    }, 60000) // Verifica a cada minuto

    return () => clearInterval(interval)
  }, [currentEnergy, lastEnergyUpdate])

  // Salvar dados quando mudarem
  useEffect(() => {
    saveData()
  }, [saveData])

  // Timer do jogo
  useEffect(() => {
    let interval = null
    
    if (gameState === 'playing' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            endGame(false, 'Tempo esgotado!')
            return 0
          }
          return time - 1
        })
      }, 1000)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [gameState, timeRemaining])

  // Iniciar jogo
  const startGame = useCallback((game) => {
    if (currentEnergy < energySystem.energyCostPerGame) {
      toast.error('Energia insuficiente! Aguarde a regeneração.')
      return false
    }

    // Consumir energia
    setCurrentEnergy(prev => prev - energySystem.energyCostPerGame)
    setLastEnergyUpdate(Date.now())

    // Configurar jogo
    const difficulty = difficultyConfig[game.difficulty] || difficultyConfig.beginner
    const timeLimit = Math.floor(game.timeLimit * difficulty.timeMultiplier)

    setCurrentGame(game)
    setGameState('playing')
    setTimeRemaining(timeLimit)
    setScore(0)
    setStreak(0)
    setHintsUsed(0)

    toast.success(`Jogo iniciado! Você tem ${timeLimit} segundos.`)
    return true
  }, [currentEnergy])

  // Pausar/Despausar jogo
  const togglePause = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused')
      toast('Jogo pausado')
    } else if (gameState === 'paused') {
      setGameState('playing')
      toast('Jogo retomado')
    }
  }, [gameState])

  // Usar dica
  const useHint = useCallback(() => {
    if (!currentGame) return null

    const difficulty = difficultyConfig[currentGame.difficulty] || difficultyConfig.beginner
    
    if (hintsUsed >= difficulty.hintsAllowed) {
      toast.error('Você já usou todas as dicas disponíveis!')
      return null
    }

    setHintsUsed(prev => prev + 1)
    toast.success(`Dica ${hintsUsed + 1}/${difficulty.hintsAllowed} usada!`)
    
    // Retornar dica baseada no tipo de jogo
    if (currentGame.type === 'quiz') {
      // Para quiz, eliminar opções incorretas
      return 'hint_eliminate_options'
    } else if (currentGame.type === 'code_completion') {
      // Para código, mostrar uma resposta
      return 'hint_show_answer'
    } else if (currentGame.type === 'playground') {
      // Para playground, mostrar dicas do array
      return currentGame.hints?.[hintsUsed] || 'Continue tentando!'
    }
    
    return null
  }, [currentGame, hintsUsed])

  // Submeter resposta
  const submitAnswer = useCallback((answer, isCorrect = false) => {
    if (gameState !== 'playing') return

    const difficulty = difficultyConfig[currentGame.difficulty] || difficultyConfig.beginner
    let points = 0
    
    if (isCorrect) {
      // Calcular pontos baseado na dificuldade, tempo restante e dicas usadas
      const basePoints = currentGame.xpReward || 50
      const timeBonus = Math.floor((timeRemaining / currentGame.timeLimit) * 20)
      const hintPenalty = hintsUsed * 5
      const difficultyBonus = Math.floor(basePoints * (difficulty.xpMultiplier - 1))
      
      points = Math.max(basePoints + timeBonus + difficultyBonus - hintPenalty, 10)
      
      setScore(prev => prev + points)
      setStreak(prev => prev + 1)
      
      // Feedback positivo
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      })
      
      toast.success(`Correto! +${points} pontos`)
    } else {
      setStreak(0)
      toast.error('Resposta incorreta. Tente novamente!')
    }

    // Salvar resposta no histórico
    const answerRecord = {
      gameId: currentGame.id,
      answer,
      isCorrect,
      points,
      timeUsed: currentGame.timeLimit - timeRemaining,
      hintsUsed,
      timestamp: new Date().toISOString()
    }

    setGameHistory(prev => [...prev, answerRecord])
    
    return { isCorrect, points }
  }, [gameState, currentGame, timeRemaining, hintsUsed, streak])

  // Finalizar jogo
  const endGame = useCallback((success = false, message = '') => {
    if (!currentGame) return

    setGameState(success ? 'completed' : 'failed')
    
    const finalScore = score
    const difficulty = difficultyConfig[currentGame.difficulty] || difficultyConfig.beginner
    
    if (success) {
      // Aplicar XP ao sistema de gamificação
      const xpGained = Math.floor(finalScore * difficulty.xpMultiplier)
      
      // Se for um jogo relacionado a um tópico, marcar como concluído
      if (currentGame.topicId) {
        completeTopicWithGamification(currentGame.topicId)
      }
      
      // Feedback de sucesso
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
      
      toast.success(message || `Parabéns! Você ganhou ${xpGained} XP!`)
    } else {
      toast.error(message || 'Jogo finalizado. Tente novamente!')
    }

    // Salvar resultado do jogo
    const gameResult = {
      gameId: currentGame.id,
      gameType: currentGame.type,
      topicId: currentGame.topicId,
      difficulty: currentGame.difficulty,
      success,
      finalScore,
      timeUsed: currentGame.timeLimit - timeRemaining,
      hintsUsed,
      streak,
      timestamp: new Date().toISOString()
    }

    setGameHistory(prev => [...prev, gameResult])
    
    // Reset após 3 segundos
    setTimeout(() => {
      resetGame()
    }, 3000)
    
  }, [currentGame, score, timeRemaining, hintsUsed, streak, completeTopicWithGamification])

  // Resetar jogo
  const resetGame = useCallback(() => {
    setCurrentGame(null)
    setGameState('idle')
    setTimeRemaining(0)
    setScore(0)
    setStreak(0)
    setHintsUsed(0)
  }, [])

  // Calcular tempo para próxima energia
  const getTimeToNextEnergy = useCallback(() => {
    if (currentEnergy >= energySystem.maxEnergy) return 0
    
    const timeSinceLastUpdate = Date.now() - lastEnergyUpdate
    const timeToNext = energySystem.energyRegenTime - (timeSinceLastUpdate % energySystem.energyRegenTime)
    
    return Math.ceil(timeToNext / 1000 / 60) // em minutos
  }, [currentEnergy, lastEnergyUpdate])

  // Obter estatísticas do jogador
  const getPlayerStats = useCallback(() => {
    const totalGames = gameHistory.filter(h => h.gameId).length
    const successfulGames = gameHistory.filter(h => h.success).length
    const totalScore = gameHistory.reduce((sum, h) => sum + (h.finalScore || 0), 0)
    const averageScore = totalGames > 0 ? Math.round(totalScore / totalGames) : 0
    const successRate = totalGames > 0 ? Math.round((successfulGames / totalGames) * 100) : 0
    
    return {
      totalGames,
      successfulGames,
      totalScore,
      averageScore,
      successRate,
      currentStreak: streak
    }
  }, [gameHistory, streak])

  return {
    // Estados
    currentEnergy,
    maxEnergy: energySystem.maxEnergy,
    currentGame,
    gameState,
    timeRemaining,
    score,
    streak,
    hintsUsed,
    gameHistory,
    
    // Funções
    startGame,
    togglePause,
    useHint,
    submitAnswer,
    endGame,
    resetGame,
    
    // Utilitários
    getTimeToNextEnergy,
    getPlayerStats,
    canPlayGame: currentEnergy >= energySystem.energyCostPerGame
  }
} 