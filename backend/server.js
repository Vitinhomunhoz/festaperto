import express from "express"
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import multer from "multer"
import path from "path"

const app = express()
const PORT = process.env.PORT || 3000
const JWT_SECRET = process.env.JWT_SECRET || "festaperto_secret_key"

// Middleware
app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"))

// Configuração do multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

// Simulação de banco de dados em memória
const usuarios = []
const eventos = []
const favoritos = []
const avaliacoes = []

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ erro: "Token de acesso requerido" })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ erro: "Token inválido" })
    }
    req.user = user
    next()
  })
}

// Função para calcular distância entre dois pontos
const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Rotas de Autenticação
app.post("/api/auth/registro", async (req, res) => {
  try {
    const { nome, email, senha, tipoConta = "usuario" } = req.body

    // Verificar se usuário já existe
    const usuarioExistente = usuarios.find((u) => u.email === email)
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Email já cadastrado" })
    }

    // Hash da senha
    const senhaHash = await bcrypt.hash(senha, 10)

    const novoUsuario = {
      id: usuarios.length + 1,
      nome,
      email,
      senhaHash,
      tipoConta,
      criadoEm: new Date().toISOString(),
    }

    usuarios.push(novoUsuario)

    const token = jwt.sign(
      { id: novoUsuario.id, email: novoUsuario.email, tipoConta: novoUsuario.tipoConta },
      JWT_SECRET,
      { expiresIn: "24h" },
    )

    res.status(201).json({
      mensagem: "Usuário criado com sucesso",
      token,
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        tipoConta: novoUsuario.tipoConta,
      },
    })
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" })
  }
})

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, senha } = req.body

    const usuario = usuarios.find((u) => u.email === email)
    if (!usuario) {
      return res.status(400).json({ erro: "Credenciais inválidas" })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senhaHash)
    if (!senhaValida) {
      return res.status(400).json({ erro: "Credenciais inválidas" })
    }

    const token = jwt.sign({ id: usuario.id, email: usuario.email, tipoConta: usuario.tipoConta }, JWT_SECRET, {
      expiresIn: "24h",
    })

    res.json({
      mensagem: "Login realizado com sucesso",
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        tipoConta: usuario.tipoConta,
      },
    })
  } catch (error) {
    res.status(500).json({ erro: "Erro interno do servidor" })
  }
})

// Rotas de Eventos
app.get("/api/eventos", (req, res) => {
  try {
    const { lat, lon, raio = 10, tipo, faixaPreco, data } = req.query

    let eventosFiltrados = [...eventos]

    // Filtrar por localização se lat/lon fornecidos
    if (lat && lon) {
      eventosFiltrados = eventosFiltrados.filter((evento) => {
        const distancia = calcularDistancia(
          Number.parseFloat(lat),
          Number.parseFloat(lon),
          evento.latitude,
          evento.longitude,
        )
        return distancia <= Number.parseFloat(raio)
      })

      // Adicionar distância aos eventos
      eventosFiltrados = eventosFiltrados.map((evento) => ({
        ...evento,
        distancia: calcularDistancia(Number.parseFloat(lat), Number.parseFloat(lon), evento.latitude, evento.longitude),
      }))

      // Ordenar por distância
      eventosFiltrados.sort((a, b) => a.distancia - b.distancia)
    }

    // Filtrar por tipo
    if (tipo) {
      eventosFiltrados = eventosFiltrados.filter((evento) => evento.tipoEvento === tipo)
    }

    // Filtrar por faixa de preço
    if (faixaPreco) {
      eventosFiltrados = eventosFiltrados.filter((evento) => evento.faixaPreco === faixaPreco)
    }

    // Filtrar por data
    if (data) {
      const hoje = new Date()
      const amanha = new Date(hoje)
      amanha.setDate(hoje.getDate() + 1)

      if (data === "hoje") {
        eventosFiltrados = eventosFiltrados.filter((evento) => {
          const dataEvento = new Date(evento.dataInicio)
          return dataEvento.toDateString() === hoje.toDateString()
        })
      } else if (data === "amanha") {
        eventosFiltrados = eventosFiltrados.filter((evento) => {
          const dataEvento = new Date(evento.dataInicio)
          return dataEvento.toDateString() === amanha.toDateString()
        })
      }
    }

    res.json(eventosFiltrados)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar eventos" })
  }
})

app.get("/api/eventos/:id", (req, res) => {
  try {
    const evento = eventos.find((e) => e.id === Number.parseInt(req.params.id))
    if (!evento) {
      return res.status(404).json({ erro: "Evento não encontrado" })
    }

    // Buscar avaliações do evento
    const avaliacoesEvento = avaliacoes.filter((a) => a.eventoId === evento.id)
    const mediaAvaliacoes =
      avaliacoesEvento.length > 0 ? avaliacoesEvento.reduce((sum, a) => sum + a.nota, 0) / avaliacoesEvento.length : 0

    res.json({
      ...evento,
      avaliacoes: avaliacoesEvento,
      mediaAvaliacoes: mediaAvaliacoes.toFixed(1),
    })
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar evento" })
  }
})

app.post("/api/eventos", authenticateToken, upload.array("fotos", 5), (req, res) => {
  try {
    if (req.user.tipoConta !== "organizador") {
      return res.status(403).json({ erro: "Apenas organizadores podem criar eventos" })
    }

    const {
      nome,
      descricao,
      dataInicio,
      dataFim,
      endereco,
      latitude,
      longitude,
      tipoEvento,
      faixaPreco,
      capacidadeMaxima,
      generoMusical,
      idadeMinima,
    } = req.body

    const fotos = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : []

    const novoEvento = {
      id: eventos.length + 1,
      organizadorId: req.user.id,
      nome,
      descricao,
      dataInicio,
      dataFim,
      endereco,
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
      tipoEvento,
      faixaPreco,
      capacidadeMaxima: Number.parseInt(capacidadeMaxima),
      generoMusical,
      idadeMinima: Number.parseInt(idadeMinima) || 18,
      fotos,
      status: "ativo",
      criadoEm: new Date().toISOString(),
    }

    eventos.push(novoEvento)

    res.status(201).json({
      mensagem: "Evento criado com sucesso",
      evento: novoEvento,
    })
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar evento" })
  }
})

// Rotas de Favoritos
app.get("/api/favoritos", authenticateToken, (req, res) => {
  try {
    const favoritosUsuario = favoritos.filter((f) => f.usuarioId === req.user.id)
    const eventosFavoritos = favoritosUsuario
      .map((f) => {
        const evento = eventos.find((e) => e.id === f.eventoId)
        return evento
      })
      .filter(Boolean)

    res.json(eventosFavoritos)
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar favoritos" })
  }
})

app.post("/api/favoritos", authenticateToken, (req, res) => {
  try {
    const { eventoId } = req.body

    const favoritoExistente = favoritos.find((f) => f.usuarioId === req.user.id && f.eventoId === eventoId)

    if (favoritoExistente) {
      return res.status(400).json({ erro: "Evento já está nos favoritos" })
    }

    const novoFavorito = {
      id: favoritos.length + 1,
      usuarioId: req.user.id,
      eventoId,
      criadoEm: new Date().toISOString(),
    }

    favoritos.push(novoFavorito)

    res.status(201).json({ mensagem: "Evento adicionado aos favoritos" })
  } catch (error) {
    res.status(500).json({ erro: "Erro ao adicionar favorito" })
  }
})

app.delete("/api/favoritos/:eventoId", authenticateToken, (req, res) => {
  try {
    const eventoId = Number.parseInt(req.params.eventoId)
    const index = favoritos.findIndex((f) => f.usuarioId === req.user.id && f.eventoId === eventoId)

    if (index === -1) {
      return res.status(404).json({ erro: "Favorito não encontrado" })
    }

    favoritos.splice(index, 1)

    res.json({ mensagem: "Evento removido dos favoritos" })
  } catch (error) {
    res.status(500).json({ erro: "Erro ao remover favorito" })
  }
})

// Dados de exemplo
const eventosExemplo = [
  {
    id: 1,
    organizadorId: 1,
    nome: "Festa Eletrônica Downtown",
    descricao: "A melhor festa eletrônica da cidade com DJs internacionais",
    dataInicio: "2024-12-15T22:00:00Z",
    dataFim: "2024-12-16T06:00:00Z",
    endereco: "Rua Augusta, 1000 - São Paulo, SP",
    latitude: -23.5505,
    longitude: -46.6333,
    tipoEvento: "clube",
    faixaPreco: "51-100",
    capacidadeMaxima: 500,
    generoMusical: "Eletrônica",
    idadeMinima: 18,
    fotos: ["/placeholder.svg?height=300&width=400"],
    status: "ativo",
    criadoEm: "2024-12-10T10:00:00Z",
  },
  {
    id: 2,
    organizadorId: 1,
    nome: "Show de Rock Nacional",
    descricao: "Grandes bandas do rock nacional se apresentam",
    dataInicio: "2024-12-16T20:00:00Z",
    dataFim: "2024-12-17T02:00:00Z",
    endereco: "Av. Paulista, 2000 - São Paulo, SP",
    latitude: -23.5618,
    longitude: -46.6565,
    tipoEvento: "show",
    faixaPreco: "101-200",
    capacidadeMaxima: 1000,
    generoMusical: "Rock",
    idadeMinima: 16,
    fotos: ["/placeholder.svg?height=300&width=400"],
    status: "ativo",
    criadoEm: "2024-12-10T11:00:00Z",
  },
  {
    id: 3,
    organizadorId: 1,
    nome: "Happy Hour Sexta",
    descricao: "Happy hour com música ao vivo e drinks especiais",
    dataInicio: "2024-12-13T18:00:00Z",
    dataFim: "2024-12-13T23:00:00Z",
    endereco: "Rua Oscar Freire, 500 - São Paulo, SP",
    latitude: -23.5629,
    longitude: -46.6711,
    tipoEvento: "bar",
    faixaPreco: "0-50",
    capacidadeMaxima: 100,
    generoMusical: "MPB",
    idadeMinima: 18,
    fotos: ["/placeholder.svg?height=300&width=400"],
    status: "ativo",
    criadoEm: "2024-12-10T12:00:00Z",
  },
]

eventos.push(...eventosExemplo)

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
