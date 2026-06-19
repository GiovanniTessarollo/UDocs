import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  getDocuments,
  deleteDocument,
  toggleFavorite,
} from "../storage/DocumentStorage";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function DocumentsScreen({ navigation }) {
  const [documentos, setDocumentos] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadDocuments = async () => {
        const docs = await getDocuments();

        console.log("DOCS:", docs);

        setDocumentos(docs);
      };

      loadDocuments();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Documentos</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.getParent()?.navigate("NewDocument")
        }
      >
        <Text style={styles.addButtonText}>
          + Adicionar Documento
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        Meus Documentos
      </Text>

      {documentos.length === 0 ? (
        <Text style={{ color: "#666" }}>
          Nenhum documento cadastrado.
        </Text>
      ) : (
        documentos.map((doc, index) => (
          <View
            key={index}
            style={styles.documentCard}
          >
            <View>
              <Text style={styles.documentName}>
                📄 {doc.nome}
              </Text>

              <Text
                style={{
                  color: "#666",
                  fontSize: 12,
                  marginTop: 3,
                }}
              >
                👥 {doc.grupo || "Sem grupo"}
              </Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                onPress={async () => {
                  await toggleFavorite(index);

                  const docs = await getDocuments();
                  setDocumentos(docs);
                }}
              >
                <Text style={styles.icon}>
                  {doc.favorito ? "⭐" : "☆"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={async () => {
                  await deleteDocument(index);

                  const docs = await getDocuments();
                  setDocumentos(docs);
                }}
              >
                <Text style={styles.icon}>
                  🗑️
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
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

  addButton: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },

  documentCard: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  documentName: {
    fontSize: 16,
    fontWeight: "600",
  },

  actions: {
    flexDirection: "row",
    gap: 15,
  },

  icon: {
    fontSize: 20,
  },
});