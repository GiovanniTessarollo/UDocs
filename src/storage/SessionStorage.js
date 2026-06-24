// Exemplo do que deve ter no seu SessionStorage.js ou UserStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  const jsonValue = await AsyncStorage.getItem('@udocs_user');
  return jsonValue != null ? JSON.parse(jsonValue) : null;
};

export const clearSession = async () => {
  await AsyncStorage.removeItem('@udocs_user');
};