import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function GroupDocumentsScreen({ route }) {
  const { grupo, documentos } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        👥 {grupo}
      </Text>

      {documentos.map((doc, index) => (
        <View
          key={index}
          style={styles.documentCard}
        >
          <Text>
            📄 {doc.nome}
          </Text>
        </View>
      ))}
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

  documentCard: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
  },
});