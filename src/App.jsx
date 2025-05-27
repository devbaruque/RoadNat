import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './components/Layout/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Roadmap from './pages/Roadmap'
import TemaDetalhe from './pages/TemaDetalhe'
import Dashboard from './pages/Dashboard'
import Games from './pages/Games'
import Ranking from './pages/Ranking'
import Challenges from './pages/Challenges'
import Doacoes from './pages/Doacoes'
import Empresas from './pages/Empresas'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="roadmap" element={<Roadmap />} />
              <Route path="tema/:nome" element={<TemaDetalhe />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="games" element={<Games />} />
              <Route path="ranking" element={<Ranking />} />
              <Route path="challenges" element={<Challenges />} />
              <Route path="doacoes" element={<Doacoes />} />
              <Route path="empresas" element={<Empresas />} />
              {/* Placeholder routes - will be implemented in next phases */}
              <Route path="profile" element={<div className="p-8 text-center">Perfil - Em breve!</div>} />
              <Route path="settings" element={<div className="p-8 text-center">Configurações - Em breve!</div>} />
              <Route path="*" element={<div className="p-8 text-center">Página não encontrada</div>} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
