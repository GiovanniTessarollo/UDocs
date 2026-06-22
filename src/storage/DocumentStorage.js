import AsyncStorage from "@react-native-async-storage/async-storage";

const DOCUMENTS_KEY = "@udoc_documents";

export const saveDocument = async (document) => {
  try {
    const existingDocuments = await getDocuments();

    const updatedDocuments = [
      ...existingDocuments,
      document,
    ];

    await AsyncStorage.setItem(
      DOCUMENTS_KEY,
      JSON.stringify(updatedDocuments)
    );
  } catch (error) {
    console.log("Erro ao salvar documento:", error);
  }
};

export const getDocuments = async () => {
  try {
    const data = await AsyncStorage.getItem(
      DOCUMENTS_KEY
    );

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Erro ao buscar documentos:", error);
    return [];
  }
};

export const deleteDocument = async (indexToDelete) => {
  try {
    const documents = await getDocuments();

    const updatedDocuments = documents.filter(
      (_, index) => index !== indexToDelete
    );

    await AsyncStorage.setItem(
      DOCUMENTS_KEY,
      JSON.stringify(updatedDocuments)
    );
  } catch (error) {
    console.log("Erro ao excluir documento:", error);
  }
};

export const toggleFavorite = async (indexToToggle) => {
  try {
    const documents = await getDocuments();

    documents[indexToToggle].favorito =
      !documents[indexToToggle].favorito;

    await AsyncStorage.setItem(
      DOCUMENTS_KEY,
      JSON.stringify(documents)
    );
  } catch (error) {
    console.log("Erro ao favoritar:", error);
  }
};

export const updateDocument = async (
  indexToUpdate,
  updatedDocument
) => {
  try {
    const documents = await getDocuments();

    documents[indexToUpdate] =
      updatedDocument;

    await AsyncStorage.setItem(
      DOCUMENTS_KEY,
      JSON.stringify(documents)
    );
  } catch (error) {
    console.log(
      "Erro ao atualizar documento:",
      error
    );
  }
};