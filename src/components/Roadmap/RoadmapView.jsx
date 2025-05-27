import Balao from "./Balao";
import { roadmap } from "../../data/roadmap";

export default function RoadmapView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fundo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse animation-delay-1000" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-green-200/30 rounded-full blur-xl animate-pulse animation-delay-2000" />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-orange-200/30 rounded-full blur-xl animate-pulse animation-delay-3000" />
      </div>

      {/* Título principal */}
      <div className="text-center mb-16 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-fade-in">
          React Native Roadmap
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Sua jornada completa para dominar o desenvolvimento mobile com React Native
        </p>
        
        {/* Linha decorativa */}
        <div className="flex items-center justify-center mt-8 space-x-4">
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
        </div>
      </div>

      {/* Container do roadmap */}
      <div className="max-w-4xl mx-auto relative">
        {/* Linha de fundo do roadmap */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200 rounded-full opacity-50" />
        
        {/* Balões do roadmap */}
        <div className="flex flex-col items-center space-y-8 relative z-10">
          {roadmap.map((tema, index) => (
            <div 
              key={tema.rota} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Balao 
                nome={tema.nome} 
                rota={tema.rota} 
                index={index}
                isLast={index === roadmap.length - 1}
              />
            </div>
          ))}
        </div>

        {/* Indicador de progresso */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-white/20">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-gray-700 font-medium">
              {roadmap.length} tópicos disponíveis
            </span>
          </div>
        </div>
      </div>

      {/* Seção de estatísticas */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Roadmap Completo</h3>
            <p className="text-gray-600 text-sm">Do básico ao avançado, cobrindo todos os aspectos</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Exemplos Práticos</h3>
            <p className="text-gray-600 text-sm">Código real e aplicável em projetos</p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Progresso Claro</h3>
            <p className="text-gray-600 text-sm">Acompanhe sua evolução passo a passo</p>
          </div>
        </div>
      </div>

      {/* Seção de categorias */}
      <div className="mt-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Categorias do Roadmap
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Introdução</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">Conceitos básicos e fundamentos</p>
            <div className="text-xs text-blue-600 font-medium">6 tópicos</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Pré-requisitos</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">Conhecimentos necessários</p>
            <div className="text-xs text-green-600 font-medium">5 tópicos</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-2xl">⚙️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Configuração</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">Setup do ambiente de desenvolvimento</p>
            <div className="text-xs text-purple-600 font-medium">5 tópicos</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-2xl">🧩</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Componentes</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">Componentes nativos e interfaces</p>
            <div className="text-xs text-orange-600 font-medium">15+ tópicos</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Estilização</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">Layouts, flexbox e design</p>
            <div className="text-xs text-red-600 font-medium">3 tópicos</div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Avançado</h3>
            </div>
            <p className="text-gray-600 text-sm mb-3">Performance, testes e publicação</p>
            <div className="text-xs text-indigo-600 font-medium">20+ tópicos</div>
          </div>
        </div>
      </div>
    </div>
  );
} 