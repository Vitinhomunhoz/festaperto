"use client"

import { useState } from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native"

const FilterModal = ({ visible, onClose, filters, onApplyFilters }) => {
  const [tempFilters, setTempFilters] = useState(filters)

  const handleApply = () => {
    onApplyFilters(tempFilters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters = {
      raio: 10,
      tipo: "",
      faixaPreco: "",
      data: "",
    }
    setTempFilters(resetFilters)
    onApplyFilters(resetFilters)
    onClose()
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

  const raioOptions = [
    { label: "1 km", value: "1" },
    { label: "5 km", value: "5" },
    { label: "10 km", value: "10" },
    { label: "25 km", value: "25" },
    { label: "50 km", value: "50" },
  ]

  const tipoOptions = [
    { label: "Todos", value: "" },
    { label: "Clube", value: "clube" },
    { label: "Show", value: "show" },
    { label: "Bar", value: "bar" },
    { label: "Festa Gratuita", value: "festa_gratuita" },
  ]

  const precoOptions = [
    { label: "Qualquer preço", value: "" },
    { label: "Gratuito", value: "gratuito" },
    { label: "R$ 0-50", value: "0-50" },
    { label: "R$ 51-100", value: "51-100" },
    { label: "R$ 101-200", value: "101-200" },
    { label: "R$ 200+", value: "200+" },
  ]

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButton}>Cancelar</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Filtros</Text>
          <TouchableOpacity onPress={handleReset}>
            <Text style={styles.resetButton}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content}>
          <FilterOption
            title="Raio de Busca"
            options={raioOptions}
            selectedValue={tempFilters.raio.toString()}
            onSelect={(value) => setTempFilters({ ...tempFilters, raio: Number.parseInt(value) })}
          />

          <FilterOption
            title="Tipo de Evento"
            options={tipoOptions}
            selectedValue={tempFilters.tipo}
            onSelect={(value) => setTempFilters({ ...tempFilters, tipo: value })}
          />

          <FilterOption
            title="Faixa de Preço"
            options={precoOptions}
            selectedValue={tempFilters.faixaPreco}
            onSelect={(value) => setTempFilters({ ...tempFilters, faixaPreco: value })}
          />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
            <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  cancelButton: {
    fontSize: 16,
    color: "#6b7280",
  },
  resetButton: {
    fontSize: 16,
    color: "#ef4444",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 24,
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
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  applyButton: {
    backgroundColor: "#6366f1",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default FilterModal
