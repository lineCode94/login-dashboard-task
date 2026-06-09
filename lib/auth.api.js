import apiClient from './axios';

export async function loginUser({ email, password }) {
  const response = await apiClient.post('/yeshtery/token', {
    email,
    password,
    isEmployee: true,
  });
  return response.data;
}
