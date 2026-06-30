const pairs = [
  {
    code: "GBP",
    name: "British Pound",
    flag: "🇬🇧",
    value: "736.65",
    rate: "0.7366",
    starred: true,
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    flag: "🇯🇵",
    value: "157,910",
    rate: "157.91",
    starred: true,
  },
  {
    code: "CHF",
    name: "Swiss Franc",
    flag: "🇨🇭",
    value: "909.80",
    rate: "0.9098",
    starred: false,
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    flag: "🇨🇦",
    value: "1,381.50",
    rate: "1.3815",
    starred: false,
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    flag: "🇦🇺",
    value: "1,387.35",
    rate: "1.3873",
    starred: false,
  },
  {
    code: "INR",
    name: "Indian Rupee",
    flag: "🇮🇳",
    value: "94,910.00",
    rate: "94.91",
    starred: true,
  },
  {
    code: "CNY",
    name: "Chinese Yuan",
    flag: "🇨🇳",
    value: "7,210.00",
    rate: "7.21",
    starred: false,
  },
  {
    code: "BDT",
    name: "Bangladeshi Taka",
    flag: "🇧🇩",
    value: "122,920",
    rate: "122.92",
    starred: true,
  },
];

export default function Compare() {
  return (
    <div className="px-4 py-4">
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-900">
          <p className="text-xs text-neutral-500 tracking-widest">
            MULTI-CURRENCY{" "}
            <span className="text-white font-bold">1,000 FROM USD</span>
          </p>
          <p className="text-xs text-neutral-500 tracking-widest">8 PAIRS</p>
        </div>

        {/* Rows */}
        {pairs.map((pair, i) => (
          <div
            key={pair.code}
            className={`flex items-center justify-between px-4 py-3 ${
              i !== pairs.length - 1 ? "border-b border-neutral-900" : ""
            }`}
          >
            {/* Left: flag + code + name */}
            <div className="flex items-center gap-3">
              <span className="text-xl">{pair.flag}</span>
              <div>
                <p className="text-xs font-bold text-white tracking-widest">
                  {pair.code}
                </p>
                <p className="text-[10px] text-neutral-500">{pair.name}</p>
              </div>
            </div>

            {/* Right: value + rate + star */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-white">{pair.value}</p>
                <p className="text-[10px] text-neutral-500">@ {pair.rate}</p>
              </div>
              <button
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm border ${
                  pair.starred
                    ? "bg-lime-900/30 border-lime-800 text-lime-400"
                    : "bg-neutral-900 border-neutral-700 text-neutral-500"
                }`}
              >
                ★
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
