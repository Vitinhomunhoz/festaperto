"use client"

import { useState, useEffect } from "react"
import { View, FlatList, StyleSheet, Text } from "react-native"
import { useLocation } from "../contexts/LocationContext"
import { useMockData } from "../contexts/MockDataContext"
import EventCard from "../components/EventCard"

const ListScreen = ({ navigation }) => {
  const { location } = useLocation()
  const { events } = useMockData()
  const [sortedEvents, setSortedEvents] = useState(events)

  useEffect(() => {
    if (location) {
      const eventsWithDistance = events.map((event) => ({
        ...event,
        distancia: calculateDistance(location.latitude, location.longitude, event.latitude, event.longitude),
      }))

      eventsWithDistance.sort((a, b) => (a.distancia || 0) - (b.distancia || 0))
      setSortedEvents(eventsWithDistance)
    }
  }, [location, events])

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const handleEventPress = (eventId) => {
    navigation.navigate("EventDetails", { eventId })
  }

  const renderEvent = ({ item }) => <EventCard event={item} onPress={() => handleEventPress(item.id)} />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Eventos Próximos</Text>
        <Text style={styles.subtitle}>{sortedEvents.length} eventos encontrados</Text>
      </View>

      <FlatList
        data={sortedEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum evento encontrado</Text>
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  listContainer: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 64,
  },
  emptyText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
})

export default ListScreen
