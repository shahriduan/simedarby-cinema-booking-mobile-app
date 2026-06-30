import { authStorage } from '@/services/localStorage';
import axios from 'axios';
import { useRouter } from 'expo-router';

const router = useRouter();

const axiosApi = axios.create({
//   baseURL: process.env.EXPO_PUBLIC_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// REQUEST INTERCEPTOR (Before request is sent)
axiosApi.interceptors.request.use(
  async (config) => {
    const token = await authStorage.getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  }, (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR (After response arrives)
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If the server returns 401, the token is dead or invalid
    if (error.response && error.response.status === 401) {
      console.log('Token invalid or expired. Logging out...');
      
      await authStorage.removeToken();
      
      router.replace('/'); 
    }
    
    // return Promise.reject(error);
  }
);

export default axiosApi;