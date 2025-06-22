"use client"

import { useState, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { Ionicons } from "@expo/vector-icons"
import { useLocation } from "../contexts/LocationContext"
import { useMockData } from "../contexts/MockDataContext"
import FilterModal from "../components/FilterModal"

const MapScreen = ({ navigation }) => {
  const { location, requestLocation } = useLocation()
  const { events } = useMockData()
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [filters, setFilters] = useState({
    raio: 10,
    tipo: "",
    faixaPreco: "",
    data: "",
  })

  useEffect(() => {
    applyFilters()
  }, [filters, events, location])

  const applyFilters = () => {
    let filtered = [...events]

    // Filtrar por tipo
    if (filters.tipo) {
      filtered = filtered.filter((event) => event.tipoEvento === filters.tipo)
    }

    // Filtrar por preço
    if (filters.faixaPreco) {
      filtered = filtered.filter((event) => event.faixaPreco === filters.faixaPreco)
    }

    // Calcular distâncias se temos localização
    if (location) {
      filtered = filtered.map((event) => ({
        ...event,
        distancia: calculateDistance(location.latitude, location.longitude, event.latitude, event.longitude),
      }))

      // Filtrar por raio
      filtered = filtered.filter((event) => (event.distancia || 0) <= filters.raio)
    }

    setFilteredEvents(filtered)
  }

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371 // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const handleMarkerPress = (event) => {
    navigation.navigate("EventDetails", { eventId: event.id })
  }

  const getMarkerColor = (tipoEvento) => {
    switch (tipoEvento) {
      case "clube":
        return "#8b5cf6"
      case "show":
        return "#ef4444"
      case "bar":
        return "#f59e0b"
      case "festa_gratuita":
        return "#10b981"
      default:
        return "#6366f1"
    }
  }

  if (!location) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="location-outline" size={64} color="#9ca3af" />
        <Text style={styles.noLocationText}>Obtendo sua localização...</Text>
        <TouchableOpacity style={styles.button} onPress={requestLocation}>
          <Text style={styles.buttonText}>Tentar Novamente</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {filteredEvents.map((event) => (
          <Marker
            key={event.id}
            coordinate={{
              latitude: event.latitude,
              longitude: event.longitude,
            }}
            title={event.nome}
            description={event.endereco}
            pinColor={getMarkerColor(event.tipoEvento)}
            onPress={() => handleMarkerPress(event)}
          />
        ))}
      </MapView>

      <View style={styles.topControls}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
          <Ionicons name="filter" size={20} color="white" />
          <Text style={styles.filterButtonText}>Filtros</Text>
        </TouchableOpacity>
      </View>

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: "#f9fafb",
  },
  noLocationText: {
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    marginVertical: 16,
  },
  button: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  topControls: {
    position: "absolute",
    top: 50,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  filterButton: {
    backgroundColor: "#6366f1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  filterButtonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "bold",
  },
})

export default MapScreen
