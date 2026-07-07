import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("fx-favorites", []);
  const [log, setLog] = useLocalStorage("fx-log", []);

  function isFavorited(from, to) {
    return favorites.some((fav) => fav.from === from && fav.to === to);
  }

  function toggleFavorite(from, to) {
    if (isFavorited(from, to)) {
      setFavorites(
        favorites.filter((fav) => !(fav.from === from && fav.to === to)),
      );
    } else {
      setFavorites([...favorites, { from, to }]);
    }
  }

  function addLogEntry(entry) {
    setLog([{ id: crypto.randomUUID(), ...entry }, ...log]);
  }

  function deleteLogEntry(id) {
    setLog(log.filter((entry) => entry.id !== id));
  }

  function clearLog() {
    setLog([]);
  }

  const value = {
    favorites,
    isFavorited,
    toggleFavorite,
    log,
    addLogEntry,
    deleteLogEntry,
    clearLog,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
