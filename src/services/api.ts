import axios from 'axios';

const URL = 'http://127.0.0.1:8000'

export const privateApi = axios.create({
  baseURL: URL
});

export const api = axios.create({
  baseURL: URL
});
