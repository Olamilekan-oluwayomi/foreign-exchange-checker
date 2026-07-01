import { useState } from "react";
import Header from "./components/Header";
import Ticker from "./components/Ticker";
import Converter from "./components/Converter";
import Tabs from "./components/Tabs";
import History from "./components/History";
import Compare from "./components/Compare";
import Favorites from "./components/Favorites";
import Log from "./components/Log";

export default function App() {
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rate, setRate] = useState(null);

  const [favorites, setFavorites] = useState([]);
  const [log, setLog] = useState([]);

  const [activeTab, setActiveTab] = useState("history");
  const [range, setRange] = useState("1M");

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Ticker />
      <Converter />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "history" && <History />}
      {activeTab === "compare" && <Compare />}
      {activeTab === "favorites" && <Favorites />}
      {activeTab === "log" && <Log />}
    </div>
  );
}
