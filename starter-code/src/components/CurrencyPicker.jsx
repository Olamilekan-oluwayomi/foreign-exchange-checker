import { useState, useEffect } from "react";
import { getFlagUrl } from "../utils/currencyMeta";

export default function CurrencyPicker({ activePicker, onSelect, onClose }) {
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

  const filtered = Object.entries(currencies).filter(
    ([code, name]) =>
      code.toLowerCase().includes(search.toLowerCase()) ||
      name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 animate-fadeIn">
      <div className="bg-neutral-900 w-full sm:w-96 rounded-t-2xl sm:rounded-2xl p-4 max-h-[70vh] flex flex-col animate-slideUp sm:animate-fadeScale">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold tracking-widest text-neutral-300">
            SELECT {activePicker === "from" ? "SEND" : "RECEIVE"} CURRENCY
          </p>
          <button onClick={onClose} className="text-neutral-500 text-sm">
            ✕
          </button>
        </div>

        <input
          type="text"
          placeholder="Search currency..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-neutral-800 text-white text-xs rounded-lg px-3 py-2 outline-none mb-3 placeholder:text-neutral-500"
          autoFocus
        />

        <div className="overflow-y-auto flex-1">
          {filtered.map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                onSelect(code);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-neutral-800 text-left"
            >
              <img
                src={getFlagUrl(code)}
                alt={code}
                className="w-6 h-6 rounded-full object-cover shrink-0"
              />
              <span className="text-md font-bold text-white tracking-widest">
                {code}
              </span>
              <span className="text-md text-neutral-500 truncate">{name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
