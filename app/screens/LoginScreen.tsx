"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    tipoConta: "usuario",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { login, register } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (isLogin) {
        await login(formData.email, formData.senha)
      } else {
        await register(formData.nome, formData.email, formData.senha, formData.tipoConta)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDemoLogin = async (tipo: "usuario" | "organizador") => {
    setLoading(true)
    setError("")

    try {
      if (tipo === "usuario") {
        await login("joao@email.com", "123456")
      } else {
        await login("maria@email.com", "123456")
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">🎉 FestaPerto</h1>
          <p className="text-indigo-100">Encontre as melhores festas perto de você</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                isLogin ? "bg-indigo-600 text-white" : "text-gray-600"
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                !isLogin ? "bg-indigo-600 text-white" : "text-gray-600"
              }`}
            >
              Cadastrar
            </button>
          </div>

          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={formData.senha}
                onChange={(e) => setFormData({ ...formData, senha: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Conta</label>
                <select
                  value={formData.tipoConta}
                  onChange={(e) => setFormData({ ...formData, tipoConta: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="usuario">Usuário</option>
                  <option value="organizador">Organizador</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3">Ou teste com contas demo:</p>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoLogin("usuario")}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
              >
                👤 Demo Usuário
              </button>
              <button
                onClick={() => handleDemoLogin("organizador")}
                disabled={loading}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50"
              >
                🎪 Demo Organizador
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
