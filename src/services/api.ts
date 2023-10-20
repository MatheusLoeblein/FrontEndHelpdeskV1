import axios from 'axios';

const URL = 'http://127.0.0.1:8000'

export const privateApi = axios.create({
  baseURL: URL,
  headers:{
    "Content-Type": 'multipart/form-data'
  }
  
});

export const api = axios.create({
  baseURL: URL
});
