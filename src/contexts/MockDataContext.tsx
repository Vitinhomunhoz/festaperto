"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface Event {
  id: number
  nome: string
  descricao: string
  endereco: string
  latitude: number
  longitude: number
  tipoEvento: string
  faixaPreco: string
  dataInicio: string
  dataFim?: string
  generoMusical: string
  idadeMinima: number
  fotos: string[]
  organizador: string
  distancia?: number
}

interface MockDataContextType {
  events: Event[]
  favorites: number[]
  addToFavorites: (eventId: number) => void
  removeFromFavorites: (eventId: number) => void
  isFavorite: (eventId: number) => boolean
  getEventById: (id: number) => Event | undefined
  addEvent: (event: Omit<Event, "id">) => void
}

const MockDataContext = createContext<MockDataContextType | undefined>(undefined)

// Dados mockados de eventos em São Paulo
const mockEvents: Event[] = [
  {
    id: 1,
    nome: "Festa Eletrônica Rooftop",
    descricao:
      "A melhor festa eletrônica da cidade com vista panorâmica! DJs internacionais, drinks especiais e uma vista incrível da cidade.",
    endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    latitude: -23.5618,
    longitude: -46.6565,
    tipoEvento: "clube",
    faixaPreco: "51-100",
    dataInicio: "2024-12-14T22:00:00Z",
    dataFim: "2024-12-15T06:00:00Z",
    generoMusical: "Eletrônica",
    idadeMinima: 18,
    fotos: ["https://images.unsplash.com/photo-1571266028243-d220c9c3b2d2?w=400"],
    organizador: "Eventos SP",
  },
  {
    id: 2,
    nome: "Show de Rock Nacional",
    descricao:
      "Grandes bandas do rock nacional se apresentam em uma noite épica! Venha curtir os maiores sucessos do rock brasileiro.",
    endereco: "Rua Augusta, 500 - Consolação, São Paulo - SP",
    latitude: -23.5505,
    longitude: -46.6333,
    tipoEvento: "show",
    faixaPreco: "101-200",
    dataInicio: "2024-12-15T20:00:00Z",
    dataFim: "2024-12-16T02:00:00Z",
    generoMusical: "Rock",
    idadeMinima: 16,
    fotos: ["https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400"],
    organizador: "Rock Eventos",
  },
  {
    id: 3,
    nome: "Happy Hour Sexta",
    descricao:
      "Happy hour descontraído com música ao vivo, drinks especiais e petiscos deliciosos. O lugar perfeito para relaxar após o trabalho.",
    endereco: "Rua Oscar Freire, 300 - Jardins, São Paulo - SP",
    latitude: -23.5629,
    longitude: -46.6711,
    tipoEvento: "bar",
    faixaPreco: "0-50",
    dataInicio: "2024-12-13T18:00:00Z",
    dataFim: "2024-12-13T23:00:00Z",
    generoMusical: "MPB",
    idadeMinima: 18,
    fotos: ["https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400"],
    organizador: "Bar do João",
  },
  {
    id: 4,
    nome: "Festival Gratuito no Parque",
    descricao:
      "Festival gratuito com várias atrações musicais, food trucks e atividades para toda a família. Venha curtir um domingo especial!",
    endereco: "Parque Ibirapuera - Vila Mariana, São Paulo - SP",
    latitude: -23.5873,
    longitude: -46.6573,
    tipoEvento: "festa_gratuita",
    faixaPreco: "gratuito",
    dataInicio: "2024-12-15T14:00:00Z",
    dataFim: "2024-12-15T22:00:00Z",
    generoMusical: "Variado",
    idadeMinima: 0,
    fotos: ["https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400"],
    organizador: "Prefeitura SP",
  },
  {
    id: 5,
    nome: "Noite do Sertanejo",
    descricao:
      "A melhor noite sertaneja da cidade! Duplas famosas, rodeio mecânico e muito forró. Vista seu chapéu e venha se divertir!",
    endereco: "Av. Cruzeiro do Sul, 1200 - Santana, São Paulo - SP",
    latitude: -23.5089,
    longitude: -46.6228,
    tipoEvento: "clube",
    faixaPreco: "51-100",
    dataInicio: "2024-12-16T21:00:00Z",
    dataFim: "2024-12-17T05:00:00Z",
    generoMusical: "Sertanejo",
    idadeMinima: 18,
    fotos: ["https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400"],
    organizador: "Rodeio Eventos",
  },
  {
    id: 6,
    nome: "Jazz Night",
    descricao:
      "Uma noite sofisticada com os melhores músicos de jazz da cidade. Ambiente intimista, drinks autorais e música de qualidade.",
    endereco: "Rua Bela Cintra, 800 - Consolação, São Paulo - SP",
    latitude: -23.5544,
    longitude: -46.6606,
    tipoEvento: "bar",
    faixaPreco: "101-200",
    dataInicio: "2024-12-14T20:00:00Z",
    dataFim: "2024-12-15T02:00:00Z",
    generoMusical: "Jazz",
    idadeMinima: 21,
    fotos: ["https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400"],
    organizador: "Jazz Club SP",
  },
]

export const MockDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events] = useState<Event[]>(mockEvents)
  const [favorites, setFavorites] = useState<number[]>([])

  const addToFavorites = (eventId: number) => {
    setFavorites((prev) => [...prev, eventId])
  }

  const removeFromFavorites = (eventId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== eventId))
  }

  const isFavorite = (eventId: number) => {
    return favorites.includes(eventId)
  }

  const getEventById = (id: number) => {
    return events.find((event) => event.id === id)
  }

  const addEvent = (event: Omit<Event, "id">) => {
    console.log("Evento adicionado:", event)
  }

  return (
    <MockDataContext.Provider
      value={{
        events,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        getEventById,
        addEvent,
      }}
    >
      {children}
    </MockDataContext.Provider>
  )
}

export const useMockData = () => {
  const context = useContext(MockDataContext)
  if (!context) {
    throw new Error("useMockData deve ser usado dentro de MockDataProvider")
  }
  return context
}
