import { useState, useEffect } from "react";
import { getFlagUrl } from "../utils/currencyMeta";

export default function Favorites({ favorites, amount, onUnfavorite }) {
  const [rates, setRates] = useState({});
  const [names, setNames] = useState({});

  useEffect(() => {
    if (favorites.length === 0) return;

    async function fetchData() {
      try {
        const namesRes = await fetch(
          "https://api.frankfurter.dev/v1/currencies",
        );
        const namesData = await namesRes.json();
        setNames(namesData);

        // fetch rate for each pair individually
        const results = await Promise.all(
          favorites.map((fav) =>
            fetch(
              `https://api.frankfurter.dev/v1/latest?from=${fav.from}&to=${fav.to}&amount=${amount}`,
            ).then((r) => r.json()),
          ),
        );

        const ratesMap = {};
        favorites.forEach((fav, i) => {
          const key = `${fav.from}/${fav.to}`;
          ratesMap[key] = results[i].rates?.[fav.to] ?? null;
        });

        setRates(ratesMap);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [favorites, amount]);

  if (favorites.length === 0) {
    return (
      <div className="px-4 py-10 text-center text-neutral-500 text-sm tracking-widest">
        NO FAVORITES YET — STAR A PAIR TO SAVE IT HERE
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-900">
          <p className="text-[11px] sm:text-xs text-neutral-500 tracking-widest">
            FAVORITES{" "}
            <span className="text-white font-bold">
              {favorites.length} PAIRS
            </span>
          </p>
        </div>

        {favorites.map((fav, i) => {
          const key = `${fav.from}/${fav.to}`;
          const value = rates[key];

          return (
            <div
              key={key}
              className={`flex items-center justify-between px-4 py-3 ${
                i !== favorites.length - 1 ? "border-b border-neutral-900" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    src={getFlagUrl(fav.from)}
                    alt={fav.from}
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-neutral-950"
                  />
                  <img
                    src={getFlagUrl(fav.to)}
                    alt={fav.to}
                    className="w-6 h-6 rounded-full object-cover ring-2 ring-neutral-950"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-white tracking-widest">
                    {key}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-500">
                    {names[fav.from] ?? fav.from} → {names[fav.to] ?? fav.to}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-white">
                    {value ? value.toLocaleString() : "—"}
                  </p>
                  <p className="text-[11px] sm:text-xs text-neutral-500">
                    @ {value ? (value / amount).toFixed(4) : "—"}
                  </p>
                </div>
                <button
                  onClick={() => onUnfavorite(fav.from, fav.to)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border bg-lime-900/30 border-lime-800 text-lime-400"
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
