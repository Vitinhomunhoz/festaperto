"use client"

import { useAuth } from "../contexts/AuthContext"

interface ProfileScreenProps {
  onCreateEvent: () => void
}

export default function ProfileScreen({ onCreateEvent }: ProfileScreenProps) {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    if (confirm("Tem certeza que deseja sair?")) {
      logout()
    }
  }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-800">👤 Perfil</h1>
      </div>

      {/* Profile Info */}
      <div className="bg-white mx-4 mt-4 rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{user?.nome}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <div className="mt-1">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  user?.tipoConta === "organizador" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                }`}
              >
                {user?.tipoConta === "organizador" ? "🎪 Organizador" : "👤 Usuário"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="mx-4 mt-4 space-y-2">
        {user?.tipoConta === "organizador" && (
          <button
            onClick={onCreateEvent}
            className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3 hover:bg-gray-50"
          >
            <span className="text-2xl">➕</span>
            <div className="text-left">
              <div className="font-medium text-gray-800">Criar Evento</div>
              <div className="text-sm text-gray-600">Publique um novo evento</div>
            </div>
            <span className="ml-auto text-gray-400">›</span>
          </button>
        )}

        <button className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3 hover:bg-gray-50">
          <span className="text-2xl">⚙️</span>
          <div className="text-left">
            <div className="font-medium text-gray-800">Configurações</div>
            <div className="text-sm text-gray-600">Ajustes do aplicativo</div>
          </div>
          <span className="ml-auto text-gray-400">›</span>
        </button>

        <button className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3 hover:bg-gray-50">
          <span className="text-2xl">❓</span>
          <div className="text-left">
            <div className="font-medium text-gray-800">Ajuda</div>
            <div className="text-sm text-gray-600">Suporte e FAQ</div>
          </div>
          <span className="ml-auto text-gray-400">›</span>
        </button>

        <button className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3 hover:bg-gray-50">
          <span className="text-2xl">ℹ️</span>
          <div className="text-left">
            <div className="font-medium text-gray-800">Sobre</div>
            <div className="text-sm text-gray-600">Versão 1.0.0</div>
          </div>
          <span className="ml-auto text-gray-400">›</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3 hover:bg-red-50 text-red-600"
        >
          <span className="text-2xl">🚪</span>
          <div className="text-left">
            <div className="font-medium">Sair</div>
            <div className="text-sm opacity-75">Desconectar da conta</div>
          </div>
          <span className="ml-auto">›</span>
        </button>
      </div>
    </div>
  )
}
