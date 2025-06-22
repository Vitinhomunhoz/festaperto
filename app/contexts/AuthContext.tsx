"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: number
  nome: string
  email: string
  tipoConta: "usuario" | "organizador"
}

interface AuthContextData {
  user: User | null
  loading: boolean
  login: (email: string, senha: string) => Promise<void>
  register: (nome: string, email: string, senha: string, tipoConta?: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

// Usuários simulados
const usuariosSimulados = [
  { id: 1, nome: "João Silva", email: "joao@email.com", senha: "123456", tipoConta: "usuario" as const },
  { id: 2, nome: "Maria Organizadora", email: "maria@email.com", senha: "123456", tipoConta: "organizador" as const },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento inicial
    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem("festaperto-user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const login = async (email: string, senha: string) => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const usuario = usuariosSimulados.find((u) => u.email === email && u.senha === senha)

    if (!usuario) {
      throw new Error("Credenciais inválidas")
    }

    const userData = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      tipoConta: usuario.tipoConta,
    }

    setUser(userData)
    localStorage.setItem("festaperto-user", JSON.stringify(userData))
  }

  const register = async (nome: string, email: string, senha: string, tipoConta = "usuario") => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Verificar se email já existe
    if (usuariosSimulados.some((u) => u.email === email)) {
      throw new Error("Email já cadastrado")
    }

    const novoUsuario = {
      id: usuariosSimulados.length + 1,
      nome,
      email,
      tipoConta: tipoConta as "usuario" | "organizador",
    }

    setUser(novoUsuario)
    localStorage.setItem("festaperto-user", JSON.stringify(novoUsuario))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("festaperto-user")
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
