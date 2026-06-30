import CurrencyPanel from "./CurrencyPanel";

export default function Converter() {
  return (
    <div className="px-4 py-5">
      <h2 className="text-neutral-300 text-sm lg:text-xl tracking-widest mb-4">
        CHECK THE RATE
      </h2>

      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row items-stretch gap-2 sm:gap-3">
          <CurrencyPanel
            label="SEND"
            amount="1,000"
            currencyCode="USD"
            flag="🇺🇸"
            editable
          />

          <div className="flex justify-center items-center">
            <button className="bg-neutral-800 rounded-md w-9 h-9 flex items-center justify-center text-white shrink-0 cursor-pointer">
              <span className="sm:hidden">⇅</span>
              <span className="hidden sm:inline">⇄</span>
            </button>
          </div>

          <CurrencyPanel
            label="RECEIVE"
            amount="853.02"
            currencyCode="EUR"
            flag="🇪🇺"
            accent
          />
        </div>

        <div className="border-t border-dashed border-neutral-800 my-4" />

        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3 text-center sm:text-left">
          <p className="text-neutral-500 text-sm md:text-lg">
            1 USD = 0.8530 EUR
          </p>

          <div className="flex gap-2">
            <button className="bg-lime-400 text-black text-[11px]  lg:text-lg font-bold tracking-widest px-5 py-2.5 rounded-lg cursor-pointer">
              ★ FAVORITED
            </button>
            <button className="border-2 border-lime-900 text-lime-400 text-[11px] lg:text-lg font-bold tracking-widest px-5 py-2.5 rounded-lg cursor-pointer">
              LOG CONVERSION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
