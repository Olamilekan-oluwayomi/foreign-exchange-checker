import { useState, useEffect } from "react";

export default function StatCards({ fromCurrency, toCurrency }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) {
      setStats(null);
      return;
    }

    async function fetchStats() {
      try {
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
        const last = todayData.rates?.[toCurrency];
        const open = yesterdayData.rates?.[toCurrency];

        if (last == null || open == null) {
          setStats(null);
          return;
        }

        const change = last - open;
        const pctChange = (change / open) * 100;
        setStats({ open, last, change, pctChange });
      } catch (error) {
        console.error(error);
        setStats(null);
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
          value: `${stats.pctChange >= 0 ? "+ " : "- "}${Math.abs(
            stats.pctChange,
          ).toFixed(2)}%`,
          accent: true,
          up: stats.pctChange >= 0,
        },
      ]
    : [
        { label: "OPEN", value: "-", accent: false },
        { label: "LAST", value: "-", accent: false },
        { label: "CHANGE", value: "-", accent: false },
        { label: "% CHANGE", value: "-", accent: false },
      ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-[640px]">
      {items.map((stat) => (
        <div key={stat.label} className="rounded-2xl bg-neutral-900 p-5">
          <p className="mb-4 text-sm tracking-widest text-neutral-400">
            {stat.label}
          </p>
          <p
            className={`whitespace-nowrap text-2xl font-bold tracking-wider ${
              stat.accent
                ? stat.up
                  ? "text-brand-green"
                  : "text-brand-red"
                : "text-white"
            }`}
          >
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
