import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useProgress } from "../../hooks/useProgress";

export default function Balao({ nome, rota, index, isLast }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { isTopicCompleted } = useProgress();

  const isCompleted = isTopicCompleted(rota);

  // Cores alternadas para os balões
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600', 
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
    'from-teal-500 to-teal-600',
    'from-red-500 to-red-600',
    'from-yellow-500 to-yellow-600',
    'from-cyan-500 to-cyan-600'
  ];

  const colorClass = colors[index % colors.length];

  return (
    <div className="relative flex flex-col items-center">
      {/* Balão */}
      <div className="relative z-10">
        <button
          onClick={() => navigate(`/tema/${rota}`)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            bg-gradient-to-r ${isCompleted ? 'from-green-500 to-green-600' : colorClass}
            text-white px-8 py-4 rounded-full 
            shadow-lg hover:shadow-xl
            transform transition-all duration-300 ease-in-out
            hover:scale-110 hover:-translate-y-2
            font-semibold text-sm md:text-base
            min-w-[200px] max-w-[280px]
            border-2 border-white/20
            backdrop-blur-sm
            ${isHovered ? 'animate-pulse' : ''}
            relative
          `}
        >
          <span className="relative z-10">{nome}</span>
          
          {/* Indicador de conclusão */}
          {isCompleted && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          
          {/* Brilho interno */}
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
          
          {/* Efeito de partículas */}
          {isHovered && (
            <div className="absolute inset-0 rounded-full">
              <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping" />
              <div className="absolute top-4 right-6 w-1 h-1 bg-white rounded-full animate-ping animation-delay-200" />
              <div className="absolute bottom-3 left-6 w-1 h-1 bg-white rounded-full animate-ping animation-delay-400" />
            </div>
          )}
        </button>
      </div>

      {/* Linha conectora curva */}
      {!isLast && (
        <div className="relative z-0 flex flex-col items-center">
          {/* Linha principal */}
          <div className={`w-1 h-16 bg-gradient-to-b ${isCompleted ? 'from-green-300 to-green-400' : 'from-gray-300 to-gray-400'} rounded-full mt-4 mb-4 shadow-sm`} />
          
          {/* Seta */}
          <div className="relative">
            <div className={`w-0 h-0 border-l-[8px] border-r-[8px] border-t-[12px] border-l-transparent border-r-transparent ${isCompleted ? 'border-t-green-400' : 'border-t-gray-400'} mb-2`} />
            
            {/* Efeito de brilho na seta */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white/50 rounded-full animate-pulse" />
          </div>
          
          {/* Linha curva decorativa */}
          <svg 
            width="60" 
            height="30" 
            className="absolute top-8 left-1/2 transform -translate-x-1/2 opacity-30"
          >
            <path
              d="M10 15 Q30 5 50 15"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isCompleted ? "#10b981" : "#3b82f6"} />
                <stop offset="100%" stopColor={isCompleted ? "#059669" : "#8b5cf6"} />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </div>
  );
} 