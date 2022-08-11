import AsyncStorage from '@react-native-async-storage/async-storage';

import {IConfig} from '../types/ConfigTypes';

export const storeConfig = async (config: IConfig) => {
  await AsyncStorage.setItem('@app_config', JSON.stringify(config));
};

export const getConfig = async (): Promise<IConfig | undefined> => {
  const value = await AsyncStorage.getItem('@app_config');

  if (value !== null) {
    return JSON.parse(value);
  } else {
    return undefined;
  }
};

export const clearConfig = async () => {
  await AsyncStorage.removeItem('@app_config');
};
