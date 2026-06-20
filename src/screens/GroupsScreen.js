import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { getDocuments } from "../storage/DocumentStorage";

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function GroupsScreen({ navigation }) {
  const [grupos, setGrupos] = useState({});

  useFocusEffect(
    useCallback(() => {
      const loadGroups = async () => {
        const docs = await getDocuments();

        const grouped = {};

        docs.forEach((doc) => {
          const grupo = doc.grupo || "Sem grupo";

          if (!grouped[grupo]) {
            grouped[grupo] = [];
          }

          grouped[grupo].push(doc);
        });

        setGrupos(grouped);
      };

      loadGroups();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Grupos</Text>

      {Object.keys(grupos).length === 0 ? (
        <Text>Nenhum grupo encontrado.</Text>
      ) : (
        Object.keys(grupos).map((grupo) => (
          <TouchableOpacity
            key={grupo}
            style={styles.groupCard}
            onPress={() =>
              navigation.navigate("GroupDocuments", {
                grupo,
                documentos: grupos[grupo],
              })
            }
          >
            <Text style={styles.groupName}>
              👥 {grupo}
            </Text>

            <Text style={styles.groupCount}>
              {grupos[grupo].length} documento(s)
            </Text>
          </TouchableOpacity>
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

  groupCard: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
  },

  groupName: {
    fontSize: 16,
    fontWeight: "600",
  },

  groupCount: {
    color: "#666",
    marginTop: 5,
  },
});