"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import * as Location from "expo-location"

interface LocationData {
  latitude: number
  longitude: number
}

interface LocationContextType {
  location: LocationData | null
  loading: boolean
  requestLocation: () => Promise<void>
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    requestLocation()
  }, [])

  const requestLocation = async () => {
    setLoading(true)

    try {
      const { status } = await Location.requestForegroundPermissionsAsync()

      if (status !== "granted") {
        // Usar localização padrão (Paulista) se não der permissão
        setLocation({ latitude: -23.5618, longitude: -46.6565 })
        setLoading(false)
        return
      }

      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      })

      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      })
    } catch (error) {
      console.error("Erro ao obter localização:", error)
      // Usar localização padrão em caso de erro
      setLocation({ latitude: -23.5618, longitude: -46.6565 })
    } finally {
      setLoading(false)
    }
  }

  return <LocationContext.Provider value={{ location, loading, requestLocation }}>{children}</LocationContext.Provider>
}

export const useLocation = () => {
  const context = useContext(LocationContext)
  if (!context) {
    throw new Error("useLocation deve ser usado dentro de LocationProvider")
  }
  return context
}
