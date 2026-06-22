import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { getDocuments } from "../storage/DocumentStorage";

export default function DashboardScreen({
  navigation,
}) {
  const [documentos, setDocumentos] = useState([]);

  const vencidos = documentos.filter((doc) => {
    if (!doc.validade) return false;

    const [dia, mes, ano] =
      doc.validade.split("/");

    const validadeDate = new Date(
      ano,
      mes - 1,
      dia
    );

    return validadeDate < new Date();
  }).length;

  const favoritos = documentos.filter(
    (doc) => doc.favorito
  ).length;

  const proximosVencer = documentos.filter(
  (doc) => {
    if (!doc.validade) return false;

    const [dia, mes, ano] =
      doc.validade.split("/");

    const validadeDate = new Date(
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

    return (
      diferencaDias > 0 &&
      diferencaDias <= 30
    );
  }
).length;

  useFocusEffect(
    useCallback(() => {
      const loadDocuments = async () => {
        const docs = await getDocuments();
        setDocumentos(docs);
      };

      loadDocuments();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          Udoc
        </Text>

        <View style={styles.headerIcons}>
          <Text style={styles.icon}>
            🔍
          </Text>

          <Text style={styles.icon}>
            🔔
          </Text>
        </View>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>
          📄 Seus Documentos
        </Text>

        <Text style={styles.bannerText}>
          Você possui {documentos.length} documento(s)
          e {favoritos} favorito(s).
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Resumo
      </Text>

      <View style={styles.statsContainer}>
  <View style={styles.statCard}>
    <Text style={styles.statNumber}>
      {documentos.length}
    </Text>

    <Text style={styles.statText}>
      Documentos
    </Text>
  </View>

  <TouchableOpacity
    style={styles.statCard}
    onPress={() =>
      navigation.navigate(
        "FavoriteDocuments"
      )
    }
  >
    <Text style={styles.statNumber}>
      {favoritos}
    </Text>

    <Text style={styles.statText}>
      Favoritos
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.statCard}
    onPress={() =>
      navigation.navigate(
        "ExpiredDocuments"
      )
    }
  >
    <Text style={styles.statNumber}>
      {vencidos}
    </Text>

    <Text style={styles.statText}>
      Vencidos
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.statCard}
    onPress={() =>
      navigation.navigate(
        "UpcomingDocuments"
      )
    }
  >
    <Text style={styles.statNumber}>
      {proximosVencer}
    </Text>

    <Text style={styles.statText}>
      Próximos
    </Text>
  </TouchableOpacity>
</View>

      <Text style={styles.sectionTitle}>
        Documentos recentes
      </Text>

      {documentos.length === 0 ? (
        <Text>
          Nenhum documento cadastrado.
        </Text>
      ) : (
        documentos
          .slice(-3)
          .reverse()
          .map((doc, index) => (
            <View
              key={index}
              style={styles.documentCard}
            >
              <Text>
                📄 {doc.nome}
              </Text>
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
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 28,
    fontWeight: "700",
  },

  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },

  icon: {
    fontSize: 22,
  },

  banner: {
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },

  bannerTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  bannerText: {
    color: "#FFF",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 15,
  },

  statsContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
},

  statCard: {
  backgroundColor: "#FFF",
  width: "48%",
  padding: 15,
  borderRadius: 15,
  alignItems: "center",
  marginBottom: 12,
},

  statNumber: {
    fontSize: 24,
    fontWeight: "700",
  },

  statText: {
    marginTop: 5,
    color: "#666",
  },

  documentCard: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
  },
});