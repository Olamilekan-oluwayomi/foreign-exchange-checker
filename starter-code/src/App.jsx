import { useState } from "react";
import Header from "./components/Header";
import Ticker from "./components/Ticker";
import Converter from "./components/Converter";
import Tabs from "./components/Tabs";
import History from "./components/History";
import Compare from "./components/Compare";
import Favorites from "./components/Favorites";
import Log from "./components/Log";
import { useCurrency } from "./context/CurrencyContext";
import { useFavorites } from "./context/FavoritesContext";

export default function App() {
  const {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    convertedAmount,
    rate,
    handleSwap,
  } = useCurrency();

  const {
    favorites,
    isFavorited,
    toggleFavorite,
    log,
    addLogEntry,
    deleteLogEntry,
    clearLog,
  } = useFavorites();

  const [activeTab, setActiveTab] = useState("history");
  const [range, setRange] = useState("1M");

  function handleLog() {
    addLogEntry({
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
      convertedAmount: convertedAmount,
      rate: rate,
      timestamp: new Date().toISOString(),
    });
  }

  function handleLoadFavorite(from, to) {
    setFromCurrency(from);
    setToCurrency(to);
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
          <History
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            rate={rate}
            range={range}
            onRangeChange={setRange}
          />
        )}
        {activeTab === "compare" && (
          <Compare
            fromCurrency={fromCurrency}
            amount={amount}
            favorites={favorites}
            onToggleFavorite={(to) => toggleFavorite(fromCurrency, to)}
          />
        )}
        {activeTab === "favorites" && (
          <Favorites
            favorites={favorites}
            amount={amount}
            onUnfavorite={(from, to) => toggleFavorite(from, to)}
            onLoadPair={handleLoadFavorite}
          />
        )}
        {activeTab === "log" && (
          <Log log={log} onDelete={deleteLogEntry} onClearAll={clearLog} />
        )}
      </main>
    </div>
  );
}
