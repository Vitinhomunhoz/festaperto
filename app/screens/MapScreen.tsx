"use client"

import { useState, useEffect } from "react"
import { useLocation } from "../contexts/LocationContext"
import { mockEvents, filtrarEventos, type Event } from "../data/mockEvents"
import FilterModal from "../components/FilterModal"

interface MapScreenProps {
  onEventPress: (eventId: number) => void
}

export default function MapScreen({ onEventPress }: MapScreenProps) {
  const { location, loading: locationLoading, requestLocation } = useLocation()
  const [events, setEvents] = useState<Event[]>([])
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [filters, setFilters] = useState({
    raio: 10,
    tipo: "",
    faixaPreco: "",
    data: "",
  })

  useEffect(() => {
    const eventosFiltrados = filtrarEventos(mockEvents, location, filters)
    setEvents(eventosFiltrados)
  }, [location, filters])

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case "clube":
        return "🎪"
      case "show":
        return "🎤"
      case "bar":
        return "🍺"
      case "festa_gratuita":
        return "🎉"
      default:
        return "📍"
    }
  }

  const getEventColor = (tipo: string) => {
    switch (tipo) {
      case "clube":
        return "bg-purple-500"
      case "show":
        return "bg-red-500"
      case "bar":
        return "bg-yellow-500"
      case "festa_gratuita":
        return "bg-green-500"
      default:
        return "bg-indigo-500"
    }
  }

  if (locationLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Obtendo sua localização...</p>
        </div>
      </div>
    )
  }

  if (!location) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📍</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Localização não disponível</h3>
          <p className="text-gray-600 mb-4">Precisamos da sua localização para encontrar eventos próximos</p>
          <button
            onClick={requestLocation}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700"
          >
            Solicitar Localização
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">🗺️ Mapa</h1>
          <button
            onClick={() => setShowFilterModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2"
          >
            <span>🔍</span>
            Filtros
          </button>
        </div>
      </div>

      {/* Mapa Simulado */}
      <div className="flex-1 bg-gradient-to-br from-green-100 to-blue-100 relative overflow-hidden mt-20">
        {/* Grid de fundo para simular mapa */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-12 h-full">
            {Array.from({ length: 96 }).map((_, i) => (
              <div key={i} className="border border-gray-300"></div>
            ))}
          </div>
        </div>

        {/* Localização do usuário */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
            <div className="absolute -inset-2 bg-blue-600/20 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Pins dos eventos */}
        {events.map((event, index) => {
          // Posicionar pins aleatoriamente ao redor do centro
          const angle = (index * 60) % 360
          const distance = 80 + ((index * 20) % 100)
          const x = 50 + (distance * Math.cos((angle * Math.PI) / 180)) / 4
          const y = 50 + (distance * Math.sin((angle * Math.PI) / 180)) / 4

          return (
            <div
              key={event.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => onEventPress(event.id)}
            >
              <div
                className={`${getEventColor(event.tipoEvento)} text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform`}
              >
                <span className="text-lg">{getEventIcon(event.tipoEvento)}</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
                {event.nome}
                {event.distancia && <div className="text-gray-500">{event.distancia.toFixed(1)} km</div>}
              </div>
            </div>
          )
        })}

        {/* Legenda */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <h4 className="font-semibold text-sm mb-2">Legenda</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">🔵</span>
              <span>Sua localização</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎪</span>
              <span>Clube</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎤</span>
              <span>Show</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🍺</span>
              <span>Bar</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎉</span>
              <span>Festa Gratuita</span>
            </div>
          </div>
        </div>

        {/* Contador de eventos */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{events.length}</div>
            <div className="text-xs text-gray-600">eventos próximos</div>
          </div>
        </div>
      </div>

      {/* Modal de Filtros */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </div>
  )
}
