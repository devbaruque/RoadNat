import { motion } from 'framer-motion'
import { categories } from '../../constants/roadmapData'
import { useGamification } from '../../hooks/useGamification.jsx'
import CategoryCard from './CategoryCard'
import TopicModal from './TopicModal'
import ProgressBar from './ProgressBar'
import { useState } from 'react'

const RoadmapView = () => {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const {
    completedTopics,
    userStats,
    completeTopicWithGamification,
    getCategoryProgress,
    levelProgress
  } = useGamification()

  // Obter próximo tópico recomendado (implementação simplificada)
  const getNextRecommendedTopic = () => {
    // Esta lógica pode ser movida para o hook useGamification se necessário
    for (const category of categories) {
      const topics = require('../../constants/roadmapData').getTopicsByCategory(category.id)
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

  const nextRecommended = getNextRecommendedTopic()

  const handleTopicComplete = (topicId) => {
    const wasCompleted = completeTopicWithGamification(topicId)
    if (wasCompleted) {
      console.log(`Tópico ${topicId} concluído com gamificação!`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🗺️ Roadmap React Native
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Sua jornada para dominar React Native
          </p>
          
          {/* Progresso Geral */}
          <div className="max-w-md mx-auto">
            <ProgressBar 
              progress={userStats.overallProgress} 
              label={`Progresso Geral: ${userStats.overallProgress}%`}
              color="bg-primary-500"
            />
          </div>

          {/* Próximo Tópico Recomendado */}
          {nextRecommended && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 bg-white rounded-lg shadow-md p-4 max-w-md mx-auto border-l-4 border-blue-500"
            >
              <h3 className="font-semibold text-gray-900 mb-1">📚 Próximo Recomendado</h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">{nextRecommended.topic.title}</span>
                <span className="text-gray-400"> • {nextRecommended.category}</span>
              </p>
              <button
                onClick={() => setSelectedTopic(nextRecommended.topic)}
                className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Começar agora →
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CategoryCard
                category={category}
                completedTopics={completedTopics}
                onTopicSelect={setSelectedTopic}
              />
            </motion.div>
          ))}
        </div>

        {/* Estatísticas Gamificadas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-white rounded-xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            📊 Suas Estatísticas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">
                {completedTopics.length}
              </div>
              <div className="text-gray-600">Tópicos Concluídos</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-600">
                {userStats.totalXP.toLocaleString()}
              </div>
              <div className="text-gray-600">XP Total</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-accent-600">
                {userStats.level}
              </div>
              <div className="text-gray-600">Nível Atual</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {userStats.currentStreak}
              </div>
              <div className="text-gray-600">Sequência (dias)</div>
            </div>
          </div>

          {/* Progresso do Nível */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Progresso do Nível {userStats.level}
            </h3>
            <div className="max-w-md mx-auto">
              <ProgressBar
                progress={levelProgress.progressPercentage}
                label={`${levelProgress.currentLevelXP} / ${levelProgress.currentLevelXP + levelProgress.xpNeededForNext} XP`}
                color="bg-gradient-to-r from-yellow-400 to-orange-500"
                height="h-3"
              />
              <div className="text-center text-sm text-gray-500 mt-2">
                {levelProgress.xpNeededForNext} XP para o próximo nível
              </div>
            </div>
          </div>

          {/* Progresso por Categoria */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Progresso por Categoria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map(category => {
                const progress = getCategoryProgress(category.id)
                return (
                  <div key={category.id} className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-gray-700">{category.name}</span>
                        <span className="text-gray-500">{progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="h-2 rounded-full"
                          style={{ backgroundColor: category.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Modal do Tópico */}
        {selectedTopic && (
          <TopicModal
            topic={selectedTopic}
            isCompleted={completedTopics.includes(selectedTopic.id)}
            onClose={() => setSelectedTopic(null)}
            onComplete={() => handleTopicComplete(selectedTopic.id)}
          />
        )}
      </div>
    </div>
  )
}

export default RoadmapView 