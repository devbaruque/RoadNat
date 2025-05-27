import { useParams, useNavigate } from "react-router-dom";
import { roadmap } from "../data/roadmap";
import { useState } from "react";
import Modal from "../components/UI/Modal";
import { useProgress } from "../hooks/useProgress";

export default function TemaDetalhe() {
  const { nome } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('conteudo');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  
  const { markTopicAsCompleted, isTopicCompleted, getProgressPercentage } = useProgress();

  // Encontrar o tema correspondente
  const tema = roadmap.find(t => t.rota === nome);

  if (!tema) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Tema não encontrado</h1>
          <p className="text-gray-600 mb-8">O tema que você está procurando não existe.</p>
          <button
            onClick={() => navigate('/roadmap')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Voltar ao Roadmap
          </button>
        </div>
      </div>
    );
  }

  // Função para gerar conteúdo padrão baseado no nome do tema
  const gerarConteudoPadrao = (nomeTema) => {
    return `Este é o tópico sobre ${nomeTema} no React Native.

📚 O que você vai aprender:
- Conceitos fundamentais sobre ${nomeTema}
- Como implementar ${nomeTema} em seus projetos
- Melhores práticas e dicas importantes
- Exemplos práticos de uso

🎯 Objetivos de aprendizado:
- Compreender a importância de ${nomeTema}
- Saber quando e como usar ${nomeTema}
- Aplicar os conhecimentos em projetos reais

💡 Este conteúdo está sendo desenvolvido e será atualizado em breve com informações mais detalhadas, exemplos práticos e exercícios interativos.`;
  };

  // Função para gerar exemplo de código padrão
  const gerarExemploPadrao = (nomeTema) => {
    return `// Exemplo de ${nomeTema} em React Native
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ${nomeTema.replace(/[^a-zA-Z0-9]/g, '')}Example = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Exemplo de ${nomeTema}
      </Text>
      <Text style={styles.description}>
        Este é um exemplo básico de como usar ${nomeTema}.
        O conteúdo será atualizado com exemplos mais detalhados.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default ${nomeTema.replace(/[^a-zA-Z0-9]/g, '')}Example;`;
  };

  // Usar conteúdo existente ou gerar padrão
  const conteudo = tema.conteudo || gerarConteudoPadrao(tema.nome);
  const exemplo = tema.exemplo || gerarExemploPadrao(tema.nome);
  const descricao = tema.descricao || `Aprenda sobre ${tema.nome} no React Native`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }).catch(err => {
      console.error('Erro ao copiar texto: ', err);
      // Fallback para navegadores mais antigos
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const handleMarkAsCompleted = () => {
    markTopicAsCompleted(tema.rota);
  };

  const handleVideoClick = () => {
    setShowVideoModal(true);
  };

  const handleExercisesClick = () => {
    navigate('/games');
  };

  const isCompleted = isTopicCompleted(tema.rota);
  const progressPercentage = getProgressPercentage(roadmap.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Toast de Notificação Global */}
      {copySuccess && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[100] animate-copy-notification">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-xl flex items-center space-x-3 border border-green-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-medium">Código copiado com sucesso!</span>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/roadmap')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Voltar ao Roadmap</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Tópico {roadmap.findIndex(t => t.rota === nome) + 1} de {roadmap.length}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Progresso Geral: {progressPercentage}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Título e Descrição */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            {tema.nome}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {descricao}
          </p>
          {isCompleted && (
            <div className="mt-4 inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Tópico Concluído</span>
            </div>
          )}
        </div>

        {/* Navegação por Abas */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-full p-1 shadow-lg border border-white/20">
            <button
              onClick={() => setActiveTab('conteudo')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'conteudo'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              📚 Conteúdo
            </button>
            <button
              onClick={() => setActiveTab('exemplo')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeTab === 'exemplo'
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              💻 Exemplo
            </button>
          </div>
        </div>

        {/* Conteúdo das Abas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            {activeTab === 'conteudo' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                <div className="prose prose-lg max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {conteudo}
                  </div>
                </div>
                
                {/* Botão de Concluído */}
                {!isCompleted && (
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleMarkAsCompleted}
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Marcar como Concluído</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'exemplo' && (
              <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-700">
                {/* Header do código */}
                <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      {tema.nome.toLowerCase().replace(/\s+/g, '-')}.js
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(exemplo)}
                    className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700 relative"
                    title="Copiar código"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
                
                {/* Código */}
                <div className="p-6 overflow-x-auto">
                  <pre className="text-sm text-gray-300 leading-relaxed">
                    <code>{exemplo}</code>
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progresso */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Progresso
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Progresso Geral</span>
                  <span className="text-blue-600 font-medium">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  {Math.round((progressPercentage / 100) * roadmap.length)} de {roadmap.length} tópicos concluídos
                </div>
              </div>
            </div>

            {/* Navegação */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                Navegação
              </h3>
              
              <div className="space-y-3">
                {/* Tópico Anterior */}
                {roadmap.findIndex(t => t.rota === nome) > 0 && (
                  <button
                    onClick={() => {
                      const prevIndex = roadmap.findIndex(t => t.rota === nome) - 1;
                      navigate(`/tema/${roadmap[prevIndex].rota}`);
                    }}
                    className="w-full text-left p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200"
                  >
                    <div className="text-xs text-gray-500 mb-1">← Anterior</div>
                    <div className="text-sm font-medium text-gray-800">
                      {roadmap[roadmap.findIndex(t => t.rota === nome) - 1].nome}
                    </div>
                  </button>
                )}

                {/* Tópico Seguinte */}
                {roadmap.findIndex(t => t.rota === nome) < roadmap.length - 1 && (
                  <button
                    onClick={() => {
                      const nextIndex = roadmap.findIndex(t => t.rota === nome) + 1;
                      navigate(`/tema/${roadmap[nextIndex].rota}`);
                    }}
                    className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    <div className="text-xs text-blue-600 mb-1">Próximo →</div>
                    <div className="text-sm font-medium text-blue-800">
                      {roadmap[roadmap.findIndex(t => t.rota === nome) + 1].nome}
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Recursos Adicionais */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Recursos
              </h3>
              
              <div className="space-y-3 text-sm">
                <a href="https://reactnative.dev/docs/getting-started" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Documentação Oficial
                </a>
                <button 
                  onClick={handleExercisesClick}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors w-full text-left"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Exercícios Práticos
                </button>
                <button 
                  onClick={handleVideoClick}
                  className="flex items-center text-blue-600 hover:text-blue-800 transition-colors w-full text-left"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Vídeo Tutorial
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Vídeo Tutorial */}
      <Modal
        isOpen={showVideoModal}
        onClose={() => setShowVideoModal(false)}
        title="🎥 Vídeo Tutorial"
        size="md"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="text-lg font-semibold text-gray-800 mb-3">
            Vídeo em Desenvolvimento
          </h4>
          <p className="text-gray-600 mb-6">
            Estamos trabalhando para criar vídeos tutoriais de alta qualidade para todos os tópicos do roadmap. 
            O vídeo para <strong>"{tema.nome}"</strong> estará disponível em breve!
          </p>
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              <strong>💡 Dica:</strong> Enquanto isso, você pode explorar o conteúdo escrito e os exemplos de código disponíveis nesta página.
            </p>
          </div>
          <button
            onClick={() => setShowVideoModal(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Entendi
          </button>
        </div>
      </Modal>
    </div>
  );
} 