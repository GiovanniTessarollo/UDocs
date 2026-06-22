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
  TextInput,
} from "react-native";

export default function DocumentsScreen({
  navigation,
}) {
  const [documentos, setDocumentos] =
    useState([]);

  const [pesquisa, setPesquisa] =
    useState("");

   const getStatus = (validade) => {
  if (!validade) {
    return {
      texto: "Em dia",
      cor: "#22C55E",
    };
  }

  const [dia, mes, ano] =
    validade.split("/");

  const validadeDate =
    new Date(
      ano,
      mes - 1,
      dia
    );

  const hoje = new Date();

  const diferencaDias =
    Math.ceil(
      (validadeDate - hoje) /
        (1000 * 60 * 60 * 24)
    );

  if (diferencaDias < 0) {
    return {
      texto: "Vencido",
      cor: "#EF4444",
    };
  }

  if (diferencaDias <= 30) {
    return {
      texto: "Vence em breve",
      cor: "#F59E0B",
    };
  }

  return {
    texto: "Em dia",
    cor: "#22C55E",
  };
};

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

  const documentosFiltrados = documentos
    .map((doc, originalIndex) => ({
      ...doc,
      originalIndex,
    }))
    .filter((doc) =>
      doc.nome
        .toLowerCase()
        .includes(
          pesquisa.toLowerCase()
        )
    );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Documentos
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation
            .getParent()
            ?.navigate("NewDocument")
        }
      >
        <Text style={styles.addButtonText}>
          + Adicionar Documento
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Pesquisar documento..."
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      <Text style={styles.sectionTitle}>
        Meus Documentos
      </Text>

      {documentos.length === 0 ? (
  <Text style={{ color: "#666" }}>
    Nenhum documento cadastrado.
  </Text>
) : (
  documentosFiltrados.map(
    (doc, index) => (
      <TouchableOpacity
        key={index}
        style={styles.documentCard}
        onPress={() =>
          navigation.navigate(
            "DocumentDetails",
            {
              documento: doc,
              index: doc.originalIndex,
            }
          )
        }
      >
        <View>
          <Text
            style={styles.documentName}
          >
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

          <Text
           style={[styles.statusText,
            {
            color:
            getStatus(doc.validade).cor,
            },
            ]}
>
             ● {getStatus(doc.validade).texto}
          </Text>
        </View>

        <View
          style={styles.actions}
        >
          <TouchableOpacity
            onPress={async () => {
              await toggleFavorite(
                doc.originalIndex
              );

              const docs =
                await getDocuments();

              setDocumentos(docs);
            }}
          >
            <Text
              style={styles.icon}
            >
              {doc.favorito
                ? "⭐"
                : "☆"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={async () => {
              await deleteDocument(
                doc.originalIndex
              );

              const docs =
                await getDocuments();

              setDocumentos(docs);
            }}
          >
            <Text
              style={styles.icon}
            >
              🗑️
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  )
)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  statusText: {
  marginTop: 5,
  fontSize: 12,
  fontWeight: "700",
},

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

  searchInput: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#DDD",
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