import { useCurrency } from "../context/CurrencyContext";
import { useFavorites } from "../context/FavoritesContext";
import CurrencyPanel from "./CurrencyPanel";
import vertical from "../assets/images/icon-exchange-vertical.svg";
import horizontal from "../assets/images/icon-exchange.svg";

export default function Converter() {
  const {
    amount,
    setAmount,
    fromCurrency,
    toCurrency,
    convertedAmount,
    rate,
    setFromCurrency,
    setToCurrency,
    handleSwap,
  } = useCurrency();

  const { isFavorited, toggleFavorite, addLogEntry } = useFavorites();

  function handleFavorite() {
    toggleFavorite(fromCurrency, toCurrency);
  }

  function handleLog() {
    addLogEntry({
      from: fromCurrency,
      to: toCurrency,
      amount,
      convertedAmount,
      rate,
      timestamp: new Date().toISOString(),
    });
  }

  return (
    <section className="mb-10">
      <h2 className="mb-5 text-2xl font-bold tracking-widest text-white sm:text-3xl">
        CHECK THE RATE
      </h2>

      <div className="rounded-3xl bg-neutral-900 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.35)] sm:p-5 lg:p-6">
        <div className="flex flex-col items-stretch gap-6 sm:flex-row sm:items-center">
          <CurrencyPanel
            label="SEND"
            amount={amount}
            currencyCode={fromCurrency}
            editable
            onChange={setAmount}
            onSelectCurrency={setFromCurrency}
          />

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSwap}
              aria-label="Swap currencies"
              className="flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-neutral-700 bg-neutral-800 text-2xl text-white transition-colors hover:bg-neutral-700"
            >
              <span className="sm:hidden">
                <img src={vertical} alt="exchange icon" />
              </span>
              <span className="hidden sm:inline">
                {" "}
                <img src={horizontal} alt="exchange icon" />
              </span>
            </button>
          </div>

          <CurrencyPanel
            label="RECEIVE"
            amount={convertedAmount ?? "-"}
            currencyCode={toCurrency}
            accent
            onSelectCurrency={setToCurrency}
          />
        </div>

        <div className="my-6 border-t border-dashed border-neutral-700" />

        <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm tracking-widest text-neutral-300">
            1 {fromCurrency} = {rate ? rate.toFixed(4) : "-"} {toCurrency}
          </p>

          <div className="flex w-full gap-3 sm:w-auto">
            <button
              type="button"
              onClick={handleFavorite}
              className={`flex-1 cursor-pointer rounded-lg px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest transition-colors sm:flex-none ${
                isFavorited(fromCurrency, toCurrency)
                  ? "bg-brand-lime text-black hover:bg-brand-lime/80"
                  : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
              }`}
            >
              <span className="mr-2">&#9733;</span>
              {isFavorited(fromCurrency, toCurrency) ? "FAVORITED" : "FAVORITE"}
            </button>
            <button
              type="button"
              onClick={handleLog}
              className="flex-1 cursor-pointer rounded-lg border border-brand-lime px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-brand-lime transition-colors hover:bg-brand-lime hover:text-black sm:flex-none"
            >
              LOG CONVERSION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
