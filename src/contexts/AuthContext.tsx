"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { api } from "../services/api"

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
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStoredData()
  }, [])

  const loadStoredData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("@FestaPerto:user")
      const storedToken = await AsyncStorage.getItem("@FestaPerto:token")

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser))
        api.defaults.headers.authorization = `Bearer ${storedToken}`
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, senha: string) => {
    try {
      const response = await api.post("/auth/login", { email, senha })
      const { usuario, token } = response.data

      setUser(usuario)
      api.defaults.headers.authorization = `Bearer ${token}`

      await AsyncStorage.setItem("@FestaPerto:user", JSON.stringify(usuario))
      await AsyncStorage.setItem("@FestaPerto:token", token)
    } catch (error) {
      throw error
    }
  }

  const register = async (nome: string, email: string, senha: string, tipoConta = "usuario") => {
    try {
      const response = await api.post("/auth/registro", { nome, email, senha, tipoConta })
      const { usuario, token } = response.data

      setUser(usuario)
      api.defaults.headers.authorization = `Bearer ${token}`

      await AsyncStorage.setItem("@FestaPerto:user", JSON.stringify(usuario))
      await AsyncStorage.setItem("@FestaPerto:token", token)
    } catch (error) {
      throw error
    }
  }

  const logout = async () => {
    setUser(null)
    api.defaults.headers.authorization = ""

    await AsyncStorage.removeItem("@FestaPerto:user")
    await AsyncStorage.removeItem("@FestaPerto:token")
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
