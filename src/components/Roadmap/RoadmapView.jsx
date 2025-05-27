import { useState, useMemo } from "react";
import Balao from "./Balao";
import { roadmap } from "../../data/roadmap";
import roadnatLogo from "../../assets/roadnat.png";
import { useProgress } from "../../hooks/useProgress";

export default function RoadmapView() {
  const { getProgressPercentage, completedTopics } = useProgress();
  const progressPercentage = getProgressPercentage(roadmap.length);
  
  // Estados para filtros e busca
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('roadmap-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  // Categorias disponíveis
  const categories = [
    { id: "all", name: "Todos", icon: "🌟" },
    { id: "intro", name: "Introdução", icon: "🚀" },
    { id: "prereq", name: "Pré-requisitos", icon: "📚" },
    { id: "setup", name: "Configuração", icon: "⚙️" },
    { id: "components", name: "Componentes", icon: "🧩" },
    { id: "styling", name: "Estilização", icon: "🎨" },
    { id: "navigation", name: "Navegação", icon: "🧭" },
    { id: "state", name: "Estado", icon: "🔄" },
    { id: "networking", name: "Networking", icon: "🌐" },
    { id: "storage", name: "Armazenamento", icon: "💾" },
    { id: "native", name: "Recursos Nativos", icon: "📱" },
    { id: "performance", name: "Performance", icon: "⚡" },
    { id: "testing", name: "Testes", icon: "🧪" },
    { id: "deployment", name: "Deploy", icon: "🚀" }
  ];

  // Função para categorizar temas (baseada no índice ou nome)
  const getCategoryForTopic = (topic, index) => {
    const name = topic.nome.toLowerCase();
    if (index < 6) return "intro";
    if (name.includes("javascript") || name.includes("react") || name.includes("typescript")) return "prereq";
    if (name.includes("expo") || name.includes("cli") || name.includes("ambiente")) return "setup";
    if (name.includes("view") || name.includes("text") || name.includes("button") || name.includes("image") || name.includes("scroll") || name.includes("flatlist") || name.includes("textinput") || name.includes("touchable") || name.includes("modal") || name.includes("picker") || name.includes("switch") || name.includes("slider") || name.includes("webview") || name.includes("camera") || name.includes("maps")) return "components";
    if (name.includes("stylesheet") || name.includes("flexbox") || name.includes("layout")) return "styling";
    if (name.includes("navigation") || name.includes("stack") || name.includes("tab") || name.includes("drawer")) return "navigation";
    if (name.includes("state") || name.includes("context") || name.includes("redux") || name.includes("hooks")) return "state";
    if (name.includes("fetch") || name.includes("api") || name.includes("http") || name.includes("networking")) return "networking";
    if (name.includes("storage") || name.includes("asyncstorage") || name.includes("database")) return "storage";
    if (name.includes("permissions") || name.includes("device") || name.includes("native") || name.includes("linking")) return "native";
    if (name.includes("performance") || name.includes("optimization") || name.includes("memory")) return "performance";
    if (name.includes("testing") || name.includes("jest") || name.includes("detox")) return "testing";
    if (name.includes("build") || name.includes("deploy") || name.includes("store") || name.includes("release")) return "deployment";
    return "components"; // default
  };

  // Função para alternar favoritos
  const toggleFavorite = (topicRoute) => {
    const newFavorites = favorites.includes(topicRoute)
      ? favorites.filter(fav => fav !== topicRoute)
      : [...favorites, topicRoute];
    
    setFavorites(newFavorites);
    localStorage.setItem('roadmap-favorites', JSON.stringify(newFavorites));
  };

  // Filtrar temas baseado na busca, categoria e favoritos
  const filteredTopics = useMemo(() => {
    return roadmap.filter((topic, index) => {
      const matchesSearch = topic.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const topicCategory = getCategoryForTopic(topic, index);
      const matchesCategory = selectedCategory === "all" || topicCategory === selectedCategory;
      const matchesFavorites = !showFavoritesOnly || favorites.includes(topic.rota);
      
      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [searchTerm, selectedCategory, showFavoritesOnly, favorites]);

  // Estatísticas
  const stats = {
    total: roadmap.length,
    completed: completedTopics.length,
    favorites: favorites.length,
    remaining: roadmap.length - completedTopics.length
  };

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
        <div className="flex justify-center mb-8">
          <img 
            src={roadnatLogo} 
            alt="RoadNat Logo" 
            className="w-20 h-20 object-contain"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-fade-in">
          React Native Roadmap
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Sua jornada completa para dominar o desenvolvimento mobile com React Native
        </p>
        
        {/* Barra de Progresso Geral */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700">Progresso Geral</span>
              <span className="text-sm font-bold text-blue-600">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              {completedTopics.length} de {roadmap.length} tópicos concluídos
            </div>
          </div>
        </div>
        
        {/* Linha decorativa */}
        <div className="flex items-center justify-center mt-8 space-x-4">
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
          <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full animate-pulse" />
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
        </div>
      </div>

      {/* Estatísticas Gamificadas */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
            <div className="text-xs text-gray-600">Total de Tópicos</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-xs text-gray-600">Concluídos</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-purple-600">{stats.favorites}</div>
            <div className="text-xs text-gray-600">Favoritos</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20">
            <div className="text-2xl font-bold text-orange-600">{stats.remaining}</div>
            <div className="text-xs text-gray-600">Restantes</div>
          </div>
        </div>
      </div>

      {/* Controles de Busca e Filtros */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 roadmap-controls">
          {/* Busca */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar tópicos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              />
            </div>
          </div>

          {/* Filtros de Categoria */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrar por Categoria:</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Favoritos */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showFavoritesOnly
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>Apenas Favoritos</span>
              </button>
              
              {/* Botão Limpar Filtros */}
              {(searchTerm || selectedCategory !== "all" || showFavoritesOnly) && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                    setShowFavoritesOnly(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Limpar Filtros</span>
                </button>
              )}
            </div>
            
            <div className="text-sm text-gray-600">
              Mostrando {filteredTopics.length} de {roadmap.length} tópicos
            </div>
          </div>
        </div>
      </div>

      {/* Container do roadmap */}
      <div className="max-w-4xl mx-auto relative">
        {/* Linha de fundo do roadmap */}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-indigo-200 rounded-full opacity-50" />
        
        {/* Balões do roadmap */}
        <div className="flex flex-col items-center space-y-8 relative z-10">
          {filteredTopics.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.08-2.33M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Nenhum tópico encontrado</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? `Não encontramos tópicos para "${searchTerm}"` : 
                 showFavoritesOnly ? "Você ainda não tem tópicos favoritos" :
                 "Nenhum tópico corresponde aos filtros selecionados"}
              </p>
              <div className="space-x-4">
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Limpar busca
                  </button>
                )}
                {selectedCategory !== "all" && (
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Ver todas as categorias
                  </button>
                )}
                {showFavoritesOnly && (
                  <button
                    onClick={() => setShowFavoritesOnly(false)}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Ver todos os tópicos
                  </button>
                )}
              </div>
            </div>
          ) : (
            filteredTopics.map((tema, index) => {
              const originalIndex = roadmap.findIndex(t => t.rota === tema.rota);
              return (
                <div 
                  key={tema.rota} 
                  className="animate-fade-in-up relative group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Botão de Favorito */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(tema.rota);
                    }}
                    className="absolute -top-2 -right-2 z-20 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center hover:scale-110 transition-transform"
                    title={favorites.includes(tema.rota) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <svg 
                      className={`w-4 h-4 ${favorites.includes(tema.rota) ? 'text-red-500' : 'text-gray-400'}`} 
                      fill={favorites.includes(tema.rota) ? "currentColor" : "none"}
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </button>

                  {/* Badge de Categoria */}
                  <div className="absolute -top-3 -left-3 z-10">
                    <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {categories.find(cat => cat.id === getCategoryForTopic(tema, originalIndex))?.icon}
                    </div>
                  </div>

                  <Balao 
                    nome={tema.nome} 
                    rota={tema.rota} 
                    index={originalIndex}
                    isLast={originalIndex === roadmap.length - 1}
                  />
                </div>
              );
            })
          )}
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