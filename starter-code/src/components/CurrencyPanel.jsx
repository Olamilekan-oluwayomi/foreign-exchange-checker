import { getFlagUrl } from "../utils/currencyMeta";

export default function CurrencyPanel({
  label,
  amount,
  currencyCode,
  accent,
  editable,
  onChange,
  onOpenPicker,
}) {
  const flagUrl = getFlagUrl(currencyCode);

  return (
    <div className="bg-neutral-900 rounded-xl p-4 flex-1">
      <p className="text-neutral-500 text-[10px] tracking-widest mb-2">
        {label}
      </p>
      <div className="flex items-center justify-between gap-2">
        {editable ? (
          <input
            type="text"
            inputMode="decimal"
            defaultValue={amount}
            onChange={(e) => onChange(e.target.value)}
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
          onClick={onOpenPicker}
          className="flex items-center gap-1.5 bg-neutral-800 rounded-full px-3 py-1.5 text-xs shrink-0 cursor-pointer"
        >
          {flagUrl && (
            <img
              src={flagUrl}
              alt={currencyCode}
              className="w-5 h-5 rounded-full object-cover"
            />
          )}
          <span className="font-semibold">{currencyCode}</span>
          <span className="text-neutral-500">▾</span>
        </button>
      </div>
    </div>
  );
}
