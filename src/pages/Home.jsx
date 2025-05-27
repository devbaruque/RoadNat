import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Play, 
  Trophy, 
  Users, 
  BookOpen, 
  Zap, 
  Target,
  ArrowRight,
  Star
} from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Roadmap Interativo",
      description: "Siga um caminho estruturado baseado no roadmap.sh oficial do React Native"
    },
    {
      icon: Play,
      title: "Jogos Educativos",
      description: "Aprenda através de quizzes, desafios de código e mini-jogos divertidos"
    },
    {
      icon: Trophy,
      title: "Sistema de Conquistas",
      description: "Ganhe XP, badges e suba no ranking enquanto aprende"
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conecte-se com outros desenvolvedores e compartilhe seu progresso"
    },
    {
      icon: Zap,
      title: "Aprendizado Rápido",
      description: "Metodologia gamificada que acelera seu processo de aprendizado"
    },
    {
      icon: Target,
      title: "Foco em Prática",
      description: "Exercícios práticos e projetos reais para fixar o conhecimento"
    }
  ]

  const stats = [
    { number: "500+", label: "Exercícios" },
    { number: "50+", label: "Tópicos" },
    { number: "10k+", label: "Desenvolvedores" },
    { number: "95%", label: "Taxa de Sucesso" }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Aprenda{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600">
                  React Native
                </span>{' '}
                Jogando
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transforme seu aprendizado em uma jornada gamificada. 
                Siga o roadmap, complete desafios e torne-se um desenvolvedor mobile expert.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
                >
                  <span>Começar Agora</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/roadmap"
                  className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 font-medium py-3 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Ver Roadmap</span>
                  <BookOpen className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Quiz: Components</h3>
                    <p className="text-gray-600 text-sm">Nível Iniciante</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm text-gray-700">Qual é a função do componente View?</p>
                  </div>
                  <div className="space-y-2">
                    <div className="bg-primary-100 border-2 border-primary-300 rounded-lg p-2 text-sm">
                      ✓ Container básico para layout
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 text-sm text-gray-600">
                      Renderizar texto
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">+50 XP</span>
                  </div>
                  <div className="text-sm text-gray-500">2/5 questões</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Por que escolher o RoadNat?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma combina educação de qualidade com elementos de gamificação 
              para criar a melhor experiência de aprendizado em React Native.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Junte-se a milhares de desenvolvedores que já estão aprendendo React Native 
              de forma divertida e eficiente.
            </p>
            <Link
              to="/register"
              className="bg-white text-primary-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2 text-lg"
            >
              <span>Criar Conta Gratuita</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home 