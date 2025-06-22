"use client"

import React from "react"
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
import type { Event } from "../data/mockEvents"

interface EventCardProps {
  event: Event
  onPress: () => void
}

export default function EventCard({ event, onPress }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEventTypeLabel = (type: string) => {
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

  const getPriceLabel = (price: string) => {
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

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case "clube":
        return "🎪"
      case "show":
        return "🎤"
      case "bar":
        return "🍺"
      case "festa_gratuita":
        return "🎉"
      default:
        return "📍"
    }
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event.fotos[0] || "https://via.placeholder.com/300x200" }}
          style={styles.image}
        />
        <View style={styles.iconContainer}>
          <Text>{getEventIcon(event.tipoEvento)}</Text>
          <Text style={styles.eventType}>{getEventTypeLabel(event.tipoEvento)}</Text>
        </View>
        {event.distancia && (
          <View style={styles.distanceContainer}>
            <Text style={styles.distanceText}>{event.distancia.toFixed(1)} km</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{event.nome}</Text>
        <View style={styles.infoRow}>
          <Text>📅 {formatDate(event.dataInicio)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text>📍 {event.endereco}</Text>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.priceRow}>
            <Text>💰 {getPriceLabel(event.faixaPreco)}</Text>
          </View>
          {event.mediaAvaliacoes > 0 && (
            <View style={styles.ratingRow}>
              <Text>⭐ {event.mediaAvaliacoes.toFixed(1)} ({event.totalAvaliacoes})</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    backgroundColor: "#e5e7eb",
  },
  iconContainer: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  eventType: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 4,
  },
  distanceContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "#6366f1",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  distanceText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#1f2937",
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
})
