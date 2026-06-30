const logEntries = [
  {
    from: "1,000",
    fromCode: "USD",
    to: "853.02",
    toCode: "EUR",
    rate: "0.8530",
    date: "MAY 14, 16:00",
  },
  {
    from: "500",
    fromCode: "GBP",
    to: "73,660",
    toCode: "JPY",
    rate: "157.91",
    date: "MAY 13, 09:30",
  },
  {
    from: "2,000",
    fromCode: "EUR",
    to: "2,172.40",
    toCode: "USD",
    rate: "1.0862",
    date: "MAY 12, 14:15",
  },
];

export default function Log() {
  if (logEntries.length === 0) {
    return (
      <div className="px-4 py-10 text-center text-neutral-500 text-xs tracking-widest">
        NO CONVERSIONS LOGGED YET
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-900">
          <p className="text-xs text-neutral-500 tracking-widest">
            CONVERSION LOG{" "}
            <span className="text-white font-bold">
              {logEntries.length} ENTRIES
            </span>
          </p>
          <button className="text-[10px] text-red-400 tracking-widest">
            CLEAR ALL
          </button>
        </div>

        {logEntries.map((entry, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-3 ${
              i !== logEntries.length - 1 ? "border-b border-neutral-900" : ""
            }`}
          >
            <div>
              <p className="text-sm font-bold text-white">
                {entry.from}{" "}
                <span className="text-neutral-500">{entry.fromCode}</span>
                {" → "}
                <span className="text-lime-400">{entry.to}</span>{" "}
                <span className="text-neutral-500">{entry.toCode}</span>
              </p>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                @ {entry.rate} · {entry.date}
              </p>
            </div>

            <button className="text-neutral-600 hover:text-red-400 text-sm ml-4">
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
