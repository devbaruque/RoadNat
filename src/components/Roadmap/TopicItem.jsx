import { motion } from 'framer-motion'
import { Clock, Star, Lock, CheckCircle } from 'lucide-react'

const TopicItem = ({ topic, unlocked, completed, onClick, delay = 0 }) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'text-green-600 bg-green-100'
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100'
      case 'advanced':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyLabel = (level) => {
    switch (level) {
      case 'beginner':
        return 'Iniciante'
      case 'intermediate':
        return 'Intermediário'
      case 'advanced':
        return 'Avançado'
      default:
        return 'Indefinido'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
        completed
          ? 'bg-green-50 border-green-200 hover:border-green-300'
          : unlocked
          ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
          : 'bg-gray-50 border-gray-200 cursor-not-allowed opacity-60'
      }`}
      onClick={onClick}
      whileHover={unlocked ? { scale: 1.02 } : {}}
      whileTap={unlocked ? { scale: 0.98 } : {}}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {/* Status Icon */}
            {completed ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : unlocked ? (
              <Star className="w-5 h-5 text-blue-600" />
            ) : (
              <Lock className="w-5 h-5 text-gray-400" />
            )}
            
            <h4 className={`font-semibold ${
              completed ? 'text-green-800' : unlocked ? 'text-gray-900' : 'text-gray-500'
            }`}>
              {topic.title}
            </h4>
          </div>
          
          <p className={`text-sm mb-3 ${
            completed ? 'text-green-700' : unlocked ? 'text-gray-600' : 'text-gray-400'
          }`}>
            {topic.description}
          </p>
          
          <div className="flex items-center gap-3 text-xs">
            {/* Dificuldade */}
            <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(topic.difficulty_level)}`}>
              {getDifficultyLabel(topic.difficulty_level)}
            </span>
            
            {/* Tempo estimado */}
            <div className="flex items-center gap-1 text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{topic.estimated_time}min</span>
            </div>
            
            {/* XP Reward */}
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="w-3 h-3" />
              <span>{topic.xp_reward} XP</span>
            </div>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="ml-4">
          {completed ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-5 h-5 text-white" />
            </motion.div>
          ) : unlocked ? (
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <Lock className="w-4 h-4 text-gray-400" />
            </div>
          )}
        </div>
      </div>
      
      {/* Prerequisites indicator */}
      {topic.prerequisites && topic.prerequisites.length > 0 && !unlocked && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Pré-requisitos: {topic.prerequisites.length} tópico(s) necessário(s)
          </p>
        </div>
      )}
    </motion.div>
  )
}

export default TopicItem 