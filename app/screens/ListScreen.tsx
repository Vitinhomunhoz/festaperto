"use client"

import { useState, useEffect } from "react"
import { useLocation } from "../contexts/LocationContext"
import { mockEvents, filtrarEventos, type Event } from "../data/mockEvents"
import EventCard from "../components/EventCard"
import FilterModal from "../components/FilterModal"

interface ListScreenProps {
  onEventPress: (eventId: number) => void
}

export default function ListScreen({ onEventPress }: ListScreenProps) {
  const { location } = useLocation()
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

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">📋 Lista de Eventos</h1>
          <button
            onClick={() => setShowFilterModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 flex items-center gap-2"
          >
            <span>🔍</span>
            Filtros
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-1">{events.length} eventos encontrados</p>
      </div>

      {/* Lista de Eventos */}
      <div className="flex-1 overflow-y-auto p-4">
        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhum evento encontrado</h3>
            <p className="text-gray-600 text-center">Tente ajustar os filtros para encontrar mais eventos</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onPress={() => onEventPress(event.id)} />
            ))}
          </div>
        )}
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
