import { useState, useMemo } from "react";
import { getFlagUrl } from "../utils/currencyMeta";
import CurrencyPicker from "./CurrencyPicker";

function formatDisplayAmount(value) {
  if (value === "" || value === null || value === undefined || value === "-") {
    return "-";
  }
  const number = Number(value);
  if (!Number.isFinite(number)) return value;
  return number.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function CurrencyPanel({
  label,
  amount,
  currencyCode,
  accent,
  editable,
  onChange,
  onSelectCurrency,
}) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const flagUrl = getFlagUrl(currencyCode);

  const displayValue = editable ? amount : formatDisplayAmount(amount);
  const inputSize = useMemo(
    () => Math.max(1, String(displayValue).length),
    [displayValue],
  );

  return (
    // Added flex-1 and min-w-0 to ensure it behaves well in side-by-side layouts
    <div className="flex flex-1 flex-col rounded-2xl border border-neutral-700 bg-neutral-800 p-5 min-w-[280px]">
      <p className="mb-2 text-sm tracking-widest text-neutral-300">{label}</p>

      {/* Container for input and button */}
      <div className="flex items-center justify-between gap-4">
        {/* Input container: min-w-0 allows it to shrink instead of overflowing */}
        <div className="min-w-0 flex-1">
          <input
            type="text"
            inputMode="decimal"
            size={inputSize}
            value={displayValue}
            onChange={editable ? (e) => onChange(e.target.value) : undefined}
            readOnly={!editable}
            // w-full ensures input fills the available flex-1 space
            className={`w-full border-b-2 border-transparent bg-transparent text-3xl font-bold leading-none outline-none transition-colors focus:border-current sm:text-4xl ${
              accent ? "text-brand-lime" : "text-white"
            }`}
          />
        </div>

        {/* Currency Picker Button: shrink-0 prevents it from being pushed */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-600 bg-neutral-700 px-3 py-2.5 transition-colors hover:bg-neutral-600"
          >
            {flagUrl && (
              <img
                src={flagUrl}
                alt={currencyCode}
                className="h-6 w-6 rounded-full object-cover"
              />
            )}
            <span className="text-sm font-bold tracking-widest text-white">
              {currencyCode}
            </span>
            <span className="text-xs text-neutral-300">v</span>
          </button>

          {isPickerOpen && (
            <CurrencyPicker
              currentCode={currencyCode}
              onSelect={onSelectCurrency}
              onClose={() => setIsPickerOpen(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
