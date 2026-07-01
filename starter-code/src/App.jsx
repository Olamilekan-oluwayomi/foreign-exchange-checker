import { useEffect, useState } from "react";
import Header from "./components/Header";
import Ticker from "./components/Ticker";
import Converter from "./components/Converter";
import Tabs from "./components/Tabs";
import History from "./components/History";
import Compare from "./components/Compare";
import Favorites from "./components/Favorites";
import Log from "./components/Log";
import CurrencyPicker from "./components/CurrencyPicker";

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

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [activePicker, setActivePicker] = useState(null);

  useEffect(() => {
    if (!amount || !fromCurrency || !toCurrency) {
      setConvertedAmount(null);
      setRate(null);
      return;
    }

    const controller = new AbortController();

    async function fetchRate() {
      try {
        const res = await fetch(
          `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Failed to fetch exchange rate");

        const data = await res.json();
        const convertedValue = data.rates?.[toCurrency];

        if (convertedValue == null) {
          throw new Error("Currency rate not found");
        }

        setConvertedAmount(convertedValue);
        setRate(convertedValue / Number(amount));
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error(error);
        setConvertedAmount(null);
        setRate(null);
      }
    }

    fetchRate();

    return () => controller.abort();
  }, [amount, fromCurrency, toCurrency]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <Ticker />
      <Converter
        amount={amount}
        setAmount={setAmount}
        fromCurrency={fromCurrency}
        setFromCurrency={setFromCurrency}
        toCurrency={toCurrency}
        setToCurrency={setToCurrency}
        convertedAmount={convertedAmount}
        rate={rate}
        onOpenPicker={(type) => {
          setActivePicker(type);
          setIsPickerOpen(true);
        }}
      />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "history" && <History />}
      {activeTab === "compare" && <Compare />}
      {activeTab === "favorites" && <Favorites />}
      {activeTab === "log" && <Log />}

      {isPickerOpen && (
        <CurrencyPicker
          activePicker={activePicker}
          onSelect={(code) => {
            if (activePicker === "from") setFromCurrency(code);
            else setToCurrency(code);
          }}
          onClose={() => setIsPickerOpen(false)}
        />
      )}
    </div>
  );
}
