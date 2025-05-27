import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { 
  User, 
  LogOut, 
  Settings, 
  Trophy, 
  Flame,
  Menu,
  X,
  Heart
} from 'lucide-react'

const Header = () => {
  const { user, userProfile, signOut } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">RoadNat</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/roadmap" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Roadmap
            </Link>
            <Link 
              to="/games" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Jogos
            </Link>
            <Link 
              to="/challenges" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Desafios
            </Link>
            <Link 
              to="/ranking" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Ranking
            </Link>
            <Link 
              to="/doacoes" 
              className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium transition-colors bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg"
            >
              <Heart className="w-4 h-4" />
              <span>Apoiar</span>
            </Link>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* User Stats */}
                {userProfile && (
                  <div className="hidden sm:flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-orange-600">
                      <Flame className="w-4 h-4" />
                      <span className="font-medium">{userProfile.current_streak}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-yellow-600">
                      <Trophy className="w-4 h-4" />
                      <span className="font-medium">{userProfile.total_xp}</span>
                    </div>
                  </div>
                )}

                {/* Profile Menu */}
                <div className="relative">
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary-600" />
                    </div>
                    {userProfile && (
                      <span className="hidden sm:block text-sm font-medium text-gray-700">
                        {userProfile.username || userProfile.full_name}
                      </span>
                    )}
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                      <Link
                        to="/profile"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Perfil</span>
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Configurações</span>
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sair</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Entrar
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Cadastrar
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/roadmap" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Roadmap
              </Link>
              <Link 
                to="/games" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Jogos
              </Link>
              <Link 
                to="/challenges" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Desafios
              </Link>
              <Link 
                to="/ranking" 
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Ranking
              </Link>
              <Link 
                to="/doacoes" 
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors bg-red-50 hover:bg-red-100 px-2 py-2 rounded-lg mx-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="w-4 h-4" />
                <span>Apoiar Projeto</span>
              </Link>
              
              {!user && (
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-600 font-medium transition-colors px-2 py-1"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Entrar
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cadastrar
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 