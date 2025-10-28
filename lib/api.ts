import axios, { AxiosResponse } from 'axios';
//import storage from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import Toast from 'react-native-toast-message';

const storage = AsyncStorage;

interface ExpoExtra {
  API_URL: string;
  API_UUID: string;
  API_SECRET: string;
}

// On “force” le typage
const { API_URL, API_UUID, API_SECRET } = Constants.expoConfig?.extra as ExpoExtra;

export const getAutorizationToken = async () => {
  Toast.show({
    type: 'success',
    text1: 'Token invalide',
    text2: 'Récupération en cours...',
  });
  const res = await axios.post(API_URL + '/oauth/token', {
    grant_type: 'client_credentials',
    client_id: API_UUID,
    client_secret: API_SECRET,
  });
  await storage.setItem('access_token', res.data.access_token);
};

const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

// Intercepteur pour ajouter le token

api.interceptors.request.use(async (config) => {
  const accessToken = await storage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // éviter boucle infinie

      try {
        // Rafraîchit le token
        await getAutorizationToken();

        return api(originalRequest);
      } catch (refreshError) {
        return;
      }
    }

    return Promise.reject(error);
  }
);

type Method = 'get' | 'post' | 'put';

const methodsAPI: Record<Method, (path: string, body?: any) => Promise<AxiosResponse<any, any>>> = {
  get: (path: string) => api.get(path),
  post: (path: string, body: any) => api.post(path, body),
  put: (path: string, body: any) => api.put(path, body),
};

export async function fetchAPI(method: Method, path: string, body?: any) {
  const response = methodsAPI[method](path, body);
  return await response;
}

export default api;
