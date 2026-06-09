import apiClient from './axios';

export async function getUserInfo() {
  const response = await apiClient.get('/user/info');
  return response.data;
}
