
import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSession = async (userId) => {
    await AsyncStorage.setItem(
        'currentUser',
        userId
    );
};