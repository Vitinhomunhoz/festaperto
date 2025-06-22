import axios from "axios"

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
})

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      // Aqui você pode implementar logout automático
    }
    return Promise.reject(error)
  },
)
