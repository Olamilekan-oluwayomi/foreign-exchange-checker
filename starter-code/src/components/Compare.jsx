import { useMemo, useState, useEffect } from "react";
import { getFlagUrl } from "../utils/currencyMeta";

const BASE_PAIRS = [
  "USD",
  "GBP",
  "JPY",
  "CHF",
  "CAD",
  "AUD",
  "INR",
  "CNY",
  "BDT",
];

export default function Compare({
  fromCurrency,
  amount,
  favorites,
  onToggleFavorite,
}) {
  const [rates, setRates] = useState({});
  const [names, setNames] = useState({});

  const defaultPairs = useMemo(
    () => BASE_PAIRS.filter((code) => code !== fromCurrency),
    [fromCurrency],
  );

  useEffect(() => {
    async function fetchData() {
      if (!amount) return;

      try {
        const codes = defaultPairs.join(",");

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
  }, [fromCurrency, amount, defaultPairs]);

  if (!amount) {
    return (
      <div className="rounded-2xl bg-neutral-900 px-5 py-16 text-center">
        <p className="mb-2 text-sm font-bold tracking-widest text-white">
          NO COMPARISON AVAILABLE
        </p>
        <p className="mx-auto max-w-sm text-xs leading-relaxed text-neutral-400">
          Enter an amount in SEND above to see what your money is worth in other
          currencies.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-2xl bg-neutral-900 p-5">
      <div className="mb-5 flex flex-col md:flex-row items-start justify-between gap-4">
        <p className="text-xs tracking-widest text-neutral-400">
          MULTI-CURRENCY{" "}
          <span className="font-bold text-base text-white">
            {Number(amount).toLocaleString()} FROM {fromCurrency}
          </span>
        </p>
        <p className="text-xs tracking-widest text-neutral-400">
          {defaultPairs.length} PAIRS
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {defaultPairs.map((code) => {
          const value = rates[code];
          const isFav = favorites.some(
            (fav) => fav.from === fromCurrency && fav.to === code,
          );

          return (
            <div
              key={code}
              className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-800 px-4 py-3 transition-colors hover:bg-neutral-700 focus-within:border-brand-lime"
            >
              <div className="flex min-w-0 items-center gap-4">
                <img
                  src={getFlagUrl(code)}
                  alt={code}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="text-base font-bold tracking-widest text-white">
                    {code}
                  </p>
                  <p className="truncate text-xs text-neutral-400">
                    {names[code] ?? ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-base md:text-lg font-bold tracking-widest text-white">
                    {value ? value.toLocaleString() : "-"}
                  </p>
                  <p className="text-xs md:text-base text-neutral-400">
                    @ {value ? (value / Number(amount)).toFixed(4) : "-"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleFavorite(code)}
                  aria-label={isFav ? "Remove favorite" : "Add favorite"}
                  className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border text-sm transition-colors ${
                    isFav
                      ? "border-brand-lime bg-brand-lime-dark text-brand-lime"
                      : "border-neutral-700 text-neutral-400 hover:border-brand-lime hover:text-brand-lime"
                  }`}
                >
                  &#9733;
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
