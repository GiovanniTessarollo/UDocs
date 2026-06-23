import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";

import {
  overwriteDocuments,
} from "../storage/DocumentStorage";

import {
  getDocuments,
} from "../storage/DocumentStorage";

export async function exportBackup() {
  const documentos =
    await getDocuments();

  const backup =
    JSON.stringify(
      documentos,
      null,
      2
    );

  const path =
    FileSystem.documentDirectory +
    "udoc-backup.json";

  await FileSystem.writeAsStringAsync(
    path,
    backup
  );

  await Sharing.shareAsync(path);
}

export async function importBackup() {
  try {
    const result =
      await DocumentPicker.getDocumentAsync({
        type: "application/json",
      });

    if (result.canceled) {
      return;
    }

    const file =
      result.assets[0];

    const content =
      await FileSystem.readAsStringAsync(
        file.uri
      );

    const documentos =
      JSON.parse(content);

    await overwriteDocuments(
      documentos
    );

    alert(
      "Backup restaurado com sucesso!"
    );
  } catch (error) {
    console.log(error);

    alert(
      "Erro ao importar backup."
    );
  }
}