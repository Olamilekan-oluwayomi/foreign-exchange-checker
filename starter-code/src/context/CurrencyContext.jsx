import { createContext, useContext, useState, useEffect } from "react";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [amount, setAmount] = useState(1000);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rate, setRate] = useState(null);

  function handleSwap() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

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

        if (convertedValue == null) throw new Error("Currency rate not found");

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

  const value = {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    convertedAmount,
    rate,
    handleSwap,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
