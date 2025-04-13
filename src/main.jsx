import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// Import the CSS preserve utility - it doesn't need to be used,
// just imported so it's included in the bundle
import "./utils/cssPreserve.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
