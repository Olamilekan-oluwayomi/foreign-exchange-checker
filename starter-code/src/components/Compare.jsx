import { useState, useEffect } from "react";
import { getFlagUrl } from "../utils/currencyMeta";

const DEFAULT_PAIRS = ["GBP", "JPY", "CHF", "CAD", "AUD", "INR", "CNY", "BDT"];

export default function Compare({
  fromCurrency,
  amount,
  favorites,
  onToggleFavorite,
}) {
  const [rates, setRates] = useState({});
  const [names, setNames] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const codes = DEFAULT_PAIRS.join(",");

        const [ratesRes, namesRes] = await Promise.all([
          fetch(
            `https://api.frankfurter.dev/v1/latest?from=${fromCurrency}&to=${codes}&amount=${amount}`,
          ),
          fetch("https://api.frankfurter.dev/v1/currencies"),
        ]);

        const ratesData = await ratesRes.json();
        const namesData = await namesRes.json();

        setRates(ratesData.rates ?? {});
        setNames(namesData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [fromCurrency, amount]);

  return (
    <div className="px-4 py-4">
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-900">
          <p className="text-xs text-neutral-500 tracking-widest">
            MULTI-CURRENCY{" "}
            <span className="text-white font-bold">
              {amount.toLocaleString()} FROM {fromCurrency}
            </span>
          </p>
          <p className="text-xs text-neutral-500 tracking-widest">
            {DEFAULT_PAIRS.length} PAIRS
          </p>
        </div>

        {DEFAULT_PAIRS.map((code, i) => {
          const value = rates[code];
          const isFav = favorites.some(
            (fav) => fav.from === fromCurrency && fav.to === code,
          );

          return (
            <div
              key={code}
              className={`flex items-center justify-between px-4 py-3 ${
                i !== DEFAULT_PAIRS.length - 1
                  ? "border-b border-neutral-900"
                  : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={getFlagUrl(code)}
                  alt={code}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-white tracking-widest">
                    {code}
                  </p>
                  <p className="text-[10px] text-neutral-500">
                    {names[code] ?? ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-white">
                    {value ? value.toLocaleString() : "—"}
                  </p>
                  <p className="text-[10px] text-neutral-500">
                    @ {value ? (value / amount).toFixed(4) : "—"}
                  </p>
                </div>
                <button
                  onClick={() => onToggleFavorite(code)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border ${
                    isFav
                      ? "bg-lime-900/30 border-lime-800 text-lime-400"
                      : "bg-neutral-900 border-neutral-700 text-neutral-500"
                  }`}
                >
                  ★
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
