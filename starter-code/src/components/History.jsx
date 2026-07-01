import StatCards from "./StatCards";
import RangeSelector from "./RangeSelector";
import RateChart from "./RateChart";

export default function History({ fromCurrency, toCurrency, range, setRange }) {
  return (
    <div className="px-4 py-4">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <StatCards fromCurrency={fromCurrency} toCurrency={toCurrency} />
        <RangeSelector range={range} setRange={setRange} />
      </div>
      <RateChart
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        range={range}
      />
    </div>
  );
}
