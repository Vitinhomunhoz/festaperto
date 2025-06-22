"use client"

import { useState, useEffect } from "react"
import { mockEvents, type Event } from "../data/mockEvents"
import { useAuth } from "../contexts/AuthContext"

interface EventDetailsScreenProps {
  eventId: number | null
  onBack: () => void
}

export default function EventDetailsScreen({ eventId, onBack }: EventDetailsScreenProps) {
  const { user } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (eventId) {
      const foundEvent = mockEvents.find((e) => e.id === eventId)
      setEvent(foundEvent || null)

      // Verificar se é favorito
      const savedFavorites = localStorage.getItem(`festaperto-favorites-${user?.id}`)
      if (savedFavorites) {
        const favoriteIds = JSON.parse(savedFavorites)
        setIsFavorite(favoriteIds.includes(eventId))
      }
    }
  }, [eventId, user])

  const toggleFavorite = () => {
    if (!user || !eventId) return

    const savedFavorites = localStorage.getItem(`festaperto-favorites-${user.id}`)
    let favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : []

    if (isFavorite) {
      favoriteIds = favoriteIds.filter((id: number) => id !== eventId)
      setIsFavorite(false)
    } else {
      favoriteIds.push(eventId)
      setIsFavorite(true)
    }

    localStorage.setItem(`festaperto-favorites-${user.id}`, JSON.stringify(favoriteIds))
  }

  const openDirections = () => {
    if (event) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`
      window.open(url, "_blank")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case "clube":
        return "Clube"
      case "show":
        return "Show"
      case "bar":
        return "Bar"
      case "festa_gratuita":
        return "Festa Gratuita"
      default:
        return "Evento"
    }
  }

  const getPriceLabel = (price: string) => {
    switch (price) {
      case "gratuito":
        return "Gratuito"
      case "0-50":
        return "R$ 0-50"
      case "51-100":
        return "R$ 51-100"
      case "101-200":
        return "R$ 101-200"
      case "200+":
        return "R$ 200+"
      default:
        return "Preço não informado"
    }
  }

  if (!event) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Evento não encontrado</h3>
          <button onClick={onBack} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium">
            Voltar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="relative">
        <img
          src={event.fotos[0] || "/placeholder.svg"}
          alt={event.nome}
          className="w-full h-64 object-cover bg-gray-200"
        />
        <div className="absolute top-4 left-4">
          <button
            onClick={onBack}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <span className="text-xl">←</span>
          </button>
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleFavorite}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <span className="text-xl">{isFavorite ? "❤️" : "🤍"}</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800 flex-1 mr-4">{event.nome}</h1>
          <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
            {getEventTypeLabel(event.tipoEvento)}
          </div>
        </div>

        {event.mediaAvaliacoes > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">⭐</span>
              <span className="font-semibold">{event.mediaAvaliacoes.toFixed(1)}</span>
            </div>
            <span className="text-gray-600 text-sm">({event.totalAvaliacoes} avaliações)</span>
          </div>
        )}

        <p className="text-gray-700 mb-6 leading-relaxed">{event.descricao}</p>

        {/* Event Details */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-xl">📅</span>
            <div>
              <div className="font-medium text-gray-800">Data e Hora</div>
              <div className="text-gray-600">{formatDate(event.dataInicio)}</div>
              {event.dataFim && <div className="text-gray-600">até {formatDate(event.dataFim)}</div>}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">📍</span>
            <div>
              <div className="font-medium text-gray-800">Local</div>
              <div className="text-gray-600">{event.endereco}</div>
              {event.distancia && (
                <div className="text-indigo-600 text-sm font-medium">{event.distancia.toFixed(1)} km de distância</div>
              )}
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">💰</span>
            <div>
              <div className="font-medium text-gray-800">Preço</div>
              <div className="text-gray-600">{getPriceLabel(event.faixaPreco)}</div>
            </div>
          </div>

          {event.generoMusical && (
            <div className="flex items-start gap-3">
              <span className="text-xl">🎵</span>
              <div>
                <div className="font-medium text-gray-800">Gênero Musical</div>
                <div className="text-gray-600">{event.generoMusical}</div>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <span className="text-xl">🔞</span>
            <div>
              <div className="font-medium text-gray-800">Idade Mínima</div>
              <div className="text-gray-600">{event.idadeMinima === 0 ? "Livre" : `${event.idadeMinima} anos`}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={openDirections}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 flex items-center justify-center gap-2"
          >
            <span>🧭</span>
            Como Chegar
          </button>

          <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center gap-2">
            <span>💬</span>
            Compartilhar
          </button>
        </div>
      </div>
    </div>
  )
}
