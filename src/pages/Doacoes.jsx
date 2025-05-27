import { useState } from 'react';
import QRCodePix from '../components/QRCodePix';
import roadnatLogo from '../assets/roadnat.png';

export default function Doacoes() {
  const [copiedPix, setCopiedPix] = useState(false);
  
  // Chave PIX do projeto (substitua pela chave real)
  const chavePix = "roadnat@exemplo.com";
  
  const copyPixKey = () => {
    navigator.clipboard.writeText(chavePix);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  const custosMensais = [
    { item: "Hospedagem do Site", valor: "R$ 25,00" },
    { item: "Domínio (.com.br)", valor: "R$ 8,00" },
    { item: "CDN e Performance", valor: "R$ 15,00" },
    { item: "Backup e Segurança", valor: "R$ 12,00" },
    { item: "Total Mensal", valor: "R$ 60,00", destaque: true }
  ];

  const melhorias = [
    {
      titulo: "Novos Cursos",
      descricao: "JavaScript, TypeScript, Node.js, Python",
      icone: "📚"
    },
    {
      titulo: "Exercícios Interativos",
      descricao: "Playground de código em tempo real",
      icone: "💻"
    },
    {
      titulo: "Certificados",
      descricao: "Certificados de conclusão reconhecidos",
      icone: "🏆"
    },
    {
      titulo: "Mentoria",
      descricao: "Suporte direto com desenvolvedores experientes",
      icone: "👨‍🏫"
    },
    {
      titulo: "App Mobile",
      descricao: "Aplicativo nativo para estudar em qualquer lugar",
      icone: "📱"
    },
    {
      titulo: "Comunidade",
      descricao: "Fórum e grupos de estudo colaborativos",
      icone: "🤝"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src={roadnatLogo} 
                alt="RoadNat Logo" 
                className="w-20 h-20 object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Apoie o RoadNat
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ajude-nos a transformar vidas através da educação em tecnologia
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Missão do Projeto */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img 
                  src={roadnatLogo} 
                  alt="RoadNat Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Nossa Missão</h2>
            </div>
            
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-gray-700 leading-relaxed mb-6">
                O <strong>RoadNat</strong> é um projeto <strong>sem fins lucrativos</strong> criado com o objetivo de democratizar o acesso ao conhecimento em tecnologia. Nossa missão é ajudar <strong>adolescentes, jovens e adultos</strong> a adquirirem as habilidades necessárias para:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-blue-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">💼</div>
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">Conseguir Emprego</h3>
                  <p className="text-blue-700 text-sm">Desenvolver habilidades valorizadas pelo mercado de trabalho</p>
                </div>
                
                <div className="bg-green-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Empreender</h3>
                  <p className="text-green-700 text-sm">Criar seu próprio negócio e aplicativos</p>
                </div>
                
                <div className="bg-purple-50 rounded-xl p-6 text-center">
                  <div className="text-4xl mb-4">📈</div>
                  <h3 className="text-lg font-semibold text-purple-800 mb-2">Crescer Profissionalmente</h3>
                  <p className="text-purple-700 text-sm">Evoluir na carreira e aumentar a renda</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custos do Projeto */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Custos para Manter o Projeto</h2>
              <p className="text-gray-600">
                Para manter o RoadNat disponível 24/7 na internet, temos custos mensais que precisam ser cobertos
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Custos Mensais</h3>
                <div className="space-y-3">
                  {custosMensais.map((custo, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        custo.destaque 
                          ? 'bg-blue-100 border-2 border-blue-300 font-semibold' 
                          : 'bg-white'
                      }`}
                    >
                      <span className={custo.destaque ? 'text-blue-800' : 'text-gray-700'}>
                        {custo.item}
                      </span>
                      <span className={custo.destaque ? 'text-blue-800' : 'text-gray-900'}>
                        {custo.valor}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm text-center">
                    <strong>💡 Transparência:</strong> Todos os valores são reais e necessários para manter a plataforma funcionando com qualidade e segurança.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mão de Obra Gratuita */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Trabalho Feito com ❤️</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Todo o desenvolvimento, pesquisa e manutenção do RoadNat é feito <strong>gratuitamente por amor à educação</strong>. 
                Veja quanto isso representaria em valores de mercado:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Custos de Desenvolvimento */}
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-purple-800 mb-4 text-center">💻 Desenvolvimento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Pesquisa e Planejamento (40h)</span>
                    <span className="text-gray-900 font-medium">R$ 3.200</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Design UI/UX (30h)</span>
                    <span className="text-gray-900 font-medium">R$ 2.400</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Programação Frontend (80h)</span>
                    <span className="text-gray-900 font-medium">R$ 6.400</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Programação Backend (60h)</span>
                    <span className="text-gray-900 font-medium">R$ 4.800</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Testes e Correções (25h)</span>
                    <span className="text-gray-900 font-medium">R$ 2.000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-100 rounded-lg border-2 border-purple-300">
                    <span className="text-purple-800 font-semibold">Subtotal Desenvolvimento</span>
                    <span className="text-purple-800 font-bold">R$ 18.800</span>
                  </div>
                </div>
              </div>

              {/* Custos de Conteúdo */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-4 text-center">📚 Conteúdo Educacional</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Pesquisa de Conteúdo (50h)</span>
                    <span className="text-gray-900 font-medium">R$ 3.000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Criação de 89 Tópicos (120h)</span>
                    <span className="text-gray-900 font-medium">R$ 7.200</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Exemplos de Código (40h)</span>
                    <span className="text-gray-900 font-medium">R$ 2.400</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Revisão e Atualização (30h)</span>
                    <span className="text-gray-900 font-medium">R$ 1.800</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <span className="text-gray-700">Organização do Roadmap (15h)</span>
                    <span className="text-gray-900 font-medium">R$ 900</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-100 rounded-lg border-2 border-green-300">
                    <span className="text-green-800 font-semibold">Subtotal Conteúdo</span>
                    <span className="text-green-800 font-bold">R$ 15.300</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Geral */}
            <div className="mt-8 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-6 border-2 border-orange-300">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-800 mb-2">💰 Valor Total do Projeto</h3>
                <div className="text-4xl font-bold text-orange-900 mb-4">R$ 34.100</div>
                <p className="text-orange-700 text-lg mb-4">
                  <strong>Tudo isso está sendo oferecido GRATUITAMENTE!</strong>
                </p>
                <div className="bg-white rounded-lg p-4 text-left">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <strong>📝 Nota:</strong> Valores baseados na média de mercado para desenvolvedores sênior (R$ 80/hora) 
                    e criadores de conteúdo educacional especializado (R$ 60/hora). Este trabalho está sendo realizado 
                    por <strong>amor à educação e ao compartilhamento de conhecimento</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Mensagem Motivacional */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <div className="text-center">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-xl font-semibold text-blue-800 mb-3">Por que fazemos isso?</h3>
                <p className="text-blue-700 leading-relaxed mb-4">
                  Acreditamos que <strong>educação de qualidade deve ser acessível a todos</strong>. Cada linha de código, 
                  cada tópico criado e cada hora investida é nossa contribuição para um mundo onde o conhecimento 
                  em tecnologia não seja um privilégio, mas um direito.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    <strong>💡 Sua contribuição:</strong> Embora o projeto já esteja excelente e funcional, 
                    sua doação nos ajuda a dedicar ainda mais tempo para melhorias, novos recursos e 
                    a criação de cursos adicionais. Cada real doado é reinvestido 100% no projeto!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formas de Contribuir */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Como Contribuir</h2>
              <p className="text-gray-600">
                Sua contribuição, por menor que seja, faz toda a diferença para manter o projeto vivo
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* PIX */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200">
                <div className="text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <h3 className="text-xl font-semibold text-green-800 mb-4">PIX</h3>
                  
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2">Chave PIX:</p>
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <code className="text-xs sm:text-sm text-gray-800 break-all block">{chavePix}</code>
                    </div>
                    <button
                      onClick={copyPixKey}
                      className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        copiedPix 
                          ? 'bg-green-500 text-white' 
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      {copiedPix ? '✓ Copiado!' : 'Copiar Chave PIX'}
                    </button>
                  </div>
                  
                  <p className="text-green-700 text-sm">
                    Contribuição rápida e segura via PIX
                  </p>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="text-center">
                  <div className="text-4xl mb-4">📷</div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">QR Code PIX</h3>
                  
                  <div className="bg-white rounded-lg p-6 mb-4 inline-block">
                    <QRCodePix chavePix={chavePix} />
                  </div>
                  
                  <p className="text-blue-700 text-sm">
                    Escaneie o código com o app do seu banco
                  </p>
                </div>
              </div>
            </div>

            {/* Valores Sugeridos */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800 text-center mb-4">
                💝 Valores Sugeridos (mas qualquer quantia ajuda!)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['R$ 5,00', 'R$ 10,00', 'R$ 25,00', 'R$ 50,00'].map((valor, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 text-center border border-gray-200 hover:border-blue-300 transition-colors">
                    <div className="text-lg font-semibold text-gray-800">{valor}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {index === 0 && 'Um cafezinho ☕'}
                      {index === 1 && 'Um lanche 🍕'}
                      {index === 2 && 'Meio mês de hospedagem 🏠'}
                      {index === 3 && 'Um mês completo 🚀'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Melhorias Futuras */}
        <div className="mb-16">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Melhorias Planejadas</h2>
              <p className="text-gray-600">
                Estamos sempre trabalhando para melhorar a plataforma e adicionar novos recursos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {melhorias.map((melhoria, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <div className="text-center">
                    <div className="text-3xl mb-3">{melhoria.icone}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{melhoria.titulo}</h3>
                    <p className="text-gray-600 text-sm">{melhoria.descricao}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">🎯 Meta: Novos Cursos</h3>
                <p className="text-purple-700 mb-4">
                  Com o apoio da comunidade, pretendemos lançar cursos completos de:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['JavaScript', 'TypeScript', 'Node.js', 'Python', 'Flutter', 'Vue.js'].map((curso, index) => (
                    <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      {curso}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Agradecimentos */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white shadow-lg">
            <div className="text-4xl mb-4">🙏</div>
            <h2 className="text-3xl font-bold mb-4">Muito Obrigado!</h2>
            <p className="text-lg mb-6 opacity-90">
              Cada contribuição nos ajuda a continuar transformando vidas através da educação em tecnologia.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm opacity-80">Estudantes Impactados</div>
              </div>
              <div>
                <div className="text-2xl font-bold">89</div>
                <div className="text-sm opacity-80">Tópicos Disponíveis</div>
              </div>
              <div>
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-80">Disponibilidade</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 