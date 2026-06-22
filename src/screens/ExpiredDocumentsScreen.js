import React, {
  useState,
  useCallback,
} from "react";

import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { getDocuments } from "../storage/DocumentStorage";

export default function ExpiredDocumentsScreen({
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

        const vencidos = docs
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

            return (
              validadeDate <
              new Date()
            );
          });

        setDocumentos(vencidos);
      };

      loadDocuments();
    }, [])
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        ⚠️ Documentos Vencidos
      </Text>

      {documentos.length === 0 ? (
        <Text>
          Nenhum documento vencido.
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

  statusText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "700",
  },
});