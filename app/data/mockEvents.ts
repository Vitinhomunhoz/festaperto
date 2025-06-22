export interface Event {
  id: number
  nome: string
  descricao: string
  endereco: string
  latitude: number
  longitude: number
  tipoEvento: "clube" | "show" | "bar" | "festa_gratuita"
  faixaPreco: "gratuito" | "0-50" | "51-100" | "101-200" | "200+"
  dataInicio: string
  dataFim?: string
  generoMusical: string
  idadeMinima: number
  fotos: string[]
  organizadorId: number
  mediaAvaliacoes: number
  totalAvaliacoes: number
  distancia?: number
}

export const mockEvents: Event[] = [
  {
    id: 1,
    nome: "Festa Eletrônica Downtown",
    descricao:
      "A melhor festa eletrônica da cidade com DJs internacionais. Venha dançar a noite toda com os melhores beats eletrônicos!",
    endereco: "Rua Augusta, 1000 - Consolação, São Paulo",
    latitude: -23.5505,
    longitude: -46.6333,
    tipoEvento: "clube",
    faixaPreco: "51-100",
    dataInicio: "2024-12-15T22:00:00",
    dataFim: "2024-12-16T06:00:00",
    generoMusical: "Eletrônica",
    idadeMinima: 18,
    fotos: ["/placeholder.svg?height=300&width=400&text=Festa+Eletrônica"],
    organizadorId: 2,
    mediaAvaliacoes: 4.5,
    totalAvaliacoes: 127,
  },
  {
    id: 2,
    nome: "Show de Rock Nacional",
    descricao: "Grandes bandas do rock nacional se apresentam em uma noite épica. Prepare-se para muito rock and roll!",
    endereco: "Av. Paulista, 2000 - Bela Vista, São Paulo",
    latitude: -23.5618,
    longitude: -46.6565,
    tipoEvento: "show",
    faixaPreco: "101-200",
    dataInicio: "2024-12-16T20:00:00",
    dataFim: "2024-12-17T02:00:00",
    generoMusical: "Rock",
    idadeMinima: 16,
    fotos: ["/placeholder.svg?height=300&width=400&text=Rock+Show"],
    organizadorId: 2,
    mediaAvaliacoes: 4.8,
    totalAvaliacoes: 89,
  },
  {
    id: 3,
    nome: "Happy Hour Sexta",
    descricao: "Happy hour com música ao vivo e drinks especiais. O melhor lugar para relaxar após o trabalho!",
    endereco: "Rua Oscar Freire, 500 - Jardins, São Paulo",
    latitude: -23.5629,
    longitude: -46.6711,
    tipoEvento: "bar",
    faixaPreco: "0-50",
    dataInicio: "2024-12-13T18:00:00",
    dataFim: "2024-12-13T23:00:00",
    generoMusical: "MPB",
    idadeMinima: 18,
    fotos: ["/placeholder.svg?height=300&width=400&text=Happy+Hour"],
    organizadorId: 2,
    mediaAvaliacoes: 4.2,
    totalAvaliacoes: 45,
  },
  {
    id: 4,
    nome: "Festival de Verão Gratuito",
    descricao: "Festival gratuito com várias atrações musicais. Traga a família e aproveite!",
    endereco: "Parque Ibirapuera - Vila Mariana, São Paulo",
    latitude: -23.5873,
    longitude: -46.6578,
    tipoEvento: "festa_gratuita",
    faixaPreco: "gratuito",
    dataInicio: "2024-12-14T14:00:00",
    dataFim: "2024-12-14T22:00:00",
    generoMusical: "Variado",
    idadeMinima: 0,
    fotos: ["/placeholder.svg?height=300&width=400&text=Festival+Gratuito"],
    organizadorId: 2,
    mediaAvaliacoes: 4.6,
    totalAvaliacoes: 203,
  },
  {
    id: 5,
    nome: "Noite do Sertanejo",
    descricao: "A melhor noite sertaneja da cidade com duplas famosas e muito forró!",
    endereco: "Rua da Consolação, 800 - Centro, São Paulo",
    latitude: -23.5431,
    longitude: -46.6291,
    tipoEvento: "show",
    faixaPreco: "51-100",
    dataInicio: "2024-12-17T21:00:00",
    dataFim: "2024-12-18T03:00:00",
    generoMusical: "Sertanejo",
    idadeMinima: 18,
    fotos: ["/placeholder.svg?height=300&width=400&text=Sertanejo"],
    organizadorId: 2,
    mediaAvaliacoes: 4.3,
    totalAvaliacoes: 67,
  },
  {
    id: 6,
    nome: "Balada Premium",
    descricao: "Balada exclusiva com open bar premium e DJs renomados. Dress code obrigatório!",
    endereco: "Rua Bela Cintra, 300 - Consolação, São Paulo",
    latitude: -23.5567,
    longitude: -46.6612,
    tipoEvento: "clube",
    faixaPreco: "200+",
    dataInicio: "2024-12-18T23:00:00",
    dataFim: "2024-12-19T06:00:00",
    generoMusical: "House",
    idadeMinima: 21,
    fotos: ["/placeholder.svg?height=300&width=400&text=Balada+Premium"],
    organizadorId: 2,
    mediaAvaliacoes: 4.7,
    totalAvaliacoes: 156,
  },
]

// Função para calcular distância entre dois pontos
export const calcularDistancia = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Função para filtrar eventos
export const filtrarEventos = (
  eventos: Event[],
  userLocation: { latitude: number; longitude: number } | null,
  filtros: {
    raio: number
    tipo: string
    faixaPreco: string
    data: string
  },
) => {
  let eventosFiltrados = [...eventos]

  // Adicionar distância se localização disponível
  if (userLocation) {
    eventosFiltrados = eventosFiltrados.map((evento) => ({
      ...evento,
      distancia: calcularDistancia(userLocation.latitude, userLocation.longitude, evento.latitude, evento.longitude),
    }))

    // Filtrar por raio
    eventosFiltrados = eventosFiltrados.filter((evento) => (evento.distancia || 0) <= filtros.raio)

    // Ordenar por distância
    eventosFiltrados.sort((a, b) => (a.distancia || 0) - (b.distancia || 0))
  }

  // Filtrar por tipo
  if (filtros.tipo) {
    eventosFiltrados = eventosFiltrados.filter((evento) => evento.tipoEvento === filtros.tipo)
  }

  // Filtrar por faixa de preço
  if (filtros.faixaPreco) {
    eventosFiltrados = eventosFiltrados.filter((evento) => evento.faixaPreco === filtros.faixaPreco)
  }

  // Filtrar por data
  if (filtros.data) {
    const hoje = new Date()
    const amanha = new Date(hoje)
    amanha.setDate(hoje.getDate() + 1)

    if (filtros.data === "hoje") {
      eventosFiltrados = eventosFiltrados.filter((evento) => {
        const dataEvento = new Date(evento.dataInicio)
        return dataEvento.toDateString() === hoje.toDateString()
      })
    } else if (filtros.data === "amanha") {
      eventosFiltrados = eventosFiltrados.filter((evento) => {
        const dataEvento = new Date(evento.dataInicio)
        return dataEvento.toDateString() === amanha.toDateString()
      })
    }
  }

  return eventosFiltrados
}
