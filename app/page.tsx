"use client"
import { AuthProvider } from "./contexts/AuthContext"
import { LocationProvider } from "./contexts/LocationContext"
import LoginScreen from "./screens/LoginScreen"
import MainApp from "./screens/MainApp"
import { useAuth } from "./contexts/AuthContext"

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-indigo-600">
        <div className="text-white text-xl">Carregando FestaPerto...</div>
      </div>
    )
  }

  return user ? <MainApp /> : <LoginScreen />
}

export default function App() {
  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl">
      <AuthProvider>
        <LocationProvider>
          <AppContent />
        </LocationProvider>
      </AuthProvider>
    </div>
  )
}
