import { View, FlatList, StyleSheet, Text } from "react-native"
import { useMockData } from "../contexts/MockDataContext"
import EventCard from "../components/EventCard"
import { Ionicons } from "@expo/vector-icons"

const FavoritesScreen = ({ navigation }) => {
  const { events, favorites } = useMockData()

  const favoriteEvents = events.filter((event) => favorites.includes(event.id))

  const handleEventPress = (eventId) => {
    navigation.navigate("EventDetails", { eventId })
  }

  const renderEvent = ({ item }) => <EventCard event={item} onPress={() => handleEventPress(item.id)} />

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Favoritos</Text>
        <Text style={styles.subtitle}>{favoriteEvents.length} eventos salvos</Text>
      </View>

      <FlatList
        data={favoriteEvents}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyText}>Você ainda não tem eventos favoritos</Text>
            <Text style={styles.emptySubtext}>Explore eventos e toque no coração para salvá-los aqui</Text>
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
    fontSize: 18,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#9ca3af",
    textAlign: "center",
    paddingHorizontal: 32,
  },
})

export default FavoritesScreen
