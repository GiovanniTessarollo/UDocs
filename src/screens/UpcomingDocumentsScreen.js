import React, {
  useState,
  useCallback,
} from "react";

import {
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { getDocuments } from "../storage/DocumentStorage";

export default function UpcomingDocumentsScreen({
  navigation,
}) {
  const [documentos, setDocumentos] =
    useState([]);

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
      texto: `Vencido há ${Math.abs(
        diferencaDias
      )} dias`,
      cor: "#EF4444",
    };
  }

  if (diferencaDias <= 30) {
    return {
      texto: `Vence em ${diferencaDias} dias`,
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
        const docs =
          await getDocuments();

        const proximos = docs
          .map(
            (
              doc,
              originalIndex
            ) => ({
              ...doc,
              originalIndex,
            })
          )
          .filter((doc) => {
            if (!doc.validade)
              return false;

            const [
              dia,
              mes,
              ano,
            ] =
              doc.validade.split(
                "/"
              );

            const validadeDate =
              new Date(
                ano,
                mes - 1,
                dia
              );

            const hoje =
              new Date();

            const diferencaDias =
              Math.ceil(
                (validadeDate -
                  hoje) /
                  (1000 *
                    60 *
                    60 *
                    24)
              );

            return (
              diferencaDias > 0 &&
              diferencaDias <= 30
            );
          });

        setDocumentos(proximos);
      };

      loadDocuments();
    }, [])
  );

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
          Próximos a vencer
        </Text>
      </View>

      {documentos.length === 0 ? (
        <Text>
          Nenhum documento próximo do vencimento.
        </Text>
      ) : (
        documentos.map(
          (doc, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() =>
                navigation.navigate(
                  "DocumentDetails",
                  {
                    documento: doc,
                    index:
                      doc.originalIndex,
                  }
                )
              }
            >
              <Text>
                📄 {doc.nome}
              </Text>

              <Text>
                📅 {doc.validade}
              </Text>

              <Text
                style={[
                  styles.statusText,
                  {
                    color:
                      getStatus(
                        doc.validade
                      ).cor,
                  },
                ]}
              >
                ●{" "}
                {
                  getStatus(
                    doc.validade
                  ).texto
                }
              </Text>
            </TouchableOpacity>
          )
        )
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

  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
  },

  statusText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "700",
  },
});