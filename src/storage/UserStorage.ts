import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUsername = async (value: string) => {
  await AsyncStorage.setItem('@github_username', value);
};

export const getUsername = async () => {
  const value = await AsyncStorage.getItem('@github_username');
  if (value !== null) {
    return value;
  } else {
    return '';
  }
};
