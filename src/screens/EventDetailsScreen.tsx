import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useMockData } from "../contexts/MockDataContext"

const EventDetailsScreen = ({ route, navigation }) => {
  const { eventId } = route.params
  const { getEventById, isFavorite, addToFavorites, removeFromFavorites } = useMockData()

  const event = getEventById(eventId)
  const isEventFavorite = isFavorite(eventId)

  if (!event) {
    return (
      <View style={styles.errorContainer}>
        <Text>Evento não encontrado</Text>
      </View>
    )
  }

  const toggleFavorite = () => {
    if (isEventFavorite) {
      removeFromFavorites(eventId)
      Alert.alert("Sucesso", "Evento removido dos favoritos")
    } else {
      addToFavorites(eventId)
      Alert.alert("Sucesso", "Evento adicionado aos favoritos")
    }
  }

  const openDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${event.latitude},${event.longitude}`
    Linking.openURL(url)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEventTypeLabel = (type) => {
    switch (type) {
      case "clube":
        return "Clube"
      case "show":
        return "Show"
      case "bar":
        return "Bar"
      case "festa_gratuita":
        return "Festa Gratuita"
      default:
        return "Evento"
    }
  }

  const getPriceLabel = (price) => {
    switch (price) {
      case "gratuito":
        return "Gratuito"
      case "0-50":
        return "R$ 0-50"
      case "51-100":
        return "R$ 51-100"
      case "101-200":
        return "R$ 101-200"
      case "200+":
        return "R$ 200+"
      default:
        return "Preço não informado"
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.fotos[0] }}
          style={styles.image}
          defaultSource={require("../../assets/placeholder.png")}
        />
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          <Ionicons
            name={isEventFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isEventFavorite ? "#ef4444" : "white"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{event.nome}</Text>
          <View style={styles.typeContainer}>
            <Text style={styles.typeText}>{getEventTypeLabel(event.tipoEvento)}</Text>
          </View>
        </View>

        <Text style={styles.description}>{event.descricao}</Text>

        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="time" size={20} color="#6366f1" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Data e Hora</Text>
              <Text style={styles.detailText}>{formatDate(event.dataInicio)}</Text>
              {event.dataFim && <Text style={styles.detailText}>até {formatDate(event.dataFim)}</Text>}
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location" size={20} color="#6366f1" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Local</Text>
              <Text style={styles.detailText}>{event.endereco}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="card" size={20} color="#6366f1" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Preço</Text>
              <Text style={styles.detailText}>{getPriceLabel(event.faixaPreco)}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="musical-notes" size={20} color="#6366f1" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Gênero Musical</Text>
              <Text style={styles.detailText}>{event.generoMusical}</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="person" size={20} color="#6366f1" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Idade Mínima</Text>
              <Text style={styles.detailText}>{event.idadeMinima} anos</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="business" size={20} color="#6366f1" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Organizador</Text>
              <Text style={styles.detailText}>{event.organizador}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.directionsButton} onPress={openDirections}>
          <Ionicons name="navigate" size={24} color="white" />
          <Text style={styles.directionsButtonText}>Como Chegar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
    backgroundColor: "#f3f4f6",
  },
  favoriteButton: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
    marginRight: 16,
  },
  typeContainer: {
    backgroundColor: "#f0f0ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeText: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "600",
  },
  description: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
    marginBottom: 24,
  },
  detailsContainer: {
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 20,
  },
  directionsButton: {
    backgroundColor: "#6366f1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  directionsButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default EventDetailsScreen
