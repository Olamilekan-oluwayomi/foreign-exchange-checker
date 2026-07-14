import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StatCards from "./StatCards";
import RangeSelector from "./RangeSelector";
import RateChart from "./RateChart";

const RANGE_DAYS = {
  "1D": 1,
  "1W": 7,
  "1M": 30,
  "3M": 90,
  "1Y": 365,
  "5Y": 1825,
};

function getDateStr(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split("T")[0];
}

export default function History({ range, onRangeChange }) {
  const { fromCurrency, toCurrency, rate } = useSelector(
    (state) => state.currency,
  );

  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fromCurrency || !toCurrency || fromCurrency === toCurrency) {
      setChartData([]);
      return;
    }

    async function fetchHistory() {
      setIsLoading(true);

      try {
        const days = RANGE_DAYS[range] ?? RANGE_DAYS["1M"];
        const startDate = getDateStr(days);
        const endDate = getDateStr(0);

        const res = await fetch(
          `https://api.frankfurter.dev/v1/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`,
        );

        const data = await res.json();

        if (!res.ok || !data.rates) {
          throw new Error(data.message || "Failed to fetch exchange history");
        }

        const entries = Object.entries(data.rates).map(([date, rates]) => ({
          date,
          rate: rates[toCurrency],
        }));

        setChartData(entries);
      } catch (error) {
        console.error(error);
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, [fromCurrency, toCurrency, range]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <StatCards fromCurrency={fromCurrency} toCurrency={toCurrency} />
        <RangeSelector activeRange={range} onRangeChange={onRangeChange} />
      </div>

      <RateChart
        data={chartData}
        isLoading={isLoading}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        lastRate={rate ? Number(rate).toFixed(4) : "-"}
      />
    </div>
  );
}
