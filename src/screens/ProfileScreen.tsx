import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ProfileScreen = ({ navigation }) => {
  const navigateToCreateEvent = () => {
    navigation.navigate("CreateEvent")
  }

  const showInfo = (title, message) => {
    Alert.alert(title, message)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={64} color="#6366f1" />
        </View>
        <Text style={styles.name}>Usuário Demo</Text>
        <Text style={styles.email}>demo@festaperto.com</Text>
        <View style={styles.accountTypeContainer}>
          <Text style={styles.accountType}>Organizador</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem} onPress={navigateToCreateEvent}>
          <Ionicons name="add-circle" size={24} color="#6366f1" />
          <Text style={styles.menuText}>Criar Evento</Text>
          <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => showInfo("Configurações", "Funcionalidade em desenvolvimento")}
        >
          <Ionicons name="settings" size={24} color="#6366f1" />
          <Text style={styles.menuText}>Configurações</Text>
          <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => showInfo("Ajuda", "Para suporte, entre em contato: suporte@festaperto.com")}
        >
          <Ionicons name="help-circle" size={24} color="#6366f1" />
          <Text style={styles.menuText}>Ajuda</Text>
          <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => showInfo("Sobre", "FestaPerto v1.0\nDescubra os melhores eventos perto de você!")}
        >
          <Ionicons name="information-circle" size={24} color="#6366f1" />
          <Text style={styles.menuText}>Sobre</Text>
          <Ionicons name="chevron-forward" size={24} color="#9ca3af" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>FestaPerto - Versão Demo</Text>
        <Text style={styles.footerSubtext}>Todos os dados são simulados</Text>
      </View>
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
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
    paddingTop: 60,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f0f0ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 12,
  },
  accountTypeContainer: {
    backgroundColor: "#f0f0ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  accountType: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "600",
  },
  menu: {
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  menuText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
    flex: 1,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  footerSubtext: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
})

export default ProfileScreen
