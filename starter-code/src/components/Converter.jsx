import CurrencyPanel from "./CurrencyPanel";

export default function Converter({
  amount,
  setAmount,
  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,
  convertedAmount,
  rate,
  onOpenPicker,
  onSwap,
  onFavorite,
  isFavorited,
  onLog,
}) {
  return (
    <div className="px-4 py-5">
      <h2 className="text-neutral-300 text-sm lg:text-xl tracking-widest mb-4">
        CHECK THE RATE
      </h2>

      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3">
          <CurrencyPanel
            label="SEND"
            amount={amount}
            currencyCode={fromCurrency}
            editable
            onChange={setAmount}
            onOpenPicker={() => onOpenPicker("from")}
          />

          <div className="flex justify-center items-center">
            <button
              onClick={onSwap}
              className="bg-neutral-800 rounded-md w-9 h-9 flex items-center justify-center text-white shrink-0 cursor-pointer"
            >
              <span className="sm:hidden">⇅</span>
              <span className="hidden sm:inline">⇄</span>
            </button>
          </div>

          <CurrencyPanel
            label="RECEIVE"
            amount={convertedAmount ?? "—"}
            currencyCode={toCurrency}
            accent
            onOpenPicker={() => onOpenPicker("to")}
          />
        </div>

        <div className="border-t border-dashed border-neutral-800 my-4" />

        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-center sm:text-left">
          <p className="text-neutral-500 text-md md:text-lg">
            1 {fromCurrency} = {rate ? rate.toFixed(4) : "—"} {toCurrency}
          </p>

          <div className="flex gap-2">
            <button
              onClick={onFavorite}
              className={`"bg-lime-400 border-2 border-transparent hover:bg-transparent hover:text-lime-400 hover:border-2 hover:border-lime-900 transition-all text-black text-[13px]  lg:text-lg font-bold tracking-widest px-5 py-2.5 rounded-lg cursor-pointer ${
                isFavorited
                  ? "bg-lime-400 text-black"
                  : "bg-neutral-800 text-neutral-200"
              }`}
            >
              ★ {isFavorited ? "FAVORITED" : "FAVORITE"}
            </button>
            <button
              onClick={onLog}
              className="border-2 border-lime-900 text-lime-400 hover:bg-lime-400 hover:text-black hover:border-transparent text-[13px] lg:text-lg font-bold tracking-widest px-5 py-2.5 rounded-lg cursor-pointer"
            >
              LOG CONVERSION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
