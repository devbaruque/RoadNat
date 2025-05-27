import { useState, useEffect } from 'react'
import { categories, getTopicsByCategory } from '../constants/roadmapData'

export function useProgress() {
  const [completedTopics, setCompletedTopics] = useState(() => {
    const saved = localStorage.getItem('roadnat-completed-topics');
    return saved ? JSON.parse(saved) : [];
  });

  const [userStats, setUserStats] = useState({
    totalXP: 0,
    currentStreak: 0,
    level: 1,
    overallProgress: 0
  })

  // Simular dados do localStorage (depois virá do Supabase)
  useEffect(() => {
    const savedProgress = localStorage.getItem('roadnat_progress')
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress)
        setCompletedTopics(progress.completedTopics || [])
        setUserStats(progress.userStats || userStats)
      } catch (error) {
        console.error('Erro ao carregar progresso:', error)
      }
    } else {
      // Dados iniciais para demonstração
      const mockCompletedTopics = ['js-fundamentals', 'functions-arrow']
      setCompletedTopics(mockCompletedTopics)
      calculateStats(mockCompletedTopics)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('roadnat-completed-topics', JSON.stringify(completedTopics));
  }, [completedTopics]);

  // Salvar progresso no localStorage
  const saveProgress = (newCompletedTopics, newStats) => {
    const progressData = {
      completedTopics: newCompletedTopics,
      userStats: newStats,
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem('roadnat_progress', JSON.stringify(progressData))
  }

  // Calcular estatísticas baseadas nos tópicos completados
  const calculateStats = (completedTopicsList) => {
    const totalTopics = categories.reduce((total, category) => {
      return total + getTopicsByCategory(category.id).length
    }, 0)

    const overallProgress = totalTopics > 0 
      ? Math.round((completedTopicsList.length / totalTopics) * 100) 
      : 0

    // Calcular XP total (simulado)
    const totalXP = completedTopicsList.length * 100 // 100 XP por tópico

    // Calcular nível baseado no XP
    const level = Math.floor(totalXP / 500) + 1 // 500 XP por nível

    const newStats = {
      totalXP,
      currentStreak: 3, // Simulado
      level,
      overallProgress
    }

    setUserStats(newStats)
    return newStats
  }

  // Marcar tópico como concluído
  const completeTopicHandler = (topicId) => {
    if (!completedTopics.includes(topicId)) {
      const newCompletedTopics = [...completedTopics, topicId]
      setCompletedTopics(newCompletedTopics)
      
      const newStats = calculateStats(newCompletedTopics)
      saveProgress(newCompletedTopics, newStats)
      
      return true // Indica que o tópico foi marcado como concluído
    }
    return false // Tópico já estava concluído
  }

  // Resetar progresso (para desenvolvimento/teste)
  const resetProgress = () => {
    setCompletedTopics([])
    const newStats = calculateStats([])
    saveProgress([], newStats)
  }

  // Verificar se categoria está desbloqueada
  const isCategoryUnlocked = (categoryId) => {
    // Por enquanto, todas as categorias estão desbloqueadas
    // Futuramente pode implementar lógica de desbloqueio sequencial
    return true
  }

  // Obter progresso de uma categoria específica
  const getCategoryProgress = (categoryId) => {
    const categoryTopics = getTopicsByCategory(categoryId)
    if (categoryTopics.length === 0) return 0
    
    const completedCount = categoryTopics.filter(topic => 
      completedTopics.includes(topic.id)
    ).length
    
    return Math.round((completedCount / categoryTopics.length) * 100)
  }

  // Obter próximo tópico recomendado
  const getNextRecommendedTopic = () => {
    for (const category of categories) {
      const topics = getTopicsByCategory(category.id)
      for (const topic of topics) {
        if (!completedTopics.includes(topic.id)) {
          // Verificar se pré-requisitos estão completos
          const hasPrerequisites = topic.prerequisites && topic.prerequisites.length > 0
          if (!hasPrerequisites || topic.prerequisites.every(prereq => completedTopics.includes(prereq))) {
            return {
              topic,
              category: category.name
            }
          }
        }
      }
    }
    return null // Todos os tópicos foram completados
  }

  const markTopicAsCompleted = (topicRoute) => {
    if (!completedTopics.includes(topicRoute)) {
      setCompletedTopics(prev => [...prev, topicRoute]);
    }
  };

  const isTopicCompleted = (topicRoute) => {
    return completedTopics.includes(topicRoute);
  };

  const getProgressPercentage = (totalTopics) => {
    return Math.round((completedTopics.length / totalTopics) * 100);
  };

  return {
    completedTopics,
    userStats,
    completeTopicHandler,
    resetProgress,
    isCategoryUnlocked,
    getCategoryProgress,
    getNextRecommendedTopic,
    markTopicAsCompleted,
    isTopicCompleted,
    getProgressPercentage
  }
} 