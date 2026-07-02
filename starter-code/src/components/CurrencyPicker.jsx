import { useState, useEffect } from "react";
import { getFlagUrl } from "../utils/currencyMeta";
import selected from "../assets/images/icon-check.svg";
import searched from "../assets/images/icon-search.svg";

const POPULAR = ["USD", "EUR", "GBP"];

export default function CurrencyPicker({ onSelect, onClose, currentCode }) {
  const [currencies, setCurrencies] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const res = await fetch("https://api.frankfurter.dev/v1/currencies");
        const data = await res.json();
        setCurrencies(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCurrencies();
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const allEntries = Object.entries(currencies);
  const normalizedSearch = search.trim().toLowerCase();

  const filtered = normalizedSearch
    ? allEntries.filter(
        ([code, name]) =>
          code.toLowerCase().includes(normalizedSearch) ||
          name.toLowerCase().includes(normalizedSearch),
      )
    : null;

  const popular = allEntries.filter(([code]) => POPULAR.includes(code));
  const others = allEntries.filter(([code]) => !POPULAR.includes(code));

  const renderRow = ([code, name]) => (
    <button
      type="button"
      key={code}
      onClick={() => {
        onSelect(code);
        onClose();
      }}
      className="flex w-full cursor-pointer items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-neutral-800"
    >
      <img
        src={getFlagUrl(code)}
        alt={code}
        className="h-7 w-7 shrink-0 rounded-full object-cover"
      />
      <span className="w-12 shrink-0 text-sm font-bold tracking-widest text-white">
        {code}
      </span>
      <span className="min-w-0 flex-1 truncate text-xs text-neutral-400">
        {name}
      </span>
      {code === currentCode && (
        <span className="shrink-0 text-xs font-bold text-brand-lime">
          <img className="icon-lime" src={selected} alt="icon checked" />
        </span>
      )}
    </button>
  );

  return (
    <>
      {/* Backdrop: dims on mobile (bottom sheet), invisible on desktop but still closes on outside click */}
      <div
        className="fixed inset-0 z-[100] cursor-pointer bg-black/80 sm:bg-transparent"
        onClick={onClose}
      />

      {/* Panel: fixed bottom sheet on mobile, anchored dropdown on desktop */}
      <div className="fixed inset-x-0 bottom-0 z-[101] flex max-h-[78vh] w-full flex-col overflow-hidden rounded-t-3xl border border-neutral-800 bg-neutral-900 sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-0 sm:top-[calc(100%+8px)] sm:w-[320px] sm:rounded-2xl sm:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
        <div className="border-b border-neutral-800 p-5">
          <div className="flex items-center gap-3 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3 focus-ring-group">
            <span className="text-neutral-400">
              <img className="icon-lime" src={searched} alt="icon checked" />
            </span>
            <input
              type="text"
              placeholder="Search currencies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
              autoFocus
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered ? (
            filtered.length > 0 ? (
              filtered.map(renderRow)
            ) : (
              <p className="py-10 text-center text-xs tracking-widest text-neutral-400">
                NO RESULTS
              </p>
            )
          ) : (
            <>
              <div className="mt-2 flex items-center justify-between px-5 py-2">
                <span className="text-[10px] tracking-widest text-neutral-400">
                  POPULAR
                </span>
                <span className="text-[10px] text-neutral-400">
                  {popular.length}
                </span>
              </div>
              {popular.map(renderRow)}

              <div className="my-1 border-t border-neutral-800" />

              <div className="flex items-center justify-between px-5 py-2">
                <span className="text-[10px] tracking-widest text-neutral-400">
                  OTHER CURRENCIES
                </span>
                <span className="text-[10px] text-neutral-400">
                  {others.length}
                </span>
              </div>
              {others.map(renderRow)}
            </>
          )}
        </div>
      </div>
    </>
  );
}
