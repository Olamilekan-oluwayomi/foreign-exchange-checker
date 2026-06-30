const rates = [
  { pair: "USD/JPY", value: "157.91", change: "+0.04%", up: true },
  { pair: "GBP/USD", value: "1.3575", change: "-0.22%", up: false },
  { pair: "USD/CHF", value: "0.9098", change: "+0.17%", up: true },
  { pair: "EUR/GBP", value: "0.8633", change: "+0.11%", up: true },
  { pair: "AUD/USD", value: "0.7288", change: "-0.08%", up: false },
  { pair: "USD/CAD", value: "1.3815", change: "+0.04%", up: true },
];

export default function Ticker() {
  return (
    <div className="bg-neutral-900 overflow-hidden flex items-center text-xs whitespace-nowrap border-b border-neutral-800">
      <span className="bg-lime-400 text-black font-bold px-3 py-1.5 shrink-0 z-10">
        ● LIVE MARKETS
      </span>

      <div className="flex animate-marquee py-1.5">
        {[...rates, ...rates].map((r, i) => (
          <span key={i} className="flex items-center gap-1 px-4 shrink-0">
            <span className="text-neutral-300">{r.pair}</span>
            <span className="text-white font-semibold">{r.value}</span>
            <span className={r.up ? "text-lime-400" : "text-red-400"}>
              {r.up ? "▲" : "▼"} {r.change}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
