import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EventCard = ({ event, onPress }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEventTypeIcon = (type) => {
    switch (type) {
      case "clube":
        return "musical-notes"
      case "show":
        return "mic"
      case "bar":
        return "wine"
      case "festa_gratuita":
        return "happy"
      default:
        return "calendar"
    }
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
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: event.fotos[0] }}
        style={styles.image}
        defaultSource={require("../../assets/placeholder.png")}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {event.nome}
          </Text>
          <View style={styles.typeContainer}>
            <Ionicons name={getEventTypeIcon(event.tipoEvento)} size={14} color="#6366f1" />
            <Text style={styles.typeText}>{getEventTypeLabel(event.tipoEvento)}</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#6b7280" />
            <Text style={styles.detailText}>{formatDate(event.dataInicio)}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#6b7280" />
            <Text style={styles.detailText} numberOfLines={1}>
              {event.endereco}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="musical-note-outline" size={16} color="#6b7280" />
            <Text style={styles.detailText}>{event.generoMusical}</Text>
          </View>

          <View style={styles.bottomRow}>
            <View style={styles.detailRow}>
              <Ionicons name="card-outline" size={16} color="#6b7280" />
              <Text style={styles.detailText}>{getPriceLabel(event.faixaPreco)}</Text>
            </View>

            {event.distancia && <Text style={styles.distanceText}>{event.distancia.toFixed(1)} km</Text>}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    flex: 1,
    marginRight: 8,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 12,
    color: "#6366f1",
    marginLeft: 4,
    fontWeight: "500",
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 8,
    flex: 1,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  distanceText: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "600",
  },
})

export default EventCard
