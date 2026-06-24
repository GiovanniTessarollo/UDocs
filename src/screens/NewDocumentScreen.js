import React, { useState } from "react";
import { saveDocument } from "../storage/DocumentStorage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { scheduleExpirationNotification } from "../services/NotificationService";
import * as DocumentPicker from "expo-document-picker";
// Importamos o useNavigation aqui
import { useNavigation } from "@react-navigation/native"; 

import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
} from "react-native";

export default function NewDocumentScreen() { // Removida a propriedade { navigation }
  const navigation = useNavigation(); // Inicializamos o hook de navegação aqui
  
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [validade, setValidade] = useState("");
  const [grupo, setGrupo] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [arquivo, setArquivo] = useState(null);

  const selecionarArquivo = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setArquivo(result.assets[0]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Novo Documento
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do documento"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo (RG, CNH, CPF...)"
        value={tipo}
        onChangeText={setTipo}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text
          style={{
            color: validade ? "#000" : "#999",
            lineHeight: 55,
          }}
        >
          {validade || "Selecionar validade"}
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
            onPress={() => setGrupo(item)}
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

      <Text style={styles.label}>
        Arquivo
      </Text>

      <TouchableOpacity
        style={styles.input}
        onPress={selecionarArquivo}
      >
        <Text>
          {arquivo
            ? arquivo.name
            : "📎 Selecionar arquivo"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);

            if (selectedDate) {
              const dia = String(
                selectedDate.getDate()
              ).padStart(2, "0");

              const mes = String(
                selectedDate.getMonth() + 1
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

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => {
            // Se goBack() falhar por ser um Modal, ele tenta fechar de outra forma
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              alert("Não há tela para voltar no histórico.");
            }
          }}
        >
          <Text style={styles.cancelButtonText}>
            Voltar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            if (!nome.trim()) {
              alert("Digite o nome do documento");
              return;
            }

            if (!tipo.trim()) {
              alert("Digite o tipo do documento");
              return;
            }

            if (!grupo) {
              alert("Selecione um grupo");
              return;
            }

            await saveDocument({
              nome,
              tipo,
              validade,
              grupo,
              favorito: false,
              arquivo,
              createdAt: new Date().toISOString(),
            });

            await scheduleExpirationNotification(
              nome,
            );
            alert("Documento salvo com sucesso!");

            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        >
          <Text style={styles.buttonText}>
            Salvar
          </Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 28,
    fontWeight: "700",
    marginTop: 50,
    marginBottom: 25,
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

  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
    marginBottom: 40,
  },

  button: {
    flex: 1,
    backgroundColor: "#000",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  cancelButton: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
  },

  cancelButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
  },
});