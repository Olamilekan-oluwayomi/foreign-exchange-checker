import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function getStartDate(range) {
  const date = new Date();
  switch (range) {
    case "1D":
      date.setDate(date.getDate() - 1);
      break;
    case "1W":
      date.setDate(date.getDate() - 7);
      break;
    case "1M":
      date.setMonth(date.getMonth() - 1);
      break;
    case "3M":
      date.setMonth(date.getMonth() - 3);
      break;
    case "1Y":
      date.setFullYear(date.getFullYear() - 1);
      break;
    case "5Y":
      date.setFullYear(date.getFullYear() - 5);
      break;
    default:
      date.setMonth(date.getMonth() - 1);
  }
  return date.toISOString().split("T")[0];
}

export default function RateChart({ fromCurrency, toCurrency, range }) {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) return;

    const startDate = getStartDate(range);
    const endDate = new Date().toISOString().split("T")[0];

    async function fetchHistory() {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.frankfurter.dev/v1/${startDate}..${endDate}?from=${fromCurrency}&to=${toCurrency}`,
        );
        const data = await res.json();

        const formatted = Object.entries(data.rates).map(([date, rates]) => ({
          date,
          rate: rates[toCurrency],
        }));

        setChartData(formatted);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, [fromCurrency, toCurrency, range]);

  const lastEntry = chartData[chartData.length - 1];

  return (
    <div className="bg-neutral-900 rounded-xl p-4 mt-3">
      <div className="flex items-center justify-between mb-3">
        <span className="text-neutral-300 text-xs font-bold tracking-widest">
          {fromCurrency}/{toCurrency}
        </span>
        <span className="text-neutral-500 text-[10px] tracking-widest">
          {lastEntry
            ? `${lastEntry.rate.toFixed(4)} · ${new Date(lastEntry.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }).toUpperCase()} CET`
            : "—"}
        </span>
      </div>

      {isLoading ? (
        <div className="h-48 flex items-center justify-center text-neutral-600 text-xs tracking-widest">
          LOADING...
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a3e635" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a3e635" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray=""
              vertical={false}
              stroke="#262626"
              strokeWidth={0.5}
            />
            <XAxis
              dataKey="date"
              tick={{ fill: "#525252", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fill: "#525252", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              domain={["auto", "auto"]}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#171717",
                border: "1px solid #262626",
                borderRadius: "8px",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#737373" }}
              itemStyle={{ color: "#a3e635" }}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#a3e635"
              strokeWidth={2}
              fill="url(#rateGradient)"
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
