import { useState } from 'react';
import { 
  Building2, 
  Users, 
  TrendingUp, 
  Award, 
  Mail, 
  Phone, 
  Linkedin,
  CheckCircle,
  Star,
  Target,
  Briefcase,
  Heart
} from 'lucide-react';
import roadnatLogo from '../assets/roadnat.png';

export default function Empresas() {
  const [selectedPackage, setSelectedPackage] = useState('ouro');

  const packages = {
    ouro: {
      name: 'Pacote Ouro',
      price: 'R$ 50.000',
      limit: '2 empresas',
      color: 'from-yellow-400 to-orange-500',
      benefits: [
        'Logo em destaque na página inicial',
        'Seção dedicada "Powered by [Empresa]"',
        'Acesso prioritário a relatórios de talentos',
        '20 vagas de estágio/trainee por ano',
        'Certificados co-branded',
        'Webinars exclusivos com especialistas',
        'Reuniões mensais de acompanhamento',
        'Participação em eventos VIP'
      ]
    },
    prata: {
      name: 'Pacote Prata',
      price: 'R$ 30.000',
      limit: '3 empresas',
      color: 'from-gray-400 to-gray-600',
      benefits: [
        'Logo na página de parceiros',
        '10 vagas de estágio/trainee por ano',
        'Acesso a relatórios trimestrais',
        'Participação em eventos de networking',
        'Menção em comunicados de imprensa',
        'Reuniões trimestrais',
        'Acesso a comunidade exclusiva'
      ]
    },
    bronze: {
      name: 'Pacote Bronze',
      price: 'R$ 15.000',
      limit: '5 empresas',
      color: 'from-orange-600 to-red-600',
      benefits: [
        'Logo na página de parceiros',
        '5 vagas de estágio/trainee por ano',
        'Acesso a relatórios semestrais',
        'Participação em eventos anuais',
        'Certificado de responsabilidade social',
        'Reuniões semestrais'
      ]
    }
  };

  const stats = [
    { label: 'Usuários Projetados', value: '10.000+', icon: Users },
    { label: 'Certificados/Ano', value: '2.000+', icon: Award },
    { label: 'Taxa de Empregabilidade', value: '70%', icon: TrendingUp },
    { label: 'Aumento Médio de Renda', value: '180%', icon: Target }
  ];

  const benefits = [
    {
      title: 'Pipeline de Talentos',
      description: 'Acesso direto a desenvolvedores qualificados em formação',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Redução de Custos',
      description: 'Economia de até 60% nos processos de recrutamento',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Responsabilidade Social',
      description: 'Impacto mensurável na educação e inclusão digital',
      icon: Heart,
      color: 'red'
    },
    {
      title: 'Visibilidade de Marca',
      description: 'Associação com inovação educacional e tecnologia',
      icon: Star,
      color: 'purple'
    }
  ];

  const courses = [
    { name: 'JavaScript Avançado', topics: 40, status: 'Planejado' },
    { name: 'TypeScript Completo', topics: 35, status: 'Planejado' },
    { name: 'Node.js Backend', topics: 45, status: 'Planejado' },
    { name: 'Python para Iniciantes', topics: 50, status: 'Planejado' },
    { name: 'Flutter Development', topics: 40, status: 'Planejado' },
    { name: 'DevOps e Deploy', topics: 30, status: 'Planejado' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <img 
                src={roadnatLogo} 
                alt="RoadNat Logo" 
                className="w-24 h-24 object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Parcerias Empresariais
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              Junte-se a nós na missão de democratizar a educação em tecnologia e formar os talentos do futuro
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#pacotes" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Ver Pacotes de Parceria
              </a>
              <a 
                href="#contato" 
                className="border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors"
              >
                Falar com Especialista
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Estatísticas */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Impacto Projetado
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Números que demonstram o potencial de transformação do RoadNat
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-white/20">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefícios */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Por que Ser Nosso Parceiro?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Benefícios estratégicos para sua empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                <div className={`w-16 h-16 bg-${benefit.color}-100 rounded-full flex items-center justify-center mb-6`}>
                  <benefit.icon className={`w-8 h-8 text-${benefit.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pacotes de Parceria */}
        <div id="pacotes" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pacotes de Parceria
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Escolha o nível de parceria ideal para sua empresa
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(packages).map(([key, pkg]) => (
              <div 
                key={key}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border-2 transition-all duration-300 ${
                  selectedPackage === key 
                    ? 'border-blue-500 transform scale-105' 
                    : 'border-white/20 hover:border-blue-300'
                }`}
                onClick={() => setSelectedPackage(key)}
              >
                <div className={`w-full h-2 bg-gradient-to-r ${pkg.color} rounded-full mb-6`} />
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{pkg.price}</div>
                  <div className="text-sm text-gray-600">Limite: {pkg.limit}</div>
                </div>

                <div className="space-y-3">
                  {pkg.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-colors">
                  Solicitar Proposta
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Novos Cursos Planejados */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Expansão Planejada - 18 Meses
              </h2>
              <p className="text-lg text-gray-600">
                Novos cursos que serão desenvolvidos com o investimento das parcerias
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{course.name}</h3>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {course.status}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">{course.topics} tópicos</span> estruturados
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">
                  💰 Investimento Total Necessário
                </h3>
                <div className="text-3xl font-bold text-blue-900 mb-4">R$ 180.000</div>
                <p className="text-blue-700">
                  Para desenvolvimento completo de 6 novos cursos ao longo de 18 meses
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ROI para Empresas */}
        <div className="mb-20">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ROI para sua Empresa
              </h2>
              <p className="text-lg text-gray-600">
                Retorno sobre investimento calculado
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Economia em Recrutamento</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">60%</div>
                <p className="text-gray-600 text-sm">
                  Redução no tempo e custo de contratação
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Pipeline de Talentos</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">2-4 semanas</div>
                <p className="text-gray-600 text-sm">
                  Para encontrar candidatos pré-qualificados
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Visibilidade</h3>
                <div className="text-2xl font-bold text-purple-600 mb-2">10.000+</div>
                <p className="text-gray-600 text-sm">
                  Visualizações mensais estimadas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contato */}
        <div id="contato" className="mb-20">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-8 text-white shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Vamos Conversar?
              </h2>
              <p className="text-lg opacity-90">
                Entre em contato conosco para discutir uma parceria personalizada
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="opacity-90">parcerias@roadnat.com</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                <p className="opacity-90">(11) 99999-9999</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Linkedin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                <p className="opacity-90">/company/roadnat</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                Agendar Reunião
              </button>
            </div>
          </div>
        </div>

        {/* Call to Action Final */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Transforme Vidas, Construa o Futuro
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              Sua empresa pode ser parte da transformação de milhares de vidas, 
              ao mesmo tempo que constrói um pipeline de talentos qualificados para o futuro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Quero Ser Parceiro
              </button>
              <button className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors">
                Baixar Plano Completo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 