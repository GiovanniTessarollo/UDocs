import React, {
  useState,
  useCallback,
} from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { getDocuments, deleteDocument, } from "../storage/DocumentStorage";

export default function DocumentDetailsScreen({
  route,
  navigation,
}) {
  const { documento, index } = route.params;

const [documentoAtual, setDocumentoAtual] =
  useState(documento);

useFocusEffect(
  useCallback(() => {
    const loadDocument = async () => {
      const docs =
        await getDocuments();
if (docs[index]) {
  setDocumentoAtual(
    docs[index]
  );
}
    };

    loadDocument();
  }, [index])
);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        📄 Detalhes
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>
          Nome
        </Text>

        <Text style={styles.value}>
          {documentoAtual?.nome}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Tipo
        </Text>

        <Text style={styles.value}>
          {documentoAtual?.tipo}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Grupo
        </Text>

        <Text style={styles.value}>
          {documentoAtual?.grupo}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Validade
        </Text>

        <Text style={styles.value}>
          {documentoAtual?.validade || "Sem validade"}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          Favorito
        </Text>

        <Text style={styles.value}>
          {documentoAtual?.favorito
            ? "⭐ Sim"
            : "Não"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          navigation.navigate(
            "EditDocument",
            {
              documento: documentoAtual,
              index,
            }
          )
        }
      >
        <Text style={styles.editButtonText}>
          ✏️ Editar Documento
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
  style={styles.deleteButton}
  onPress={async () => {
    await deleteDocument(index);

    alert(
      "Documento excluído com sucesso!"
    );

    navigation.goBack();
  }}
>
  <Text style={styles.deleteButtonText}>
    🗑️ Excluir Documento
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
    marginTop: 40,
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
  },

  editButton: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  editButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteButton: {
  backgroundColor: "#D32F2F",
  height: 55,
  borderRadius: 12,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
},

deleteButtonText: {
  color: "#FFF",
  fontSize: 16,
  fontWeight: "600",
},
});