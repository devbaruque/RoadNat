import { motion } from 'framer-motion'
import { getTopicsByCategory, getCategoryProgress, isTopicUnlocked } from '../../constants/roadmapData'
import TopicItem from './TopicItem'
import ProgressBar from './ProgressBar'

const CategoryCard = ({ category, completedTopics, onTopicSelect }) => {
  const topics = getTopicsByCategory(category.id)
  const progress = getCategoryProgress(category.id, completedTopics)
  const isStarted = progress > 0
  const isCompleted = progress === 100

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 transition-all duration-300 ${
        isCompleted 
          ? 'border-green-400 shadow-green-100' 
          : isStarted 
          ? 'border-blue-400 shadow-blue-100' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {/* Header da Categoria */}
      <div 
        className="p-6 text-white relative overflow-hidden"
        style={{ backgroundColor: category.color }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-3xl">{category.icon}</span>
            {isCompleted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-white/20 rounded-full p-2"
              >
                <span className="text-xl">✅</span>
              </motion.div>
            )}
          </div>
          
          <h3 className="text-xl font-bold mb-2">{category.name}</h3>
          <p className="text-white/90 text-sm mb-4">{category.description}</p>
          
          {/* Progress Bar */}
          <ProgressBar 
            progress={progress} 
            label={`${progress}% concluído`}
            color="bg-white"
            bgColor="bg-white/20"
            textColor="text-white"
          />
        </div>
      </div>

      {/* Lista de Tópicos */}
      <div className="p-6">
        <div className="space-y-3">
          {topics.map((topic, index) => {
            const unlocked = isTopicUnlocked(topic.id, completedTopics)
            const completed = completedTopics.includes(topic.id)
            
            return (
              <TopicItem
                key={topic.id}
                topic={topic}
                unlocked={unlocked}
                completed={completed}
                onClick={() => unlocked && onTopicSelect(topic)}
                delay={index * 0.1}
              />
            )
          })}
        </div>

        {/* Estatísticas da Categoria */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{topics.length} tópicos</span>
            <span>{completedTopics.filter(id => topics.some(t => t.id === id)).length} concluídos</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CategoryCard 