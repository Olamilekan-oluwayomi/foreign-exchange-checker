export default function Log({ log, onDelete, onClear }) {
  if (log.length === 0) {
    return (
      <div className="px-4 py-10 text-center text-neutral-500 text-sm tracking-widest">
        NO CONVERSIONS LOGGED YET
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-900">
          <p className="text-[11px] sm:text-xs text-neutral-500 tracking-widest">
            CONVERSION LOG{" "}
            <span className="text-white font-bold">{log.length} ENTRIES</span>
          </p>
          <button
            onClick={onClear}
            className="text-[11px] sm:text-xs text-red-400 tracking-widest"
          >
            CLEAR ALL
          </button>
        </div>

        {log.map((entry, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-4 py-3 ${
              i !== log.length - 1 ? "border-b border-neutral-900" : ""
            }`}
          >
            <div>
              <p className="text-sm font-bold text-white">
                {entry.amount.toLocaleString()}{" "}
                <span className="text-neutral-500">{entry.from}</span>
                {" → "}
                <span className="text-lime-400">
                  {entry.convertedAmount.toLocaleString()}
                </span>{" "}
                <span className="text-neutral-500">{entry.to}</span>
              </p>
              <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">
                @ {entry.rate.toFixed(4)} ·{" "}
                {new Date(entry.date).toLocaleString()}
              </p>
            </div>

            <button
              onClick={() => onDelete(i)}
              className="text-neutral-600 hover:text-red-400 text-sm ml-4"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
