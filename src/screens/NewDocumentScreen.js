import React, { useState } from "react";
import {
  saveDocument,
  getDocuments,
} from "../storage/DocumentStorage";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function NewDocumentScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [validade, setValidade] = useState("");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Novo Documento</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Validade"
        value={validade}
        onChangeText={setValidade}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          console.log("SALVANDO...");

        await saveDocument({
         nome,
         tipo,
         validade,
         favorito: false,
         createdAt: new Date().toISOString(),});

          const docs = await getDocuments();

          console.log("DOCUMENTOS:", docs); navigation.goBack();}}>
        <Text style={styles.buttonText}>
         Salvar Documento
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