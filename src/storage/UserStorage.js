import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "@user_data";

export const UserStorage = {
  async saveUser(user) {
    try {
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    } catch (e) {
      console.log("Erro ao salvar usuário:", e);
    }
  },

  async getUser() {
    try {
      const data = await AsyncStorage.getItem(USER_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.log("Erro ao buscar usuário:", e);
      return null;
    }
  },

  async clearUser() {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (e) {
      console.log("Erro ao remover usuário:", e);
    }
  },
};