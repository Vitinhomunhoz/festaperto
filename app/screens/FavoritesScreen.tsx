"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { mockEvents, type Event } from "../data/mockEvents"
import EventCard from "../components/EventCard"

interface FavoritesScreenProps {
  onEventPress: (eventId: number) => void
}

export default function FavoritesScreen({ onEventPress }: FavoritesScreenProps) {
  const { user } = useAuth()
  const [favorites, setFavorites] = useState<Event[]>([])

  useEffect(() => {
    // Simular favoritos salvos no localStorage
    const savedFavorites = localStorage.getItem(`festaperto-favorites-${user?.id}`)
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites)
      const favoriteEvents = mockEvents.filter((event) => favoriteIds.includes(event.id))
      setFavorites(favoriteEvents)
    }
  }, [user])

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-xl font-bold text-gray-800">❤️ Meus Favoritos</h1>
        <p className="text-sm text-gray-600 mt-1">{favorites.length} eventos salvos</p>
      </div>

      {/* Lista de Favoritos */}
      <div className="flex-1 overflow-y-auto p-4">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum favorito ainda</h3>
            <p className="text-gray-600 text-center">Explore eventos e toque no coração para salvá-los aqui</p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((event) => (
              <EventCard key={event.id} event={event} onPress={() => onEventPress(event.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
