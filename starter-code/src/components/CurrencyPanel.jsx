export default function CurrencyPanel({
  label,
  amount,
  currencyCode,
  flag,
  accent,
  editable,
}) {
  return (
    <div className="bg-neutral-900 rounded-xl p-4 flex-1">
      <p className="text-neutral-500 text-sm lg:text-md tracking-widest mb-2">
        {label}
      </p>
      <div className="flex items-center justify-between gap-2">
        {editable ? (
          <input
            type="text"
            inputMode="decimal"
            defaultValue={amount}
            className="bg-transparent text-2xl sm:text-3xl font-bold text-white w-2/3 outline-none"
          />
        ) : (
          <span
            className={`text-2xl sm:text-3xl font-bold ${accent ? "text-lime-400" : "text-white"}`}
          >
            {amount}
          </span>
        )}

        <button
          type="button"
          className="flex items-center gap-1.5 bg-neutral-800 rounded-sm px-3 py-2 text-sm md:text-lg shrink-0"
        >
          <span>{flag}</span>
          <span className="font-semibold">{currencyCode}</span>
          <span className="text-neutral-500">▾</span>
        </button>
      </div>
    </div>
  );
}
