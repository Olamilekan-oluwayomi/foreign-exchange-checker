import { useEffect, useMemo, useState } from "react";

const PAIRS = [
  { pair: "EUR/USD", to: "EUR" },
  { pair: "USD/JPY", to: "JPY" },
  { pair: "USD/GBP", to: "GBP" },
  { pair: "USD/CHF", to: "CHF" },
  { pair: "USD/CAD", to: "CAD" },
  { pair: "USD/AUD", to: "AUD" },
];

function getPreviousDate() {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().split("T")[0];
}

export default function Ticker() {
  const [rates, setRates] = useState([]);

  const toList = useMemo(() => PAIRS.map((p) => p.to).join(","), []);
  const previousDate = useMemo(() => getPreviousDate(), []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRates() {
      try {
        const [latestRes, previousRes] = await Promise.all([
          fetch(`https://api.frankfurter.dev/v1/latest?from=USD&to=${toList}`, {
            signal: controller.signal,
          }),
          fetch(
            `https://api.frankfurter.dev/v1/${previousDate}?from=USD&to=${toList}`,
            { signal: controller.signal },
          ),
        ]);

        if (!latestRes.ok || !previousRes.ok) {
          throw new Error("Failed to fetch market rates");
        }

        const [latestData, previousData] = await Promise.all([
          latestRes.json(),
          previousRes.json(),
        ]);

        const updatedRates = PAIRS.map(({ pair, to }) => {
          const current = latestData.rates?.[to];
          const previous = previousData.rates?.[to];

          return {
            pair,
            value: current == null ? "-" : current.toFixed(4),
            up:
              current != null && previous != null ? current >= previous : null,
          };
        });

        setRates(updatedRates);
      } catch (error) {
        if (error.name === "AbortError") return;
        console.error(error);
      }
    }

    fetchRates();

    return () => controller.abort();
  }, [toList, previousDate]);

  const display =
    rates.length > 0
      ? rates
      : PAIRS.map(({ pair }) => ({ pair, value: "-", up: null }));

  return (
    <div className="bg-neutral-900 overflow-hidden flex items-center text-xs md:text-base whitespace-nowrap border-y border-neutral-800">
      <span className="bg-brand-lime text-black font-bold px-4 py-3 shrink-0 z-10 text-xs sm:text-sm tracking-widest flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-black" />
        LIVE MARKETS
      </span>

      <div className="overflow-hidden flex-1">
        <div className="flex w-max animate-marquee">
          {[
            ...display,
            ...display,
            ...display,
            ...display,
            ...display,
            ...display,
          ].map((rate, index) => {
            const movementClass =
              rate.up === null
                ? "text-white"
                : rate.up
                  ? "text-brand-green"
                  : "text-brand-red";

            return (
              <span
                key={index}
                className="flex items-center gap-2 border-r border-neutral-800 px-5 py-3 shrink-0"
              >
                <span className="text-neutral-400">{rate.pair}</span>
                <span className={`font-semibold ${movementClass}`}>
                  {rate.value}
                </span>
                {rate.up !== null && (
                  <span className={movementClass}>{rate.up ? "▲" : "▼"}</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
