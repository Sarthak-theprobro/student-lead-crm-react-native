import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  save: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Storage save error:", error);
    }
  },

  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error("Storage get error:", error);
      return null;
    }
  },

  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Storage remove error:", error);
    }
  },
};
