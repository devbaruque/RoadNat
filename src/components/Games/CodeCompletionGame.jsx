import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Lightbulb, CheckCircle, XCircle, Play, Pause, Code } from 'lucide-react'

const CodeCompletionGame = ({ 
  game, 
  gameState, 
  timeRemaining, 
  score, 
  streak, 
  hintsUsed,
  onSubmitAnswer, 
  onUseHint, 
  onTogglePause,
  onEndGame 
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [revealedHints, setRevealedHints] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Reset quando o jogo muda
  useEffect(() => {
    setSelectedAnswers({})
    setShowResults(false)
    setRevealedHints([])
    setIsSubmitted(false)
  }, [game?.id])

  const handleAnswerSelect = (blankId, answer) => {
    if (isSubmitted || gameState !== 'playing') return
    
    setSelectedAnswers(prev => ({
      ...prev,
      [blankId]: answer
    }))
  }

  const handleSubmit = () => {
    if (isSubmitted) return

    const totalBlanks = game.blanks.length
    const answeredBlanks = Object.keys(selectedAnswers).length
    
    if (answeredBlanks < totalBlanks) {
      alert('Por favor, preencha todas as lacunas antes de submeter.')
      return
    }

    setIsSubmitted(true)
    setShowResults(true)

    // Verificar respostas
    let correctCount = 0
    game.blanks.forEach(blank => {
      if (selectedAnswers[blank.id] === blank.answer) {
        correctCount++
      }
    })

    const isAllCorrect = correctCount === totalBlanks
    const accuracy = (correctCount / totalBlanks) * 100

    onSubmitAnswer(selectedAnswers, isAllCorrect)
    
    setTimeout(() => {
      if (isAllCorrect) {
        onEndGame(true, `Perfeito! ${correctCount}/${totalBlanks} corretas!`)
      } else {
        onEndGame(false, `${correctCount}/${totalBlanks} corretas. Tente novamente!`)
      }
    }, 3000)
  }

  const handleUseHint = () => {
    const hint = onUseHint()
    if (hint === 'hint_show_answer') {
      // Revelar uma resposta aleatória que ainda não foi revelada
      const unrevealedBlanks = game.blanks.filter(blank => 
        !revealedHints.includes(blank.id) && !selectedAnswers[blank.id]
      )
      
      if (unrevealedBlanks.length > 0) {
        const randomBlank = unrevealedBlanks[Math.floor(Math.random() * unrevealedBlanks.length)]
        setRevealedHints(prev => [...prev, randomBlank.id])
        setSelectedAnswers(prev => ({
          ...prev,
          [randomBlank.id]: randomBlank.answer
        }))
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const renderCodeWithBlanks = () => {
    let codeLines = game.codeTemplate.split('\n')
    let blankIndex = 0

    return codeLines.map((line, lineIndex) => {
      let processedLine = line
      
      // Substituir ___ por dropdowns
      while (processedLine.includes('___') && blankIndex < game.blanks.length) {
        const blank = game.blanks[blankIndex]
        const isCorrect = showResults && selectedAnswers[blank.id] === blank.answer
        const isIncorrect = showResults && selectedAnswers[blank.id] && selectedAnswers[blank.id] !== blank.answer
        const isRevealed = revealedHints.includes(blank.id)
        
        const dropdown = `<select 
          data-blank-id="${blank.id}" 
          class="inline-block mx-1 px-2 py-1 border rounded text-sm font-mono
            ${isCorrect ? 'bg-green-100 border-green-500 text-green-800' : 
              isIncorrect ? 'bg-red-100 border-red-500 text-red-800' :
              isRevealed ? 'bg-yellow-100 border-yellow-500 text-yellow-800' :
              'bg-white border-gray-300'}"
          ${isSubmitted ? 'disabled' : ''}
        >
          <option value="">___</option>
          ${blank.options.map(option => 
            `<option value="${option}" ${selectedAnswers[blank.id] === option ? 'selected' : ''}>${option}</option>`
          ).join('')}
        </select>`
        
        processedLine = processedLine.replace('___', dropdown)
        blankIndex++
      }

      return (
        <div key={lineIndex} className="flex">
          <span className="text-gray-400 text-sm mr-4 select-none w-8 text-right">
            {lineIndex + 1}
          </span>
          <div 
            className="flex-1 font-mono text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        </div>
      )
    })
  }

  // Adicionar event listeners para os selects
  useEffect(() => {
    const handleSelectChange = (e) => {
      const blankId = parseInt(e.target.getAttribute('data-blank-id'))
      const value = e.target.value
      handleAnswerSelect(blankId, value)
    }

    const selects = document.querySelectorAll('select[data-blank-id]')
    selects.forEach(select => {
      select.addEventListener('change', handleSelectChange)
    })

    return () => {
      selects.forEach(select => {
        select.removeEventListener('change', handleSelectChange)
      })
    }
  })

  if (!game) return null

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header do Jogo */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Code className="w-8 h-8 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{game.title}</h2>
              <p className="text-gray-600">{game.description}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              game.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              game.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {game.difficulty === 'beginner' ? 'Iniciante' :
               game.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
            </span>
          </div>
          
          <button
            onClick={onTogglePause}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {gameState === 'playing' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {gameState === 'playing' ? 'Pausar' : 'Continuar'}
          </button>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-5 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Tempo</span>
            </div>
            <div className={`text-xl font-bold ${timeRemaining <= 30 ? 'text-red-600' : 'text-blue-600'}`}>
              {formatTime(timeRemaining)}
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-sm font-medium text-green-700 mb-1">Pontos</div>
            <div className="text-xl font-bold text-green-600">{score}</div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="text-sm font-medium text-purple-700 mb-1">Progresso</div>
            <div className="text-xl font-bold text-purple-600">
              {Object.keys(selectedAnswers).length}/{game.blanks.length}
            </div>
          </div>
          
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-sm font-medium text-orange-700 mb-1">XP Possível</div>
            <div className="text-xl font-bold text-orange-600">{game.xpReward}</div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="text-sm font-medium text-yellow-700 mb-1">Dicas</div>
            <div className="text-xl font-bold text-yellow-600">{revealedHints.length}</div>
          </div>
        </div>
      </div>

      {/* Editor de Código */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-xl shadow-lg overflow-hidden mb-6"
      >
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-sm ml-4">Complete o código</span>
        </div>
        
        <div className="p-6 text-green-400 overflow-x-auto">
          <div className="space-y-1">
            {renderCodeWithBlanks()}
          </div>
        </div>
      </motion.div>

      {/* Botões de Ação */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handleUseHint}
          disabled={hintsUsed >= 2 || isSubmitted}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Lightbulb className="w-4 h-4" />
          Revelar Resposta ({2 - hintsUsed} restantes)
        </button>

        <button
          onClick={handleSubmit}
          disabled={Object.keys(selectedAnswers).length < game.blanks.length || isSubmitted}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Verificar Código
        </button>
      </div>

      {/* Resultado */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Resultado:</h3>
            <div className="space-y-2">
              {game.blanks.map(blank => {
                const userAnswer = selectedAnswers[blank.id]
                const isCorrect = userAnswer === blank.answer
                const wasRevealed = revealedHints.includes(blank.id)
                
                return (
                  <div key={blank.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600" />
                    )}
                    <div className="flex-1">
                      <span className="font-mono text-sm">
                        Lacuna {blank.id + 1}: 
                        <span className={`ml-2 px-2 py-1 rounded ${
                          isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {userAnswer || '(vazio)'}
                        </span>
                        {!isCorrect && (
                          <span className="ml-2 text-gray-600">
                            (Correto: <span className="font-semibold">{blank.answer}</span>)
                          </span>
                        )}
                        {wasRevealed && (
                          <span className="ml-2 text-yellow-600 text-xs">(Revelado)</span>
                        )}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay de Pausa */}
      <AnimatePresence>
        {gameState === 'paused' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-8 text-center"
            >
              <Pause className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Jogo Pausado</h3>
              <p className="text-gray-600 mb-4">Clique em "Continuar" para retomar</p>
              <button
                onClick={onTogglePause}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Continuar Jogo
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CodeCompletionGame 