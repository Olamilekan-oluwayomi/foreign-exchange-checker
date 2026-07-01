import { useState, useEffect } from "react";

export default function StatCards({ fromCurrency, toCurrency }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    async function fetchStats() {
      try {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        const [todayRes, yesterdayRes] = await Promise.all([
          fetch(
            `https://api.frankfurter.dev/v1/latest?from=${fromCurrency}&to=${toCurrency}`,
          ),
          fetch(
            `https://api.frankfurter.dev/v1/${yesterdayStr}?from=${fromCurrency}&to=${toCurrency}`,
          ),
        ]);

        const todayData = await todayRes.json();
        const yesterdayData = await yesterdayRes.json();

        const last = todayData.rates[toCurrency];
        const open = yesterdayData.rates[toCurrency];
        const change = last - open;
        const pctChange = (change / open) * 100;

        setStats({ open, last, change, pctChange });
      } catch (error) {
        console.error(error);
      }
    }

    fetchStats();
  }, [fromCurrency, toCurrency]);

  const items = stats
    ? [
        { label: "OPEN", value: stats.open.toFixed(4), accent: false },
        { label: "LAST", value: stats.last.toFixed(4), accent: false },
        {
          label: "CHANGE",
          value: `${stats.change >= 0 ? "+" : ""}${stats.change.toFixed(4)}`,
          accent: true,
          up: stats.change >= 0,
        },
        {
          label: "% CHANGE",
          value: `${stats.pctChange >= 0 ? "▲" : "▼"} ${stats.pctChange >= 0 ? "+" : ""}${stats.pctChange.toFixed(2)}%`,
          accent: true,
          up: stats.pctChange >= 0,
        },
      ]
    : [
        { label: "OPEN", value: "—", accent: false },
        { label: "LAST", value: "—", accent: false },
        { label: "CHANGE", value: "—", accent: false },
        { label: "% CHANGE", value: "—", accent: false },
      ];

  return (
    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
      {items.map((s) => (
        <div key={s.label} className="bg-neutral-900 rounded-xl p-3 sm:w-fit">
          <p className="text-neutral-500 text-[10px] tracking-widest mb-1">
            {s.label}
          </p>
          <p
            className={`text-sm font-bold whitespace-nowrap ${
              s.accent
                ? s.up
                  ? "text-lime-400"
                  : "text-red-400"
                : "text-white"
            }`}
          >
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}
