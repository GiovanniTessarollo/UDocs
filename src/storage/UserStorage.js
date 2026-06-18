
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (user) => {
    await AsyncStorage.setItem(
        'users',
        JSON.stringify(user)
    );
};