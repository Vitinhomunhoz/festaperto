"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Location {
  latitude: number
  longitude: number
}

interface LocationContextData {
  location: Location | null
  loading: boolean
  requestLocation: () => void
}

const LocationContext = createContext<LocationContextData>({} as LocationContextData)

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(false)

  const requestLocation = () => {
    setLoading(true)

    // Simular obtenção de localização (São Paulo - Centro)
    setTimeout(() => {
      setLocation({
        latitude: -23.5505,
        longitude: -46.6333,
      })
      setLoading(false)
    }, 2000)
  }

  useEffect(() => {
    requestLocation()
  }, [])

  return <LocationContext.Provider value={{ location, loading, requestLocation }}>{children}</LocationContext.Provider>
}

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocation deve ser usado dentro de um LocationProvider")
  }
  return context
}
