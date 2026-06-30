import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = {
  token: 'token',
  cartBookingNumber: 'cart_booking_number'
};

export const getAllStorage = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const pairs = await AsyncStorage.multiGet(keys);
    const allData = Object.fromEntries(pairs);
    
    console.log(JSON.stringify(allData, null, 2));
    
    return allData;
  } catch (error) {
    console.error('Failed to clear or fetch storage data:', error);
  }
};

export const authStorage = {
  setToken: async (token) => {
    try {
      await AsyncStorage.setItem(storageKey.token, token);
      getAllStorage(); // Debug purpose
    } catch (e) {
      console.error('Error saving token', e);
    }
  },
  
  getToken: async () => {
    try {
      const key =  await AsyncStorage.getItem(storageKey.token);
      await getAllStorage(); // Debug purpose
      return key;
    } catch (e) {
      console.error('Error fetching token', e);
      return null;
    }
  },
  
  removeToken: async () => {
    try {
      await AsyncStorage.removeItem(storageKey.token);
      getAllStorage(); // Debug purpose
    } catch (e) {
      console.error('Error removing token', e);
    }
  }
};

export const bookingStorage = {
  setBookingId: async (bookingId) => {
    try {
      await AsyncStorage.setItem(storageKey.cartBookingNumber, bookingId);
    } catch (e) {
      console.error('Error saving booking ID', e);
    }
  },

  getBookingId: async () => {
    try {
      const key =  await AsyncStorage.getItem(storageKey.cartBookingNumber);
      // await getAllStorage(); // Debug purpose
      return key;
    } catch (e) {
      console.error('Error fetching token', e);
      return null;
    }
  },
};