const favorited = [
  {
    code: "GBP",
    name: "British Pound",
    flag: "🇬🇧",
    value: "736.65",
    rate: "0.7366",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    flag: "🇯🇵",
    value: "157,910",
    rate: "157.91",
  },
  {
    code: "INR",
    name: "Indian Rupee",
    flag: "🇮🇳",
    value: "94,910.00",
    rate: "94.91",
  },
  {
    code: "BDT",
    name: "Bangladeshi Taka",
    flag: "🇧🇩",
    value: "122,920",
    rate: "122.92",
  },
];

export default function Favorites() {
  if (favorited.length === 0) {
    return (
      <div className="px-4 py-10 text-center text-neutral-500 text-xs tracking-widest">
        NO FAVORITES YET — STAR A PAIR TO SAVE IT HERE
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-900">
          <p className="text-xs text-neutral-500 tracking-widest">
            FAVORITES{" "}
            <span className="text-white font-bold">
              {favorited.length} PAIRS
            </span>
          </p>
        </div>

        {favorited.map((pair, i) => (
          <div
            key={pair.code}
            className={`flex items-center justify-between px-4 py-3 ${
              i !== favorited.length - 1 ? "border-b border-neutral-900" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{pair.flag}</span>
              <div>
                <p className="text-xs font-bold text-white tracking-widest">
                  {pair.code}
                </p>
                <p className="text-[10px] text-neutral-500">{pair.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-white">{pair.value}</p>
                <p className="text-[10px] text-neutral-500">@ {pair.rate}</p>
              </div>
              <button className="w-8 h-8 rounded-lg flex items-center justify-center text-sm border bg-lime-900/30 border-lime-800 text-lime-400">
                ★
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
