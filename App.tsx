import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { StatusBar } from "expo-status-bar"
import { Ionicons } from "@expo/vector-icons"
import { LocationProvider } from "./src/contexts/LocationContext"
import { MockDataProvider } from "./src/contexts/MockDataContext"
import MapScreen from "./src/screens/MapScreen"
import ListScreen from "./src/screens/ListScreen"
import FavoritesScreen from "./src/screens/FavoritesScreen"
import ProfileScreen from "./src/screens/ProfileScreen"
import EventDetailsScreen from "./src/screens/EventDetailsScreen"
import CreateEventScreen from "./src/screens/CreateEventScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName

        if (route.name === "Mapa") {
          iconName = focused ? "map" : "map-outline"
        } else if (route.name === "Lista") {
          iconName = focused ? "list" : "list-outline"
        } else if (route.name === "Favoritos") {
          iconName = focused ? "heart" : "heart-outline"
        } else if (route.name === "Perfil") {
          iconName = focused ? "person" : "person-outline"
        } else {
          iconName = "help-outline"
        }

        return <Ionicons name={iconName} size={size} color={color} />
      },
      tabBarActiveTintColor: "#6366f1",
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}
  >
    <Tab.Screen name="Mapa" component={MapScreen} />
    <Tab.Screen name="Lista" component={ListScreen} />
    <Tab.Screen name="Favoritos" component={FavoritesScreen} />
    <Tab.Screen name="Perfil" component={ProfileScreen} />
  </Tab.Navigator>
)

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    <Stack.Screen
      name="EventDetails"
      component={EventDetailsScreen}
      options={{
        title: "Detalhes do Evento",
        headerStyle: { backgroundColor: "#6366f1" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
    <Stack.Screen
      name="CreateEvent"
      component={CreateEventScreen}
      options={{
        title: "Criar Evento",
        headerStyle: { backgroundColor: "#6366f1" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    />
  </Stack.Navigator>
)

export default function App() {
  return (
    <MockDataProvider>
      <LocationProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppStack />
        </NavigationContainer>
      </LocationProvider>
    </MockDataProvider>
  )
}
