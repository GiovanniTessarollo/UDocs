import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  exportBackup,
  importBackup,
} from "../services/BackupService";

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        ⚙️ Configurações
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={exportBackup}
      >
        <Text style={styles.buttonText}>
          📤 Exportar Backup
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={importBackup}
      >
        <Text style={styles.buttonText}>
          📥 Importar Backup
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#000",
    height: 55,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});