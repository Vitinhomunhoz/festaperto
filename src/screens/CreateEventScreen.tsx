"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const CreateEventScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    endereco: "",
    tipoEvento: "clube",
    faixaPreco: "gratuito",
    generoMusical: "",
  })

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = () => {
    if (!formData.nome || !formData.endereco) {
      Alert.alert("Erro", "Por favor, preencha pelo menos o nome e endereço do evento")
      return
    }

    Alert.alert("Sucesso!", "Evento criado com sucesso! (Esta é uma versão demo)", [
      { text: "OK", onPress: () => navigation.goBack() },
    ])
  }

  const FilterOption = ({ title, options, selectedValue, onSelect }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[styles.option, selectedValue === option.value && styles.selectedOption]}
            onPress={() => onSelect(option.value)}
          >
            <Text style={[styles.optionText, selectedValue === option.value && styles.selectedOptionText]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )

  const tipoOptions = [
    { label: "Clube", value: "clube" },
    { label: "Show", value: "show" },
    { label: "Bar", value: "bar" },
    { label: "Festa Gratuita", value: "festa_gratuita" },
  ]

  const precoOptions = [
    { label: "Gratuito", value: "gratuito" },
    { label: "R$ 0-50", value: "0-50" },
    { label: "R$ 51-100", value: "51-100" },
    { label: "R$ 101-200", value: "101-200" },
    { label: "R$ 200+", value: "200+" },
  ]

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text style={styles.label}>Nome do Evento *</Text>
          <TextInput
            style={styles.input}
            value={formData.nome}
            onChangeText={(value) => handleInputChange("nome", value)}
            placeholder="Digite o nome do evento"
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.descricao}
            onChangeText={(value) => handleInputChange("descricao", value)}
            placeholder="Descreva o evento"
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Endereço *</Text>
          <TextInput
            style={styles.input}
            value={formData.endereco}
            onChangeText={(value) => handleInputChange("endereco", value)}
            placeholder="Endereço completo do evento"
          />

          <Text style={styles.label}>Gênero Musical</Text>
          <TextInput
            style={styles.input}
            value={formData.generoMusical}
            onChangeText={(value) => handleInputChange("generoMusical", value)}
            placeholder="Ex: Eletrônica, Rock, Sertanejo"
          />

          <FilterOption
            title="Tipo de Evento"
            options={tipoOptions}
            selectedValue={formData.tipoEvento}
            onSelect={(value) => handleInputChange("tipoEvento", value)}
          />

          <FilterOption
            title="Faixa de Preço"
            options={precoOptions}
            selectedValue={formData.faixaPreco}
            onSelect={(value) => handleInputChange("faixaPreco", value)}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Ionicons name="checkmark-circle" size={24} color="white" />
            <Text style={styles.submitButtonText}>Criar Evento</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  form: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "white",
  },
  selectedOption: {
    backgroundColor: "#6366f1",
    borderColor: "#6366f1",
  },
  optionText: {
    fontSize: 14,
    color: "#6b7280",
  },
  selectedOptionText: {
    color: "white",
    fontWeight: "500",
  },
  submitButton: {
    backgroundColor: "#6366f1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 16,
    marginTop: 32,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default CreateEventScreen
