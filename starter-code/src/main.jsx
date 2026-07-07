import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CurrencyProvider } from "./context/CurrencyContext.jsx";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CurrencyProvider>
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </CurrencyProvider>
  </StrictMode>,
);
