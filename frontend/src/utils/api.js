// src/utils/api.js
import axios from "axios";

// Create an Axios instance to be reused
const api = axios.create({
    baseURL: "http://localhost:7000/",  // Backend base URL
    withCredentials: true,  // Important if you're using cookies for authentication
});

export default api;
