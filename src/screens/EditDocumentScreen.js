import React, { useState } from "react";
import {
  updateDocument,
} from "../storage/DocumentStorage";

import DateTimePicker from "@react-native-community/datetimepicker";

import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";

export default function EditDocumentScreen({
  route,
  navigation,
}) {
  const {
    documento,
    index,
  } = route.params;

  const [nome, setNome] = useState(
    documento.nome
  );

  const [tipo, setTipo] = useState(
    documento.tipo
  );

  const [validade, setValidade] = useState(
    documento.validade || ""
  );

  const [grupo, setGrupo] = useState(
    documento.grupo
  );

  const [showDatePicker, setShowDatePicker] =
    useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()}>
        <Text style={styles.backButton}>
            ←
        </Text>
        </TouchableOpacity>

        <Text style={styles.title}>
          Editar Documento
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Nome do documento"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() =>
          setShowDatePicker(true)
        }
      >
        <Text
          style={{
            color: validade
              ? "#000"
              : "#999",
            lineHeight: 55,
          }}
        >
          {validade ||
            "Selecionar validade"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>
        Grupo
      </Text>

      <View style={styles.groupsContainer}>
        {[
          "Pessoal",
          "Trabalho",
          "Veículo",
          "Faculdade",
          "Outros",
        ].map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.groupButton,
              grupo === item &&
                styles.groupButtonSelected,
            ]}
            onPress={() =>
              setGrupo(item)
            }
          >
            <Text
              style={[
                styles.groupButtonText,
                grupo === item &&
                  styles.groupButtonTextSelected,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(
            event,
            selectedDate
          ) => {
            setShowDatePicker(false);

            if (selectedDate) {
              const dia = String(
                selectedDate.getDate()
              ).padStart(2, "0");

              const mes = String(
                selectedDate.getMonth() +
                  1
              ).padStart(2, "0");

              const ano =
                selectedDate.getFullYear();

              setValidade(
                `${dia}/${mes}/${ano}`
              );
            }
          }}
        />
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (!nome.trim()) {
            alert(
              "Digite o nome do documento"
            );
            return;
          }

          if (!tipo.trim()) {
            alert(
              "Digite o tipo do documento"
            );
            return;
          }

          await updateDocument(
            index,
            {
              ...documento,
              nome,
              tipo,
              validade,
              grupo,
            }
          );

          alert(
            "Documento atualizado!"
          );

          navigation.goBack();
        }}
      >
        <Text style={styles.buttonText}>
          Salvar Alterações
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  backButton: {
    fontSize: 28,
    fontWeight: "700",
    marginRight: 15,
  },

  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
    justifyContent: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  groupsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },

  groupButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },

  groupButtonSelected: {
    backgroundColor: "#000",
  },

  groupButtonText: {
    color: "#000",
  },

  groupButtonTextSelected: {
    color: "#FFF",
  },

  button: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});