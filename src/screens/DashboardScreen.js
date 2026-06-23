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

    const documentoMaisUrgente = documentos
  .filter((doc) => {
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

    return diferencaDias > 0;
  })
  .sort((a, b) => {
    const [diaA, mesA, anoA] =
      a.validade.split("/");

    const [diaB, mesB, anoB] =
      b.validade.split("/");

    return (
      new Date(
        anoA,
        mesA - 1,
        diaA
      ) -
      new Date(
        anoB,
        mesB - 1,
        diaB
      )
    );
  })[0];

  useFocusEffect(
    useCallback(() => {
      const loadDocuments = async () => {
        const docs = await getDocuments();
        setDocumentos(docs);
      };

      loadDocuments();
    }, [])
  );

  const totalNotificacoes =
  vencidos + proximosVencer;

  const emDia = documentos.filter((doc) => {
  if (!doc.validade) return true;

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

  return diferencaDias > 30;
}).length;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
          Udoc
        </Text>

        <View style={styles.headerIcons}>
  <TouchableOpacity
    onPress={() =>
      navigation.navigate(
        "Documentos"
      )
    }
  >
    <Text style={styles.icon}>
      🔍
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
  onPress={() => {
    if (
      vencidos === 0 &&
      proximosVencer === 0
    ) {
      alert(
        "✅ Nenhuma notificação pendente."
      );
      return;
    }

    alert(
      `⚠️ Notificações\n\n🔴 ${vencidos} documento(s) vencido(s)\n🟡 ${proximosVencer} próximo(s) do vencimento`
    );
  }}
>
  <View>
    <Text style={styles.icon}>
      🔔
    </Text>

    {totalNotificacoes > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {totalNotificacoes}
        </Text>
      </View>
    )}
  </View>
</TouchableOpacity>
  </View>
      </View>

      <View style={styles.banner}>
       <Text style={styles.bannerTitle}>
         👋 Bem-vindo ao UDoc
       </Text>

      <Text style={styles.bannerText}>
        {documentos.length} documento(s) organizados
      </Text>

      <Text style={styles.bannerSubText}>
        ⭐ {favoritos} favorito(s)
       </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Resumo
      </Text>

     <View style={styles.statsContainer}>
  <View
    style={[
      styles.statCard,
      styles.documentsCard,
    ]}
  >
    <Text style={styles.cardIcon}>
      📄
    </Text>

    <Text style={styles.statNumber}>
      {documentos.length}
    </Text>

    <Text style={styles.statText}>
      Documentos
    </Text>
  </View>

  <TouchableOpacity
    style={[
      styles.statCard,
      styles.favoriteCard,
    ]}
    onPress={() =>
      navigation.navigate(
        "FavoriteDocuments"
      )
    }
  >
    <Text style={styles.cardIcon}>
      ⭐
    </Text>

    <Text style={styles.statNumber}>
      {favoritos}
    </Text>

    <Text style={styles.statText}>
      Favoritos
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.statCard,
      styles.expiredCard,
    ]}
    onPress={() =>
      navigation.navigate(
        "ExpiredDocuments"
      )
    }
  >
    <Text style={styles.cardIcon}>
      ⚠️
    </Text>

    <Text style={styles.statNumber}>
      {vencidos}
    </Text>

    <Text style={styles.statText}>
      Vencidos
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[
      styles.statCard,
      styles.upcomingCard,
    ]}
    onPress={() =>
      navigation.navigate(
        "UpcomingDocuments"
      )
    }
  >
    <Text style={styles.cardIcon}>
      ⏳
    </Text>

    <Text style={styles.statNumber}>
      {proximosVencer}
    </Text>

    <Text style={styles.statText}>
      Próximos
    </Text>
  </TouchableOpacity>
</View>

    <Text style={styles.sectionTitle}>
  Documento mais urgente
</Text>

{documentoMaisUrgente && (
  <View style={styles.urgentCard}>
      <Text style={styles.urgentTitle}>
        📄 {documentoMaisUrgente.nome}
      </Text>

      <Text style={styles.urgentSubtitle}>
        📅 {documentoMaisUrgente.validade}
       </Text>

        <Text style={styles.urgentText}>
      ⚠️   Atenção necessária
        </Text>
      </View>
    )}  

    <Text style={styles.sectionTitle}>
  📊 Status Geral
</Text>

<View style={styles.statusContainer}>
  <View
    style={[
      styles.statusCard,
      styles.greenCard,
    ]}
  >
    <Text style={styles.statusIcon}>
      🟢
    </Text>

    <Text style={styles.statusNumber}>
      {emDia}
    </Text>

    <Text style={styles.statusText}>
      Em dia
    </Text>
  </View>

  <View
    style={[
      styles.statusCard,
      styles.yellowCard,
    ]}
  >
    <Text style={styles.statusIcon}>
      🟡
    </Text>

    <Text style={styles.statusNumber}>
      {proximosVencer}
    </Text>

    <Text style={styles.statusText}>
      Em breve
    </Text>
  </View>

  <View
    style={[
      styles.statusCard,
      styles.redCard,
    ]}
  >
    <Text style={styles.statusIcon}>
      🔴
    </Text>

    <Text style={styles.statusNumber}>
      {vencidos}
    </Text>

    <Text style={styles.statusText}>
      Vencidos
    </Text>
  </View>
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
      <TouchableOpacity
        key={index}
        style={styles.documentCard}
        onPress={() =>
          navigation.navigate(
            "DocumentDetails",
            {
              documento: doc,
              index: documentos.findIndex(
                (d) =>
                  d.createdAt ===
                  doc.createdAt
              ),
            }
          )
        }
      >
        <Text
          style={styles.documentTitle}
        >
          📄 {doc.nome}
        </Text>

        <Text
          style={styles.documentSubtitle}
        >
          👥 {doc.grupo || "Sem grupo"}
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
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
  fontSize: 34,
  fontWeight: "800",
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
  width: "48%",
  height: 130,
  borderRadius: 18,
  justifyContent: "center",
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
  
  bannerSubText: {
  color: "#FFF",
  marginTop: 5,
  opacity: 0.8,
},

documentsCard: {
  backgroundColor: "#DBEAFE",
},

favoriteCard: {
  backgroundColor: "#FEF3C7",
},

expiredCard: {
  backgroundColor: "#FEE2E2",
},

upcomingCard: {
  backgroundColor: "#FED7AA",
},

cardIcon: {
  fontSize: 28,
  marginBottom: 8,
},

documentTitle: {
  fontSize: 16,
  fontWeight: "700",
},

documentSubtitle: {
  marginTop: 5,
  color: "#666",
},

urgentCard: {
  backgroundColor: "#FEF3C7",
  borderRadius: 18,
  padding: 18,
  marginBottom: 10,
},

urgentTitle: {
  fontSize: 18,
  fontWeight: "700",
},

urgentSubtitle: {
  marginTop: 5,
  color: "#666",
},

urgentText: {
  marginTop: 10,
  color: "#B45309",
  fontWeight: "700",
},

badge: {
  position: "absolute",
  top: -5,
  right: -8,
  backgroundColor: "#EF4444",
  borderRadius: 10,
  minWidth: 18,
  height: 18,
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 4,
},

badgeText: {
  color: "#FFF",
  fontSize: 10,
  fontWeight: "700",
},

 statusContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
},

statusCard: {
  width: "31%",
  padding: 15,
  borderRadius: 15,
  alignItems: "center",
},

greenCard: {
  backgroundColor: "#DCFCE7",
},

yellowCard: {
  backgroundColor: "#FEF3C7",
},

redCard: {
  backgroundColor: "#FEE2E2",
},

statusIcon: {
  fontSize: 24,
},

statusNumber: {
  fontSize: 22,
  fontWeight: "700",
  marginTop: 5,
},

statusText: {
  marginTop: 5,
  fontSize: 12,
  color: "#666",
},
});