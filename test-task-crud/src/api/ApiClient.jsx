import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'http://0.0.0.0/api',
});