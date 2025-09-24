import axios from "axios";

// Prefer Vite env at build-time; fallback to common localhost default
const baseURL = (
    import.meta.env.VITE_API_BASE_URL ||
    process.env.VITE_API_BASE_URL ||
    "http://localhost:3000/api/v1"
);

const api = axios.create({
    baseURL,
    withCredentials: false
});

// Attach bearer token from localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export default api;


