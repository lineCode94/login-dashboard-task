import apiClient from './axios.js';

export async function getUserInfo() {
  const response = await apiClient.get('/user/info');
  return response.data;
}
