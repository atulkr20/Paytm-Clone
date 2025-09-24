import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import App from "./App.jsx";
import "./index.css";

// Configure axios base URL for production builds
if (import.meta.env.VITE_API_BASE) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE;
}

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
