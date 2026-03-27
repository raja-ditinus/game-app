import AsyncStorage from '@react-native-async-storage/async-storage';

export const storageService = {
  async getNumber(key: string): Promise<number> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? Number(value) : 0;
    } catch {
      return 0;
    }
  },

  async setNumber(key: string, value: number): Promise<void> {
    try {
      await AsyncStorage.setItem(key, String(value));
    } catch {}
  },
};