import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Ticker from "./components/Ticker";
import Converter from "./components/Converter";
import Tabs from "./components/Tabs";
import History from "./components/History";
import Compare from "./components/Compare";
import Favorites from "./components/Favorites";
import Log from "./components/Log";
import {
  setFromCurrency,
  setToCurrency,
} from "./features/currency/currencySlice";
import { useFavorites } from "./context/FavoritesContext";

export default function App() {
  const { fromCurrency, toCurrency, rate } = useSelector(
    (state) => state.currency,
  );
  const dispatch = useDispatch();
  const { favorites, log } = useFavorites();

  const [activeTab, setActiveTab] = useState("history");
  const [range, setRange] = useState("1M");

  function handleLoadFavorite(from, to) {
    dispatch(setFromCurrency(from));
    dispatch(setToCurrency(to));
    setActiveTab("history");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Ticker />
      <main className="mx-auto w-full max-w-[1092px] px-6 py-12 sm:px-8 lg:px-0">
        <Converter />
        <Tabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          favoritesCount={favorites.length}
          logCount={log.length}
        />
        {activeTab === "history" && (
          <History range={range} onRangeChange={setRange} />
        )}
        {activeTab === "compare" && <Compare />}
        {activeTab === "favorites" && (
          <Favorites onLoadPair={handleLoadFavorite} />
        )}
        {activeTab === "log" && <Log />}
      </main>
    </div>
  );
}
