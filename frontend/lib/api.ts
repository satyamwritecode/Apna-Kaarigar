import axios from 'axios';

// Connects to your Node.js / MongoDB Server
export const backendAPI = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Connects to your Python / FastAPI Server
export const aiAPI = axios.create({
    baseURL: 'http://localhost:8000',
});