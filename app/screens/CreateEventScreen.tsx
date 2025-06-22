"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"

interface CreateEventScreenProps {
  onBack: () => void
}

export default function CreateEventScreen({ onBack }: CreateEventScreenProps) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    endereco: "",
    tipoEvento: "clube",
    faixaPreco: "gratuito",
    generoMusical: "",
    idadeMinima: "18",
    dataInicio: "",
    horaInicio: "",
    dataFim: "",
    horaFim: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simular criação do evento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("🎉 Evento criado com sucesso!")
    setLoading(false)
    onBack()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  if (user?.tipoConta !== "organizador") {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🚫</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Acesso Negado</h3>
          <p className="text-gray-600 mb-4">Apenas organizadores podem criar eventos</p>
          <button onClick={onBack} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium">
            Voltar
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center gap-3">
        <button onClick={onBack} className="text-indigo-600 font-medium">
          ← Voltar
        </button>
        <h1 className="text-xl font-bold text-gray-800">➕ Criar Evento</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Nome do Evento */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Evento *</label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Digite o nome do evento"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <textarea
              value={formData.descricao}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
              placeholder="Descreva o evento"
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Endereço *</label>
            <input
              type="text"
              value={formData.endereco}
              onChange={(e) => handleInputChange("endereco", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Endereço completo do evento"
              required
            />
          </div>

          {/* Tipo e Preço */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Evento</label>
              <select
                value={formData.tipoEvento}
                onChange={(e) => handleInputChange("tipoEvento", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="clube">🎪 Clube</option>
                <option value="show">🎤 Show</option>
                <option value="bar">🍺 Bar</option>
                <option value="festa_gratuita">🎉 Festa Gratuita</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Faixa de Preço</label>
              <select
                value={formData.faixaPreco}
                onChange={(e) => handleInputChange("faixaPreco", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="gratuito">🆓 Gratuito</option>
                <option value="0-50">💵 R$ 0-50</option>
                <option value="51-100">💴 R$ 51-100</option>
                <option value="101-200">💶 R$ 101-200</option>
                <option value="200+">💷 R$ 200+</option>
              </select>
            </div>
          </div>

          {/* Data e Hora de Início */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data e Hora de Início *</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={formData.dataInicio}
                onChange={(e) => handleInputChange("dataInicio", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="time"
                value={formData.horaInicio}
                onChange={(e) => handleInputChange("horaInicio", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Data e Hora de Fim */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data e Hora de Fim</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={formData.dataFim}
                onChange={(e) => handleInputChange("dataFim", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="time"
                value={formData.horaFim}
                onChange={(e) => handleInputChange("horaFim", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Gênero Musical e Idade */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gênero Musical</label>
              <input
                type="text"
                value={formData.generoMusical}
                onChange={(e) => handleInputChange("generoMusical", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Ex: Eletrônica, Rock"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Idade Mínima</label>
              <select
                value={formData.idadeMinima}
                onChange={(e) => handleInputChange("idadeMinima", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="0">Livre</option>
                <option value="16">16 anos</option>
                <option value="18">18 anos</option>
                <option value="21">21 anos</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Criando Evento...
              </>
            ) : (
              <>
                <span>🎉</span>
                Criar Evento
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
