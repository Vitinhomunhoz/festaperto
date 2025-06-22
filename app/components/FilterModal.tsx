"use client"

import { useState } from "react"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    raio: number
    tipo: string
    faixaPreco: string
    data: string
  }
  onApplyFilters: (filters: any) => void
}

export default function FilterModal({ isOpen, onClose, filters, onApplyFilters }: FilterModalProps) {
  const [tempFilters, setTempFilters] = useState(filters)

  if (!isOpen) return null

  const handleApply = () => {
    onApplyFilters(tempFilters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters = {
      raio: 10,
      tipo: "",
      faixaPreco: "",
      data: "",
    }
    setTempFilters(resetFilters)
    onApplyFilters(resetFilters)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[80vh] rounded-t-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <button onClick={onClose} className="text-gray-600 font-medium">
            Cancelar
          </button>
          <h2 className="text-lg font-bold">Filtros</h2>
          <button onClick={handleReset} className="text-red-600 font-medium">
            Limpar
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Raio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Raio: {tempFilters.raio} km</label>
            <input
              type="range"
              min="1"
              max="50"
              value={tempFilters.raio}
              onChange={(e) => setTempFilters({ ...tempFilters, raio: Number.parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>

          {/* Tipo de Evento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Evento</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "", label: "Todos", icon: "🎯" },
                { value: "clube", label: "Clube", icon: "🎪" },
                { value: "show", label: "Show", icon: "🎤" },
                { value: "bar", label: "Bar", icon: "🍺" },
                { value: "festa_gratuita", label: "Festa Gratuita", icon: "🎉" },
              ].map((tipo) => (
                <button
                  key={tipo.value}
                  onClick={() => setTempFilters({ ...tempFilters, tipo: tipo.value })}
                  className={`p-3 rounded-lg border-2 flex items-center gap-2 ${
                    tempFilters.tipo === tipo.value
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span>{tipo.icon}</span>
                  <span className="text-sm font-medium">{tipo.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Faixa de Preço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Faixa de Preço</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "", label: "Qualquer preço", icon: "💰" },
                { value: "gratuito", label: "Gratuito", icon: "🆓" },
                { value: "0-50", label: "R$ 0-50", icon: "💵" },
                { value: "51-100", label: "R$ 51-100", icon: "💴" },
                { value: "101-200", label: "R$ 101-200", icon: "💶" },
                { value: "200+", label: "R$ 200+", icon: "💷" },
              ].map((preco) => (
                <button
                  key={preco.value}
                  onClick={() => setTempFilters({ ...tempFilters, faixaPreco: preco.value })}
                  className={`p-3 rounded-lg border-2 flex items-center gap-2 ${
                    tempFilters.faixaPreco === preco.value
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span>{preco.icon}</span>
                  <span className="text-sm font-medium">{preco.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Data */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: "", label: "Qualquer data", icon: "📅" },
                { value: "hoje", label: "Hoje", icon: "📍" },
                { value: "amanha", label: "Amanhã", icon: "⏰" },
                { value: "fim_de_semana", label: "Fim de semana", icon: "🎉" },
              ].map((data) => (
                <button
                  key={data.value}
                  onClick={() => setTempFilters({ ...tempFilters, data: data.value })}
                  className={`p-3 rounded-lg border-2 flex items-center gap-2 ${
                    tempFilters.data === data.value
                      ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span>{data.icon}</span>
                  <span className="text-sm font-medium">{data.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleApply}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  )
}
