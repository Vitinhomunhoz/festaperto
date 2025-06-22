"use client"

import { useState } from "react"
import MapScreen from "./MapScreen"
import ListScreen from "./ListScreen"
import FavoritesScreen from "./FavoritesScreen"
import ProfileScreen from "./ProfileScreen"
import EventDetailsScreen from "./EventDetailsScreen"
import CreateEventScreen from "./CreateEventScreen"

export default function MainApp() {
  const [currentScreen, setCurrentScreen] = useState("map")
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)

  const navigateToEventDetails = (eventId: number) => {
    setSelectedEventId(eventId)
    setCurrentScreen("eventDetails")
  }

  const navigateBack = () => {
    setCurrentScreen("map")
    setSelectedEventId(null)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "map":
        return <MapScreen onEventPress={navigateToEventDetails} />
      case "list":
        return <ListScreen onEventPress={navigateToEventDetails} />
      case "favorites":
        return <FavoritesScreen onEventPress={navigateToEventDetails} />
      case "profile":
        return <ProfileScreen onCreateEvent={() => setCurrentScreen("createEvent")} />
      case "eventDetails":
        return <EventDetailsScreen eventId={selectedEventId} onBack={navigateBack} />
      case "createEvent":
        return <CreateEventScreen onBack={navigateBack} />
      default:
        return <MapScreen onEventPress={navigateToEventDetails} />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex-1 overflow-hidden">{renderScreen()}</div>

      {/* Bottom Navigation */}
      {!["eventDetails", "createEvent"].includes(currentScreen) && (
        <div className="bg-white border-t border-gray-200 px-4 py-2">
          <div className="flex justify-around">
            <button
              onClick={() => setCurrentScreen("map")}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                currentScreen === "map" ? "text-indigo-600 bg-indigo-50" : "text-gray-600"
              }`}
            >
              <span className="text-xl mb-1">🗺️</span>
              <span className="text-xs font-medium">Mapa</span>
            </button>

            <button
              onClick={() => setCurrentScreen("list")}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                currentScreen === "list" ? "text-indigo-600 bg-indigo-50" : "text-gray-600"
              }`}
            >
              <span className="text-xl mb-1">📋</span>
              <span className="text-xs font-medium">Lista</span>
            </button>

            <button
              onClick={() => setCurrentScreen("favorites")}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                currentScreen === "favorites" ? "text-indigo-600 bg-indigo-50" : "text-gray-600"
              }`}
            >
              <span className="text-xl mb-1">❤️</span>
              <span className="text-xs font-medium">Favoritos</span>
            </button>

            <button
              onClick={() => setCurrentScreen("profile")}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                currentScreen === "profile" ? "text-indigo-600 bg-indigo-50" : "text-gray-600"
              }`}
            >
              <span className="text-xl mb-1">👤</span>
              <span className="text-xs font-medium">Perfil</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
